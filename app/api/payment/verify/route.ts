import {
  HandleApiError,
  ValidationError,
} from "@/lib/utils/error-handling-class";
import { planType } from "@prisma/client";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
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

const rzp = new Razorpay({
  key_id: process.env.RAZOR_PAY_TEST_ID,
  key_secret: process.env.RAZOR_PAY_TEST_SECRET,
});

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    console.log(session);
    if (!session?.user) {
      throw new ValidationError("Unauthenticated");
    }
    const userId = session?.user?.id;
    if (!userId) {
      throw new ValidationError("user Id Not found");
    }
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();
    const WEBHOOK_SECRET = process.env.RAZOR_PAY_TEST_SECRET;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET!)
      .update(body.toString())
      .digest("hex");
    const isVerified = expectedSignature == razorpay_signature;
    if (!isVerified) {
      return NextResponse.json({ isVerified: false }, { status: 400 });
    }
    const existingPayment = await prisma.processedPayment.findUnique({
      where: { razorpayPaymentId: razorpay_payment_id },
    });

    if (existingPayment) {
      return NextResponse.json({
        isVerified: true,
        message: "Already processed",
      });
    }
    const order: any = await rzp.orders.fetch(razorpay_order_id);
    if (!order) {
      throw new ValidationError("RazorPay order not found");
    }
    const plan = order?.notes.plan as planType;
    const creditsToAdd = parseInt(order?.notes?.credits, 10);

    if (!plan || isNaN(creditsToAdd)) {
      throw new Error("Order notes are missing required data");
    }
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          plan: plan,
          credits: { increment: creditsToAdd },
        },
      });
      await tx.processedPayment.create({
        data: {
          razorpayPaymentId: razorpay_payment_id,
          userId: userId,
          plan: plan,
        },
      });
    });
    return NextResponse.json({
      isVerified: true,
      message: "Payment Successull",
    });
  } catch (e: any) {
    throw HandleApiError(e);
  }
}
