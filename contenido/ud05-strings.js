// Unidad 5: cadenas y expresiones regulares.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["strings"] = {
  ejercicios: [
    { enunciado: "Implementa contarCaracteres(String texto, char buscado) recorriendo la cadena con charAt. Cuenta todas las apariciones y prueba con cadena vacía." },
    { enunciado: "Implementa contieneCaracter(String texto, char buscado), que devuelva true si el carácter aparece y false en caso contrario. No uses String.contains." },
    { enunciado: "Invierte una cadena recorriendo sus posiciones desde el final y construyendo el resultado. No uses StringBuilder.reverse()." },
    { enunciado: "Sustituye cada vocal de una cadena por '*', sin cambiar las consonantes, los espacios ni los signos de puntuación. Decide si tratarás mayúsculas y vocales acentuadas." },
    { enunciado: "Comprueba si una palabra es palíndroma sin distinguir mayúsculas y minúsculas. Compara los extremos y avanza hacia el centro." },
    { enunciado: "Lee una palabra y muestra sus caracteres separados por un espacio, sin dejar un espacio sobrante al final." },
    { enunciado: "Lee cinco palabras y muestra la de mayor longitud. Si varias empatan, conserva y muestra la primera." },
    { enunciado: "Cuenta las palabras de una frase usando solo charAt, trim y length. Una palabra es una secuencia no vacía separada por uno o varios espacios." },
    { enunciado: "Lee una palabra desde teclado y determina si es palíndroma ignorando mayúsculas. Implementa la comprobación en un método y prueba una letra, una cadena vacía y un caso que no sea palíndromo." },
    { enunciado: "Valida el formato de un NIF con ocho cifras, un guion y una letra. Usa una expresión regular anclada al principio y al final; esta comprobación valida el formato, no la letra de control." },
    { enunciado: "Valida el formato dd/mm/aaaa con una expresión regular y comprueba además que la fecha exista en el calendario, incluidos los años bisiestos." },
    { enunciado: "Valida una contraseña de 8 a 20 caracteres que contenga al menos una minúscula, una mayúscula y un dígito. Usa una expresión regular con lookaheads y explica la regla." },
    { enunciado: "Divide una frase por uno o más espacios, comas, puntos y punto y coma usando split con una expresión regular. Ignora separadores al inicio y al final." }
  ],

  soluciones: [
    `import java.util.Scanner;

public class ContarCaracter {
    static int contarCaracteres(String texto, char buscado) {
        int cantidad = 0;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == buscado) cantidad++;
        }
        return cantidad;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String texto = sc.nextLine();
        char buscado = sc.nextLine().charAt(0);
        System.out.println(contarCaracteres(texto, buscado));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ContieneCaracter {
    static boolean contieneCaracter(String texto, char buscado) {
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == buscado) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String texto = sc.nextLine();
        char buscado = sc.nextLine().charAt(0);
        System.out.println(contieneCaracter(texto, buscado));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class InvertirCadena {
    static String invertir(String texto) {
        StringBuilder resultado = new StringBuilder();
        for (int i = texto.length() - 1; i >= 0; i--) {
            resultado.append(texto.charAt(i));
        }
        return resultado.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(invertir(sc.nextLine()));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ReemplazarVocales {
    static String reemplazar(String texto) {
        StringBuilder resultado = new StringBuilder();
        for (int i = 0; i < texto.length(); i++) {
            char original = texto.charAt(i);
            char letra = Character.toLowerCase(original);
            if ("aeiouáéíóúü".indexOf(letra) >= 0) resultado.append('*');
            else resultado.append(original);
        }
        return resultado.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(reemplazar(sc.nextLine()));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class Palindromo {
    static boolean esPalindromo(String palabra) {
        String texto = palabra.toLowerCase();
        int izquierda = 0, derecha = texto.length() - 1;
        while (izquierda < derecha) {
            if (texto.charAt(izquierda) != texto.charAt(derecha)) return false;
            izquierda++;
            derecha--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(esPalindromo(sc.nextLine()) ? "Es palíndromo" : "No es palíndromo");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class LetrasSeparadas {
    static String separar(String palabra) {
        StringBuilder resultado = new StringBuilder();
        for (int i = 0; i < palabra.length(); i++) {
            if (i > 0) resultado.append(' ');
            resultado.append(palabra.charAt(i));
        }
        return resultado.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(separar(sc.nextLine()));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class PalabraMasLarga {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mayor = "";
        for (int i = 1; i <= 5; i++) {
            String palabra = sc.next();
            if (palabra.length() > mayor.length()) mayor = palabra;
        }
        System.out.println("Palabra más larga: " + mayor);
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ContarPalabras {
    static int contarPalabras(String frase) {
        String texto = frase.trim();
        if (texto.length() == 0) return 0;
        int palabras = 0;
        boolean dentroDePalabra = false;
        for (int i = 0; i < texto.length(); i++) {
            if (texto.charAt(i) == ' ') {
                dentroDePalabra = false;
            } else if (!dentroDePalabra) {
                palabras++;
                dentroDePalabra = true;
            }
        }
        return palabras;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(contarPalabras(sc.nextLine()));
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class PalindromoTeclado {
    static boolean esPalindromo(String palabra) {
        int inicio = 0, fin = palabra.length() - 1;
        while (inicio < fin) {
            if (Character.toLowerCase(palabra.charAt(inicio)) !=
                Character.toLowerCase(palabra.charAt(fin))) return false;
            inicio++;
            fin--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Palabra: ");
        String palabra = sc.nextLine();
        System.out.println(esPalindromo(palabra) ? "Es palíndromo" : "No es palíndromo");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ValidarNif {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nif = sc.nextLine();
        boolean formatoValido = nif.matches("^[0-9]{8}-[A-Za-z]$");
        System.out.println(formatoValido ? "Formato válido" : "Formato no válido");
        sc.close();
    }
}`,
    `import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.Scanner;

public class ValidarFecha {
    static boolean fechaValida(String texto) {
        if (!texto.matches("^[0-9]{2}/[0-9]{2}/[0-9]{4}$")) return false;
        String[] partes = texto.split("/");
        try {
            LocalDate.of(Integer.parseInt(partes[2]),
                         Integer.parseInt(partes[1]),
                         Integer.parseInt(partes[0]));
            return true;
        } catch (DateTimeException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(fechaValida(sc.nextLine()) ? "Fecha válida" : "Fecha no válida");
        sc.close();
    }
}`,
    `import java.util.Scanner;

public class ValidarContrasena {
    static boolean esValida(String clave) {
        String patron = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,20}$";
        return clave.matches(patron);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(esValida(sc.nextLine()) ? "Contraseña válida" : "Contraseña no válida");
        sc.close();
    }
}`,
    `import java.util.Arrays;
import java.util.Scanner;

public class SepararTexto {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String texto = sc.nextLine().trim();
        if (texto.isEmpty()) {
            System.out.println("No hay palabras.");
        } else {
            String[] palabras = texto.split("[\\\\s,;.]+");
            System.out.println(Arrays.toString(palabras));
        }
        sc.close();
    }
}`
  ],

  explicacionesSoluciones: [
    "Un bucle recorre todos los índices y compara charAt(i) con el carácter buscado. El contador solo aumenta en coincidencias, por lo que una cadena vacía devuelve cero sin tratamiento especial.",
    "La búsqueda termina en cuanto aparece una coincidencia. Si el recorrido llega al final sin encontrarla, el método devuelve false; no hace falta contar todas las apariciones.",
    "Se recorren los índices desde length() - 1 hasta cero y se añade cada carácter a una nueva cadena. Así se invierte el orden sin utilizar reverse().",
    "Cada carácter se normaliza para detectar vocales en ambas mayúsculas y minúsculas. Se agrega un asterisco si es vocal y el carácter original en caso contrario, conservando el resto del texto.",
    "Se comparan simultáneamente el primer y el último carácter y se avanza hacia el centro. Una diferencia descarta la palabra; si todos los pares coinciden, es palíndroma. La normalización evita distinguir mayúsculas.",
    "El bucle imprime un espacio antes de cada carácter salvo el primero. Esta condición conserva los separadores entre caracteres sin dejar un espacio sobrante al final.",
    "Se guarda la palabra más larga vista hasta el momento y solo se reemplaza si aparece otra estrictamente más larga. Al no reemplazar en empates, se conserva la primera palabra máxima.",
    "trim elimina espacios de los extremos y el recorrido detecta el inicio de cada secuencia no vacía. Un contador aumenta al pasar de separador a carácter, no por cada espacio, por lo que los espacios repetidos no crean palabras vacías.",
    "El método compara caracteres desde ambos extremos y termina al encontrar una pareja distinta o alcanzar el centro. El caso de una sola letra y la cadena vacía se consideran palíndromos.",
    "La expresión regular se ancla con ^ y $ para validar la cadena completa: ocho dígitos, guion y una letra. Solo comprueba la forma del NIF; no calcula ni valida su letra de control.",
    "La expresión regular detecta el patrón día/mes/año, pero no basta para rechazar fechas imposibles. Se convierte el texto a una fecha real, dejando que la API de fechas valide días, meses y años bisiestos.",
    "Los lookaheads exigen la presencia de minúscula, mayúscula y dígito sin consumir esos caracteres. La longitud se valida en el patrón; todos los requisitos deben cumplirse para aceptar la contraseña.",
    "split recibe una expresión regular que agrupa uno o más separadores. trim evita elementos vacíos en los extremos y se descartan tokens vacíos para ignorar separadores repetidos."
  ],

  explicacion: [
    {
      titulo: "1. String guarda texto y es inmutable",
      parrafos: [
        "String es una clase de Java. Una variable String referencia un objeto que contiene texto, y las cadenas son inmutables: una operación no cambia el objeto original, sino que devuelve otro resultado. Si llamas a toUpperCase y no guardas el valor devuelto, la variable conserva su texto anterior.",
        "length() devuelve el número de unidades char de la cadena y charAt(i) accede a una posición empezando en cero. Por tanto, la última posición es length() - 1. Para una cadena vacía no existe una posición válida; no llames a charAt(0) sin comprobar antes la longitud.",
        "Para construir texto en un bucle, StringBuilder evita crear muchas cadenas temporales. Llama a append para añadir caracteres o fragmentos y a toString al terminar."
      ],
      codigo: `String original = "Java";
String mayusculas = original.toUpperCase();
System.out.println(original);   // Java
System.out.println(mayusculas); // JAVA`
    },
    {
      titulo: "2. Comparar contenido y recorrer con índices",
      parrafos: [
        "== compara si dos variables apuntan al mismo objeto. equals compara el contenido. Para comparar texto, utiliza equals o equalsIgnoreCase si la regla no debe distinguir mayúsculas.",
        "El recorrido con un índice ofrece control sobre cada posición. Un contador dentro del bucle puede contar apariciones; dos índices, uno al comienzo y otro al final, pueden comparar una palabra desde ambos extremos.",
        "No olvides el caso vacío antes de acceder a un carácter. Muchas tareas de cadenas tienen una definición válida para la cadena vacía: cero apariciones, cero palabras, y a menudo también se considera palíndroma por vacuidad."
      ],
      codigo: `int veces = 0;
for (int i = 0; i < texto.length(); i++) {
    if (texto.charAt(i) == buscado) veces++;
}`
    },
    {
      titulo: "3. StringBuilder y el orden de los índices",
      parrafos: [
        "Para invertir una cadena, empieza en length() - 1 y termina en cero. En cada iteración añade el carácter actual a un StringBuilder. Para separar letras, añade un separador antes de cada carácter salvo el primero: así no tienes que retirar un espacio final.",
        "Una cadena leída con nextLine conserva espacios. next devuelve solo el siguiente token separado por espacios. Escoge el método de entrada según el enunciado: una frase puede contener espacios; una palabra normalmente no.",
        "Los índices char representan unidades UTF-16. Para estos ejercicios introductorios, caracteres latinos simples funcionan como se espera; algunos símbolos Unicode, como ciertos emojis, ocupan más de una unidad char."
      ],
      codigo: `StringBuilder invertida = new StringBuilder();
for (int i = texto.length() - 1; i >= 0; i--) {
    invertida.append(texto.charAt(i));
}`
    },
    {
      titulo: "4. Palíndromos sin construir otra cadena",
      parrafos: [
        "Un palíndromo se lee igual en ambos sentidos. Coloca un índice al principio y otro al final; mientras el primero sea menor, compara los caracteres y mueve ambos hacia el centro. Si aparece una pareja distinta, ya sabes que no es palíndromo.",
        "Decide qué significa «igual» antes de implementar. Una palabra puede ignorar mayúsculas, espacios, signos o tildes, pero cada normalización cambia el contrato. En un ejercicio de una palabra suele bastar con ignorar mayúsculas.",
        "El enfoque de dos índices usa memoria constante adicional. Construir primero la cadena invertida también puede ser claro, pero requiere una cadena extra y una comparación adicional."
      ],
      codigo: `int izquierda = 0;
int derecha = palabra.length() - 1;
while (izquierda < derecha) {
    if (Character.toLowerCase(palabra.charAt(izquierda)) !=
        Character.toLowerCase(palabra.charAt(derecha))) {
        return false;
    }
    izquierda++;
    derecha--;
}`
    },
    {
      titulo: "5. Expresiones regulares: patrón y texto Java",
      parrafos: [
        "Una expresión regular describe un patrón. En Java, String.matches(regex) devuelve true solo si toda la cadena coincide con el patrón; por eso normalmente es suficiente sin añadir ^ y $ aunque pueden hacer la intención más visible.",
        "Al escribir una expresión regular dentro de un String Java, la barra invertida pertenece también a la sintaxis de las cadenas. Por ejemplo, el patrón \\d se escribe como \"\\\\d\" en el código fuente Java. Los grupos de corchetes enumeran caracteres, {n} fija una cantidad y + significa una o más repeticiones.",
        "Una regex comprueba estructura, no necesariamente significado. El patrón dd/mm/aaaa puede aceptar 31/02/2025: primero se valida el formato con regex y después se comprueba la fecha con una clase de calendario."
      ],
      codigo: `boolean ochoDigitos = texto.matches("[0-9]{8}");
boolean formatoFecha = texto.matches("[0-9]{2}/[0-9]{2}/[0-9]{4}");`
    },
    {
      titulo: "6. Grupos, límites y validación",
      parrafos: [
        "En Pattern, los anclajes ^ y $ marcan el principio y el final; así se evita aceptar un fragmento correcto dentro de una cadena con texto adicional. En Java, String.matches comprueba la cadena entera.",
        "Una regla de contraseña puede componerse con lookaheads: (?=.*[a-z]) exige que haya una minúscula en algún lugar sin consumirla; se puede añadir una regla equivalente para mayúsculas o cifras y terminar con el patrón que restringe longitud y caracteres permitidos.",
        "Para usar Pattern y Matcher cuando necesitas buscar coincidencias dentro de un texto, crea Pattern.compile(regex), crea un Matcher con matcher(texto) y llama find repetidamente. matches valida toda la región y find busca la siguiente coincidencia."
      ],
      codigo: `String patron = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,20}$";
boolean valida = clave.matches(patron);`
    },
    {
      titulo: "7. split, errores típicos y pruebas",
      parrafos: [
        "split recibe una expresión regular, no un separador literal. Un punto sin escapar significa «cualquier carácter» en regex; para un punto literal hay que escaparlo en la expresión y duplicar la barra invertida en el String Java. Para separar por alternativas se usa | dentro de un grupo.",
        "split puede producir elementos vacíos cuando existen separadores contiguos o al inicio. Usa un cuantificador + para agrupar varios separadores consecutivos y trim antes de dividir si no quieres conservar separadores iniciales y finales.",
        "Prueba texto vacío, un carácter, separadores repetidos, diferencias de mayúsculas y datos casi válidos. Para una fecha, prueba 29/02 en año bisiesto y no bisiesto, y una fecha imposible como 31/04."
      ],
      codigo: `String texto = "  Java, Strings; Regex.  ".trim();
String[] partes = texto.split("[\\\\s,;.]+");`
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué ocurre con la cadena original al llamar texto.toUpperCase()?",
      opciones: ["Se modifica en el mismo objeto", "No cambia; el método devuelve otra cadena", "Se convierte en null", "Solo se modifica si la variable es final"],
      correcta: 1,
      explicacion: "String es inmutable. El resultado debe guardarse si quieres conservar la versión en mayúsculas."
    },
    {
      pregunta: "¿Cómo se compara el contenido de dos cadenas?",
      opciones: ["a == b", "a.equals(b)", "a = b", "a.length(b)"],
      correcta: 1,
      explicacion: "equals comprueba el contenido; == compara identidad de objeto."
    },
    {
      pregunta: "¿Cuál es el último índice válido de una cadena no vacía?",
      opciones: ["length()", "length() - 1", "1", "length() + 1"],
      correcta: 1,
      explicacion: "Los índices empiezan en cero; por eso hay que restar uno a la longitud."
    },
    {
      pregunta: "¿Qué estrategia compara una palabra desde ambos extremos sin crear la inversión?",
      opciones: ["Un índice que solo avanza", "Dos índices que avanzan desde el principio y el final", "Ordenar los caracteres", "Comparar length() con cero"],
      correcta: 1,
      explicacion: "Los dos índices comparan pares simétricos y convergen hacia el centro."
    },
    {
      pregunta: "¿Qué comprueba String.matches(regex)?",
      opciones: ["Si existe una coincidencia en cualquier parte", "Si toda la cadena cumple el patrón", "Si dos patrones son iguales", "Si la cadena está vacía"],
      correcta: 1,
      explicacion: "matches exige que la cadena completa coincida. Para buscar fragmentos se usa Matcher.find()."
    },
    {
      pregunta: "¿Qué valida por sí sola la expresión regular dd/mm/aaaa?",
      opciones: ["Que la fecha exista en el calendario", "El formato de dos cifras, dos cifras y cuatro cifras", "Que el año sea bisiesto", "Que el mes tenga 31 días"],
      correcta: 1,
      explicacion: "Una regex de formato no conoce las reglas del calendario; después se valida el valor real."
    },
    {
      pregunta: "En un patrón, ¿qué significa [A-Z]{2}?",
      opciones: ["Cero o dos letras", "Exactamente dos letras mayúsculas ASCII", "Dos letras cualesquiera o dígitos", "Una letra minúscula"],
      correcta: 1,
      explicacion: "El grupo [A-Z] admite una mayúscula y el cuantificador {2} exige exactamente dos."
    },
    {
      pregunta: "¿Qué debes recordar al pasar una regex a String.split?",
      opciones: ["split recibe una regex, no siempre un separador literal", "split solo divide por espacios", "split modifica la cadena original", "El resultado siempre tiene exactamente dos partes"],
      correcta: 0,
      explicacion: "Los metacaracteres conservan su significado en split; los separadores especiales deben escaparse."
    }
  ]
};

const ejerciciosStrings = window.CONTENIDO["strings"].ejercicios;
const solucionesStrings = window.CONTENIDO["strings"].soluciones;
const explicacionesSolucionesStrings = window.CONTENIDO["strings"].explicacionesSoluciones;
if (ejerciciosStrings.length !== solucionesStrings.length || ejerciciosStrings.length !== explicacionesSolucionesStrings.length) {
  throw new Error("Cada ejercicio de cadenas debe tener una solución y su explicación.");
}
ejerciciosStrings.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesStrings[indice];
  ejercicio.explicacion = explicacionesSolucionesStrings[indice];
});
delete window.CONTENIDO["strings"].soluciones;
delete window.CONTENIDO["strings"].explicacionesSoluciones;
