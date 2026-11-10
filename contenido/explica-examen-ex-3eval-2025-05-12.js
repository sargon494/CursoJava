window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-3eval-2025-05-12"] = [
  {
    pista: "Separa el catálogo en dos partes: un mapa por ISBN para el acceso rápido y una lista para el historial de préstamos. Cada apartado usa una de las dos o una tercera estructura según lo que pida.",
    razonamiento: [
      "El acceso por ISBN se resuelve con un HashMap<String, Book>. containsKey, get y remove son rápidos y no dependen del tamaño del catálogo. addBook, removeBook y los métodos de préstamo usan esa clave, en lugar de recorrer una lista entera para encontrar un libro.",
      "El historial de préstamos es un ArrayList<String> con los ISBN. Como cada préstamo se añade al final, la lista queda en orden cronológico, y lastLoanedBook lee su último elemento. Guardar ISBN y no objetos hace que el historial registre la secuencia de préstamos aunque el libro cambie de estado después.",
      "Las listas ordenadas y sin repetidos usan otras estructuras. getSortedByYear copia los valores a una lista y la ordena con Comparator.comparingInt(Book::getAnio).reversed(), de más reciente a más antiguo. getEditoriales usa un TreeSet, que elimina duplicados y ordena alfabéticamente en una sola operación.",
      "lendBook y devolverLibro usan el campo prestado del libro para impedir un doble préstamo o la devolución de un libro que no estaba prestado. Ambos lanzan BookNotAvaibleException, con el nombre tal como aparece en el enunciado. Cada método que puede fallar declara la excepción en throws, porque es comprobada.",
      "loadFromCSV lee el fichero con Files.readAllLines, omite las líneas vacías y, si una fila falla, la anota y sigue con la siguiente. Si el fichero no existe, no carga nada y la aplicación sigue funcionando, como pide el enunciado. searchAndSave pasa el texto y el título a minúsculas con Locale.ROOT y usa contains. El formato usa Locale.US para que el precio tenga punto decimal.",
      "El ejercicio evalúa si eliges la colección adecuada para cada requisito: Map para el acceso por clave, List para el orden, Set ordenado para la unicidad. Un fallo frecuente es usar una sola lista para todo y terminar recorriéndola en cada operación."
    ]
  }
];
