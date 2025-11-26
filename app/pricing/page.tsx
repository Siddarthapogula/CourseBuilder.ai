"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const pricingPlans = [
  {
    id: "TRIAL",
    name: "Trial",
    price: 0,
    credits: 3,
    description: "For testing.",
    features: ["3 Credits", "Public Access"],
    buttonText: "You've got them.",
    isPopular: false,
  },
  {
    id: "BUDDY",
    name: "Buddy",
    price: 99,
    credits: 10,
    description: "For students.",
    features: ["10 Credits", "Export PDF"],
    buttonText: "Get Buddy",
    isPopular: false,
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 249,
    credits: 30,
    description: "For serious professors and trainers.",
    features: ["30 Credits", "Export PDF", "Private Courses"],
    buttonText: "Get Professional",
    isPopular: true,
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Pricing() {
  const { data: userData, status: userStatus } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<any>(null);
  const router = useRouter();
  const handleBuyClick = async (plan: string) => {
    if (userStatus == "unauthenticated") {
      toast.warning("Please login to get Started");
      return;
    }
    toast.message("Currently working on this.");
    return;
    try {
      setCurrentPlanId(plan);
      setIsProcessing(true);
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        body: JSON.stringify({ plan }),
      });
      const { orderId, amount, currency } = await orderResponse.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_ID,
        amount: amount,
        currency: currency,
        name: "Course Builder AI",
        description: `Purchase ${plan} plan.`,
        order_id: orderId,
        handler: async function (response: any) {
          toast.dismiss();
          toast.loading("verifing payment");
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verifyResponse.ok) {
              alert("Payment verification failed, please contact support");
            }
            const result = await verifyResponse.json();
            if (result.isVerified) {
              toast.dismiss();
              toast.success("Payment Successful! Your plan is updated.");
              router.refresh();
            } else {
              alert(
                "Payment Signature Verification failed, please contact support"
              );
            }
          } catch (e: any) {
            toast.dismiss();
            toast.error("Payment failed, Please contact Support");
          }
        },
        prefill: {
          name: userData?.user?.name || "",
          email: userData?.user?.email || "",
        },
        theme: {
          color: "#4F46E5",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response: any) {
        toast.dismiss();
        toast.error("Payment Failed, Please try again");
        console.log("Payment Failed", response.error);
      });
    } catch (e: any) {
      toast.error("Failed to initiate" + e.message);
    } finally {
      setIsProcessing(false);
      setCurrentPlanId(null);
    }
  };
  return (
    <div className="min-h-screen py-24">
      <main className=" mx-auto max-w-4xl px-5 space-y-2">
        <div className=" mb-12">
          <h2 className="text-3xl font-medium tracking-tight">Pricing</h2>
          <p className="text-muted-foreground mt-2">
            Simple, one-time payments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`flex flex-col p-2`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {plan.isPopular && (
                    <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-medium">₹{plan.price}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-4 font-medium text-sm bg-secondary/50 w-fit px-2 py-1 rounded">
                  {plan.credits} Credits
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                  onClick={() => handleBuyClick(plan.id)}
                >
                  {plan.id == currentPlanId && isProcessing
                    ? "Processing.."
                    : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
