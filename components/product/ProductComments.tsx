"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { RatingStars } from "./RatingStars";

export function ProductComments() {
  const fr = useLocale() === "fr";
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState<{ name: string; body: string; rating: number }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const body = String(data.get("comment") || "").trim();
    if (!name || body.length < 10) return;
    setComments((current) => [...current, { name, body, rating }]);
    setSubmitted(true);
    setRating(5);
    form.reset();
  }
  return <div className="product-comments">
    {comments.map((comment, i) => <article className="local-comment" key={i}>
      <div><strong>{comment.name}</strong><span aria-label={`${comment.rating}/5`}><RatingStars rating={comment.rating}/></span></div>
      <p>{comment.body}</p>
      <small>{fr ? "Votre impression" : "Your thoughts"}</small>
    </article>)}
    <details className="comment-composer">
      <summary>{fr ? "Partager une impression" : "Share your thoughts"}<span aria-hidden="true">＋</span></summary>
      <form onSubmit={submit}>
        <p>{fr ? "Que pensez-vous du concept albea™ Pulse ?" : "What do you think of the albea™ Pulse concept?"}</p>
        <div className="comment-fields">
          <label>{fr ? "Prénom" : "First name"}<input name="name" autoComplete="given-name" required maxLength={60}/></label>
          <fieldset><legend>{fr ? "Votre note du concept" : "Your concept rating"}</legend><div className="rating-options">{[1,2,3,4,5].map((value) => <label key={value} className={value <= rating ? "chosen" : ""}>
            <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} aria-label={fr ? `${value} sur 5` : `${value} out of 5`}/><span aria-hidden="true">★</span>
          </label>)}</div></fieldset>
        </div>
        <label>{fr ? "Votre commentaire" : "Your comment"}<textarea name="comment" rows={4} required minLength={10} maxLength={1200}/></label>
        <button className="button" type="submit">{fr ? "Ajouter mon commentaire" : "Add my comment"}</button>
        <p className="comment-status" role="status">{submitted && (fr ? "Merci pour votre commentaire !" : "Thank you for sharing your thoughts!")}</p>
      </form>
    </details>
  </div>;
}
