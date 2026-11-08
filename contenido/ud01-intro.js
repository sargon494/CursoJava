// Unidad 1: enunciados completos y soluciones.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["intro"] = {
  ejercicios: [
    {
      enunciado: "Crea un programa que pida al usuario su nombre y apellido y que imprima un saludo personalizado. Ejemplo: Hola, Juan Pérez. ¡Bienvenido/a!",
      solucion: `import java.util.Scanner;

public class Saludo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nombre: ");
        String nombre = sc.nextLine();
        System.out.print("Apellido: ");
        String apellido = sc.nextLine();
        System.out.println("Hola, " + nombre + " " + apellido + ". ¡Bienvenido/a!");
        sc.close();
    }
}`
    },
    {
      enunciado: "Escribe un programa que pida la base y la altura de un triángulo y calcule e imprima su área con la fórmula (base × altura) / 2.",
      solucion: `import java.util.Scanner;

public class AreaTriangulo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Base: ");
        double base = sc.nextDouble();
        System.out.print("Altura: ");
        double altura = sc.nextDouble();
        double area = base * altura / 2;   // usamos double para evitar la división entera
        System.out.println("Área: " + area);
        sc.close();
    }
}`
    },
    {
      enunciado: "Realiza un programa que pida una temperatura en grados Celsius y la convierta a Fahrenheit con la fórmula F = C × 9/5 + 32.",
      solucion: `import java.util.Scanner;

public class CelsiusFahrenheit {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Grados Celsius: ");
        double c = sc.nextDouble();
        double f = c * 9 / 5 + 32;   // c es double, así que 9/5 no se trunca
        System.out.println(c + " ºC = " + f + " ºF");
        sc.close();
    }
}`
    },
    {
      enunciado: "Crea un programa que pida los dos catetos de un triángulo rectángulo y calcule la hipotenusa con el teorema de Pitágoras.",
      solucion: `import java.util.Scanner;

public class Hipotenusa {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Cateto a: ");
        double a = sc.nextDouble();
        System.out.print("Cateto b: ");
        double b = sc.nextDouble();
        double hipotenusa = Math.sqrt(a * a + b * b);   // equivalente a Math.hypot(a, b)
        System.out.println("Hipotenusa: " + hipotenusa);
        sc.close();
    }
}`
    },
    {
      enunciado: "Escribe un programa que pida tres números enteros, calcule su promedio y lo muestre en pantalla.",
      solucion: `import java.util.Scanner;

public class MediaTres {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Primer número: ");
        int a = sc.nextInt();
        System.out.print("Segundo número: ");
        int b = sc.nextInt();
        System.out.print("Tercer número: ");
        int c = sc.nextInt();
        // 3.0 fuerza división decimal; con (a + b + c) / 3 se perdería la parte decimal
        double media = (a + b + c) / 3.0;
        System.out.println("Media: " + media);
        sc.close();
    }
}`
    },
    {
      enunciado: "Escribe un programa que pida el nombre y los dos apellidos del usuario y muestre sus iniciales.",
      solucion: `import java.util.Scanner;

public class Iniciales {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nombre y apellidos (separados por espacios): ");
        String completo = sc.nextLine().trim();
        String[] partes = completo.split(" ");   // si hay varios espacios seguidos, sobrarían cadenas vacías
        StringBuilder iniciales = new StringBuilder();
        for (String parte : partes) {
            if (!parte.isEmpty()) {
                iniciales.append(parte.charAt(0)).append(".");
            }
        }
        System.out.println("Iniciales: " + iniciales);
        sc.close();
    }
}`
    }
  ],

  // Explicación en profundidad: cada apartado tiene párrafos y, si hace falta, un ejemplo de código.
  explicacion: [
    {
      titulo: "1. Qué es Java y cómo se ejecuta",
      parrafos: [
        "Java es un lenguaje orientado a objetos, de tipado estático y fuertemente tipado. Eso significa que el tipo de cada variable se decide al escribir el programa y el compilador lo comprueba antes de ejecutarlo.",
        "El proceso tiene dos fases. El compilador javac traduce el código fuente (Programa.java) a bytecode (Programa.class), un formato intermedio que no es código de tu máquina. Después, la JVM (Java Virtual Machine) ejecuta ese bytecode, y en la práctica lo traduce a código nativo en tiempo de ejecución con el compilador JIT.",
        "Por eso Java se describe como 'escribe una vez, ejecuta en cualquier sitio': el mismo .class funciona en cualquier sistema que tenga una JVM. La clave está en que la JVM es la que depende del sistema operativo, no tu programa.",
        "Tres siglas que conviene no confundir: JVM ejecuta bytecode; JRE es la JVM más las librerías para ejecutar; JDK es el JRE más las herramientas para desarrollar (javac, javadoc, etc.). Para programar necesitas el JDK. Eclipse es un IDE que usa el JDK por debajo."
      ]
    },
    {
      titulo: "2. Estructura de un programa",
      parrafos: [
        "Todo programa Java vive dentro de una clase. El punto de entrada es el método main con esa firma exacta: public static void main(String[] args). Si la firma no es exacta, la JVM no lo reconoce como inicio del programa.",
        "Una regla que muchos olvidan: si la clase es public, el archivo debe llamarse igual que la clase (una clase public Saludo va en Saludo.java). Java distingue mayúsculas y minúsculas en todo, incluidos los nombres de archivo y los identificadores.",
        "Para mostrar texto hay tres formas: System.out.println (imprime y salta de línea), System.out.print (imprime sin saltar de línea) y System.out.printf (imprime con formato, por ejemplo printf(\"%.2f%n\", x) muestra x con dos decimales)."
      ],
      codigo: `public class Saludo {
    public static void main(String[] args) {
        System.out.println("Hola, mundo");      // imprime y salta de línea
        System.out.print("Sin salto ");          // imprime sin salto
        System.out.printf("Pi = %.2f%n", Math.PI); // formato: Pi = 3.14
    }
}`
    },
    {
      titulo: "3. Variables y tipos primitivos",
      parrafos: [
        "Una variable es un nombre que apunta a un espacio de memoria con un tipo fijo. Declararla es escribir tipo nombre; asignarle valor es nombre = valor; y puedes hacer ambas cosas a la vez.",
        "Los tipos enteros son byte (8 bits), short (16), int (32) y long (64). El más usado es int. Un valor long necesita sufijo L (3000000000L), porque el literal 3000000000 sin sufijo es demasiado grande para int y da error de compilación.",
        "Los decimales son float (32 bits, con sufijo f: 3.14f) y double (64 bits, es el valor por defecto para decimales). Un literal como 3.14 es double; por eso float f = 3.14; no compila.",
        "char guarda un único carácter Unicode entre comillas simples ('A'). boolean solo guarda true o false. String no es un tipo primitivo: es una clase, y sus valores van entre comillas dobles (\"hola\").",
        "Desbordamiento: un int no puede pasar de 2147483647. Si le sumas 1, da la vuelta sin avisar. Es un error silencioso muy típico, así que conviene conocer los rangos."
      ],
      codigo: `int max = Integer.MAX_VALUE;   // 2147483647
System.out.println(max + 1);   // -2147483648 (desbordamiento silencioso)

long grande = 3000000000L;     // necesita la L
float f = 3.14f;               // sin la f, 3.14 sería double
char letra = 'A';
boolean activo = true;
String nombre = "Ana";`
    },
    {
      titulo: "4. Constantes y valores por defecto",
      parrafos: [
        "La palabra final convierte una variable en constante: solo se puede asignar una vez. Por convención, las constantes se escriben en mayúsculas con guiones bajos (MAX_INTENTOS).",
        "Los atributos de clase (no las variables locales dentro de un método) reciben valores por defecto: 0 para los numéricos, '\\u0000' para char, false para boolean y null para cualquier objeto como String. Una variable local, en cambio, no tiene valor por defecto y el compilador exige inicializarla antes de usarla."
      ],
      codigo: `final int MAX_INTENTOS = 3;
// MAX_INTENTOS = 5;   // error: no se puede reasignar una constante`
    },
    {
      titulo: "5. Conversión de tipos: división entera y casting",
      parrafos: [
        "Si operas dos enteros, el resultado es entero: 7 / 2 vale 3, no 3.5. La parte decimal se pierde sin avisar. Para obtener decimales, al menos uno de los operandos debe ser decimal: 7 / 2.0 vale 3.5. Este es uno de los errores más frecuentes en los exámenes.",
        "La conversión implícita (widening) se hace sola cuando no se pierde información: int a double, o int a long. La conversión explícita (casting) se escribe con paréntesis y puede perder datos: (int) 3.99 vale 3.",
        "Cuidado con char: 'a' + 1 vale 98, porque char se trata como número en una suma. Si concatenas con texto, el resultado cambia: \"\" + 'a' + 1 vale \"a1\". Lo que cuenta es el orden de las operaciones y si hay un String a la izquierda."
      ],
      codigo: `System.out.println(7 / 2);        // 3
System.out.println(7 / 2.0);      // 3.5
System.out.println((int) 3.99);   // 3  (el casting trunca, no redondea)
System.out.println('a' + 1);      // 98
System.out.println("" + 'a' + 1); // a1`
    },
    {
      titulo: "6. Operadores",
      parrafos: [
        "Aritméticos: + - * / %. El operador % (resto) es muy útil: n % 2 == 0 indica si n es par.",
        "Incremento: i++ devuelve el valor antes de incrementar, mientras que ++i lo incrementa primero. Dentro de una expresión esto cambia el resultado: int j = i++ y int k = ++i dan valores distintos aunque en ambos casos i aumente.",
        "Asignación compuesta: x += 3 equivale a x = x + 3. Tiene un detalle importante: hace un casting implícito, así que byte b = 10; b += 1; compila, pero b = b + 1; no compila.",
        "Lógicos: && y || usan cortocircuito (si el primer operando decide el resultado, el segundo no se evalúa). ! niega. Relacionales: == != < > <= >=.",
        "Precedencia: primero paréntesis, luego unarios (++, !), después * / %, luego + -, relacionales, igualdad (== !=), && y finalmente ||. Ante la duda, usa paréntesis: hacen el código más claro y evitan errores."
      ],
      codigo: `int i = 5;
int j = i++;   // j = 5, i = 6
int k = ++i;   // i = 7, k = 7

byte b = 10;
b += 1;        // compila (casting implícito)
// b = b + 1;  // error: possible lossy conversion from int to byte

if (x != 0 && 10 / x > 1) { }   // si x es 0, no se evalúa la división`
    },
    {
      titulo: "7. Cadenas: equals frente a ==",
      parrafos: [
        "Un String es un objeto e inmutable: cualquier operación (toUpperCase, concat, substring) devuelve un String nuevo y no modifica el original.",
        "== compara referencias, es decir, si son el mismo objeto en memoria. equals compara el contenido. Para comparar textos siempre debes usar equals (o equalsIgnoreCase). Un == con cadenas puede dar true o false según cómo se crearon, lo que hace los errores difíciles de ver.",
        "Para obtener caracteres y longitud: length() cuenta caracteres y charAt(i) devuelve el carácter en la posición i. Las posiciones empiezan en 0, así que el último carácter es charAt(length() - 1)."
      ],
      codigo: `String a = "hola";
String b = new String("hola");
System.out.println(a == b);        // false: son objetos distintos
System.out.println(a.equals(b));   // true: mismo contenido
System.out.println(a.charAt(0));   // h
System.out.println(a.length());    // 4`
    },
    {
      titulo: "8. Entrada de datos con Scanner",
      parrafos: [
        "Scanner lee de la consola. Se crea una vez con new Scanner(System.in) y conviene cerrarlo al final con close().",
        "nextInt, nextDouble y next leen un token y dejan el salto de línea en el buffer. Si después llamas a nextLine, este devuelve una cadena vacía sin esperar a que el usuario escriba. Es la trampa más conocida de Scanner: la solución habitual es llamar a nextLine una vez extra para consumir el salto de línea pendiente.",
        "nextLine lee una línea completa. Para leer texto con espacios, usa nextLine; para un número, nextInt o nextDouble."
      ],
      codigo: `Scanner sc = new Scanner(System.in);
System.out.print("Edad: ");
int edad = sc.nextInt();
sc.nextLine();                   // consume el salto de línea pendiente
System.out.print("Nombre completo: ");
String nombre = sc.nextLine();   // ahora sí espera la entrada
sc.close();`
    },
    {
      titulo: "9. Errores típicos de esta unidad",
      parrafos: [
        "Olvidar el ; al final de cada instrucción, o usar mayúsculas donde va minúscula (System.Out.println no existe).",
        "Confundir = (asignación) con == (comparación) dentro de un if: if (x = 5) no compila con int; úsalo solo cuando la condición sea boolean.",
        "Dividir enteros esperando decimales, asignar un double a un int sin casting, y comparar Strings con == en lugar de equals.",
        "Intentar usar una variable local antes de inicializarla. El compilador lo detecta, pero el mensaje puede confundir si no sabes que las locales no tienen valor por defecto."
      ]
    }
  ],

  // Autoevaluación: pregunta, opciones, índice de la correcta y explicación de por qué.
  quiz: [
    {
      pregunta: "¿Qué muestra System.out.println(7 / 2)?",
      opciones: ["3.5", "3", "4", "Error de compilación"],
      correcta: 1,
      explicacion: "Dos enteros dividen con división entera: la parte decimal se descarta, así que 7 / 2 vale 3. Para 3.5 necesitas un operando decimal, como 7 / 2.0."
    },
    {
      pregunta: "¿Cuál de estas líneas compila sin error?",
      opciones: ["float f = 3.14;", "long l = 3000000000;", "byte b = 10; b += 1;", "int x = 'ab';"],
      correcta: 2,
      explicacion: "La asignación compuesta += hace un casting implícito, así que compila. float necesita sufijo f, el literal 3000000000 necesita L, y 'ab' no es un carácter válido."
    },
    {
      pregunta: "Si int i = 5; y luego int k = ++i;, ¿cuánto vale k?",
      opciones: ["5", "6", "7", "Depende de la máquina"],
      correcta: 1,
      explicacion: "++i incrementa primero y luego devuelve el valor, así que i pasa a 6 y k recibe 6. Con i++ k valdría 5."
    },
    {
      pregunta: "¿Qué imprime System.out.println(\"\" + 'a' + 1);?",
      opciones: ["98", "a1", "b", "Error"],
      correcta: 1,
      explicacion: "Como el primer operando es un String, la operación es concatenación: \"\" + 'a' da \"a\" y después se añade \"1\". Si no hubiera String al principio, 'a' + 1 sería 98."
    },
    {
      pregunta: "¿Cuál es la forma correcta de comparar dos Strings por contenido?",
      opciones: ["a == b", "a.equals(b)", "a.compareTo == b", "a = b"],
      correcta: 1,
      explicacion: "== compara si son el mismo objeto. equals compara el contenido de los caracteres."
    },
    {
      pregunta: "Tras sc.nextInt() el usuario escribe 25 y pulsa Enter. ¿Qué devuelve sc.nextLine() justo después?",
      opciones: ["\"25\"", "\"\" (cadena vacía)", "Espera a que escriba algo nuevo", "Lanza una excepción siempre"],
      correcta: 1,
      explicacion: "nextInt deja el salto de línea en el buffer. nextLine lo lee y devuelve la cadena vacía sin esperar a una nueva entrada."
    },
    {
      pregunta: "¿Qué ocurre al ejecutar Integer.MAX_VALUE + 1?",
      opciones: ["Da un error en tiempo de ejecución", "Devuelve Integer.MAX_VALUE + 1 como long", "Da la vuelta y resulta -2147483648", "Devuelve 0"],
      correcta: 2,
      explicacion: "Los enteros tienen un rango fijo. Al superar el máximo, el valor da la vuelta al mínimo sin avisar (desbordamiento)."
    },
    {
      pregunta: "¿Qué imprime el siguiente código? int a = 2; System.out.println(a++ + ++a);",
      opciones: ["4", "5", "6", "7"],
      correcta: 2,
      explicacion: "a++ devuelve 2 (y a pasa a 3). ++a incrementa a 4 y devuelve 4. La suma es 2 + 4 = 6."
    }
  ]
};

