import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Container from "../../components/Shared/Container";

// Stripe promise for card payment
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

function Payment() {
  return (
    <Container>
      <div className="bg-stone-800 h-24 text-stone-200 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-center"> Payment Info</h1>
      </div>
      <div className="flex gap-3 justify-center items-center mt-3">
        <h1 className="font-semibold">Available Options:</h1>
        <img className="size-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDON9gh0vNwQmKxuhxveE3SEWRYrPb_ZUqw&s" alt="" />
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </Container>
  );
}

export default Payment;
