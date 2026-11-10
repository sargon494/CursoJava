window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-1eval-2025-12-01"] = [
  {
    pista: "Recorre las cifras una a una con el resto entre 10 y la división entera. Lleva a la vez dos datos: si todas son impares y la suma acumulada.",
    razonamiento: [
      "numero % 10 da la última cifra y numero / 10 elimina esa cifra. Repitiendo el proceso se recorren todas las cifras sin convertir el número en texto. La condición resto > 0 termina el bucle, y el do-while garantiza que se procese al menos una cifra, así que el 0 también se trata bien.",
      "Cada cifra par pone la bandera todasImpares a false, y la suma se acumula en suma. El return combina las dos condiciones: todasImpares && suma % 2 == 0. Un error habitual es devolver true si solo algunas cifras son impares.",
      "Math.abs((long) numero) evita un fallo con Integer.MIN_VALUE, cuyo valor absoluto no cabe en un int. El enunciado no pide tratar los negativos de forma explícita, pero el código no devuelve un resultado incorrecto con ese valor."
    ]
  },
  {
    pista: "Recorre el String carácter a carácter con charAt y cuenta las coincidencias. Antes de recorrer, comprueba si el texto es nulo o vacío.",
    razonamiento: [
      "El orden de las comprobaciones importa: texto == null se evalúa antes de isEmpty(). Si el texto fuera null, llamar a isEmpty() lanzaría NullPointerException. Con esa comprobación, null y la cadena vacía devuelven 0 sin llegar al bucle.",
      "El for recorre los índices de 0 a length() - 1 y compara cada charAt con el char recibido usando ==. Para char, == compara valores, así que es correcto. Cada coincidencia suma uno.",
      "La distinción de mayúsculas es importante: 'a' y 'A' son caracteres distintos, así que la comparación las diferencia. Se podría usar un for-each sobre toCharArray(), pero el for con índice muestra con claridad cómo funciona charAt."
    ]
  },
  {
    pista: "Divide el programa en partes: leer los precios en un array, mostrar el menú dentro de un do-while y dos métodos que trabajan sobre el array.",
    razonamiento: [
      "El número de productos se lee con nextInt y se valida con un while: mientras sea menor que 1 se vuelve a pedir. Con ese valor se crea el array con new double[numProductos], cuyo tamaño ya es conocido. Los precios se leen con nextDouble en un for y cada uno se guarda en su posición.",
      "El menú es un do-while que muestra las opciones, lee la elección y ejecuta un switch con flechas. El bucle sigue mientras la opción sea distinta de 3, así que el menú se muestra al menos una vez. El default avisa de una opción incorrecta sin terminar el programa. Un fallo frecuente es olvidar el default, porque entonces una opción como 7 no produce ningún aviso.",
      "mostrarFactura recorre el array con printf y acumula el total en una variable. mostrarProductoMasCaro guarda el índice del máximo, empieza en 0 y compara desde la posición 1. Devolver el índice en lugar del valor permite imprimir también el número del producto.",
      "Scanner.useLocale(Locale.US) hace que el separador decimal sea el punto. Sin esa configuración, en un equipo con idioma español, leer 5.50 con nextDouble lanza InputMismatchException. El examen evalúa la separación en métodos, el uso de arrays y los bucles con control de menú."
    ]
  }
];
