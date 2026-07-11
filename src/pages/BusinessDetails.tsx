import Card from "../components/Card";
import Logo from "../assets/DigitalízandoANayarit.png";
import type { Business, Theme } from "../types/business";

type BusinessDetailsProps = {
  business: Business;
  onBack: () => void;
  onToggleTheme: () => void;
  theme: Theme;
};

function BusinessDetails({
  business,
  onBack,
  onToggleTheme,
  theme,
}: BusinessDetailsProps) {
  return (
    <div
      className="directory-page details-page business-profile-page"
      data-theme={theme}
    >
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
        <section
          className="business-profile-hero"
          aria-labelledby="business-profile-title"
        >
          <div>
            <span className="eyebrow eyebrow-light">{business.category}</span>
            <h1 id="business-profile-title">{business.name}</h1>
            <p>{business.description}</p>
          </div>

          <aside
            className="business-profile-panel"
            aria-label="Resumen del negocio"
          >
            <span>
              {business.featured
                ? "Patrocinado"
                : business.verified
                  ? "Verificado"
                  : "Nuevo"}
            </span>
            <strong>{business.location}</strong>
          </aside>
        </section>

        <section
          className="business-profile-content"
          aria-label="Información del negocio"
        >
          <Card className="profile-info-card">
            <h2>Servicios</h2>
            <div className="tag-list">
              {business.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Card>

          <Card className="profile-info-card">
            <h2>Datos generales</h2>
            <dl className="profile-details-list">
              <div>
                <dt>Sector</dt>
                <dd>{business.sector}</dd>
              </div>
              <div>
                <dt>Categoría</dt>
                <dd>{business.category}</dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{business.location}</dd>
              </div>
            </dl>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default BusinessDetails;
