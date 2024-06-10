import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Shared/Button/Button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(0);
  const [day, setDay] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for form submission

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const { mutateAsync } = useMutation({
    mutationFn: async (premiumTakenDate) => {
      const premiumTakenDateFormatted = new Date(
        premiumTakenDate
        ).toISOString();
      console.log(premiumTakenDateFormatted)

      const res = await axiosSecure.patch(`/user/${user?.email}`, {
        premiumTakenDate: premiumTakenDateFormatted,
      });
    },
    onSuccess: () => {
      toast.success("Payment Successful");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsSubmitting(false); // Reset form submission state
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set form submission state

    const form = event.target;
    const time = form.time.value;
    setDay(time);
    console.log(time)

    if (!stripe || !elements) {
      setIsSubmitting(false); // Reset form submission state
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setIsSubmitting(false); // Reset form submission state
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
      setIsSubmitting(false); // Reset form submission state
    } else {
      console.log("payment method", paymentMethod);
      setError("");

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.log("confirm error", confirmError);
        setError(confirmError.message);
        setIsSubmitting(false); // Reset form submission state
      } else {
        console.log("payment intent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          console.log("transaction id", paymentIntent.id);
          setTransactionId(paymentIntent.id);

          let premiumTakenDate = new Date();
          if (time === "1 min") {
            premiumTakenDate.setMinutes(premiumTakenDate.getMinutes() + 1);
          } else if (time === "5 day") {
            premiumTakenDate.setDate(premiumTakenDate.getDate() + 5);
          } else if (time === "10 day") {
            premiumTakenDate.setDate(premiumTakenDate.getDate() + 10);
          }

          mutateAsync(premiumTakenDate);
        }
      }
    }
  };

  return (
    <div className="border p-4 border-stone-600">
      <form onSubmit={handleSubmit} className="space-y-5 pt-5">
        <div>
          <label className="font-semibold text-base text-stone-500 italic">
            {" "}
            User Name
          </label>
          <input
            className="border p-4 w-full"
            defaultValue={user?.displayName}
            disabled
            type="text"
          />
        </div>
        <div>
          <label className="font-semibold text-base text-stone-500 italic">
            {" "}
            Card Number
          </label>
          <CardElement
            className="border p-4"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div>
          <label className="font-semibold text-base text-stone-500 italic mt-5">
            {" "}
            Choose Plan
          </label>

          <select
            onChange={(e) => {
              if (e.target.value === "1 min") {
                setPrice(5);
              } else if (e.target.value === "5 day") {
                setPrice(15);
              } else if (e.target.value === "10 day") {
                setPrice(25);
              }
            }}
            className="w-full border p-4 "
            name="time"
            defaultValue=""
          >
            <option value="" disabled>
              Choose Duration
            </option>
            <option value="1 min">1 min</option>
            <option value="5 day">5 day</option>
            <option value="10 day">10 day</option>
          </select>
        </div>
        <div className="flex justify-center items-center">
          <Button
            label="Pay"
            type="submit"
            stripe={stripe}
            disabled={!stripe || isSubmitting}
          />
        </div>
        <p className="text-red-600">{error}</p>
      </form>
    </div>
  );
}

export default CheckoutForm;
