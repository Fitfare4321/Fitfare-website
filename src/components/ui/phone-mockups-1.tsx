import React from "react";
import { ImageItem, PhoneCarousel } from "./phone-carousel";

const exampleImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1526506118182-df38d2f5592e?q=80&w=800&auto=format&fit=crop", // Discover
    alt: "Discover Fitness Centres",
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", // Choose
    alt: "Choose Your Workout",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", // Book & Pay
    alt: "Book and Pay Seamlessly",
  },
  {
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop", // Check In
    alt: "Check In Instantly",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
