window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["funcional"] = [
  {
    pista: "Piensa en agrupar las flores por especie y contar cuántas hay en cada grupo. Después, compara esos recuentos entre sí.",
    razonamiento: [
      "La idea central es que groupingBy con counting() convierte la lista de flores en un mapa de especie a número de muestras. Cada clave es una especie y cada valor es el número de elementos de su grupo. Con ese mapa ya tienes los datos para responder a las tres preguntas.",
      "Para la especie con más muestras, la solución recorre las entradas con max(Map.Entry.comparingByValue()). La comparación se hace sobre el valor del Entry y no sobre la clave, y orElseThrow() devuelve la entrada ganadora o falla si el mapa estuviera vacío.",
      "Para saber si todas las especies tienen igual cantidad, se extraen los valores, se quitan los repetidos con distinct() y se cuenta lo que queda. Si queda un único valor, todos los grupos tienen el mismo tamaño. Ten en cuenta que counting() devuelve un Long, por eso el mapa es Map<String, Long>."
    ]
  },
  {
    pista: "Para las medias, convierte el stream de objetos en un stream de números con mapToDouble. Para el máximo y el mínimo, usa un comparador que lea el campo adecuado.",
    razonamiento: [
      "mapToDouble pasa de Stream<Flor> a DoubleStream, que ya tiene average(), max() y min(). Así no hay que sumar a mano ni dividir entre el número de elementos. average() devuelve un OptionalDouble, y orElse(0) da un valor de respaldo si la lista estuviera vacía.",
      "Para la flor con el pétalo más largo se usa max con un comparador que compara petalo con Double.compare. Es preferible a restar dos double, porque Double.compare devuelve un entero coherente incluso en casos especiales. max devuelve un Optional, por eso la solución imprime con ifPresent solo si hay resultado.",
      "El sépalo más estrecho usa el mismo patrón, pero con min en lugar de max. Cambiar el método de búsqueda es lo que cambia el sentido del resultado, no el comparador."
    ]
  },
  {
    pista: "Agrupa con groupingBy usando la especie como clave. Dentro de cada grupo necesitas una media y un máximo, que son colectores distintos.",
    razonamiento: [
      "groupingBy con averagingDouble produce un Map<String, Double> con la media del pétalo de cada especie. averagingDouble es un colector: recibe los elementos de cada grupo y calcula la media sin que tengas que crear listas intermedias.",
      "Para la flor de pétalo más grande de cada grupo, maxBy devuelve un Optional. collectingAndThen aplica después la función o -> o.get() para extraer la flor. El get es seguro aquí porque un grupo nunca está vacío, pero no lo copies sin pensar en otros contextos.",
      "El último apartado, el pétalo más ancho de toda la colección, es un máximo sobre el stream completo. mapToDouble(...).max() devuelve un OptionalDouble, y orElseThrow() lo convierte en un double. Un error habitual es confundir este max con el que compara objetos."
    ]
  },
  {
    pista: "Cada condición es un filter sobre la lista. Fíjate en qué campos compara cada predicado y en el sentido de la comparación.",
    razonamiento: [
      "Cada apartado es un filter con su propio predicado. El predicado recibe una flor y devuelve true si la cumple, y collect(Collectors.toList()) reúne las que pasan. Como cada consulta es independiente, se pueden escribir como tres streams separados.",
      "Las comparaciones son entre campos de la misma flor: sepaloAncho > sepaloLargo para el primer caso, petaloLargo > sepaloLargo para el segundo y petaloLargo > 5 para el tercero. Conviene leer el enunciado con cuidado, porque «más anchos que largos» invierte el orden de los campos.",
      "Si el criterio cambiara, por ejemplo a «5 cm o más», solo se modificaría el operador del predicado y no la estructura del stream. La clase Flor sobrescribe toString para que la lista impresa muestre la especie y el pétalo."
    ]
  },
  {
    pista: "XChart no viene con Java. Antes de escribir el código, asegúrate de que la dependencia está en el proyecto, y separa los datos de la presentación.",
    razonamiento: [
      "El código crea dos gráficos: un CategoryChart de barras con el número de muestras por especie y un XYChart de dispersión con los largos de sépalo y pétalo. Cada uno se construye con su builder, se configura con tamaño, título y ejes, y después se rellena con addSeries.",
      "En la dispersión, las dos listas son paralelas: el elemento i de cada una corresponde a la misma flor. Si tuvieran longitudes distintas, la serie no sería válida. SwingWrapper abre cada gráfico en una ventana.",
      "Los valores de las barras (2, 1 y 1) están fijados en el ejemplo porque corresponden a los cuatro datos de muestra. Con datos reales habría que calcularlos con el mismo groupingBy del primer apartado. Si Eclipse marca error en los imports, falta añadir org.knowm.xchart:xchart al Build Path."
    ]
  },
  {
    pista: "Usa Files.lines y encadena operaciones de stream: saltar la cabecera, separar campos, filtrar por edad y transformar el nombre. No hace falta guardar todas las líneas en una lista.",
    razonamiento: [
      "Files.lines devuelve un Stream<String> que lee el fichero línea a línea, sin cargarlo entero en memoria. Por eso el stream se abre dentro de try-with-resources: al salir del bloque se cierra, aunque haya una excepción.",
      "skip(1) descarta la cabecera. split(\",\", -1) conserva los campos vacíos del final de la línea; sin el -1, una línea como «Ana,» perdería su último campo. El filtro c.length >= 2 descarta las líneas que no tienen nombre y edad antes de intentar convertir la edad.",
      "El orden de las operaciones importa: primero se parsea, luego se filtra por edad y solo al final se pasa a mayúsculas. Si la edad no es un número, Integer.parseInt lanza NumberFormatException y el programa se detiene. La solución toma la ruta de args y usa personas.csv como valor por defecto."
    ]
  }
];
