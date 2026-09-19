export function RatingStars({ rating = 5 }: { rating?: number }) {
  return <span className="rating-stars" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((star) => <span className="rating-star" key={star}>
      <svg viewBox="0 0 24 24"><path d="m12 2.7 2.8 5.7 6.3.9-4.5 4.4 1 6.3-5.6-3-5.6 3 1-6.3L2.9 9.3l6.3-.9Z" /></svg>
      <span style={{ width: `${Math.max(0, Math.min(1, rating - star + 1)) * 100}%` }}><svg viewBox="0 0 24 24"><path d="m12 2.7 2.8 5.7 6.3.9-4.5 4.4 1 6.3-5.6-3-5.6 3 1-6.3L2.9 9.3l6.3-.9Z" /></svg></span>
    </span>)}
  </span>;
}
