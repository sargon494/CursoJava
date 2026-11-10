// Renderizado sencillo por hash. El progreso se guarda en localStorage.
(function () {
  const DATA = window.TEMARIO;
  const EXTRA = window.CONTENIDO || {};
  const EXPL = window.EXPLICACION || {};   // pista y "por qué funciona" por ejercicio
  const CLAVE = "curso-java-progreso-v1";
  const app = document.getElementById("app");
  const menu = document.getElementById("menu");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function avisarProgreso(mensaje) {
    const aviso = document.getElementById("aviso-progreso");
    if (!aviso) return;
    aviso.textContent = mensaje;
    aviso.hidden = !mensaje;
  }

  function leer() {
    let guardado;
    try {
      guardado = localStorage.getItem(CLAVE);
    } catch (error) {
      avisarProgreso("El navegador no permite acceder al progreso guardado. Puedes continuar, pero los cambios podrían no conservarse.");
      return {};
    }
    if (!guardado) return {};
    try {
      const progreso = JSON.parse(guardado);
      if (progreso && typeof progreso === "object" && !Array.isArray(progreso)) return progreso;
    } catch (error) {
      avisarProgreso("El progreso guardado no se puede leer. El curso seguirá disponible, pero el avance anterior no se ha cargado.");
      return {};
    }
    avisarProgreso("El progreso guardado tiene un formato no válido. El curso seguirá disponible, pero el avance anterior no se ha cargado.");
    return {};
  }
  function guardar(p) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(p));
      avisarProgreso("");
    } catch (error) {
      avisarProgreso("No se pudo guardar el progreso. Revisa el almacenamiento disponible o la configuración de privacidad del navegador.");
    }
  }
  function marcado(clave) { return !!leer()[clave]; }
  function alternar(clave, valor) {
    const p = leer();
    if (valor) p[clave] = true; else delete p[clave];
    guardar(p);
  }

  function respuestasQuiz(uid) {
    const guardado = leer()["quiz:" + uid];
    return guardado && Array.isArray(guardado.respuestas) ? guardado.respuestas : [];
  }

  function guardarRespuestasQuiz(uid, respuestas) {
    const p = leer();
    p["quiz:" + uid] = { respuestas };
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
  function bloqueEjercicio(id, indice, titulo, textoBase, clave, extra, ayuda) {
    const hecho = marcado(clave);
    const enunciado = (extra && extra.enunciado) || textoBase;
    const pista = ayuda && ayuda.pista
      ? `<details class="pista"><summary>Pista</summary><p>${esc(ayuda.pista)}</p></details>`
      : "";
    const solucion = extra && extra.solucion
      ? `<details class="solucion"><summary>Ver solución y explicación</summary>
          <pre><code>${esc(extra.solucion)}</code></pre>
          ${extra.explicacion ? `<div class="explicacion-solucion"><strong>Cómo entenderla</strong><p>${esc(extra.explicacion)}</p></div>` : ""}
        </details>`
      : "";
    const razon = ayuda && ayuda.razonamiento && ayuda.razonamiento.length
      ? `<details class="razonamiento"><summary>Por qué funciona</summary>${ayuda.razonamiento.map(p => `<p>${esc(p)}</p>`).join("")}</details>`
      : "";
    return `<li class="ejercicio ${hecho ? "hecho" : ""}">
      <input type="checkbox" id="${esc(id)}-${indice}" data-clave="${esc(clave)}" ${hecho ? "checked" : ""}>
      <div class="cuerpo-ej">
        <label for="${esc(id)}-${indice}">
          <div class="titulo-ej">${indice + 1}. ${esc(titulo)}</div>
          <div class="texto-ej">${esc(enunciado)}</div>
        </label>
        ${pista}
        ${solucion}
        ${razon}
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
      const pieEj = c.total ? `${c.hechos}/${c.total} ejercicios` : "Contenido y práctica";
      return `<a class="tarjeta" href="#/u/${u.id}">
        <span class="etiqueta">Unidad ${u.num}</span>
        <h3>${esc(u.titulo)}</h3>
        <p>${esc(u.resumen)}</p>
        ${c.total ? `<div class="mini-barra"><span style="width:${p}%"></span></div>` : ""}
        <div class="pie">${pieEj}</div>
      </a>`;
    }).join("");
    return `
      <section class="hero-curso">
        <div class="hero-contenido">
          <p class="etiqueta">Tu ruta de aprendizaje · Java</p>
          <h1>Aprende Java con criterio, no de memoria.</h1>
          <p class="subtitulo">Conceptos explicados paso a paso, práctica para resolver en Eclipse y exámenes para comprobar lo que ya sabes.</p>
          <a class="boton-principal" href="#/u/${DATA.unidades[0].id}">Empezar desde el principio <span aria-hidden="true">→</span></a>
        </div>
        <div class="hero-datos" aria-label="Contenido del curso">
          <div><strong>${DATA.unidades.length}</strong><span>unidades</span></div>
          <div><strong>${g.total}</strong><span>ejercicios</span></div>
          <div><strong>${DATA.examenes.length}</strong><span>exámenes</span></div>
        </div>
      </section>
      <div class="progreso-global">
        <div class="seccion-cabecera"><h2>Tu progreso</h2><span>${pct}%</span></div>
        ${barra(pct)}
        <div class="progreso-texto">${g.hechos} de ${g.total} ejercicios marcados como completados</div>
      </div>
      <section class="guia-estudio">
        <div><span class="paso">01</span><h3>Entiende la idea</h3><p>Lee la explicación y sigue los ejemplos línea por línea.</p></div>
        <div><span class="paso">02</span><h3>Practica en Eclipse</h3><p>Crea una clase por ejercicio y ejecútala con tus propios casos de prueba.</p></div>
        <div><span class="paso">03</span><h3>Comprueba lo aprendido</h3><p>Haz la autoevaluación sin apuntes y revisa el porqué de cada respuesta.</p></div>
      </section>
      <div class="seccion-cabecera unidades-cabecera"><div><p class="etiqueta">El recorrido</p><h2>Unidades del curso</h2></div><a href="#/examenes">Ver exámenes →</a></div>
      <div class="tarjetas">${tarjetas}</div>`;
  }

  // Autoevaluación: cada pregunta se responde una vez y muestra la corrección al momento.
  function renderQuiz(uid, preguntas) {
    const respuestas = respuestasQuiz(uid);
    const respondidas = respuestas.filter(r => Number.isInteger(r)).length;
    const aciertos = respuestas.reduce((total, r, i) => total + (r === preguntas[i]?.correcta ? 1 : 0), 0);
    const items = preguntas.map((q, i) => {
      const respuesta = respuestas[i];
      const resuelta = Number.isInteger(respuesta);
      const correcta = resuelta && respuesta === q.correcta;
      return `
      <li class="pregunta" data-correcta="${q.correcta}" data-indice="${i}" data-resuelta="${resuelta}" data-resultado="${correcta ? "correcta" : "incorrecta"}">
        <div class="enunciado-q">${i + 1}. ${esc(q.pregunta)}</div>
        <div class="opciones">${q.opciones.map((o, j) =>
          `<button type="button" class="quiz-op ${resuelta && j === q.correcta ? "ok" : ""} ${resuelta && j === respuesta && !correcta ? "mal" : ""}" data-o="${j}" ${resuelta ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
        <div class="retro" role="status" aria-live="polite" ${resuelta ? "" : "hidden"}><strong>${resuelta ? (correcta ? "Correcto. " : "Incorrecto. ") : ""}</strong>${esc(q.explicacion)}</div>
      </li>`;
    }).join("");
    return `
      <section class="bloque-quiz">
      <div class="seccion-cabecera"><h2>Autoevaluación</h2><span>${respondidas}/${preguntas.length} respondidas</span></div>
      <p class="subtitulo">Elige una respuesta en cada pregunta. La corrección aparece al momento.</p>
      <ol class="quiz" data-quiz="${esc(uid)}">${items}</ol>
      <div class="resultado-quiz"><p class="progreso-texto" data-marcador aria-live="polite">Respondidas: ${respondidas} de ${preguntas.length} · Aciertos: ${aciertos}</p>
      <button type="button" class="boton quiz-reset" data-quiz-reset="${esc(uid)}">Repetir autoevaluación</button></div>
      </section>`;
  }

  function vistaUnidad(id) {
    const idx = DATA.unidades.findIndex(u => u.id === id);
    if (idx < 0) return vistaInicio();
    const u = DATA.unidades[idx];
    const ant = DATA.unidades[idx - 1];
    const sig = DATA.unidades[idx + 1];
    const extraUd = EXTRA[u.id] || {};
    const extra = extraUd.ejercicios || [];
    const expl = (extraUd.explicacion || []).map(s => `
      <section class="apartado">
        <h3>${esc(s.titulo)}</h3>
        ${s.parrafos.map(p => `<p>${esc(p)}</p>`).join("")}
        ${s.codigo ? `<pre><code>${esc(s.codigo)}</code></pre>` : ""}
      </section>`).join("");
    const explicacion = expl ? `<h2>Explicación en profundidad</h2>${expl}` : "";
    const quiz = (extraUd.quiz || []).length ? renderQuiz(u.id, extraUd.quiz) : "";
    const teoria = `<ul class="teoria">${u.teoria.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
    const codigo = (u.codigo || []).map(c => `<pre><code>${esc(c)}</code></pre>`).join("");
    const ejercicios = (u.ejercicios || []).length
      ? `<h2>Ejercicios</h2>
         <ol class="ejercicios">${u.ejercicios.map((e, i) =>
           bloqueEjercicio(
             `ej-${u.id}`,
             i,
             e.titulo,
             e.texto,
             ejUd(u) + i,
             extra[i],
             (EXPL[u.id] || [])[i]
           )
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
      <aside class="nota-practica"><strong>Cómo trabajar esta unidad</strong><span>Prueba los ejemplos en Eclipse, resuelve los ejercicios en clases pequeñas y anota qué caso límite te hizo cambiar la solución. Las soluciones son una referencia para revisar tu razonamiento, no el primer paso.</span></aside>
      ${explicacion}
      <h2>Resumen de teoría</h2>
      ${teoria}
      ${codigo}
      ${ejercicios}
      ${quiz}
      ${pie}`;
  }

  function vistaExamenes(id) {
    if (id) {
      const ex = DATA.examenes.find(e => e.id === id);
      if (!ex) return vistaExamenes();
      const solEx = (EXTRA[ex.id] || {}).ejercicios || [];
      const lista = ex.ejercicios.map((e, i) =>
        bloqueEjercicio(`ex-${ex.id}`, i, e.titulo, e.texto, ejEx(ex) + i, solEx[i] || null, (EXPL[ex.id] || [])[i])
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

  app.addEventListener("click", e => {
    const reset = e.target.closest(".quiz-reset");
    if (reset) {
      const uid = reset.dataset.quizReset;
      const p = leer();
      delete p["quiz:" + uid];
      guardar(p);
      reset.closest(".bloque-quiz").outerHTML = renderQuiz(uid, (EXTRA[uid] || {}).quiz || []);
      return;
    }

    const btn = e.target.closest(".quiz-op");
    if (!btn) return;
    const li = btn.closest(".pregunta");
    if (li.dataset.resuelta === "true") return;
    const correcta = Number(li.dataset.correcta);
    const respuesta = Number(btn.dataset.o);
    const ok = respuesta === correcta;
    li.dataset.resuelta = "true";
    li.dataset.resultado = ok ? "correcta" : "incorrecta";
    const quiz = li.closest(".quiz");
    const respuestas = respuestasQuiz(quiz.dataset.quiz);
    respuestas[Number(li.dataset.indice)] = respuesta;
    guardarRespuestasQuiz(quiz.dataset.quiz, respuestas);
    const botones = li.querySelectorAll(".quiz-op");
    botones.forEach((b, j) => {
      b.disabled = true;
      if (j === correcta) b.classList.add("ok");
      else if (b === btn) b.classList.add("mal");
    });
    const retro = li.querySelector(".retro");
    retro.hidden = false;
    retro.querySelector("strong").textContent = ok ? "Correcto. " : "Incorrecto. ";
    // Actualiza el marcador de la autoevaluación sin volver a pintar la página
    const todas = quiz.querySelectorAll(".pregunta");
    const resueltas = quiz.querySelectorAll('.pregunta[data-resuelta="true"]');
    const acertadas = quiz.querySelectorAll('.pregunta[data-resultado="correcta"]');
    const bloqueQuiz = quiz.closest(".bloque-quiz");
    const marcador = bloqueQuiz.querySelector("[data-marcador]");
    if (marcador) {
      marcador.textContent = `Respondidas: ${resueltas.length} de ${todas.length} · Aciertos: ${acertadas.length}`;
    }
    const resumen = bloqueQuiz.querySelector(".seccion-cabecera span");
    if (resumen) resumen.textContent = `${resueltas.length}/${todas.length} respondidas`;
  });

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
