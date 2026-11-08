window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-2eval-2025-03-10"] = {
  ejercicios: [
    {
      enunciado: `Ejercicio 1

Implementa la clase llamada LinkedStack<T> que representa una pila (stack) basada en una lista enlazada en Java. Para ello, se proporciona una clase Nodo<T> que representa cada elemento de la lista y una interfaz Stack<T> que define el comportamiento esperado de la pila.

public class Nodo<T> {
    T dato;
    Nodo<T> siguiente;
    public Nodo(T dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

public interface Stack<T> {
    void push(T dato);                  (1 punto)
    T pop() throws EmptyStackException; (1 punto)
    T peek() throws EmptyStackException; (0.25 punto)
    boolean isEmpty();                  (0.25 punto)
}

Modifica la interfaz Stack<T> para que extienda Iterable<T> e implementar la iterabilidad en LinkedStack<T>. (1 punto)`,
      solucion: `import java.util.EmptyStackException;
import java.util.Iterator;
import java.util.NoSuchElementException;

public class LinkedStack<T> implements Stack<T> {
    private Nodo<T> cima;

    public LinkedStack() {
        this.cima = null;
    }

    @Override
    public void push(T dato) {
        Nodo<T> nuevo = new Nodo<>(dato);
        nuevo.siguiente = cima;
        cima = nuevo;
    }

    @Override
    public T pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T dato = cima.dato;
        cima = cima.siguiente;
        return dato;
    }

    @Override
    public T peek() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return cima.dato;
    }

    @Override
    public boolean isEmpty() {
        return cima == null;
    }

    // Recorre la pila desde la cima hacia la base.
    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private Nodo<T> actual = cima;

            @Override
            public boolean hasNext() {
                return actual != null;
            }

            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                T dato = actual.dato;
                actual = actual.siguiente;
                return dato;
            }
        };
    }
}

class Nodo<T> {
    T dato;
    Nodo<T> siguiente;

    public Nodo(T dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

interface Stack<T> extends Iterable<T> {
    void push(T dato);
    T pop() throws EmptyStackException;
    T peek() throws EmptyStackException;
    boolean isEmpty();
}
`
    },
    {
      enunciado: `Ejercicio 2

La inmobiliaria TecnoEstafa necesita un programa en Java para gestionar los distintos inmuebles que administra. Cada inmueble cuenta con un número de catastro, que es un identificador único, un valor de tasación expresado en euros y un estado que indica si está disponible, vendido o alquilado.

Dentro del catálogo de la inmobiliaria existen tres tipos de inmuebles: viviendas, locales comerciales y solares.

- Las viviendas poseen un número de habitaciones, pero además se debe conocer el tamaño en metros cuadrados de cada una de ellas. También se debe registrar si la vivienda dispone de garaje.
- Los locales comerciales cuentan con una superficie total en metros cuadrados, una ubicación dentro de la ciudad (que puede ser Centro, Periferia o Industrial) y un indicador de si poseen escaparate, lo que puede influir en su atractivo para los clientes.
- Por otro lado, los solares se caracterizan por su superficie en metros cuadrados y el uso permitido que pueden tener, el cual puede ser Residencial, Comercial o Industrial.

Además, cada tipo de inmueble debe poder calcular los impuestos que le corresponden. El cálculo de impuestos varía según el tipo de inmueble:

- Las viviendas pagan un 1% de su valor de tasación.
- Los locales comerciales un 1.5%.
- Los solares un 2%.

Implementa las clases necesarias con los atributos, constructores y métodos que consideres. (2 puntos)

Para que el sistema sea más completo, se debe poder comparar dos inmuebles entre sí en función de su valor de tasación, permitiendo así determinar cuál de ellos es más valioso. (0.5 puntos)

La clase principal Inmobiliaria encargada de gestionar los diferentes inmuebles debe contar con la siguiente funcionalidad:

1. Añadir un nuevo inmueble: Este método permite añadir un inmueble a la inmobiliaria. Si el inmueble que se intenta añadir ya existe se debe lanzar una excepción llamada DuplicatePropertyException. (1 punto)
   public void añadirInmueble(Inmueble inmueble) throws DuplicatePropertyException;
2. Añadir varios inmuebles: Este método permite añadir múltiples inmuebles de una sola vez. Si el inmueble ya existe, no se debe añadir de nuevo. (1 punto)
   public void añadirInmuebles(Inmueble... inmuebles);
3. Eliminar un inmueble por número de catastro: Este método elimina un inmueble de la inmobiliaria utilizando su número de catastro. Si no se encuentra se debe lanzar una excepción llamada PropertyNotFoundException. (1 punto)
   public void eliminarInmueble(String numeroCatastro) throws PropertyNotFoundException;
4. Obtener el valor medio de tasación de los inmuebles: Este método calcula el valor medio de tasación de todos los inmuebles registrados en la inmobiliaria. Si no hay inmuebles registrados, el valor medio debe ser 0. (1 punto)
   public double obtenerValorMedioTasacion();
5. Obtener el número de viviendas disponibles: Este método devuelve el número de viviendas que están en estado disponible. Si no hay viviendas disponibles, debe devolver 0. (1 punto)
   public int obtenerNumeroViviendasDisponibles();`,
      solucion: `import java.util.LinkedHashMap;
import java.util.Map;

public class Inmobiliaria {
    // Clave: numero de catastro (identificador unico del inmueble).
    private final Map<String, Inmueble> catalogo = new LinkedHashMap<>();

    public void añadirInmueble(Inmueble inmueble) throws DuplicatePropertyException {
        if (catalogo.containsKey(inmueble.getNumeroCatastro())) {
            throw new DuplicatePropertyException(inmueble.getNumeroCatastro());
        }
        catalogo.put(inmueble.getNumeroCatastro(), inmueble);
    }

    public void añadirInmuebles(Inmueble... inmuebles) {
        for (Inmueble inmueble : inmuebles) {
            catalogo.putIfAbsent(inmueble.getNumeroCatastro(), inmueble);
        }
    }

    public void eliminarInmueble(String numeroCatastro) throws PropertyNotFoundException {
        if (catalogo.remove(numeroCatastro) == null) {
            throw new PropertyNotFoundException(numeroCatastro);
        }
    }

    public double obtenerValorMedioTasacion() {
        if (catalogo.isEmpty()) {
            return 0;
        }
        double total = 0;
        for (Inmueble inmueble : catalogo.values()) {
            total += inmueble.getValorTasacion();
        }
        return total / catalogo.size();
    }

    public int obtenerNumeroViviendasDisponibles() {
        int contador = 0;
        for (Inmueble inmueble : catalogo.values()) {
            if (inmueble instanceof Vivienda && inmueble.getEstado() == EstadoInmueble.DISPONIBLE) {
                contador++;
            }
        }
        return contador;
    }
}

enum EstadoInmueble { DISPONIBLE, VENDIDO, ALQUILADO }

enum UbicacionLocal { CENTRO, PERIFERIA, INDUSTRIAL }

enum UsoSolar { RESIDENCIAL, COMERCIAL, INDUSTRIAL }

abstract class Inmueble implements Comparable<Inmueble> {
    private final String numeroCatastro;
    private final double valorTasacion;
    private EstadoInmueble estado;

    protected Inmueble(String numeroCatastro, double valorTasacion, EstadoInmueble estado) {
        this.numeroCatastro = numeroCatastro;
        this.valorTasacion = valorTasacion;
        this.estado = estado;
    }

    public String getNumeroCatastro() {
        return numeroCatastro;
    }

    public double getValorTasacion() {
        return valorTasacion;
    }

    public EstadoInmueble getEstado() {
        return estado;
    }

    public void setEstado(EstadoInmueble estado) {
        this.estado = estado;
    }

    public abstract double calcularImpuestos();

    // Comparacion por valor de tasacion.
    @Override
    public int compareTo(Inmueble otro) {
        return Double.compare(valorTasacion, otro.valorTasacion);
    }
}

class Vivienda extends Inmueble {
    private final int numeroHabitaciones;
    private final double metrosCuadrados;
    private final boolean garaje;

    public Vivienda(String numeroCatastro, double valorTasacion, EstadoInmueble estado,
                    int numeroHabitaciones, double metrosCuadrados, boolean garaje) {
        super(numeroCatastro, valorTasacion, estado);
        this.numeroHabitaciones = numeroHabitaciones;
        this.metrosCuadrados = metrosCuadrados;
        this.garaje = garaje;
    }

    public int getNumeroHabitaciones() {
        return numeroHabitaciones;
    }

    public double getMetrosCuadrados() {
        return metrosCuadrados;
    }

    public boolean tieneGaraje() {
        return garaje;
    }

    @Override
    public double calcularImpuestos() {
        return getValorTasacion() * 0.01;
    }
}

class LocalComercial extends Inmueble {
    private final double superficie;
    private final UbicacionLocal ubicacion;
    private final boolean escaparate;

    public LocalComercial(String numeroCatastro, double valorTasacion, EstadoInmueble estado,
                          double superficie, UbicacionLocal ubicacion, boolean escaparate) {
        super(numeroCatastro, valorTasacion, estado);
        this.superficie = superficie;
        this.ubicacion = ubicacion;
        this.escaparate = escaparate;
    }

    public double getSuperficie() {
        return superficie;
    }

    public UbicacionLocal getUbicacion() {
        return ubicacion;
    }

    public boolean tieneEscaparate() {
        return escaparate;
    }

    @Override
    public double calcularImpuestos() {
        return getValorTasacion() * 0.015;
    }
}

class Solar extends Inmueble {
    private final double superficie;
    private final UsoSolar uso;

    public Solar(String numeroCatastro, double valorTasacion, EstadoInmueble estado,
                 double superficie, UsoSolar uso) {
        super(numeroCatastro, valorTasacion, estado);
        this.superficie = superficie;
        this.uso = uso;
    }

    public double getSuperficie() {
        return superficie;
    }

    public UsoSolar getUso() {
        return uso;
    }

    @Override
    public double calcularImpuestos() {
        return getValorTasacion() * 0.02;
    }
}

class DuplicatePropertyException extends Exception {
    public DuplicatePropertyException(String numeroCatastro) {
        super("Ya existe un inmueble con catastro " + numeroCatastro);
    }
}

class PropertyNotFoundException extends Exception {
    public PropertyNotFoundException(String numeroCatastro) {
        super("No existe ningun inmueble con catastro " + numeroCatastro);
    }
}
`
    }
  ]
};
