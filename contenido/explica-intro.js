window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["intro"] = [
  {
    pista: "Piensa qué método de Scanner lee una línea entera, con sus espacios, y en qué orden tienes que pedir los datos.",
    razonamiento: [
      "El programa necesita dos textos, así que se leen con nextLine() en dos pasos: primero el nombre y después el apellido. Para mostrar el saludo basta con concatenar las cadenas con + y los espacios necesarios.",
      "Conviene usar nextLine() y no next(). El método next() lee solo hasta el primer espacio, así que un nombre compuesto o un apellido con espacio se cortaría. nextLine() devuelve la línea completa tal como la escribió el usuario.",
      "Con print en lugar de println, el cursor se queda en la misma línea después de cada pregunta. La llamada a sc.close() libera el Scanner al final; no cambia el resultado, pero es buena costumbre."
    ]
  },
  {
    pista: "Fíjate en qué tipo de números necesitas para que la división no pierda la parte decimal, y en el orden en que se hacen las operaciones.",
    razonamiento: [
      "La fórmula es base por altura dividido entre 2. Como el área puede tener decimales (base 3 y altura 5 dan 7.5), los datos se leen con nextDouble() y el resultado se guarda en un double.",
      "El detalle importante es la división. Si base y altura fueran int, base * altura sería un int y la división entre 2 descartaría la parte decimal: con 3 y 5 se mostraría 7 en lugar de 7.5. Basta con que los datos sean double para que todo el cálculo sea decimal.",
      "Si el enunciado pidiera un resultado entero, el truncamiento sería intencionado y habría que escribirlo a propósito con un casting explícito, por ejemplo (int)."
    ]
  },
  {
    pista: "La fórmula mezcla multiplicación y división. Piensa en el orden en que Java evalúa una expresión y en si cada número es entero o decimal.",
    razonamiento: [
      "La fórmula F = C × 9/5 + 32 se escribe tal cual: c * 9 / 5 + 32. Java evalúa los operadores de la misma prioridad de izquierda a derecha, así que primero calcula c * 9 y después divide entre 5.",
      "Como c es double, c * 9 ya es decimal y la división también. Si c fuera int, c * 9 / 5 truncaría los decimales del resultado (23 ºC daría 41 ºF en lugar de 41.4). Otro error habitual es escribir c * (9 / 5): con enteros, 9 / 5 vale 1 y el resultado sería incorrecto.",
      "Para comprobar el programa conviene probar dos casos conocidos: 0 ºC deben dar 32 ºF y 100 ºC deben dar 212 ºF."
    ]
  },
  {
    pista: "El teorema de Pitágoras suma cuadrados y después necesita despejar un valor. Piensa qué método de Math calcula una raíz cuadrada.",
    razonamiento: [
      "El teorema dice que el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos. Para despejar la hipotenusa hay que sacar la raíz cuadrada de a * a + b * b, y eso es lo que hace Math.sqrt.",
      "Math.sqrt devuelve un double, por eso los catetos se leen también como double. Para elevar al cuadrado, a * a es más simple que Math.pow(a, 2) y da el mismo resultado en este caso.",
      "Math.hypot(a, b) calcula lo mismo y está pensada para evitar desbordamientos con valores muy grandes. Sirve para comprobar que el resultado de Math.sqrt es correcto."
    ]
  },
  {
    pista: "Antes de dividir, piensa qué tipo de resultado da la suma de enteros entre otro entero y qué ocurre con la parte decimal.",
    razonamiento: [
      "La media es la suma de los tres números dividida entre 3. Como los datos son enteros, a + b + c es un int, y dividir un int entre 3 da una división entera que descarta lo que sobra.",
      "Por eso la solución divide entre 3.0: el literal 3.0 es double, así que la división se hace en decimal. Guardar el resultado en un double después no sirve, porque la parte decimal ya se perdió en la división. Con 1, 2 y 2, la media es 1.666..., no 1.0.",
      "Si los números fueran decimales, bastaría con leerlos con nextDouble(), y el 3.0 ya no haría falta, aunque tampoco estorba."
    ]
  },
  {
    pista: "Cada nombre es un texto y necesitas la primera letra de cada uno. Piensa qué método devuelve un carácter en una posición concreta.",
    razonamiento: [
      "Hay que leer tres textos, así que nextLine() se usa tres veces: un nombre puede tener espacios o varias palabras, y next() cortaría en el primer espacio. Después, charAt(0) devuelve el primer carácter de cada cadena. Las posiciones empiezan en 0, así que el índice 0 es la primera letra.",
      "El detalle que importa es el orden de las operaciones. La expresión empieza con un char seguido de un String, y el + se resuelve como concatenación de texto. Si los dos primeros elementos fueran char, el + sumaría sus códigos numéricos: 'a' + 'b' da 195, no \"ab\".",
      "Si el usuario deja un campo vacío, charAt(0) lanza una StringIndexOutOfBoundsException. El enunciado no pide controlarlo, pero conviene saber que puede ocurrir."
    ]
  }
];
