import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ closeModal, totalPrice, orderData }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();

    // 🔹 Get Client Secret
    useEffect(() => {
        if (!orderData?.plantId || !orderData?.quantity) return;

        const getClientSecret = async () => {
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/create-payment-intent`,
                    {
                        plantId: orderData.plantId,
                        quantity: orderData.quantity,
                    }
                );

                setClientSecret(data.clientSecret);
            } catch (err) {
                // toast.error(`Failed to initialize payment and ${err}`);
                console.log(err)
            }
        };

        getClientSecret();
    }, [orderData]);

    // 🔹 Submit Payment
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);

        const card = elements.getElement(CardElement);

        /* const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                },
            }
        ); */
        // Confirm card payment with billing details
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || "Guest",
                    email: user?.email || "guest@example.com",
                },
            },
        });


        if (result?.error) {
            toast.error(result?.error.message);
            setLoading(false);
            return;
        }

        if (result?.paymentIntent?.status === "succeeded") {
            toast.success("Your ! 🌿 order has been placed successfully! 🎉");
            orderData.transactionId = result?.paymentIntent?.id
            // save order data in db

            try {
                const { data } = await axiosSecure.post(`/order`, orderData);
                if (data?.insertedId) {
                    toast.success("Order placed successfully! 🎉");
                }
                const { data: result } = await axios.patch(
                    ` ${import.meta.env.VITE_API_URL}/quantity-update/${orderData?.plantId}`,
                    { quantityToUpdate: orderData?.quantity, status: 'decrease' }
                )
                // fetchPlant()
                console.log(result)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
                closeModal()
            }
        }


        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800">
                💳 Secure Payment
            </h2>

            <div className="border p-3 rounded-lg">
                <CardElement />
            </div>

            <div className="mt-6 flex flex-col gap-4">

                {/* Confirm Button */}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex items-center justify-center
                     bg-gradient-to-r from-green-500 to-emerald-600
                     text-white font-semibold py-3 rounded-xl
                     shadow-md hover:shadow-lg
                     transition duration-300 disabled:opacity-60"
                >
                    {loading ? (
                        <TbFidgetSpinner className="animate-spin text-xl" />
                    ) : (
                        `Confirm Payment $${totalPrice}`
                    )}
                </button>

                {/* Cancel Button */}
                <button
                    type="button"
                    onClick={closeModal}
                    className="py-3 rounded-xl font-bold
                     bg-red-200 text-black
                     hover:bg-red-50 hover:text-red-600
                     transition duration-300"
                >
                    Cancel Payment
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;