import { useMemo, useState } from "react";
import "../App.css";
import Logo from "../assets/DigitalízandoANayarit.png";
import Card from "../components/Card";
import businesses from "../data/businesses.json";
import type { Business, BusinessFilters, SortBy, Theme } from "../types/business";
import BusinessDetails from "./BusinessDetails";
import Details from "./Details";

const sectors = [
  "Belleza",
  "Alimentos",
  "Servicios",
  "Comercio",
  "Salud",
  "Turismo",
];

const visibleBusinessesPerCategory = 6;

const registeredBusinesses: Business[] = businesses;

function interleaveSponsored(businesses: Business[]) {
  const sponsored = businesses.filter((business) => business.featured);
  const regular = businesses.filter((business) => !business.featured);
  const ordered: Business[] = [];
  let sponsoredIndex = 0;
  let regularIndex = 0;

  if (sponsored[sponsoredIndex]) {
    ordered.push(sponsored[sponsoredIndex]);
    sponsoredIndex += 1;
  }

  while (regularIndex < regular.length || sponsoredIndex < sponsored.length) {
    for (
      let index = 0;
      index < 5 && regularIndex < regular.length;
      index += 1
    ) {
      ordered.push(regular[regularIndex]);
      regularIndex += 1;
    }

    if (sponsored[sponsoredIndex]) {
      ordered.push(sponsored[sponsoredIndex]);
      sponsoredIndex += 1;
    }
  }

  return ordered;
}

function HomePage() {
  const [filters, setFilters] = useState<BusinessFilters>({
    name: "",
    sector: "",
    sortBy: "featured",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [theme, setTheme] = useState<Theme>("light");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBusinesses = useMemo(() => {
    const normalizedName = filters.name.trim().toLowerCase();

    return registeredBusinesses
      .filter((business) => {
        const matchesName = normalizedName
          ? `${business.name} ${business.category} ${business.description} ${business.location}`
              .toLowerCase()
              .includes(normalizedName)
          : true;
        const matchesSector = filters.sector
          ? business.sector === filters.sector
          : true;
        return matchesName && matchesSector;
      })
      .sort((a, b) => {
        if (filters.sortBy === "name") {
          return a.name.localeCompare(b.name);
        }

        if (filters.sortBy === "sector") {
          return a.sector.localeCompare(b.sector);
        }

        return (
          Number(b.featured) - Number(a.featured) ||
          a.name.localeCompare(b.name)
        );
      });
  }, [filters]);

  const businessSections = useMemo(() => {
    const categories = [
      ...new Set(filteredBusinesses.map((business) => business.category)),
    ];

    return categories.map((category) => {
      const businesses = interleaveSponsored(
        filteredBusinesses.filter((business) => business.category === category),
      );

      return {
        category,
        businesses,
        visibleBusinesses: businesses.slice(0, visibleBusinessesPerCategory),
        hasMore: businesses.length > visibleBusinessesPerCategory,
      };
    });
  }, [filteredBusinesses]);

  const totalBusinesses = registeredBusinesses.length;
  const activeFilters = [filters.name, filters.sector].filter(Boolean).length;
  const selectedCategoryBusinesses = useMemo(
    () =>
      interleaveSponsored(
        registeredBusinesses.filter(
          (business) => business.category === selectedCategory,
        ),
      ),
    [selectedCategory],
  );

  const updateFilter = (key: keyof BusinessFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: key === "sortBy" ? (value as SortBy) : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      sector: "",
      sortBy: "featured",
    });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  if (selectedBusiness) {
    return (
      <BusinessDetails
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
    );
  }

  if (selectedCategory) {
    return (
      <Details
        businesses={selectedCategoryBusinesses}
        category={selectedCategory}
        onOpenBusiness={setSelectedBusiness}
        onBack={() => setSelectedCategory("")}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
    );
  }

  return (
    <div
      className={
        isFilterModalOpen ? "directory-page filters-open" : "directory-page"
      }
      data-theme={theme}
    >
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>

      <header className="site-header">
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

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#inicio">Directorio</a>
          <a href="#sectores">Destacados</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-label={
            theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
          }
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb">
              <span className="sun-icon" />
              <span className="moon-icon" />
            </span>
          </span>
        </button>
      </header>

      <main id="contenido-principal">
        <section className="intro-section" aria-labelledby="directory-title">
          <div className="intro-copy">
            <h1 id="directory-title">
              Encuentra negocios de Nayarit en segundos
            </h1>
            <p>
              Un espacio para descubrir servicios, comercios y proyectos locales
              promovidos por la comunidad. #ConsumeLocalNayarit
            </p>

            <div className="intro-actions" aria-label="Acciones principales">
              <a className="primary-action" href="#inicio">
                Explorar directorio
              </a>
              <a
                className="secondary-action"
                href="mailto:info@digitalizandonayarit.com"
              >
                Ver Mapa
              </a>
            </div>
          </div>

          <aside
            className="hero-panel"
            aria-label="Espacio publicitario destacado"
          >
            <div className="ad-slot" aria-hidden="true">
              <div className="ad-frame">
                <strong>Promociona tu negocio aqui</strong>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="inicio"
          className="search-section"
          aria-label="Búsqueda de negocios"
        >
          <div className="search-heading">
            <div>
              <h2>Directorio de negocios</h2>
              <p>
                Filtra por nombre, categoría o zona. Los resultados se
                actualizan al instante.
              </p>
            </div>
            <button
              className="ghost-button desktop-clear"
              type="button"
              onClick={clearFilters}
            >
              Limpiar filtros
              {activeFilters > 0 ? <span>{activeFilters}</span> : null}
            </button>
          </div>

          <div className="mobile-filter-actions">
            <button
              className="mobile-search-button"
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Buscar negocios
              {activeFilters > 0 ? <span>{activeFilters}</span> : null}
            </button>
            <button
              className="mobile-clear-button"
              type="button"
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>

          <div
            className={
              isFilterModalOpen ? "filters-modal is-open" : "filters-modal"
            }
          >
            <button
              className="filters-backdrop"
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => setIsFilterModalOpen(false)}
            />

            <div
              className="filters-sheet"
              role={isFilterModalOpen ? "dialog" : undefined}
              aria-modal={isFilterModalOpen ? "true" : undefined}
              aria-labelledby="filters-title"
            >
              <div className="filters-modal-header">
                <div>
                  <span>Busqueda</span>
                  <h3 id="filters-title">Filtrar directorio</h3>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar filtros"
                  onClick={() => setIsFilterModalOpen(false)}
                >
                  Cerrar
                </button>
              </div>

              <form
                className="search-panel"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="field field-wide">
                  <span>Buscar negocio, servicio o ciudad</span>
                  <input
                    type="search"
                    name="businessName"
                    placeholder="Ej. café, salud, Tepic"
                    autoComplete="off"
                    value={filters.name}
                    onChange={(event) =>
                      updateFilter("name", event.target.value)
                    }
                  />
                </label>

                <label className="field">
                  <span>Sector</span>
                  <select
                    name="businessSector"
                    value={filters.sector}
                    onChange={(event) =>
                      updateFilter("sector", event.target.value)
                    }
                  >
                    <option value="">Todos</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Ordenar</span>
                  <select
                    name="businessSort"
                    value={filters.sortBy}
                    onChange={(event) =>
                      updateFilter("sortBy", event.target.value)
                    }
                  >
                    <option value="featured">Destacados primero</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="sector">Sector</option>
                  </select>
                </label>
              </form>

              <div
                className="quick-filters"
                aria-label="Filtros rápidos por sector"
              >
                <button
                  className={!filters.sector ? "is-active" : ""}
                  type="button"
                  onClick={() => updateFilter("sector", "")}
                >
                  Todos
                </button>
                {sectors.map((sector) => (
                  <button
                    className={filters.sector === sector ? "is-active" : ""}
                    key={sector}
                    type="button"
                    onClick={() => updateFilter("sector", sector)}
                  >
                    {sector}
                  </button>
                ))}
              </div>

              <div className="filters-modal-footer">
                <button type="button" onClick={clearFilters}>
                  Limpiar
                </button>
                <button
                  className="apply-filters"
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                >
                  Ver {filteredBusinesses.length} resultados
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sectores"
          className="directory-section"
          aria-labelledby="registered-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow eyebrow-light">Resultados</span>
              <h2 id="registered-title">Negocios encontrados</h2>
              <p>
                {filteredBusinesses.length} de {totalBusinesses} negocios
                coinciden con la búsqueda.
              </p>
            </div>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div className="category-rows">
              {businessSections.map(
                ({ category, businesses, visibleBusinesses, hasMore }) => (
                  <section
                    className="category-row"
                    key={category}
                    aria-labelledby={`${category}-title`}
                  >
                    <div className="category-row-heading">
                      <div>
                        <h3 id={`${category}-title`}>{category}</h3>
                        <p>{businesses.length} opciones disponibles</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Ver todo en ${category}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        Ver todo
                      </button>
                    </div>

                    <div className="cards-carousel">
                      {visibleBusinesses.map((business) => (
                        <Card
                          business={business}
                          key={business.id}
                          onOpenBusiness={setSelectedBusiness}
                          sponsored={business.featured}
                        />
                      ))}
                      {hasMore ? (
                        <ShowMoreCard
                          category={category}
                          onOpenCategory={() => setSelectedCategory(category)}
                          total={businesses.length}
                        />
                      ) : null}
                    </div>
                  </section>
                ),
              )}
            </div>
          ) : (
            <div className="empty-state">
              {totalBusinesses === 0 ? (
                <>
                  <strong>Aún no hay negocios registrados.</strong>
                  <p>El directorio está listo para recibir datos reales.</p>
                </>
              ) : (
                <>
                  <strong>No encontramos resultados con esos filtros.</strong>
                  <p>Prueba con otro sector o limpia la búsqueda.</p>
                  <button type="button" onClick={clearFilters}>
                    Ver todos los negocios
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </main>

      <footer id="contacto" className="site-footer">
        <div>
          <span className="footer-label">Contacto</span>
          <p>Digitalizando A Nayarit</p>
        </div>
        <a href="mailto:info@digitalizandonayarit.com">
          info@digitalizandonayarit.com
        </a>
      </footer>
    </div>
  );
}

type ShowMoreCardProps = {
  category: string;
  onOpenCategory: () => void;
  total: number;
};

function ShowMoreCard({ category, onOpenCategory, total }: ShowMoreCardProps) {
  return (
    <article className="show-more-card">
      <div className="show-more-stack" aria-hidden="true">
        <span />
        <span />
      </div>
      <h3>Mostrar todo</h3>
      <p>
        Ver {total} servicios de {category.toLowerCase()}.
      </p>
      <button type="button" onClick={onOpenCategory}>
        Consultar categoría
      </button>
    </article>
  );
}

export default HomePage;
