import Card from "../components/Card";
import Logo from "../assets/DigitalízandoANayarit.png";
import type { Business, Theme } from "../types/business";

type DetailsProps = {
  businesses: Business[];
  category: string;
  onBack: () => void;
  onOpenBusiness: (business: Business) => void;
  onToggleTheme: () => void;
  theme: Theme;
};

function Details({
  businesses,
  category,
  onBack,
  onOpenBusiness,
  onToggleTheme,
  theme,
}: DetailsProps) {
  return (
    <div className="directory-page details-page" data-theme={theme}>
      <header className="site-header">
        <button className="back-link" type="button" onClick={onBack}>
          Volver
        </button>

        <a
          className="brand"
          href="#inicio"
          aria-label="Digitalizando A Nayarit"
        >
          <span className="brand-mark" aria-hidden="true">
            <img src={Logo} alt="" />
          </span>
          <span className="brand-text">Digitalizando A Nayarit</span>
        </a>

        <button
          className="theme-toggle"
          type="button"
          aria-label={
            theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
          }
          aria-pressed={theme === "dark"}
          onClick={onToggleTheme}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb">
              <span className="sun-icon" />
              <span className="moon-icon" />
            </span>
          </span>
        </button>
      </header>

      <main className="details-main" id="contenido-principal">
        <section className="details-hero" aria-labelledby="details-title">
          <span className="eyebrow eyebrow-light">Categoría</span>
          <h1 id="details-title">{category}</h1>
          <p>
            Consulta todos los servicios disponibles en esta categoría. Los
            patrocinados se mantienen resaltados para darles mayor visibilidad.
          </p>
        </section>

        <section
          className="details-results"
          aria-label={`Negocios de ${category}`}
        >
          <div className="details-results-heading">
            <h2>{businesses.length} servicios encontrados</h2>
          </div>

          <div className="details-grid">
            {businesses.map((business) => (
              <Card
                business={business}
                key={business.id}
                onOpenBusiness={onOpenBusiness}
                sponsored={business.featured}
                showProfileHint
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Details;
