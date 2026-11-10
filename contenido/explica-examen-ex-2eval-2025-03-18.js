window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-2eval-2025-03-18"] = [
  {
    pista: "Los tres métodos recorren o modifican la cadena de nodos desde head. Antes de escribir, piensa qué debe pasar con head cuando la lista está vacía.",
    razonamiento: [
      "contarElementos usa un puntero actual que empieza en head y avanza con getNext hasta null. Cada dato se compara con Objects.equals y no con ==, porque == compara referencias y dos String iguales podrían ser objetos distintos. Objects.equals además admite null sin lanzar NullPointerException.",
      "clear basta con poner head a null y size a 0. Los nodos anteriores quedan sin referencias y el recolector de basura los libera, así que no hace falta recorrerlos uno a uno. Es un error habitual intentar borrar nodo a nodo cuando soltar la cabeza es suficiente.",
      "obtenerUltimo comprueba primero si la lista está vacía y lanza NoSuchElementException. El bucle mira while (actual.getNext() != null): cuando termina, actual es el último nodo. Si el bucle comprobara actual en lugar de su siguiente, terminaría en null y no devolvería nada útil.",
      "La solución añade accesores a Nodo porque la lista los usa, y el enunciado solo daba los campos. La interfaz List de este ejercicio es mínima y se completa con los métodos pedidos."
    ]
  },
  {
    pista: "Hay tres piezas: la jerarquía de platos con su precio, la carta que no admite nombres repetidos y la cola de cocina que ordena por dos criterios. Resuelve cada una por separado.",
    razonamiento: [
      "Plato es abstracta y reúne los datos comunes: nombre, descripción, precio base, kcal, alérgenos y si se sirve caliente. calcularPrecio es abstracto porque cada tipo lo calcula de forma distinta. Los alérgenos se copian a un EnumSet en el constructor, lo que evita repetidos y mantiene el orden del enum. getAlergenos devuelve una vista no modificable.",
      "Las reglas de negocio viven en sus clases y no en GestionRestaurante. PlatoPrincipal comprueba en el constructor que un vegano no tenga huevo ni pescado y lanza IncompatibleDietaryException. La comprobación va después de super(), porque los alérgenos ya están copiados en la clase base. Como es una excepción comprobada, el constructor la declara en throws.",
      "Entrante fuerza paraCompartir a true cuando hay más de 4 comensales, en el constructor. Su calcularPrecio multiplica el precio base por los comensales y resta 0,50 si el plato es para compartir y hay más de 2 personas. Repetir estas reglas en GestionRestaurante sería el error más frecuente.",
      "Plato.compareTo ordena primero por kcal de menor a mayor. Para el empate compara otro.calcularPrecio() con this.calcularPrecio(), y ese orden invertido da el precio de mayor a menor. El sentido de la ordenación depende solo del orden de los argumentos.",
      "La carta es un HashMap por nombre: containsKey detecta duplicados en tiempo constante, y es la colección que el enunciado pide. La cola de cocina es una PriorityQueue de PedidoCocina. Su compareTo pone primero los calientes y, en empate, usa el número de orden que da el contador pedidosRecibidos++. Sin ese contador, una PriorityQueue no garantiza el orden de llegada entre platos iguales.",
      "obtenerEstadisticasCarta devuelve un double[4] con precio medio, número de principales (contado con instanceof), media de kcal y total. Si la carta está vacía, devuelve ceros. obtenerMapaAlergenos parte de un EnumMap con todos los alérgenos a 0, así aparecen también los que ningún plato contiene, y merge suma 1 por cada plato que lo contiene."
    ]
  }
];
