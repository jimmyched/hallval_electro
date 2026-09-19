"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { copy, localeOf } from "@/lib/content";
import { Icon } from "./Icon";
export function JoinForm() {
  const locale = localeOf(useLocale());
  const t = copy[locale];
  const [success, setSuccess] = useState(false);
  return (
    <section className="join-section section" id="join">
      <div className="container join-grid">
        <div>
          <p className="eyebrow">{t.joinEyebrow}</p>
          <h2>
            {t.joinTitle}
            <br />
            <em>{t.joinAccent}</em>
          </h2>
          <p>{t.joinIntro}</p>
          <span className="launch-mark">
            2027 <span>FRANCE / USA</span>
          </span>
        </div>
        <div className="signup-card">
          {success ? (
            <div className="signup-success" role="status">
              <span className="success-icon">
                <Icon name="check" />
              </span>
              <h3>{t.successTitle}</h3>
              <p>{t.successBody}</p>
              <button className="text-link" onClick={() => setSuccess(false)}>
                {t.reset}
                <Icon width="16" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSuccess(true);
              }}
            >
              <label htmlFor="join-email">{t.email}</label>
              <input
                id="join-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
              />
              <label htmlFor="join-market">{t.country}</label>
              <select
                id="join-market"
                name="market"
                defaultValue={locale === "fr" ? "FR" : "US"}
              >
                <option value="FR">France</option>
                <option value="US">
                  {locale === "fr" ? "États-Unis" : "United States"}
                </option>
                <option value="OTHER">
                  {locale === "fr" ? "Un autre pays" : "Somewhere else"}
                </option>
              </select>
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>{t.consent}</span>
              </label>
              <button className="button" type="submit">
                {t.submit}
                <Icon width="18" />
              </button>
              <p className="form-note">{t.formNote}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
