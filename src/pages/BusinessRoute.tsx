import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { businesses } from "../data/businesses";
import type { Business } from "../types/business";

export type BusinessPageProps = {
  business: Business;
};

type BusinessPageModule = {
  default: ComponentType<BusinessPageProps>;
};

const pageModules = import.meta.glob<BusinessPageModule>(
  "../businesses/*/index.tsx",
);

const businessPages = Object.fromEntries(
  Object.entries(pageModules).map(([path, loadModule]) => {
    const folderName = path.match(/\/businesses\/([^/]+)\/index\.tsx$/)?.[1];

    return [folderName?.toLowerCase(), lazy(loadModule)];
  }),
) as Record<string, ComponentType<BusinessPageProps>>;

function normalizeRoute(route: string) {
  const normalized = `/${route}`.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return normalized || "/";
}

function BusinessRoute() {
  const { pathname } = useLocation();
  const business = businesses.find(
    (item) => normalizeRoute(item.route) === normalizeRoute(pathname),
  );

  if (!business) {
    return <Navigate to="/" replace />;
  }

  const BusinessPage = businessPages[business.page.toLowerCase()];

  if (!BusinessPage) {
    return (
      <main className="route-error">
        <h1>{business.name}</h1>
        <p>
          La página está registrada, pero falta el archivo
          {` src/businesses/${business.page}/index.tsx`}.
        </p>
        <Link to="/">Volver al directorio</Link>
      </main>
    );
  }

  return (
    <>
      <Seo business={business} />
      <Suspense fallback={<div className="route-loading">Cargando negocio…</div>}>
        <BusinessPage business={business} />
      </Suspense>
    </>
  );
}

export default BusinessRoute;
