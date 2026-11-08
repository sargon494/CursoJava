// Unidad 4: métodos, descomposición y recursividad.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["metodos"] = {
  ejercicios: [
    { enunciado: "Implementa un método saludar(String nombre) que muestre un saludo personalizado. Llámalo desde main con un nombre leído por teclado." },
    { enunciado: "Implementa cubo(int n), que devuelva el cubo de n. Prueba valores positivos, negativos y cero." },
    { enunciado: "Crea multiplicar(int a, int b) y reutilízalo para imprimir la tabla del número que indique el usuario." },
    { enunciado: "Crea esPar(int n), que devuelva true cuando n sea par y false en caso contrario. Úsalo desde main para informar al usuario." },
    { enunciado: "Implementa mostrarMenu(int opciones), que muestre opciones numeradas y la opción 0 para salir. Usa un bucle en main para volver a mostrar el menú." },
    { enunciado: "Implementa métodos para dibujar un cuadrado de asteriscos relleno y otro hueco. Reciben el tamaño como parámetro y validan que sea positivo." },
    { enunciado: "Implementa métodos que dibujen un triángulo rectángulo de asteriscos relleno y otro hueco. Reciben la altura como parámetro." },
    { enunciado: "Crea un menú que permita dibujar un cuadrado, un triángulo o salir. Cada opción debe llamar a su propio método de dibujo." },
    { enunciado: "Implementa recursivamente cantidadDigitos(int n) para n >= 0. El cero tiene una cifra y cada llamada debe acercarse al caso base." },
    { enunciado: "Implementa recursivamente potencia(int base, int exponente) para exponentes no negativos. Define base^0 = 1 y rechaza exponentes negativos." },
    { enunciado: "Implementa recursivamente invertir(int n) para n >= 0, devolviendo las cifras en orden inverso como un entero. Elimina los ceros iniciales que aparecerían en el resultado." },
    { enunciado: "Implementa recursivamente esBinario(int n), que compruebe si la representación decimal de n solo contiene los dígitos 0 y 1." },
    { enunciado: "Implementa recursivamente aBinario(int n) para n >= 0 y devuelve su representación en base 2. El cero debe producir \"0\"." },
    { enunciado: "Implementa recursivamente estaOrdenada(String palabra) para comprobar si los caracteres están en orden alfabético ascendente. Define el resultado para la cadena vacía." },
    { enunciado: "Implementa recursivamente una función que devuelva la expresión \"1+2+...+n = suma\". Para n = 1 debe mostrar \"1 = 1\"." }
  ],

  soluciones: [
    `import java.util.Scanner;

public class SaludoMetodo {
    static void saludar(String nombre) {
        System.out.println("Hola, " + nombre + ". ¡Bienvenido/a!");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nombre: ");
        saludar(sc.nextLine());
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class Cubo {
    static long cubo(int n) {
        return (long) n * n * n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Entero: ");
        int n = sc.nextInt();
        System.out.println("Cubo: " + cubo(n));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class TablaConMetodo {
    static int multiplicar(int a, int b) {
        return a * b;
    }

    static void mostrarTabla(int numero) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(numero + " x " + i + " = " + multiplicar(numero, i));
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        mostrarTabla(sc.nextInt());
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class EsPar {
    static boolean esPar(int n) {
        return n % 2 == 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(esPar(n) ? "Es par" : "Es impar");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class MenuNOpciones {
    static void mostrarMenu(int opciones) {
        for (int i = 1; i <= opciones; i++) {
            System.out.println(i + ". Opción " + i);
        }
        System.out.println("0. Salir");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int opcion;
        do {
            mostrarMenu(4);
            opcion = sc.nextInt();
        } while (opcion != 0);
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class Cuadrados {
    static void dibujarRelleno(int n) {
        for (int fila = 0; fila < n; fila++) {
            for (int col = 0; col < n; col++) System.out.print("*");
            System.out.println();
        }
    }

    static void dibujarHueco(int n) {
        for (int fila = 0; fila < n; fila++) {
            for (int col = 0; col < n; col++) {
                System.out.print(fila == 0 || fila == n - 1 || col == 0 || col == n - 1 ? "*" : " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n <= 0) System.out.println("El tamaño debe ser positivo.");
        else { dibujarRelleno(n); dibujarHueco(n); }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class Triangulos {
    static void dibujarRelleno(int altura) {
        for (int fila = 1; fila <= altura; fila++) {
            for (int col = 1; col <= fila; col++) System.out.print("*");
            System.out.println();
        }
    }

    static void dibujarHueco(int altura) {
        for (int fila = 1; fila <= altura; fila++) {
            for (int col = 1; col <= fila; col++) {
                System.out.print(fila == 1 || fila == altura || col == 1 || col == fila ? "*" : " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int altura = sc.nextInt();
        if (altura <= 0) System.out.println("La altura debe ser positiva.");
        else { dibujarRelleno(altura); dibujarHueco(altura); }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class MenuFiguras {
    static void cuadrado(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) System.out.print("*");
            System.out.println();
        }
    }

    static void triangulo(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) System.out.print("*");
            System.out.println();
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int opcion;
        do {
            System.out.println("1. Cuadrado  2. Triángulo  0. Salir");
            opcion = sc.nextInt();
            if (opcion == 1 || opcion == 2) {
                System.out.print("Tamaño: ");
                int n = sc.nextInt();
                if (n <= 0) System.out.println("El tamaño debe ser positivo.");
                else if (opcion == 1) cuadrado(n);
                else triangulo(n);
            } else if (opcion != 0) {
                System.out.println("Opción no válida.");
            }
        } while (opcion != 0);
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class DigitosRecursivo {
    static int cantidadDigitos(int n) {
        if (n < 10) return 1;
        return 1 + cantidadDigitos(n / 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 0) System.out.println("El número debe ser no negativo.");
        else System.out.println(cantidadDigitos(n));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class PotenciaRecursiva {
    static long potencia(int base, int exponente) {
        if (exponente == 0) return 1;
        return base * potencia(base, exponente - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int base = sc.nextInt();
        int exponente = sc.nextInt();
        if (exponente < 0) System.out.println("El exponente debe ser no negativo.");
        else System.out.println(potencia(base, exponente));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class InvertirNumero {
    static int invertir(int n, int invertido) {
        if (n == 0) return invertido;
        return invertir(n / 10, invertido * 10 + n % 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 0) System.out.println("El número debe ser no negativo.");
        else System.out.println(invertir(n, 0));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class EsBinarioRecursivo {
    static boolean esBinario(int n) {
        if (n < 10) return n == 0 || n == 1;
        int ultimaCifra = n % 10;
        return (ultimaCifra == 0 || ultimaCifra == 1) && esBinario(n / 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(esBinario(n) ? "Solo contiene ceros y unos" : "No es binario");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class DecimalABinario {
    static String aBinario(int n) {
        if (n < 2) return String.valueOf(n);
        return aBinario(n / 2) + (n % 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 0) System.out.println("El número debe ser no negativo.");
        else System.out.println(aBinario(n));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class PalabraOrdenada {
    static boolean estaOrdenada(String palabra, int indice) {
        if (indice >= palabra.length() - 1) return true;
        return palabra.charAt(indice) <= palabra.charAt(indice + 1)
            && estaOrdenada(palabra, indice + 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String palabra = sc.nextLine();
        System.out.println(estaOrdenada(palabra, 0) ? "Ordenada" : "No ordenada");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class SumaRecursiva {
    static String terminos(int n) {
        if (n == 1) return "1";
        return terminos(n - 1) + "+" + n;
    }

    static long suma(int n) {
        if (n == 1) return 1;
        return n + suma(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 1) System.out.println("n debe ser positivo.");
        else System.out.println(terminos(n) + " = " + suma(n));
        sc.close();
    }
}`
  ],

  explicacion: [
    {
      titulo: "1. Un método pone nombre a una tarea",
      parrafos: [
        "Un método agrupa instrucciones que realizan una tarea concreta. Dividir el problema en métodos reduce la repetición, hace que cada pieza tenga un propósito fácil de nombrar y permite probarla por separado. Un buen método suele responder a una sola pregunta: calcular un cubo, validar una edad o mostrar una figura.",
        "La cabecera describe quién puede usarlo, si pertenece a la clase o a un objeto, qué devuelve, cómo se llama y qué datos necesita. Los parámetros son entradas locales al método; el tipo de retorno indica qué valor produce. void significa que no devuelve un valor.",
        "Llamar a un método ejecuta su cuerpo y luego regresa al punto desde el que se llamó. Si devuelve un resultado, la llamada puede usarse en una expresión o guardarse en una variable."
      ],
      codigo: `static int sumar(int a, int b) {
    return a + b;
}

int total = sumar(4, 7); // la llamada devuelve 11`
    },
    {
      titulo: "2. Parámetros, return y tipos",
      parrafos: [
        "Cada argumento debe ser compatible con el parámetro correspondiente y el orden importa. El compilador detecta un número incorrecto de argumentos o un tipo incompatible antes de ejecutar el programa.",
        "En un método que devuelve un tipo distinto de void, todos los caminos posibles deben terminar devolviendo un valor del tipo indicado. return termina la ejecución del método inmediatamente; el código que aparezca después de un return incondicional no se ejecutará.",
        "Java pasa todos los argumentos por valor. Para un primitivo se copia el valor. Para un objeto se copia el valor de la referencia: el método puede cambiar el estado del objeto al que apunta, pero reasignar la copia de la referencia no sustituye la variable del llamador."
      ],
      codigo: `static void incrementar(int valor) {
    valor++;
}

int numero = 5;
incrementar(numero);
System.out.println(numero); // sigue siendo 5`
    },
    {
      titulo: "3. Ámbito y variables locales",
      parrafos: [
        "Una variable local existe dentro del bloque donde se declara. Dos métodos pueden tener variables locales con el mismo nombre: son variables distintas. Las variables locales no reciben un valor automático; hay que asignarles uno antes de leerlas.",
        "Una variable declarada dentro de un for normalmente deja de existir al salir del bucle. Mantén cada dato en el ámbito más pequeño que le permita cumplir su función: reduce modificaciones accidentales y facilita entender de dónde viene su valor.",
        "Los campos de objeto guardan estado entre llamadas y reciben valores por defecto; no son lo mismo que las variables locales. Si un cálculo solo necesita resultados temporales, suele pertenecer a un método y no a un atributo compartido."
      ],
      codigo: `for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
// i ya no está disponible aquí`
    },
    {
      titulo: "4. Métodos static y métodos de instancia",
      parrafos: [
        "Un método static pertenece a la clase y puede invocarse sin crear un objeto. Es apropiado para cálculos que dependen solo de sus parámetros, como esPar(n). Un método de instancia opera sobre un objeto concreto y puede usar el estado de ese objeto mediante this.",
        "Como static no tiene un objeto actual, no puede usar this ni acceder directamente a campos de instancia. main es static, por eso llama directamente a otros métodos static o primero crea un objeto para usar métodos de instancia.",
        "No conviertas todo en static por comodidad. Si una operación describe el comportamiento o consulta el estado de un objeto, mantenerla como método de instancia expresa mejor el diseño."
      ],
      codigo: `static boolean esPar(int n) {
    return n % 2 == 0; // no necesita estado de un objeto
}`
    },
    {
      titulo: "5. Sobrecarga y contratos claros",
      parrafos: [
        "La sobrecarga permite declarar varios métodos con el mismo nombre si sus listas de parámetros son diferentes en número, tipos u orden. El compilador selecciona la versión compatible con los argumentos de la llamada.",
        "Cambiar solo el tipo de retorno no crea una sobrecarga: sumar(int, int) no puede declararse dos veces, una devolviendo int y otra double. El tipo de retorno no basta para decidir qué método se está llamando.",
        "Los nombres de parámetros y el tipo de retorno forman parte de un contrato. Para cada método, anota mentalmente qué entradas admite, qué devuelve, qué modifica y qué ocurre con valores límite."
      ],
      codigo: `static int maximo(int a, int b) {
    return a > b ? a : b;
}

static double maximo(double a, double b) {
    return a > b ? a : b;
}`
    },
    {
      titulo: "6. Recursividad: dividir una tarea en una versión más pequeña",
      parrafos: [
        "Un método recursivo se llama a sí mismo. Necesita un caso base que pueda responder sin otra llamada y un caso recursivo que reduzca el problema acercándolo al caso base. Sin caso base, o si no se alcanza, las llamadas crecen hasta producir StackOverflowError.",
        "Para factorial, el caso base es factorial(0) = 1. Para n > 0, factorial(n) = n × factorial(n - 1). Cada llamada queda pendiente de su resultado; al llegar a cero, los resultados regresan y se multiplican al desenrollar la pila.",
        "La recursividad puede hacer elegante una definición, pero consume memoria en la pila de llamadas. Para contar millones de elementos o para una entrada muy profunda, una versión iterativa puede ser más segura."
      ],
      codigo: `static long factorial(int n) {
    if (n == 0) return 1;           // caso base
    return n * factorial(n - 1);   // problema más pequeño
}`
    },
    {
      titulo: "7. Trazar y probar métodos",
      parrafos: [
        "Traza una llamada recursiva pequeña escribiendo el valor del parámetro en cada nivel y después el valor que devuelve cada nivel. Para factorial(3), las llamadas bajan 3 → 2 → 1 → 0; las respuestas suben 1 → 1 → 2 → 6.",
        "Prueba el caso base, el caso mínimo permitido, un valor normal y una entrada fuera del contrato. Por ejemplo, para una potencia recursiva revisa exponente 0, exponente 1 y uno negativo.",
        "En Eclipse, usa Step Into para entrar en el método, Step Over para ejecutar una línea sin abrir otra llamada y la vista Debug para consultar los parámetros y la pila. Si no puedes explicar cómo cada llamada se acerca al caso base, la recursión todavía no está demostrada."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué información indica que un método no devuelve un resultado?",
      opciones: ["La palabra void", "La palabra static", "La ausencia de parámetros", "El nombre main"],
      correcta: 0,
      explicacion: "void indica que el método no devuelve un valor. static solo indica que pertenece a la clase."
    },
    {
      pregunta: "¿Puede definirse una sobrecarga cambiando únicamente el tipo de retorno?",
      opciones: ["Sí, siempre", "Sí, si ambos métodos son static", "No, la lista de parámetros debe ser distinta", "No, nunca puede repetirse un nombre"],
      correcta: 2,
      explicacion: "El compilador elige una sobrecarga mediante la lista de argumentos, no por el tipo que el método devolvería."
    },
    {
      pregunta: "¿Qué valor imprime el código donde incrementar(int valor) hace valor++ y se llama con numero = 5?",
      opciones: ["5", "6", "0", "Error de compilación"],
      correcta: 0,
      explicacion: "El primitivo se pasa por valor. El método incrementa su copia local, no la variable numero del llamador."
    },
    {
      pregunta: "¿Qué dos partes necesita un método recursivo correcto?",
      opciones: ["Un constructor y un getter", "Un caso base y un caso recursivo que progresa", "Un campo static y un bucle for", "Dos parámetros del mismo tipo"],
      correcta: 1,
      explicacion: "El caso base detiene las llamadas y el caso recursivo transforma la entrada para acercarla a ese caso."
    },
    {
      pregunta: "¿Qué produce una recursión que nunca alcanza su caso base?",
      opciones: ["Un bucle que el compilador optimiza", "StackOverflowError al crecer la pila", "Una conversión automática a iteración", "El valor null"],
      correcta: 1,
      explicacion: "Cada llamada añade un marco a la pila. Si no se detiene, se agota el espacio disponible."
    },
    {
      pregunta: "¿Qué puede hacer un método static?",
      opciones: ["Usar this sin crear objetos", "Acceder directamente al estado de cualquier instancia", "Calcular un resultado a partir de parámetros sin depender de un objeto", "Sobrescribir siempre métodos de instancia"],
      correcta: 2,
      explicacion: "Un método static no tiene this; es adecuado para operaciones que no dependen del estado de una instancia."
    },
    {
      pregunta: "¿Qué ocurre con una variable local declarada dentro del cuerpo de un método?",
      opciones: ["Recibe siempre el valor 0", "Debe inicializarse antes de leerse", "Se comparte entre todos los objetos", "Persiste después de cada llamada"],
      correcta: 1,
      explicacion: "Las variables locales no tienen valor por defecto; el compilador exige asignarlas antes de usarlas."
    },
    {
      pregunta: "En factorial(n) = n * factorial(n - 1), ¿cuál es un caso base apropiado?",
      opciones: ["factorial(0) devuelve 1", "factorial(n) llama otra vez a factorial(n)", "factorial(1) siempre devuelve 0", "Eliminar la condición"],
      correcta: 0,
      explicacion: "0! se define como 1 y evita otra llamada. La llamada recursiva decrece hasta llegar a cero."
    }
  ]
};

const ejerciciosMetodos = window.CONTENIDO["metodos"].ejercicios;
const solucionesMetodos = window.CONTENIDO["metodos"].soluciones;
if (ejerciciosMetodos.length !== solucionesMetodos.length) {
  throw new Error("Cada ejercicio de métodos debe tener su solución.");
}
ejerciciosMetodos.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesMetodos[indice];
});
delete window.CONTENIDO["metodos"].soluciones;
