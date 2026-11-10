// Unidad 5 (strings): pistas y explicaciones por ejercicio.
window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["strings"] = [
  {
    pista: "Recorre la cadena posición por posición y decide en cada una si cuentas. Piensa qué valor debe tener el contador si la cadena está vacía.",
    razonamiento: [
      "Un for recorre los índices de 0 a length() - 1, y charAt devuelve el carácter de cada posición. Si coincide con buscado, cantidad aumenta. El contador empieza en 0, así que una cadena vacía devuelve 0 sin entrar en el bucle.",
      "Un char se compara con ==, porque es un tipo primitivo y == compara su valor. Escribir charAt(i).equals(...) no compila, porque char no tiene métodos como equals.",
      "Esta versión distingue mayúsculas de minúsculas, que es lo que pide el enunciado. Si se quisiera ignorarlas, habría que pasar la cadena y el carácter a minúsculas con Character.toLowerCase antes de comparar."
    ]
  },
  {
    pista: "No hace falta seguir recorriendo si ya encontraste el carácter. Piensa qué devolver si terminas el recorrido sin encontrarlo.",
    razonamiento: [
      "El for recorre la cadena y, en cuanto charAt(i) coincide con buscado, return true termina el método. Si el bucle acaba sin encontrarlo, la última línea devuelve false. Es una búsqueda lineal: el número de comparaciones depende de la posición donde aparece el carácter.",
      "return dentro del bucle sale del método al instante, así que no hace falta una variable que indique si se encontró. Un error frecuente es poner return false dentro del bucle, lo que devolvería false tras comparar solo el primer carácter.",
      "String.contains haría lo mismo, pero el enunciado pide el recorrido manual. La lógica es la de contarCaracteres con una salida temprana."
    ]
  },
  {
    pista: "Recorre la cadena en sentido contrario, desde el último índice, y guarda cada carácter en un lugar donde vayas construyendo el resultado.",
    razonamiento: [
      "El for empieza en length() - 1 y baja hasta 0, así que los caracteres se visitan del último al primero. Cada uno se añade a un StringBuilder, que construye el resultado sin crear una cadena nueva en cada paso, y toString devuelve el texto final.",
      "Un error típico es empezar en length(): charAt fallaría con un índice fuera de rango. Otro es concatenar con + dentro del bucle; funcionaría, pero crearía una cadena nueva en cada vuelta, que es justo lo que StringBuilder evita. Con una cadena vacía el bucle no se ejecuta y el resultado es vacío.",
      "Si se pudiera usar StringBuilder.reverse, bastaría una línea. El ejercicio busca practicar el recorrido por índices."
    ]
  },
  {
    pista: "Recorre la cadena y decide para cada carácter si lo sustituyes o lo copias tal cual. Piensa qué pasa con las mayúsculas y con las vocales acentuadas.",
    razonamiento: [
      "El método construye un StringBuilder carácter a carácter. Para cada posición guarda el original y una versión en minúsculas; si la versión está en la cadena de vocales, añade un asterisco, y si no, copia el original. Así los espacios, las consonantes y los signos quedan intactos.",
      "Comparar con minúsculas permite reconocer « A » y « a » con una sola búsqueda en la cadena « aeiouáéíóúü ». En el else se usa el original, para conservar la mayúscula de las letras que no se sustituyen. Incluir las vocales acentuadas y la ü es una decisión de diseño que el enunciado dejaba abierta.",
      "Si solo se quisieran sustituir las vocales sin tilde, bastaría con quitar « áéíóúü » de la cadena de búsqueda; el resto del código no cambia."
    ]
  },
  {
    pista: "Compara un carácter del principio con uno del final y avanza hacia el centro. Piensa qué hacer con las mayúsculas antes de comparar.",
    razonamiento: [
      "La solución pasa la palabra a minúsculas con toLowerCase y usa dos índices: izquierda empieza en 0 y derecha en la última posición. Mientras izquierda sea menor que derecha, compara los dos caracteres; si difieren, no es palíndromo. Si todos los pares coinciden, el método devuelve true.",
      "El bucle se detiene cuando los índices se cruzan o se encuentran, porque el carácter central se compara consigo mismo y no aporta nada. Una cadena vacía no entra en el while, porque derecha vale -1, y devuelve true.",
      "Invertir la cadena y compararla con equals también funciona, pero crea una cadena nueva. Los dos índices no necesitan memoria adicional."
    ]
  },
  {
    pista: "Piensa cuándo debe escribirse un espacio: entre dos letras y no después de cada una. Así evitas tener que quitar un espacio sobrante al final.",
    razonamiento: [
      "El for recorre las letras de izquierda a derecha y, antes de cada carácter salvo el primero, añade un espacio. El primer carácter se añade sin separador delante, por eso no sobra nada al final.",
      "El error más común es poner el espacio después de cada letra y después intentar quitar el último con substring; funciona, pero es más difícil de leer. Con la condición i > 0 el separador queda siempre entre dos letras. Para una palabra vacía el resultado es vacío.",
      "Si la entrada fuera una frase con espacios, el código separaría también esos espacios y aparecerían dobles espacios. Eso habría que tratarlo aparte."
    ]
  },
  {
    pista: "Guarda la mejor palabra vista hasta ahora y compárala con cada nueva. Piensa cómo elegir entre dos palabras de la misma longitud.",
    razonamiento: [
      "mayor empieza como cadena vacía. En cada una de las cinco vueltas, sc.next lee una palabra, y si su longitud es mayor que la de mayor, la sustituye. Al terminar el bucle, mayor contiene la palabra de mayor longitud.",
      "La comparación es estrictamente mayor, así que en caso de empate se conserva la palabra leída antes, como pide el enunciado. Si se usara >=, la última palabra empatada ganaría.",
      "next lee tokens separados por espacios, así que cada entrada debe ser una sola palabra. Con nextLine, una línea con espacios se leería como un único dato."
    ]
  },
  {
    pista: "Piensa en un estado que indique si estás dentro de una palabra o entre palabras. Cuenta cuándo empieza cada palabra, no cada carácter.",
    razonamiento: [
      "trim quita los espacios del principio y del final; si la cadena queda vacía, no hay palabras. El bucle recorre los caracteres con la variable dentroDePalabra. Cada vez que aparece un carácter que no es espacio y no estaba dentro de una palabra, empieza una nueva palabra y se suma 1.",
      "Contar inicios de palabra evita contar letras: « hola mundo » tiene dos inicios aunque tenga nueve letras. Los espacios repetidos no suman, porque mientras haya espacios dentroDePalabra vale false y no se vuelve a contar.",
      "Si los separadores incluyeran comas o tabulaciones, habría que sustituir la comprobación de espacio por otra más amplia, como Character.isWhitespace."
    ]
  },
  {
    pista: "Es el mismo problema de comparar extremos. Piensa cómo separar la comprobación en un método que no pida datos ni imprima nada.",
    razonamiento: [
      "main lee la palabra y llama a esPalindromo, que compara extremos con dos índices. El método no lee ni imprime: solo responde true o false, por lo que se puede reutilizar en otros programas.",
      "Aquí no se pasa la cadena entera a minúsculas; cada carácter se convierte con Character.toLowerCase justo antes de compararlo. Ambos enfoques dan el mismo resultado. La comparación se hace con !=, no con equals, porque cada char es un valor primitivo.",
      "Para probar, conviene introducir una letra, una cadena vacía y una palabra que no sea palíndroma, como casa."
    ]
  },
  {
    pista: "Piensa en las partes fijas del formato: cuántas cifras, qué separador y qué tipo de carácter va al final. Recuerda que una expresión regular de String.matches debe cubrir toda la cadena.",
    razonamiento: [
      "El patrón ^[0-9]{8}-[A-Za-z]$ describe ocho cifras, un guion y una letra. [0-9]{8} exige exactamente ocho dígitos, el guion es literal y [A-Za-z] admite una letra mayúscula o minúscula. Los anclajes ^ y $ hacen explícito el inicio y el final, aunque matches ya exige que toda la cadena coincida.",
      "La expresión valida solo el formato. La letra de control del NIF depende del número, y se obtiene con el resto de dividir entre 23 y una tabla de letras. Esa comprobación no forma parte de este ejercicio, así que un NIF con la letra equivocada pasaría la validación de formato.",
      "Si el enunciado permitiera espacios antes o después del guion, habría que añadirlos al patrón. Si aceptara la letra en minúscula, la clase [A-Za-z] ya lo cubre."
    ]
  },
  {
    pista: "Hay dos comprobaciones distintas: que el texto tenga la forma correcta y que la fecha exista. Piensa qué clase de Java conoce el calendario.",
    razonamiento: [
      "Primero, matches comprueba el formato dd/mm/aaaa, con dos cifras, dos cifras y cuatro cifras. Si falla, el método devuelve false sin más trabajo. Después, split(\"/\") separa las partes y cada una se convierte a entero con Integer.parseInt.",
      "LocalDate.of conoce el calendario y lanza DateTimeException si el mes o el día no existen, como 31/04 o 29/02 en un año no bisiesto. El método captura esa excepción y devuelve false. El orden de los argumentos es año, mes y día, por eso se usan partes[2], partes[1] y partes[0].",
      "Una regex de formato aceptaría 31/02/2025, por eso no basta sola. Para probarlo conviene usar 29/02 en un año bisiesto y en otro que no lo sea, y también 31/04."
    ]
  },
  {
    pista: "Las reglas son de presencia, no de posición: debe haber una minúscula en cualquier lugar, y lo mismo con la mayúscula y el dígito. Piensa cómo expresar « debe contener » en un patrón.",
    razonamiento: [
      "Un lookahead como (?=.*[a-z]) mira hacia delante sin consumir caracteres y comprueba que en algún punto de la cadena hay una minúscula. Se encadenan tres lookaheads, uno para minúscula, uno para mayúscula y uno para dígito, y cada regla se comprueba sobre la contraseña completa.",
      "Después de los lookaheads, [A-Za-z0-9]{8,20} fija la longitud entre 8 y 20 caracteres y el conjunto de caracteres permitido. Los ^ y $ aseguran que la contraseña entera cumple el patrón.",
      "La solución solo admite letras y dígitos. Si el enunciado permitiera símbolos, habría que ampliar la clase de caracteres del final del patrón."
    ]
  },
  {
    pista: "Piensa qué separadores hay y cómo agruparlos. Recuerda que split recibe una expresión regular y que los separadores repetidos pueden producir elementos vacíos.",
    razonamiento: [
      "trim quita los espacios del principio y del final. El patrón \"[\\\\s,;.]+\" es una clase de caracteres que contiene espacio en blanco, coma, punto y punto y coma; el + agrupa uno o más separadores seguidos. Así « a,  b » se divide en dos palabras, sin elementos vacíos.",
      "Dentro de corchetes, el punto pierde su significado de cualquier carácter y es literal, por eso no hace falta escaparlo. Si se quitara el +, cada separador doble produciría un elemento vacío. El trim no elimina comas ni puntos del principio: una frase que empiece por una coma produciría un elemento vacío inicial, y para ignorarlos también habría que quitarlos con replaceAll antes de dividir.",
      "Si la frase está vacía, el if lo indica antes de dividir, porque split sobre una cadena vacía devuelve un único elemento vacío. Arrays.toString sirve para comprobar el resultado de forma rápida."
    ]
  }
];
