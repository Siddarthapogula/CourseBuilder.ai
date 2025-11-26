import {
  HandleApiError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import { planType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const planobject = {
  [planType.BUDDY]: {
    amount: 99 * 100,
    credits: 10,
  },
  [planType.PROFESSIONAL]: {
    amount: 249 * 100,
    credits: 30,
  },
  [planType.TRIAL]: {
    amount: 0,
    credits: 0,
  },
};

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZOR_PAY_TEST_ID,
  key_secret: process.env.RAZOR_PAY_TEST_SECRET,
});

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession();
    if (!session?.user) {
      throw new ValidationError("Unauthenticated");
    }
    const userId = session.user.id;
    const body = await req.json();
    const { plan } = body as { plan: planType };
    if (!plan || !planobject[plan] || plan == planType.TRIAL) {
      throw new ValidationError("Invalid Plan type");
    }
    const planInfo = planobject[plan];
    const options = {
      amount: planInfo.amount,
      currency: "INR",
      receipt: `receipt_${userId}_${new Date().getTime()}`,

      notes: {
        userId: userId,
        plan: plan,
        credits: planInfo.credits,
      },
    };
    const order = await razorPayInstance.orders.create(options);
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e: any) {
    throw HandleApiError(e);
  }
}
