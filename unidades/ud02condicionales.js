// Unidad 2: enunciados completos y soluciones.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["condicionales"] = {
  ejercicios: [
    {
      enunciado: "Escribe un programa que solicite un número y determine si es par o impar, imprimiendo el resultado.",
      solucion: `import java.util.Scanner;

public class ParOImpar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número: ");
        int n = sc.nextInt();
        if (n % 2 == 0) {
            System.out.println(n + " es par");
        } else {
            System.out.println(n + " es impar");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide dos números. Si el segundo no es cero, muestra la división del primero entre el segundo; si es cero, muestra un error.",
      solucion: `import java.util.Scanner;

public class DivisionVerificada {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Primer número: ");
        double a = sc.nextDouble();
        System.out.print("Segundo número: ");
        double b = sc.nextDouble();
        if (b != 0) {
            System.out.println("Resultado: " + (a / b));
        } else {
            System.out.println("Error: no es posible dividir entre cero.");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide un nombre de usuario y una contraseña. Si son \"vespertino\" y \"VivaErBetis\", muestra \"Has entrado al sistema\"; si no, muestra un error.",
      solucion: `import java.util.Scanner;

public class Autenticacion {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Usuario: ");
        String usuario = sc.nextLine();
        System.out.print("Contraseña: ");
        String clave = sc.nextLine();
        // Para cadenas usamos equals, nunca ==
        if (usuario.equals("vespertino") && clave.equals("VivaErBetis")) {
            System.out.println("Has entrado al sistema");
        } else {
            System.out.println("Usuario o contraseña incorrectos");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide una cadena y comprueba si está escrita completamente en mayúsculas.",
      solucion: `import java.util.Scanner;

public class ComprobarMayusculas {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Escribe una cadena: ");
        String texto = sc.nextLine();
        // Si al pasar a mayúsculas no cambia nada, ya estaba en mayúsculas
        if (texto.equals(texto.toUpperCase())) {
            System.out.println("La cadena está en mayúsculas");
        } else {
            System.out.println("La cadena NO está en mayúsculas");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide una base y un exponente. Si el exponente es positivo muestra la potencia; si es 0, muestra 1; si es negativo, muestra 1 / potencia con exponente positivo.",
      solucion: `import java.util.Scanner;

public class Potencia {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Base: ");
        double base = sc.nextDouble();
        System.out.print("Exponente (entero): ");
        int exp = sc.nextInt();
        double resultado;
        if (exp > 0) {
            resultado = Math.pow(base, exp);
        } else if (exp == 0) {
            resultado = 1;
        } else {
            resultado = 1 / Math.pow(base, -exp);
        }
        System.out.println("Resultado: " + resultado);
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide tres números y los muestra ordenados de mayor a menor.",
      solucion: `import java.util.Scanner;

public class OrdenarTres {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Primer número: ");
        int a = sc.nextInt();
        System.out.print("Segundo número: ");
        int b = sc.nextInt();
        System.out.print("Tercer número: ");
        int c = sc.nextInt();
        int mayor = Math.max(a, Math.max(b, c));
        int menor = Math.min(a, Math.min(b, c));
        int medio = a + b + c - mayor - menor;   // el que queda en medio
        System.out.println(mayor + " >= " + medio + " >= " + menor);
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide las longitudes de los tres lados de un triángulo (A, B, C) y determina su tipo: rectángulo si cumple Pitágoras, equilátero si los tres son iguales, isósceles si dos son iguales, y escaleno en otro caso.",
      solucion: `import java.util.Scanner;

public class TipoTriangulo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Lado A: ");
        double a = sc.nextDouble();
        System.out.print("Lado B: ");
        double b = sc.nextDouble();
        System.out.print("Lado C: ");
        double c = sc.nextDouble();

        // Ordenamos para que c sea el lado mayor al comprobar Pitágoras
        double mayor = Math.max(a, Math.max(b, c));
        double otro1 = a + b + c - mayor - Math.min(a, Math.min(b, c));
        double menor = Math.min(a, Math.min(b, c));

        if (Math.abs(menor * menor + otro1 * otro1 - mayor * mayor) < 1e-9) {
            System.out.println("El triángulo es rectángulo");
        }
        // Equilátero antes que isósceles: si es equilátero, también tiene dos lados iguales
        if (a == b && b == c) {
            System.out.println("El triángulo es equilátero");
        } else if (a == b || b == c || a == c) {
            System.out.println("El triángulo es isósceles");
        } else {
            System.out.println("El triángulo es escaleno");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Lee un año y determina si es bisiesto: divisible por 4 pero no por 100, salvo que también sea divisible por 400.",
      solucion: `import java.util.Scanner;

public class Bisiesto {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Año: ");
        int anio = sc.nextInt();
        boolean bisiesto = (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0;
        System.out.println(anio + (bisiesto ? " es bisiesto" : " no es bisiesto"));
        sc.close();
    }
}`
    },
    {
      enunciado: "Calcula el coste de un viaje escolar. Con 100 o más alumnos, 65 € por alumno; entre 50 y 99, 70 €; entre 30 y 49, 95 €; con menos de 30, el autobús cuesta 4000 € en total. Muestra el pago total a la compañía y lo que paga cada alumno.",
      solucion: `import java.util.Scanner;

public class ViajeEscolar {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número de alumnos: ");
        int n = sc.nextInt();
        if (n <= 0) {
            System.out.println("Debe haber al menos un alumno.");
            sc.close();
            return;
        }
        double precioAlumno;
        double totalBus;
        if (n >= 100) {
            precioAlumno = 65;
        } else if (n >= 50) {
            precioAlumno = 70;
        } else if (n >= 30) {
            precioAlumno = 95;
        } else {
            precioAlumno = -1;   // indica que el autobús tiene coste fijo
        }
        if (precioAlumno > 0) {
            totalBus = n * precioAlumno;   // lo que se recauda de los alumnos
        } else {
            totalBus = 4000;               // coste fijo del autobús
            precioAlumno = totalBus / n;   // reparto entre los alumnos
        }
        System.out.println("Pago total a la compañía de autobuses: " + totalBus + " €");
        System.out.println("Cada alumno paga: " + precioAlumno + " €");
        sc.close();
    }
}`
    },
    {
      enunciado: "Calcula el coste de una llamada según su duración en minutos: los 5 primeros a 1 €; los minutos 6, 7 y 8 a 0,80 €; los minutos 9 y 10 a 0,70 €; a partir del minuto 11, a 0,50 € cada minuto.",
      solucion: `import java.util.Scanner;

public class CobroLlamada {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Duración en minutos: ");
        int minutos = sc.nextInt();
        double coste = 0;
        if (minutos <= 5) {
            coste = minutos * 1.0;
        } else if (minutos <= 8) {
            coste = 5 * 1.0 + (minutos - 5) * 0.80;
        } else if (minutos <= 10) {
            coste = 5 * 1.0 + 3 * 0.80 + (minutos - 8) * 0.70;
        } else {
            coste = 5 * 1.0 + 3 * 0.80 + 2 * 0.70 + (minutos - 10) * 0.50;
        }
        System.out.printf("Coste total: %.2f €%n", coste);
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide un número del 1 al 7 y muestra el nombre del día de la semana correspondiente (1 = lunes, etc.).",
      solucion: `import java.util.Scanner;

public class DiaSemana {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Número del 1 al 7: ");
        int dia = sc.nextInt();
        String nombre;
        switch (dia) {
            case 1: nombre = "lunes"; break;
            case 2: nombre = "martes"; break;
            case 3: nombre = "miércoles"; break;
            case 4: nombre = "jueves"; break;
            case 5: nombre = "viernes"; break;
            case 6: nombre = "sábado"; break;
            case 7: nombre = "domingo"; break;
            default: nombre = null;
        }
        if (nombre != null) {
            System.out.println("Día " + dia + ": " + nombre);
        } else {
            System.out.println("Número no válido.");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Pide un número del 1 al 12 y muestra cuántos días tiene ese mes (febrero, 28 días).",
      solucion: `import java.util.Scanner;

public class DiasMes {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Mes (1-12): ");
        int mes = sc.nextInt();
        int dias;
        switch (mes) {
            case 2:
                dias = 28;
                break;
            case 4: case 6: case 9: case 11:
                dias = 30;
                break;
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                dias = 31;
                break;
            default:
                dias = -1;
        }
        if (dias > 0) {
            System.out.println("El mes " + mes + " tiene " + dias + " días");
        } else {
            System.out.println("Mes no válido.");
        }
        sc.close();
    }
}`
    },
    {
      enunciado: "Muestra un menú con cinco zonas (América del Norte 24 €/g, América Central 20 €/g, América del Sur 21 €/g, Europa 10 €/g, Asia 18 €/g). Pide la zona y el peso en kilogramos. Si el peso supera 5 kg, rechaza el paquete; si no, calcula el coste.",
      solucion: `import java.util.Scanner;

public class EnvioInternacional {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("1. América del Norte (24 €/g)");
        System.out.println("2. América Central (20 €/g)");
        System.out.println("3. América del Sur (21 €/g)");
        System.out.println("4. Europa (10 €/g)");
        System.out.println("5. Asia (18 €/g)");
        System.out.print("Elige una zona: ");
        int zona = sc.nextInt();
        double tarifa;
        switch (zona) {
            case 1: tarifa = 24; break;
            case 2: tarifa = 20; break;
            case 3: tarifa = 21; break;
            case 4: tarifa = 10; break;
            case 5: tarifa = 18; break;
            default:
                System.out.println("Zona no válida.");
                sc.close();
                return;
        }
        System.out.print("Peso en kilogramos: ");
        double kg = sc.nextDouble();
        if (kg > 5) {
            System.out.println("Paquete rechazado: supera el peso máximo de 5 kg.");
        } else {
            double gramos = kg * 1000;             // la tarifa es por gramo
            System.out.println("Coste del envío: " + (gramos * tarifa) + " €");
        }
        sc.close();
    }
}`
    }
  ]
};