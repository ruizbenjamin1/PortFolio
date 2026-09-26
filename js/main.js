/* =========================================================
   Martina Ibraim · Portfolio — main.js
   ========================================================= */

/* ---------------------------------------------------------
   PROYECTOS
   Para agregar el contenido real, completá "src" en cada item:
     type:  "video" | "image"
     src:   ruta al archivo, ej: "assets/videos/raiz.mp4"
     poster (opcional, solo videos): imagen de portada
     shape: "v"  (vertical 9:16, ideal para reels)
            "h"  (horizontal, ocupa 2 columnas)
            "sm" (chico, casi cuadrado)
     title: nombre del proyecto (también se usa como texto alternativo)
     alt (opcional, imágenes): descripción de la imagen
     width / height (opcional): tamaño real del archivo, por defecto 1080 x 1920
   Mientras "src" esté vacío se muestra un recuadro gris.
   --------------------------------------------------------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.add("js");

const PROYECTOS_1 = [
  { type: "video", src: "", shape: "sm", title: "Vamos a conocer" },
  { type: "video", src: "", shape: "h",  title: "Proyecto 2" },
  { type: "video", src: "", shape: "v",  title: "Raíz" },
  { type: "video", src: "", shape: "v",  title: "LeBron" },
  { type: "video", src: "", shape: "sm", title: "Proyecto 5" },
  { type: "video", src: "", shape: "h",  title: "Proyecto 6" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 7" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 8" },
  { type: "video", src: "", shape: "v",  title: "Podóloga" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 10" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 11" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 12" },
  { type: "video", src: "", shape: "h",  title: "Proyecto 13" },
];

const PROYECTOS_2 = [
  { type: "video", src: "", shape: "v", title: "Proyecto 14" },
  { type: "video", src: "", shape: "v", title: "Raíz 2" },
  { type: "video", src: "", shape: "v", title: "Proyecto 16" },
  { type: "video", src: "", shape: "v", title: "Proyecto 17" },
  { type: "video", src: "", shape: "v", title: "Congreso" },
  { type: "video", src: "", shape: "v", title: "Proyecto 19" },
  { type: "video", src: "", shape: "v", title: "Proyecto 20" },
  { type: "video", src: "", shape: "v", title: "Medical" },
  { type: "video", src: "", shape: "h", title: "Proyecto 22" },
  { type: "video", src: "", shape: "h", title: "Proyecto 23" },
  { type: "video", src: "", shape: "h", title: "Proyecto 24" },
  { type: "video", src: "", shape: "h", title: "Proyecto 25" },
];

/* Arma una tarjeta de proyecto */
const SVG_NS = "http://www.w3.org/2000/svg";

function iconoPlay() {
  const play = document.createElement("span");
  play.className = "project__play";
  play.setAttribute("aria-hidden", "true");
  const circulo = document.createElement("span");
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", "#play");
  svg.appendChild(use);
  circulo.appendChild(svg);
  play.appendChild(circulo);
  return play;
}

function crearProyecto(item) {
  const fig = document.createElement("figure");
  fig.className = "project";
  if (item.shape && item.shape !== "v") fig.classList.add(`project--${item.shape}`);

  const media = document.createElement("div");
  media.className = "media";
  media.dataset.label = item.title || "";

  const cap = document.createElement("figcaption");
  cap.className = "project__caption";
  cap.textContent = item.title || "";

  // Sin archivo todavía: recuadro gris decorativo, sin interacción
  if (!item.src) {
    fig.classList.add("project--empty");
    fig.append(media);
    if (item.type === "video") fig.append(iconoPlay());
    if (item.title) fig.append(cap);
    return fig;
  }

  // Tamaño intrínseco (evita saltos de diseño). Por defecto, formato reel 9:16
  const ancho = item.width || 1080;
  const alto = item.height || 1920;

  if (item.type === "video") {
    const v = document.createElement("video");
    v.src = item.src;
    if (item.poster) v.poster = item.poster;
    v.width = ancho;
    v.height = alto;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.setAttribute("aria-hidden", "true");
    media.append(v);

    // Un <button> real: funciona con mouse, teclado y pantalla táctil
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project__btn";
    btn.setAttribute("aria-label", `Reproducir con sonido: ${item.title || "video"}`);
    btn.setAttribute("aria-pressed", "false");
    btn.append(media, iconoPlay());

    const vistaPrevia = () => { if (!reduceMotion.matches && v.muted) v.play().catch(() => {}); };
    const pausarVista = () => { if (v.muted) { v.pause(); } };

    btn.addEventListener("pointerenter", vistaPrevia);
    btn.addEventListener("pointerleave", pausarVista);
    btn.addEventListener("focus", vistaPrevia);
    btn.addEventListener("blur", pausarVista);
    btn.addEventListener("click", () => {
      const conSonido = v.muted;
      v.muted = !conSonido;
      if (conSonido) v.play().catch(() => {});
      else v.pause();
      btn.setAttribute("aria-pressed", String(conSonido));
      btn.setAttribute("aria-label", `${conSonido ? "Pausar" : "Reproducir con sonido"}: ${item.title || "video"}`);
      fig.classList.toggle("is-playing", conSonido);
    });

    fig.append(btn);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || item.title || "";
    img.width = ancho;
    img.height = alto;
    img.loading = "lazy";
    img.decoding = "async";
    media.append(img);
    fig.append(media);
  }

  if (item.title) fig.append(cap);

  return fig;
}

function renderGrid(id, items) {
  const grid = document.getElementById(id);
  if (!grid) return;
  const frag = document.createDocumentFragment();
  items.forEach((item) => frag.appendChild(crearProyecto(item)));
  grid.appendChild(frag);
}

renderGrid("grid-1", PROYECTOS_1);
renderGrid("grid-2", PROYECTOS_2);

/* ---------------------------------------------------------
   Menú mobile
   --------------------------------------------------------- */
const topbar = document.querySelector(".topbar");
const toggle = document.querySelector(".topbar__toggle");

function setMenu(abierto) {
  topbar.classList.toggle("is-open", abierto);
  toggle.setAttribute("aria-expanded", String(abierto));
  toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
}

toggle?.addEventListener("click", () => setMenu(!topbar.classList.contains("is-open")));

document.querySelectorAll(".topbar__nav a").forEach((a) =>
  a.addEventListener("click", () => setMenu(false))
);

// Escape cierra el menú y devuelve el foco al botón
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && topbar.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

/* ---------------------------------------------------------
   Link activo según la sección visible
   --------------------------------------------------------- */
const links = [...document.querySelectorAll(".topbar__nav a")];
const secciones = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const activo = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("is-active", activo);
        if (activo) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
secciones.forEach((s) => navObserver.observe(s));

/* ---------------------------------------------------------
   Garabatos que se dibujan al aparecer en pantalla
   --------------------------------------------------------- */
const drawObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-drawn");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".doodle, .process__oval").forEach((el) => drawObserver.observe(el));
