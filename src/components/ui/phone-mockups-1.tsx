import React from "react";
import { Compass, Dumbbell, CreditCard, ScanLine } from "lucide-react";
import { AppStep, PhoneCarousel } from "./phone-carousel";

const exampleSteps: AppStep[] = [
  {
    title: "Discover",
    desc: "Browse vetted fitness centres near you — from strength gyms to yoga studios.",
    icon: Compass,
    src: "https://images.unsplash.com/photo-1526506118182-df38d2f5592e?q=80&w=800&auto=format&fit=crop",
    alt: "Discover Fitness Centres",
  },
  {
    title: "Choose",
    desc: "Pick the workout that fits your mood, schedule, and goals.",
    icon: Dumbbell,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    alt: "Choose Your Workout",
  },
  {
    title: "Book & Pay",
    desc: "Reserve your spot and pay per session — no subscriptions required.",
    icon: CreditCard,
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    alt: "Book and Pay Seamlessly",
  },
  {
    title: "Check In",
    desc: "Show up, scan in, and start your workout instantly.",
    icon: ScanLine,
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    alt: "Check In Instantly",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel steps={exampleSteps} />;
}
