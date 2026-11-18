import { describe, it, expect, beforeAll } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompactLandingPage from "../pages/CompactLandingPage";

beforeAll(() => {
  class MockIntersectionObserver {
    observe = () => null;
    unobserve = () => null;
    disconnect = () => null;
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  class MockResizeObserver {
    observe = () => null;
    unobserve = () => null;
    disconnect = () => null;
  }
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });

  // Mock HTMLCanvasElement.getContext for JSDOM
  HTMLCanvasElement.prototype.getContext = (() => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: new Array(100) }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  })) as any;
});

describe("CompactLandingPage", () => {
  it("renders the hero content from the brief", () => {
    render(
      <BrowserRouter>
        <CompactLandingPage />
      </BrowserRouter>
    );

    // Hero checks — bento grid layout splits text across elements
    expect(screen.getByText(/Paying for a full month\./i)).toBeDefined();
    expect(screen.getByText(/a few days\?/i)).toBeDefined();
    expect(screen.getByText(/Busy weeks happen\. Your fitness spending should fit your routine\./i)).toBeDefined();
    expect(screen.getAllByText(/Options from/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\*Prices vary by centre, activity and booking. Check the app for current rates and availability./i).length).toBeGreaterThan(0);

    // Auto-moving categories marquee checks
    expect(screen.getAllByText(/Gyms/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Yoga/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pilates/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Zumba/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Calisthenics/i).length).toBeGreaterThan(0);

    // How Fit Credits Work checks
    expect(screen.getByText(/HOW FIT CREDITS WORK/i)).toBeDefined();
    expect(screen.getAllByText(/Add Fit Credits/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Top up your FitFare wallet in the app./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Find your activity/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Choose a fitness centre and the activity you want to try./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Book on demand/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Use credits for your chosen workout. Fit Credits expire after 60 days./i).length).toBeGreaterThan(0);

    // Footer checks — uses the same CinematicFooter as the landing page
    expect(screen.getByText(/Ready to begin\?/i)).toBeDefined();
    expect(screen.getByText(/Download iOS/i)).toBeDefined();
    expect(screen.getByText(/Download Android/i)).toBeDefined();
    expect(screen.getAllByText(/All rights reserved/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/About Us/i)).toBeDefined();
    expect(screen.getByText(/Privacy Policy/i)).toBeDefined();

    // Verify removed mini-form is NOT present
    expect(screen.queryByText(/CENTRE REQUEST MINI-FORM/i)).toBeNull();
    expect(screen.queryByText(/Missing your favourite fitness centre\?/i)).toBeNull();
    expect(screen.queryByText(/Request a centre/i)).toBeNull();
  });
});
