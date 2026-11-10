window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["arrays2d"] = [
  {
    pista: "Cada fila de una matriz es un array en sí misma. Piensa qué bucle recorre las filas y qué método de Arrays puede imprimir una fila completa.",
    razonamiento: [
      "Un int[][] es un array cuyos elementos son arrays int[]. Un for-each externo toma cada fila como int[], y Arrays.toString la convierte en texto con formato [1, 2, 3]. Por eso no hace falta un bucle interior.",
      "Imprimir cada fila con println deja una fila por línea, que es lo que pide el enunciado. Si se quisiera todo en una línea, bastaría cambiar println por print.",
      "La misma función sirve para matrices irregulares, porque cada fila imprime su propia longitud."
    ]
  },
  {
    pista: "Antes de comparar, piensa qué valor inicial usar. Ten en cuenta que puede haber filas vacías y que una matriz sin elementos no tiene máximo.",
    razonamiento: [
      "Empezar en Integer.MIN_VALUE hace que el primer valor real siempre sea mayor. La variable encontrado cumple otra función: distingue una matriz sin valores (todas las filas vacías) de una con valores, y solo en el primer caso lanza la excepción.",
      "No se puede empezar en matriz[0][0], porque la primera fila puede estar vacía y provocaría ArrayIndexOutOfBoundsException. El for-each evita el problema, porque una fila vacía simplemente no aporta valores.",
      "Con {{-4, -2}, {}, {-9}} el resultado es -2. Los negativos no son un problema porque el valor inicial es el mínimo posible."
    ]
  },
  {
    pista: "Recorre todas las filas y, dentro de cada una, todos los valores. Piensa en qué tipo conviene para el acumulador.",
    razonamiento: [
      "Dos for-each anidados recorren cada valor una sola vez. El primero toma cada fila y el segundo cada valor de esa fila. Para una suma total, el orden de recorrido no importa.",
      "El acumulador es long porque la suma de muchos int puede superar el rango de int. Sumar en long evita el desbordamiento sin cambiar el resultado para valores normales.",
      "Con {{1, 2}, {3, 4}} el resultado es 10. Una matriz vacía devuelve 0, porque el bucle no suma nada."
    ]
  },
  {
    pista: "El resultado tiene una posición por fila. Piensa cómo usar el índice de fila para guardar cada suma en el lugar correcto.",
    razonamiento: [
      "Se crea un long[] con tantas posiciones como filas (matriz.length). El bucle externo usa el índice i para elegir la fila y guardar su total en sumas[i].",
      "Cada fila se recorre con su propia longitud (matriz[i]), así que una fila más corta no provoca error. Usar la longitud de la primera fila sería un error habitual con matrices irregulares.",
      "Con {{1, 2}, {}, {3}} el resultado es [3, 0, 3]. Una fila vacía produce 0 y su posición sigue existiendo en el resultado."
    ]
  },
  {
    pista: "Cada media es la suma de una fila dividida entre su número de columnas. Piensa qué hay que comprobar antes de dividir.",
    razonamiento: [
      "La división se hace con double (suma / (double) columnas) para conservar los decimales. La suma se acumula en long, igual que en los ejercicios anteriores.",
      "La solución toma las columnas de la primera fila y comprueba que todas las demás tengan ese mismo tamaño; si no, lanza IllegalArgumentException. Una fila de distinta longitud se dividiría entre otro número y la media no sería comparable.",
      "El enunciado habla de matriz cuadrada, pero la solución solo exige que sea regular. Para exigir cuadrada bastaría comprobar también que las columnas coincidan con matriz.length. Una matriz sin filas devuelve un array vacío."
    ]
  },
  {
    pista: "Piensa en un contador que sube cada vez que aparece un cero, y en cómo recorrer filas de distinto tamaño.",
    razonamiento: [
      "Es el mismo recorrido doble que en la suma: cada fila se recorre con for-each y cada valor se compara con cero. El contador sube solo cuando hay coincidencia.",
      "Como se usa for-each sobre cada fila, las filas vacías o de distinto tamaño no requieren cuidado especial. Una fila vacía no añade nada.",
      "Con {{0, 2}, {}, {0, 0}} el resultado es 3. El cero es un valor real de la matriz, no una señal de vacío."
    ]
  },
  {
    pista: "Es casi igual que el ejercicio anterior; cambia la comparación. Piensa qué valor debe recibir el método para servir con cualquier número.",
    razonamiento: [
      "El método recibe el valor buscado como parámetro, así que sirve para cualquier número y no solo para el cero. Los dos bucles recorren todas las filas, también las irregulares.",
      "Hay que contar en todas las filas, no solo en la primera: cada aparición suma una vez, esté en la fila que esté.",
      "Con {{2, 3}, {2}, {}, {2, 4}} y el número 2 el resultado es 3. La fila vacía no provoca error, porque el for-each no da vueltas."
    ]
  },
  {
    pista: "La identidad tiene unos en la diagonal y ceros en el resto. Piensa qué condición debe cumplirse antes de mirar las posiciones.",
    razonamiento: [
      "Una matriz identidad debe ser cuadrada. Por eso primero se comprueba que todas las filas tengan longitud matriz.length; si no, no tiene sentido hablar de diagonal y el método devuelve false.",
      "Después se comparan todas las posiciones con una sola regla: matriz[i][j] debe valer 1 si i == j y 0 en otro caso. El operador ternario (i == j ? 1 : 0) expresa esa regla en una línea.",
      "Una matriz sin filas cumple todas las condiciones sin fallar, así que la solución la considera identidad. Puede parecer raro, por eso conviene decidirlo explícitamente en el contrato del método."
    ]
  },
  {
    pista: "En Java los arrays numéricos empiezan con ceros. Piensa qué posiciones necesitas poner a uno.",
    razonamiento: [
      "new int[n][n] crea una matriz cuadrada con todos sus valores a cero, así que solo hay que escribir unos en la diagonal. El bucle asigna resultado[i][i] = 1 para cada índice i.",
      "Un tamaño negativo no tiene sentido y el método lanza IllegalArgumentException antes de crear nada. Con n = 0 se devuelve una matriz sin filas, que es válida.",
      "La identidad es el elemento neutro de la multiplicación de matrices cuadradas de su mismo tamaño: multiplicarla por otra matriz la deja igual. Esto enlaza con el ejercicio de multiplicar."
    ]
  },
  {
    pista: "En una matriz cuadrada, la diagonal principal tiene fila y columna iguales. Piensa qué índice cambia en la otra diagonal al avanzar.",
    razonamiento: [
      "La diagonal principal usa matriz[i][i], y la secundaria matriz[i][n - 1 - i]: al subir de fila, la columna baja desde el final. Un solo bucle de 0 a n - 1 recorre ambas diagonales a la vez.",
      "La solución comprueba antes que la matriz es cuadrada, porque la fórmula n - 1 - i solo tiene sentido si cada fila tiene n columnas. Sin esa comprobación, una fila corta provocaría ArrayIndexOutOfBoundsException.",
      "En una dimensión impar el elemento central pertenece a las dos diagonales y aparece en las dos sumas. Si el enunciado pidiera la suma de la unión de las diagonales, habría que restarlo una vez."
    ]
  },
  {
    pista: "Imagina que cada fila se convierte en columna. Piensa qué dimensiones tendrá el resultado y qué índices se intercambian.",
    razonamiento: [
      "La posición [i][j] de la matriz original pasa a [j][i] de la transpuesta. Por eso el resultado tiene tantas filas como columnas tenía el original: resultado = new int[columnas][matriz.length].",
      "El método comprueba que todas las filas tengan el mismo tamaño, porque en una matriz irregular no hay un número de columnas único. Una matriz vacía devuelve una matriz 0 x 0.",
      "Con {{1, 2, 3}, {4, 5, 6}} el valor 6 pasa de la posición [1][2] a la [2][1]. Comprobar un valor concreto así es una buena forma de verificar el intercambio de índices."
    ]
  },
  {
    pista: "Una matriz simétrica es igual a su transpuesta. Piensa qué pares de posiciones deben coincidir y si hace falta comparar cada par dos veces.",
    razonamiento: [
      "La condición matriz[i][j] == matriz[j][i] relaciona cada posición con su reflejo respecto a la diagonal. El bucle interior empieza en j = i + 1, así cada par se compara una sola vez.",
      "La diagonal no se compara, porque cada elemento diagonal es su propio reflejo y siempre coincide consigo mismo.",
      "Antes se comprueba que la matriz sea cuadrada. Una matriz rectangular no puede ser igual a su transpuesta, porque sus dimensiones no coinciden."
    ]
  },
  {
    pista: "Haz el cálculo en dos pasos: primero un resultado por fila y después uno global. Piensa qué operador resume una fila de booleanos cuando basta con que haya un true.",
    razonamiento: [
      "Para cada fila, orFila empieza en false y se combina con |= con cada valor: la fila es true si contiene al menos un true. Después andFilas se combina con &= y solo es true si todas las filas lo son.",
      "andFilas empieza en true porque es el neutro del AND: no altera el resultado. La solución devuelve false para una matriz sin filas; esa decisión debe quedar explícita, porque el resultado depende de la convención elegida.",
      "Con {{false, true}, {true, true}} cada fila tiene un true, así que el resultado es true."
    ]
  },
  {
    pista: "Piensa en la fórmula para un rango que empieza en 1 y termina en 100, como en el ejercicio del array aleatorio. Recuerda que n determina las dos dimensiones.",
    razonamiento: [
      "random.nextInt(100) produce valores de 0 a 99; sumar 1 da el rango de 1 a 100, ambos incluidos. Es el mismo patrón que en los arrays de una dimensión.",
      "El Random se recibe como parámetro, lo que permite pasar un generador con semilla fija para reproducir los mismos resultados en pruebas.",
      "Un n negativo lanza IllegalArgumentException, y n = 0 da una matriz vacía. Como la matriz es n por n, las dos dimensiones usan el mismo valor."
    ]
  },
  {
    pista: "Primero lee el tamaño y después los valores en el mismo orden en que los vas a guardar. Piensa qué separa los números en la entrada.",
    razonamiento: [
      "Se lee n y se crea una matriz de n por n. Los dos bucles anidados leen en orden de filas: el primer número va a [0][0], el siguiente a [0][1], y así sucesivamente.",
      "Scanner.nextInt salta espacios y saltos de línea, así que da igual si los números van en una línea o en varias. Lo que sí importa es introducir exactamente n por n valores.",
      "Para mostrarla, el for-each anidado imprime cada valor seguido de un espacio y termina cada fila con println(). Un n negativo se rechaza antes de crear la matriz."
    ]
  },
  {
    pista: "Piensa en las posiciones como una lista de números del 0 al n*n - 1 y en cómo elegir m de ellas sin repetir. Una posición lineal se convierte en fila y columna con / y %.",
    razonamiento: [
      "Generar posiciones al azar y descartar las repetidas funciona, pero puede tardar mucho cuando casi todas están marcadas. La solución hace un barajado parcial: en cada vuelta i elige una posición entre i y el final y la intercambia con la posición i. Tras m vueltas, las m primeras posiciones son distintas.",
      "Cada número lineal p se convierte en fila p / n y columna p % n, porque la matriz n por n puede verse como una lista de n*n posiciones. El último bucle recorre solo las m primeras y marca esas casillas como true.",
      "Antes de empezar se comprueba 0 <= m <= n*n usando long, porque el producto puede desbordar un int para valores grandes. Con m = 0 o m = n*n el resultado es una matriz completamente false o completamente true."
    ]
  },
  {
    pista: "Para cada casilla del resultado, combina una fila de A con una columna de B. Antes de calcular nada, piensa qué dos números deben coincidir.",
    razonamiento: [
      "El resultado tiene tantas filas como A y tantas columnas como B. La posición [i][j] es la suma de a[i][k] * b[k][j] recorriendo k: el producto de la fila i de A por la columna j de B. Por eso hacen falta tres bucles anidados.",
      "La comprobación de dimensiones va antes del cálculo: columnasA debe ser igual a filasB. Si no coinciden, el producto no existe, y el método lanza IllegalArgumentException en lugar de acceder fuera de los límites.",
      "La solución valida también que ambas matrices sean rectangulares, porque para recorrer columnas hace falta un único número. Con {{1, 2}, {3, 4}} y {{5}, {6}} el resultado es [[17], [39]]."
    ]
  },
  {
    pista: "Piensa en qué posición de la matriz original termina en cada posición nueva al girarla. Ayuda hacer un dibujo con una matriz 2 x 2.",
    razonamiento: [
      "Al girar 90 grados en sentido horario, la primera columna de la original, leída de abajo hacia arriba, se convierte en la primera fila del resultado. Por eso el elemento [i][j] pasa a [j][n - 1 - i].",
      "Comprobar que la matriz es cuadrada es imprescindible: en una matriz rectangular las filas se convertirían en columnas de otro tamaño y el índice n - 1 - i no tendría sentido.",
      "El método devuelve una matriz nueva y deja la original intacta. Girarla en el mismo sitio exigiría hacerlo por capas, porque sobrescribir valores antes de leerlos los perdería."
    ]
  },
  {
    pista: "Hay dos partes: colocar los barcos al azar sin repetir casillas y después un bucle que lee disparos y lleva la cuenta. Piensa qué valor marca un barco y qué valor marca un disparo ya hecho.",
    razonamiento: [
      "El tablero usa enteros: 0 para agua sin disparar, 1 para barco y -1 para casilla ya disparada. La colocación genera coordenadas al azar hasta encontrar una casilla con 0, así que no hay barcos repetidos. Como hay n barcos en n * n casillas, la colocación siempre termina.",
      "El bucle de disparos termina cuando se hunden todos los barcos o se agotan los disparos. El límite es Math.max(1, n * n / 3): la división entera da floor(n*n/3), y el max con 1 garantiza al menos un disparo cuando n es pequeño, como n = 1. Esa protección no está en el enunciado y la solución la añade.",
      "Un disparo fuera del tablero o a una casilla ya disparada no cuenta: se avisa y se pide otra vez. Así los errores de entrada no gastan disparos."
    ]
  },
  {
    pista: "El resultado tiene tantas filas como la más larga de las dos matrices. Piensa qué hacer en una posición donde solo una de las dos matrices tiene valor.",
    razonamiento: [
      "Para cada fila i se toma la fila de a y la de b (o un array vacío si no existe), y el resultado tiene el tamaño de la más larga. La forma final es la unión de las formas, no la intersección.",
      "En cada columna j hay tres casos: si a no tiene esa columna se copia el valor de b; si b no la tiene se copia el de a; y si las dos la tienen se guarda el Math.max. Comprobar primero las longitudes evita leer posiciones que no existen.",
      "Con {{1, 8}, {4}} y {{3}, {9, 2}, {7}} el resultado es [[3, 8], [9, 2], [7]]. El 8 y el 2 solo existen en una de las dos matrices, así que se conservan tal cual."
    ]
  },
  {
    pista: "Antes de dibujar el marco, calcula el ancho más grande de todas las líneas. Piensa cómo hacer que cada línea ocupe ese ancho exacto.",
    razonamiento: [
      "El método calcula el ancho máximo entre el título y todas las líneas. Después construye el borde superior con el carácter ─ repetido ancho + 2 veces, dejando un espacio de margen a cada lado del texto.",
      "Para alinear el texto se usa printf con un ancho variable: %-ns rellena cada línea con espacios por la derecha hasta el ancho n. Los caracteres │ van fuera del campo, así el marco queda recto.",
      "Los caracteres de dibujo son Unicode, así que el archivo debe guardarse en UTF-8 y la consola debe mostrarlos bien. El ancho se calcula con length(), que cuenta caracteres de Java; con texto que ocupe dos columnas en pantalla, el marco se desalinearía."
    ]
  }
];
