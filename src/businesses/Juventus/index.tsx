import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBusinessLogoUrl } from "../../data/businesses";
import type { BusinessPageProps } from "../../pages/BusinessRoute";
import Home from "./Home";
import Menu from "./Menu";
import styles from "./Juventus.module.css";

type Section = "home" | "menu";

export default function JuventusPage({ business }: BusinessPageProps) {
  const [section, setSection] = useState<Section>("home");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [section]);

  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#juventus-content">
        Saltar al contenido
      </a>

      <header className={styles.header}>
        <Link className={styles.directoryLink} to="/">
          <span aria-hidden="true">←</span> Directorio
        </Link>

        <button
          className={styles.brand}
          type="button"
          onClick={() => setSection("home")}
          aria-label={`Ir al inicio de ${business.name}`}
        >
          <img src={getBusinessLogoUrl(business)} alt="" />
          <span>{business.name}</span>
        </button>

        <nav className={styles.nav} aria-label={`Navegación de ${business.name}`}>
          <button
            type="button"
            aria-current={section === "home" ? "page" : undefined}
            onClick={() => setSection("home")}
          >
            Inicio
          </button>
          <button
            type="button"
            aria-current={section === "menu" ? "page" : undefined}
            onClick={() => setSection("menu")}
          >
            Menú
          </button>
        </nav>
      </header>

      <main id="juventus-content">
        {section === "home" ? (
          <Home onMenuClick={() => setSection("menu")} />
        ) : (
          <Menu />
        )}
      </main>

      <footer className={styles.footer}>
        <div>
          <img src={getBusinessLogoUrl(business)} alt="" />
          <strong>{business.name}</strong>
        </div>
        <p>{business.description}</p>
      </footer>
    </div>
  );
}
