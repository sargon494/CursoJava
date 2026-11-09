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
}`,
      explicacion: "El resto de dividir un entero entre 2 (n % 2) es cero exactamente cuando el número es par. El if compara ese resto con cero y el else cubre el único caso restante: impar."
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
}`,
      explicacion: "Antes de dividir se comprueba que b sea distinto de cero, evitando una división inválida. Los datos son double para admitir decimales; si b vale cero, se muestra el error en vez de calcular a / b."
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
}`,
      explicacion: "Las cadenas se comparan por contenido con equals(), no con ==, que compararía referencias a objetos. El operador && exige que usuario y contraseña coincidan a la vez; si falla cualquiera, se ejecuta el mensaje de error."
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
}`,
      explicacion: "toUpperCase() crea una versión en mayúsculas. Si es igual al texto original, no había letras minúsculas que cambiar. También se consideran válidas las cadenas sin letras, como una cadena vacía o formada solo por números."
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
}`,
      explicacion: "Se separan los tres casos del exponente: Math.pow calcula potencias positivas, todo número distinto de cero elevado a cero vale 1 y un exponente negativo usa la inversa de la potencia positiva correspondiente. Por ejemplo, 2^-3 se calcula como 1 / 2^3."
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
}`,
      explicacion: "Math.max obtiene el mayor y Math.min el menor de los tres valores. Como la suma original equivale a mayor + medio + menor, al restar de ella los extremos queda el valor intermedio. El método también funciona cuando hay valores repetidos."
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
}`,
      explicacion: "Primero se identifican el lado mayor y los otros dos para comprobar el teorema de Pitágoras en el orden correcto. La tolerancia 1e-9 evita exigir igualdad exacta a double. Después se clasifica por igualdad de lados, comprobando equilátero antes que isósceles para no confundirlos. La solución muestra si es rectángulo y además informa su tipo por lados."
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
}`,
      explicacion: "Un año es bisiesto si es divisible por 4 y no por 100, o si es divisible por 400. Los paréntesis agrupan la primera regla y || añade la excepción de los múltiplos de 400. El ternario elige el mensaje según el booleano."
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
}`,
      explicacion: "Se validan primero los alumnos para impedir dividir entre cero. La cadena if/else if asigna la tarifa por persona de mayor a menor cantidad; con menos de 30, el coste es fijo y se reparte entre el grupo. El valor -1 solo sirve como señal interna de ese caso."
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
}`,
      explicacion: "Cada rama calcula el precio acumulado de los tramos ya completados y suma los minutos restantes al precio del tramo actual. Por ejemplo, al superar ocho minutos, los primeros cinco y los tres siguientes se cobran a sus tarifas originales, y solo los minutos posteriores usan 0,70 €."
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
}`,
      explicacion: "switch asigna a nombre el día asociado a cada número. Cada break evita continuar en el siguiente caso; default marca entradas fuera del rango con null. La comprobación posterior decide si se muestra el día o un aviso de número inválido."
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
}`,
      explicacion: "Los meses se agrupan por número de días: febrero, los cuatro meses de 30 días y los siete meses de 31 días. En switch se pueden agrupar varios case con el mismo resultado. El valor -1 distingue una entrada inválida de cualquier cantidad real de días."
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
}`,
      explicacion: "El primer switch traduce la opción elegida a una tarifa y termina el programa si la zona no existe. Luego se comprueba el límite de peso; si se acepta el paquete, se convierten los kilogramos a gramos (1 kg = 1000 g) antes de multiplicar por la tarifa en euros por gramo."
    }
  ],

  explicacion: [
    {
      titulo: "1. Una condición es una pregunta que produce true o false",
      parrafos: [
        "Una estructura condicional permite que el programa tome una decisión. La expresión entre paréntesis debe producir un boolean: true para ejecutar el bloque y false para saltarlo. No se convierte automáticamente un número en una condición como ocurre en otros lenguajes.",
        "Los operadores relacionales comparan valores: ==, !=, <, >, <= y >=. En Java, == compara números primitivos por valor, pero en objetos compara referencias; para saber si dos textos tienen el mismo contenido se usa equals().",
        "Usar llaves incluso cuando solo hay una instrucción hace visible qué pertenece a cada rama y evita que una modificación posterior cambie accidentalmente el flujo."
      ],
      codigo: `int nota = 7;
if (nota >= 5) {
    System.out.println("Aprobado");
} else {
    System.out.println("Suspenso");
}`
    },
    {
      titulo: "2. Encadenar condiciones sin dejar huecos",
      parrafos: [
        "En una cadena if / else if / else se evalúan las condiciones en orden. Cuando una es verdadera, se ejecuta su bloque y se omiten todas las ramas posteriores. Por eso el orden importa: las condiciones más específicas o los límites superiores deben colocarse antes que una condición general que las incluya.",
        "Para convertir una nota en una calificación, por ejemplo, comprobar primero nota >= 5 clasificaría como aprobado también a quienes deberían recibir notable o sobresaliente. Ordenar de mayor a menor evita ese solapamiento.",
        "Comprueba siempre los valores de frontera: justo por debajo del límite, exactamente en el límite y justo por encima. Esa pequeña tabla detecta errores de < frente a <= antes de escribir muchos casos."
      ],
      codigo: `if (nota < 0 || nota > 10) {
    System.out.println("Nota no válida");
} else if (nota >= 9) {
    System.out.println("Sobresaliente");
} else if (nota >= 7) {
    System.out.println("Notable");
} else if (nota >= 5) {
    System.out.println("Aprobado");
} else {
    System.out.println("Suspenso");
}`
    },
    {
      titulo: "3. Combinar reglas con &&, || y !",
      parrafos: [
        "&& significa «y»: las dos condiciones deben ser verdaderas. || significa «o»: basta con que una lo sea. ! invierte el resultado. Los paréntesis ayudan a expresar la regla tal como la leerías en voz alta y reducen errores de precedencia.",
        "&& y || usan cortocircuito. En A && B, si A es false, B no se evalúa; en A || B, si A es true, B no se evalúa. Esto permite proteger una operación: primero comprobar que el divisor no sea cero y después dividir.",
        "No confundas el operador lógico && con el operador &. En condiciones, && suele ser el correcto porque evita evaluar la segunda parte cuando ya se conoce el resultado."
      ],
      codigo: `if (divisor != 0 && dividendo / divisor > 2) {
    System.out.println("El cociente supera 2");
}

if (edad >= 18 && tieneEntrada) {
    System.out.println("Puede entrar");
}`
    },
    {
      titulo: "4. Elegir entre if y switch",
      parrafos: [
        "if es adecuado para rangos, combinaciones y reglas que dependen de varias variables. switch resulta claro cuando una expresión se compara con una lista discreta de valores, como un número de menú o un día de la semana.",
        "En el switch tradicional, break impide continuar ejecutando el siguiente case. Si se omite, hay caída al siguiente caso (fall-through), a veces intencionada, pero normalmente accidental. Incluye default para tratar una opción no reconocida.",
        "Las versiones modernas de Java también tienen switch expressions con flechas (case 1 -> ...), que no caen al caso siguiente y pueden devolver un valor. En un curso inicial conviene reconocer ambas formas y comprobar qué versión de Java usa el proyecto en Eclipse."
      ],
      codigo: `String tipo;
switch (opcion) {
    case 1:
        tipo = "Pequeño";
        break;
    case 2:
        tipo = "Mediano";
        break;
    case 3:
        tipo = "Grande";
        break;
    default:
        tipo = "Opción no válida";
}
System.out.println(tipo);`
    },
    {
      titulo: "5. Strings y condiciones",
      parrafos: [
        "Dos String pueden contener las mismas letras y ser objetos distintos. Por eso usuario == \"ana\" no es una comparación fiable de contenido. Escribe usuario.equals(\"ana\") o, para ignorar mayúsculas, usuario.equalsIgnoreCase(\"ana\").",
        "Si la referencia pudiera ser null, llamar usuario.equals(...) produciría NullPointerException. En una comparación con un literal es seguro poner el literal delante: \"ana\".equals(usuario).",
        "Las comparaciones de Strings distinguen mayúsculas por defecto. Si una regla no debe distinguirlas, deja esa decisión explícita en el código con equalsIgnoreCase en vez de cambiar el texto de forma accidental."
      ],
      codigo: `String usuario = "Ana";
if ("ana".equalsIgnoreCase(usuario)) {
    System.out.println("Usuario reconocido");
}`
    },
    {
      titulo: "6. El operador ternario: solo para elegir un valor",
      parrafos: [
        "La expresión condición ? valorSiVerdadero : valorSiFalso elige uno de dos valores y puede asignarse a una variable o formar parte de otra expresión. Es útil para una decisión pequeña, como seleccionar una etiqueta.",
        "No sustituye a cualquier if. Si cada rama ejecuta varias acciones, anidar ternarios o meter lógica compleja dentro de una línea empeora la lectura. Elige la forma que haga evidente la regla, no la que use menos líneas."
      ],
      codigo: `String estado = (nota >= 5) ? "Aprobado" : "Suspenso";
System.out.println(estado);`
    },
    {
      titulo: "7. Errores típicos y cómo depurarlos",
      parrafos: [
        "Usar = en vez de ==: = asigna; == compara. Para un String, incluso == puede compilar y fallar solo con ciertos datos, así que usa equals().",
        "Ordenar mal rangos o usar límites inclusivos de forma incoherente produce errores en las fronteras. Anota entradas de prueba como 4.99, 5 y 5.01, y decide qué resultado espera cada una.",
        "Olvidar llaves o break, invertir una condición con !, y escribir x > 0 || x < 10 cuando se quería expresar que x está entre 0 y 10. Esa última condición es siempre verdadera para cualquier número; el rango correcto usa &&.",
        "En Eclipse, coloca un breakpoint en la primera condición y ejecuta con Debug. Inspecciona el valor de cada variable, avanza con Step Over y compara el camino real con la tabla de casos que diseñaste."
      ],
      codigo: `// Incorrecto: cualquier número cumple una de las dos partes.
if (nota < 0 || nota > 10) { }

// Correcto: nota está dentro del intervalo.
if (nota >= 0 && nota <= 10) { }`
    }
  ],

  quiz: [
    {
      pregunta: "Con int nota = 8, ¿qué imprime este código?\nif (nota >= 5) { System.out.println(\"Aprobado\"); } else { System.out.println(\"Suspenso\"); }",
      opciones: ["Suspenso", "Aprobado", "No imprime nada", "Error de compilación"],
      correcta: 1,
      explicacion: "8 >= 5 es true, así que se ejecuta la primera rama y se omite el else."
    },
    {
      pregunta: "¿Qué operador expresa que edad está entre 18 y 65, incluidos ambos límites?",
      opciones: ["edad >= 18 || edad <= 65", "edad > 18 && edad < 65", "edad >= 18 && edad <= 65", "edad == 18 && edad == 65"],
      correcta: 2,
      explicacion: "Un valor debe cumplir simultáneamente el límite inferior y el superior; por eso se usa && y >= / <= incluyen los extremos."
    },
    {
      pregunta: "¿Qué hay que usar para comparar el contenido de dos String?",
      opciones: ["a == b", "a.equals(b)", "a = b", "a.compare(b)"],
      correcta: 1,
      explicacion: "equals compara el contenido. == comprueba si ambas variables apuntan al mismo objeto; = asigna."
    },
    {
      pregunta: "En un switch tradicional, ¿qué puede ocurrir si se omite break?",
      opciones: ["El programa termina", "Se ejecuta también el siguiente case", "Se ejecuta default siempre", "No compila en ninguna versión de Java"],
      correcta: 1,
      explicacion: "Sin break, la ejecución continúa en el siguiente case aunque su etiqueta no coincida: se llama fall-through."
    },
    {
      pregunta: "¿Qué representa la condición x < 0 || x > 10?",
      opciones: ["Que x está dentro del rango de 0 a 10", "Que x está fuera del rango de 0 a 10", "Que x vale exactamente 0 o 10", "Que x siempre es mayor que 10"],
      correcta: 1,
      explicacion: "La expresión es correcta si el objetivo es detectar valores inválidos: es true cuando x está por debajo de 0 o por encima de 10. Para validar que está dentro, se usa x >= 0 && x <= 10."
    },
    {
      pregunta: "¿Cuál es una buena situación para usar el operador ternario?",
      opciones: ["Ejecutar cinco acciones diferentes", "Reemplazar un switch grande", "Elegir entre dos etiquetas sencillas para asignar a una variable", "Crear una condición con tres niveles anidados"],
      correcta: 2,
      explicacion: "El ternario funciona bien para elegir un valor entre dos opciones simples. Para lógica extensa, if/else resulta más claro."
    }
  ]
};
