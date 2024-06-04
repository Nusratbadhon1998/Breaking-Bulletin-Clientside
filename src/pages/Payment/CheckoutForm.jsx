import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CheckoutForm() {
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleTime = (e) => {
    const time = e.target.value;
    setDay(time);

    if (time === "1 min") {
      setPrice(5);
    } else if (time === "5 day") {
      setPrice(15);
    } else if (time === "10 day") {
      setPrice(25);
    }
  };

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const { mutateAsync } = useMutation({
    mutationFn: async (premiumTakenDate) => {
      const premiumTakenDateFormatted = new Date(premiumTakenDate).toISOString();
      console.log(premiumTakenDateFormatted) // Ensure correct date format

      const res = await axiosSecure.patch(`/user/${user?.email}`,{premiumTakenDate:premiumTakenDateFormatted});
      console.log(res);
    },
    onSuccess: () => {
      toast.success("Payment Successful");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
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
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        let premiumTakenDate = new Date();
        if (day === "1 min") {
          premiumTakenDate.setMinutes(premiumTakenDate.getMinutes() + 1);
        } else if (day === "5 day") {
          premiumTakenDate.setDate(premiumTakenDate.getDate() + 5);
        } else if (day === "10 day") {
          premiumTakenDate.setDate(premiumTakenDate.getDate() + 10);
        }

        console.log(premiumTakenDate);

        mutateAsync(premiumTakenDate);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
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
      <select onChange={(e) => handleTime(e)} name="" id="">
        <option value="1 min">1 min</option>
        <option value="5 day">5 day</option>
        <option value="10 day">10 day</option>
      </select>
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {/* {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )} */}
    </form>
  );
}

export default CheckoutForm;
