import { describe, it, expect } from "vitest";

describe("navbar section links", () => {
  it("uses root-relative homepage anchors from blog pages", () => {
    const normalizeSectionLink = (href: string, currentPath = "/blog/post-workout-recipes") => {
      if (!href.startsWith("#")) return href;
      const id = href.slice(1);
      if (currentPath === "/") return `/#${id}`;
      return `/#${id}`;
    };

    expect(normalizeSectionLink("#home", "/blog/post-workout-recipes")).toBe("/#home");
    expect(normalizeSectionLink("#about", "/blog")).toBe("/#about");
    expect(normalizeSectionLink("#testimonials", "/blog/post-workout-recipes")).toBe("/#testimonials");
  });
});
