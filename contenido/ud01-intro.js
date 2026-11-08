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
  ]
};
