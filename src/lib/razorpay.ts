import type { Course } from "@/data/courses";

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  image?: string;
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: { razorpay_payment_id: string }) => void;
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayConstructor = new (options: RazorpayOptions) => {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
}

export async function openRazorpayCheckout({
  course,
  onSuccess,
  onMissingKey,
  onScriptError,
}: {
  course: Course;
  onSuccess?: (paymentId: string) => void;
  onMissingKey?: () => void;
  onScriptError?: () => void;
}) {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;

  if (!key) {
    onMissingKey?.();
    return;
  }

  const loaded = await loadRazorpayScript();

  if (!loaded || !window.Razorpay) {
    onScriptError?.();
    return;
  }

  const checkout = new window.Razorpay({
    key,
    amount: course.amountPaise,
    currency: "INR",
    name: "Coding Gurukul",
    description: course.title,
    image: "/logo.png",
    notes: {
      courseId: course.id,
      courseTitle: course.title,
    },
    theme: {
      color: "#0a47a3",
    },
    handler: (response) => {
      onSuccess?.(response.razorpay_payment_id);
    },
  });

  checkout.open();
}
