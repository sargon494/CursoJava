window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["arrays1d"] = [
  {
    pista: "Un array necesita saber su tamaño desde que se crea. Piensa qué bucle puede rellenar cada posición leyendo del teclado.",
    razonamiento: [
      "El tamaño de un array se fija al crearlo con new, así que el método valida n antes de nada. Un tamaño negativo no tiene sentido y Java lanzaría una excepción al crear el array; la solución lo rechaza antes con un mensaje claro.",
      "El bucle recorre los índices de 0 a datos.length - 1 y asigna a cada posición el número leído. Usar datos.length en la condición hace que el bucle siga siendo correcto aunque cambie la forma de crear el array.",
      "Con n = 0 el método devuelve un array vacío, que es válido: el bucle no da ninguna vuelta. Conviene probarlo porque es un caso límite típico."
    ]
  },
  {
    pista: "Random.nextInt(k) devuelve valores desde 0 hasta k - 1. Piensa qué hay que cambiar para que el rango empiece en 1 y llegue a 1000.",
    razonamiento: [
      "Random.nextInt(1000) produce enteros entre 0 y 999, ambos incluidos. Sumar 1 desplaza el intervalo a 1-1000, que es lo que pide el enunciado. Este es el patrón para cualquier rango inclusivo: nextInt(maximo - minimo + 1) + minimo.",
      "El Random se crea una sola vez, antes del bucle. Crear uno por cada posición no aporta nada y, si se crean muchos en el mismo instante, pueden salir secuencias repetidas.",
      "Si n es negativo, el programa avisa antes de crear el array. Con n = 0 se imprime [] sin error."
    ]
  },
  {
    pista: "Antes de dividir, piensa qué pasa si el array no tiene elementos y en qué tipo conviene acumular la suma.",
    razonamiento: [
      "La media es la suma de los elementos dividida entre su cantidad. La división debe hacerse con double, porque dos enteros se dividen con división entera en Java y el resultado perdería los decimales.",
      "La suma se acumula en un long y no en un int, porque sumar muchos valores grandes puede salirse del rango de int antes de llegar a la división. La conversión (double) datos.length es la que fuerza la división decimal.",
      "Un array vacío no tiene media: dividir entre cero daría NaN. La solución lanza IllegalArgumentException, así quien llama sabe que la entrada no es válida en lugar de recibir un valor que parece real."
    ]
  },
  {
    pista: "Primero calcula la media y después recorre el array contando. Piensa si la comparación debe incluir el caso de igualdad.",
    razonamiento: [
      "El método recibe el límite ya calculado, así que contar y calcular la media son dos cosas separadas. Cada método es más sencillo de probar por separado.",
      "El operador >= cuenta también los valores iguales a la media, como pide el enunciado. Con solo > un valor igual a la media dejaría de contarse y el resultado cambiaría.",
      "Con {2, 4, 6, 8} la media es 5.0; los valores 6 y 8 cumplen la condición, y el resultado es 2. Comparar un int con un double funciona sin conversión explícita, porque el int se convierte a double automáticamente."
    ]
  },
  {
    pista: "Recorre el array desde el principio. Piensa qué debe devolver el método en cuanto encuentre el valor y qué debe devolver si termina sin encontrarlo.",
    razonamiento: [
      "Una búsqueda lineal compara cada posición con el objetivo en orden. La primera coincidencia es la primera aparición, así que el return dentro del bucle devuelve el índice sin seguir buscando.",
      "Si el bucle termina sin coincidencias, el método devuelve -1. Ese valor no es un índice válido, por eso se usa como señal de no encontrado; devolver 0 sería ambiguo porque 0 es una posición real.",
      "El array no está ordenado, así que no sirve la búsqueda binaria. La búsqueda lineal funciona con cualquier orden, a cambio de recorrer el array entero en el peor caso."
    ]
  },
  {
    pista: "Cada factorial se obtiene multiplicando el anterior por el siguiente número. Piensa qué tipo puede guardar valores tan grandes sin perder precisión.",
    razonamiento: [
      "El factorial de n es n × (n - 1) × ... × 1, así que se calcula de forma acumulada: cada resultado parte del anterior. El bucle guarda el valor actual en factorial y lo copia a la posición n - 1 del array.",
      "El enunciado admite long o BigInteger y la solución usa BigInteger[], que es exacto para cualquier tamaño. 20! cabe en un long (unos 2,4 × 10^18), pero 21! ya no cabe. BigInteger no admite el operador *, por eso se usa multiply.",
      "Un int se desborda ya en 13!, así que el array no puede ser de int. Arrays.toString imprime cada BigInteger porque la clase tiene su propio toString."
    ]
  },
  {
    pista: "Piensa en un bucle que compare cada elemento y en el momento en que ya sabes la respuesta.",
    razonamiento: [
      "Es la misma búsqueda que el ejercicio anterior, pero el método solo necesita un sí o un no. En cuanto un elemento coincide, return true termina el método; si el bucle acaba sin coincidencias, la respuesta es false.",
      "El for-each basta aquí, porque no hace falta el índice. Comparar con == es correcto porque tanto el elemento como objetivo son int primitivos.",
      "Un array vacío devuelve false sin entrar en el bucle, que es lo esperado: no hay nada que contenga el valor."
    ]
  },
  {
    pista: "Guarda los valores aceptados en otro array y, antes de añadir uno, comprueba si ya estaba. Lleva un contador de cuántas posiciones están ocupadas.",
    razonamiento: [
      "El array distintos tiene tamaño fijo 10, y usados indica cuántas posiciones contienen valores válidos. El while sigue hasta que usados llegue a 10, así que los repetidos se leen pero no se guardan.",
      "El método contiene recorre solo las posiciones de 0 a usados - 1. Recorrer todo el array sería un error, porque las posiciones libres todavía tienen el valor 0 por defecto y podrían confundirse con un número leído.",
      "El número de lecturas no es fijo, porque depende de los repetidos que escriba el usuario. El orden de salida es el de primera aparición, porque cada valor nuevo se añade al final."
    ]
  },
  {
    pista: "main recibe un array de String. Piensa cómo recorrerlo y en qué posición empieza.",
    razonamiento: [
      "Los argumentos de la línea de comandos llegan a main en args, de tipo String[]. args.length indica cuántos hay; si no se pasó ninguno, el bucle no hace nada.",
      "El índice i se usa para imprimir la posición y para leer args[i]. Empezar en 0 hace que el primer argumento tenga posición 0, como en cualquier array.",
      "Los argumentos siempre son texto. Si se quieren números hay que convertirlos, por ejemplo con Integer.parseInt, y eso puede lanzar NumberFormatException si el texto no es un número."
    ]
  },
  {
    pista: "Puedes construir un array nuevo y rellenarlo leyendo el original desde el final. Piensa qué índice corresponde a la primera posición del resultado.",
    razonamiento: [
      "La posición i del resultado toma el valor de la posición datos.length - 1 - i del original. Para i = 0 se toma el último elemento, y para el último índice se toma el primero.",
      "La solución crea un array nuevo, así el original no cambia; el main imprime ambos para comprobarlo. Si el enunciado permitiera modificar la entrada, bastaría con intercambiar izquierda y derecha hasta la mitad, pero esa versión cambia el array original.",
      "Con longitud 0 el bucle no hace nada y se devuelve un array vacío."
    ]
  },
  {
    pista: "Compara cada elemento con el anterior. Piensa qué condición indica que el orden está roto y qué pasa con arrays de uno o cero elementos.",
    razonamiento: [
      "Basta una pareja de vecinos mal ordenada para que el array no sea incremental. Por eso el método devuelve false en cuanto encuentra datos[i - 1] > datos[i], y true si el bucle termina sin fallos.",
      "El bucle empieza en i = 1 porque cada comparación necesita un elemento anterior. Empezar en 0 accedería a datos[-1] y lanzaría ArrayIndexOutOfBoundsException.",
      "Con > se permiten valores repetidos, porque 2 y 2 no rompen el orden: el enunciado habla de menor o igual. Un array vacío o de un solo elemento no entra en el bucle y devuelve true."
    ]
  },
  {
    pista: "Divide el recorrido en dos fases: primero comprobar que sube y después que baja. Piensa en los casos en que una de las dos fases no existe.",
    razonamiento: [
      "El método avanza mientras cada elemento sea mayor que el anterior, y después avanza mientras cada elemento sea menor que el anterior. Si las dos fases llegan hasta el último elemento, el array es una montaña.",
      "Hay dos casos que deben fallar. Si la subida no avanza (i sigue en 1), no hay subida; si la subida llega al final, no hay bajada. Por eso la solución comprueba i == 1 e i == datos.length antes de la segunda fase. Como exige al menos tres elementos, el máximo queda en el interior.",
      "Las comparaciones son estrictas (> y <), así que una meseta como 1, 4, 4, 3 no es una montaña. Si el enunciado admitiera iguales, habría que cambiar esas dos comparaciones."
    ]
  },
  {
    pista: "Un número binario se puede construir de izquierda a derecha. Piensa qué operación convierte el valor anterior en el siguiente antes de añadir el bit.",
    razonamiento: [
      "Multiplicar por 2 equivale a desplazar un número una posición a la izquierda en binario. El método parte de 0 y, para cada bit, hace valor = valor × 2 + bit. Con {1, 0, 1, 1} los valores intermedios son 1, 2, 5 y 11.",
      "Cada bit debe ser 0 o 1, y el método lanza IllegalArgumentException si aparece otro valor. Se usa long porque el número crece rápido, y Math.multiplyExact y Math.addExact lanzan ArithmeticException si el cálculo se sale del rango, en lugar de dar un resultado incorrecto sin avisar.",
      "Si el número necesita más bits de los que caben en un long, la excepción informa del problema. Para números tan grandes haría falta BigInteger."
    ]
  },
  {
    pista: "Calcula primero el tamaño total del resultado. Después piensa cómo copiar cada array en la posición que le corresponde.",
    razonamiento: [
      "El resultado tiene la longitud de a más la de b. La solución crea una copia de a con esa longitud usando Arrays.copyOf, que rellena el resto con ceros, y después copia b a partir de la posición a.length.",
      "System.arraycopy copia bloques enteros con esta forma: origen, posición de origen, destino, posición de destino y cantidad. Es fácil confundir el orden de los argumentos, así que conviene comprobarlo con un ejemplo pequeño.",
      "Concatenar no modifica a ni b, y ambos pueden tener longitud 0. Si b está vacío, la segunda copia no copia nada y el resultado es igual que a."
    ]
  },
  {
    pista: "Calcula cuántos elementos corresponden a cada mitad y en qué índice empieza la segunda mitad de b. Piensa qué pasa con las longitudes impares.",
    razonamiento: [
      "La primera mitad de a son sus primeros floor(n/2) elementos. La segunda mitad de b empieza en b.length / 2 (división entera). Con longitud impar, la segunda parte de b tiene un elemento más que la primera, porque el sobrante queda al final.",
      "El tamaño del resultado es la suma de las dos partes, y cada parte se copia con System.arraycopy desde la posición correcta de su origen. Así no hace falta un bucle para cada mitad.",
      "Con a = {1, 2, 3} y b = {4, 5, 6, 7}, la mitad de a es [1] y la de b es [6, 7], así que el resultado es [1, 6, 7]. Probar también con arrays de longitud 0 o 1 ayuda a comprobar los límites."
    ]
  },
  {
    pista: "El enunciado pide cambiar el mismo array. Piensa qué pasa si el resultado de multiplicar supera el rango de un int.",
    razonamiento: [
      "Como la modificación se hace sobre el propio array, el método no devuelve nada: quien llama ve el cambio porque comparte la referencia. Cada posición se reasigna con su propio cuadrado.",
      "Un int llega hasta 2.147.483.647, y el cuadrado de un valor grande puede superarlo. Math.multiplyExact lanza ArithmeticException en ese caso, mientras que la multiplicación normal daría un valor incorrecto sin avisar.",
      "Con {-3, 2, 5} el resultado es [9, 4, 25]: un valor negativo al cuadrado es positivo, por eso -3 pasa a 9."
    ]
  },
  {
    pista: "Piensa en un array de boolean donde cada posición representa una habitación. Separa qué pide el usuario en el menú y qué comprobaciones necesita cada opción.",
    razonamiento: [
      "El array ocupadas guarda true para las habitaciones ocupadas y false para las libres. Cada opción del menú actúa sobre ese estado: mostrarLibres recorre el array y muestra las posiciones con false.",
      "Antes de cambiar nada, el método valida el índice, porque acceder fuera de 0 a n - 1 lanza ArrayIndexOutOfBoundsException. También valida la transición: no se puede hacer check-in en una habitación ocupada ni check-out en una libre.",
      "El do-while muestra el menú al menos una vez y termina cuando se elige 0. La solución numera las habitaciones desde 0 hasta n - 1, como indica el mensaje. Si se quisiera numerarlas desde 1, habría que restar 1 al número introducido una sola vez."
    ]
  },
  {
    pista: "Es un contador: empieza en cero y suma uno cada vez que el valor coincide con el buscado.",
    razonamiento: [
      "La variable cantidad acumula los aciertos, y el for-each recorre cada valor sin necesidad de índice. Si el array está vacío, el bucle no se ejecuta y el resultado es 0.",
      "A diferencia de buscar, aquí no se puede parar en la primera coincidencia, porque hay que contar todas. Un return dentro del bucle devolvería 1 en lugar del total.",
      "Con {2, 3, 2, 2, 8} y el objetivo 2, el resultado es 3. La misma idea (recorrer todo y acumular) aparece en muchos problemas."
    ]
  }
];
