window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-2eval-2025-03-18"] = {
  ejercicios: [
    {
      enunciado: `Ejercicio 1

A partir de la implementación de ListaEnlazadaSimple<T> y Nodo<T> proporcionada, se solicita ampliar la funcionalidad de la estructura desarrollando los siguientes métodos.

public class Nodo<T> {
    T dato;
    Nodo<T> siguiente;
    public Nodo(T dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

public class ListaEnlazadaSimple<T> implements List<T> {
    private Nodo<T> head;
    private int size;
    public ListaEnlazadaSimple() {
        this.head = null;
        this.size = 0;
    }
    @Override
    public void agregarInicio(T dato) {
        Nodo<T> newNodo = new Nodo<T>(dato);
        if (estaVacia()) {
            this.head = newNodo;
        } else {
            newNodo.setNext(this.head);
            this.head = newNodo;
        }
        this.size++;
    }
    @Override
    public int size() {
        return this.size;
    }
}

- contarElementos(T valor): Debe recorrer la lista íntegramente y devolver el número total de nodos cuyo dato coincida con el valor pasado por parámetro. (1 punto)
- clear(): Debe eliminar todos los elementos de la lista. (0.5 puntos)
- obtenerUltimo(): Devuelve el dato almacenado en el último nodo de la lista. Si la lista está vacía, debe lanzar una excepción de tipo NoSuchElementException. (1 punto)`,
      solucion: `import java.util.NoSuchElementException;
import java.util.Objects;

public class ListaEnlazadaSimple<T> implements List<T> {
    private Nodo<T> head;
    private int size;

    public ListaEnlazadaSimple() {
        this.head = null;
        this.size = 0;
    }

    @Override
    public void agregarInicio(T dato) {
        Nodo<T> newNodo = new Nodo<T>(dato);
        if (estaVacia()) {
            this.head = newNodo;
        } else {
            newNodo.setNext(this.head);
            this.head = newNodo;
        }
        this.size++;
    }

    @Override
    public int size() {
        return this.size;
    }

    private boolean estaVacia() {
        return this.head == null;
    }

    public int contarElementos(T valor) {
        int contador = 0;
        Nodo<T> actual = this.head;
        while (actual != null) {
            if (Objects.equals(actual.getDato(), valor)) {
                contador++;
            }
            actual = actual.getNext();
        }
        return contador;
    }

    public void clear() {
        this.head = null;
        this.size = 0;
    }

    public T obtenerUltimo() {
        if (estaVacia()) {
            throw new NoSuchElementException("La lista esta vacia");
        }
        Nodo<T> actual = this.head;
        while (actual.getNext() != null) {
            actual = actual.getNext();
        }
        return actual.getDato();
    }
}

// Nodo del enunciado, ampliado con los accesores que usa la lista.
class Nodo<T> {
    T dato;
    Nodo<T> siguiente;

    public Nodo(T dato) {
        this.dato = dato;
        this.siguiente = null;
    }

    public T getDato() {
        return dato;
    }

    public Nodo<T> getNext() {
        return siguiente;
    }

    public void setNext(Nodo<T> siguiente) {
        this.siguiente = siguiente;
    }
}

// Interfaz minima que el enunciado da por supuesta.
interface List<T> {
    void agregarInicio(T dato);
    int size();
}
`
    },
    {
      enunciado: `Ejercicio 2

El conocido restaurante TropiCroqueta necesita una aplicación robusta en Java para digitalizar su carta y automatizar el cálculo de precios y la seguridad alimentaria. El sistema debe ser capaz de distinguir entre diferentes categorías de platos y aplicar reglas de negocio específicas para cada uno.

Todos los platos que ofrece el restaurante comparten una información básica que debe estar disponible en cualquier nivel de la jerarquía:

- Un nombre que los identifique de forma única y una breve descripción comercial.
- El precio base del plato y la cantidad de kilocalorías que aporta.
- Una lista de alérgenos los cuáles pueden ser: Gluten, crustáceos, huevos, pescado, cacahuetes, soja y leche.
- Un indicador de si el plato debe servirse caliente o no.

De entre los platos que ofrece el restaurante, distinguimos:

Plato Principal:
- Permite elegir un acompañamiento de entre una lista cerrada: Patatas, Ensalada, Batata o Ninguno.
- Se debe registrar si se trata de una opción vegana.
- Validación de Integridad: Por normativa de seguridad, un plato no puede marcarse como "vegano" si entre sus alérgenos figuran el Huevo o el Pescado. En caso de intentar crear un plato con esta inconsistencia, el sistema lanzará la excepción IncompatibleDietaryException.

Entrante:
- Se registra el número de comensales recomendado para el plato.
- Se debe registrar un indicador de si el plato es para compartir.
- Lógica automática: Si el número de comensales es superior a 4, el sistema debe marcar automáticamente el plato como "para compartir", independientemente de lo que se indique inicialmente.

Independientemente del tipo de plato, todos deben implementar los siguientes comportamientos:

1. Calcular precio:
   a. Plato Principal: El coste final es el precio base más un suplemento por el acompañamiento (1€ para Patatas o Ensalada, 2€ para Batata).
   b. Entrante: El precio base se multiplica por el número de comensales. Si el plato es para compartir y es para más de 2 personas, se aplica un descuento de 0.50€ al total.
2. Comprobar si un plato es peligroso para un cliente: El método debe recibir uno o varios alérgenos y devolverá un resultado afirmativo si el plato contiene, al menos, uno de los mencionados.
3. Los platos deben ser comparables por naturaleza. El criterio de ordenación por defecto será basado en las kilocalorías y, en caso de empate, por el precio final (de mayor a menor).

Implementa las clases necesarias con los atributos, constructores y métodos que consideres. (2 puntos)

Para que el sistema sea más completo, se debe poder comparar dos platos entre sí en función de su valor de kcalorias, y, en caso de empate, por el precio final (de mayor a menor). (0.5 puntos)

La clase GestionRestaurante es el cerebro del establecimiento. Debe ser capaz de administrar tanto la oferta gastronómica como la cola de trabajo de los cocineros.

El sistema debe mantener un registro de todos los platos disponibles. Por motivos de organización, no se permite que existan dos platos con el mismo nombre en la oferta del restaurante. Se debe elegir la colección que garantice esta restricción de forma eficiente.

Cuando un cliente realiza un pedido, el plato entra en la lista de espera para ser preparado. Sin embargo, la cocina de Tropicroqueta sigue unas reglas de eficiencia estrictas:
- Prioridad Térmica: Los platos que deben servirse calientes siempre tienen prioridad absoluta sobre los platos fríos para evitar que pierdan su temperatura ideal.
- Orden de llegada: Si dos platos tienen la misma prioridad térmica (ambos calientes o ambos fríos), se preparará primero aquel que haya sido pedido antes.

Además, esta clase debe implementar la siguiente funcionalidad:
- Añadir un plato a la carta. Si el nombre ya está registrado, el sistema debe impedir la inserción lanzando una DuplicatePlatoException. (1 punto)
- Eliminar el plato de la carta utilizando su identificador nominal. Dado únicamente el nombre del plato, este se eliminará de carta en caso de que exista. (1 punto)
- Añadir un plato a la estructura de espera de la cocina, teniendo en cuenta las reglas de prioridad mencionadas anteriormente. (1 punto)
- Obtener las estadísticas de la carta: Haz un método que devuelva un array de 4 posiciones en el que cada una de las posiciones será: (1 punto)
  a. Precio medio de todos los platos que componen la carta.
  b. Recuento total de cuántos "Platos Principales" hay registrados.
  c. Media de kilocalorías de la oferta gastronómica completa.
  d. Cantidad total de platos que forman la carta actualmente.
- Mapa de alérgenos y platos: Desarrolla un método que genere un mapa donde cada alérgeno sea la clave y su valor asociado sea la cantidad de platos que contienen dicho alérgeno. (1 punto)`,
      solucion: `import java.util.Collections;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class GestionRestaurante {
    // HashMap por nombre: busqueda y restriccion de nombres unicos en O(1).
    private final Map<String, Plato> carta = new HashMap<>();
    private final PriorityQueue<PedidoCocina> colaCocina = new PriorityQueue<>();
    private long pedidosRecibidos = 0;

    public void añadirPlato(Plato plato) throws DuplicatePlatoException {
        if (carta.containsKey(plato.getNombre())) {
            throw new DuplicatePlatoException(plato.getNombre());
        }
        carta.put(plato.getNombre(), plato);
    }

    public void eliminarPlato(String nombre) {
        carta.remove(nombre);
    }

    public void añadirPedidoCocina(Plato plato) {
        colaCocina.add(new PedidoCocina(plato, pedidosRecibidos++));
    }

    // [precio medio, nº de platos principales, media de kcal, nº total de platos]
    public double[] obtenerEstadisticasCarta() {
        double[] estadisticas = new double[4];
        if (carta.isEmpty()) {
            return estadisticas;
        }
        double sumaPrecios = 0;
        double sumaKcal = 0;
        int principales = 0;
        for (Plato plato : carta.values()) {
            sumaPrecios += plato.calcularPrecio();
            sumaKcal += plato.getKcal();
            if (plato instanceof PlatoPrincipal) {
                principales++;
            }
        }
        int total = carta.size();
        estadisticas[0] = sumaPrecios / total;
        estadisticas[1] = principales;
        estadisticas[2] = sumaKcal / total;
        estadisticas[3] = total;
        return estadisticas;
    }

    public Map<Alergeno, Integer> obtenerMapaAlergenos() {
        Map<Alergeno, Integer> mapa = new EnumMap<>(Alergeno.class);
        for (Alergeno alergeno : Alergeno.values()) {
            mapa.put(alergeno, 0);
        }
        for (Plato plato : carta.values()) {
            for (Alergeno alergeno : plato.getAlergenos()) {
                mapa.merge(alergeno, 1, Integer::sum);
            }
        }
        return mapa;
    }
}

enum Alergeno { GLUTEN, CRUSTACEOS, HUEVOS, PESCADO, CACAHUETES, SOJA, LECHE }

enum Acompanamiento {
    PATATAS(1.0), ENSALADA(1.0), BATATA(2.0), NINGUNO(0.0);

    private final double suplemento;

    Acompanamiento(double suplemento) {
        this.suplemento = suplemento;
    }

    public double getSuplemento() {
        return suplemento;
    }
}

abstract class Plato implements Comparable<Plato> {
    private final String nombre;
    private final String descripcion;
    private final double precioBase;
    private final int kcal;
    private final Set<Alergeno> alergenos;
    private final boolean caliente;

    protected Plato(String nombre, String descripcion, double precioBase, int kcal,
                    Set<Alergeno> alergenos, boolean caliente) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioBase = precioBase;
        this.kcal = kcal;
        this.alergenos = EnumSet.noneOf(Alergeno.class);
        this.alergenos.addAll(alergenos);
        this.caliente = caliente;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public double getPrecioBase() {
        return precioBase;
    }

    public int getKcal() {
        return kcal;
    }

    public Set<Alergeno> getAlergenos() {
        return Collections.unmodifiableSet(alergenos);
    }

    public boolean isCaliente() {
        return caliente;
    }

    public abstract double calcularPrecio();

    // Devuelve true si el plato contiene al menos uno de los alergenos consultados.
    public boolean esPeligroso(Alergeno... consultados) {
        for (Alergeno alergeno : consultados) {
            if (alergenos.contains(alergeno)) {
                return true;
            }
        }
        return false;
    }

    // Por kcal y, en caso de empate, por precio final de mayor a menor.
    @Override
    public int compareTo(Plato otro) {
        int porKcal = Integer.compare(this.kcal, otro.kcal);
        if (porKcal != 0) {
            return porKcal;
        }
        return Double.compare(otro.calcularPrecio(), this.calcularPrecio());
    }
}

class PlatoPrincipal extends Plato {
    private final Acompanamiento acompanamiento;
    private final boolean vegano;

    public PlatoPrincipal(String nombre, String descripcion, double precioBase, int kcal,
                          Set<Alergeno> alergenos, boolean caliente,
                          Acompanamiento acompanamiento, boolean vegano)
            throws IncompatibleDietaryException {
        super(nombre, descripcion, precioBase, kcal, alergenos, caliente);
        if (vegano && (getAlergenos().contains(Alergeno.HUEVOS) || getAlergenos().contains(Alergeno.PESCADO))) {
            throw new IncompatibleDietaryException(nombre);
        }
        this.acompanamiento = acompanamiento;
        this.vegano = vegano;
    }

    public Acompanamiento getAcompanamiento() {
        return acompanamiento;
    }

    public boolean isVegano() {
        return vegano;
    }

    @Override
    public double calcularPrecio() {
        return getPrecioBase() + acompanamiento.getSuplemento();
    }
}

class Entrante extends Plato {
    private final int comensales;
    private final boolean paraCompartir;

    public Entrante(String nombre, String descripcion, double precioBase, int kcal,
                    Set<Alergeno> alergenos, boolean caliente,
                    int comensales, boolean paraCompartir) {
        super(nombre, descripcion, precioBase, kcal, alergenos, caliente);
        this.comensales = comensales;
        // Mas de 4 comensales: se marca automaticamente como para compartir.
        this.paraCompartir = paraCompartir || comensales > 4;
    }

    public int getComensales() {
        return comensales;
    }

    public boolean isParaCompartir() {
        return paraCompartir;
    }

    @Override
    public double calcularPrecio() {
        double precio = getPrecioBase() * comensales;
        if (paraCompartir && comensales > 2) {
            precio -= 0.5;
        }
        return precio;
    }
}

// Pedido en la cola de cocina: los calientes van primero y, a igualdad, el orden de llegada.
class PedidoCocina implements Comparable<PedidoCocina> {
    private final Plato plato;
    private final long orden;

    PedidoCocina(Plato plato, long orden) {
        this.plato = plato;
        this.orden = orden;
    }

    public Plato getPlato() {
        return plato;
    }

    @Override
    public int compareTo(PedidoCocina otro) {
        if (plato.isCaliente() != otro.plato.isCaliente()) {
            return plato.isCaliente() ? -1 : 1;
        }
        return Long.compare(orden, otro.orden);
    }
}

class DuplicatePlatoException extends Exception {
    public DuplicatePlatoException(String nombre) {
        super("Ya existe un plato llamado " + nombre);
    }
}

class IncompatibleDietaryException extends Exception {
    public IncompatibleDietaryException(String nombre) {
        super("El plato " + nombre + " no puede ser vegano por contener huevo o pescado");
    }
}
`
    }
  ]
};
