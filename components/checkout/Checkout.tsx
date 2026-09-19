"use client";

import Image from "next/image";
import { useRef, useState, useEffect, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/storefront/Icon";
import { formatMoney } from "@/lib/money";

export function Checkout() {
  const locale = useLocale();
  const fr = locale === "fr";
  const { cart, openCart, pendingLineId } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "complete">("details");
  const heading = useRef<HTMLHeadingElement>(null);
  const text = (french: string, english: string) => fr ? french : english;
  useEffect(() => { if (step !== "details") heading.current?.focus(); }, [step]);

  function continueToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep("payment");
  }

  if (!cart?.lines.length) return <section className="container checkout-empty">
    <p className="eyebrow">ALBEA / PULSE</p>
    <h1>{text("Votre prochain petit geste commence ici.", "Your next little act of care starts here.")}</h1>
    <p>{text("Ajoutez albea™ Pulse à votre panier pour continuer.", "Add albea™ Pulse to your bag to continue.")}</p>
    <Link href="/product/albea" className="button">{text("Découvrir albea™ Pulse", "Discover albea™ Pulse")}<Icon width="18" /></Link>
  </section>;

  const total = formatMoney(cart.cost.subtotalAmount, locale);
  return <section className="container checkout-page">
    <Link href="/product/albea" className="checkout-back"><span aria-hidden="true">←</span>{text("Continuer mes achats", "Continue shopping")}</Link>
    <div className="checkout-heading">
      <p className="eyebrow">ALBEA / PULSE</p>
      <h1 ref={heading} tabIndex={-1}>{step === "complete" ? text("Merci pour votre confiance.", "Thank you for choosing albea.") : text("Votre prochain pas.", "Your next step.")}</h1>
      <p>{step === "complete" ? text("Un peu de soin. Une vie en mouvement.", "A little care. A lifetime of movement.") : text("Une petite attention pour vos pieds, en quelques étapes.", "A little care for your feet, in a few simple steps.")}</p>
    </div>
    <div className="checkout-grid">
      <div className="checkout-main">
        <ol className="checkout-steps" aria-label={text("Étapes de la commande", "Checkout steps")}>
          {[text("Coordonnées", "Details"), text("Paiement", "Payment"), text("Confirmation", "Confirmation")].map((label, i) => <li key={label} className={i === ["details", "payment", "complete"].indexOf(step) ? "active" : ""} aria-current={i === ["details", "payment", "complete"].indexOf(step) ? "step" : undefined}><span>0{i + 1}</span>{label}</li>)}
        </ol>
        <form hidden={step !== "details"} onSubmit={continueToPayment} autoComplete="off">
          <fieldset className="checkout-section">
            <legend>{text("Vos coordonnées", "Contact details")}</legend>
            <label>{text("Adresse e-mail", "Email address")}<input type="email" name="email" required placeholder={text("vous@exemple.fr", "you@example.com")} /></label>
          </fieldset>
          <fieldset className="checkout-section">
            <legend>{text("Adresse de livraison", "Delivery address")}</legend>
            <div className="checkout-fields">
              <label>{text("Prénom", "First name")}<input name="firstName" required maxLength={80} /></label>
              <label>{text("Nom", "Last name")}<input name="lastName" required maxLength={80} /></label>
              <label className="checkout-full">{text("Adresse", "Address")}<input name="address" required maxLength={180} /></label>
              <label className="checkout-full">{text("Appartement, étage (facultatif)", "Apartment, suite (optional)")}<input name="apartment" maxLength={100} /></label>
              <label>{text("Code postal", "Postal code")}<input name="postalCode" required maxLength={12} /></label>
              <label>{text("Ville", "City")}<input name="city" required maxLength={100} /></label>
              <label className="checkout-full">{text("Pays", "Country")}<select name="country" defaultValue={fr ? "FR" : "US"}><option value="FR">France</option><option value="US">{text("États-Unis", "United States")}</option></select></label>
            </div>
          </fieldset>
          <div className="checkout-delivery"><Icon name="leaf" width="22"/><div><strong>{text("Livraison standard", "Standard delivery")}</strong><p>{text("À l’adresse de votre choix", "Delivered to your chosen address")}</p></div><strong>{text("Offerte", "Free")}</strong></div>
          <button type="submit" className="button checkout-submit" disabled={!!pendingLineId}>{text("Continuer vers le paiement", "Continue to payment")}<Icon width="19"/></button>
        </form>
        {step === "payment" && <div className="checkout-section checkout-payment">
          <h2>{text("Votre paiement", "Your payment")}</h2>
          <p>{text("Vérifiez votre sélection avant de confirmer votre commande.", "Review your selection before confirming your order.")}</p>
          <div className="checkout-payment-card"><svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true"><rect x="1" y="1" width="26" height="20" rx="3" stroke="currentColor"/><path d="M1 7h26M5 16h6" stroke="currentColor"/></svg><div><strong>{text("Carte bancaire", "Payment card")}</strong><span>•••• •••• •••• 4242</span></div><span className="checkout-selected" aria-hidden="true">✓</span></div>
          <button type="button" className="button checkout-submit" disabled={!!pendingLineId} onClick={() => setStep("complete")}>{text("Confirmer la commande", "Place order")} · {total}<Icon width="18"/></button>
          <button type="button" className="checkout-edit" onClick={() => setStep("details")}>{text("Modifier mes coordonnées", "Edit my details")}</button>
        </div>}
        {step === "complete" && <div className="checkout-complete" role="status"><span className="checkout-check" aria-hidden="true">✓</span><h2>{text("Votre commande est confirmée.", "Your order is confirmed.")}</h2><p>{text("Merci de faire une place à albea™ Pulse dans votre quotidien.", "Thank you for making room for albea™ Pulse in your everyday life.")}</p><Link href="/" className="button">{text("Retour à l’accueil", "Back to home")}<Icon width="18"/></Link></div>}
      </div>
      <aside className="checkout-summary" aria-label={text("Récapitulatif de la commande", "Order summary")}>
        <div className="checkout-summary-heading"><h2>{text("Votre sélection", "Your selection")}</h2>{step !== "complete" && <button className="checkout-edit" type="button" onClick={openCart}>{text("Modifier", "Edit")}</button>}</div>
        <ul className="checkout-items">{cart.lines.map(line => <li key={line.id}>
          <div className="checkout-item-image">{line.merchandise.product.image && <Image src={line.merchandise.product.image.url} alt="albea™ Pulse" width={84} height={84} />}<span>{line.quantity}</span></div>
          <div><strong>albea™ Pulse</strong><p>{line.merchandise.title}</p></div><strong>{formatMoney(line.cost.totalAmount, locale)}</strong>
        </li>)}</ul>
        <dl className="checkout-totals"><div><dt>{text("Sous-total", "Subtotal")}</dt><dd>{total}</dd></div><div><dt>{text("Livraison", "Delivery")}</dt><dd>{text("Offerte", "Free")}</dd></div><div className="checkout-total"><dt>Total <small>EUR</small></dt><dd>{total}</dd></div></dl>
        <p className="checkout-return"><Icon name="leaf" width="19"/>{text("Retours sous 30 jours sur toutes les commandes.", "30-day returns on all orders.")}</p>
      </aside>
    </div>
  </section>;
}
