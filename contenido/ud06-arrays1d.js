// Unidad 6: arrays unidimensionales.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["arrays1d"] = {
  ejercicios: [
    { enunciado: "Implementa leerArray(int n, Scanner sc), que devuelva un array de n enteros introducidos por teclado. Rechaza tamaños negativos y prueba el array vacío." },
    { enunciado: "Crea un array de n enteros aleatorios entre 1 y 1000, ambos incluidos. Imprime el array con Arrays.toString." },
    { enunciado: "Implementa media(int[] datos) y devuelve la media como double. Define qué debe ocurrir si el array está vacío." },
    { enunciado: "Implementa contarMayoresOIguales(int[] datos, double limite) y cuenta los elementos mayores o iguales a la media del array." },
    { enunciado: "Implementa buscar(int[] datos, int objetivo), que devuelva el índice de la primera aparición del objetivo o -1 si no aparece." },
    { enunciado: "Crea un array long[] con los factoriales de 1 a 20. Calcula cada factorial con BigInteger y muestra el resultado exacto." },
    { enunciado: "Implementa existe(int[] datos, int objetivo), que devuelva true cuando el array contiene el valor y false en caso contrario." },
    { enunciado: "Lee enteros hasta reunir 10 valores distintos. No guardes duplicados y muestra los 10 valores en orden de primera aparición." },
    { enunciado: "Imprime todos los argumentos recibidos por main, indicando la posición y el contenido de cada uno." },
    { enunciado: "Implementa invertir(int[] datos), que devuelva un nuevo array con los elementos en orden inverso sin modificar el original." },
    { enunciado: "Implementa esIncremental(int[] datos), que compruebe si cada elemento es menor o igual que el siguiente. Los arrays vacíos y de un elemento son incrementales." },
    { enunciado: "Implementa esMontana(int[] datos): debe subir estrictamente hasta un único máximo interior y después bajar estrictamente. Rechaza arrays que no tengan al menos tres elementos." },
    { enunciado: "Convierte un array de bits (0 o 1) a decimal usando acumulación. Rechaza cualquier elemento distinto de 0 o 1 y comprueba el riesgo de desbordamiento." },
    { enunciado: "Implementa concatenar(int[] a, int[] b), que devuelva un nuevo array con primero los elementos de a y luego los de b." },
    { enunciado: "Devuelve un array formado por la primera mitad de a y la segunda mitad de b. Para longitudes impares, define la mitad como los primeros floor(n/2) elementos y los restantes." },
    { enunciado: "Eleva al cuadrado cada elemento de un array en el mismo array. Usa una operación que detecte el desbordamiento de int." },
    { enunciado: "Implementa un menú de hotel con n habitaciones: consultar habitaciones libres, hacer check-in, hacer check-out y salir. Usa un array booleano y valida índices y ocupación." },
    { enunciado: "Implementa contarApariciones(int[] datos, int objetivo) y devuelve cuántas veces aparece el valor. El array vacío produce cero." }
  ],

  soluciones: [
    `import java.util.Scanner;

public class LeerArray {
    static int[] leerArray(int n, Scanner sc) {
        if (n < 0) throw new IllegalArgumentException("El tamaño no puede ser negativo.");
        int[] datos = new int[n];
        for (int i = 0; i < datos.length; i++) datos[i] = sc.nextInt();
        return datos;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] datos = leerArray(n, sc);
        System.out.println(java.util.Arrays.toString(datos));
        sc.close();
    }
}`,
    `import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public class ArrayAleatorio {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 0) {
            System.out.println("El tamaño no puede ser negativo.");
        } else {
            int[] datos = new int[n];
            Random random = new Random();
            for (int i = 0; i < datos.length; i++) datos[i] = random.nextInt(1000) + 1;
            System.out.println(Arrays.toString(datos));
        }
        sc.close();
    }
}`,
    `public class MediaArray {
    static double media(int[] datos) {
        if (datos.length == 0) throw new IllegalArgumentException("El array está vacío.");
        long suma = 0;
        for (int dato : datos) suma += dato;
        return suma / (double) datos.length;
    }

    public static void main(String[] args) {
        int[] datos = {4, 7, 8};
        System.out.println(media(datos));
    }
}`,
    `public class ContarSobreMedia {
    static double media(int[] datos) {
        if (datos.length == 0) throw new IllegalArgumentException("El array está vacío.");
        long suma = 0;
        for (int dato : datos) suma += dato;
        return suma / (double) datos.length;
    }

    static int contarMayoresOIguales(int[] datos, double limite) {
        int cantidad = 0;
        for (int dato : datos) if (dato >= limite) cantidad++;
        return cantidad;
    }

    public static void main(String[] args) {
        int[] datos = {2, 4, 6, 8};
        double media = media(datos);
        System.out.println(contarMayoresOIguales(datos, media));
    }
}`,
    `public class BuscarPosicion {
    static int buscar(int[] datos, int objetivo) {
        for (int i = 0; i < datos.length; i++) {
            if (datos[i] == objetivo) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] datos = {3, 8, 3, 9};
        System.out.println(buscar(datos, 3)); // 0
    }
}`,
    `import java.math.BigInteger;
import java.util.Arrays;

public class FactorialesArray {
    public static void main(String[] args) {
        BigInteger[] factoriales = new BigInteger[20];
        BigInteger factorial = BigInteger.ONE;
        for (int n = 1; n <= factoriales.length; n++) {
            factorial = factorial.multiply(BigInteger.valueOf(n));
            factoriales[n - 1] = factorial;
        }
        System.out.println(Arrays.toString(factoriales));
    }
}`,
    `public class ExisteElemento {
    static boolean existe(int[] datos, int objetivo) {
        for (int dato : datos) if (dato == objetivo) return true;
        return false;
    }

    public static void main(String[] args) {
        System.out.println(existe(new int[] {4, 2, 9}, 2));
    }
}`,
    `import java.util.Arrays;
import java.util.Scanner;

public class DiezDistintos {
    static boolean contiene(int[] datos, int usados, int valor) {
        for (int i = 0; i < usados; i++) if (datos[i] == valor) return true;
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] distintos = new int[10];
        int usados = 0;
        while (usados < distintos.length) {
            int valor = sc.nextInt();
            if (!contiene(distintos, usados, valor)) distintos[usados++] = valor;
        }
        System.out.println(Arrays.toString(distintos));
        sc.close();
    }
}`,
    `public class ArgumentosMain {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println(i + ": " + args[i]);
        }
    }
}`,
    `import java.util.Arrays;

public class InvertirArray {
    static int[] invertir(int[] datos) {
        int[] resultado = new int[datos.length];
        for (int i = 0; i < datos.length; i++) {
            resultado[i] = datos[datos.length - 1 - i];
        }
        return resultado;
    }

    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4};
        System.out.println(Arrays.toString(invertir(original)));
        System.out.println(Arrays.toString(original));
    }
}`,
    `public class ArrayIncremental {
    static boolean esIncremental(int[] datos) {
        for (int i = 1; i < datos.length; i++) {
            if (datos[i - 1] > datos[i]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(esIncremental(new int[] {1, 2, 2, 5}));
    }
}`,
    `public class ArrayMontana {
    static boolean esMontana(int[] datos) {
        if (datos.length < 3) return false;
        int i = 1;
        while (i < datos.length && datos[i] > datos[i - 1]) i++;
        if (i == 1 || i == datos.length) return false;
        while (i < datos.length && datos[i] < datos[i - 1]) i++;
        return i == datos.length;
    }

    public static void main(String[] args) {
        System.out.println(esMontana(new int[] {1, 4, 8, 3, 2}));
    }
}`,
    `public class BinarioADecimal {
    static long convertir(int[] bits) {
        long valor = 0;
        for (int bit : bits) {
            if (bit != 0 && bit != 1) throw new IllegalArgumentException("Solo se admiten 0 y 1.");
            valor = Math.addExact(Math.multiplyExact(valor, 2), bit);
        }
        return valor;
    }

    public static void main(String[] args) {
        System.out.println(convertir(new int[] {1, 0, 1, 1})); // 11
    }
}`,
    `import java.util.Arrays;

public class ConcatenarArrays {
    static int[] concatenar(int[] a, int[] b) {
        int[] resultado = Arrays.copyOf(a, a.length + b.length);
        System.arraycopy(b, 0, resultado, a.length, b.length);
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(concatenar(new int[] {1, 2}, new int[] {3, 4})));
    }
}`,
    `import java.util.Arrays;

public class MitadesArrays {
    static int[] combinarMitades(int[] a, int[] b) {
        int primeraMitad = a.length / 2;
        int inicioSegundaMitad = b.length / 2;
        int[] resultado = new int[primeraMitad + b.length - inicioSegundaMitad];
        System.arraycopy(a, 0, resultado, 0, primeraMitad);
        System.arraycopy(b, inicioSegundaMitad, resultado, primeraMitad, b.length - inicioSegundaMitad);
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(combinarMitades(new int[] {1, 2, 3}, new int[] {4, 5, 6, 7})));
    }
}`,
    `import java.util.Arrays;

public class CuadradosInSitu {
    static void elevarAlCuadrado(int[] datos) {
        for (int i = 0; i < datos.length; i++) {
            datos[i] = Math.multiplyExact(datos[i], datos[i]);
        }
    }

    public static void main(String[] args) {
        int[] datos = {-3, 2, 5};
        elevarAlCuadrado(datos);
        System.out.println(Arrays.toString(datos));
    }
}`,
    `import java.util.Scanner;

public class Hotel {
    static void mostrarLibres(boolean[] ocupadas) {
        for (int i = 0; i < ocupadas.length; i++) {
            if (!ocupadas[i]) System.out.println("Habitación libre: " + i);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número de habitaciones: ");
        int n = sc.nextInt();
        if (n <= 0) {
            System.out.println("Debe haber habitaciones.");
            sc.close();
            return;
        }
        boolean[] ocupadas = new boolean[n];
        int opcion;
        do {
            System.out.println("1. Libres  2. Check-in  3. Check-out  0. Salir");
            opcion = sc.nextInt();
            if (opcion == 1) {
                mostrarLibres(ocupadas);
            } else if (opcion == 2 || opcion == 3) {
                System.out.print("Número de habitación (0-" + (n - 1) + "): ");
                int habitacion = sc.nextInt();
                if (habitacion < 0 || habitacion >= n) {
                    System.out.println("Habitación inexistente.");
                } else if (opcion == 2 && ocupadas[habitacion]) {
                    System.out.println("Ya está ocupada.");
                } else if (opcion == 3 && !ocupadas[habitacion]) {
                    System.out.println("Ya está libre.");
                } else {
                    ocupadas[habitacion] = opcion == 2;
                }
            }
        } while (opcion != 0);
        sc.close();
    }
}`,
    `public class ContarApariciones {
    static int contarApariciones(int[] datos, int objetivo) {
        int cantidad = 0;
        for (int dato : datos) if (dato == objetivo) cantidad++;
        return cantidad;
    }

    public static void main(String[] args) {
        System.out.println(contarApariciones(new int[] {2, 3, 2, 2, 8}, 2));
    }
}`
  ],

  explicacion: [
    {
      titulo: "1. Un array es una secuencia de tamaño fijo",
      parrafos: [
        "Un array guarda varios valores del mismo tipo en posiciones contiguas y se crea con un tamaño que no cambia. Si n es su longitud, los índices válidos son 0, 1, ..., n - 1. La propiedad length no es un método: se escribe datos.length.",
        "Los elementos reciben un valor inicial por defecto: cero en tipos numéricos, false en boolean y null en referencias. Esto no sustituye a definir la semántica del programa; un cero inicial puede ser un dato real y no significar «sin valor».",
        "Crear un array de longitud cero es válido. Los bucles con condición i < datos.length no ejecutan ninguna vuelta y muchos algoritmos pueden devolver un resultado natural para el vacío. Cuando no existe una respuesta significativa, como la media de cero datos, decide explícitamente cómo comunicarlo."
      ],
      codigo: `int[] notas = new int[3];
notas[0] = 8;
notas[1] = 6;
notas[2] = 9;
System.out.println(notas.length); // 3`
    },
    {
      titulo: "2. Recorrer y calcular sin desbordar",
      parrafos: [
        "Un bucle for permite visitar cada posición usando un índice; un for-each resulta legible cuando solo necesitas el valor. El índice es necesario si quieres actualizar una posición o comparar un elemento con su vecino.",
        "Para una media, acumula la suma y divide por la cantidad como double. Si sumas muchos int, la suma puede desbordarse antes de convertirse a double; usa un acumulador de tipo suficientemente amplio o convierte cada valor durante la suma.",
        "No dividas entre cero. Un array vacío no tiene media; informa de ello o define el contrato de un método para que rechace esa entrada. No devuelvas silenciosamente un valor que parezca una media real."
      ],
      codigo: `long suma = 0;
for (int valor : notas) suma += valor;
double media = suma / (double) notas.length;`
    },
    {
      titulo: "3. La referencia se copia, no el array",
      parrafos: [
        "Un array es un objeto. En int[] copia = original, se copia la referencia, así que las dos variables apuntan al mismo array. Cambiar copia[0] también se observa mediante original[0].",
        "Para crear otro array puedes usar clone(), Arrays.copyOf o System.arraycopy. Estas operaciones copian los elementos; para arrays de objetos la copia es superficial, es decir, se copian las referencias a los objetos, no se clonan automáticamente esos objetos.",
        "Arrays.toString ayuda a inspeccionar un array unidimensional. Arrays.sort lo modifica y lo ordena; Arrays.binarySearch solo tiene un resultado fiable si antes está ordenado. La búsqueda lineal, en cambio, funciona con cualquier orden."
      ],
      codigo: `int[] original = {3, 1, 2};
int[] referencia = original;
int[] copia = original.clone();
referencia[0] = 9;
System.out.println(original[0]); // 9
System.out.println(copia[0]);    // 3`
    },
    {
      titulo: "4. Búsqueda, límites y condiciones",
      parrafos: [
        "Una búsqueda lineal examina desde el índice cero y devuelve cuando encuentra el objetivo. Si el contrato pide la primera aparición, se debe terminar en la primera coincidencia; si no aparece, -1 es una señal habitual.",
        "Para comparar vecinos, empieza normalmente en el índice 1 y compara datos[i - 1] con datos[i]. Esto evita acceder a la posición -1. Haz una tabla con las longitudes 0, 1 y 2 para comprobar que los límites cubren los casos pequeños.",
        "Una secuencia «incremental» puede permitir igualdad (no decreciente) o exigir crecimiento estricto. Especifica qué significa: usar > en la comparación de fallo permite repeticiones; usar >= las rechaza."
      ],
      codigo: `for (int i = 1; i < datos.length; i++) {
    if (datos[i - 1] > datos[i]) return false;
}
return true;`
    },
    {
      titulo: "5. Arrays como representación y algoritmos",
      parrafos: [
        "Un número binario se puede acumular de izquierda a derecha: el valor anterior se multiplica por dos y se añade el siguiente bit. Comprueba que cada elemento sea 0 o 1 y considera qué tipo puede contener el resultado.",
        "Para combinar arrays, crea un resultado del tamaño total y copia cada segmento. Arrays.copyOf y System.arraycopy expresan la intención con claridad y evitan índices manuales innecesarios.",
        "Las operaciones en el propio array, como elevar cada elemento al cuadrado, modifican los datos originales. Si puede haber desbordamiento, Math.multiplyExact detecta la pérdida en vez de dejar un resultado silenciosamente incorrecto."
      ],
      codigo: `long valor = 0;
for (int bit : bits) {
    valor = Math.addExact(Math.multiplyExact(valor, 2), bit);
}`
    },
    {
      titulo: "6. El contrato de los métodos que reciben arrays",
      parrafos: [
        "Un método que recibe un array debe documentar si lo modifica, si devuelve un array nuevo, qué acepta cuando recibe null y qué respuesta produce para un array vacío. Java pasa la referencia por valor: el método puede cambiar las casillas, pero reasignar su parámetro no cambia la variable del llamador.",
        "Si el array representa habitaciones, una posición puede codificar el estado libre u ocupado. Valida el índice antes de acceder y valida también la transición: no se puede hacer check-in en una habitación ocupada ni check-out en una habitación libre.",
        "Diseña primero la correspondencia entre índice y dominio. Si el usuario espera las habitaciones 1 a n pero el array usa índices 0 a n - 1, convierte una sola vez (númeroHabitación - 1) y muestra siempre la convención correcta."
      ]
    },
    {
      titulo: "7. Pruebas y depuración en Eclipse",
      parrafos: [
        "Para cada algoritmo prueba un array vacío, uno de un elemento, duplicados, valores ya ordenados y valores en orden inverso. En una búsqueda, prueba el objetivo al principio, al final y ausente.",
        "Para invertir, verifica que el original no cambia si el contrato promete un resultado nuevo. Para copiar mitades, prueba longitudes pares e impares y confirma exactamente qué elementos entran en cada parte.",
        "En Eclipse, usa el depurador para inspeccionar índice, elemento y acumulador en cada iteración. Si ocurre ArrayIndexOutOfBoundsException, comprueba el primer y último valor que puede tomar el índice y el punto en que aumenta."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Cuál es el último índice válido de un array de longitud n > 0?",
      opciones: ["n", "n - 1", "1", "n + 1"],
      correcta: 1,
      explicacion: "Los índices empiezan en cero; un array de longitud n termina en n - 1."
    },
    {
      pregunta: "¿Qué ocurre con int[] b = a si a es un array?",
      opciones: ["Se crea automáticamente una copia", "b y a apuntan al mismo array", "Se ordena a", "b queda siempre vacío"],
      correcta: 1,
      explicacion: "La asignación copia la referencia al objeto, no duplica sus elementos."
    },
    {
      pregunta: "¿Qué condición permite recorrer todas las posiciones de un array desde cero?",
      opciones: ["i <= datos.length", "i < datos.length", "i > datos.length", "i <= datos.length + 1"],
      correcta: 1,
      explicacion: "La última posición es length - 1; usar i < length evita acceder al índice length."
    },
    {
      pregunta: "¿Qué debe hacerse antes de calcular la media de un array?",
      opciones: ["Ordenarlo siempre", "Comprobar que no esté vacío y evitar desbordar la suma", "Convertir todos sus valores a String", "Invertirlo"],
      correcta: 1,
      explicacion: "La media no está definida para cero elementos y una suma de int puede desbordarse."
    },
    {
      pregunta: "¿Qué devuelve típicamente una búsqueda lineal si no encuentra el valor?",
      opciones: ["0", "datos.length", "-1", "null"],
      correcta: 2,
      explicacion: "-1 no es un índice válido y se usa habitualmente para indicar que no se encontró el objetivo."
    },
    {
      pregunta: "¿Qué requiere Arrays.binarySearch para buscar correctamente?",
      opciones: ["Que el array esté ordenado", "Que no contenga números negativos", "Que sea de longitud par", "Que todos los valores sean distintos"],
      correcta: 0,
      explicacion: "La búsqueda binaria descarta mitades según el orden; sobre datos desordenados puede devolver un resultado incorrecto."
    },
    {
      pregunta: "¿Qué hace un for-each si solo contiene int valor : datos?",
      opciones: ["Permite cambiar automáticamente cada posición del array asignando a valor", "Recorre los valores, pero valor es una copia local del elemento primitivo", "Ordena el array", "Recorre únicamente valores no repetidos"],
      correcta: 1,
      explicacion: "En un for-each de primitivos, la variable local recibe cada valor; asignarla no actualiza la casilla del array."
    },
    {
      pregunta: "¿Qué comprueba Math.multiplyExact(a, b) frente a a * b?",
      opciones: ["Ordena los operandos", "Detecta desbordamiento aritmético", "Convierte el resultado a double", "Devuelve el valor absoluto"],
      correcta: 1,
      explicacion: "multiplyExact lanza ArithmeticException si el resultado no cabe en el tipo entero."
    }
  ]
};

const ejerciciosArrays1d = window.CONTENIDO["arrays1d"].ejercicios;
const solucionesArrays1d = window.CONTENIDO["arrays1d"].soluciones;
if (ejerciciosArrays1d.length !== solucionesArrays1d.length) {
  throw new Error("Cada ejercicio de arrays debe tener su solución.");
}
ejerciciosArrays1d.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesArrays1d[indice];
});
delete window.CONTENIDO["arrays1d"].soluciones;
