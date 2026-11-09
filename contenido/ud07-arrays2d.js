// Unidad 7: arrays bidimensionales y matrices.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["arrays2d"] = {
  ejercicios: [
    { enunciado: "Implementa mostrar(int[][] matriz) para imprimir una matriz regular, una fila por línea, con sus valores separados por espacios." },
    { enunciado: "Implementa maximo(int[][] matriz). Rechaza una matriz sin elementos y admite matrices irregulares con filas vacías." },
    { enunciado: "Suma todos los elementos de una matriz rectangular usando un acumulador long." },
    { enunciado: "Devuelve un array long[] con la suma de cada fila, también cuando la matriz sea irregular." },
    { enunciado: "Para una matriz cuadrada, devuelve la media de cada fila. Si la matriz no es cuadrada o tiene cero columnas, informa del error." },
    { enunciado: "Cuenta cuántos ceros contiene una matriz regular o irregular." },
    { enunciado: "Cuenta las apariciones de un valor en todas las filas de una matriz irregular." },
    { enunciado: "Comprueba si una matriz es identidad: debe ser cuadrada, con unos en la diagonal y ceros fuera." },
    { enunciado: "Crea y devuelve una matriz identidad de tamaño n. Rechaza tamaños negativos." },
    { enunciado: "Para una matriz cuadrada, devuelve la suma de la diagonal principal y la secundaria por separado. En dimensión impar, ambas sumas incluyen el centro." },
    { enunciado: "Devuelve la transpuesta de una matriz rectangular: las filas pasan a ser columnas." },
    { enunciado: "Comprueba si una matriz cuadrada es simétrica respecto de su diagonal principal." },
    { enunciado: "Para una matriz boolean[][], calcula el OR de cada fila y después el AND de esos resultados. Define el resultado de una matriz vacía." },
    { enunciado: "Genera una matriz cuadrada n x n con valores aleatorios entre 1 y 100, incluidos." },
    { enunciado: "Lee desde teclado una matriz cuadrada n x n y muéstrala." },
    { enunciado: "Crea una matriz n x n con exactamente m valores true distribuidos al azar. Rechaza m fuera del rango 0..n*n." },
    { enunciado: "Multiplica dos matrices cuando el número de columnas de la primera coincide con las filas de la segunda. Rechaza dimensiones incompatibles." },
    { enunciado: "Rota una matriz cuadrada 90 grados en sentido horario y devuelve una matriz nueva." },
    { enunciado: "Juego de hundir barcos simplificado: genera n posiciones de barco distintas en una cuadrícula n x n y da como máximo floor(n*n/3) disparos, sin repetir coordenadas. Termina al hundirlos todos." },
    { enunciado: "Compara dos matrices posiblemente irregulares. Devuelve una matriz irregular con la forma máxima por fila y, cuando solo existe un elemento, conserva ese valor; si existen ambos, guarda el mayor." },
    { enunciado: "Implementa un método que imprima un título y filas de texto dentro de un marco Unicode. Úsalo para mostrar un array y una matriz irregular sin truncar filas." }
  ],

  soluciones: [
    `import java.util.Arrays;

public class MostrarMatriz {
    static void mostrar(int[][] matriz) {
        for (int[] fila : matriz) System.out.println(Arrays.toString(fila));
    }

    public static void main(String[] args) {
        mostrar(new int[][] {{1, 2, 3}, {4, 5, 6}});
    }
}`,
    `public class MaximoMatriz {
    static int maximo(int[][] matriz) {
        boolean encontrado = false;
        int maximo = Integer.MIN_VALUE;
        for (int[] fila : matriz) {
            for (int valor : fila) {
                if (!encontrado || valor > maximo) maximo = valor;
                encontrado = true;
            }
        }
        if (!encontrado) throw new IllegalArgumentException("La matriz no contiene elementos.");
        return maximo;
    }

    public static void main(String[] args) {
        System.out.println(maximo(new int[][] {{-4, -2}, {}, {-9}}));
    }
}`,
    `public class SumaMatriz {
    static long suma(int[][] matriz) {
        long total = 0;
        for (int[] fila : matriz) for (int valor : fila) total += valor;
        return total;
    }

    public static void main(String[] args) {
        System.out.println(suma(new int[][] {{1, 2}, {3, 4}}));
    }
}`,
    `import java.util.Arrays;

public class SumaFilas {
    static long[] sumarFilas(int[][] matriz) {
        long[] sumas = new long[matriz.length];
        for (int i = 0; i < matriz.length; i++) {
            for (int valor : matriz[i]) sumas[i] += valor;
        }
        return sumas;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(sumarFilas(new int[][] {{1, 2}, {}, {3}})));
    }
}`,
    `import java.util.Arrays;

public class MediaFilas {
    static double[] medias(int[][] matriz) {
        if (matriz.length == 0) return new double[0];
        int columnas = matriz[0].length;
        if (columnas == 0) throw new IllegalArgumentException("La matriz no puede tener cero columnas.");
        double[] resultado = new double[matriz.length];
        for (int i = 0; i < matriz.length; i++) {
            if (matriz[i].length != columnas) throw new IllegalArgumentException("La matriz debe ser regular.");
            long suma = 0;
            for (int valor : matriz[i]) suma += valor;
            resultado[i] = suma / (double) columnas;
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(medias(new int[][] {{1, 2}, {4, 5}})));
    }
}`,
    `public class ContarCerosMatriz {
    static int contarCeros(int[][] matriz) {
        int cantidad = 0;
        for (int[] fila : matriz) for (int valor : fila) if (valor == 0) cantidad++;
        return cantidad;
    }

    public static void main(String[] args) {
        System.out.println(contarCeros(new int[][] {{0, 2}, {}, {0, 0}}));
    }
}`,
    `public class BuscarMatriz {
    static int contar(int[][] matriz, int buscado) {
        int cantidad = 0;
        for (int[] fila : matriz) for (int valor : fila) if (valor == buscado) cantidad++;
        return cantidad;
    }

    public static void main(String[] args) {
        System.out.println(contar(new int[][] {{2, 3}, {2}, {}, {2, 4}}, 2));
    }
}`,
    `public class EsIdentidad {
    static boolean esIdentidad(int[][] matriz) {
        for (int[] fila : matriz) if (fila.length != matriz.length) return false;
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz.length; j++) {
                if (matriz[i][j] != (i == j ? 1 : 0)) return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(esIdentidad(new int[][] {{1, 0}, {0, 1}}));
    }
}`,
    `public class CrearIdentidad {
    static int[][] identidad(int n) {
        if (n < 0) throw new IllegalArgumentException("El tamaño no puede ser negativo.");
        int[][] resultado = new int[n][n];
        for (int i = 0; i < n; i++) resultado[i][i] = 1;
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(identidad(3)[1][1]);
    }
}`,
    `import java.util.Arrays;

public class SumaDiagonales {
    static long[] sumas(int[][] matriz) {
        for (int[] fila : matriz) if (fila.length != matriz.length) {
            throw new IllegalArgumentException("La matriz debe ser cuadrada.");
        }
        long principal = 0, secundaria = 0;
        for (int i = 0; i < matriz.length; i++) {
            principal += matriz[i][i];
            secundaria += matriz[i][matriz.length - 1 - i];
        }
        return new long[] {principal, secundaria};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(sumas(new int[][] {{1, 2}, {3, 4}})));
    }
}`,
    `public class Transpuesta {
    static int[][] transponer(int[][] matriz) {
        if (matriz.length == 0) return new int[0][0];
        int columnas = matriz[0].length;
        for (int[] fila : matriz) if (fila.length != columnas) {
            throw new IllegalArgumentException("La matriz debe ser rectangular.");
        }
        int[][] resultado = new int[columnas][matriz.length];
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < columnas; j++) resultado[j][i] = matriz[i][j];
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(transponer(new int[][] {{1, 2, 3}, {4, 5, 6}})[2][1]);
    }
}`,
    `public class MatrizSimetrica {
    static boolean esSimetrica(int[][] matriz) {
        for (int[] fila : matriz) if (fila.length != matriz.length) return false;
        for (int i = 0; i < matriz.length; i++) {
            for (int j = i + 1; j < matriz.length; j++) {
                if (matriz[i][j] != matriz[j][i]) return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(esSimetrica(new int[][] {{1, 2}, {2, 3}}));
    }
}`,
    `public class OperadoresBooleanos {
    static boolean calcular(boolean[][] matriz) {
        if (matriz.length == 0) return false;
        boolean andFilas = true;
        for (boolean[] fila : matriz) {
            boolean orFila = false;
            for (boolean valor : fila) orFila |= valor;
            andFilas &= orFila;
        }
        return andFilas;
    }

    public static void main(String[] args) {
        System.out.println(calcular(new boolean[][] {{false, true}, {true, true}}));
    }
}`,
    `import java.util.Random;

public class MatrizAleatoria {
    static int[][] crear(int n, Random random) {
        if (n < 0) throw new IllegalArgumentException("El tamaño no puede ser negativo.");
        int[][] matriz = new int[n][n];
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) {
            matriz[i][j] = random.nextInt(100) + 1;
        }
        return matriz;
    }

    public static void main(String[] args) {
        System.out.println(crear(3, new Random())[0][0]);
    }
}`,
    `import java.util.Scanner;

public class LeerMatriz {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n < 0) {
            System.out.println("El tamaño no puede ser negativo.");
        } else {
            int[][] matriz = new int[n][n];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) matriz[i][j] = sc.nextInt();
            }
            for (int[] fila : matriz) {
                for (int valor : fila) System.out.print(valor + " ");
                System.out.println();
            }
        }
        sc.close();
    }
}`,
    `import java.util.Arrays;
import java.util.Random;

public class BooleanosMAleatorios {
    static boolean[][] crear(int n, int m, Random random) {
        if (n < 0 || (long) m < 0 || (long) m > (long) n * n) {
            throw new IllegalArgumentException("Se requiere 0 <= m <= n*n.");
        }
        int[] posiciones = new int[n * n];
        for (int i = 0; i < posiciones.length; i++) posiciones[i] = i;
        for (int i = 0; i < m; i++) {
            int j = i + random.nextInt(posiciones.length - i);
            int temporal = posiciones[i];
            posiciones[i] = posiciones[j];
            posiciones[j] = temporal;
        }
        boolean[][] resultado = new boolean[n][n];
        for (int i = 0; i < m; i++) resultado[posiciones[i] / n][posiciones[i] % n] = true;
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.deepToString(crear(3, 4, new Random())));
    }
}`,
    `import java.util.Arrays;

public class MultiplicarMatrices {
    static int[][] multiplicar(int[][] a, int[][] b) {
        int columnasA = a.length == 0 ? 0 : a[0].length;
        int filasB = b.length;
        for (int[] fila : a) if (fila.length != columnasA) {
            throw new IllegalArgumentException("La primera matriz debe ser rectangular.");
        }
        if (columnasA != filasB) throw new IllegalArgumentException("Dimensiones incompatibles.");
        int columnasB = filasB == 0 ? 0 : b[0].length;
        for (int[] fila : b) if (fila.length != columnasB) {
            throw new IllegalArgumentException("La segunda matriz debe ser rectangular.");
        }
        int[][] resultado = new int[a.length][columnasB];
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < columnasB; j++) {
                for (int k = 0; k < columnasA; k++) resultado[i][j] += a[i][k] * b[k][j];
            }
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.deepToString(multiplicar(
            new int[][] {{1, 2}, {3, 4}}, new int[][] {{5}, {6}})));
    }
}`,
    `import java.util.Arrays;

public class RotarMatriz {
    static int[][] rotar90(int[][] matriz) {
        int n = matriz.length;
        for (int[] fila : matriz) if (fila.length != n) {
            throw new IllegalArgumentException("La matriz debe ser cuadrada.");
        }
        int[][] resultado = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) resultado[j][n - 1 - i] = matriz[i][j];
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.deepToString(rotar90(new int[][] {{1, 2}, {3, 4}})));
    }
}`,
    `import java.util.Random;
import java.util.Scanner;

public class HundirBarcos {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Tamaño del tablero: ");
        int n = sc.nextInt();
        if (n <= 0) {
            System.out.println("El tamaño debe ser positivo.");
            sc.close();
            return;
        }
        int[][] tablero = new int[n][n];
        int barcos = n;
        Random random = new Random();
        for (int colocados = 0; colocados < barcos; ) {
            int fila = random.nextInt(n), columna = random.nextInt(n);
            if (tablero[fila][columna] == 0) {
                tablero[fila][columna] = 1;
                colocados++;
            }
        }
        int disparosMaximos = Math.max(1, n * n / 3);
        int hundidos = 0, disparos = 0;
        while (disparos < disparosMaximos && hundidos < barcos) {
            System.out.print("Fila y columna (0-" + (n - 1) + "): ");
            int fila = sc.nextInt(), columna = sc.nextInt();
            if (fila < 0 || fila >= n || columna < 0 || columna >= n) {
                System.out.println("Coordenadas fuera del tablero.");
            } else if (tablero[fila][columna] == -1) {
                System.out.println("Ya disparaste ahí.");
            } else {
                disparos++;
                if (tablero[fila][columna] == 1) {
                    tablero[fila][columna] = -1;
                    hundidos++;
                    System.out.println("¡Tocado y hundido!");
                } else {
                    tablero[fila][columna] = -1;
                    System.out.println("Agua.");
                }
            }
        }
        System.out.println("Barcos hundidos: " + hundidos + "/" + barcos);
        sc.close();
    }
}`,
    `import java.util.Arrays;

public class MaximoMatricesIrregulares {
    static int[][] maximo(int[][] a, int[][] b) {
        int filas = Math.max(a.length, b.length);
        int[][] resultado = new int[filas][];
        for (int i = 0; i < filas; i++) {
            int[] filaA = i < a.length ? a[i] : new int[0];
            int[] filaB = i < b.length ? b[i] : new int[0];
            resultado[i] = new int[Math.max(filaA.length, filaB.length)];
            for (int j = 0; j < resultado[i].length; j++) {
                if (j >= filaA.length) resultado[i][j] = filaB[j];
                else if (j >= filaB.length) resultado[i][j] = filaA[j];
                else resultado[i][j] = Math.max(filaA[j], filaB[j]);
            }
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.deepToString(maximo(
            new int[][] {{1, 8}, {4}}, new int[][] {{3}, {9, 2}, {7}})));
    }
}`,
    `public class MarcosUnicode {
    static void imprimirMarco(String titulo, String[] lineas) {
        int ancho = titulo.length();
        for (String linea : lineas) ancho = Math.max(ancho, linea.length());
        String borde = "┌" + "─".repeat(ancho + 2) + "┐";
        System.out.println(borde);
        System.out.printf("│ %-"+ancho+"s │%n", titulo);
        System.out.println("├" + "─".repeat(ancho + 2) + "┤");
        for (String linea : lineas) System.out.printf("│ %-"+ancho+"s │%n", linea);
        System.out.println("└" + "─".repeat(ancho + 2) + "┘");
    }

    public static void main(String[] args) {
        int[][] matriz = {{1, 20}, {}, {300}};
        String[] lineas = new String[matriz.length];
        for (int i = 0; i < matriz.length; i++) lineas[i] = java.util.Arrays.toString(matriz[i]);
        imprimirMarco("Matriz irregular", lineas);
    }
}`
  ],

  explicacionesSoluciones: [
    "Se recorren primero las filas y luego sus columnas. Cada valor se imprime con un separador salvo el último de la fila; al terminar las columnas se imprime el salto de línea.",
    "Se visita cada elemento de todas las filas no vacías y se conserva el mayor encontrado. Un indicador distingue una matriz sin elementos de una que sí contiene valores; en el primer caso se rechaza la operación.",
    "Dos bucles recorren filas y columnas y acumulan en long para admitir sumas mayores que int. El valor inicial cero también es correcto si no hay elementos.",
    "Se crea un resultado con una posición por fila. Cada fila se suma de manera independiente, incluso si es null o está vacía, en cuyo caso su suma es cero.",
    "Se verifica que haya el mismo número de filas y columnas antes de calcular medias. Cada fila se suma y se divide entre su cantidad de columnas; una dimensión sin columnas no permite calcular una media.",
    "Un recorrido por filas cuenta cada elemento igual a cero. La matriz irregular se maneja usando la longitud propia de cada fila, no la longitud de la primera.",
    "El método compara cada elemento con el objetivo y aumenta un contador por coincidencia. Como cada fila puede tener tamaño distinto, el bucle interior usa su longitud individual.",
    "Una matriz identidad debe ser cuadrada. En cada posición se espera 1 si fila y columna coinciden, y 0 en cualquier otra; un solo valor distinto permite devolver false.",
    "Se reserva una matriz n x n inicialmente llena de ceros y se asigna 1 en las posiciones donde índice de fila e índice de columna son iguales. Se valida n antes de crearla.",
    "Se recorren las posiciones de ambas diagonales con índices calculados a partir de la fila. El centro de una matriz impar pertenece a ambas y se suma en cada resultado, tal como pide el enunciado.",
    "La matriz transpuesta intercambia filas por columnas: el elemento original [i][j] se coloca en [j][i]. El resultado invierte las dimensiones, por lo que también funciona en matrices rectangulares.",
    "Tras comprobar que es cuadrada, se comparan las posiciones enfrentadas respecto de la diagonal: matriz[i][j] con matriz[j][i]. Una diferencia indica que no es simétrica.",
    "Para cada fila se calcula la disyunción de sus valores; luego se exige que todas esas disyunciones sean true mediante AND. La matriz vacía se trata explícitamente según la convención elegida en la solución.",
    "Cada posición se asigna con un entero aleatorio del 1 al 100, incluidos. Los dos bucles garantizan que se rellenen todas las celdas de la matriz cuadrada.",
    "Se validan las dimensiones, se leen n² valores en orden de filas y columnas y se muestra la matriz con el mismo recorrido. El anidamiento mantiene correspondencia entre cada entrada y su posición.",
    "Se valida que m esté entre cero y n². La solución selecciona posiciones distintas antes de marcar true, de modo que termina con exactamente m valores verdaderos y no con una cantidad aproximada.",
    "La multiplicación es posible si columnas de A coinciden con filas de B. Para cada celda del resultado se suman los productos de una fila de A por una columna de B.",
    "Una rotación horaria transforma cada posición [i][j] en [j][n - 1 - i]. Se construye una matriz nueva para no sobrescribir valores que aún falten por mover.",
    "Se colocan n barcos en coordenadas distintas y se guardan los disparos previos para impedir repetirlos. El juego termina al acertar todos o alcanzar el límite de intentos calculado con división entera.",
    "Se crea una fila destino por cada fila de cualquiera de las matrices y con la longitud mayor en esa posición. En cada columna se conserva el único valor disponible o se elige el máximo cuando ambos existen.",
    "Se calcula el ancho máximo necesario para el marco y cada línea se rellena hasta esa medida. Las mismas rutinas de presentación reutilizan el marco para arrays y filas irregulares sin truncar contenido."
  ],

  explicacion: [
    {
      titulo: "1. Un array bidimensional es un array de arrays",
      parrafos: [
        "En Java, int[][] no es una cuadrícula especial: es un array cuyos elementos son referencias a otros arrays int[]. matriz.length cuenta filas; matriz[i].length cuenta columnas de esa fila. Por eso Java permite matrices irregulares, donde cada fila tiene longitud distinta.",
        "Al crear new int[filas][columnas], Java crea filas del mismo tamaño. Pero también se puede crear new int[filas][] y asignar cada fila por separado. En una matriz irregular, nunca supongas que matriz[0].length es el ancho de todas las filas.",
        "Antes de acceder a matriz[i][j], ambos índices deben ser válidos: i debe estar entre cero y matriz.length - 1, y j entre cero y matriz[i].length - 1. Una fila puede ser null si se creó pero nunca se asignó."
      ],
      codigo: `int[][] regular = new int[2][3];
int[][] irregular = new int[3][];
irregular[0] = new int[] {1, 2};
irregular[1] = new int[0];
irregular[2] = new int[] {3};`
    },
    {
      titulo: "2. Recorrer filas y columnas",
      parrafos: [
        "Un recorrido por índice suele usar dos bucles: el exterior selecciona una fila y el interior recorre sus columnas. Para una matriz irregular, la condición interior es j < matriz[i].length, no j < matriz[0].length.",
        "Un for-each anidado es cómodo para leer todos los valores cuando no hace falta saber la posición. Para calcular sumas, máximos y conteos funciona bien; para identificar diagonales, transponer o escribir una posición concreta, los índices hacen falta.",
        "Si una tarea debe procesar matrices vacías o filas vacías, el diseño del recorrido ya las admite de forma natural: el bucle correspondiente realiza cero iteraciones. No accedas a matriz[0] antes de comprobar que existe una fila."
      ],
      codigo: `for (int i = 0; i < matriz.length; i++) {
    for (int j = 0; j < matriz[i].length; j++) {
        System.out.println(matriz[i][j]);
    }
}`
    },
    {
      titulo: "3. Matrices cuadradas, diagonales e identidad",
      parrafos: [
        "Una matriz es cuadrada si todas sus filas tienen longitud igual al número de filas. La diagonal principal contiene matriz[i][i]; la diagonal secundaria contiene matriz[i][n - 1 - i].",
        "La identidad tiene unos en la diagonal principal y ceros en cualquier otra posición. Una matriz simétrica cumple matriz[i][j] == matriz[j][i], así que basta comparar una mitad con la otra y no hace falta volver a comparar la diagonal.",
        "En una matriz cuadrada de dimensión impar, las dos diagonales se cruzan en el elemento central. Si se suman por separado, ese centro pertenece a ambas sumas; si el enunciado pide sumar la unión, habría que restarlo una vez."
      ],
      codigo: `for (int i = 0; i < n; i++) {
    principal += matriz[i][i];
    secundaria += matriz[i][n - 1 - i];
}`
    },
    {
      titulo: "4. Transpuesta y multiplicación",
      parrafos: [
        "La transpuesta intercambia filas y columnas: el elemento de posición [i][j] pasa a [j][i]. Una matriz de f filas y c columnas produce otra de c filas y f columnas.",
        "Para multiplicar A por B, la cantidad de columnas de A debe coincidir con la cantidad de filas de B. El resultado tiene las filas de A y las columnas de B. Cada posición se calcula como suma de productos de una fila de A por una columna de B.",
        "Comprueba las dimensiones antes de empezar. Distingue matrices vacías, matrices con filas de longitud cero y matrices rectangulares válidas: son casos distintos aunque algunos tengan cero elementos."
      ],
      codigo: `for (int i = 0; i < filasA; i++) {
    for (int j = 0; j < columnasB; j++) {
        for (int k = 0; k < columnasA; k++) {
            resultado[i][j] += a[i][k] * b[k][j];
        }
    }
}`
    },
    {
      titulo: "5. Aleatoriedad sin duplicados",
      parrafos: [
        "Para generar valores aleatorios dentro de un rango inclusivo, nextInt(maximo - minimo + 1) + minimo ajusta el intervalo. Verifica que el tamaño sea positivo antes de crear arrays o pedir un número aleatorio.",
        "Si se necesitan exactamente m posiciones true sin repetición, generar coordenadas al azar hasta acertar puede tardar cada vez más cuando el tablero está casi lleno. Una alternativa simple consiste en barajar las posiciones y elegir las primeras m.",
        "Comprueba que 0 <= m <= n*n antes de empezar y calcula el producto con un tipo suficientemente amplio al validar. También considera límites de memoria: un tamaño enorme puede no caber aunque sea positivo."
      ],
      codigo: `for (int i = 0; i < m; i++) {
    int j = i + random.nextInt(posiciones.length - i);
    int temporal = posiciones[i];
    posiciones[i] = posiciones[j];
    posiciones[j] = temporal;
}`
    },
    {
      titulo: "6. Diseñar la forma del resultado",
      parrafos: [
        "Un método que devuelve una matriz debe definir si produce una copia nueva o modifica la entrada. La transpuesta y el giro suelen devolver una nueva matriz; una operación en sitio necesita explicar cómo evita sobrescribir valores que aún no ha leído.",
        "Con matrices irregulares, fila a fila puede haber tamaños distintos. Si se combinan dos, hay que especificar qué ocurre cuando falta una fila o una columna: ignorarla, rellenarla o conservar el valor existente. No uses cero como «ausente» si cero puede ser un dato real.",
        "Para operaciones numéricas, considera desbordamiento en acumulaciones y productos. El tipo int puede desbordarse silenciosamente; long amplía el rango, y métodos como Math.multiplyExact permiten detectar ciertas operaciones fuera de rango."
      ]
    },
    {
      titulo: "7. Pruebas y depuración en Eclipse",
      parrafos: [
        "Dibuja matrices pequeñas en papel con sus índices antes de escribir una transpuesta, un giro o una multiplicación. Usa valores distintos en cada posición para detectar intercambios incorrectos; una matriz llena de ceros puede ocultarlos.",
        "Prueba matriz vacía, una fila vacía, una columna, una matriz 1 x 1, dimensiones impares y pares, filas irregulares y dimensiones incompatibles.",
        "En Eclipse, pon breakpoints dentro de ambos bucles y observa fila, columna y resultado. Si aparece ArrayIndexOutOfBoundsException, comprueba los límites de ambos bucles y si la fila actual realmente tiene el ancho supuesto."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "En int[][] matriz, ¿qué representa matriz[i].length?",
      opciones: ["El número de filas", "El número de columnas de la fila i", "El número total de elementos", "El último índice de fila"],
      correcta: 1,
      explicacion: "Una matriz Java es un array de arrays; cada fila tiene su propio length."
    },
    {
      pregunta: "¿Qué condición recorre una matriz irregular sin asumir que todas las filas tienen el mismo ancho?",
      opciones: ["j < matriz[0].length", "j < matriz.length", "j < matriz[i].length", "j <= matriz[i].length"],
      correcta: 2,
      explicacion: "Cada fila se recorre usando su longitud real; <= accedería una posición después del final."
    },
    {
      pregunta: "¿Cuándo se puede multiplicar A por B?",
      opciones: ["Cuando A y B tienen el mismo número de filas", "Cuando las columnas de A coinciden con las filas de B", "Cuando ambas son cuadradas", "Siempre"],
      correcta: 1,
      explicacion: "Cada producto escalar empareja una fila de A con una columna de B; sus tamaños deben coincidir."
    },
    {
      pregunta: "¿Qué dimensiones tiene la transpuesta de una matriz de 2 filas y 3 columnas?",
      opciones: ["2 x 3", "3 x 2", "2 x 2", "3 x 3"],
      correcta: 1,
      explicacion: "La transpuesta intercambia filas y columnas."
    },
    {
      pregunta: "¿Qué posición pertenece a la diagonal secundaria de una matriz n x n?",
      opciones: ["[i][i]", "[i][n - 1 - i]", "[n][i]", "[i + 1][i]"],
      correcta: 1,
      explicacion: "La columna disminuye desde n - 1 mientras la fila avanza desde cero."
    },
    {
      pregunta: "¿Qué propiedad define a una matriz simétrica?",
      opciones: ["Cada fila contiene solo unos", "matriz[i][j] es igual a matriz[j][i]", "Tiene distinto número de filas y columnas", "La suma de cada fila es cero"],
      correcta: 1,
      explicacion: "Una matriz simétrica coincide con su transpuesta."
    },
    {
      pregunta: "¿Qué representa una matriz irregular en Java?",
      opciones: ["Un array de arrays cuyas filas pueden tener longitudes distintas", "Una matriz que no contiene ceros", "Un array que no puede recorrerse", "Una matriz siempre cuadrada"],
      correcta: 0,
      explicacion: "Cada fila es un array independiente y puede tener un tamaño distinto."
    },
    {
      pregunta: "Para una matriz impar, ¿qué ocurre con el centro al sumar las diagonales por separado?",
      opciones: ["No pertenece a ninguna", "Pertenece a ambas diagonales", "Solo pertenece a la secundaria", "Se cuenta tres veces"],
      correcta: 1,
      explicacion: "En una dimensión impar, ambas diagonales se cruzan en la posición central."
    }
  ]
};

const ejerciciosArrays2d = window.CONTENIDO["arrays2d"].ejercicios;
const solucionesArrays2d = window.CONTENIDO["arrays2d"].soluciones;
const explicacionesSolucionesArrays2d = window.CONTENIDO["arrays2d"].explicacionesSoluciones;
if (ejerciciosArrays2d.length !== solucionesArrays2d.length || ejerciciosArrays2d.length !== explicacionesSolucionesArrays2d.length) {
  throw new Error("Cada ejercicio de matrices debe tener una solución y su explicación.");
}
ejerciciosArrays2d.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesArrays2d[indice];
  ejercicio.explicacion = explicacionesSolucionesArrays2d[indice];
});
delete window.CONTENIDO["arrays2d"].soluciones;
delete window.CONTENIDO["arrays2d"].explicacionesSoluciones;
