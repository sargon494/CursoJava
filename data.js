// Contenido del temario. Cada unidad: teoría (puntos clave + código) y ejercicios.
// Los enunciados están resumidos; el texto completo está en los PDFs originales.
window.TEMARIO = {
  unidades: [
    {
      id: "intro",
      num: 1,
      titulo: "Introducción a Java",
      resumen: "Qué es Java, cómo se compila y ejecuta, primer programa, variables, tipos, operadores y entrada/salida.",
      teoria: [
        "Java compila el código fuente (.java) a bytecode (.class). La JVM interpreta ese bytecode y lo convierte a código máquina (JIT).",
        "Lenguaje de tipado fuerte: hay que declarar el tipo de cada variable.",
        "Tipos numéricos enteros: byte, short, int, long. Decimales: float (f), double. Otros: char (un carácter Unicode, comillas simples), boolean, String (comillas dobles, no es primitivo).",
        "Los identificadores no pueden empezar por número ni contener operadores; son sensibles a mayúsculas. Convención: variables y métodos en minúscula, clases en mayúscula.",
        "Constantes con final y nombre en mayúsculas. Valores por defecto: 0 para numéricos, false, '\\u0000', null para String.",
        "Operadores: aritméticos, de asignación abreviada (+=), incremento (++a y a++ no son equivalentes al asignar), relacionales, lógicos (&&, ||, !, ^) y de bits.",
        "Precedencia: paréntesis, unarios, * / %, + -, desplazamientos, relacionales, igualdad, bits, &&, ||, ternario, asignación.",
        "Entrada con Scanner: nextInt() deja el salto de línea en el buffer; usar nextLine() extra antes de leer texto.",
        "Cadenas: length(), charAt(), substring(), indexOf(), toUpperCase(), trim(), equals() (no usar ==)."
      ],
      codigo: [
        `public class HolaMundo {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo!");\n    }\n}`,
        `Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nsc.nextLine();          // consume el intro pendiente\nString nombre = sc.nextLine();`
      ],
      ejercicios: [
        { titulo: "Saludo personalizado", texto: "Pedir nombre y apellido y mostrar un saludo." },
        { titulo: "Área de un triángulo", texto: "Pedir base y altura y calcular el área." },
        { titulo: "Celsius a Fahrenheit", texto: "Convertir una temperatura con F = C*9/5 + 32." },
        { titulo: "Hipotenusa", texto: "Calcular la hipotenusa con Pitágoras a partir de los catetos." },
        { titulo: "Media de tres enteros", texto: "Pedir tres enteros y mostrar su promedio." },
        { titulo: "Iniciales", texto: "Pedir nombre y dos apellidos y mostrar sus iniciales." }
      ]
    },
    {
      id: "condicionales",
      num: 2,
      titulo: "Condicionales",
      resumen: "if, else, else if, switch, operador ternario y las trampas típicas de las condiciones.",
      teoria: [
        "if / else if / else para elegir un bloque de código según una condición booleana.",
        "Sin llaves solo se ejecuta la primera sentencia. Usar siempre llaves evita errores al ampliar el código.",
        "switch compara una expresión con valores case; sin break se cae al siguiente caso. default es opcional.",
        "El operador ternario: variable = condicion ? valorSi : valorNo;",
        "Comparar Strings con equals(), no con ==."
      ],
      codigo: [
        `if (nota >= 5) {\n    System.out.println("Aprobado");\n} else {\n    System.out.println("Suspenso");\n}`,
        `switch (dia) {\n    case 1: System.out.println("Lunes"); break;\n    case 2: System.out.println("Martes"); break;\n    default: System.out.println("Otro");\n}`
      ],
      ejercicios: [
        { titulo: "Par o impar", texto: "Indicar si un número es par o impar." },
        { titulo: "División con verificación", texto: "Dividir dos números sin dividir entre cero." },
        { titulo: "Autenticación", texto: "Comprobar usuario y contraseña concretos." },
        { titulo: "Comprobar mayúsculas", texto: "Indicar si una cadena está completamente en mayúsculas." },
        { titulo: "Cálculo de potencia", texto: "Potencia con exponente positivo, cero y negativo." },
        { titulo: "Ordenar tres números", texto: "Mostrar tres números de mayor a menor." },
        { titulo: "Tipo de triángulo", texto: "Rectángulo, isósceles, equilátero o escaleno." },
        { titulo: "Año bisiesto", texto: "Divisible por 4 pero no por 100, salvo si es divisible por 400." },
        { titulo: "Costo del viaje escolar", texto: "Coste por alumno y coste del autobús según el número de alumnos." },
        { titulo: "Cobro de llamada", texto: "Coste de una llamada según tramos de minutos." },
        { titulo: "Día de la semana", texto: "Traducir un número 1-7 al nombre del día." },
        { titulo: "Días del mes", texto: "Número de días de un mes (febrero = 28)." },
        { titulo: "Envío internacional", texto: "Menú de zonas, tarifa por gramo y rechazo si supera 5 kg." }
      ]
    },
    {
      id: "bucles",
      num: 3,
      titulo: "Bucles",
      resumen: "while, do-while, for, break, continue, bucles anidados y control de iteraciones.",
      teoria: [
        "while evalúa la condición antes; do-while la evalúa después y ejecuta al menos una vez.",
        "for agrupa inicialización, condición e incremento. Cuidado con los límites: < frente a <=.",
        "break sale del bucle; continue salta a la siguiente iteración.",
        "En bucles anidados, el interno se ejecuta completo por cada vuelta del externo.",
        "Un bucle sin condición de salida se queda colgado: planificar siempre la condición."
      ],
      codigo: [
        `for (int i = 1; i <= 10; i++) {\n    System.out.println(i * 2);\n}`,
        `int j = 10;\ndo {\n    System.out.print(j);\n    j -= 2;\n} while (j > 0);`
      ],
      ejercicios: [
        { titulo: "Factorial", texto: "Calcular n! con un bucle." },
        { titulo: "Suma y media hasta cero", texto: "Leer números hasta introducir 0 y mostrar suma y media." },
        { titulo: "Adivina el número", texto: "Número aleatorio 1-100 con 10 intentos y pistas mayor/menor." },
        { titulo: "Positivos, negativos y ceros", texto: "Contar cuántos números son mayores, menores o iguales a 0." },
        { titulo: "Comprobador de vocales", texto: "Leer caracteres hasta un espacio e indicar si son vocales." },
        { titulo: "Pares entre dos valores", texto: "Mostrar los pares entre dos números, incluidos los extremos." },
        { titulo: "Tabla de multiplicar", texto: "Tabla del 1 al 10 de un número." },
        { titulo: "Intervalo y estadísticas", texto: "Suma dentro del intervalo y cantidad fuera de él, hasta introducir 0." },
        { titulo: "Números primos", texto: "Determinar si un número es primo." },
        { titulo: "Media de N números", texto: "Pedir cuántos números habrá y calcular su media." },
        { titulo: "Contador de dígitos", texto: "Contar dígitos dividiendo entre 10 en un bucle." },
        { titulo: "MCD con Euclides", texto: "Máximo común divisor con un bucle de divisiones sucesivas." },
        { titulo: "Triángulo de asteriscos", texto: "Imprimir un triángulo de N filas." },
        { titulo: "Tablas con bucles anidados", texto: "Tablas del 1 al 10 con dos bucles anidados." },
        { titulo: "Pirámide de números", texto: "Imprimir 1, 12, 123... hasta N." },
        { titulo: "Rectángulo con asteriscos", texto: "Dibujar un rectángulo de altura y anchura dadas." }
      ]
    },
    {
      id: "metodos",
      num: 4,
      titulo: "Métodos y recursividad",
      resumen: "Declaración, parámetros, paso por valor, variables locales y globales, sobrecarga, pila de llamadas y recursión.",
      teoria: [
        "Cabecera: acceso, static, tipo de retorno, nombre y parámetros. El cuerpo se ejecuta al invocarlo.",
        "En Java los parámetros se pasan por valor: el método recibe una copia de la variable.",
        "Sobrecarga: mismo nombre con distinta lista de parámetros (el tipo de retorno no basta).",
        "Un método recursivo se llama a sí mismo con un caso base que detiene la recursión y un caso general que se acerca a él.",
        "La pila de llamadas guarda los registros de activación de cada invocación."
      ],
      codigo: [
        `static int factorial(int n) {\n    if (n == 0) return 1;      // caso base\n    return n * factorial(n - 1); // caso general\n}`
      ],
      ejercicios: [
        { titulo: "Saludo", texto: "Método que muestra un saludo para un nombre." },
        { titulo: "Cubo", texto: "Método que calcula el cubo de un entero." },
        { titulo: "Tabla con método multiplicar", texto: "Reutilizar un método multiplicar para mostrar una tabla." },
        { titulo: "Es par", texto: "Método que indica si un número es par." },
        { titulo: "Menú de N opciones", texto: "Método que muestra un menú y la opción de salir." },
        { titulo: "Cuadrado y figura sin relleno", texto: "Método que dibuja un cuadrado de asteriscos, y otro sin relleno." },
        { titulo: "Triángulo rectángulo", texto: "Dibujar un triángulo rectángulo, con y sin relleno." },
        { titulo: "Menú de figuras", texto: "Menú con una opción por figura y salir." },
        { titulo: "Dígitos de un número (recursivo)", texto: "Cantidad de dígitos de N > 0 con recursión." },
        { titulo: "Potencia (recursivo)", texto: "Elevar un número positivo a otro con recursión." },
        { titulo: "Invertir un número (recursivo)", texto: "Imprimir un número positivo invertido." },
        { titulo: "Es binario (recursivo)", texto: "Comprobar que un número solo tiene ceros y unos." },
        { titulo: "Convertir a binario (recursivo)", texto: "Obtener el binario de un número N." },
        { titulo: "Palabra ordenada (recursivo)", texto: "Comprobar si una palabra está en orden alfabético." },
        { titulo: "Suma 1..N (recursivo)", texto: "Sumar 1 hasta N imprimiendo la cadena, por ejemplo 1+2+3+4 = 10." }
      ]
    },
    {
      id: "strings",
      num: 5,
      titulo: "Cadenas y expresiones regulares",
      resumen: "Métodos de String, manipulación de caracteres, split y regex con Pattern y Matcher.",
      teoria: [
        "String es inmutable: los métodos devuelven una cadena nueva.",
        "Comparación: equals() o equalsIgnoreCase(). compareTo() ordena lexicográficamente.",
        "split(regex) divide una cadena; matches(regex) valida toda la cadena; find() busca dentro.",
        "En Java las barras se escriben doble: \\\\d, \\\\s, \\\\b.",
        "Cuantificadores: * (0 o más), + (1 o más), ? (0 o 1), {n,m}.",
        "Ejemplo de email: ^[\\\\w.-]+@[A-Za-z0-9]+(\\\\.[A-Za-z]{2,})$"
      ],
      codigo: [
        `String[] partes = "a;b;c".split(";");\nboolean ok = "12345".matches("\\\\d{5}");`
      ],
      ejercicios: [
        { titulo: "Contar una letra", texto: "Contar cuántas veces aparece un carácter en una palabra." },
        { titulo: "Carácter presente", texto: "Verificar si un carácter está en una cadena." },
        { titulo: "Invertir una cadena", texto: "Invertir sin StringBuilder.reverse()." },
        { titulo: "Reemplazar vocales", texto: "Sustituir las vocales por un símbolo." },
        { titulo: "Palíndromo", texto: "Comprobar si una palabra se lee igual al derecho y al revés." },
        { titulo: "Letras separadas", texto: "Escribir las letras de una palabra separadas por espacios." },
        { titulo: "Palabra más larga", texto: "Leer 5 palabras y mostrar la de mayor longitud." },
        { titulo: "Contar palabras", texto: "Contar palabras usando solo charAt, trim y length." },
        { titulo: "Palíndromo (teclado)", texto: "Leer una palabra e indicar si es palíndromo." },
        { titulo: "Regex: NIF", texto: "Validar 8 cifras, un guion y una letra." },
        { titulo: "Regex: fecha dd/mm/aaaa", texto: "Comprobar el formato de una fecha." },
        { titulo: "Regex: contraseña", texto: "Validar una contraseña con reglas de longitud y caracteres." },
        { titulo: "Split por separadores", texto: "Dividir una cadena con distintos separadores usando una regex." }
      ]
    },
    {
      id: "arrays1d",
      num: 6,
      titulo: "Arrays unidimensionales",
      resumen: "Declaración, recorrido, inicialización, copia, clonación, ordenación y búsqueda binaria.",
      teoria: [
        "Un array tiene tamaño fijo y elementos del mismo tipo. Índices de 0 a length - 1.",
        "Valores por defecto: 0, false, '\\u0000' o null según el tipo.",
        "Los arrays son objetos: asignar un array a otra variable copia la referencia, no los datos. Usar clone() o System.arraycopy().",
        "Arrays.toString(), Arrays.sort(), Arrays.fill(), Arrays.copyOf(), Arrays.copyOfRange(), Arrays.equals(), Arrays.binarySearch().",
        "Burbuja: O(n^2). Quicksort: O(n log n) de media. Búsqueda binaria: solo sobre arrays ordenados.",
        "Varargs: int... nums se trata como un array dentro del método."
      ],
      codigo: [
        `int[] copia = original.clone();\nint[] sub = Arrays.copyOfRange(arr, 1, 4);\nArrays.sort(arr);`
      ],
      ejercicios: [
        { titulo: "Rellenar con números del usuario", texto: "Método que devuelve un array de tamaño n con valores introducidos." },
        { titulo: "Array aleatorio", texto: "Array de tamaño n con valores entre 1 y 1000." },
        { titulo: "Media", texto: "Media de los elementos de un array." },
        { titulo: "Cuántos >= media", texto: "Contar elementos iguales o mayores que la media." },
        { titulo: "Buscar posición", texto: "Devolver la posición de un elemento o -1." },
        { titulo: "Factoriales del 1 al 20", texto: "Rellenar un array con factoriales (usar long o BigInteger)." },
        { titulo: "Existe el elemento", texto: "Devolver true o false según esté el número." },
        { titulo: "Leer 10 números distintos", texto: "Ignorar repetidos hasta tener 10 valores distintos." },
        { titulo: "Parámetros de la línea de comandos", texto: "Imprimir los args recibidos." },
        { titulo: "Invertir un array", texto: "Devolver el array en orden inverso." },
        { titulo: "Es incremental", texto: "Comprobar si a[i-1] <= a[i] para todo i." },
        { titulo: "Es montaña", texto: "Subir hasta un máximo y después solo bajar." },
        { titulo: "Binario a decimal", texto: "Convertir un array de 0 y 1 a su valor decimal." },
        { titulo: "Concatenar dos arrays", texto: "Nuevo array con los elementos de ambos." },
        { titulo: "Mitad de cada array", texto: "Primera mitad del primero y segunda mitad del segundo." },
        { titulo: "Cuadrados in situ", texto: "Modificar el array elevando cada elemento al cuadrado." },
        { titulo: "Hotel con menú", texto: "Check-in, check-out, disponibles y ocupadas con n habitaciones (args)." },
        { titulo: "Contar apariciones", texto: "Veces que aparece un número en el array." }
      ]
    },
    {
      id: "arrays2d",
      num: 7,
      titulo: "Arrays bidimensionales (matrices)",
      resumen: "Matrices regulares e irregulares, recorridos, operaciones matemáticas y dibujo con bordes Unicode.",
      teoria: [
        "int[][] m = new int[filas][columnas]; m.length es el número de filas y m[i].length el de columnas de la fila i.",
        "Recorrido con dos bucles anidados: el externo por filas, el interno por columnas.",
        "Matrices irregulares: cada fila puede tener un tamaño distinto (new int[4][] y luego asignar cada fila).",
        "Un for-each anidado recorre una matriz sin índices.",
        "Matriz identidad, transpuesta (cambiar filas por columnas), simétrica (igual a su transpuesta), multiplicación (columnas de A = filas de B)."
      ],
      codigo: [
        `int[][] m = {{1, 2, 3}, {4, 5, 6}};\nfor (int[] fila : m) {\n    System.out.println(Arrays.toString(fila));\n}`
      ],
      ejercicios: [
        { titulo: "Pintar una matriz", texto: "Mostrar la matriz de forma organizada." },
        { titulo: "Máximo de una matriz", texto: "Devolver el valor máximo." },
        { titulo: "Suma de elementos", texto: "Suma de todos los elementos." },
        { titulo: "Suma de cada fila", texto: "Array con la suma de cada fila." },
        { titulo: "Media de cada fila (n x n)", texto: "Array con la media de cada fila." },
        { titulo: "Contar ceros", texto: "Contar los ceros de una matriz dispersa." },
        { titulo: "Contar apariciones en matriz", texto: "Veces que aparece un número." },
        { titulo: "Es identidad", texto: "Comprobar si es identidad." },
        { titulo: "Crear identidad n x n", texto: "Devolver la matriz identidad de tamaño n." },
        { titulo: "Suma de diagonales", texto: "Suma de la diagonal principal y de la secundaria." },
        { titulo: "Transpuesta", texto: "Devolver la matriz transpuesta." },
        { titulo: "Es simétrica", texto: "Comprobar si una matriz es igual a su transpuesta." },
        { titulo: "And de los or por filas", texto: "Booleanos: or por fila y and de los resultados." },
        { titulo: "Matriz aleatoria n x n", texto: "Valores entre 1 y 100." },
        { titulo: "Matriz introducida por el usuario", texto: "Leer n x n valores desde teclado." },
        { titulo: "Matriz de booleanos con m trues", texto: "n x n con exactamente m valores true." },
        { titulo: "Multiplicar matrices", texto: "Producto de dos matrices comprobando dimensiones." },
        { titulo: "Rotar 90 grados", texto: "Rotar una matriz cuadrada en sentido horario." },
        { titulo: "Hundir la flota", texto: "Juego con n x n intentos de n x n / 3 para hundir los barcos." },
        { titulo: "Matriz con filas máximas", texto: "Comparar dos matrices elemento a elemento y devolver el máximo (versión irregular incluida)." },
        { titulo: "Bordes Unicode", texto: "Imprimir títulos, arrays y matrices irregulares dentro de rectángulos de caracteres." }
      ]
    },
    {
      id: "poo",
      num: 8,
      titulo: "Introducción a la POO y enumerados",
      resumen: "Clases, objetos, atributos, métodos, constructores, this, static, final, UML, encapsulación y enum.",
      teoria: [
        "Clase = molde. Objeto = instancia. Atributos = estado; métodos = comportamiento; mensajes = llamadas entre objetos.",
        "Constructor: mismo nombre que la clase, sin tipo de retorno. Se puede sobrecargar.",
        "private oculta los atributos; se accede con getters y setters. public expone; protected lo ve el paquete y las subclases.",
        "this referencia al objeto actual. Puede llamar a otro constructor con this(...) en la primera línea.",
        "static pertenece a la clase (una copia compartida). Un método static no puede usar this ni atributos no estáticos.",
        "Enum: conjunto cerrado de constantes. Puede tener atributos, constructor privado y métodos. values(), name(), ordinal(), valueOf().",
        "Los objetos se pasan por referencia; los primitivos por valor. Las clases inmutables no tienen setters, tienen campos final y devuelven copias.",
        "UML: asociación, agregación (rombo blanco), composición (rombo negro) y cardinalidades 1, 0..1, 1..*, *."
      ],
      codigo: [
        `public enum Demarcacion { PORTERO, DEFENSA, CENTROCAMPISTA, DELANTERO }\n\npublic class Contador {\n    private static int total = 0;\n    private final int id;\n    public Contador() { id = ++total; }\n}`
      ],
      ejercicios: [
        { titulo: "Clase Empleado con IRPF", texto: "Atributos, constructor, getters/setters, mostrarInformacion y calcularIRPF por tramos." },
        { titulo: "Clase Punto2D", texto: "Constructores, sumar y multiplicarPorEscalar." },
        { titulo: "Clase Linea2D", texto: "Longitud, pendiente, paralelas y desplazar." },
        { titulo: "Clase Vector", texto: "Magnitud, suma, escalar y perpendiculares para n dimensiones." },
        { titulo: "Clase Círculo", texto: "Área, perímetro, desplazar, distancia al centro y si un punto es interior." },
        { titulo: "Clase Intervalo", texto: "Límites válidos, longitud, unión, inclusión y desplazamiento." },
        { titulo: "Clase Fracción", texto: "Constructores, operaciones, simplificación con MCD y equivalencia." },
        { titulo: "Clase Carta (baraja)", texto: "Palo como enum, toString con figuras, esFigura y esSuperiorA." },
        { titulo: "Clase Pokemon", texto: "Subir de nivel, curar, atacar con ventaja de tipo y estaDebilitado." },
        { titulo: "Clase EntrenadorPokemon", texto: "Equipo de hasta 6, visitar centro, eliminar, contar por tipo y entrenar (50%)." },
        { titulo: "Clase EmpleadoTech", texto: "Sueldo neto, supervisores en cadena y subida de sueldo con aumento al supervisor." },
        { titulo: "Clase Hotel", texto: "Habitaciones como array de Huesped (clase interna), check-in y check-out con facturación." },
        { titulo: "Inventario de productos (Mercatrola)", texto: "Producto, perecedero y electrónico con main que prueba vender, reponer y garantía." },
        { titulo: "Biblioteca IES La Arboleda", texto: "Material bibliográfico con prestar y devolver; libros y revistas." },
        { titulo: "Autos de Hoy", texto: "Vehículos con equals por matrícula y toString; coches y motos." },
        { titulo: "Grimorio de hechizos", texto: "Hechizos elementales, de magia blanca y negra, con cast y filtros y estadísticas." }
      ]
    },
    {
      id: "herencia",
      num: 9,
      titulo: "Herencia, interfaces y clases abstractas",
      resumen: "extends, super, sobrescritura, polimorfismo, Object, equals y hashCode, clases abstractas e interfaces.",
      teoria: [
        "extends hereda atributos y métodos no privados. Una clase solo puede heredar de una; se pueden encadenar niveles.",
        "super(...) llama al constructor del padre (debe ir primera). super.metodo() reutiliza la versión del padre.",
        "Sobrescritura: mismo nombre, parámetros y tipo de retorno. Usar @Override.",
        "Polimorfismo: tratar objetos hijos como su clase padre; el método que se ejecuta depende del objeto real.",
        "Todas las clases heredan de Object: toString(), equals(), hashCode().",
        "equals() y hashCode() deben ser coherentes: si equals es true, el hash debe ser igual. Necesarios para HashSet o HashMap.",
        "Clase abstracta: no se instancia; puede tener métodos abstractos (sin cuerpo) que las hijas implementan.",
        "Interfaz: contrato de métodos públicos y abstractos (y constantes). Una clase puede implementar varias. Desde Java 8 admite métodos default.",
        "Clase abstracta: puede tener atributos y constructores; interfaz: solo contrato. Usar interfaces para la 'herencia múltiple' de comportamientos."
      ],
      codigo: [
        `public class Estudiante extends Persona {\n    private int creditos;\n    public Estudiante(String n, int e) {\n        super(n, e);\n        creditos = 60;\n    }\n    @Override\n    public String toString() { return super.toString() + " Cred: " + creditos; }\n}`
      ],
      ejercicios: [
        { titulo: "Gestión de vehículos (camión y autobús)", texto: "Clase abstracta Vehiculo con calcularCostoDeUso; Camion y Autobus con su costo." },
        { titulo: "Gestión de empleados", texto: "Empleado con salario; EmpleadoTiempoCompleto (bono de antigüedad) y EmpleadoPorHoras." },
        { titulo: "Figuras geométricas", texto: "Interfaz FiguraGeometrica implementada por Círculo, Rectángulo y Triángulo." },
        { titulo: "Gestión de productos", texto: "Interfaz Producto, clase abstracta ProductoBase, Electronico y Alimento Comparables por precio." },
        { titulo: "Vehículos de batalla", texto: "Tanque, Avión y Barco con ataque y gestión (anyade, ataca, obten, elimina) y métodos static de reparar y eliminar destruidos." },
        { titulo: "Marrones y mazmorras", texto: "Caballeros, magos (blancos y oscuros) y orcos con attack(Warrior) y gestión de equipos de hasta 5." },
        { titulo: "Inventario Mercatrola (herencia)", texto: "Producto base, perecedero y electrónico; main con lista polimórfica." },
        { titulo: "Biblioteca digital", texto: "MaterialBibliografico con Libro y Revista; prestar y devolver con mensajes." },
        { titulo: "Coches y motos", texto: "Vehiculo con equals por matrícula; Coche y Moto con toString específico." },
        { titulo: "Sucursal bancaria", texto: "Cuentas CC, CV y FI con reglas de ingreso y retiro, y excepciones de usuario." },
        { titulo: "Punto, Triángulo y Figura2D", texto: "Clase abstracta Figura2D, Triangulo con perímetro, tipo y toString redondeado." }
      ]
    },
    {
      id: "excepciones",
      num: 10,
      titulo: "Excepciones",
      resumen: "try, catch, finally, throw, throws y excepciones personalizadas, verificadas y no verificadas.",
      teoria: [
        "Throwable tiene dos ramas: Error (graves, no se capturan) y Exception.",
        "Verificadas (checked): heredan de Exception; obligan a try-catch o a declarar throws. Ej.: IOException.",
        "No verificadas (unchecked): heredan de RuntimeException. Ej.: ArithmeticException, NullPointerException.",
        "finally se ejecuta siempre (tras try, tras catch o antes de propagar).",
        "throw lanza una excepción; throws la declara en la cabecera del método para propagarla.",
        "Excepción de usuario: clase que extiende Exception (verificada) o RuntimeException (no verificada)."
      ],
      codigo: [
        `try {\n    int n = Integer.parseInt(texto);\n} catch (NumberFormatException e) {\n    System.out.println("Formato no válido");\n} finally {\n    System.out.println("Fin");\n}`
      ],
      ejercicios: [
        { titulo: "División con excepciones", texto: "Capturar InputMismatchException y ArithmeticException, reintentar y usar try-with-resources con Scanner." },
        { titulo: "Raíz cuadrada", texto: "Excepción personalizada NumeroNegativoException y reintento hasta valor válido." },
        { titulo: "Registro de usuarios", texto: "Excepciones NombreInvalido, EdadInvalida y CorreoInvalido." },
        { titulo: "Biblioteca con préstamos", texto: "Interfaz Prestable y excepciones MaterialDuplicado, MaterialNoEncontrado, MaterialYaPrestado y MaterialNoPrestado; menú." },
        { titulo: "Gestión hotelera", texto: "Interfaz Reservable, excepciones HabitacionDuplicada, HabitacionOcupada, ReservaNoEncontrada, ClienteDuplicado y menú." }
      ]
    },
    {
      id: "genericos",
      num: 11,
      titulo: "Tipos genéricos",
      resumen: "Clases, interfaces y métodos genéricos; restricciones con extends y limitaciones del borrado de tipos.",
      teoria: [
        "Un parámetro de tipo <T> permite que una clase o método trabaje con cualquier tipo, comprobado en compilación.",
        "Clase genérica: public class Caja<T> { private T contenido; ... }. Al usarla: Caja<String> c = new Caja<>();",
        "Métodos genéricos: public static <T> int buscar(T[] array, T e). El tipo se declara antes del tipo de retorno.",
        "Varios parámetros: Par<K, V>.",
        "Restricciones: <T extends Number> o <T extends Comparable<T>> para poder usar sus métodos.",
        "Limitaciones: no tipos primitivos (usar Integer), no new T(), y el borrado de tipos elimina la información genérica en tiempo de ejecución."
      ],
      codigo: [
        `public class Comparador<T extends Comparable<T>> {\n    private T a, b;\n    public Comparador(T a, T b) { this.a = a; this.b = b; }\n    public T mayor() { return a.compareTo(b) > 0 ? a : b; }\n}`
      ],
      ejercicios: []
    },
    {
      id: "colecciones",
      num: 12,
      titulo: "Estructuras de datos y colecciones",
      resumen: "Pilas, colas, listas enlazadas, árboles, grafos, tablas hash y el Java Collections Framework (List, Set, Map, Queue, Iterator, Comparable, Comparator).",
      teoria: [
        "Pila (LIFO): push, pop, peek. Cola (FIFO): enqueue/offer, dequeue/poll, peek.",
        "Lista enlazada: nodos con dato y referencia al siguiente. Acceso por índice O(n); inserción al principio O(1).",
        "ArrayList: array dinámico, acceso por índice O(1), inserción en medio O(n). LinkedList: lista doblemente enlazada que también es Queue y Deque.",
        "Set: sin duplicados. HashSet (sin orden, O(1) medio), LinkedHashSet (orden de inserción), TreeSet (ordenado, O(log n), no admite null). Necesita equals y hashCode, o compareTo en TreeSet.",
        "Map: pares clave-valor con claves únicas. HashMap, LinkedHashMap, TreeMap (ordenado por clave, métodos firstKey, floorKey, headMap...).",
        "Iterator: next(), hasNext(), remove(). Evita ConcurrentModificationException al borrar mientras se recorre.",
        "Comparable<T> define el orden natural (compareTo). Comparator<T> define un orden externo (compare); se pasa a sort o al constructor de TreeSet.",
        "Árboles binarios de búsqueda: operaciones O(log n) solo si están equilibrados. Tablas hash: O(1) medio, con colisiones en buckets."
      ],
      codigo: [
        `Map<String, Integer> cuenta = new HashMap<>();\ncuenta.put(palabra, cuenta.getOrDefault(palabra, 0) + 1);\n\nList<Alumno> lista = new ArrayList<>();\nCollections.sort(lista, new AlumnoPorEdadComparator());`
      ],
      ejercicios: [
        { titulo: "Paréntesis balanceados", texto: "Comprobar que cada apertura tiene su cierre en orden, usando una pila." },
        { titulo: "Evaluar postfija", texto: "Evaluar una expresión en notación postfija con una pila." },
        { titulo: "Infija a postfija", texto: "Convertir una expresión infija a postfija (Shunting-Yard)." },
        { titulo: "Editor con undo y redo", texto: "Historial de N cambios con deshacer y rehacer." },
        { titulo: "Planificador Round Robin", texto: "Cola de procesos con quantum fijo, estado de la cola." },
        { titulo: "Planificador por prioridades", texto: "PriorityQueue de procesos por prioridad con FIFO en empates." },
        { titulo: "Gestión de estudiantes", texto: "Añadir estudiantes y ordenar por NIA, apellidos y nota media con Comparator." },
        { titulo: "Eliminar duplicados con Set", texto: "Lista con duplicados: mostrar sin duplicados y cuántos había." },
        { titulo: "Palabras únicas en orden", texto: "Extraer palabras sin repetir en orden de aparición." },
        { titulo: "Operaciones de conjuntos", texto: "Unión, intersección, diferencia, diferencia simétrica, igualdad y subconjunto." },
        { titulo: "Gestión de eventos", texto: "Sin duplicados (misma fecha y lugar), ordenar, buscar por rango, eliminar, próximo y por prioridad." },
        { titulo: "Frecuencia de palabras", texto: "Contar palabras; ordenar alfabéticamente y por frecuencia; N más frecuentes." },
        { titulo: "Frecuencia de letras por palabra", texto: "Mapa de letras y frecuencias para cada palabra." },
        { titulo: "Inventario con stock bajo", texto: "Agregar, vender, mostrar ordenado, stock bajo (<5) y eliminar agotados." },
        { titulo: "Notas de estudiantes", texto: "Estudiantes con notas por asignatura, medias, mejor y peor, y eliminar." },
        { titulo: "Supermercado con facturas", texto: "Productos, clientes y facturas con IVA 21% y factura detallada." },
        { titulo: "Gestor de tareas por día", texto: "Tareas por día en orden de llegada, procesar, contar, día más próximo." },
        { titulo: "ListaEnlazada: invertir, eliminar duplicados, ordenar (bubble sort), N últimos, máximo, concatenar, clonar", texto: "Métodos sobre la lista enlazada propia sin estructuras adicionales." },
        { titulo: "ArrayStack: remove, contains, reverse, merge y Torres de Hanoi", texto: "Pila sobre array con operaciones adicionales y clase TorresDeHanoi<T> con excepciones." },
        { titulo: "LinkedListQueue: clear, merge, equals, interleave y central telefónica", texto: "Cola enlazada con tres colas de prioridad para llamadas de emergencia." }
      ]
    },
    {
      id: "funcional",
      num: 13,
      titulo: "Programación funcional",
      resumen: "Lambdas, interfaces funcionales, Streams (filter, map, reduce, collect), Optional, composición y method reference.",
      teoria: [
        "Lambda: (parámetros) -> expresión o bloque. Solo donde se espera una interfaz funcional (un único método abstracto).",
        "Interfaces de java.util.function: Predicate (test), Function (apply), Consumer (accept), Supplier (get), BiFunction.",
        "Stream: secuencia procesada de forma perezosa. Operaciones intermedias (filter, map, distinct, sorted, limit, skip) y terminales (forEach, reduce, count, collect, findFirst, anyMatch, max, min).",
        "Collectors: toList(), toSet(), toMap(), joining(), groupingBy(), partitioningBy().",
        "Optional<T> representa un valor que puede no existir; usar isPresent() y get() con cuidado.",
        "Composición: Function.andThen y compose. Method reference: Clase::metodo.",
        "Variables capturadas por una lambda deben ser effectively final.",
        "Files.lines(path) devuelve un Stream de líneas; usar try-with-resources."
      ],
      codigo: [
        `List<String> nombres = List.of("Ana", "Luis", "Lucía");\nList<String> mayus = nombres.stream()\n    .filter(s -> s.length() > 3)\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());`
      ],
      ejercicios: [
        { titulo: "Análisis Iris: distribución", texto: "Flores por especie, especie con más muestras y si todas tienen la misma cantidad." },
        { titulo: "Análisis Iris: estadísticas generales", texto: "Medias de sépalo y pétalo, pétalo más largo y sépalo más estrecho." },
        { titulo: "Análisis Iris: por especie", texto: "Media del pétalo por especie, flor más grande por especie y pétalo más ancho." },
        { titulo: "Análisis Iris: exploración", texto: "Flores con sépalos más anchos que largos, pétalos mayores que sépalos y más de 5 cm." },
        { titulo: "Análisis Iris con XChart (bonus)", texto: "Gráficos de barras, dispersión y líneas con la librería XChart." },
        { titulo: "Personas mayores de edad desde CSV", texto: "Leer personas.csv con Files.lines, filtrar mayores de edad y mostrar nombres en mayúsculas." }
      ]
    },
    {
      id: "ficheros",
      num: 14,
      titulo: "Ficheros",
      resumen: "java.io y java.nio.file, lectura y escritura de texto y binario, File, serialización y DataStreams.",
      teoria: [
        "java.io trabaja con flujos (FileReader, FileWriter, BufferedReader, BufferedWriter, PrintWriter, Scanner). java.nio.file usa Path, Paths y Files (readAllLines, write, readAllBytes).",
        "FileWriter(ruta, true) añade al final. BufferedWriter.newLine() es multiplataforma.",
        "Con try-with-resources los flujos se cierran solos.",
        "File representa una ruta: exists(), isFile(), isDirectory(), listFiles(), delete(), mkdir(), length().",
        "Binarios: DataOutputStream/DataInputStream para primitivos; leer en el mismo orden en que se escribió.",
        "Serialización: la clase implementa Serializable; ObjectOutputStream.writeObject y ObjectInputStream.readObject (con casting). Los campos transient no se guardan.",
        "Excepciones frecuentes: FileNotFoundException, IOException, EOFException, ClassNotFoundException."
      ],
      codigo: [
        `try (BufferedWriter bw = new BufferedWriter(new FileWriter("salida.txt", true))) {\n    bw.write("Nueva línea");\n    bw.newLine();\n}`,
        `try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("datos.dat"))) {\n    oos.writeObject(lista);\n}`
      ],
      ejercicios: [
        { titulo: "Ficheros existen", texto: "Array de rutas y array de booleanos indicando si existen." },
        { titulo: "Borrar ficheros de 0 bytes", texto: "Eliminar archivos vacíos y directorios vacíos de una ruta." },
        { titulo: "Listar recursivamente", texto: "Listar archivos y carpetas con [F] o [D], incluidos subdirectorios." },
        { titulo: "Buscar por extensión", texto: "Devolver rutas absolutas de los archivos con una extensión." },
        { titulo: "Profundidad máxima", texto: "Calcular la profundidad de subdirectorios." },
        { titulo: "Contar palabra en fichero", texto: "contarPalabraEnFichero sin distinguir mayúsculas." },
        { titulo: "Eliminar palabra en fichero", texto: "Crear fichero_2.txt sin la palabra (regex (?i)\\\\b palabra \\\\b)." },
        { titulo: "Cifrado César", texto: "encriptarFichero y desencriptarFichero con un desplazamiento." },
        { titulo: "Biblioteca con CSV y binario", texto: "Cargar libros.csv sin ISBN duplicados, ordenar por título, buscar, modificar y guardar en biblioteca.dat." },
        { titulo: "Registro de movimientos bancarios", texto: "Movimientos serializables en movimientos.dat con saldo acumulado, listados e ingresos/gastos." },
        { titulo: "Eventos con participantes", texto: "Cargar eventos.txt, registrar participantes en un Set serializado por evento e informe.txt." },
        { titulo: "Cola de llamadas persistente", texto: "Cola con urgentes al principio, atender, consultar y guardar en llamadas.dat." },
        { titulo: "Notas con informe", texto: "Leer notas.txt con medias, máximo, mínimo y estado; ignorar líneas con errores; generar informe.txt." }
      ]
    },
    {
      id: "bbdd",
      num: 15,
      titulo: "Bases de datos con JDBC y MySQL",
      resumen: "Sistemas de ficheros frente a BD, SGBD, instalación de MySQL/MariaDB con XAMPP y conexión desde Java con JDBC.",
      teoria: [
        "Problemas de los ficheros: redundancia, inconsistencia, dependencia de los programas y pocas medidas de integridad y seguridad.",
        "Un SGBD separa datos y aplicaciones: descripción centralizada, vistas, manipulación y control de accesos.",
        "Conexión JDBC: DriverManager.getConnection(url, usuario, contraseña) con url tipo jdbc:mysql://localhost/agenda. Añadir el conector .jar al proyecto.",
        "Statement.executeQuery para SELECT (recorrer con ResultSet.next() y getString()). executeUpdate para INSERT, UPDATE y DELETE.",
        "Cerrar la conexión y gestionar SQLException."
      ],
      codigo: [
        `Connection con = DriverManager.getConnection("jdbc:mysql://localhost/agenda", "root", "");\nStatement st = con.createStatement();\nResultSet rs = st.executeQuery("SELECT nombre, correo FROM contacto");\nwhile (rs.next()) {\n    System.out.println(rs.getString("nombre"));\n}`
      ],
      ejercicios: [
        { titulo: "Consulta de contactos", texto: "Mostrar nombre y correo de la tabla contacto de la base agenda." },
        { titulo: "Insertar contacto", texto: "Insertar un registro con INSERT desde Java." },
        { titulo: "Modificar y borrar contacto", texto: "UPDATE del nombre y DELETE del registro." }
      ]
    }
  ],

  examenes: [
    {
      id: "ex-2eval-2025-03-10",
      titulo: "Examen 2ª evaluación (10/03/2025)",
      ejercicios: [
        { titulo: "LinkedStack<T> y iterabilidad", texto: "Implementar una pila sobre lista enlazada con push, pop, peek e isEmpty; hacer Stack extends Iterable." },
        { titulo: "Sistema de inmobiliaria", texto: "Viviendas, locales y solares con impuestos; comparación por tasación; Inmobiliaria con añadir, añadir varios, eliminar, valor medio y viviendas disponibles." }
      ]
    },
    {
      id: "ex-2eval-2025-03-18",
      titulo: "Examen 2ª evaluación (18/03/2025)",
      ejercicios: [
        { titulo: "ListaEnlazadaSimple: contarElementos, clear y obtenerUltimo", texto: "Métodos sobre la lista enlazada dada (1 + 0.5 + 1 puntos)." },
        { titulo: "Restaurante TropiCroqueta", texto: "Platos (principal y entrante) con alérgenos, cálculo de precio y peligrosidad; GestionRestaurante con carta sin duplicados, cola de cocina con prioridad térmica y estadísticas." }
      ]
    },
    {
      id: "ex-3eval-2025-05-12",
      titulo: "Examen 3ª evaluación (12/05/2025)",
      ejercicios: [
        { titulo: "Catálogo de libros", texto: "Libros por ISBN con HashMap o similar; loadFromCSV, addBook, removeBook, ordenar por año, editoriales sin duplicados, préstamos con historial, último prestado, devolver, buscar por texto a fichero." }
      ]
    },
    {
      id: "ex-3eval-2026-05-25",
      titulo: "Examen 3ª evaluación (25/05/2026)",
      ejercicios: [
        { titulo: "Logística UPS I did it again: lectura de paquetes", texto: "Leer ficheros de un directorio (tarifa por kilo en la primera línea) y crear objetos Paquete (3 puntos)." },
        { titulo: "Informe de envíos", texto: "Generar informe.txt con total, precio medio, peso máximo y fecha de hoy (2.25 puntos)." },
        { titulo: "Guardar urgentes en binario", texto: "Escribir en un fichero binario objeto a objeto solo los paquetes urgentes (2.25 puntos)." },
        { titulo: "Leer el binario", texto: "Leer todos los objetos y cargarlos en una nueva lista, sobrescribiendo datos previos (2.5 puntos)." }
      ]
    },
    {
      id: "ex-ordinaria-2025-05-19",
      titulo: "Convocatoria ordinaria: 2ª y 3ª evaluación (19/05/2025)",
      ejercicios: [
        { titulo: "Sensores del Parque Valdeverde", texto: "Jerarquía de sensores (calidad del aire con cola, temperatura con pila, sísmico sin repetidos), lanzar ReadNotPossibleException, ordenar por batería; CentralDeMonitoreo con carga CSV, eliminar por ID, reparar y agrupar por daño." }
      ]
    },
    {
      id: "ex-1eval-2025-12-01",
      titulo: "Examen 1ª evaluación (01/12/2025)",
      ejercicios: [
        { titulo: "esImPARfecto(int)", texto: "Cifras todas impares y suma par (2.5 puntos)." },
        { titulo: "contarApariciones(String, char)", texto: "Veces que aparece un carácter; 0 si es nulo o vacío (2.5 puntos)." },
        { titulo: "Factura de productos", texto: "Pedir número de productos y precios en array, menú con factura y producto más caro (5 puntos)." }
      ]
    },
    {
      id: "ex-extraordinaria-2023-06-21",
      titulo: "Convocatoria extraordinaria (21/06/2023)",
      ejercicios: [
        { titulo: "Personajes del juego de rol", texto: "Magos, caballeros y orcos con ataques alto, medio y bajo; interfaz de gestión con anyade, ataca, obten y borraPersonaje; método static para resucitar personajes." }
      ]
    }
  ],

  referencia: {
    titulo: "Chuleta de Java y colecciones",
    secciones: [
      { titulo: "Crear colecciones", lineas: [
        "List<Integer> list = new ArrayList<>();",
        "Queue<Double> queue = new LinkedList<>();",
        "Stack<String> stack = new Stack<>();",
        "Set<String> words = new HashSet<>();",
        "Map<String, Integer> counts = new TreeMap<>();"
      ]},
      { titulo: "Métodos comunes (List y Set)", lineas: [
        "add(v), contains(v), remove(v), removeAll(c), retainAll(c), size(), isEmpty(), clear(), equals(c)"
      ]},
      { titulo: "List", lineas: [
        "add(i, v), get(i), set(i, v), remove(i), indexOf(v), lastIndexOf(v), subList(from, to)"
      ]},
      { titulo: "Stack", lineas: ["push(v), pop() y peek() (lanzan EmptyStackException si está vacía)"] },
      { titulo: "Queue", lineas: ["add(v), peek() (null si vacía), remove() (NoSuchElementException si vacía)"] },
      { titulo: "Map", lineas: [
        "put(k, v), get(k), getOrDefault(k, d), containsKey(k), containsValue(v), remove(k), keySet(), values(), entrySet(), putAll(m)"
      ]},
      { titulo: "String", lineas: [
        "charAt(i), contains(s), endsWith(s), startsWith(s), equals(s), equalsIgnoreCase(s), indexOf(s), lastIndexOf(s), length(), substring(i, j), toLowerCase(), toUpperCase(), trim(), replace(a, b), split(regex)"
      ]},
      { titulo: "Random", lineas: ["nextBoolean(), nextDouble(), nextInt(), nextInt(max)"] },
      { titulo: "Arrays", lineas: [
        "binarySearch, equals, deepEquals, fill, copyOf, copyOfRange, sort, parallelSort, compare, toString"
      ]},
      { titulo: "Math", lineas: [
        "round, floor, ceil, sqrt, pow, abs, log, random, sin, cos, tan, PI, E"
      ]}
    ]
  }
};