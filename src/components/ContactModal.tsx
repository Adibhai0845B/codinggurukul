import React, { useEffect, useRef, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl?: string;
  onSuccess?: () => void;
}

export default function ContactModal({ isOpen, onClose, formUrl, onSuccess }: ContactModalProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      try {
        if (!e.origin) return;
        if (e.origin.includes("google.com")) {
          // Google Forms may post messages on submit — accept any message from google.com as a success hint
          setSubmitted(true);
          onSuccess && onSuccess();
        }
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onSuccess]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-lg shadow-xl w-full max-w-4xl mx-4">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-bold">Contact Form</h3>
          <div className="flex items-center gap-2">
            {submitted && <span className="text-sm text-green-500">Thanks — submission received</span>}
            <button className="text-muted-foreground px-2" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="p-4">
          {formUrl ? (
            <>
              <iframe
                ref={iframeRef}
                title="Contact Form"
                src={formUrl.includes("?") ? `${formUrl}&embedded=true` : `${formUrl}?embedded=true`}
                className="w-full h-[600px] border rounded-md"
                onLoad={() => {
                  // onLoad may fire after submission redirect; we can't read cross-origin href reliably
                  // so rely on postMessage or show nothing here
                }}
              />

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground max-w-xl">
                  If the form does not load due to Google security or embed restrictions, click the button to open the form in a new tab.
                </p>

                <div className="flex gap-2">
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>

              {/* Helpful diagnostic if user pasted an editor link */}
              {/(\/edit|usp=publish-editor)/i.test(formUrl) && (
                <div className="mt-3 text-sm text-yellow-700 bg-yellow-50 border border-yellow-100 p-3 rounded">
                  It looks like this link might be the form editor link. Open the form in Google Forms, click
                  "Send" → Link (chain icon) → copy the view/share link. Make sure "Anyone with the link can respond" is enabled.
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No form configured.</div>
          )}
        </div>
      </div>
    </div>
  );
}
