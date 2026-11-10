window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-3eval-2026-05-25"] = [
  {
    pista: "Lista los ficheros del directorio, descarta las subcarpetas y lee cada fichero con la primera línea como tarifa. Después convierte cada línea de paquete en un objeto Paquete.",
    razonamiento: [
      "listFiles(File::isFile) lista los elementos directos del directorio y filtra con un predicado que solo acepta ficheros. Así no entra en las subcarpetas, como pide el enunciado. Si listFiles devuelve null, el directorio no existe o no se puede leer, y el método informa y devuelve una lista vacía.",
      "Dentro de cada fichero, readLine lee la primera línea y la convierte con Double.parseDouble en la tarifa. El bucle lee el resto de líneas, las parte con split(\";\") y exige cuatro campos. El precio es el peso multiplicado por la tarifa, y se crea el Paquete con todos los datos.",
      "El examen evalúa la lectura de ficheros de texto y el tratamiento de errores. La solución descarta en silencio las líneas mal formadas, porque parsearLinea devuelve null. En cambio, un error en la tarifa descarta el fichero entero con un mensaje en System.err. Hay que tener claro que esa decisión elimina datos sin avisar por línea.",
      "Files.newBufferedReader va en try-with-resources, así que el lector se cierra aunque falle el parseo de un número. Es el mismo patrón de los ejercicios de ficheros de la unidad."
    ]
  },
  {
    pista: "Los datos del informe son estadísticas sobre la lista de paquetes. Un stream con mapToDouble resuelve la media y el máximo, y LocalDate con un patrón resuelve la fecha.",
    razonamiento: [
      "El total de paquetes es el tamaño de la lista. La media del precio y el peso máximo se calculan con mapToDouble sobre el stream. average() y max() devuelven un OptionalDouble, y orElse(0) da un valor si la lista está vacía.",
      "La fecha sale de LocalDate.now() formateada con el patrón dd/MM/yyyy. Las mayúsculas importan: MM es el mes y mm son los minutos. Un patrón mal escrito no da error, pero produce fechas incorrectas.",
      "El formato se construye con String.format y Locale.US para que el decimal sea un punto, como en el ejemplo. List.of reúne las líneas del informe y Files.write las escribe en UTF-8. El separador es una constante creada con \"=\".repeat(50)."
    ]
  },
  {
    pista: "Usa ObjectOutputStream, que escribe objetos completos uno detrás de otro. Antes de escribir, recorre la lista y decide qué paquetes entran.",
    razonamiento: [
      "ObjectOutputStream sobre un FileOutputStream escribe cada objeto con writeObject. Eso exige que Paquete implemente Serializable, y por eso la clase lo declara con serialVersionUID. Sin esa interfaz, writeObject lanza NotSerializableException.",
      "El filtro es un if dentro del bucle: solo se llama a writeObject si isUrgente() devuelve true. Es más directo que construir antes una lista filtrada, y el resultado en el fichero es el mismo.",
      "FileOutputStream sin el parámetro de añadir sobrescribe el fichero en cada llamada. Si el enunciado pidiera acumular, habría que usar new FileOutputStream(ruta, true), pero entonces cada llamada escribiría una cabecera nueva en el mismo fichero, y leerlo como un único flujo fallaría.",
      "El ejercicio evalúa que distingues la escritura de objetos con ObjectOutputStream de la escritura de bytes o de texto. Lo que se escribe en el fichero no es legible como texto."
    ]
  },
  {
    pista: "Lee con ObjectInputStream en un bucle hasta que se produzca la excepción de fin de fichero. Crea la lista dentro del método, no la recibas de fuera.",
    razonamiento: [
      "readObject devuelve un Object, por eso hay que hacer cast a Paquete. El bucle while (true) llama a readObject repetidamente y añade cada resultado a la lista. Cuando no quedan objetos, readObject lanza EOFException, que el catch recoge, y el método devuelve la lista.",
      "El bucle sin condición es una forma habitual de leer objetos cuando no se sabe cuántos hay. Solo se captura EOFException, así que un fichero corrupto o una clase que no coincide se propagan como error. Un fallo de diseño sería capturar Exception y dejarlo vacío, porque ocultaría esos errores.",
      "Cada llamada crea una lista nueva, así que los datos de una lectura anterior no se mezclan con los de la siguiente. Devolver una lista nueva es la forma de cumplir «sobrescribir» en este método: la lista que hubiera antes no se toca.",
      "La firma declara IOException y ClassNotFoundException porque readObject puede lanzar ambas. El examen evalúa que se conozca cómo termina la lectura de objetos y que el cast confía en que el fichero contiene Paquete."
    ]
  }
];
