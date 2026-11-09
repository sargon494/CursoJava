// Unidad 10: excepciones y gestión de errores.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["excepciones"] = {
  ejercicios: [
    { enunciado: "Implementa una división de enteros con lectura robusta: captura entradas no numéricas, evita división por cero, informa del error y vuelve a pedir los valores hasta completar una división válida." },
    { enunciado: "Define NumeroNegativoException como excepción comprobada. Implementa una raíz cuadrada que la lance ante valores negativos y vuelve a pedir el dato hasta recibir uno válido." },
    { enunciado: "Implementa un registro que valide nombre, edad y correo. Define NombreInvalidoException, EdadInvalidaException y CorreoInvalidoException y comunica qué dato falló." },
    { enunciado: "Implementa una biblioteca con interfaz Prestable y excepciones comprobadas para material duplicado, inexistente, ya prestado y no prestado. Añade buscar, prestar, devolver y un menú sencillo." },
    { enunciado: "Implementa una gestión hotelera con interfaz Reservable y excepciones para habitación duplicada u ocupada, reserva inexistente y cliente duplicado. Valida cada operación y explica el error sin ocultarlo." }
  ],

  soluciones: [
    `import java.util.InputMismatchException;
import java.util.Scanner;

public class DivisionConExcepciones {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            while (true) {
                try {
                    System.out.print("Dividendo: ");
                    int a = sc.nextInt();
                    System.out.print("Divisor: ");
                    int b = sc.nextInt();
                    System.out.println("Resultado: " + (a / b));
                    break;
                } catch (InputMismatchException e) {
                    System.out.println("Introduce enteros; se descarta la entrada no válida.");
                    if (sc.hasNext()) sc.next();
                    else break;
                } catch (ArithmeticException e) {
                    System.out.println("No se puede dividir entre cero. Inténtalo otra vez.");
                }
            }
        }
    }
}`,
    `import java.util.Scanner;

public class RaizSegura {
    static class NumeroNegativoException extends Exception {
        NumeroNegativoException(double valor) {
            super("No se puede calcular la raíz de " + valor);
        }
    }
    static double raiz(double numero) throws NumeroNegativoException {
        if (numero < 0) throw new NumeroNegativoException(numero);
        return Math.sqrt(numero);
    }
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            boolean correcto = false;
            while (!correcto && sc.hasNextDouble()) {
                double valor = sc.nextDouble();
                try {
                    System.out.println("Raíz: " + raiz(valor));
                    correcto = true;
                } catch (NumeroNegativoException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
    }
}`,
    `public class RegistroUsuarios {
    static class NombreInvalidoException extends Exception {
        NombreInvalidoException() { super("El nombre no puede estar vacío."); }
    }
    static class EdadInvalidaException extends Exception {
        EdadInvalidaException(int edad) { super("Edad fuera del intervalo 0-120: " + edad); }
    }
    static class CorreoInvalidoException extends Exception {
        CorreoInvalidoException(String correo) { super("Correo no válido: " + correo); }
    }
    static class Usuario {
        final String nombre, correo;
        final int edad;
        Usuario(String nombre, int edad, String correo)
                throws NombreInvalidoException, EdadInvalidaException, CorreoInvalidoException {
            if (nombre == null || nombre.trim().isEmpty()) throw new NombreInvalidoException();
            if (edad < 0 || edad > 120) throw new EdadInvalidaException(edad);
            if (correo == null || !correo.matches("^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$")) {
                throw new CorreoInvalidoException(correo);
            }
            this.nombre = nombre.trim(); this.edad = edad; this.correo = correo;
        }
        @Override public String toString() { return nombre + ", " + edad + ", " + correo; }
    }
    public static void main(String[] args) {
        try {
            System.out.println(new Usuario("Ana", 28, "ana@example.com"));
        } catch (NombreInvalidoException | EdadInvalidaException | CorreoInvalidoException e) {
            System.out.println("No se pudo registrar: " + e.getMessage());
        }
    }
}`,
    `import java.util.HashMap;
import java.util.Map;

public class BibliotecaExcepciones {
    interface Prestable {
        void prestar() throws MaterialYaPrestadoException;
        void devolver() throws MaterialNoPrestadoException;
    }
    static class MaterialDuplicadoException extends Exception { MaterialDuplicadoException(String id) { super("ID duplicado: " + id); } }
    static class MaterialNoEncontradoException extends Exception { MaterialNoEncontradoException(String id) { super("No existe: " + id); } }
    static class MaterialYaPrestadoException extends Exception { MaterialYaPrestadoException(String id) { super("Ya prestado: " + id); } }
    static class MaterialNoPrestadoException extends Exception { MaterialNoPrestadoException(String id) { super("No estaba prestado: " + id); } }
    static class Libro implements Prestable {
        final String id, titulo;
        boolean prestado;
        Libro(String id, String titulo) { this.id=id; this.titulo=titulo; }
        public void prestar() throws MaterialYaPrestadoException {
            if (prestado) throw new MaterialYaPrestadoException(id);
            prestado=true;
        }
        public void devolver() throws MaterialNoPrestadoException {
            if (!prestado) throw new MaterialNoPrestadoException(id);
            prestado=false;
        }
    }
    static class Biblioteca {
        final Map<String, Libro> libros = new HashMap<>();
        void anadir(Libro libro) throws MaterialDuplicadoException {
            if (libros.containsKey(libro.id)) throw new MaterialDuplicadoException(libro.id);
            libros.put(libro.id, libro);
        }
        Libro buscar(String id) throws MaterialNoEncontradoException {
            Libro l = libros.get(id);
            if (l == null) throw new MaterialNoEncontradoException(id);
            return l;
        }
        void prestar(String id) throws MaterialNoEncontradoException, MaterialYaPrestadoException { buscar(id).prestar(); }
        void devolver(String id) throws MaterialNoEncontradoException, MaterialNoPrestadoException { buscar(id).devolver(); }
    }
    public static void main(String[] args) {
        Biblioteca b = new Biblioteca();
        try {
            b.anadir(new Libro("L1", "Java"));
            b.prestar("L1");
            b.devolver("L1");
        } catch (MaterialDuplicadoException | MaterialNoEncontradoException
                 | MaterialYaPrestadoException | MaterialNoPrestadoException e) {
            System.out.println("Operación cancelada: " + e.getMessage());
        }
    }
}`,
    `import java.util.HashMap;
import java.util.Map;

public class GestionHotelera {
    interface Reservable {
        void reservar(String cliente) throws HabitacionOcupadaException, ClienteDuplicadoException;
        void cancelar() throws ReservaNoEncontradaException;
    }
    static class HabitacionDuplicadaException extends Exception { HabitacionDuplicadaException(int n) { super("Habitación duplicada: " + n); } }
    static class HabitacionOcupadaException extends Exception { HabitacionOcupadaException(int n) { super("Habitación ocupada: " + n); } }
    static class ReservaNoEncontradaException extends Exception { ReservaNoEncontradaException(int n) { super("No hay reserva en habitación: " + n); } }
    static class ClienteDuplicadoException extends Exception { ClienteDuplicadoException(String c) { super("Cliente ya tiene reserva: " + c); } }
    static class Habitacion implements Reservable {
        final int numero;
        String cliente;
        Habitacion(int numero) { this.numero=numero; }
        public void reservar(String cliente) throws HabitacionOcupadaException, ClienteDuplicadoException {
            if (this.cliente != null) throw new HabitacionOcupadaException(numero);
            if (cliente == null || cliente.trim().isEmpty()) throw new IllegalArgumentException("Cliente vacío.");
            this.cliente=cliente;
        }
        public void cancelar() throws ReservaNoEncontradaException {
            if (cliente == null) throw new ReservaNoEncontradaException(numero);
            cliente=null;
        }
    }
    static class Hotel {
        final Map<Integer, Habitacion> habitaciones = new HashMap<>();
        void anadir(int n) throws HabitacionDuplicadaException {
            if (habitaciones.containsKey(n)) throw new HabitacionDuplicadaException(n);
            habitaciones.put(n, new Habitacion(n));
        }
        void reservar(int n, String cliente) throws HabitacionOcupadaException,
                ClienteDuplicadoException, ReservaNoEncontradaException {
            Habitacion h = habitaciones.get(n);
            if (h == null) throw new ReservaNoEncontradaException(n);
            for (Habitacion otra : habitaciones.values()) {
                if (cliente.equals(otra.cliente)) throw new ClienteDuplicadoException(cliente);
            }
            h.reservar(cliente);
        }
        void cancelar(int n) throws ReservaNoEncontradaException {
            Habitacion h = habitaciones.get(n);
            if (h == null) throw new ReservaNoEncontradaException(n);
            h.cancelar();
        }
    }
    public static void main(String[] args) {
        Hotel hotel = new Hotel();
        try {
            hotel.anadir(101);
            hotel.reservar(101, "Irene");
            hotel.cancelar(101);
        } catch (HabitacionDuplicadaException | HabitacionOcupadaException
                 | ClienteDuplicadoException | ReservaNoEncontradaException e) {
            System.out.println("No se completó la operación: " + e.getMessage());
        }
    }
}`
  ],

  explicacionesSoluciones: [
    "La entrada se repite hasta que sea numérica y el divisor distinto de cero. InputMismatchException trata el tipo incorrecto y se descarta el token inválido; ArithmeticException cubre la división no válida sin terminar el programa.",
    "El método de raíz comprueba el dominio antes de calcular y lanza una excepción comprobada propia si el número es negativo. El llamador captura ese caso y vuelve a pedir un valor, separando validación y recuperación.",
    "Cada regla de validación produce su excepción específica, de modo que el llamador puede indicar exactamente qué campo falló. El registro solo se crea cuando nombre, edad y correo superan sus comprobaciones.",
    "La biblioteca centraliza el material y su estado. Las excepciones distinguen duplicados, identificadores inexistentes y transiciones de préstamo inválidas; el menú las captura para informar al usuario y continuar.",
    "Reservable define las operaciones comunes y cada habitación valida sus propias condiciones. Excepciones distintas identifican habitación duplicada u ocupada, reserva ausente o cliente repetido; la interfaz comunica el error de forma explícita."
  ],

  explicacion: [
    {
      titulo: "1. Excepción: un fallo como parte del flujo explícito",
      parrafos: [
        "Una excepción representa una condición que impide completar la operación normal. En lugar de devolver un resultado indistinguible, el método puede lanzar una excepción que describe el problema; quien llama decide cómo recuperarse o cómo informar al usuario.",
        "La jerarquía parte de Throwable. Error representa fallos graves de la máquina y normalmente no debe capturarse en una aplicación corriente. Exception modela situaciones que el programa puede gestionar; RuntimeException y sus subclases son excepciones no comprobadas.",
        "Una excepción debe señalar una condición excepcional, no sustituir cada if o devolver un éxito falso. Elige tipos concretos y mensajes que ayuden a corregir la entrada o la operación."
      ],
      codigo: `int edad = Integer.parseInt(texto); // texto no numérico -> NumberFormatException`
    },
    {
      titulo: "2. Excepciones comprobadas y contrato throws",
      parrafos: [
        "Una excepción comprobada extiende Exception, pero no RuntimeException. El compilador obliga a capturarla o declararla en la firma mediante throws. El requisito hace visible a quien llama que la operación puede fallar de una manera prevista.",
        "Las excepciones no comprobadas suelen representar errores de programación o argumentos inválidos. IllegalArgumentException expresa que el llamador proporcionó un argumento fuera del contrato; IllegalStateException indica que el objeto no puede realizar la operación en su estado actual.",
        "No declares throws para cada excepción imaginable. Incluye únicamente errores que formen parte del contrato y que la capa superior pueda tratar con sentido."
      ],
      codigo: `static double raiz(double n) throws NumeroNegativoException {
    if (n < 0) throw new NumeroNegativoException();
    return Math.sqrt(n);
}`
    },
    {
      titulo: "3. throw, catch y recuperación",
      parrafos: [
        "throw lanza una instancia concreta. catch recibe tipos compatibles; si hay varios bloques, ordénalos desde el tipo más específico al más general. Un catch de Exception antes que uno de una subclase hace que el segundo sea inalcanzable.",
        "Captura la excepción donde exista una respuesta adecuada: volver a pedir un número, mostrar un mensaje comprensible o cancelar una operación. Si no puedes resolverla, propágala con su causa en vez de silenciarla.",
        "Al recuperar una entrada con Scanner, recuerda que el token inválido continúa pendiente. Si lo vuelves a leer sin consumirlo, el bucle repite el mismo error para siempre."
      ],
      codigo: `try {
    int valor = sc.nextInt();
} catch (InputMismatchException e) {
    System.out.println("Escribe un entero.");
    sc.next(); // descarta el token que no se pudo convertir
}`
    },
    {
      titulo: "4. finally y try-with-resources",
      parrafos: [
        "finally se ejecuta al salir del try, tanto si la operación termina bien como si lanza una excepción. Antes se usaba para cerrar recursos manualmente, pero hay que evitar que el código de finally esconda una excepción original.",
        "try-with-resources cierra automáticamente objetos que implementan AutoCloseable, incluso cuando hay un fallo. Es la opción recomendada para Scanner sobre un flujo propio, archivos, conexiones y otros recursos.",
        "Cerrar Scanner sobre System.in también cierra la entrada estándar. En programas pequeños de consola está bien cerrarlo al terminar; en aplicaciones más grandes el propietario del flujo debería ser responsable de cerrarlo."
      ],
      codigo: `try (Scanner sc = new Scanner(System.in)) {
    int n = sc.nextInt();
    System.out.println(n);
}`
    },
    {
      titulo: "5. Diseñar excepciones propias",
      parrafos: [
        "Una excepción personalizada da nombre de dominio a un error, como MaterialYaPrestadoException. Puede ser comprobada si extiende Exception o no comprobada si extiende RuntimeException; elige de acuerdo con cómo deban tratarla los llamadores.",
        "Añade un mensaje útil y, si procede, datos que permitan identificar el objeto afectado. No dupliques la lógica de validación en cada pantalla: la propia operación de dominio debe proteger su regla.",
        "Una operación sobre una biblioteca puede comprobar primero si el identificador existe y después si está prestado. Errores distintos permiten explicar con precisión por qué no se realizó el préstamo."
      ],
      codigo: `class MaterialYaPrestadoException extends Exception {
    MaterialYaPrestadoException(String id) {
        super("El material " + id + " ya está prestado");
    }
}`
    },
    {
      titulo: "6. Evitar errores silenciosos y mantener invariantes",
      parrafos: [
        "No uses un catch vacío, no devuelvas null sin que el contrato lo explique y no imprimas un mensaje para luego continuar como si la operación hubiera tenido éxito. Una recuperación debe conducir a un estado válido.",
        "Cuando una operación tiene varios pasos que cambian el estado, valida las condiciones antes de modificarlo. Si la operación puede fallar a mitad y dejar el objeto parcialmente cambiado, planifica una actualización atómica o una reversión.",
        "En reservas, verifica que la habitación exista, esté disponible y que el cliente no tenga otra reserva antes de establecer el estado. Así un error no deja una reserva duplicada o una habitación parcialmente ocupada."
      ]
    },
    {
      titulo: "7. Pruebas y depuración en Eclipse",
      parrafos: [
        "Por cada excepción, prueba una entrada válida y una que active exactamente ese error. Para un préstamo, comprueba identificador inexistente, préstamo duplicado, devolución válida y devolución cuando no hay préstamo.",
        "Coloca un breakpoint en la línea que lanza la excepción y observa qué estado tiene el objeto. Eclipse permite configurar breakpoints de excepción para detenerse cuando se lanza un tipo incluso antes de que un catch lo maneje.",
        "Los ejercicios se resuelven y ejecutan en Eclipse. La solución de la web sirve para comparar estructura, contrato y tratamiento del error una vez que ya has probado tu programa."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué diferencia a una excepción comprobada?",
      opciones: ["El compilador exige capturarla o declararla", "Siempre detiene la JVM", "No se puede lanzar con throw", "Solo puede tener mensajes en inglés"],
      correcta: 0,
      explicacion: "Una excepción comprobada (salvo RuntimeException y Error) debe manejarse o declararse en la firma."
    },
    {
      pregunta: "¿Qué palabra lanza una instancia de excepción?",
      opciones: ["throws", "throw", "catch", "finally"],
      correcta: 1,
      explicacion: "throw lanza; throws declara en la firma que el método puede propagar una excepción."
    },
    {
      pregunta: "¿Qué puede evitar que una entrada inválida de Scanner se procese repetidamente?",
      opciones: ["Volver a llamar nextInt sin cambios", "Consumir o descartar el token inválido", "Capturar Error", "Llamar a System.gc"],
      correcta: 1,
      explicacion: "El token que produjo InputMismatchException permanece pendiente hasta que se consume."
    },
    {
      pregunta: "¿Cuál es una ventaja de try-with-resources?",
      opciones: ["Evita que existan excepciones", "Cierra recursos AutoCloseable automáticamente", "Convierte excepciones comprobadas en unchecked", "Ejecuta el cuerpo siempre dos veces"],
      correcta: 1,
      explicacion: "Los recursos se cierran aunque el bloque termine lanzando una excepción."
    },
    {
      pregunta: "¿Qué debería hacer el programa al capturar un error que no sabe resolver?",
      opciones: ["Ignorarlo y devolver éxito", "Propagarlo o comunicar un fallo explícito", "Devolver siempre cero", "Capturar Throwable y continuar"],
      correcta: 1,
      explicacion: "Silenciar un fallo o producir un resultado de éxito falso oculta el problema y deja un estado engañoso."
    },
    {
      pregunta: "¿Qué expresa normalmente IllegalArgumentException?",
      opciones: ["Que el llamador proporcionó un argumento fuera del contrato", "Que el objeto no puede cambiar nunca", "Que el archivo se cerró correctamente", "Que el método terminó sin errores"],
      correcta: 0,
      explicacion: "La excepción indica que un argumento suministrado no es válido para la operación."
    },
    {
      pregunta: "¿Dónde conviene validar una regla como «no prestar un libro ya prestado»?",
      opciones: ["Solo en la interfaz visual", "En la operación de dominio que cambia el estado", "En un comentario", "Después de completar el préstamo"],
      correcta: 1,
      explicacion: "La propia operación debe preservar la invariante sin depender de qué pantalla la haya llamado."
    },
    {
      pregunta: "¿Qué puede ocultar un catch vacío?",
      opciones: ["El error original mientras el programa aparenta haber funcionado", "La declaración de una variable", "La lista de imports", "El tipo de retorno del método"],
      correcta: 0,
      explicacion: "Un catch vacío descarta el fallo y puede dejar el sistema en un estado inválido sin avisar."
    }
  ]
};

const ejerciciosExcepciones = window.CONTENIDO["excepciones"].ejercicios;
const solucionesExcepciones = window.CONTENIDO["excepciones"].soluciones;
const explicacionesSolucionesExcepciones = window.CONTENIDO["excepciones"].explicacionesSoluciones;
if (ejerciciosExcepciones.length !== solucionesExcepciones.length || ejerciciosExcepciones.length !== explicacionesSolucionesExcepciones.length) {
  throw new Error("Cada ejercicio de excepciones debe tener una solución y su explicación.");
}
ejerciciosExcepciones.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesExcepciones[indice];
  ejercicio.explicacion = explicacionesSolucionesExcepciones[indice];
});
delete window.CONTENIDO["excepciones"].soluciones;
delete window.CONTENIDO["excepciones"].explicacionesSoluciones;
