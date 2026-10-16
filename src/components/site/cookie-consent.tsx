"use client";

import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

const COOKIE = "pzo_consent";

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(c))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };
  const rejectAll = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  };
  const savePrefs = () => {
    writeConsent({ necessary: true, analytics, marketing });
    setPrefsOpen(false);
    setVisible(false);
  };

  return (
    <>
      <div
        role="dialog"
        aria-label="Cookie consent"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-4 shadow-lg backdrop-blur md:p-6"
      >
        <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-700">
            We use strictly necessary cookies to run the cart and remember your order references.
            Optional analytics and marketing cookies are off by default. Choose what you allow.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-ghost" onClick={() => setPrefsOpen(true)}>
              Preferences
            </button>
            <button type="button" className="btn btn-secondary" onClick={rejectAll}>
              Reject all
            </button>
            <button type="button" className="btn btn-primary" onClick={acceptAll}>
              Accept all
            </button>
          </div>
        </div>
      </div>

      {prefsOpen ? (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4"
        >
          <div className="card w-full max-w-md p-6">
            <h2 className="display-sm">Cookie preferences</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span>Necessary (cart, order references)</span>
                <span className="text-ink-500">Always on</span>
              </li>
              <li className="flex items-center justify-between">
                <label htmlFor="cc-analytics">Analytics</label>
                <input
                  id="cc-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              </li>
              <li className="flex items-center justify-between">
                <label htmlFor="cc-marketing">Marketing</label>
                <input
                  id="cc-marketing"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
              </li>
            </ul>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => setPrefsOpen(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={savePrefs}>
                Save preferences
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
