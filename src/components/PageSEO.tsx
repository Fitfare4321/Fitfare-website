import { useEffect } from "react";

type PageSEOProps = {
  title: string;
  description: string;
  canonical?: string;
};

const PageSEO = ({ title, description, canonical }: PageSEOProps) => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    let canonicalLink: HTMLLinkElement | null = null;
    if (canonical) {
      canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    return () => {
      if (canonicalLink) {
        canonicalLink.remove();
      }
    };
  }, [title, description, canonical]);

  return null;
};

export default PageSEO;
