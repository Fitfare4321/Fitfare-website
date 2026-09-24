import { useEffect, useRef } from "react";

type PageSEOProps = {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>[];
};

const PageSEO = ({ title, description, canonical, jsonLd }: PageSEOProps) => {
  const scriptIdsRef = useRef<string[]>([]);

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

    const previousScriptIds = [...scriptIdsRef.current];
    scriptIdsRef.current = [];

    if (jsonLd && jsonLd.length > 0) {
      jsonLd.forEach((schema, index) => {
        const id = `page-schema-${index}`;
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-schema-id", id);
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
        scriptIdsRef.current.push(id);
      });
    }

    return () => {
      if (canonicalLink) {
        canonicalLink.remove();
      }

      previousScriptIds.forEach((id) => {
        const script = document.querySelector(`script[data-schema-id="${id}"]`);
        if (script) script.remove();
      });

      scriptIdsRef.current = [];
    };
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default PageSEO;
