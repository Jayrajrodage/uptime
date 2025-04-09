import { Card } from "@/components/ui/card";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const onPaymentSuccess = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("session_id");
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/payment/success`,
        {
          sessionId: id,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      console.log("🚀 ~ onPayment ~ error:", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    onPaymentSuccess();
  }, []);
  return (
    <HeroHighlight>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex flex-col items-center">
            <CircleCheckIcon className="text-green-500 h-16 w-16" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">
              Payment Successful
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Thank you for your payment. Your order is being processed.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href={"/dashboard/settings/billing"}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
            >
              Back To Dashboard
            </a>
          </div>
        </Card>
      </div>
    </HeroHighlight>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
