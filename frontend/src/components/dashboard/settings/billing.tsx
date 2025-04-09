import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { onPayment } from "@/api/profile";
import Loader from "@/components/ui/loader";
import { usePlans } from "@/provider/plan-provider";

const plans = [
  {
    name: "FREE",
    price: "$0/mo",
    features: ["1 Project", "5GB Storage", "Basic Support"],
    paymentId: "price_1R501OSBUvlYX3FBtYBmmdhS",
  },
  {
    name: "PRO",
    price: "$29.99/mo",
    features: ["5 Projects", "50GB Storage", "Priority Support"],
    paymentId: "price_1R502fSBUvlYX3FBVAwXJjhb",
  },
  {
    name: "UNLIMITED",
    price: "$99.99/mo",
    features: ["Unlimited Projects", "500GB Storage", "24/7 Support"],
    paymentId: "price_1R503GSBUvlYX3FBCXwupWf1",
  },
];

function BillingPage() {
  const { isLoading: Loading, plan, Error } = usePlans();

  return (
    <div className="container mx-auto px-4 py-12">
      {Error ? (
        <div className="flex justify-center items-center text-red-500">
          Something went wrong
        </div>
      ) : Loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">
            Choose Your Plan
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {plans.map((data) => (
              <Card
                key={data.name}
                className="p-4 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-center">
                    {data.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-2xl font-bold mb-4">
                    {data.price}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {data.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => onPayment(data.paymentId)}
                  >
                    {data.name === plan ? "Current" : "Purchase"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default BillingPage;
