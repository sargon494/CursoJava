// Unidad 3 (bucles): pistas y explicaciones por ejercicio.
window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["bucles"] = [
  {
    pista: "El factorial se construye paso a paso: empiezas con un valor neutro y multiplicas una vez por cada número. Piensa también qué debe pasar con el 0 y con los negativos.",
    razonamiento: [
      "El factorial es un producto acumulado: se parte de 1 y se multiplica por cada entero hasta n. El for recorre i desde 2 hasta n y la variable factorial guarda el resultado parcial en cada vuelta. Con n = 0 el bucle no entra ninguna vez y el valor se queda en 1, que es justo 0!.",
      "El detalle importante es el tipo de dato. Con int el resultado se desborda a partir de 13!, y el programa imprime un número incorrecto sin avisar; por eso la solución usa long y limita la entrada a 20. Los negativos no tienen factorial, así que se rechazan antes de entrar en el bucle.",
      "Si el enunciado pidiera calcular factoriales mayores, el bucle seguiría igual y lo que cambiaría sería el tipo de dato, por ejemplo BigInteger."
    ]
  },
  {
    pista: "El 0 indica el final y no debe entrar en la suma. Antes de dividir, piensa qué más necesitas contar además de la suma.",
    razonamiento: [
      "El 0 actúa como valor centinela: marca el final y no es un dato. La solución lee el primer número antes del while y vuelve a leer al final de cada vuelta, así la condición siempre se comprueba con el valor más reciente. Cada número distinto de cero suma a suma y aumenta cantidad.",
      "La media es una división, y la división entera de Java descarta los decimales: 7 / 2 da 3. Por eso se escribe suma / (double) cantidad, que convierte el divisor antes de dividir. El if comprueba que cantidad no sea cero para no dividir entre cero cuando el usuario escribe 0 de entrada.",
      "Si el centinela cambiara, solo cambiaría la condición del while. La lógica de la suma y de la media seguiría igual."
    ]
  },
  {
    pista: "El juego tiene dos motivos para terminar: acertar o agotar los intentos. Piensa cómo recordar que ya has acertado para dejar de preguntar.",
    razonamiento: [
      "Random().nextInt(100) devuelve valores de 0 a 99, así que se suma 1 para obtener un rango de 1 a 100. El for lleva la cuenta de los intentos y se detiene en 10; la variable acertado funciona como bandera, de modo que la condición del for deja de cumplirse en cuanto el usuario acierta.",
      "El orden de las comparaciones importa: primero se pregunta si es igual y después si es menor o mayor. Si el intento es menor que el secreto, la pista es que el número buscado es mayor. Tras el bucle, if (!acertado) muestra el número solo cuando el usuario ha fallado todos los intentos.",
      "Para cambiar el número de intentos basta modificar la condición del for. Si ese valor se repitiera en varios sitios, convendría guardarlo en una constante."
    ]
  },
  {
    pista: "Lee primero la cantidad y usa un bucle que se repita exactamente esas veces. Cada número debe sumar a una sola de las tres categorías.",
    razonamiento: [
      "El número de vueltas viene dado por la cantidad que escribe el usuario, así que un for con i < n es la opción natural: se leen exactamente n valores y no más. Si n es 0, la condición falla desde el principio y no se intenta leer ningún número.",
      "Dentro del bucle, un if con else if y else reparte cada valor entre positivos, negativos y ceros. Las tres condiciones son excluyentes, así que el orden no altera el resultado. Lo que sí debe ocurrir antes del bucle es poner los tres contadores a cero.",
      "Si el enunciado pidiera leer hasta un valor de parada en lugar de una cantidad fija, el for pasaría a ser un while, pero la clasificación en tres grupos seguiría igual."
    ]
  },
  {
    pista: "Recorre la frase carácter a carácter y comprueba en cada paso que sigues dentro de la entrada antes de leer una posición. Pasa cada letra a minúsculas antes de buscarla entre las vocales.",
    razonamiento: [
      "La solución lee una línea completa con nextLine y la recorre con un for. La condición del bucle tiene dos partes: se detiene al llegar al final de la cadena y al encontrar un espacio con Character.isWhitespace. El orden importa: texto.length() va primero, así charAt nunca recibe una posición que no existe.",
      "Para ignorar mayúsculas, la letra se pasa con Character.toLowerCase antes de buscarla en la cadena de vocales. La búsqueda usa indexOf, que devuelve -1 si el carácter no aparece; por eso la comparación es >= 0. Si el primer carácter ya es un espacio, el bucle no entra y no se imprime nada.",
      "Las vocales acentuadas están incluidas en la cadena de búsqueda, así que una a con tilde también cuenta como vocal. Si el enunciado pidiera solo las vocales sin tilde, bastaría con quitar esos caracteres de la cadena."
    ]
  },
  {
    pista: "El usuario puede escribir los extremos en cualquier orden, y los extremos cuentan si son pares. Piensa desde qué valor conviene empezar a recorrer y qué operador incluye el último.",
    razonamiento: [
      "Math.min y Math.max ordenan los dos extremos sin importar en qué orden los escribió el usuario. Después, el for va desde el menor hasta el mayor con <=, de modo que el extremo superior también se revisa. Con < el último valor quedaría fuera, que es el error más frecuente en este ejercicio.",
      "Para saber si un número es par se calcula n % 2 y se compara con 0. Esta comparación también funciona con negativos: -4 % 2 vale 0, y -3 % 2 vale -1, así que no es par. Comparar con 1 fallaría para los negativos impares.",
      "Una variante más eficiente empieza en el primer par y avanza de dos en dos, sin probar los impares. La solución revisa todos los números, lo que basta para este ejercicio."
    ]
  },
  {
    pista: "Un único bucle con contador del 1 al 10 es suficiente. En cada línea tienes que mostrar la operación completa y su resultado.",
    razonamiento: [
      "La tabla tiene diez filas fijas, así que un for con i de 1 a 10 es la opción natural. En cada vuelta, el número introducido se multiplica por i y la línea se forma concatenando el número, el símbolo, el multiplicador, el signo igual y el resultado.",
      "Al concatenar con +, los paréntesis alrededor de n * i no son estrictamente necesarios, porque * tiene más precedencia que +. Sirven para que la línea se lea mejor y para dejar claro que el producto se calcula antes de concatenarlo.",
      "Para una tabla de otro tamaño bastaría con cambiar el límite del for. Si la tabla empezara en otro valor, el bucle cambiaría su inicio y la expresión seguiría igual."
    ]
  },
  {
    pista: "Piensa en dos fases: primero colocar los límites en orden y después leer valores con centinela y clasificarlos. Cada valor debe contar en una sola de las dos estadísticas.",
    razonamiento: [
      "Igual que en el ejercicio de los pares, Math.min y Math.max colocan los límites en orden, así que no importa qué número escriba primero el usuario. El while lee valores hasta el 0, y cada valor entra en una rama: si está entre inicio y fin, incluidos los extremos, suma a sumaDentro; si no, aumenta cantidadFuera.",
      "El 0 es el centinela, así que nunca se procesa como dato. Si el intervalo incluye el cero, como de -5 a 5, el usuario no puede introducir el 0 para clasificarlo. Es una limitación del propio enunciado que conviene tener presente al probar el programa.",
      "Con un intervalo de un solo punto, por ejemplo 3 y 3, las comparaciones con >= y <= siguen funcionando y solo cuenta ese valor."
    ]
  },
  {
    pista: "Basta con encontrar un divisor entre 2 y n - 1 para descartar el número. Piensa hasta qué valor necesitas probar divisores y en qué momento puedes parar.",
    razonamiento: [
      "Primero se descartan los números menores que 2 con la variable primo, que empieza como n >= 2. El for prueba divisores desde 2 y, en cuanto alguno divide exactamente a n, primo pasa a false. La condición primo && hace que la búsqueda se detenga en ese momento.",
      "La condición divisor <= n / divisor es equivalente a comprobar que divisor * divisor <= n, pero evita el desbordamiento de int al multiplicar. Con esa condición basta con llegar hasta la raíz cuadrada de n: si n tiene un divisor mayor que ella, también tiene uno menor. Un número como 97 se comprueba con muy pocos divisores.",
      "Este método sirve para un solo número. Para listar todos los primos de un intervalo, el mismo bucle se repetiría dentro de otro for."
    ]
  },
  {
    pista: "Antes de leer nada, comprueba que la cantidad tenga sentido. Después, reserva una variable para la suma y recuerda que la media necesita decimales.",
    razonamiento: [
      "Si la cantidad es cero o negativa, la media no existe, así que el if informa del problema y no lee ningún valor. Si la cantidad es válida, el for lee exactamente n valores con nextDouble y los acumula en suma.",
      "La variable suma se declara como double. Si fuera int, la división suma / n descartaría los decimales. Como suma es double, la división produce un resultado decimal aunque n sea entero.",
      "Si los valores de entrada fueran enteros, bastaría con cambiar nextDouble por nextInt. Lo que debe seguir siendo decimal es la media, así que la división tiene que hacerse con un tipo double."
    ]
  },
  {
    pista: "Divide el número entre 10 y observa qué se pierde en cada división. Piensa cuándo un número ya tiene una sola cifra y qué hacer con el signo.",
    razonamiento: [
      "Cada división entera entre 10 elimina la última cifra del número. Por eso se empieza contando una cifra y se repite la división mientras el número siga siendo 10 o mayor, sumando una cifra en cada vuelta. El 0 cuenta como una cifra porque ya cumple la condición inicial.",
      "El signo no es una cifra, así que los negativos se tratan con su valor absoluto mediante Math.abs. Se usa long para que el número pueda ser grande sin desbordarse. Un error típico sería escribir while (n > 10): el número 10 tendría una sola cifra y el programa lo contaría mal.",
      "Si el enunciado pidiera contar cifras en otra base, la idea sería la misma, cambiando el divisor 10 por esa base."
    ]
  },
  {
    pista: "El resto de dividir a entre b puede sustituir a a sin cambiar el máximo común divisor. Repite el proceso hasta que el resto sea cero.",
    razonamiento: [
      "El algoritmo de Euclides se basa en que el MCD de a y b es el mismo que el MCD de b y a % b. En cada vuelta, a toma el valor de b y b toma el resto, hasta que b llega a 0; entonces a es el resultado. Por ejemplo, con 48 y 18 se pasa por los pares 18 y 12, después 12 y 6, y termina en 6.",
      "Antes del bucle, Math.abs quita los signos, porque el MCD se calcula con magnitudes. Si ambos valores son cero, el MCD no está definido y el programa lo indica sin entrar en el bucle. El resto debe guardarse en una variable antes de reasignar a y b; si se cambia a primero, se pierde el valor que hace falta.",
      "Con 0 y un número distinto de cero, el algoritmo devuelve ese número, porque el MCD de 0 y n es n. Es una buena combinación para probar."
    ]
  },
  {
    pista: "Piensa en las filas como un bucle y en cada fila como otro bucle que imprime tantos asteriscos como indique el número de fila. Recuerda la diferencia entre print y println.",
    razonamiento: [
      "El bucle exterior recorre las filas del 1 al número indicado. El interior imprime tantos asteriscos como el número de la fila actual, así que su límite es fila y no filas. Al terminar cada fila, println pasa a la línea siguiente.",
      "Un error común es usar filas como límite del bucle interior, lo que daría un cuadrado en lugar de un triángulo. Otro es usar print en vez de println al final de cada fila, y ver todos los asteriscos en una sola línea. La comprobación de filas <= 0 evita un resultado vacío sin explicación.",
      "Para un triángulo invertido, el número de asteriscos tendría que bajar en cada fila. Una forma de expresarlo es con un límite del tipo columnas <= filas - fila + 1."
    ]
  },
  {
    pista: "Un bucle decide qué tabla imprimir y el otro recorre sus factores. Observa qué variable cambia en cada nivel.",
    razonamiento: [
      "El bucle exterior elige la tabla, de 1 a 10, y el interior recorre los factores de 1 a 10 para esa tabla. Por cada vuelta del exterior, el interior se ejecuta completo, así que cada tabla ocupa diez líneas, además del encabezado.",
      "Declarar en el bucle interior una variable con el mismo nombre que la del exterior da error de compilación, porque ya existe en ese ámbito. Por eso la solución usa tabla y factor. El total de operaciones es 10 por 10, es decir, 100 multiplicaciones.",
      "Si el enunciado pidiera solo las tablas del 1 al 5, cambiaría el límite del bucle exterior y el interior quedaría igual."
    ]
  },
  {
    pista: "Cada fila es una secuencia creciente de cifras. Piensa qué relación tiene el número de fila con la última cifra que imprimes.",
    razonamiento: [
      "El bucle exterior recorre las filas y el interior imprime los dígitos desde 1 hasta el número de fila. Con print, los dígitos de una misma fila quedan pegados en la misma línea, y println cierra la fila cuando termina el bucle interior.",
      "El límite del interior depende de fila, igual que en el triángulo de asteriscos. La salida se ve como se espera mientras las filas tengan una cifra; a partir de la fila 10, digito deja de ser una sola cifra y la pirámide ya no se lee como se pide. Por eso la solución está pensada para pocas filas.",
      "Si se quisiera centrar la pirámide, habría que imprimir espacios antes de cada fila con un bucle adicional."
    ]
  },
  {
    pista: "Hay dos dimensiones y dos bucles. Piensa cuál de los dos recorre las filas y cuál las columnas, y lee las dimensiones en el mismo orden en que las pide el enunciado.",
    razonamiento: [
      "El bucle exterior recorre tantas filas como indica la altura, y el interior imprime tantos asteriscos como indica la anchura en cada fila. Como se trata de un conteo, se usa < con contadores que empiezan en 0, y así se obtienen exactamente altura filas y anchura columnas.",
      "Un error habitual es intercambiar las dos dimensiones, por ejemplo leyendo primero la anchura. Como el orden de entrada importa, la solución lee primero la altura y después la anchura. El if comprueba que ambas sean positivas antes de dibujar.",
      "Para un rectángulo hueco, el borde sería la primera y la última fila, y la primera y la última columna, igual que en un cuadrado hueco."
    ]
  }
];
