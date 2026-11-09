// Unidad 3: enunciados ampliados, explicación y autoevaluación.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["bucles"] = {
  ejercicios: [
    {
      enunciado: "Pide un entero no negativo n y calcula n! multiplicando los enteros desde 1 hasta n. Define 0! = 1. Comprueba también qué ocurre si la entrada es negativa y evita desbordamientos dentro del rango que elijas.",
    },
    {
      enunciado: "Lee números enteros hasta que el usuario introduzca 0. El cero es el centinela y no forma parte del cálculo. Muestra la suma y la media; si no se ha introducido ningún número distinto de cero, indica que no existe media.",
    },
    {
      enunciado: "Genera un número aleatorio entre 1 y 100, ambos incluidos. Da como máximo 10 intentos y, tras cada intento fallido, indica si el número buscado es mayor o menor. Termina al acertar o al agotar los intentos.",
    },
    {
      enunciado: "Pide cuántos números se van a analizar y lee exactamente esa cantidad. Cuenta y muestra por separado los positivos, los negativos y los ceros. Acepta una cantidad de entradas igual a cero sin intentar leer ningún número.",
    },
    {
      enunciado: "Lee caracteres hasta recibir un espacio en blanco. Para cada carácter anterior al espacio, indica si es una vocal, ignorando mayúsculas y minúsculas. Usa un bucle y explica qué ocurre si el primer carácter ya es el espacio.",
    },
    {
      enunciado: "Pide dos enteros que representan los extremos de un intervalo. Muestra todos los números pares comprendidos entre ellos, incluidos los extremos cuando sean pares. Define el comportamiento si el usuario introduce primero el extremo mayor.",
    },
    {
      enunciado: "Pide un entero e imprime su tabla de multiplicar desde 1 hasta 10, una operación por línea. Usa un bucle y muestra cada operación además de su resultado.",
    },
    {
      enunciado: "Pide dos límites y después lee números hasta que se introduzca 0. Suma los valores que estén dentro del intervalo, incluidos sus extremos, y cuenta los que queden fuera. Al terminar, muestra ambas estadísticas.",
    },
    {
      enunciado: "Pide un entero y determina si es primo. Un número menor que 2 no es primo. Evita probar divisores innecesarios y detén la búsqueda en cuanto encuentres un divisor.",
    },
    {
      enunciado: "Pide cuántos valores se van a leer y calcula su media. Si la cantidad es cero o negativa, informa de que no se puede calcular; si es válida, lee exactamente esa cantidad de valores.",
    },
    {
      enunciado: "Pide un entero y cuenta sus cifras decimales usando divisiones sucesivas entre 10. El cero tiene una cifra. Decide y documenta cómo tratar los números negativos.",
    },
    {
      enunciado: "Pide dos enteros y calcula su máximo común divisor con el algoritmo de Euclides. Prueba pares en los que uno de los valores sea múltiplo del otro y considera el caso de valores negativos o ambos ceros.",
    },
    {
      enunciado: "Pide un número positivo de filas e imprime un triángulo alineado a la izquierda: la fila 1 contiene un asterisco, la fila 2 contiene dos y así sucesivamente hasta la última fila.",
    },
    {
      enunciado: "Muestra las tablas de multiplicar del 1 al 10. Usa dos bucles: uno exterior para escoger la tabla y otro interior para sus multiplicadores.",
    },
    {
      enunciado: "Pide un número positivo de filas e imprime una pirámide creciente de cifras: la primera fila muestra 1, la segunda 12, la tercera 123, hasta llegar a la fila indicada.",
    },
    {
      enunciado: "Pide la altura y la anchura de un rectángulo y dibújalo con asteriscos. Cada fila debe tener exactamente la anchura indicada; valida que las dimensiones sean positivas.",
    }
  ],

  soluciones: [
    `import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("n (0-20): ");
        int n = sc.nextInt();
        if (n < 0 || n > 20) {
            System.out.println("Introduce un valor entre 0 y 20.");
        } else {
            long factorial = 1;
            for (int i = 2; i <= n; i++) {
                factorial *= i;
            }
            System.out.println(n + "! = " + factorial);
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class SumaMediaHastaCero {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int suma = 0;
        int cantidad = 0;
        System.out.print("Número (0 para terminar): ");
        int numero = sc.nextInt();
        while (numero != 0) {
            suma += numero;
            cantidad++;
            System.out.print("Número (0 para terminar): ");
            numero = sc.nextInt();
        }
        if (cantidad == 0) {
            System.out.println("No se introdujeron números.");
        } else {
            System.out.println("Suma: " + suma);
            System.out.println("Media: " + (suma / (double) cantidad));
        }
        sc.close();
    }
}`,
    `import java.util.Random;
import java.util.Scanner;

public class AdivinaNumero {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int secreto = new Random().nextInt(100) + 1;
        boolean acertado = false;
        for (int intento = 1; intento <= 10 && !acertado; intento++) {
            System.out.print("Intento " + intento + "/10: ");
            int numero = sc.nextInt();
            if (numero == secreto) {
                acertado = true;
                System.out.println("¡Acertaste!");
            } else if (numero < secreto) {
                System.out.println("El número es mayor.");
            } else {
                System.out.println("El número es menor.");
            }
        }
        if (!acertado) System.out.println("El número era " + secreto + ".");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ContarSignos {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Cantidad de números: ");
        int n = sc.nextInt();
        if (n < 0) {
            System.out.println("La cantidad no puede ser negativa.");
        } else {
            int positivos = 0, negativos = 0, ceros = 0;
            for (int i = 0; i < n; i++) {
                int numero = sc.nextInt();
                if (numero > 0) positivos++;
                else if (numero < 0) negativos++;
                else ceros++;
            }
            System.out.println("Positivos: " + positivos);
            System.out.println("Negativos: " + negativos);
            System.out.println("Ceros: " + ceros);
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ComprobarVocales {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Escribe caracteres y termina con un espacio: ");
        String texto = sc.nextLine();
        for (int i = 0; i < texto.length() && !Character.isWhitespace(texto.charAt(i)); i++) {
            char letra = Character.toLowerCase(texto.charAt(i));
            boolean vocal = "aeiouáéíóú".indexOf(letra) >= 0;
            System.out.println(texto.charAt(i) + (vocal ? " es vocal" : " no es vocal"));
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ParesIntervalo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Primer extremo: ");
        int a = sc.nextInt();
        System.out.print("Segundo extremo: ");
        int b = sc.nextInt();
        int inicio = Math.min(a, b);
        int fin = Math.max(a, b);
        for (int n = inicio; n <= fin; n++) {
            if (n % 2 == 0) System.out.println(n);
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class TablaMultiplicar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número: ");
        int n = sc.nextInt();
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class EstadisticasIntervalo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Límite inferior: ");
        int inferior = sc.nextInt();
        System.out.print("Límite superior: ");
        int superior = sc.nextInt();
        int inicio = Math.min(inferior, superior);
        int fin = Math.max(inferior, superior);
        int sumaDentro = 0, cantidadFuera = 0;
        System.out.print("Valor (0 para terminar): ");
        int valor = sc.nextInt();
        while (valor != 0) {
            if (valor >= inicio && valor <= fin) sumaDentro += valor;
            else cantidadFuera++;
            System.out.print("Valor (0 para terminar): ");
            valor = sc.nextInt();
        }
        System.out.println("Suma dentro: " + sumaDentro);
        System.out.println("Cantidad fuera: " + cantidadFuera);
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class NumeroPrimo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número: ");
        int n = sc.nextInt();
        boolean primo = n >= 2;
        for (int divisor = 2; primo && divisor <= n / divisor; divisor++) {
            if (n % divisor == 0) primo = false;
        }
        System.out.println(n + (primo ? " es primo" : " no es primo"));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class MediaN {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Cantidad de valores: ");
        int n = sc.nextInt();
        if (n <= 0) {
            System.out.println("La cantidad debe ser positiva.");
        } else {
            double suma = 0;
            for (int i = 0; i < n; i++) suma += sc.nextDouble();
            System.out.println("Media: " + (suma / n));
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ContarDigitos {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número entero: ");
        long n = sc.nextLong();
        n = Math.abs(n);
        int digitos = 1;
        while (n >= 10) {
            n /= 10;
            digitos++;
        }
        System.out.println("Cifras: " + digitos);
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class MCD {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Dos enteros: ");
        long a = Math.abs(sc.nextLong());
        long b = Math.abs(sc.nextLong());
        if (a == 0 && b == 0) {
            System.out.println("El MCD de 0 y 0 no está definido.");
        } else {
            while (b != 0) {
                long resto = a % b;
                a = b;
                b = resto;
            }
            System.out.println("MCD: " + a);
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class TrianguloAsteriscos {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Filas: ");
        int filas = sc.nextInt();
        if (filas <= 0) {
            System.out.println("Las filas deben ser positivas.");
        } else {
            for (int fila = 1; fila <= filas; fila++) {
                for (int columna = 1; columna <= fila; columna++) {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
        sc.close();
    }
}`,
    `public class TablasAnidadas {
    public static void main(String[] args) {
        for (int tabla = 1; tabla <= 10; tabla++) {
            System.out.println("Tabla del " + tabla);
            for (int factor = 1; factor <= 10; factor++) {
                System.out.println(tabla + " x " + factor + " = " + (tabla * factor));
            }
        }
    }
}`,
    `import java.util.Scanner;

public class PiramideNumeros {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Filas: ");
        int filas = sc.nextInt();
        if (filas <= 0) {
            System.out.println("Las filas deben ser positivas.");
        } else {
            for (int fila = 1; fila <= filas; fila++) {
                for (int digito = 1; digito <= fila; digito++) {
                    System.out.print(digito);
                }
                System.out.println();
            }
        }
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class RectanguloAsteriscos {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Altura y anchura: ");
        int altura = sc.nextInt();
        int anchura = sc.nextInt();
        if (altura <= 0 || anchura <= 0) {
            System.out.println("Las dimensiones deben ser positivas.");
        } else {
            for (int fila = 0; fila < altura; fila++) {
                for (int columna = 0; columna < anchura; columna++) {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
        sc.close();
    }
}`
  ],

  explicacionesSoluciones: [
    "El factorial se inicia en 1 y el bucle lo multiplica por cada entero hasta n. Así, con n igual a 0 no se ejecuta ninguna vuelta y se conserva 0! = 1. Se limita n a 20 porque 20! cabe en long, pero 21! no.",
    "El cero actúa como centinela y se comprueba antes de sumar, por lo que no entra en el total ni en la cantidad. La media solo se calcula cuando esa cantidad es mayor que cero, evitando dividir entre cero.",
    "Random.nextInt(100) + 1 produce el rango inclusivo 1..100. El contador limita los intentos a diez; tras una respuesta incorrecta se compara con el objetivo para dar la pista adecuada y el bucle termina al acertar o agotar intentos.",
    "El primer bucle lee exactamente la cantidad indicada y clasifica cada valor con comparaciones contra cero. Se mantienen contadores independientes para positivos, negativos y ceros, de modo que cada entrada incrementa una sola categoría.",
    "Se leen caracteres hasta el espacio, que funciona como centinela y no se clasifica. Character.toLowerCase normaliza mayúsculas; una condición comprueba si el carácter es alguna de las cinco vocales.",
    "Se ordenan conceptualmente los extremos para que el recorrido vaya de menor a mayor, y se ajusta el inicio al primer par si hace falta. Después se avanza de dos en dos para visitar solo pares, incluidos los límites cuando corresponden.",
    "Un for recorre los multiplicadores del 1 al 10. En cada vuelta se imprime la operación completa y su producto, sin duplicar código para cada línea de la tabla.",
    "Cada número se compara con los límites en orden, incluyendo ambos extremos. Los que pertenecen al intervalo se suman; los demás incrementan un contador. El cero detiene la lectura y queda fuera de ambas estadísticas.",
    "Los números menores que 2 se descartan antes de buscar divisores. Para los demás basta probar hasta la raíz cuadrada: si existiera un factor mayor, tendría una pareja menor ya comprobada. Se detiene en cuanto aparece un divisor.",
    "El bucle lee exactamente n valores y acumula su suma. La cantidad se valida antes de leer; si es cero o negativa no existe media. La división se realiza en decimal para no truncar el resultado.",
    "Cada división entre 10 elimina una cifra y el contador registra cuántas veces se repite el proceso. Se trata el cero aparte porque no entraría al bucle normal; para negativos se usa su magnitud con cuidado de no desbordar.",
    "El algoritmo de Euclides reemplaza repetidamente (a, b) por (b, a % b) hasta que el resto es cero; entonces a es el MCD. Se normalizan los signos para que el resultado sea no negativo y se contempla el caso de ambos valores cero.",
    "El bucle exterior controla la fila y el interior imprime tantos asteriscos como número de fila. Un salto de línea al terminar cada fila crea el triángulo alineado a la izquierda.",
    "El bucle exterior elige el número de la tabla y el interior recorre sus multiplicadores. La combinación genera cada pareja una vez, evitando escribir manualmente las cien multiplicaciones.",
    "Para cada fila, un bucle interior imprime las cifras desde 1 hasta el número de fila. El crecimiento del límite produce las líneas 1, 12, 123 y así sucesivamente.",
    "Se validan altura y anchura antes de dibujar. Dos bucles anidados producen una fila por vuelta exterior y exactamente anchura asteriscos en cada vuelta interior."
  ],

  explicacion: [
    {
      titulo: "1. Repetir instrucciones es una decisión de diseño",
      parrafos: [
        "Un bucle ejecuta un bloque varias veces mientras se mantenga una condición. En vez de escribir diez instrucciones casi iguales, describimos qué debe repetirse y cómo cambia el estado en cada vuelta. El programa necesita una condición de continuación, una actualización y, normalmente, un valor inicial.",
        "Antes de programar, define qué significa una iteración y qué debe ser cierto al empezar cada vuelta. Por ejemplo, al sumar los números del 1 al n, antes de procesar i la variable suma debe contener la suma de los anteriores. Este razonamiento ayuda a encontrar errores de una vuelta de más o de menos.",
        "Los bucles no son solo para contar. También sirven para leer datos hasta una señal de fin, buscar un elemento, validar una entrada y procesar cada carácter o elemento de una colección."
      ],
      codigo: `int suma = 0;
for (int i = 1; i <= 4; i++) {
    suma += i;
    System.out.println("Tras sumar " + i + ": " + suma);
}`
    },
    {
      titulo: "2. while: repetir mientras la condición sea verdadera",
      parrafos: [
        "while comprueba primero la condición. Si ya es false al entrar, el cuerpo se ejecuta cero veces. Es apropiado cuando no sabes cuántas repeticiones habrá de antemano, como leer hasta un centinela o repetir una búsqueda hasta encontrar el dato.",
        "La condición debe depender de algo que pueda cambiar dentro del bucle. Si el cuerpo no modifica ninguna variable relevante y la condición sigue siendo true, el programa no terminará. Sigue el valor de la condición en papel con dos o tres iteraciones para comprobar que progresa hacia la salida.",
        "Un centinela es un valor especial que termina la entrada y no se procesa como dato normal. Por ejemplo, al leer números hasta 0, comprueba el 0 antes de sumarlo y cuenta por separado cuántos datos reales se han leído."
      ],
      codigo: `int numero = sc.nextInt();
int suma = 0;
int cantidad = 0;

while (numero != 0) {
    suma += numero;
    cantidad++;
    numero = sc.nextInt();
}

if (cantidad > 0) {
    System.out.println("Media: " + (suma / (double) cantidad));
} else {
    System.out.println("No se introdujeron datos");
}`
    },
    {
      titulo: "3. do-while: ejecutar al menos una vez",
      parrafos: [
        "do-while ejecuta primero el cuerpo y comprueba la condición al final. Por eso el bloque ocurre al menos una vez. Resulta natural para mostrar un menú antes de pedir la opción y volverlo a mostrar mientras no se elija salir.",
        "La sintaxis termina con punto y coma después del while. Esa diferencia con while es fácil de pasar por alto y el compilador ayuda a detectarla.",
        "No uses do-while solo porque el ejercicio diga «bucle». Si la acción no debe ocurrir cuando la condición inicial ya es falsa, while expresa mejor esa intención."
      ],
      codigo: `int opcion;
do {
    System.out.println("1. Ver datos");
    System.out.println("0. Salir");
    opcion = sc.nextInt();
} while (opcion != 0);`
    },
    {
      titulo: "4. for: contar con principio, límite y paso",
      parrafos: [
        "El for reúne inicialización, condición y actualización. Es especialmente claro cuando recorres una secuencia con un contador: for (inicio; continuar; avanzar). La variable declarada en el encabezado suele existir solo dentro del bucle.",
        "Los límites determinan cuántas iteraciones habrá. i < n visita 0 hasta n - 1; i <= n visita también n. Si el array tiene n elementos, sus índices válidos son 0 a n - 1, así que lo normal es usar i < array.length.",
        "El paso puede ser distinto de uno. Para recorrer valores pares puedes empezar en el primer par y avanzar de dos en dos. Asegúrate de que la actualización no se aleja de la condición."
      ],
      codigo: `for (int i = 0; i < 5; i++) {
    System.out.println("Índice: " + i);
}

for (int par = 2; par <= 10; par += 2) {
    System.out.println(par);
}`
    },
    {
      titulo: "5. Elegir el bucle y controlar la entrada",
      parrafos: [
        "Elige según el problema: for si conoces el número de vueltas o recorres un intervalo; while si la repetición depende de un estado comprobado antes; do-while si necesitas hacer una primera acción antes de comprobar si se repite.",
        "Validar una entrada también es un bucle. Primero lees el valor, después repites mientras no cumpla el rango. Es importante actualizar la entrada dentro del cuerpo; de otro modo, el programa pregunta indefinidamente sobre el mismo valor.",
        "Un bucle que lee datos de consola puede fallar si el usuario escribe texto donde se espera un número. En esta unidad, centra el ejercicio en el flujo con entradas válidas; el tratamiento detallado de excepciones pertenece a una unidad posterior."
      ],
      codigo: `System.out.print("Introduce un valor entre 1 y 10: ");
int valor = sc.nextInt();
while (valor < 1 || valor > 10) {
    System.out.print("Fuera de rango. Inténtalo otra vez: ");
    valor = sc.nextInt();
}`
    },
    {
      titulo: "6. break, continue y bucles anidados",
      parrafos: [
        "break termina inmediatamente el bucle más cercano. Puede ser útil al encontrar un divisor de un número primo: no hace falta seguir probando. continue omite el resto del cuerpo actual y pasa a comprobar la siguiente iteración.",
        "Aunque break y continue son válidos, un bucle con una condición de salida clara suele ser más fácil de seguir. Si al leer el código cuesta saber por qué termina, intenta expresar esa regla en la propia condición.",
        "Un bucle anidado es un bucle dentro de otro. Para cada vuelta del exterior, el interior puede recorrer todos sus valores. Si ambos realizan n iteraciones, el cuerpo interior se ejecuta n por n veces; por eso conviene identificar qué representa cada contador y calcular cuántas operaciones se generan."
      ],
      codigo: `for (int fila = 1; fila <= 3; fila++) {
    for (int columna = 1; columna <= 4; columna++) {
        System.out.print("*");
    }
    System.out.println();
}`
    },
    {
      titulo: "7. Errores típicos, pruebas y depuración en Eclipse",
      parrafos: [
        "Bucle infinito: la condición nunca cambia a false. Error de límite: usar <= donde debía ser < y procesar un elemento adicional. Error de actualización: incrementar antes de usar el valor cuando se pretendía lo contrario.",
        "Prueba el mínimo permitido, el máximo permitido, un valor justo fuera de cada límite y un caso vacío. En el bucle de entrada hasta cero, prueba que el primer valor sea cero y que haya solo un dato antes del centinela; así detectas divisiones entre cero y conteos incorrectos.",
        "En Eclipse, pon un breakpoint dentro del bucle y observa las variables en la vista Variables. Usa Step Over para avanzar una vuelta, comprueba la condición y el contador, y termina la depuración si detectas que el estado se repite sin progresar."
      ],
      codigo: `// Error: i nunca cambia; si n > 0, no termina.
int i = 0;
while (i < n) {
    System.out.println(i);
    // falta i++;
}`
    }
  ],

  quiz: [
    {
      pregunta: "Si la condición inicial de un while es false, ¿cuántas veces se ejecuta su cuerpo?",
      opciones: ["Siempre una vez", "Cero veces", "Dos veces", "Depende del tipo de variable"],
      correcta: 1,
      explicacion: "while comprueba primero la condición. Si es false desde el inicio, no entra en el cuerpo."
    },
    {
      pregunta: "¿Qué garantiza do-while frente a while?",
      opciones: ["Que nunca se repita más de una vez", "Que el cuerpo se ejecute al menos una vez", "Que no hace falta condición", "Que siempre termina en la segunda iteración"],
      correcta: 1,
      explicacion: "do-while evalúa la condición al final; por eso el cuerpo ya se ejecutó al menos una vez."
    },
    {
      pregunta: "¿Qué valores toma i en for (int i = 0; i < 4; i++)?",
      opciones: ["0, 1, 2, 3", "0, 1, 2, 3, 4", "1, 2, 3, 4", "1, 2, 3"],
      correcta: 0,
      explicacion: "La condición exige i < 4, así que la última iteración ocurre con i igual a 3."
    },
    {
      pregunta: "¿Qué debe hacerse con el valor leído al usar 0 como centinela para terminar?",
      opciones: ["Sumarlo y luego terminar", "Contarlo dos veces", "Detectarlo antes de procesarlo como dato", "Cambiarlo automáticamente por 1"],
      correcta: 2,
      explicacion: "El centinela señala el fin y normalmente no forma parte de los datos que se suman ni promedian."
    },
    {
      pregunta: "¿Qué hace break dentro de un bucle?",
      opciones: ["Salta a la siguiente iteración", "Termina el bucle más cercano", "Reinicia el contador", "Pausa el programa hasta recibir datos"],
      correcta: 1,
      explicacion: "break sale del bucle más cercano que lo contiene. continue, en cambio, pasa a la siguiente iteración."
    },
    {
      pregunta: "Un bucle exterior repite 3 veces y uno interior 4 veces por cada vuelta. ¿Cuántas veces se ejecuta el cuerpo interior?",
      opciones: ["7", "12", "4", "3"],
      correcta: 1,
      explicacion: "El interior se ejecuta cuatro veces en cada una de las tres vueltas externas: 3 × 4 = 12."
    },
    {
      pregunta: "¿Cuál es un uso habitual de for?",
      opciones: ["Recorrer un array desde el índice 0 hasta length - 1", "Leer hasta un centinela desconocido", "Ejecutar el cuerpo al menos una vez", "Evitar definir el contador"],
      correcta: 0,
      explicacion: "for reúne con claridad inicialización, límite y avance, por lo que funciona bien al recorrer índices o un número conocido de posiciones."
    },
    {
      pregunta: "¿Por qué puede no terminar un while (i < n) si n es positivo?",
      opciones: ["Porque i empieza en cero", "Porque el cuerpo no cambia i ni otra parte de la condición", "Porque while solo admite números pares", "Porque la condición usa el operador <"],
      correcta: 1,
      explicacion: "Si la condición sigue verdadera y el cuerpo no modifica el estado que la controla, el bucle no progresa hacia la salida."
    }
  ]
};

const ejerciciosBucles = window.CONTENIDO["bucles"].ejercicios;
const solucionesBucles = window.CONTENIDO["bucles"].soluciones;
const explicacionesSolucionesBucles = window.CONTENIDO["bucles"].explicacionesSoluciones;
if (ejerciciosBucles.length !== solucionesBucles.length || ejerciciosBucles.length !== explicacionesSolucionesBucles.length) {
  throw new Error("Cada ejercicio de bucles debe tener una solución y su explicación.");
}
ejerciciosBucles.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesBucles[indice];
  ejercicio.explicacion = explicacionesSolucionesBucles[indice];
});
delete window.CONTENIDO["bucles"].soluciones;
delete window.CONTENIDO["bucles"].explicacionesSoluciones;
