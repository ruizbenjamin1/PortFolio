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
  { type: "video", src: "assets/web/proyecto-1.mp4", shape: "sm", title: "Proyecto 1" },
  { type: "video", src: "", shape: "h",  title: "Proyecto 2" },
  { type: "video", src: "assets/web/proyecto-3.mp4", shape: "v",  title: "Proyecto 3" },
  { type: "video", src: "assets/web/proyecto-4.mp4", shape: "v",  title: "Proyecto 4" },
  { type: "video", src: "assets/web/proyecto-5.mp4", shape: "sm", title: "Proyecto 5" },
  { type: "video", src: "assets/web/proyecto-6.mp4", shape: "h",  title: "Proyecto 6" },
  { type: "video", src: "assets/web/proyecto-7.mp4", shape: "v",  title: "Proyecto 7" },
  { type: "video", src: "assets/web/proyecto-8.mp4", shape: "v",  title: "Proyecto 8" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 9" },
  { type: "video", src: "assets/web/proyecto-10.mp4", shape: "v",  title: "Proyecto 10" },
  { type: "video", src: "assets/web/proyecto-11.mp4", shape: "v",  title: "Proyecto 11" },
  { type: "video", src: "", shape: "v",  title: "Proyecto 12" },
  { type: "video", src: "", shape: "h",  title: "Proyecto 13" },
];

const PROYECTOS_2 = [
  { type: "video", src: "", shape: "v", title: "Proyecto 14" },
  { type: "video", src: "assets/web/proyecto-15.mp4", shape: "v", title: "Proyecto 15" },
  { type: "video", src: "assets/web/proyecto-16.mp4", shape: "v", title: "Proyecto 16" },
  { type: "video", src: "assets/web/proyecto-17.mp4", shape: "v", title: "Proyecto 17" },
  { type: "video", src: "assets/web/proyecto-18.mp4", shape: "v", title: "Proyecto 18" },
  { type: "video", src: "assets/web/proyecto-19.mp4", shape: "v", title: "Proyecto 19" },
  { type: "video", src: "assets/web/proyecto-20.mp4", shape: "v", title: "Proyecto 20" },
  { type: "video", src: "assets/web/proyecto-21.mp4", shape: "v", title: "Proyecto 21" },
  { type: "video", src: "assets/web/proyecto-22.mp4", shape: "h", title: "Proyecto 22" },
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
  ["play", "pause"].forEach((icono) => {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", `icon-${icono}`);
    svg.setAttribute("focusable", "false");
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", `#${icono}`);
    svg.appendChild(use);
    circulo.appendChild(svg);
  });
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

    // activo = el visitante lo puso a reproducir (con sonido); si no, es solo vista previa muda
    let activo = false;
    const vistaPrevia = () => { if (!activo && !reduceMotion.matches) v.play().catch(() => {}); };
    const pausarVista = () => { if (!activo) v.pause(); };

    btn.addEventListener("pointerenter", vistaPrevia);
    btn.addEventListener("pointerleave", pausarVista);
    btn.addEventListener("focus", vistaPrevia);
    btn.addEventListener("blur", pausarVista);
    // Barra de progreso: se actualiza en cada cuadro mientras suena
    const barra = document.createElement("span");
    barra.className = "project__progress";
    barra.setAttribute("aria-hidden", "true");
    let raf = 0;
    const avanzar = () => {
      if (v.duration) barra.style.setProperty("--p", v.currentTime / v.duration);
      if (activo && !v.paused) raf = requestAnimationFrame(avanzar);
    };
    v.addEventListener("play", () => { cancelAnimationFrame(raf); avanzar(); });

    const titulo = item.title || "video";
    const setActivo = (on) => {
      activo = on;
      if (on) { v.muted = silenciado; v.play().catch(() => {}); }
      else { v.pause(); v.muted = true; }
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", `${on ? "Pausar" : "Reproducir con sonido"}: ${titulo}`);
      fig.classList.toggle("is-playing", on);
    };
    btn.addEventListener("click", () => setActivo(!activo));

    // Controles: volumen + pantalla completa
    let silenciado = false;
    const ctrl = document.createElement("div");
    ctrl.className = "project__ctrl";

    const botonIcono = (icono, label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "project__ctrl-btn";
      b.setAttribute("aria-label", label);
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("focusable", "false");
      svg.setAttribute("aria-hidden", "true");
      const use = document.createElementNS(SVG_NS, "use");
      use.setAttribute("href", `#${icono}`);
      svg.appendChild(use);
      b.appendChild(svg);
      return b;
    };
    const usar = (b, icono) => b.querySelector("use").setAttribute("href", `#${icono}`);

    const btnMute = botonIcono("volume", `Silenciar: ${titulo}`);
    const rango = document.createElement("input");
    rango.type = "range";
    rango.className = "project__vol";
    rango.min = "0"; rango.max = "1"; rango.step = "0.05"; rango.value = "1";
    rango.setAttribute("aria-label", `Volumen: ${titulo}`);
    const btnFull = botonIcono("fullscreen", `Pantalla completa: ${titulo}`);

    const pintarVolumen = () => {
      const mudo = silenciado || v.volume === 0;
      usar(btnMute, mudo ? "mute" : "volume");
      btnMute.setAttribute("aria-label", `${mudo ? "Activar sonido" : "Silenciar"}: ${titulo}`);
      rango.value = mudo ? 0 : v.volume;
      rango.style.setProperty("--v", rango.value);
    };
    btnMute.addEventListener("click", () => {
      if (v.volume === 0) v.volume = 0.5;
      silenciado = !silenciado;
      if (activo) v.muted = silenciado;
      pintarVolumen();
    });
    rango.addEventListener("input", () => {
      v.volume = Number(rango.value);
      silenciado = v.volume === 0;
      if (activo) v.muted = silenciado;
      pintarVolumen();
    });
    btnFull.addEventListener("click", () => {
      if (!activo) setActivo(true);
      if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });
    // En pantalla completa aparecen los controles nativos del navegador (incluye volumen)
    v.addEventListener("fullscreenchange", () => { v.controls = document.fullscreenElement === v; });
    v.addEventListener("volumechange", () => {
      if (document.fullscreenElement !== v) return;
      silenciado = v.muted;
      pintarVolumen();
    });

    ctrl.append(btnMute, rango, btnFull);
    fig.append(btn, barra, ctrl);
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
  items.forEach((item, i) => {
    const fig = crearProyecto(item);
    fig.style.setProperty("--i", i); // orden del revelado
    frag.appendChild(fig);
  });
  grid.appendChild(frag);
}

renderGrid("grid-1", PROYECTOS_1);
renderGrid("grid-2", PROYECTOS_2);

/* Trazo a mano alrededor de cada pastilla de Servicios.
   Se arma con el tamaño real de la pastilla (así rodea bien las puntas
   redondeadas) y se dibuja con CSS al pasar el mouse. */
const PAD_X = 14, PAD_Y = 12;

function trazoPastilla(w, h) {
  const W = w + PAD_X * 2, H = h + PAD_Y * 2;
  const x0 = 5, x1 = W - 4, y0 = 4, y1 = H - 3;
  const R = (y1 - y0) / 2, k = 1.3;
  const inicio = x0 + R * 1.6;
  return [
    `M ${inicio} ${y0 + 3}`,
    `C ${inicio + (x1 - x0) * .3} ${y0 - 1}, ${x1 - R * 1.4} ${y0 + 1}, ${x1 - R} ${y0}`,
    `C ${x1 - R + R * k} ${y0}, ${x1 - R + R * k} ${y1 - 1}, ${x1 - R * 1.05} ${y1}`,
    `C ${x1 - (x1 - x0) * .4} ${y1 + 2}, ${x0 + R * 1.5} ${y1 + 1}, ${x0 + R} ${y1 - 1}`,
    `C ${x0 + R - R * k} ${y1 - 2}, ${x0 + R - R * (k + .05)} ${y0 + 1}, ${x0 + R * 1.1} ${y0 + 2}`,
    `C ${x0 + R * 2} ${y0 + 1}, ${inicio + (x1 - x0) * .08} ${y0 - 3}, ${inicio + (x1 - x0) * .16} ${y0 - 2}`,
  ].join(" ");
}

function armarOvalo(pill) {
  const { width: w, height: h } = pill.getBoundingClientRect();
  if (!w) return;
  let svg = pill.querySelector(".pill__oval");
  if (!svg) {
    svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "pill__oval");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.8");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
    pill.appendChild(svg);
  }
  const W = w + PAD_X * 2, H = h + PAD_Y * 2;
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const path = svg.firstChild;
  path.setAttribute("d", trazoPastilla(w, h));
  svg.style.setProperty("--len", `${Math.ceil(path.getTotalLength())}px`);
}

const pillObserver = new ResizeObserver((entries) => entries.forEach((e) => armarOvalo(e.target)));
document.querySelectorAll(".pill").forEach((pill) => pillObserver.observe(pill));

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
document.querySelectorAll(".doodle, .process__oval, .projects__header").forEach((el) => drawObserver.observe(el));

// Las grillas son más altas que la pantalla en celular: se revelan apenas asoman
const developObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-developed");
        obs.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -20% 0px" }
);
document.querySelectorAll(".projects__grid").forEach((el) => developObserver.observe(el));
