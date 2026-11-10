window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["condicionales"] = [
  {
    pista: "Piensa qué resto deja un número al dividirlo entre 2 y qué operador de Java calcula ese resto.",
    razonamiento: [
      "Un número es par si se divide entre 2 sin resto. El operador % devuelve el resto de la división, así que n % 2 vale 0 en los pares. La condición compara ese resto con 0 usando ==, y el if decide qué mensaje se muestra.",
      "El error más frecuente es escribir = en lugar de ==: n % 2 = 0 no compila, porque el lado izquierdo de una asignación tiene que ser una variable. Con números negativos el resto también puede ser -1 (por ejemplo, -3 % 2 vale -1), así que comparar con 1 para detectar impares fallaría. Lo fiable es comparar con 0 y dejar que el else cubra el resto de casos.",
      "El mismo patrón sirve para cualquier divisor. Por ejemplo, n % 3 == 0 indica si un número es múltiplo de 3."
    ]
  },
  {
    pista: "Antes de dividir, piensa qué condición debe cumplir el segundo número y qué hacer cuando no la cumple.",
    razonamiento: [
      "La división entre cero no tiene un resultado válido, así que la comprobación va antes de la operación. El if mira si b es distinto de 0, y solo en ese caso calcula a / b. El else muestra el mensaje de error.",
      "Se usa double para que la división sea decimal, ya que 7 / 2 con enteros daría 3. Con double, Java no lanza excepción al dividir entre 0.0: devuelve Infinity. Por eso la comprobación sigue siendo necesaria, para mostrar un mensaje claro en lugar de un Infinity.",
      "Con int, la misma división sin comprobar lanzaría una ArithmeticException, que es el error que produce Java al dividir enteros entre cero."
    ]
  },
  {
    pista: "Las dos comprobaciones deben cumplirse a la vez. Piensa qué operador lógico expresa «y» y cómo se comparan dos Strings.",
    razonamiento: [
      "El acceso depende de dos condiciones: el usuario correcto y la contraseña correcta. Se combinan con && en un único if. Como && hace cortocircuito, si el usuario no coincide la contraseña ni siquiera se compara. El else cubre cualquiera de los dos fallos sin revelar cuál fue.",
      "Usuario y contraseña son Strings y se comparan con equals(). Con ==, Java compara si son el mismo objeto en memoria y no su contenido, así que el resultado sería false aunque el texto fuera idéntico. Se usa nextLine() porque una contraseña puede llevar espacios.",
      "equals distingue mayúsculas y minúsculas: «VivaErBetis» y «vivaerbetis» no son iguales. Si el enunciado pidiera ignorarlas, existe el método equalsIgnoreCase."
    ]
  },
  {
    pista: "Piensa en una forma de saber si una cadena cambia al convertirla a mayúsculas, y compara la original con su versión convertida.",
    razonamiento: [
      "Una cadena está en mayúsculas si convertirla a mayúsculas no cambia nada. La solución hace exactamente eso: calcula texto.toUpperCase() y lo compara con el original usando equals. Si son iguales, la cadena ya estaba en mayúsculas.",
      "toUpperCase() devuelve una cadena nueva y no modifica texto, por eso la comparación tiene sentido. La comparación debe hacerse con equals y no con ==, por la misma razón que en el ejercicio de autenticación.",
      "Hay un matiz: los caracteres que no son letras (dígitos, espacios, signos) no cambian al pasar a mayúsculas. Así, «HOLA 2» cuenta como mayúsculas y «123» también. Si el enunciado exigiera letras, habría que recorrer los caracteres con charAt y comprobar cada uno."
    ]
  },
  {
    pista: "Hay tres casos excluyentes según el signo del exponente. Piensa cómo obtener un valor negativo a partir de una potencia positiva.",
    razonamiento: [
      "El exponente decide la rama. Si es positivo, Math.pow calcula la potencia directamente. Si es 0, el resultado es 1. Si es negativo, base elevado a -exp es un valor positivo, y su inverso, 1 / Math.pow(base, -exp), es la potencia negativa.",
      "El orden de las ramas importa: el caso exp == 0 se comprueba explícitamente entre las otras dos, así que nunca se mezcla con el negativo. La expresión 1 / Math.pow(...) funciona como división decimal porque Math.pow devuelve double. Si ambos operandos fueran enteros, la división se truncaría.",
      "Con base 0 y exponente negativo, la división da Infinity y el programa no lo controla. Si el enunciado lo exigiera, habría que añadir una comprobación antes de dividir."
    ]
  },
  {
    pista: "Piensa qué relación hay entre la suma de los tres números y los dos extremos, y cómo localizar el mayor y el menor con dos valores a la vez.",
    razonamiento: [
      "Math.max y Math.min solo comparan dos valores, por eso se anidan: Math.max(b, c) compara los dos últimos y el resultado se compara con a. Así el mayor sale de dos comparaciones, y el menor se calcula igual con Math.min.",
      "El número del medio se obtiene sin más comparaciones: la suma de los tres menos el mayor y el menor deja justo el que queda en medio. Funciona porque la suma total no cambia, así que restar los extremos deja el tercer valor.",
      "Con valores repetidos también funciona: con 5, 5 y 1, el mayor es 5, el menor es 1 y el medio resulta 5. Otra opción es comparar pares de números con if e intercambiarlos, que es más largo pero sirve para ordenar listas más grandes."
    ]
  },
  {
    pista: "Antes de comprobar Pitágoras, piensa qué lado debe ocupar la posición de la hipotenusa. Después, fíjate en el orden en que debes probar las condiciones de los lados.",
    razonamiento: [
      "El teorema de Pitágoras solo se aplica si el lado mayor es la hipotenusa. Por eso primero se identifica el lado mayor, y los otros dos se tratan como catetos. Las variables mayor, otro1 y menor hacen ese reparto sin ordenar los tres lados. Después se comprueba que menor al cuadrado más otro1 al cuadrado es igual a mayor al cuadrado.",
      "La comparación usa una tolerancia de 1e-9 porque los decimales en double no siempre son exactos. Con lados decimales, el cuadrado de un valor puede quedar muy cerca del esperado sin ser idéntico, y comparar con == sería frágil.",
      "El orden de las comprobaciones de tipo también importa. Un triángulo equilátero tiene dos lados iguales, así que se prueba primero el equilátero. Si se probara antes el isósceles, el equilátero nunca se alcanzaría. El cálculo de rectángulo es independiente: un triángulo puede ser rectángulo e isósceles a la vez (lados 1, 1 y raíz de 2), y por eso el programa puede mostrar dos líneas. El programa supone que los tres lados forman un triángulo válido y no lo comprueba."
    ]
  },
  {
    pista: "La regla tiene una excepción dentro de otra. Piensa qué condiciones deben cumplirse a la vez y cuáles basta con que se cumplan por separado.",
    razonamiento: [
      "La regla se lee así: es bisiesto si es divisible por 4 y no por 100, o si es divisible por 400. Eso se traduce a una sola expresión booleana: (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0. El resultado se guarda en una variable boolean.",
      "Los paréntesis no son obligatorios, porque && tiene más prioridad que ||, pero hacen la regla legible. Un error habitual es olvidar la excepción de los siglos y considerar bisiesto cualquier año divisible por 4, así que 1900 saldría como bisiesto.",
      "El operador ternario (bisiesto ? ... : ...) elige el texto del mensaje. Es la misma decisión que un if con else, escrita en una línea. El año 2000 es bisiesto porque es divisible por 400, y el 1900 no lo es: son los dos casos que prueban la regla."
    ]
  },
  {
    pista: "El precio depende de tramos de alumnos, y en uno de ellos el coste del autobús es fijo. Piensa qué caso conviene controlar antes de dividir entre el número de alumnos.",
    razonamiento: [
      "Primero se decide el precio por alumno con una cadena if / else if, de mayor a menor número de alumnos. Si el grupo es de menos de 30, el autobús cuesta 4000 € en total y el precio por alumno sale de repartir ese coste: totalBus / n.",
      "Dos detalles importan. El caso n <= 0 se controla antes de cualquier división, porque repartir entre cero no tiene sentido y el return evita llegar a esa operación. Además, totalBus y precioAlumno son double: si fueran int, 4000 / n truncaría la división y el reparto saldría mal.",
      "El valor -1 en precioAlumno actúa como marcador de «coste fijo». Así, el cálculo final depende de ese marcador y no hace falta repetir las condiciones de los tramos. Una alternativa más clara sería una variable boolean que indique si el autobús tiene coste fijo."
    ]
  },
  {
    pista: "El coste no es una tarifa única por minuto: cada tramo tiene su precio y se suman. Piensa cómo sumar solo los minutos que caen en cada tramo.",
    razonamiento: [
      "La llamada se cobra por tramos acumulados: los 5 primeros minutos a 1 € cada uno, los minutos 6, 7 y 8 a 0,80 €, los minutos 9 y 10 a 0,70 €, y a partir del minuto 11, a 0,50 €. En cada rama se suman los tramos completos anteriores y después los minutos del tramo en el que cae la llamada.",
      "Por ejemplo, una llamada de 9 minutos cuesta 5 × 1 € más 3 × 0,80 € más 1 × 0,70 €, es decir, 8,10 €. Un error habitual es aplicar la tarifa del último tramo a todos los minutos: 9 × 0,70 € daría 6,30 €, y el cobro sería incorrecto.",
      "Los límites usan <= para incluir el último minuto de cada tramo: el minuto 8 entra en el segundo tramo. Con printf y %.2f el coste sale con dos decimales; sin formato, las operaciones con decimales como 0,80 pueden mostrar cifras con muchos decimales por el redondeo de los números en coma flotante."
    ]
  },
  {
    pista: "Son siete casos concretos que asocian un número con un texto. Piensa qué estructura está pensada para comparar una variable con una lista de valores fijos.",
    razonamiento: [
      "Cuando una variable se compara con una lista de valores exactos, switch es más claro que una cadena de if. Cada case asocia un número con su nombre, y el break al final de cada caso evita que la ejecución siga con el siguiente.",
      "Sin break se produciría una caída (fall-through): con un 1, nombre tomaría «lunes», luego «martes» y así hasta «domingo», que sería el valor final. El caso default recoge los números fuera del 1 al 7 y asigna null, que el if posterior usa para mostrar el error.",
      "La variable nombre se declara sin valor y se asigna en cada rama. Java exige que una variable tenga valor antes de usarla, y el default garantiza que siempre se asigne algo. En las versiones modernas de Java existe también una forma con flechas (case 1 -> ...) que no cae al caso siguiente."
    ]
  },
  {
    pista: "Varios meses comparten la misma cantidad de días. Piensa cómo agrupar casos en un switch sin repetir código.",
    razonamiento: [
      "Febrero es un caso aparte, con 28 días. Los meses de 30 días son 4, 6, 9 y 11, y los de 31 son el resto. Cada grupo se escribe como varias etiquetas case seguidas: Java entra por la primera que coincide y ejecuta hasta el primer break, así que todas las etiquetas del grupo dan el mismo resultado.",
      "Este es uno de los pocos casos en que la caída de caso es intencionada. Cada grupo termina con break para no pasar al grupo siguiente. Si el grupo de 30 días olvidara su break, caería en la asignación de 31 días.",
      "El valor -1 del default marca un mes no válido, y el if final comprueba dias > 0 para elegir el mensaje. El enunciado trata febrero siempre como 28 días. Si quisieras tener en cuenta los años bisiestos, podrías reutilizar la lógica del ejercicio del año bisiesto."
    ]
  },
  {
    pista: "La zona y el peso se validan en pasos distintos. Piensa en el orden de las comprobaciones y en que la tarifa va por gramo mientras el peso se pide en kilos.",
    razonamiento: [
      "El programa valida en dos pasos. Primero, un switch asigna la tarifa de la zona elegida. La rama default muestra el error y termina con return, así que con una zona incorrecta el programa no llega a pedir el peso. Después, un if comprueba si el peso supera 5 kg.",
      "La variable tarifa no recibe valor en la declaración, pero después del switch siempre tiene uno: cada camino que sigue adelante le asigna un valor, y el default sale con return. Por eso el compilador acepta usarla. Cerrar el Scanner antes del return evita dejar el recurso abierto.",
      "Hay un detalle de unidades: la tarifa es por gramo, así que el peso se convierte con kg * 1000 antes de multiplicar. Si se multiplicara por los kilos, el precio saldría 1000 veces menor. Como el límite es «supera 5 kg», exactamente 5 kg se acepta."
    ]
  }
];
