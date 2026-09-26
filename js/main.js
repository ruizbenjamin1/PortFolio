/* =========================================================
   Martina Ibraim · Portfolio — main.js
   ========================================================= */

/* ---------------------------------------------------------
   PROYECTOS
   Para agregar el contenido real, completá "src" en cada item:
     type:  "video" | "image"
     src:   ruta al archivo, ej: "assets/videos/raiz.mp4"
     poster (opcional, solo videos): imagen de portada
     shape: "v" (vertical) | "h" (horizontal) | "sm" (chico) | "tall" (alto)
     title: texto alternativo / nombre del proyecto
   Mientras "src" esté vacío se muestra un recuadro gris.
   --------------------------------------------------------- */
const PROYECTOS_1 = [
  { type: "video", src: "", shape: "sm",   title: "Vamos a conocer" },
  { type: "video", src: "", shape: "h",    title: "Proyecto 2" },
  { type: "video", src: "", shape: "tall", title: "Raíz" },
  { type: "video", src: "", shape: "tall", title: "LeBron" },
  { type: "video", src: "", shape: "sm",   title: "Proyecto 5" },
  { type: "video", src: "", shape: "h",    title: "Proyecto 6" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 7" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 8" },
  { type: "video", src: "", shape: "h",    title: "Proyecto 9" },
  { type: "video", src: "", shape: "v",    title: "Podóloga" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 11" },
];

const PROYECTOS_2 = [
  { type: "video", src: "", shape: "tall", title: "Proyecto 12" },
  { type: "video", src: "", shape: "sm",   title: "Raíz 2" },
  { type: "video", src: "", shape: "tall", title: "Proyecto 14" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 15" },
  { type: "video", src: "", shape: "sm",   title: "Congreso" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 17" },
  { type: "video", src: "", shape: "sm",   title: "Proyecto 18" },
  { type: "video", src: "", shape: "sm",   title: "Proyecto 19" },
  { type: "video", src: "", shape: "v",    title: "Proyecto 20" },
  { type: "video", src: "", shape: "tall", title: "Medical" },
];

/* Arma una tarjeta de proyecto */
function crearProyecto(item) {
  const fig = document.createElement("figure");
  fig.className = "project reveal";
  if (item.shape && item.shape !== "v") fig.classList.add(`project--${item.shape}`);

  const media = document.createElement("div");
  media.className = "media";
  media.dataset.label = item.title || "";

  if (item.src) {
    if (item.type === "video") {
      const v = document.createElement("video");
      v.src = item.src;
      if (item.poster) v.poster = item.poster;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "metadata";
      v.setAttribute("aria-label", item.title || "Video");
      media.appendChild(v);

      // Previsualiza al pasar el mouse, click para ver con sonido
      fig.addEventListener("mouseenter", () => v.play().catch(() => {}));
      fig.addEventListener("mouseleave", () => v.pause());
      fig.addEventListener("click", () => {
        v.muted = !v.muted;
        v.paused ? v.play() : null;
      });
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title || "";
      img.loading = "lazy";
      media.appendChild(img);
    }
  }

  fig.appendChild(media);

  if (item.type === "video") {
    const play = document.createElement("div");
    play.className = "project__play";
    play.innerHTML = '<span><svg><use href="#play"/></svg></span>';
    fig.appendChild(play);
  }

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

toggle?.addEventListener("click", () => {
  const abierto = topbar.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", abierto);
});

document.querySelectorAll(".topbar__nav a").forEach((a) =>
  a.addEventListener("click", () => {
    topbar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

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
      links.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
secciones.forEach((s) => navObserver.observe(s));

/* ---------------------------------------------------------
   Aparición al hacer scroll
   --------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
