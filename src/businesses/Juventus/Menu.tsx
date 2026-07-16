import { useState } from "react";
import type { ReactElement } from "react";
import { createClassName } from "../../utils/cssModules";
import styles from "./Menu.module.css";
import img10 from "./images/img10.png";

const cx = createClassName(styles);

interface MenuItem {
  name: string;
  description?: string;
  price: number | string;
}

interface MenuSection {
  id: string;
  title: string;
  icon: MenuIcon;
  items: MenuItem[];
}

type MenuIcon =
  | "starter"
  | "salad"
  | "breakfast"
  | "soup"
  | "cream"
  | "meat"
  | "snack"
  | "dessert"
  | "hotDrink"
  | "coldDrink"
  | "fountain"
  | "beer"
  | "cocktail"
  | "spirit";

function MenuIconMark({ name }: { name: MenuIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<MenuIcon, ReactElement> = {
    starter: (
      <path d="M5 12c3.5-5.5 9.5-6.5 14-4-1 5-5.5 9-12 8l-3 3m4-6c2-.2 4-.9 6-2" />
    ),
    salad: (
      <path d="M4 13c2-5 7-8 16-7-1 8-5 13-13 13-2 0-3-2-3-6Zm5 2c2-3 5-5 9-7" />
    ),
    breakfast: (
      <>
        <path d="M4 11a7 7 0 0 1 14 0v5H4v-5Z" />
        <path d="M2 20h20" />
        <path d="M18 11h2a2 2 0 0 1 0 4h-2" />
        <path d="M8 6v1m4-1v1" />
      </>
    ),
    soup: (
      <>
        <path d="M4 10h16l-1.5 7H5.5L4 10Z" />
        <path d="M7 20h10" />
        <path d="M8 6c0-1 1-1 1-2m4 2c0-1 1-1 1-2" />
      </>
    ),
    cream: (
      <>
        <path d="M5 8h14l-1 13H6L5 8Z" />
        <path d="M8 8V5h8v3" />
        <path d="M9 13h6" />
      </>
    ),
    meat: (
      <>
        <path d="M8 13c-3-2-2-7 2-8 3-1 8 1 9 4 1 4-3 8-7 8-2 0-3-1-4-4Z" />
        <path d="M6 15l-3 3 3 3 3-3" />
        <path d="M13 9h.01" />
      </>
    ),
    snack: (
      <>
        <path d="M4 7h16l-2 13H6L4 7Z" />
        <path d="M8 7c0-2 1.8-4 4-4s4 2 4 4" />
        <path d="M7 12h10" />
      </>
    ),
    dessert: (
      <>
        <path d="M5 11h14v3a7 7 0 0 1-14 0v-3Z" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        <path d="M8 20h8" />
      </>
    ),
    hotDrink: (
      <>
        <path d="M5 8h12v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
        <path d="M17 10h1a2 2 0 1 1 0 4h-1" />
        <path d="M9 3v2m4-2v2" />
      </>
    ),
    coldDrink: (
      <>
        <path d="M7 9h12l-2 12H9L7 9Z" />
        <path d="M10 9 9 3h7" />
        <path d="M8 13h10" />
      </>
    ),
    fountain: (
      <>
        <path d="M6 8h12l-1.5 13h-9L6 8Z" />
        <path d="M8 4h8l1 4H7l1-4Z" />
        <path d="M9 13h6" />
      </>
    ),
    beer: (
      <>
        <path d="M6 7h10v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z" />
        <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
        <path d="M8 4h6" />
      </>
    ),
    cocktail: (
      <>
        <path d="M5 4h14l-7 8-7-8Z" />
        <path d="M12 12v8" />
        <path d="M8 20h8" />
        <path d="m16 4-3 3" />
      </>
    ),
    spirit: (
      <>
        <path d="M9 2h6v5l2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3V2Z" />
        <path d="M9 7h6" />
        <path d="M9 13h6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const menuData: MenuSection[] = [
  {
    id: "empezar",
    title: "Pa' Empezar",
    icon: "starter",
    items: [
      { name: "Papas a la Francesa", price: 53 },
      { name: "Guacamole", description: "Natural o Mexicana", price: 53 },
      { name: "Carnes Frías", description: "200 grs", price: 100 },
      {
        name: "Alitas de Pollo",
        description: "BBQ, Rancheras o Hotwins — 7 piezas",
        price: 90,
      },
      { name: "Queso Natural", description: "180 grs", price: 108 },
      {
        name: "Queso Fundido",
        description:
          "Con 1 ingrediente: piña, elote, champiñones o chorizo — 180 grs",
        price: 130,
      },
      {
        name: "Tacos de Asada",
        description: "Orden de 4 piezas 150 grs",
        price: 110,
      },
      {
        name: "Tacos Dorados",
        description: "Pierna o Pollo — Orden de 4 piezas 50 grs c/u",
        price: 125,
      },
      { name: "Nachos Naturales", description: "Carne o Pollo", price: 110 },
      {
        name: "Nachos Con",
        description: "Carne o Pollo — queso 70 grs",
        price: 140,
      },
      {
        name: "Nachos Gratinados",
        description: "De pierna o pollo — 40 grs",
        price: 160,
      },
      { name: "Nachos c/Arrachera", description: "170 grs", price: 190 },
    ],
  },
  {
    id: "ensaladas",
    title: "Ensaladas",
    icon: "salad",
    items: [
      { name: "Ensalada Verde", price: 90 },
      { name: "Del Chef", description: "Pollo 60 grs", price: 120 },
      {
        name: "Atún",
        description: "75 grs — con vegetales o tipo ceviche",
        price: 100,
      },
      {
        name: "Verde con Pechuga",
        description: "A la plancha 150 grs",
        price: 120,
      },
      { name: "Pollo con Vegetales", description: "130 grs", price: 110 },
    ],
  },
  {
    id: "desayunos",
    title: "Desayunos",
    icon: "breakfast",
    items: [
      {
        name: "Enfrijoladas con Panela",
        description: "3 piezas 20 grs c/u",
        price: 128,
      },
      {
        name: "Enmolada de Pollo",
        description: "3 piezas 20 grs c/u",
        price: 135,
      },
      {
        name: "Machaca de Camarón",
        description: "Con chilaquiles 40 grs",
        price: 143,
      },
      { name: "Pan Tostado", description: "3 piezas", price: 120 },
      { name: "Huevos al Gusto", description: "2 huevos", price: 120 },
      { name: "Chilaquiles Naturales", price: 120 },
      { name: "Avena", price: 120 },
      { name: "Orden de Hotcakes", description: "3 piezas", price: 120 },
      { name: "Desayuno Light", description: "Pollo 70 grs", price: 140 },
      { name: "Bistec con Papas", description: "150 grs", price: 140 },
      {
        name: "Enchiladas Gratinadas",
        description: "De pollo — 3 piezas 200 grs c/u",
        price: 140,
      },
      { name: "Hígado Encebollado", description: "200 grs", price: 140 },
      { name: "Hígado a la Mexicana", description: "200 grs", price: 145 },
      {
        name: "Machaca de Res",
        description: "55 grs — con huevo o a la mexicana",
        price: 140,
      },
      {
        name: "Omelette",
        description:
          "2 huevos con queso más 1 ingrediente: champiñones, salchicha o chorizo",
        price: 140,
      },
      {
        name: "Chilaquiles con Pollo o Huevo Estrellado",
        description: "70 grs",
        price: 140,
      },
      {
        name: 'Desayuno "Juventus"',
        description: "Chilaquiles con huevos estrellados o revueltos y tocino",
        price: 148,
      },
      {
        name: "Bistec a la Plancha",
        description: "Con frijoles y jocoque — 170 grs",
        price: 150,
      },
      { name: "Fajitas de Pollo o Res", description: "150 grs", price: 150 },
    ],
  },
  {
    id: "sopa",
    title: "Comida Corrida del Día",
    icon: "soup",
    items: [
      {
        name: "Sopa y Guisado",
        description:
          "Incluyen sopa, guisados, agua fresca y postre. A partir de las 13:30 hrs",
        price: 135,
      },
    ],
  },
  {
    id: "crema",
    title: "Crema o Consomé",
    icon: "cream",
    items: [
      { name: "Crema de Champiñones", description: "250 ml", price: 75 },
      { name: "Crema de Espárragos", description: "250 ml", price: 75 },
      { name: "Crema de Elote", description: "250 ml", price: 75 },
      { name: "Consomé de Pollo", description: "250 ml", price: 85 },
    ],
  },
  {
    id: "carnes",
    title: "Carne y Aves",
    icon: "meat",
    items: [
      {
        name: "Carne a la Mexicana",
        description: "150 grs — con ensalada, papas, frijoles y arroz",
        price: 128,
      },
      {
        name: "Pollo a la Plaza",
        description:
          "2 piezas de pollo — con ensalada, papas, frijoles y arroz",
        price: 128,
      },
      {
        name: "Milanesa",
        description: "150 grs — con ensalada, papas, frijoles y arroz",
        price: 128,
      },
      {
        name: "Carne Asada",
        description: "150 grs — con ensalada, papas, frijoles y arroz",
        price: 125,
      },
      {
        name: "Pechuga de Pollo",
        description: "A la mostaza — 150 grs",
        price: 128,
      },
      { name: "Pechuga Empanizada", description: "150 grs", price: 128 },
      { name: "Pechuga a la Plancha", description: "150 grs", price: 125 },
      { name: "Brocheta de Res o Pollo", description: "150 grs", price: 150 },
      { name: "Fajitas de Res o Pollo", description: "150 grs", price: 140 },
      {
        name: "Platillo Juventus",
        description: "170 grs — adobada de cerdo y res",
        price: 140,
      },
      {
        name: "Tampiqueña",
        description: "170 grs — taco dorado y enchilada",
        price: 160,
      },
      {
        name: "Bistec Ranchero",
        description: "170 grs con frijoles y jocoque",
        price: 160,
      },
    ],
  },
  {
    id: "antojitos",
    title: "Antojitos",
    icon: "snack",
    items: [
      {
        name: "Burritos",
        description: "20 grs c/u — espinacas, pollo, panela o pierna",
        price: 44,
      },
      {
        name: "Sandwich",
        description: "20 grs c/u — jamón, pollo, panela o pierna",
        price: 53,
      },
      {
        name: "Tostadas",
        description: "30 grs c/u — pollo, panela o pierna",
        price: 48,
      },
      {
        name: "Tortas",
        description: "30 grs c/u — jamón, pollo, panela o pierna",
        price: 45,
      },
      { name: "Pellizcadas Naturales", description: "30 grs", price: 55 },
      {
        name: "Pellizcadas",
        description: "30 grs c/u — carne de pollo o champiñones",
        price: 65,
      },
      { name: "Molletes a la Mexicana", description: "30 grs", price: 55 },
      { name: "Molletes c/Chorizo y Queso", description: "30 grs", price: 65 },
      { name: "Sincronizada", price: 63 },
      { name: "Hamburguesa Sencilla", description: "60 grs", price: 63 },
      {
        name: "Hamburguesa Especial",
        description: "Con papas — 60 grs carne o pollo",
        price: 80,
      },
      {
        name: "Hamburguesa Gratinada",
        description: "Con papas — 60 grs",
        price: 88,
      },
      {
        name: "Hamburguesa Hawaiana",
        description: "Con papas — 60 grs pollo, champiñón y piña",
        price: 100,
      },
      { name: "Club Sandwich", description: "80 grs", price: 110 },
      {
        name: "Enchiladas Gratinadas",
        description:
          "4 piezas — verdes, rojas, enfrijoladas o enmoladas — pollo o pierna — 20 grs c/u",
        price: 128,
      },
    ],
  },
  {
    id: "dulces",
    title: "Dulces Momentos",
    icon: "dessert",
    items: [
      { name: "Molletes Dulces", price: 35 },
      { name: "Nieve", description: "3 bolas", price: 60 },
      { name: "Duraznos en Almíbar", price: 55 },
      { name: "Fresas con Crema", price: 60 },
      { name: "Pay de Fresa o Guayaba", description: "Rebanada", price: 55 },
      { name: "Pastel", description: "Rebanada", price: 55 },
    ],
  },
  {
    id: "bebidas-calientes",
    title: "Bebidas Calientes",
    icon: "hotDrink",
    items: [
      { name: "Americano", description: "Refill", price: 44 },
      { name: "Leche para Café", price: 35 },
      {
        name: "Té",
        description: "Manzanilla, negro, hierbabuena, verde, limón",
        price: 32,
      },
      { name: "Chocolate Caliente", price: 45 },
      { name: "Té Chai Late", description: "Guayaba", price: 65 },
      { name: "Capuchino", price: 45 },
      {
        name: "Café",
        description:
          "Americano, holandés, capuchino, moka, capuchino dominique, capuchino kahlúa",
        price: 55,
      },
    ],
  },
  {
    id: "frapuchinos",
    title: "Frapuchinos",
    icon: "coldDrink",
    items: [
      { name: "Frapuchino", description: "255 ml", price: 55 },
      {
        name: "Frapuchino Especial",
        description: "Moka, kahlúa, mominique, oreo — 255 ml",
        price: 75,
      },
      { name: "Café Helado Juventus", description: "255 ml", price: 75 },
    ],
  },
  {
    id: "fuente",
    title: "De la Fuente",
    icon: "fountain",
    items: [
      { name: "Botella de Agua", description: "600 ml", price: 18 },
      { name: "Chocomilk", description: "255 ml", price: 35 },
      { name: "Jugo de Naranja", description: "255 ml", price: 35 },
      { name: "Refresco", description: "355 ml", price: 33 },
      {
        name: "Té Helado",
        description: "500 ml — negro, manzanilla, hierbabuena, verde, limón",
        price: 35,
      },
      {
        name: "Preparado de Frutas",
        description: "500 ml con frutas de temporada",
        price: 46,
      },
      {
        name: "Limonada",
        description: "500 ml — natural o mineralizada",
        price: 46,
      },
      {
        name: "Naranjada",
        description: "500 ml — natural o mineralizada",
        price: 46,
      },
      {
        name: "Smoothies",
        description: "400 ml — fresa, mango, piña, tamarindo",
        price: 55,
      },
      {
        name: "Malteadas",
        description:
          "500 ml — fresa, coco, guayaba, zarzamora, chocolate, vainilla, piñacoco, oreo, durazno, piña y mango",
        price: 75,
      },
    ],
  },
  {
    id: "cervezas",
    title: "Cervezas",
    icon: "beer",
    items: [
      { name: "Corona media", description: "355 ml", price: 38 },
      { name: "Pacífico media", description: "355 ml", price: 38 },
      { name: "Modelo especial", description: "355 ml", price: 43 },
      { name: "Negra Modelo", description: "355 ml", price: 43 },
      { name: "Corona Light bote", description: "355 ml", price: 43 },
    ],
  },
  {
    id: "cocteleria",
    title: "Con Tequila",
    icon: "cocktail",
    items: [
      { name: "Margarita 30-30", description: "300 ml", price: 65 },
      { name: "Pitufo", description: "300 ml", price: 65 },
      { name: "Tequila Sunrise", description: "300 ml", price: 65 },
      { name: "Charro Negro", description: "300 ml", price: 70 },
      { name: "Diablo", description: "300 ml", price: 70 },
      { name: "Toro Bravo", description: "300 ml", price: 70 },
      { name: "Ultramarino", description: "300 ml", price: 70 },
      { name: "Vampiro", description: "300 ml", price: 70 },
    ],
  },
  {
    id: "tequilas",
    title: "Tequilas",
    icon: "spirit",
    items: [
      { name: "30-30 Blanco", description: "300 ml", price: 80 },
      { name: "30-30 Reposado", description: "300 ml", price: 85 },
      { name: "30-30 Añejo", description: "300 ml", price: 95 },
      { name: "30-30 Cristalino", description: "300 ml", price: 100 },
      { name: "Cuervo tradicional", description: "300 ml", price: 80 },
      { name: "Don Julio", description: "300 ml", price: 85 },
      { name: "Cabrito", description: "300 ml", price: 80 },
    ],
  },
  {
    id: "whisky",
    title: "Whiskys & Coñac",
    icon: "spirit",
    items: [
      { name: "Whisky Buchanan's", description: "300 ml", price: 95 },
      { name: "Whisky J.W. Et. Roja", description: "300 ml", price: 75 },
      { name: "Whisky Jack Daniels", description: "300 ml", price: 75 },
      { name: "Amareto", description: "300 ml", price: 75 },
      { name: "Bailey's", description: "300 ml", price: 75 },
    ],
  },
];

export default function Menu() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filtered = activeSection
    ? menuData.filter((s) => s.id === activeSection)
    : menuData;
  const dishCount = menuData.reduce(
    (total, section) => total + section.items.length,
    0,
  );

  return (
    <div className={cx("menu-page")}>
      {/* HERO */}
      <div className={cx("menu-hero")}>
        <img
          src={img10}
          alt="Burritos preparados en Juventus"
          className={cx("menu-hero-img")}
        />
        <div className={cx("menu-hero-overlay")} />
        <div className={cx("menu-hero-content")}>
          <p className={cx("menu-hero-tag")}>La carta de Juventus</p>
          <h1>
            Algo para
            <br />
            <em>cada antojo.</em>
          </h1>
          <p className={cx("menu-hero-copy")}>
            Desayunos, comidas, antojitos y bebidas. Explora la carta a tu
            ritmo.
          </p>
          <div
            className={cx("menu-hero-stats")}
            aria-label={`${menuData.length} secciones y ${dishCount} opciones`}
          >
            <div>
              <strong>{menuData.length}</strong>
              <span>Secciones</span>
            </div>
            <div>
              <strong>{dishCount}</strong>
              <span>Opciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div className={cx("menu-filter-bar")}>
        <div className={cx("filter-inner")}>
          <button
            className={cx("filter-pill", activeSection === null && "active")}
            onClick={() => setActiveSection(null)}
            aria-pressed={activeSection === null}
          >
            Todo el menú
          </button>
          {menuData.map((s) => (
            <button
              key={s.id}
              className={cx("filter-pill", activeSection === s.id && "active")}
              onClick={() => setActiveSection(s.id)}
              aria-pressed={activeSection === s.id}
            >
              <MenuIconMark name={s.icon} /> {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* MENU CONTENT */}
      <div className={cx("menu-content")}>
        {filtered.map((section, sectionIndex) => (
          <div key={section.id} className={cx("menu-section")} id={section.id}>
            <div className={cx("menu-section-header")}>
              <span className={cx("section-icon")}>
                <MenuIconMark name={section.icon} />
              </span>
              <div className={cx("menu-section-title")}>
                <span>
                  {String(
                    (activeSection
                      ? menuData.findIndex((item) => item.id === section.id)
                      : sectionIndex) + 1,
                  ).padStart(2, "0")}{" "}
                  / Categoría
                </span>
                <h2>{section.title}</h2>
              </div>
            </div>
            <div className={cx("menu-items-grid")}>
              {section.items.map((item, i) => (
                <article
                  key={`${section.id}-${item.name}-${i}`}
                  className={cx("menu-item-card")}
                >
                  <div className={cx("item-info")}>
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div
                    className={cx("item-price")}
                    aria-label={`${item.price} pesos`}
                  >
                    ${item.price}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* NOTE */}
      <div className={cx("menu-note")}>
        <p>
          * Cualquier cambio tendrá costo extra · Precios en pesos mexicanos ·
          Desayunos incluyen café o té y fruta · Desayunos de 8:00 a.m. a 12:00
          p.m. · Comida corrida a partir de las 13:30 hrs
        </p>
      </div>
    </div>
  );
}
