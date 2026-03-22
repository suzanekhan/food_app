import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const popularChoices = [
  {
    name: "Burger House",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500",
  },
  {
    name: "Salad Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
  },
  {
    name: "Spice Junction",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500",
  },
];

const steps = [
  {
    title: "Browse",
    description: "Explore food items & cuisines",
  },
  {
    title: "Checkout",
    description: "Add items & confirm your order",
  },
  {
    title: "Delivery",
    description: "Fast & secure delivery to your door",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920"
            alt="Delicious food background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <h1 className="mb-4 text-balance text-4xl font-bold text-white md:text-6xl">
          Delicious Food Delivered
        </h1>
        <p className="mb-8 text-pretty text-lg font-light text-white/90 md:text-2xl">
          Order from top-rated restaurants near you
        </p>

        <Link
          href="/menu"
          className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90"
        >
          Order Now
        </Link>
      </section>

      {/* Popular Choices */}
      <section className="bg-muted px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-semibold text-foreground md:text-4xl">
            Popular Choices
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {popularChoices.map((choice) => (
              <Link
                key={choice.name}
                href="/menu"
                className="group w-full max-w-[270px] overflow-hidden rounded-2xl bg-card shadow-md transition-transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={choice.image}
                    alt={choice.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="p-5 text-center text-lg font-semibold text-primary">
                  {choice.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-semibold text-foreground md:text-4xl">
            How It Works
          </h2>

          <div className="flex flex-wrap justify-center gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="w-56 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h4 className="mb-2 text-xl font-semibold text-primary">
                  {step.title}
                </h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
