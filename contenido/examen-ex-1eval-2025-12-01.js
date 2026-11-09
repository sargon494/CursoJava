window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-1eval-2025-12-01"] = {
  ejercicios: [
    {
      enunciado: `Ejercicio 1 (RA1, RA3) (2.5 puntos)
Implementa el método esImPARfecto(int numero) en Java que determine si un número entero dado es "imPARfecto".
Un número es considerado imPARfecto si cumple con las siguientes condiciones:
1. Está compuesto únicamente por cifras impares.
2. La suma de sus cifras es un número par.
El método debe devolver true si el número es imPARfecto y false en caso contrario.
Ejemplos:
esImPARfecto(113) → false (cifras: 1, 1, 3 → todas son impares y 1 + 1 + 3 = 5, que es impar)
esImPARfecto(1357) → true (cifras: 1, 3, 5, 7 → todas son impares y 1 + 3 + 5 + 7 = 16, que es par)`,
      solucion: `public class EsImPARfecto {

    public static boolean esImPARfecto(int numero) {
        long resto = Math.abs((long) numero); // long evita el desbordamiento con Integer.MIN_VALUE
        boolean todasImpares = true;
        int suma = 0;
        do {
            int cifra = (int) (resto % 10);
            if (cifra % 2 == 0) {
                todasImpares = false;
            }
            suma += cifra;
            resto /= 10;
        } while (resto > 0);
        return todasImpares && suma % 2 == 0;
    }

    public static void main(String[] args) {
        System.out.println(esImPARfecto(113));   // false
        System.out.println(esImPARfecto(1357));  // true
        System.out.println(esImPARfecto(2));     // false
    }
}`,
      explicacion: "Se procesa el número cifra a cifra: % 10 extrae la última y / 10 la elimina. En cada paso se comprueba que la cifra sea impar y se suma. El do-while también procesa el cero; al final solo devuelve true si todas las cifras eran impares y la suma es par. Convertir antes a long permite manejar Integer.MIN_VALUE sin desbordar al aplicar abs."
    },
    {
      enunciado: `Ejercicio 2 (RA1, RA3, RA6) (2.5 puntos)
Escribe un método en Java llamado contarApariciones que reciba como parámetros un String y un char, y devuelva un valor entero que indique la cantidad de veces que el carácter aparece dentro del String. Si el String recibido está vacío o es nulo deberá devolver 0.
Ejemplos:
contarApariciones("abracadabra", 'a') → 5 (El carácter 'a' aparece 5 veces en el String "abracadabra").
contarApariciones("Java", 'x') → 0 (El carácter 'x' no aparece en el String "Java").
contarApariciones(null, 'x') → 0 (El carácter 'x' no aparece en el String "Java").
contarApariciones("", 'x') → 0 (El carácter 'x' no aparece en el String "Java").`,
      solucion: `public class ContarApariciones {

    public static int contarApariciones(String texto, char caracter) {
        if (texto == null || texto.isEmpty()) {
            return 0;
        }
        int veces = 0;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == caracter) {
                veces++;
            }
        }
        return veces;
    }

    public static void main(String[] args) {
        System.out.println(contarApariciones("abracadabra", 'a')); // 5
        System.out.println(contarApariciones("Java", 'x'));        // 0
        System.out.println(contarApariciones(null, 'x'));          // 0
        System.out.println(contarApariciones("", 'x'));            // 0
    }
}`,
      explicacion: "Primero se resuelven los casos nulo y vacío, que no contienen coincidencias y además no se pueden recorrer normalmente. El for visita cada índice, charAt obtiene su carácter y el contador aumenta solo cuando coincide con el buscado. El método devuelve el total acumulado."
    },
    {
      enunciado: `Ejercicio 3 (RA1, RA3, RA6) (5 puntos)
Escribe un programa en Java que permita gestionar una factura de productos, cumpliendo con las siguientes funcionalidades:
1. Solicitar el número de productos y registrar sus precios (1.5 puntos): al iniciar el programa, debe preguntar al usuario cuántos productos va a comprar y recibir este valor desde el teclado. Luego, debe solicitar al usuario que ingrese el precio de cada uno de los productos y almacenar estos datos en un array.
2. Implementar un menú de opciones (1 punto): el programa debe mostrar un menú que permita al usuario elegir una de las siguientes opciones: Opción 1: Mostrar la factura. Opción 2: Mostrar el producto más caro de la factura. Opción 3: Salir del programa. Si el usuario introduce una opción incorrecta, se le deberá advertir de esto.
3. Mostrar la factura completa (1 punto): al seleccionar la Opción 1, el programa debe mostrar el precio de cada producto, seguido del coste total de la factura.
Ejemplo de salida:
Producto 1...5.50€
Producto 2...4.00€
Producto 3...10.00€
Total...19.50€
4. Encontrar el producto más caro (1.5 puntos): al seleccionar la Opción 2, el programa debe buscar y mostrar el precio del producto más caro.
Ejemplo de ejecución:
Bienvenido al sistema de gestión de facturas de productos.
Ingrese el número de productos que va a comprar: 3
Ingrese el precio del producto 1: 5.50
Ingrese el precio del producto 2: 4.00
Ingrese el precio del producto 3: 10.00
--- Menú ---
1. Mostrar la factura
2. Mostrar el producto más caro
3. Salir
Seleccione una opción: 1
Factura:
Producto 1...5.50€
Producto 2...4.00€
Producto 3...10.00€
Total...19.50€
--- Menú ---
1. Mostrar la factura
2. Mostrar el producto más caro
3. Salir
Seleccione una opción: 2
Producto más caro:
Producto 3...10.00€
--- Menú ---
1. Mostrar la factura
2. Mostrar el producto más caro
3. Salir
Seleccione una opción: 3
Saliendo del programa. ¡Gracias por utilizar el sistema de facturación!`,
      solucion: `import java.util.Locale;
import java.util.Scanner;

public class FacturaProductos {

    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in).useLocale(Locale.US);

        System.out.println("Bienvenido al sistema de gestión de facturas de productos.");
        System.out.print("Ingrese el número de productos que va a comprar: ");
        int numProductos = teclado.nextInt();
        while (numProductos < 1) {
            System.out.print("Debe comprar al menos un producto. Intente de nuevo: ");
            numProductos = teclado.nextInt();
        }

        double[] precios = new double[numProductos];
        for (int i = 0; i < precios.length; i++) {
            System.out.printf("Ingrese el precio del producto %d: ", i + 1);
            precios[i] = teclado.nextDouble();
        }

        int opcion;
        do {
            mostrarMenu();
            opcion = teclado.nextInt();
            switch (opcion) {
                case 1 -> mostrarFactura(precios);
                case 2 -> mostrarProductoMasCaro(precios);
                case 3 -> System.out.println("Saliendo del programa. ¡Gracias por utilizar el sistema de facturación!");
                default -> System.out.println("Opción incorrecta. Elija 1, 2 o 3.");
            }
        } while (opcion != 3);

        teclado.close();
    }

    static void mostrarMenu() {
        System.out.println("--- Menú ---");
        System.out.println("1. Mostrar la factura");
        System.out.println("2. Mostrar el producto más caro");
        System.out.println("3. Salir");
        System.out.print("Seleccione una opción: ");
    }

    static void mostrarFactura(double[] precios) {
        System.out.println("Factura:");
        double total = 0;
        for (int i = 0; i < precios.length; i++) {
            System.out.printf(Locale.US, "Producto %d...%.2f€%n", i + 1, precios[i]);
            total += precios[i];
        }
        System.out.printf(Locale.US, "Total...%.2f€%n", total);
    }

    static void mostrarProductoMasCaro(double[] precios) {
        int indiceMax = 0;
        for (int i = 1; i < precios.length; i++) {
            if (precios[i] > precios[indiceMax]) {
                indiceMax = i;
            }
        }
        System.out.println("Producto más caro:");
        System.out.printf(Locale.US, "Producto %d...%.2f€%n", indiceMax + 1, precios[indiceMax]);
    }
}`,
      explicacion: "El array conserva los precios para reutilizarlos en las distintas opciones del menú. El do-while muestra el menú al menos una vez y continúa hasta elegir salir; sus métodos auxiliares separan las tareas. Para hallar el más caro se guarda el índice del máximo y se actualiza al encontrar uno mayor. Locale.US fija el punto decimal al leer y mostrar precios."
    }
  ]
};
