// Renderizado sencillo por hash. El progreso se guarda en localStorage.
(function () {
  const DATA = window.TEMARIO;
  const EXTRA = window.CONTENIDO || {};   // enunciados completos y soluciones por unidad
  const CLAVE = "curso-java-progreso-v1";
  const app = document.getElementById("app");
  const menu = document.getElementById("menu");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function leer() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; }
  }
  function guardar(p) {
    try { localStorage.setItem(CLAVE, JSON.stringify(p)); } catch (e) { /* almacenamiento no disponible */ }
  }
  function marcado(clave) { return !!leer()[clave]; }
  function alternar(clave, valor) {
    const p = leer();
    if (valor) p[clave] = true; else delete p[clave];
    guardar(p);
  }

  const ejUd = u => "ud:" + u.id + ":";
  const ejEx = e => "ex:" + e.id + ":";

  function contar(lista, prefijo) {
    let total = 0, hechos = 0;
    lista.forEach(item => {
      (item.ejercicios || []).forEach((_, i) => {
        total++;
        if (marcado(prefijo(item) + i)) hechos++;
      });
    });
    return { total, hechos };
  }

  function progresoGlobal() {
    const a = contar(DATA.unidades, ejUd);
    const b = contar(DATA.examenes, ejEx);
    return { total: a.total + b.total, hechos: a.hechos + b.hechos };
  }

  function barra(pct) {
    return `<div class="barra-fondo" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="barra-valor" style="width:${pct}%"></div></div>`;
  }

  // Bloque de un ejercicio: enunciado (completo si existe), casilla y solución desplegable.
  function bloqueEjercicio(id, indice, titulo, textoBase, clave, extra) {
    const hecho = marcado(clave);
    const enunciado = (extra && extra.enunciado) || textoBase;
    const solucion = extra && extra.solucion
      ? `<details class="solucion"><summary>Ver solución</summary><pre><code>${esc(extra.solucion)}</code></pre></details>`
      : "";
    return `<li class="ejercicio ${hecho ? "hecho" : ""}">
      <input type="checkbox" id="${esc(id)}-${indice}" data-clave="${esc(clave)}" ${hecho ? "checked" : ""}>
      <div class="cuerpo-ej">
        <label for="${esc(id)}-${indice}">
          <div class="titulo-ej">${indice + 1}. ${esc(titulo)}</div>
          <div class="texto-ej">${esc(enunciado)}</div>
        </label>
        ${solucion}
      </div>
    </li>`;
  }

  function renderMenu(activo) {
    menu.innerHTML = DATA.unidades.map(u => {
      const actual = activo === u.id ? ' aria-current="page"' : "";
      return `<a href="#/u/${u.id}"${actual}><span class="num">${u.num}.</span>${esc(u.titulo)}</a>`;
    }).join("");
    document.querySelectorAll(".extras a").forEach(a => {
      a.toggleAttribute("aria-current", a.getAttribute("href") === location.hash);
    });
  }

  function vistaInicio() {
    const g = progresoGlobal();
    const pct = g.total ? Math.round(g.hechos / g.total * 100) : 0;
    const tarjetas = DATA.unidades.map(u => {
      const c = contar([u], ejUd);
      const p = c.total ? Math.round(c.hechos / c.total * 100) : 0;
      const pieEj = c.total ? `${c.hechos}/${c.total} ejercicios` : "Solo teoría";
      return `<a class="tarjeta" href="#/u/${u.id}">
        <span class="etiqueta">Unidad ${u.num}</span>
        <h3>${esc(u.titulo)}</h3>
        <p>${esc(u.resumen)}</p>
        ${c.total ? `<div class="mini-barra"><span style="width:${p}%"></span></div>` : ""}
        <div class="pie">${pieEj}</div>
      </a>`;
    }).join("");
    return `
      <p class="etiqueta">Repaso desde cero</p>
      <h1>Curso de Java</h1>
      <p class="subtitulo">Teoría, ejercicios y exámenes del temario de Programación (1º DAM), en orden.</p>
      <div class="progreso-global">
        ${barra(pct)}
        <div class="progreso-texto">${g.hechos} de ${g.total} ejercicios completados (${pct}%)</div>
      </div>
      <div class="tarjetas">${tarjetas}</div>`;
  }

  function vistaUnidad(id) {
    const idx = DATA.unidades.findIndex(u => u.id === id);
    if (idx < 0) return vistaInicio();
    const u = DATA.unidades[idx];
    const ant = DATA.unidades[idx - 1];
    const sig = DATA.unidades[idx + 1];
    const extra = (EXTRA[u.id] || {}).ejercicios || [];
    const teoria = `<ul class="teoria">${u.teoria.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
    const codigo = (u.codigo || []).map(c => `<pre><code>${esc(c)}</code></pre>`).join("");
    const ejercicios = (u.ejercicios || []).length
      ? `<h2>Ejercicios</h2>
         <ol class="ejercicios">${u.ejercicios.map((e, i) =>
           bloqueEjercicio(`ej-${u.id}`, i, e.titulo, e.texto, ejUd(u) + i, extra[i])
         ).join("")}</ol>`
      : `<h2>Ejercicios</h2><p>Esta unidad no tiene ejercicios propios en el temario; practica con los de la unidad 12 y los exámenes.</p>`;
    const pie = `<nav class="nav-unidad" aria-label="Unidades">
      ${ant ? `<a href="#/u/${ant.id}">← ${esc(ant.titulo)}</a>` : "<span></span>"}
      ${sig ? `<a href="#/u/${sig.id}">${esc(sig.titulo)} →</a>` : "<span></span>"}
    </nav>`;
    return `
      <p class="etiqueta">Unidad ${u.num}</p>
      <h1>${esc(u.titulo)}</h1>
      <p class="subtitulo">${esc(u.resumen)}</p>
      <h2>Teoría</h2>
      ${teoria}
      ${codigo}
      ${ejercicios}
      ${pie}`;
  }

  function vistaExamenes(id) {
    if (id) {
      const ex = DATA.examenes.find(e => e.id === id);
      if (!ex) return vistaExamenes();
      const lista = ex.ejercicios.map((e, i) =>
        bloqueEjercicio(`ex-${ex.id}`, i, e.titulo, e.texto, ejEx(ex) + i, null)
      ).join("");
      return `
        <p class="etiqueta">Examen</p>
        <h1>${esc(ex.titulo)}</h1>
        <p class="subtitulo">Resuelve cada parte sin mirar la solución. Marca lo que te salga bien.</p>
        <ol class="ejercicios">${lista}</ol>
        <p><a href="#/examenes">← Todos los exámenes</a></p>`;
    }
    const filas = DATA.examenes.map(e => {
      const c = contar([e], ejEx);
      return `<a class="tarjeta" href="#/examenes/${e.id}">
        <h3>${esc(e.titulo)}</h3>
        <div class="pie">${c.hechos}/${c.total} partes completadas</div>
      </a>`;
    }).join("");
    return `
      <p class="etiqueta">Exámenes</p>
      <h1>Exámenes de la asignatura</h1>
      <p class="subtitulo">Exámenes reales del curso, cada uno desglosado en sus partes.</p>
      <div class="tarjetas">${filas}</div>`;
  }

  function vistaReferencia() {
    const bloques = DATA.referencia.secciones.map(s => `
      <div class="bloque-ref">
        <h3>${esc(s.titulo)}</h3>
        ${s.lineas.map(l => `<div>${esc(l)}</div>`).join("")}
      </div>`).join("");
    return `
      <p class="etiqueta">Referencia</p>
      <h1>${esc(DATA.referencia.titulo)}</h1>
      <p class="subtitulo">Lo esencial para no tener que buscar en los apuntes.</p>
      <div class="tabla-ref">${bloques}</div>`;
  }

  function vistaProgreso() {
    const g = progresoGlobal();
    const pct = g.total ? Math.round(g.hechos / g.total * 100) : 0;
    const filas = DATA.unidades.map(u => {
      const c = contar([u], ejUd);
      const p = c.total ? Math.round(c.hechos / c.total * 100) : 0;
      return `<li><a href="#/u/${u.id}">${u.num}. ${esc(u.titulo)}</a> · ${c.hechos}/${c.total}
        <div class="mini-barra"><span style="width:${p}%"></span></div></li>`;
    }).join("");
    return `
      <p class="etiqueta">Progreso</p>
      <h1>Tu progreso</h1>
      <p class="subtitulo">Se guarda en este navegador.</p>
      ${barra(pct)}
      <div class="progreso-texto">${g.hechos} de ${g.total} ejercicios (${pct}%)</div>
      <h2>Por unidad</h2>
      <ul class="teoria" style="list-style:none;padding:0">${filas}</ul>
      <h2>Restablecer</h2>
      <p><button class="boton" id="reset">Borrar todo el progreso</button></p>`;
  }

  function vistaNoEncontrada() {
    return `<h1>Página no encontrada</h1><p><a href="#/">Volver al inicio</a></p>`;
  }

  function pintar() {
    const h = location.hash || "#/";
    let html, activo = null;
    let m;
    if (h === "#/" || h === "#") html = vistaInicio();
    else if ((m = h.match(/^#\/u\/([\w-]+)$/))) { html = vistaUnidad(m[1]); activo = m[1]; }
    else if (h === "#/examenes") html = vistaExamenes();
    else if ((m = h.match(/^#\/examenes\/([\w-]+)$/))) html = vistaExamenes(m[1]);
    else if (h === "#/referencia") html = vistaReferencia();
    else if (h === "#/progreso") html = vistaProgreso();
    else html = vistaNoEncontrada();
    app.innerHTML = html;
    renderMenu(activo);
    document.title = (activo ? DATA.unidades.find(u => u.id === activo).titulo + " · " : "") + "Curso de Java";
    window.scrollTo(0, 0);
    const reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", () => {
      if (confirm("¿Borrar todo el progreso de este navegador?")) { guardar({}); pintar(); }
    });
  }

  app.addEventListener("change", e => {
    const t = e.target;
    if (t.matches('input[type="checkbox"][data-clave]')) {
      alternar(t.dataset.clave, t.checked);
      t.closest(".ejercicio").classList.toggle("hecho", t.checked);
    }
  });

  window.addEventListener("hashchange", pintar);
  pintar();
})();