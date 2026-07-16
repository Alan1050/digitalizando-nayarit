import { useEffect, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { createClassName } from "../../utils/cssModules";
import styles from "./Home.module.css";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import img6 from "./images/img6.png";
import img7 from "./images/img7.png";
import img9 from "./images/img9.png";
import img10 from "./images/img10.png";

interface Props {
  onMenuClick: () => void;
}

const cx = createClassName(styles);

const photos = [
  { src: img1, label: "Ambiente acogedor" },
  { src: img3, label: "Platillos especiales" },
  { src: img4, label: "Sabores únicos" },
  { src: img5, label: "Salón principal" },
  { src: img6, label: "Terraza interior" },
  { src: img7, label: "Área artística" },
  { src: img9, label: "Nachos" },
  { src: img10, label: "Burritos" },
];

const schedule = [
  {
    day: "Lunes",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Martes",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Miércoles",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Jueves",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Viernes",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Sábado",
    hours: "8:00 a.m. – 11:00 p.m.",
    open: 8 * 60,
    close: 23 * 60,
  },
  {
    day: "Domingo",
    hours: "9:00 a.m. – 6:00 p.m.",
    open: 9 * 60,
    close: 18 * 60,
  },
];

const getScheduleIndex = (date: Date) => (date.getDay() + 6) % 7;

function formatMinutes(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "p.m." : "a.m.";
  const hours12 = hours24 % 12 || 12;

  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getOpenStatus(now: Date) {
  const todayIndex = getScheduleIndex(now);
  const todaySchedule = schedule[todayIndex];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpen =
    currentMinutes >= todaySchedule.open &&
    currentMinutes < todaySchedule.close;

  if (isOpen) {
    return {
      isOpen,
      label: "Abierto ahora",
      detail: `Cierra hoy a las ${formatMinutes(todaySchedule.close)}`,
      todayIndex,
    };
  }

  if (currentMinutes < todaySchedule.open) {
    return {
      isOpen,
      label: "Cerrado ahora",
      detail: `Abre hoy a las ${formatMinutes(todaySchedule.open)}`,
      todayIndex,
    };
  }

  const tomorrowIndex = (todayIndex + 1) % schedule.length;
  const tomorrowSchedule = schedule[tomorrowIndex];

  return {
    isOpen,
    label: "Cerrado ahora",
    detail: `Abre ${tomorrowSchedule.day.toLowerCase()} a las ${formatMinutes(tomorrowSchedule.open)}`,
    todayIndex,
  };
}

type HomeIcon = "dine" | "delivery" | "takeout" | "price" | "pin" | "phone";

function Icon({ name }: { name: HomeIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<HomeIcon, ReactElement> = {
    dine: (
      <>
        <path d="M7 3v8" />
        <path d="M4.5 3v8" />
        <path d="M9.5 3v8" />
        <path d="M4.5 11h5L8 21H6l-1.5-10Z" />
        <path d="M16 3c2 1.6 3 4.1 3 7.5V21h-2v-7h-3V6.5c0-1.9.7-3.1 2-3.5Z" />
      </>
    ),
    delivery: (
      <>
        <path d="M3 7h10v10H3z" />
        <path d="M13 10h3.8l2.2 3v4h-6" />
        <path d="M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        <path d="M16.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        <path d="M5 4h6" />
      </>
    ),
    takeout: (
      <>
        <path d="M6 8h12l-1 13H7L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        <path d="M8 12h8" />
      </>
    ),
    price: (
      <>
        <path d="M12 2v20" />
        <path d="M17 6.5c-1.1-1-2.7-1.5-4.5-1.5C10 5 8 6.2 8 8.1c0 4 9 1.9 9 6.3 0 2-2 3.6-4.8 3.6-2 0-3.8-.6-5.2-1.8" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <path d="M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Home({ onMenuClick }: Props) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const openStatus = useMemo(() => getOpenStatus(now), [now]);

  return (
    <div className={cx("home")}>
      {/* HERO */}
      <section className={cx("hero")}>
        <div className={cx("hero-bg")}>
          <img src={img2} alt="Juventus exterior" className={cx("hero-img")} />
          <div className={cx("hero-overlay")} />
        </div>
        <div className={cx("hero-content")}>
          <div className={cx("hero-kicker-row")}>
            <p className={cx("hero-tag")}>Café · Restaurant · Bar</p>
          </div>
          <h1 className={cx("hero-title")}>
            <span className={cx("title-italic")}>J</span>uventus
            <span className={cx("hero-period")}>.</span>
          </h1>
          <div className={cx("hero-bottom")}>
            <p className={cx("hero-sub")}>
              Sabores que enamoran desde el corazón de Tepic.
            </p>
            <div className={cx("hero-actions")}>
              <button className={cx("btn-primary")} onClick={onMenuClick}>
                Ver el menú <span aria-hidden="true">↗</span>
              </button>
              <a href="tel:3112164172" className={cx("btn-outline")}>
                Llamar ahora
              </a>
            </div>
          </div>
          <div
            className={cx("hero-address")}
            aria-label="Dirección: Calle Zacatecas 81, Centro"
          >
            <strong>81</strong>
            <span>
              Calle Zacatecas
              <br />
              Centro, Tepic
            </span>
          </div>
        </div>
        <a
          className={cx("hero-scroll")}
          href="#experiencia"
          aria-label="Bajar a la experiencia Juventus"
        >
          <span>Descubre</span>
        </a>
      </section>

      <div className={cx("flavor-strip")} aria-hidden="true">
        <div className={cx("flavor-track")}>
          <div className={cx("flavor-group")}>
            <span>Desayunos</span>
            <i>✦</i>
            <span>Comidas</span>
            <i>✦</i>
            <span>Antojitos</span>
            <i>✦</i>
            <span>Café</span>
            <i>✦</i>
            <span>Coctelería</span>
            <i>✦</i>
          </div>
          <div className={cx("flavor-group")}>
            <span>Desayunos</span>
            <i>✦</i>
            <span>Comidas</span>
            <i>✦</i>
            <span>Antojitos</span>
            <i>✦</i>
            <span>Café</span>
            <i>✦</i>
            <span>Coctelería</span>
            <i>✦</i>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <section className={cx("info-section")} id="experiencia">
        <div className={cx("info-intro")}>
          <span className={cx("section-tag")}>A tu manera</span>
          <h2>
            Una mesa.
            <br />
            <em>Muchas formas</em>
            <br />
            de disfrutar.
          </h2>
          <p>
            Ven, pide para llevar o recibe tus favoritos donde estés. Lo
            importante es compartir algo rico.
          </p>
        </div>
        <div className={cx("info-cards")}>
          <article className={cx("info-card")}>
            <span className={cx("card-number")}>01</span>
            <div className={cx("info-icon")}>
              <Icon name="dine" />
            </div>
            <h3>Consumo en lugar</h3>
            <p>Disfruta en nuestro acogedor restaurante con ambiente único</p>
          </article>
          <article className={cx("info-card")}>
            <span className={cx("card-number")}>02</span>
            <div className={cx("info-icon")}>
              <Icon name="delivery" />
            </div>
            <h3>Entrega a domicilio</h3>
            <p>Te llevamos tu pedido a donde estés en Tepic</p>
          </article>
          <article className={cx("info-card")}>
            <span className={cx("card-number")}>03</span>
            <div className={cx("info-icon")}>
              <Icon name="takeout" />
            </div>
            <h3>Para llevar</h3>
            <p>Ordena y recoge sin esperas innecesarias</p>
          </article>
          <article className={cx("info-card")}>
            <span className={cx("card-number")}>04</span>
            <div className={cx("info-icon")}>
              <Icon name="price" />
            </div>
            <h3>$100 – $200 / persona</h3>
            <p>Precio accesible con calidad excepcional</p>
          </article>
        </div>
      </section>

      {/* GALLERY */}
      <section className={cx("gallery-section")}>
        <div className={cx("section-header")}>
          <span className={cx("section-index")}>02 / La casa</span>
          <div>
            <span className={cx("section-tag")}>Nuestra experiencia</span>
            <h2>
              Ambiente <em>&</em> platillos
            </h2>
          </div>
        </div>
        <div className={cx("gallery-grid")}>
          {photos.map((p, i) => (
            <figure key={p.src} className={cx("gallery-item")}>
              <img src={p.src} alt={p.label} loading="lazy" />
              <figcaption className={cx("gallery-label")}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LOCATION + HOURS */}
      <section className={cx("location-section")}>
        <div className={cx("location-inner")}>
          <div className={cx("location-info")}>
            <div className={cx("section-header left")}>
              <span className={cx("section-index")}>03 / Visítanos</span>
              <div>
                <span className={cx("section-tag")}>Encuéntranos</span>
                <h2>
                  Ubicación <em>&</em>
                  <br />
                  horarios
                </h2>
              </div>
            </div>

            <div className={cx("address-block")}>
              <div className={cx("address-icon")}>
                <Icon name="pin" />
              </div>
              <div>
                <p className={cx("address-title")}>Dirección</p>
                <p>C. Zacatecas 81, Centro</p>
                <p>63000 Tepic, Nayarit</p>
                <p className={cx("address-ref")}>Ref: Fundas Corona</p>
              </div>
            </div>

            <div className={cx("address-block")}>
              <div className={cx("address-icon")}>
                <Icon name="phone" />
              </div>
              <div>
                <p className={cx("address-title")}>Teléfono</p>
                <a href="tel:3112164172" className={cx("phone-link")}>
                  311 216 4172
                </a>
              </div>
            </div>

            <div className={cx("schedule-block")}>
              <p className={cx("schedule-title")}>Horario de Atención</p>
              <div
                className={cx(
                  "open-status",
                  openStatus.isOpen ? "open" : "closed",
                )}
                aria-live="polite"
              >
                <span className={cx("status-dot")} aria-hidden="true"></span>
                <div>
                  <p>{openStatus.label}</p>
                  <span>{openStatus.detail}</span>
                </div>
              </div>
              <div className={cx("schedule-list")}>
                {schedule.map((s, i) => {
                  const isTodayRow = openStatus.todayIndex === i;
                  return (
                    <div
                      key={i}
                      className={cx("schedule-row", isTodayRow && "today")}
                    >
                      <span className={cx("schedule-day")}>{s.day}</span>
                      <span className={cx("schedule-dots")}></span>
                      <span className={cx("schedule-hours")}>{s.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={cx("map-container")}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.0!2d-104.8952!3d21.5058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84274e5c5a5a5a5a%3A0x1!2sC.%20Zacatecas%2081%2C%20Centro%2C%2063000%20Tepic%2C%20Nay.!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Juventus"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cx("cta-section")}>
        <div className={cx("cta-bg")}>
          <img
            src={img9}
            alt="Nachos preparados en Juventus"
            loading="lazy"
          />
          <div className={cx("cta-overlay")} />
        </div>
        <div className={cx("cta-content")}>
          <span className={cx("section-tag")}>El antojo manda</span>
          <h2>
            ¿Qué vas a<br />
            <em>probar hoy?</em>
          </h2>
          <p>Desayunos, comidas, antojitos, bebidas y mucho más.</p>
          <button className={cx("btn-primary large")} onClick={onMenuClick}>
            Explorar el menú <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </div>
  );
}
