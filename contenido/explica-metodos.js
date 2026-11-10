// Unidad 4 (metodos): pistas y explicaciones por ejercicio.
window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["metodos"] = [
  {
    pista: "El saludo debe escribirse en un método que reciba el nombre como dato. Piensa qué información necesita el método y qué hace main con el texto que lee.",
    razonamiento: [
      "El método saludar recibe el nombre como parámetro, así que sirve para cualquier nombre sin copiar el código. Es void porque solo muestra el saludo y no devuelve ningún valor. main lee el nombre con nextLine y se lo pasa como argumento en la llamada.",
      "Como saludar y main son static, se pueden llamar directamente sin crear un objeto. Conviene distinguir el parámetro, que es la variable interna del método, del argumento, que es el valor concreto que se pasa en cada llamada.",
      "Si el método devolviera el texto en lugar de imprimirlo, sería más fácil de probar sin consola, y main decidiría qué hacer con ese texto."
    ]
  },
  {
    pista: "El cubo consiste en multiplicar el número tres veces. Antes de elegir el tipo de retorno, piensa si el resultado puede superar el rango de int.",
    razonamiento: [
      "El método recibe un int y devuelve su cubo como long. La expresión (long) n * n * n convierte n a long antes de multiplicar, así que cada producto se hace en long y no en int.",
      "Con int, el cubo de 2000 es 8 000 000 000, que supera el límite de int y se desborda sin aviso. Si el cast se pusiera después de multiplicar, el desbordamiento ya habría ocurrido y el resultado sería incorrecto.",
      "Los negativos funcionan igual: el signo se conserva en el producto, el cero da cero y el método no necesita comprobar el signo."
    ]
  },
  {
    pista: "Separa la operación matemática de la impresión de la tabla. Piensa qué método llama al otro.",
    razonamiento: [
      "multiplicar devuelve el producto de dos enteros y no imprime nada, así que se puede reutilizar en cualquier contexto. mostrarTabla recorre del 1 al 10 y llama a multiplicar en cada vuelta para formar cada línea.",
      "Los métodos se declaran dentro de la clase y fuera de main, nunca dentro de él; definir un método dentro de otro es un error de compilación. La llamada multiplicar(numero, i) devuelve un int que se concatena a la cadena de la línea.",
      "Si la tabla tuviera un límite variable, mostrarTabla recibiría un segundo parámetro, y multiplicar quedaría sin cambios."
    ]
  },
  {
    pista: "El método tiene que responder sí o no, así que piensa qué tipo de valor de retorno encaja. Recuerda cómo se comporta el operador % con números negativos.",
    razonamiento: [
      "esPar devuelve un boolean porque la respuesta es sí o no. La expresión n % 2 == 0 ya es una condición booleana, así que el método la devuelve directamente. main decide el mensaje con un operador ternario.",
      "Comparar el resto con 0 es correcto también para negativos: -4 % 2 vale 0, y -3 % 2 vale -1, que no es 0. Comparar con 1 daría un resultado erróneo para los impares negativos.",
      "Devolver directamente el texto « Es par » desde el método mezcla el cálculo con la presentación. Con un boolean, el método puede usarse en cualquier contexto sin imponer el texto del mensaje."
    ]
  },
  {
    pista: "El menú debe repetirse hasta que el usuario elija salir. Piensa qué parte del menú se muestra antes de leer la opción y qué condición detiene el ciclo.",
    razonamiento: [
      "mostrarMenu recibe cuántas opciones numeradas debe mostrar y siempre imprime la opción 0 para salir. main usa un do-while porque el menú debe mostrarse al menos una vez antes de leer la elección, y se repite mientras la opción no sea 0.",
      "El parámetro opciones es una cantidad, no la lista de opciones. El do-while encaja mejor que un while, porque con while habría que leer la opción una vez antes del bucle y otra dentro, duplicando la lectura.",
      "La solución fija 4 opciones en main. Si ese número viniera de otra parte, bastaría con pasar la variable en lugar del valor fijo."
    ]
  },
  {
    pista: "Piensa en el cuadrado como un conjunto de filas y columnas. Para la versión hueca, observa qué posiciones pertenecen al borde.",
    razonamiento: [
      "dibujarRelleno imprime un asterisco en cada posición usando dos bucles, uno para filas y otro para columnas. dibujarHueco tiene la misma estructura, pero imprime asterisco solo si la fila o la columna están en el borde: la primera o la última fila, o la primera o la última columna. En el resto imprime un espacio.",
      "El tamaño llega como parámetro, así que los dos métodos funcionan para cualquier n. El enunciado sugiere validar dentro de los métodos; la solución lo hace en main, antes de llamarlos, para no dibujar nada con un tamaño incorrecto.",
      "Un rectángulo se dibujaría igual, cambiando el número de filas y columnas por dos valores distintos."
    ]
  },
  {
    pista: "El triángulo tiene cada fila más larga que la anterior. Para la versión hueca, identifica qué posiciones forman sus tres lados.",
    razonamiento: [
      "dibujarRelleno imprime en cada fila tantos asteriscos como indica el número de fila, igual que el triángulo de los bucles. dibujarHueco mantiene el mismo recorrido y decide cada posición: asterisco en la primera fila, en la última fila, en la primera columna y en la diagonal donde la columna coincide con la fila.",
      "La diagonal es el detalle clave: col == fila marca el lado inclinado. Las posiciones que no están en el borde se imprimen como espacio, y así la figura conserva la forma del triángulo.",
      "Si el ángulo recto estuviera en otra esquina, cambiaría la condición que decide qué posiciones forman el borde, pero no los bucles."
    ]
  },
  {
    pista: "Hay que decidir dos cosas: qué figura dibujar y si seguir en el menú. Piensa cómo combinar un do-while con una cadena de if para las opciones válidas, la de salir y las no válidas.",
    razonamiento: [
      "El menú usa do-while porque la opción debe mostrarse al menos una vez. Si la opción es 1 o 2, se lee el tamaño y se llama al método de dibujo correspondiente; si es 0, el bucle termina; cualquier otro valor muestra un aviso.",
      "Pedir el tamaño solo después de elegir una figura válida evita leer datos que no se van a usar. Dentro de esa rama, el if comprueba que el tamaño sea positivo antes de llamar a cuadrado o triangulo, de modo que cada método recibe datos correctos.",
      "Para añadir una figura nueva bastaría con crear su método, añadir una opción al texto del menú y una rama más en el if."
    ]
  },
  {
    pista: "Busca un caso base que no necesite más llamadas, como un número de una sola cifra. Para el caso general, piensa cómo obtener un número con una cifra menos.",
    razonamiento: [
      "Si n tiene una sola cifra, es menor que 10 y la cuenta es 1; ese es el caso base. En otro caso, n / 10 elimina la última cifra, así que la llamada recursiva trabaja con un número más pequeño, y el 1 suma la cifra que se ha quitado.",
      "El error más común es olvidar el 1 +: la llamada devolvería la cuenta sin la última cifra. Otro error es usar como caso base n == 0 devolviendo 0, lo que daría una cuenta incorrecta para el número 0, que tiene una cifra.",
      "El enunciado pide valores no negativos; la solución lo comprueba en main, de modo que la recursión solo recibe valores válidos."
    ]
  },
  {
    pista: "Piensa que base elevado a n es base multiplicado por base elevado a n - 1. El caso base es el exponente 0, y conviene pensar bien cuál es su valor.",
    razonamiento: [
      "Con exponente 0 el resultado es 1 por definición, y ese es el caso base. Para un exponente mayor que 0, el método multiplica base por potencia(base, exponente - 1), una llamada con un exponente más pequeño que acerca el problema al caso base.",
      "Un error habitual es devolver 0 en el caso base, lo que haría que todas las potencias valieran 0. El 1 es el elemento neutro de la multiplicación, por eso no altera el resultado cuando se multiplica por la base.",
      "El enunciado excluye los exponentes negativos; la solución los rechaza en main. El tipo de retorno es long para admitir resultados más grandes."
    ]
  },
  {
    pista: "El último dígito de un número se obtiene con el resto entre 10, y se quita con la división entre 10. Piensa cómo ir construyendo el resultado mientras avanzas.",
    razonamiento: [
      "En cada llamada, n % 10 da la última cifra y n / 10 elimina esa cifra. El resultado se forma en el segundo parámetro, invertido: multiplicarlo por 10 deja sitio para la nueva cifra. Cuando n llega a 0 no quedan cifras, y el acumulado es el resultado final.",
      "Ese segundo parámetro es un acumulador. La solución lo añade a la firma y main lo llama con 0 como valor inicial. Sin él, la función tendría que recomponer el número al volver de cada llamada, lo que es más difícil de seguir.",
      "Los ceros del final se pierden de forma natural: 120 se invierte como 21, porque un número no guarda ceros iniciales. Si el enunciado pidiera la cadena invertida, habría que concatenar texto en lugar de calcular un número."
    ]
  },
  {
    pista: "Un número solo tiene ceros y unos si cada una de sus cifras cumple esa condición. Piensa cómo comprobar la última cifra y repetir la comprobación con el resto del número.",
    razonamiento: [
      "El caso base es un número de una cifra, que es binario si vale 0 o 1. En otro caso, la última cifra n % 10 debe ser 0 o 1, y n / 10 debe cumplir la misma regla. El operador && exige que se cumplan ambas cosas.",
      "Como && solo evalúa la recursión si la última cifra es válida, la comprobación se detiene pronto cuando aparece un dígito como 2. Un error habitual es usar || en lugar de &&, lo que aceptaría cualquier número que tuviera algún dígito 0 o 1.",
      "La cifra se puede obtener con el resto entre 10, sin convertir el número a texto, lo que mantiene el ejercicio en el terreno de los enteros."
    ]
  },
  {
    pista: "Los números en base 2 se obtienen con los restos de dividir entre 2, leídos al revés. Piensa cómo combinar la representación de la mitad del número con el último resto.",
    razonamiento: [
      "Para n menor que 2, la representación es el propio número, y String.valueOf lo convierte en texto: « 0 » o « 1 ». En otro caso, n / 2 quita la última cifra binaria y n % 2 es esa cifra. La llamada devuelve la parte alta del número en binario, y la cifra se añade al final.",
      "El resultado es un String, así que el + concatena. En aBinario(n / 2) + (n % 2) la izquierda es texto y la derecha se pega como carácter; si ambos fueran int, el + sumaría en lugar de concatenar. El paréntesis no es obligatorio, pero deja claro que se añade el resto.",
      "Sin el caso base para n menor que 2, el número 1 generaría llamadas con n / 2 igual a 0, y ese 0 volvería a llamarse a sí mismo sin fin."
    ]
  },
  {
    pista: "Compara cada carácter con el siguiente y pasa el resto del trabajo a otra llamada. Piensa cuándo ya no quedan pares de letras que comparar.",
    razonamiento: [
      "La solución usa una versión con dos parámetros, la palabra y un índice, que main llama con 0. Si el índice está en el último par o más allá, no quedan comparaciones y la cadena está ordenada: ese es el caso base. Si no, compara el carácter actual con el siguiente y, solo si están en orden, llama de nuevo con el índice siguiente.",
      "El caso base cubre también la cadena vacía: su longitud menos 1 es -1, y el índice 0 ya cumple la condición. Las comparaciones de char usan su valor numérico, así que las letras minúsculas sin tilde se comparan en orden alfabético y las mayúsculas van antes que las minúsculas.",
      "Con <= una palabra con letras repetidas, como aabb, se considera ordenada. Si el enunciado exigiera orden estricto, bastaría con cambiar <= por <."
    ]
  },
  {
    pista: "Hay dos resultados que construir: la expresión en texto y el valor de la suma. Piensa cómo obtener la suma de 1 a n a partir de la suma de 1 a n - 1.",
    razonamiento: [
      "suma(n) es n más suma(n - 1), con el caso base suma(1) = 1. terminos(n) construye el texto de la misma manera: la expresión de n - 1, seguida de un + y de n. Juntas dan la expresión 1+2+3 y el valor de la suma.",
      "El orden de la concatenación importa: la llamada recursiva va primero y después el + y n. Si se escribiera n antes de la llamada, los términos saldrían en orden inverso. El caso base n == 1 devuelve « 1 » sin signo más, y por eso la salida para n = 1 es « 1 = 1 ».",
      "El resultado de suma se devuelve como long, porque la suma crece rápido con n. Usar dos métodos separados permite que cada uno tenga una sola responsabilidad: uno construye el texto y otro calcula el número."
    ]
  }
];
