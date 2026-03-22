import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-2xl bg-card p-12 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="mb-3 text-2xl font-semibold text-card-foreground">
          Payment Successful
        </h1>

        <p className="mb-2 text-muted-foreground">
          Your order has been placed successfully!
        </p>

        <p className="mb-8 text-muted-foreground">
          Thank you for ordering from <strong>FoodCart</strong>
        </p>

        <Link
          href="/menu"
          className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Order More Food
        </Link>
      </div>
    </div>
  );
}
