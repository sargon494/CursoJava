/**
 * Mejoras UI/UX para CursoJava
 * - Animaciones de feedback visual
 * - Breadcrumbs
 * - Toast notifications
 * - Badges de progreso
 * - Skeleton loading
 * - Modo oscuro manual con persistencia
 * - Keyboard shortcuts
 * - Modal para exámenes con temporizador
 * - Chuleta: copiar/cortar + modo examen
 * - Gamificación (badges, medallas, racha)
 * - Exportar progreso JSON
 */

(function () {
  "use strict";

  // ============ CONFIGURACIÓN ============
  const CONFIG = {
    STORAGE_KEY: "curso-java-preferencias-v1",
    PROGRESO_KEY: "curso-java-progreso-v1",
    THEME_KEY: "curso-java-tema",
    RACHA_KEY: "curso-java-racha",
    LAST_OPEN: "curso-java-ultimo-abierto",
    ANIM_DURATION: 250,
    TOAST_DURATION: 3000,
    TOAST_MAX: 3,
    BADGES: {
      "ejercicios-10": { titulo: "Explorador", desc: "10 ejercicios completados", icon: "📝" },
      "ejercicios-25": { titulo: "Aprendiz", desc: "25 ejercicios completados", icon: "🌱" },
      "ejercicios-50": { titulo: "Practicante", desc: "50 ejercicios completados", icon: "🔥" },
      "ejercicios-100": { titulo: "Desarrollador", desc: "100 ejercicios completados", icon: "🚀" },
      "racha-3": { titulo: "Racha 3 días", desc: "3 días seguidos", icon: "🔥" },
      "racha-7": { titulo: "Racha 7 días", desc: "7 días seguidos", icon: "🔥🔥" },
      "racha-14": { titulo: "Racha 14 días", desc: "14 días seguidos", icon: "🔥🔥🔥" },
      "racha-30": { titulo: "Racha 30 días", desc: "30 días seguidos", icon: "👑" },
      "progreso-50": { titulo: "Mitad del camino", desc: "50% del progreso", icon: "🎯" },
      "progreso-80": { titulo: "Casi listo", desc: "80% del progreso", icon: "🏆" },
      "progreso-100": { titulo: "Graduado", desc: "100% del progreso", icon: "🎓" },
    },
    SHORTCUTS: {
      "ctrl+K": "toggle-modal-busqueda",
      "ctrl+←": "navegar-unidad-anterior",
      "ctrl+→": "navegar-unidad-siguiente",
      "ctrl+S": "guardar-progreso",
      "ctrl+E": "abrir-examen-actual",
      "ctrl+P": "abrir-chuleta",
    },
  };

  // ============ UTILIDADES ============
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) => String(s || "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;" }[c]));
  const uid = () => "uj-" + Math.random().toString(36).slice(2,9);
  const ahora = () => new Date().toISOString();
  const hoy = () => new Date().toDateString();
  const diasRacha = () => {
    const p = leerPreferencias();
    if (!p) return 0;
    const dias = p.diasRacha || [];
    const hoyD = new Date().toDateString();
    if (!dias.includes(hoyD)) {
      dias.push(hoyD);
      guardarPreferencias(p);
    }
    return dias.filter(d => d > hoyD - 14).length;
  };
  const leerPreferencias = () => {
    try {
      const d = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY));
      return d && typeof d === "object" ? d : {};
    } catch { return {}; }
  };
  const guardarPreferencias = (obj) => {
    try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
  };
  const leerProgreso = () => {
    try {
      const d = JSON.parse(localStorage.getItem(CONFIG.PROGRESO_KEY));
      return d && typeof d === "object" ? d : {};
    } catch { return {}; }
  };
  const guardarProgreso = (progreso) => {
    try { localStorage.setItem(CONFIG.PROGRESO_KEY, JSON.stringify(progreso)); } catch (e) {}
  };
  const leerProgresoGlobal = () => {
    const p = leerProgreso();
    return p.progresoGlobal || {};
  };
  const guardarProgresoGlobal = (progreso) => {
    const p = leerProgreso();
    p.progresoGlobal = progreso;
    guardarProgreso(p);
  };
  const progresoGlobal = () => leerProgresoGlobal();
  const progresoGlobalTotal = () => {
    const g = progresoGlobal();
    return g.total || 0;
  };
  const progresoGlobalHechos = () => {
    const g = progresoGlobal();
    return g.hechos || 0;
  };
  const guardarRespuestasQuiz = (uid, respuestas) => {
    const p = leerProgreso();
    if (!p.quizes) p.quizes = {};
    p.quizes[uid] = respuestas;
    guardarProgreso(p);
  };
  const respuestasQuiz = (uid) => {
    const p = leerProgreso();
    return p.quizes && p.quizes[uid] || [];
  };
  const leerUnidad = (id) => {
    const p = leerProgreso();
    return p.unidades && p.unidades[id] || {};
  };
  const guardarUnidad = (id, datos) => {
    const p = leerProgreso();
    if (!p.unidades) p.unidades = {};
    p.unidades[id] = datos;
    guardarProgreso(p);
  };
  const leerExamen = (id) => {
    const p = leerProgreso();
    return p.examenes && p.examenes[id] || {};
  };
  const guardarExamen = (id, datos) => {
    const p = leerProgreso();
    if (!p.examenes) p.examenes = {};
    p.examenes[id] = datos;
    guardarProgreso(p);
  };

  // ============ FEEDBACK VISUAL (animaciones) ============
  const animaciones = {
    // Check bounce
    checkBounce: (el, checked) => {
      if (!el) return;
      el.classList.toggle("check-hecho", checked);
      // Si el checkbox ya existe dentro del label, animamos su estado
      const cb = el.querySelector("input[type=checkbox]");
      if (cb) cb.checked = checked;
    },
    // Fade in
    fadeIn: (el, duration = CONFIG.ANIM_DURATION) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(4px)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    },
    // Slide up
    slideUp: (el, duration = CONFIG.ANIM_DURATION) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    },
    // Shake
    shake: (el, duration = 300) => {
      el.style.animation = `shake ${duration}ms ease-in-out`;
      setTimeout(() => { el.style.animation = ""; }, duration + 100);
    },
    // Pulse
    pulse: (el, duration = 1500) => {
      el.style.animation = `pulse ${duration}ms ease-in-out`;
      setTimeout(() => { el.style.animation = ""; }, duration + 100);
    },
    // Scale
    scale: (el, scale = 0.98, duration = 150) => {
      el.style.transform = `scale(${scale})`;
      el.style.transition = `transform ${duration}ms ease-out`;
    },
  };

  // ============ BREADCRUMBS ============
  const breadcrumbs = {
    render: (path) => {
      const crumbs = [];
      let current = "#";
      const parts = path.split("/").filter(Boolean);
      for (let i = 0; i < parts.length; i++) {
        const p = parts.slice(0, i + 1).join("/");
        let label;
        if (p === "#") {
          label = "Inicio";
        } else if (p.startsWith("#/examenes")) {
          label = "Exámenes";
        } else if (p.startsWith("#/u/")) {
          const id = p.replace("#/u/", "");
          const u = DATA.unidades.find(u => u.id === id);
          label = u ? u.titulo : "Unidad";
        } else if (p.startsWith("#/referencia")) {
          label = "Referencia";
        } else if (p.startsWith("#/progreso")) {
          label = "Progreso";
        } else {
          label = parts[i];
        }
        crumbs.push({ path: p, label });
      }
      const container = document.querySelector(".breadcrumbs-container");
      if (!container) return;
      const html = crumbs.map(c =>
        `<li class="breadcrumb-item${c.path === path ? " active" : ""}">
          <a href="${c.path}" class="breadcrumb-link">${esc(c.label)}</a>
        </li>`
      ).join("");
      container.innerHTML = html;
    },
  };

  // ============ TOAST NOTIFICATIONS ============
  const toast = {
    _el: null,
    _timer: null,
    _stack: [],
    init() {
      // Creamos el contenedor del toast (lo añadimos al body si no existe)
      if (!document.querySelector(".toasts-container")) {
        const div = document.createElement("div");
        div.className = "toasts-container";
        div.style.cssText = `
          position: fixed; top: 1rem; right: 1rem; z-index: 9999;
          display: flex; flex-direction: column; gap: 0.5rem;
          pointer-events: none;
        `;
        document.body.appendChild(div);
        this._el = div;
      } else {
        this._el = document.querySelector(".toasts-container");
      }
      this._stack = [];
      this._renderStack();
    },
    show(message, tipo = "info", duration = CONFIG.TOAST_DURATION) {
      // Evita duplicados
      if (this._stack.some(t => t.message === message && t.tipo === tipo)) return;
      // Limitamos el stack
      if (this._stack.length >= CONFIG.TOAST_MAX) {
        this._stack.shift();
      }
      const toast = {
        id: uid(),
        message,
        tipo,
        timestamp: Date.now(),
      };
      this._stack.push(toast);
      this._renderStack();
      // Programamos la eliminación
      this._timer = setTimeout(() => {
        this.hide(toast.id);
      }, duration);
      return toast.id;
    },
    hide(id) {
      const idx = this._stack.findIndex(t => t.id === id);
      if (idx >= 0) {
        this._stack.splice(idx, 1);
        this._renderStack();
      }
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    },
    _renderStack() {
      if (!this._el) return;
      this._el.innerHTML = this._stack.map(t => {
        const color = t.tipo === "error" ? "#ef4444" : t.tipo === "success" ? "#22c55e" : "#6366f1";
        return `
        <div class="toast" data-id="${t.id}" style="background: #fff; border-left: 4px solid ${color}; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
          <div class="toast-content">
            <span class="toast-message">${esc(t.message)}</span>
          </div>
          <button class="toast-close" aria-label="Cerrar notificación">×</button>
        </div>`;
      }).join("");
      // Event listeners
      this._el.querySelectorAll(".toast-close").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.closest(".toast").dataset.id;
          this.hide(id);
        });
      });
    },
  };

  // ============ BADGES DE PROGRESO ============
  const badges = {
    getBadges: () => {
      const p = progresoGlobal();
      const badgesObtenidos = [];
      for (const [key, info] of Object.entries(CONFIG.BADGES)) {
        if (p.badges && p.badges.includes(key)) {
          badgesObtenidos.push(info);
        }
      }
      // Badges de progreso global
      const pct = progresoGlobalTotal() > 0
        ? Math.round((progresoGlobalHechos() / progresoGlobalTotal()) * 100)
        : 0;
      if (pct >= 100) badgesObtenidos.push(CONFIG.BADGES["progreso-100"]);
      else if (pct >= 80) badgesObtenidos.push(CONFIG.BADGES["progreso-80"]);
      else if (pct >= 50) badgesObtenidos.push(CONFIG.BADGES["progreso-50"]);
      // Ordenar por orden de obtención (primero los de menor nivel)
      const orden = Object.keys(CONFIG.BADGES).sort((a, b) => CONFIG.BADGES[a].titulo.localeCompare(CONFIG.BADGES[b].titulo));
      return orden.filter(k => p.badges && p.badges.includes(k)).map(k => CONFIG.BADGES[k]);
    },
    render: () => {
      const container = document.querySelector(".badges-container");
      if (!container) return;
      const badgeList = badges.getBadges();
      if (badgeList.length === 0) {
        container.innerHTML = '<p class="badge-placeholder">Aún no tienes badges. Completa ejercicios para desbloquearlos.</p>';
        return;
      }
      container.innerHTML = badgeList.map(b =>
        `<div class="badge-item" data-badge="${b.titulo}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-info">
            <div class="badge-titulo">${esc(b.titulo)}</div>
            <div class="badge-desc">${esc(b.desc)}</div>
          </div>
        </div>`
      ).join("");
    },
  };

  // ============ SKELETON LOADING ============
  const skeleton = {
    create: (parent, rows = 3, cols = 3, type = "cards") => {
      const div = document.createElement("div");
      div.className = "skeleton-container";
      div.style.cssText = `display: ${type === "cards" ? "grid" : "flex"}; gap: 1rem; grid-template-columns: repeat(${cols}, minmax(0, 1fr));`;
      for (let i = 0; i < rows; i++) {
        const card = document.createElement("div");
        card.className = "skeleton-card";
        card.style.cssText = `
          background: repeating-linear-gradient(
            90deg,
            var(--papel-2),
            var(--papel-2) 8px,
            var(--papel) 8px,
            var(--papel) 16px
          );
          border-radius: 12px;
          padding: 1.5rem;
          min-height: 140px;
          animation: skeleton-shimmer 1.5s infinite;
        `;
        div.appendChild(card);
      }
      parent.appendChild(div);
    },
    remove: (parent) => {
      const el = parent.querySelector(".skeleton-container");
      if (el) el.remove();
    },
    // Keyframes para el efecto shimmer
    addKeyframes() {
      if (document.querySelector("[data-skeleton-keyframes]")) return;
      const style = document.createElement("style");
      style.setAttribute("data-skeleton-keyframes", "true");
      style.textContent = `
        @keyframes skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `;
      document.head.appendChild(style);
    },
  };

  // ============ MODO OSCURO MANUAL ============
  const modoOscuro = {
    init() {
      const pref = leerPreferencias();
      const tema = pref.tema || "auto";
      this.apply(tema);
      // Toggle en el body
      const toggle = document.createElement("button");
      toggle.className = "modo-oscuro-toggle";
      toggle.setAttribute("aria-label", "Cambiar tema");
      toggle.setAttribute("aria-pressed", tema !== "auto" ? "true" : "false");
      toggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${tema === "dark"
            ? '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>'
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'}
        </svg>`;
      const label = document.createElement("span");
      label.textContent = tema === "auto" ? "Auto" : tema === "light" ? "Claro" : "Oscuro";
      label.style.marginLeft = "0.4rem";
      toggle.appendChild(label);
      document.body.appendChild(toggle);
      // Click
      toggle.addEventListener("click", () => {
        const nuevo = tema === "auto" ? "dark" : tema === "dark" ? "light" : "auto";
        this.apply(nuevo);
      });
      // Guardar preferencia
      toggle.addEventListener("click", () => {
        const pref = leerPreferencias();
        pref.tema = tema === "auto" ? "dark" : tema === "dark" ? "light" : "auto";
        guardarPreferencias(pref);
      });
    },
    apply(tema) {
      const pref = leerPreferencias();
      pref.tema = tema;
      guardarPreferencias(pref);
      const body = document.body;
      if (tema === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
      } else if (tema === "light") {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
      } else {
        body.classList.remove("dark-mode", "light-mode");
      }
    },
  };

  // ============ KEYBOARD SHORTCUTS ============
  const teclado = {
    register() {
      document.addEventListener("keydown", e => {
        const ctrl = e.ctrlKey || e.metaKey;
        const key = e.key.toLowerCase();
        if (ctrl && key === "k") {
          e.preventDefault();
          this.toggleModalBusqueda();
        } else if (ctrl && key === "left") {
          e.preventDefault();
          this.navegarUnidadAnterior();
        } else if (ctrl && key === "right") {
          e.preventDefault();
          this.navegarUnidadSiguiente();
        } else if (ctrl && key === "s") {
          e.preventDefault();
          toast.show("Progreso guardado ✓", "success");
        } else if (ctrl && key === "e") {
          e.preventDefault();
          this.abrirExamenActual();
        } else if (ctrl && key === "p") {
          e.preventDefault();
          this.abrirChuleta();
        }
      });
    },
    toggleModalBusqueda() {
      const modal = document.querySelector(".modal-busqueda");
      if (!modal) return;
      if (modal.style.display === "flex") {
        modal.style.display = "";
        document.body.style.overflow = "";
      } else {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    },
    navegarUnidadAnterior() {
      const hash = location.hash;
      const m = hash.match(/^#\/u\/([\w-]+)$/);
      if (!m) return;
      const actual = m[1];
      const idx = DATA.unidades.findIndex(u => u.id === actual);
      if (idx > 0) {
        location.hash = "#/u/" + DATA.unidades[idx - 1].id;
      }
    },
    navegarUnidadSiguiente() {
      const hash = location.hash;
      const m = hash.match(/^#\/u\/([\w-]+)$/);
      if (!m) return;
      const actual = m[1];
      const idx = DATA.unidades.findIndex(u => u.id === actual);
      if (idx < DATA.unidades.length - 1) {
        location.hash = "#/u/" + DATA.unidades[idx + 1].id;
      }
    },
    abrirExamenActual() {
      const hash = location.hash;
      const m = hash.match(/^#\/u\/([\w-]+)$/);
      if (!m) return;
      const unidad = DATA.unidades.find(u => u.id === m[1]);
      if (!unidad) return;
      const extras = EXTRA[unidad.id] || {};
      const quiz = extras.quiz || [];
      if (quiz.length === 0) {
        toast.show("Esta unidad no tiene autoevaluación.", "info");
        return;
      }
      location.hash = "#/quiz/" + unidad.id;
    },
    abrirChuleta() {
      const hash = location.hash;
      const m = hash.match(/^#\/u\/([\w-]+)$/);
      if (!m) return;
      const unidad = DATA.unidades.find(u => u.id === m[1]);
      if (!unidad) return;
      const extras = EXTRA[unidad.id] || {};
      const explicaciones = extras.explicacion || [];
      if (explicaciones.length === 0) {
        toast.show("Esta unidad no tiene chuleta.", "info");
        return;
      }
      const modal = document.querySelector(".modal-chuleta");
      if (!modal) return;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      const contenido = explicaciones.map(s =>
        `<section class="chuleta-apartado">
          <h3>${esc(s.titulo)}</h3>
          ${s.parrafos.map(p => `<p>${esc(p)}</p>`).join("")}
          ${s.codigo ? `<pre><code>${esc(s.codigo)}</code></pre>` : ""}
        </section>`
      ).join("");
      modal.querySelector(".chuleta-contenido").innerHTML = contenido;
    },
  };

  // ============ MODAL PARA EXÁMENES CON TEMPORIZADOR ============
  const modalExamen = {
    create: (examenId, pregunta, opciones, correcta) => {
      const modal = document.createElement("div");
      modal.className = "modal-examen";
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
      `;
      modal.innerHTML = `
        <div class="modal-examen-contenedor" role="dialog" aria-modal="true">
          <div class="modal-examen-cabecera">
            <h3>Examen: ${esc(pregunta)}</h3>
            <div class="modal-examen-timer">
              <span>Temporizador:</span>
              <div class="modal-examen-barra">
                <div class="modal-examen-barra-fill"></div>
              </div>
              <span class="modal-examen-timer-text" id="timer-text-${uid()}"></span>
            </div>
            <button class="modal-examen-cerrar" aria-label="Cerrar">×</button>
          </div>
          <div class="modal-examen-cuerpo">
            <div class="modal-examen-opciones">
              ${opciones.map((o, i) =>
                `<button class="modal-examen-opcion" data-i="${i}">${esc(o)}</button>`
              ).join("")}
            </div>
          </div>
          <div class="modal-examen-pie">
            <button class="modal-examen-siguiente">Siguiente pregunta →</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Temporizador: 15 segundos por pregunta
      const timerText = modal.querySelector("#timer-text-" + uid());
      const barraFill = modal.querySelector(".modal-examen-barra-fill");
      const tiempo = 15;
      let tiempoRestante = tiempo;
      const intervalo = setInterval(() => {
        tiempoRestante -= 0.1;
        const pct = (tiempoRestante / tiempo) * 100;
        barraFill.style.width = pct + "%";
        timerText.textContent = Math.ceil(tiempoRestante) + "s";
        if (tiempoRestante <= 0) {
          clearInterval(intervalo);
          toast.show("¡Se acabó el tiempo! Mostrando respuesta correcta.", "error");
          this.mostarCorrecta(modal);
        }
      }, 100);

      // Cerrar
      modal.querySelector(".modal-examen-cerrar").addEventListener("click", () => {
        modal.remove();
        clearInterval(intervalo);
      });

      // Respuesta
      modal.querySelectorAll(".modal-examen-opcion").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.i);
          if (idx === Number(correcta)) {
            btn.classList.add("ok");
            toast.show("¡Correcto! ✓", "success");
          } else {
            btn.classList.add("mal");
            toast.show("Incorrecto. La respuesta es: " + esc(opciones[correcta]), "error");
          }
          clearInterval(intervalo);
          setTimeout(() => modal.remove(), 2000);
        });
      });

      // Siguiente
      modal.querySelector(".modal-examen-siguiente").addEventListener("click", () => {
        clearInterval(intervalo);
        modal.remove();
      });

      return modal;
    },
    mostarCorrecta(modal) {
      const correctaIdx = Number(modal.querySelector("[data-i]").dataset.i);
      modal.querySelectorAll(".modal-examen-opcion").forEach(btn => {
        if (Number(btn.dataset.i) === correctaIdx) btn.classList.add("ok");
        else btn.classList.add("mal");
      });
    },
  };

  // ============ CHULETA: COPIAR/CORTAR + MODO EXÁMEN ============
  const chuleta = {
    crearBotones: (elemento) => {
      const bar = document.createElement("div");
      bar.className = "chuleta-barra";
      bar.style.cssText = `
        display: flex; gap: 0.5rem; margin-bottom: 0.6rem;
        padding: 0.4rem 0.8rem; border-radius: 8px;
        background: var(--papel-2); border: 1px solid var(--linea);
      `;
      const btnCopiar = document.createElement("button");
      btnCopiar.className = "chuleta-btn";
      btnCopiar.textContent = "📋 Copiar";
      btnCopiar.style.cssText = `
        flex: 1; padding: 0.35rem 0.6rem; border-radius: 6px;
        border: 1px solid var(--acento); background: transparent;
        color: var(--acento); font: inherit; font-size: 0.8rem; cursor: pointer;
      `;
      btnCopiar.addEventListener("click", () => {
        const texto = elemento.textContent.replace(/^\s+|\s+$/g, "");
        navigator.clipboard.writeText(texto).then(() => {
          toast.show("Copiado al portapapeles ✓", "success");
        });
      });
      const btnCortar = document.createElement("button");
      btnCortar.className = "chuleta-btn";
      btnCortar.textContent = "✂️ Cortar";
      btnCortar.style.cssText = `
        flex: 1; padding: 0.35rem 0.6rem; border-radius: 6px;
        border: 1px solid var(--linea); background: transparent;
        color: var(--tinta); font: inherit; font-size: 0.8rem; cursor: pointer;
      `;
      btnCortar.addEventListener("click", () => {
        const texto = elemento.textContent.replace(/^\s+|\s+$/g, "");
        navigator.clipboard.writeText(texto).then(() => {
          toast.show("Cortado al portapapeles ✓", "success");
          elemento.style.display = "none";
        });
      });
      const btnModoExamen = document.createElement("button");
      btnModoExamen.className = "chuleta-btn";
      btnModoExamen.textContent = "🎯 Modo examen";
      btnModoExamen.style.cssText = `
        flex: 1; padding: 0.35rem 0.6rem; border-radius: 6px;
        border: 1px solid var(--acento); background: transparent;
        color: var(--acento); font: inherit; font-size: 0.8rem; cursor: pointer;
      `;
      btnModoExamen.addEventListener("click", () => {
        elemento.style.border = "2px solid #ef4444";
        elemento.style.background = "rgba(239,68,68,0.08)";
        elemento.style.padding = "1.2rem 1rem";
        elemento.style.borderRadius = "12px";
        elemento.style.margin = "1rem 0";
        elemento.style.boxShadow = "0 8px 24px rgba(239,68,68,0.2)";
        elemento.style.transition = "all 200ms ease";
        toast.show("Modo examen activado. Resuelve sin mirar.", "info");
      });
      bar.appendChild(btnCopiar);
      bar.appendChild(btnCortar);
      bar.appendChild(btnModoExamen);
      elemento.parentNode.insertBefore(bar, elemento.nextSibling);
    },
  };

  // ============ GAMIFICACIÓN (badges, medallas, racha) ============
  const gamificacion = {
    init() {
      const p = leerProgreso();
      if (!p.badges) p.badges = [];
      guardarProgreso(p);
      // Comprobar badges
      const g = progresoGlobal();
      const pct = g.total ? Math.round(g.hechos / g.total * 100) : 0;
      if (g.hechos >= 10 && !p.badges.includes("ejercicios-10")) {
        p.badges.push("ejercicios-10");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["ejercicios-10"].titulo + "!", "success");
      }
      if (g.hechos >= 25 && !p.badges.includes("ejercicios-25")) {
        p.badges.push("ejercicios-25");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["ejercicios-25"].titulo + "!", "success");
      }
      if (g.hechos >= 50 && !p.badges.includes("ejercicios-50")) {
        p.badges.push("ejercicios-50");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["ejercicios-50"].titulo + "!", "success");
      }
      if (g.hechos >= 100 && !p.badges.includes("ejercicios-100")) {
        p.badges.push("ejercicios-100");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["ejercicios-100"].titulo + "!", "success");
      }
      if (pct >= 50 && !p.badges.includes("progreso-50")) {
        p.badges.push("progreso-50");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["progreso-50"].titulo + "!", "success");
      }
      if (pct >= 80 && !p.badges.includes("progreso-80")) {
        p.badges.push("progreso-80");
        guardarProgreso(p);
        toast.show("🎉 ¡Nuevo badge: " + CONFIG.BADGES["progreso-80"].titulo + "!", "success");
      }
      if (pct >= 100 && !p.badges.includes("progreso-100")) {
        p.badges.push("progreso-100");
        guardarProgreso(p);
        toast.show("🎉 ¡FELICIDADES! Eres graduado. 🎓", "success");
      }
      // Racha
      const dias = diasRacha();
      if (dias >= 3 && !p.badges.includes("racha-3")) {
        p.badges.push("racha-3");
        guardarProgreso(p);
        toast.show("🎉 ¡Racha de 3 días! " + CONFIG.BADGES["racha-3"].titulo, "success");
      }
      if (dias >= 7 && !p.badges.includes("racha-7")) {
        p.badges.push("racha-7");
        guardarProgreso(p);
        toast.show("🎉 ¡Racha de 7 días! " + CONFIG.BADGES["racha-7"].titulo, "success");
      }
      if (dias >= 14 && !p.badges.includes("racha-14")) {
        p.badges.push("racha-14");
        guardarProgreso(p);
        toast.show("🎉 ¡Racha de 14 días! " + CONFIG.BADGES["racha-14"].titulo, "success");
      }
      if (dias >= 30 && !p.badges.includes("racha-30")) {
        p.badges.push("racha-30");
        guardarProgreso(p);
        toast.show("🎉 ¡Racha de 30 días! " + CONFIG.BADGES["racha-30"].titulo, "success");
      }
    },
    racha: {
      get: () => diasRacha(),
      days: (n) => {
        const dias = diasRacha();
        if (dias >= n) return true;
        const p = leerPreferencias();
        if (!p.diasRacha) p.diasRacha = [];
        const hoyD = new Date().toDateString();
        if (!p.diasRacha.includes(hoyD)) {
          p.diasRacha.push(hoyD);
          guardarPreferencias(p);
        }
        return p.diasRacha.filter(d => d > hoyD - 14).length >= n;
      },
    },
    medallas: {
      niveles: [
        { nombre: "Novato", icono: "🐣", color: "#9ca3af", requerido: 0 },
        { nombre: "Aprendiz", icono: "🌱", color: "#10b981", requerido: 10 },
        { nombre: "Practicante", icono: "🔥", color: "#f59e0b", requerido: 30 },
        { nombre: "Desarrollador", icono: "🚀", color: "#3b82f6", requerido: 60 },
        { nombre: "Experto", icono: "👑", color: "#ef4444", requerido: 100 },
      ],
      obtener: () => {
        const nivel = Math.min(gamificacion.medallas.niveles.length - 1, Math.floor(progresoGlobalHechos() / 10));
        return gamificacion.medallas.niveles[nivel];
      },
      render: () => {
        const medalla = gamificacion.medallas.obtener();
        const container = document.querySelector(".medalla-container");
        if (!container) return;
        container.innerHTML = `
          <div class="medalla-item">
            <div class="medalla-icono" style="color: ${medalla.color}">${medalla.icono}</div>
            <div class="medalla-info">
              <div class="medalla-nombre">${esc(medalla.nombre)}</div>
              <div class="medalla-desc">${progresoGlobalHechos()} ejercicios completados</div>
            </div>
          </div>
        `;
      },
    },
  };

  // ============ EXPORTAR PROGRESO JSON ============
  const exportar = {
    generar: () => {
      const p = leerProgreso();
      const g = progresoGlobal();
      const exporto = {
        version: "1.0",
        fecha: ahora(),
        progreso: g,
        badges: p.badges || [],
        diasRacha: p.diasRacha || [],
        unidades: p.unidades,
        quizes: p.quizes,
        examenes: p.examenes,
      };
      const blob = new Blob([JSON.stringify(exporto, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `progreso-curso-java-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.show("Progreso exportado ✓", "success");
    },
  };

  // ============ AYUDA CONTEXTUAL (pistas) ============
  const ayuda = {
    pistas: [
      "Recuerda: en Java, los métodos se declaran con `public static void` para métodos estáticos.",
      "Los bucles `for-each` son ideales para iterar sobre arrays y colecciones sin gestionar índices.",
      "Las excepciones se declaran con `throws` en la firma del método o se capturan con `try-catch`.",
      "Las clases genéricas usan `<T>` para parametrizar tipos y garantizar la seguridad en tiempo de compilación.",
      "Los `ArrayList` son dinámicos y crecen automáticamente; los `LinkedList` son mejores cuando hay muchas inserciones/eliminaciones en el medio.",
      "La herencia en Java usa `extends` para clases y `implements` para interfaces.",
      "Los `switch` modernos permiten comparar con expresiones y múltiples `case` sin `break` explícito (fall-through).",
    ],
    mostrar: () => {
      const container = document.querySelector(".ayuda-pistas");
      if (!container) return;
      const disponibles = ayuda.pistas.filter(p => {
        const p = leerProgreso();
        return !p.pistas || !p.pistas.includes(p);
      });
      if (disponibles.length === 0) return;
      const pista = disponibles[Math.floor(Math.random() * disponibles.length)];
      const div = document.createElement("div");
      div.className = "ayuda-pista";
      div.style.cssText = `
        margin: 1rem 0; padding: 0.7rem 1rem; border-radius: 8px;
        background: var(--acento-suave); border: 1px solid var(--acento);
        font-size: 0.88rem; color: var(--tinta);
      `;
      div.textContent = "💡 " + pista;
      container.appendChild(div);
      const p = leerProgreso();
      if (!p.pistas) p.pistas = [];
      p.pistas.push(pista);
      guardarProgreso(p);
      setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateY(-4px)";
        div.style.transition = "opacity 200ms, transform 200ms";
        setTimeout(() => div.remove(), 200);
      }, 5000);
    },
  };

  // ============ INICIALIZACIÓN GLOBAL ============
  window.CursoJavaMejoras = {
    init: () => {
      toast.init();
      modoOscuro.init();
      teclado.register();
      skeleton.addKeyframes();
      gamificacion.init();
      // Si ya existe la clase de datos, la extendemos
      if (typeof DATA !== "undefined" && typeof DATA.addUnidad === "function") {
        DATA.addUnidad = DATA.addUnidad || ((u) => {
          // Añadir chuleta si existe explicacion
          const extras = EXTRA[u.id] || {};
          const explicaciones = extras.explicacion || [];
          if (explicaciones.length > 0) {
            const explicacion = explicaciones[0];
            const div = document.createElement("div");
            div.className = "chuleta-item";
            div.style.cssText = `
              margin: 1rem 0; padding: 0.8rem 1rem; border-radius: 8px;
              background: var(--papel-2); border: 1px solid var(--linea);
              font-size: 0.9rem; color: var(--tinta-suave);
            `;
            div.textContent = explicacion.pregunta + " → " + explicacion.respuesta;
            chuleta.crearBotones(div);
            ayuda.mostrar();
            return div;
          }
        });
      }
    },
  };

  // Ejecutar al cargar
  window.addEventListener("load", () => {
    window.CursoJavaMejoras && window.CursoJavaMejoras.init();
  });

})();