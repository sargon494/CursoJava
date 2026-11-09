// Unidad 11: tipos genéricos, restricciones y comodines.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["genericos"] = {
  ejercicios: [
    { enunciado: "Implementa Caja<T> con guardar, obtener y vaciar. Usa un indicador separado para distinguir una caja vacía de una caja que contiene null." },
    { enunciado: "Implementa Par<K,V> inmutable con getters, equals, hashCode y toString. Comprueba pares iguales con claves y valores del mismo contenido." },
    { enunciado: "Escribe un método genérico buscar(T[] datos, T objetivo), que devuelva el índice de la primera coincidencia usando equals o -1." },
    { enunciado: "Implementa Estadisticas<T extends Number> que calcule suma y media de una lista de números. Rechaza una lista vacía." },
    { enunciado: "Implementa Comparador<T extends Comparable<T>> que devuelva el menor, el mayor y si los valores están ordenados." },
    { enunciado: "Implementa Pila<T> sobre nodos enlazados con push, pop, peek, isEmpty y size. pop y peek deben señalar explícitamente si está vacía." },
    { enunciado: "Escribe invertir(T[] datos), que devuelva una copia genérica invertida sin modificar el original." },
    { enunciado: "Escribe copiar(List<? extends T> origen, List<? super T> destino) y úsalo para copiar una lista de Integer a una lista de Number." }
  ],

  soluciones: [
    `public class Caja<T> {
    private T contenido;
    private boolean vacia = true;
    public void guardar(T valor) { contenido = valor; vacia = false; }
    public T obtener() {
        if (vacia) throw new IllegalStateException("La caja está vacía.");
        return contenido;
    }
    public void vaciar() { contenido = null; vacia = true; }
    public boolean estaVacia() { return vacia; }
    public static void main(String[] args) {
        Caja<String> caja = new Caja<>();
        caja.guardar("Java");
        System.out.println(caja.obtener());
    }
}`,
    `import java.util.Objects;

public final class Par<K, V> {
    private final K clave;
    private final V valor;
    public Par(K clave, V valor) { this.clave=clave; this.valor=valor; }
    public K getClave() { return clave; }
    public V getValor() { return valor; }
    @Override public boolean equals(Object otro) {
        if (!(otro instanceof Par<?, ?>)) return false;
        Par<?, ?> par = (Par<?, ?>) otro;
        return Objects.equals(clave, par.clave) && Objects.equals(valor, par.valor);
    }
    @Override public int hashCode() { return Objects.hash(clave, valor); }
    @Override public String toString() { return "(" + clave + ", " + valor + ")"; }
    public static void main(String[] args) {
        System.out.println(new Par<>("edad", 21).equals(new Par<>("edad", 21)));
    }
}`,
    `public class BuscarGenerico {
    static <T> int buscar(T[] datos, T objetivo) {
        for (int i = 0; i < datos.length; i++) {
            if (java.util.Objects.equals(datos[i], objetivo)) return i;
        }
        return -1;
    }
    public static void main(String[] args) {
        System.out.println(buscar(new String[] {"Java", "Eclipse"}, "Eclipse"));
    }
}`,
    `import java.util.List;

public class Estadisticas<T extends Number> {
    private final List<T> datos;
    public Estadisticas(List<T> datos) {
        if (datos == null || datos.isEmpty()) throw new IllegalArgumentException("Se necesitan datos.");
        this.datos = List.copyOf(datos);
    }
    public double suma() {
        double total = 0;
        for (T valor : datos) total += valor.doubleValue();
        return total;
    }
    public double media() { return suma() / datos.size(); }
    public static void main(String[] args) {
        System.out.println(new Estadisticas<Integer>(List.of(2, 4, 6)).media());
    }
}`,
    `public class Comparador<T extends Comparable<T>> {
    private final T primero, segundo;
    public Comparador(T primero, T segundo) {
        if (primero == null || segundo == null) throw new IllegalArgumentException("Los valores no pueden ser null.");
        this.primero=primero; this.segundo=segundo;
    }
    public T menor() { return primero.compareTo(segundo) <= 0 ? primero : segundo; }
    public T mayor() { return primero.compareTo(segundo) >= 0 ? primero : segundo; }
    public boolean estanOrdenados() { return primero.compareTo(segundo) <= 0; }
    public static void main(String[] args) {
        System.out.println(new Comparador<>("Ada", "Grace").menor());
    }
}`,
    `public class PilaGenerica<T> {
    private static class Nodo<E> {
        final E valor;
        final Nodo<E> siguiente;
        Nodo(E valor, Nodo<E> siguiente) { this.valor=valor; this.siguiente=siguiente; }
    }
    private Nodo<T> cima;
    private int size;
    public void push(T valor) { cima = new Nodo<>(valor, cima); size++; }
    public T pop() {
        if (cima == null) throw new IllegalStateException("Pila vacía.");
        T valor = cima.valor; cima = cima.siguiente; size--; return valor;
    }
    public T peek() {
        if (cima == null) throw new IllegalStateException("Pila vacía.");
        return cima.valor;
    }
    public boolean isEmpty() { return cima == null; }
    public int size() { return size; }
    public static void main(String[] args) {
        PilaGenerica<String> pila = new PilaGenerica<>();
        pila.push("A"); pila.push("B");
        System.out.println(pila.pop());
    }
}`,
    `import java.util.Arrays;

public class InvertirGenerico {
    static <T> T[] invertir(T[] datos) {
        T[] copia = datos.clone();
        for (int i = 0; i < copia.length / 2; i++) {
            T temporal = copia[i];
            copia[i] = copia[copia.length - 1 - i];
            copia[copia.length - 1 - i] = temporal;
        }
        return copia;
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(invertir(new String[] {"A", "B", "C"})));
    }
}`,
    `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CopiarTipos {
    static <T> void copiar(List<? extends T> origen, List<? super T> destino) {
        for (T elemento : origen) destino.add(elemento);
    }
    public static void main(String[] args) {
        List<Integer> origen = Arrays.asList(1, 2, 3);
        List<Number> destino = new ArrayList<>();
        copiar(origen, destino);
        System.out.println(destino);
    }
}`
  ],

  explicacionesSoluciones: [
    "Caja<T> guarda un valor de cualquier tipo sin perder seguridad de tipos. Un booleano indica si se ha guardado algo, de modo que null puede ser un contenido válido y no se confunde con una caja vacía.",
    "Par<K,V> conserva dos valores tipados e inmutables. equals compara ambos contenidos y hashCode usa los mismos campos, lo que permite que pares iguales funcionen correctamente en colecciones.",
    "El método acepta un array del tipo T y compara cada elemento con el objetivo usando equals. Devuelve enseguida el primer índice coincidente o -1 tras recorrer el array completo.",
    "El límite T extends Number permite usar métodos numéricos de Double, Integer y tipos similares. Se convierte cada número a double para sumar; la lista vacía se rechaza porque su media no está definida.",
    "Comparable<T> garantiza que los valores puedan compararse. El método reutiliza compareTo para obtener mínimo y máximo, y revisa parejas consecutivas para detectar si el orden es ascendente.",
    "Pila<T> enlaza nodos y mantiene el tamaño al insertar o retirar. push y pop trabajan en la cima; pop y peek comprueban antes si está vacía para no acceder a un nodo inexistente.",
    "Se crea un nuevo array y se copia cada elemento en la posición opuesta. El método genérico conserva el tipo T y no altera los datos de entrada.",
    "El origen usa ? extends T porque solo se leen elementos compatibles con T; el destino usa ? super T porque recibe esos elementos. Es el principio PECS: productor extends, consumidor super."
  ],

  explicacion: [
    {
      titulo: "1. Tipos genéricos y seguridad en compilación",
      parrafos: [
        "Un tipo genérico parametriza una clase, interfaz o método con uno o varios tipos. Caja<String> expresa que esa caja guarda texto; el compilador verifica que no se guarde por accidente un valor incompatible.",
        "Sin genéricos era habitual guardar objetos como Object y convertirlos al recuperarlos. Eso desplaza los errores de tipo a la ejecución. Los genéricos permiten declarar la relación entre el contenedor y sus valores y detectar usos incorrectos en compilación.",
        "Los tipos genéricos reciben tipos de referencia. Para representar números primitivos se usan sus wrappers: Integer, Double y Character; el autoboxing convierte entre primitivo y wrapper en muchas asignaciones."
      ],
      codigo: `List<String> nombres = new ArrayList<>();
nombres.add("Ana");
String nombre = nombres.get(0); // no necesita cast`
    },
    {
      titulo: "2. Parámetros de tipo en clases y métodos",
      parrafos: [
        "Una clase puede declarar <T>, o varios parámetros como <K,V>. Por convención se usan letras como T para tipo, E para elemento, K para clave y V para valor, aunque también se admiten nombres descriptivos.",
        "El diamante <> permite que el compilador infiera los parámetros a la derecha de una creación cuando ya conoce el tipo de la variable. No elimina la verificación de tipos.",
        "Una interfaz también puede ser genérica: por ejemplo, Repositorio<T> puede definir guardar(T) y buscarPorId(int), y una implementación concreta fija T o conserva el parámetro. Así el contrato y sus implementaciones comparten el mismo tipo seguro.",
        "Un método genérico declara sus parámetros antes del tipo de retorno. El compilador suele inferirlos a partir de los argumentos; a veces se puede indicar explícitamente el tipo."
      ],
      codigo: `static <T> int buscar(T[] datos, T buscado) {
    for (int i = 0; i < datos.length; i++) {
        if (Objects.equals(datos[i], buscado)) return i;
    }
    return -1;
}`
    },
    {
      titulo: "3. Límites y capacidades",
      parrafos: [
        "Un límite superior expresa qué capacidades necesita el algoritmo: <T extends Number> permite usar métodos numéricos de Number; <T extends Comparable<T>> permite comparar valores mediante compareTo.",
        "extends en un límite admite tanto clases como interfaces. Los límites múltiples se escriben <T extends Base & Interfaz>, colocando primero la clase si existe.",
        "La restricción debe ser tan pequeña como sea posible. Si un método solo necesita mostrar un valor, no debería exigir que T herede de Number."
      ],
      codigo: `static <T extends Comparable<T>> T maximo(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`
    },
    {
      titulo: "4. Invariancia y comodines",
      parrafos: [
        "Aunque Integer extiende Number, List<Integer> no es subtipo de List<Number>. Si lo fuera, alguien podría añadir un Double a la lista de Integer y romper su contrato. Esta propiedad se llama invariancia.",
        "El comodín ? extends T permite leer valores como T desde un origen de tipos desconocidos que son T o subtipos. El comodín ? super T permite escribir valores T en un destino de tipo T o supertipo.",
        "La regla práctica PECS dice Producer Extends, Consumer Super: si una colección produce valores para leer, usa extends; si recibe valores que se escriben, usa super. Si hace ambas cosas, puede convenir un parámetro de tipo concreto."
      ],
      codigo: `static <T> void copiar(List<? extends T> origen, List<? super T> destino) {
    for (T valor : origen) destino.add(valor);
}`
    },
    {
      titulo: "5. Colecciones y nodos genéricos",
      parrafos: [
        "Una pila enlazada puede tener un Nodo<E> que guarda un valor E y una referencia al siguiente Nodo<E>. La pila usa push y pop sin necesitar conocer si sus elementos son String, Integer o una clase propia.",
        "Las operaciones pop y peek necesitan definir qué sucede cuando la estructura está vacía. Lanzar una excepción explícita evita devolver un null que podría confundirse con un elemento nulo válido.",
        "Una estructura genérica reduce duplicación: se escribe la lógica una vez y el compilador mantiene la seguridad del tipo en cada uso."
      ],
      codigo: `private static class Nodo<E> {
    E valor;
    Nodo<E> siguiente;
}`
    },
    {
      titulo: "6. Borrado de tipos y limitaciones",
      parrafos: [
        "Java implementa muchos genéricos mediante borrado de tipos: el compilador comprueba los argumentos genéricos y después los borra o los sustituye por sus límites para la representación de ejecución. Por eso List<String> y List<Integer> comparten una representación básica en tiempo de ejecución.",
        "No se puede hacer new T() porque el tipo concreto no está disponible de esa forma, ni crear directamente new T[]. Tampoco se pueden sobrecargar métodos que solo difieran en parámetros genéricos borrados como List<String> y List<Integer>.",
        "Si hace falta crear instancias, recibe una fábrica, un Supplier<T> o un Class<T>. No uses casts sin validar para esquivar el sistema de tipos; diseña la API para conservar la información necesaria."
      ],
      codigo: `// En lugar de new T(), recibe cómo crear el valor:
static <T> T crear(java.util.function.Supplier<T> fabrica) {
    return fabrica.get();
}`
    },
    {
      titulo: "7. Pruebas y depuración en Eclipse",
      parrafos: [
        "Prueba el mismo contenedor con dos tipos distintos y verifica que el compilador impide insertar el tipo equivocado. Prueba también vacío, un elemento y varios elementos.",
        "Comprueba los límites de comodines con ejemplos de Integer hacia Number y de lectura desde una lista de subtipos. Si el compilador rechaza una asignación, identifica quién produce y quién consume antes de añadir casts.",
        "En Eclipse, usa Ctrl+1 sobre el error de tipos para inspeccionar alternativas, pero entiende la incompatibilidad antes de aceptar un cast sugerido. Las conversiones sin validar pueden ocultar un contrato genérico incorrecto."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué beneficio principal ofrece List<String> frente a List sin tipo?",
      opciones: ["Almacena más rápido por definición", "El compilador comprueba el tipo de los elementos", "Permite guardar primitivos directamente", "Evita que la lista tenga tamaño variable"],
      correcta: 1,
      explicacion: "El argumento genérico limita y documenta los valores admitidos y permite recuperar elementos sin casts."
    },
    {
      pregunta: "¿Qué tipo se usa normalmente en lugar de int como argumento genérico?",
      opciones: ["int[]", "Integer", "void", "Number[] siempre"],
      correcta: 1,
      explicacion: "Los argumentos genéricos son tipos de referencia; Integer es el wrapper de int."
    },
    {
      pregunta: "¿Por qué List<Integer> no es subtipo de List<Number>?",
      opciones: ["Porque Integer no extiende Number", "Porque los genéricos son invariantes para proteger la seguridad de escritura", "Porque las listas no permiten herencia", "Porque Number es primitivo"],
      correcta: 1,
      explicacion: "Si se permitiera, una referencia List<Number> podría añadir un Double a una List<Integer>."
    },
    {
      pregunta: "¿Qué permite List<? extends Number>?",
      opciones: ["Añadir cualquier Number con seguridad", "Leer elementos como Number de una lista de un subtipo desconocido", "Añadir Strings", "Cambiar la clase real de la lista"],
      correcta: 1,
      explicacion: "El tipo desconocido es Number o un subtipo: se puede leer como Number, pero no añadir un Number arbitrario."
    },
    {
      pregunta: "Según PECS, ¿qué límite se usa para un destino que consume valores T?",
      opciones: ["? extends T", "? super T", "? == T", "T[] siempre"],
      correcta: 1,
      explicacion: "Consumer Super: un destino que recibe valores T suele expresarse con ? super T."
    },
    {
      pregunta: "¿Qué permite el límite <T extends Comparable<T>>?",
      opciones: ["Comparar T mediante compareTo", "Crear arrays T", "Instanciar T con new", "Convertir todos los T a String"],
      correcta: 0,
      explicacion: "El límite garantiza la capacidad compareTo requerida por el algoritmo."
    },
    {
      pregunta: "¿Qué limitación se asocia al borrado de tipos?",
      opciones: ["No se pueden usar listas", "No se puede hacer new T() directamente", "No existen genéricos en compilación", "Todos los tipos se convierten en int"],
      correcta: 1,
      explicacion: "El tipo concreto no está disponible de esa forma en ejecución; se puede recibir una fábrica o Class<T>."
    },
    {
      pregunta: "¿Qué ocurre al declarar métodos sobrecargados solo con List<String> y List<Integer>?",
      opciones: ["Siempre es válido", "Puede haber choque porque ambos borran a List", "Se crea una sobrecarga por cada elemento", "El compilador convierte uno a array"],
      correcta: 1,
      explicacion: "Tras el borrado, ambas firmas tienen la misma forma y no pueden coexistir como sobrecargas."
    }
  ]
};

const ejerciciosGenericos = window.CONTENIDO["genericos"].ejercicios;
const solucionesGenericos = window.CONTENIDO["genericos"].soluciones;
const explicacionesSolucionesGenericos = window.CONTENIDO["genericos"].explicacionesSoluciones;
if (ejerciciosGenericos.length !== solucionesGenericos.length || ejerciciosGenericos.length !== explicacionesSolucionesGenericos.length) {
  throw new Error("Cada ejercicio de genéricos debe tener una solución y su explicación.");
}
ejerciciosGenericos.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesGenericos[indice];
  ejercicio.explicacion = explicacionesSolucionesGenericos[indice];
});
delete window.CONTENIDO["genericos"].soluciones;
delete window.CONTENIDO["genericos"].explicacionesSoluciones;
