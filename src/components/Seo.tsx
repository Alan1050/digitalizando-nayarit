import { useLayoutEffect } from "react";
import { getBusinessLogoUrl } from "../data/businesses";
import type { Business } from "../types/business";

const siteName = "Digitalizando A Nayarit";
const defaultTitle = `${siteName} | Directorio de Negocios en Nayarit`;
const defaultDescription =
  "Descubre negocios, servicios, comercios y proyectos locales de Nayarit en un directorio creado para impulsar el consumo local.";
const defaultIcon = "/Logo2.png";

function getOrCreateMeta(attribute: "name" | "property", value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  return element;
}

function setMeta(attribute: "name" | "property", value: string, content: string) {
  getOrCreateMeta(attribute, value).content = content;
}

function getOrCreateLink(rel: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  return element;
}

function getAbsoluteUrl(path: string) {
  return new URL(path, window.location.origin).href;
}

function getImageType(path: string) {
  const extension = path.split(/[?#]/)[0].split(".").pop()?.toLowerCase();
  const imageTypes: Record<string, string> = {
    avif: "image/avif",
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
  };

  return extension ? imageTypes[extension] : undefined;
}

type SeoProps = {
  business?: Business;
};

function Seo({ business }: SeoProps) {
  useLayoutEffect(() => {
    const title = business
      ? `${business.seo?.title ?? business.name} | ${siteName}`
      : defaultTitle;
    const description = business?.seo?.description ?? business?.description ?? defaultDescription;
    const route = business?.route ?? "/";
    const canonicalUrl = getAbsoluteUrl(route);
    const iconUrl = business ? getBusinessLogoUrl(business) : defaultIcon;
    const absoluteIconUrl = getAbsoluteUrl(iconUrl);

    document.title = title;
    document.documentElement.lang = "es-MX";

    const favicon = getOrCreateLink("icon");
    favicon.href = iconUrl;
    favicon.type = getImageType(iconUrl) ?? "image/png";

    getOrCreateLink("canonical").href = canonicalUrl;

    setMeta("name", "description", description);
    setMeta("name", "application-name", business?.name ?? siteName);
    setMeta(
      "name",
      "keywords",
      business?.seo?.keywords?.join(", ") ??
        "negocios en Nayarit, directorio de negocios, consumo local Nayarit",
    );
    setMeta("name", "twitter:card", business ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteIconUrl);

    setMeta("property", "og:type", business ? "business.business" : "website");
    setMeta("property", "og:locale", "es_MX");
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", absoluteIconUrl);
    setMeta("property", "og:image:alt", business?.name ?? siteName);

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      "#page-structured-data",
    );

    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "page-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify(
      business
        ? {
            "@context": "https://schema.org",
            "@type": business.seo?.schemaType ?? "LocalBusiness",
            name: business.name,
            description,
            image: absoluteIconUrl,
            telephone: business.contact,
            address: {
              "@type": "PostalAddress",
              addressLocality: business.location,
              addressCountry: "MX",
            },
            url: canonicalUrl,
          }
        : {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            description: defaultDescription,
            inLanguage: "es-MX",
            url: canonicalUrl,
          },
    );
  }, [business]);

  return null;
}

export default Seo;
