window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-2eval-2025-03-10"] = [
  {
    pista: "Una pila sobre lista enlazada solo necesita la cabeza de la lista. Piensa qué nodo es la cima y en qué orden hay que tocar los enlaces al insertar y al quitar.",
    razonamiento: [
      "La cima de la pila es el primer nodo, guardado en el atributo cima. push crea un Nodo nuevo, lo enlaza con la cima anterior y solo después actualiza cima. Si se invirtiera el orden, el nodo nuevo apuntaría a sí mismo y se perdería el resto de la pila.",
      "pop y peek comprueban isEmpty antes de tocar nada y lanzan EmptyStackException, la misma excepción que usaría la clase Stack de java.util. pop guarda el dato antes de mover cima al siguiente nodo, y devuelve el dato guardado. Ambas operaciones son O(1), porque nunca recorren la lista.",
      "El examen evalúa la iterabilidad: Stack<T> pasa a extender Iterable<T>, y el iterador es una clase anónima con un puntero que empieza en cima. Recorre de la cima hacia la base, en el mismo orden en que saldrían los datos con pop. El iterador no quita elementos; si se llamara a remove, Java lanzaría UnsupportedOperationException por defecto."
    ]
  },
  {
    pista: "Empieza por una clase base común con lo que tienen todos los inmuebles, y deja que cada subclase calcule sus impuestos. Después, Inmobiliaria solo necesita un mapa y las comprobaciones pedidas.",
    razonamiento: [
      "Inmueble es abstracta porque no existe un inmueble genérico: solo hay viviendas, locales y solares. Guarda el número de catastro, la tasación y el estado, y declara calcularImpuestos como abstract. Cada subclase implementa su porcentaje, 1%, 1,5% y 2%.",
      "Con esa jerarquía, Inmobiliaria puede pedir los impuestos de cualquier inmueble sin conocer su tipo: es el polimorfismo, que evita los if por tipo. La comparación por tasación se implementa con Comparable<Inmueble>, y compareTo usa Double.compare, más seguro que restar dos double.",
      "En Inmobiliaria, un LinkedHashMap usa el número de catastro como clave. containsKey detecta duplicados y añadirInmueble lanza DuplicatePropertyException; añadirInmuebles usa putIfAbsent, que omite los repetidos sin error, tal como pide el enunciado. eliminarInmueble lanza PropertyNotFoundException cuando remove devuelve null. El valor medio devuelve 0 si el catálogo está vacío, para no dividir entre cero.",
      "El examen comprueba que sabes que las excepciones propias extienden Exception y son comprobadas, por eso aparecen en la cláusula throws. Lo que no se declara no se puede lanzar. obtenerNumeroViviendasDisponibles combina instanceof Vivienda con la comprobación del estado DISPONIBLE."
    ]
  }
];
