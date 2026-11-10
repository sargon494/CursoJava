window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-ordinaria-2025-05-19"] = [
  {
    pista: "Empieza por la jerarquía de sensores: una clase base abstracta con el comportamiento común y tres subclases que elijan la estructura de datos según el orden que pide el enunciado.",
    razonamiento: [
      "Sensor es abstracta y guarda id, coordenadas, batería y el indicador de daño. registrarLectura es común a todos: comprueba si el sensor está dañado o sin batería y lanza ReadNotPossibleException; si no, llama a almacenar, que cada subclase implementa. La regla se escribe una sola vez y la forma de guardar queda en las subclases.",
      "SensorCalidadAire usa un ArrayDeque como cola FIFO: offer añade al final y poll saca el primero, así que sale antes el dato más antiguo. SensorTemperaturaExtrema usa un ArrayDeque como pila LIFO con push y poll, así que sale primero el más reciente. Es la misma clase de Java con dos usos opuestos, y la diferencia está en el método que se llama.",
      "SensorActividadSismica usa un LinkedHashSet: no admite repetidos y conserva el orden de detección. siguienteDato toma el iterador, obtiene el primer elemento y lo elimina con it.remove(), de modo que leer el dato lo consume. siguienteDato devuelve Optional<Double> porque la estructura puede estar vacía.",
      "En Sensor, compareTo ordena por batería de mayor a menor con Double.compare(otro.bateria, this.bateria); el orden de los argumentos invierte el sentido. En empate, compara el número de lecturas, también de mayor a menor. getSensoresOrdenados usa sorted() sobre el stream, que depende de ese compareTo.",
      "CentralDeMonitoreo guarda los sensores en un LinkedHashMap por id: put sustituye un sensor con el mismo id, y eliminarSensor lanza SensorNotFoundException cuando remove devuelve null. La carga del CSV usa un switch sobre el enum TipoSensor; valueOf lanza IllegalArgumentException con un tipo desconocido, y el catch convierte esa línea en omitida.",
      "repararSensoresDanados es static porque no usa el estado de la central: recibe una lista y cambia cada sensor dañado. Como los objetos se pasan por referencia, el cambio se ve fuera del método. agruparSensoresPorDanio usa Collectors.partitioningBy, que siempre devuelve claves true y false, aunque una de las listas esté vacía.",
      "El examen evalúa la jerarquía, el polimorfismo, la elección de colecciones según el criterio de orden, Comparable y las excepciones propias. Un fallo frecuente es poner la lógica de todos los sensores en un solo método con ifs por tipo, que anula el beneficio de la herencia."
    ]
  }
];
