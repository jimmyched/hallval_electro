import { setRequestLocale } from "next-intl/server";
import { Checkout } from "@/components/checkout/Checkout";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Checkout />;
}
