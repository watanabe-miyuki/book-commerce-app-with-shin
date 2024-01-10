import prisma from "@/app/lib/next-auth/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
// ページを表示するときにデータ保存
export async function POST(request: Request, response: Response) {
  const { sessionId } = await request.json();
//   console.log('hogehoge', sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // console.log('hogehoge', session);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });

    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json(purchase);
    } else {
      return NextResponse.json({ message: "購入済みです" });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
