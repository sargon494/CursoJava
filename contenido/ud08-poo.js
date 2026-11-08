// Unidad 8: clases, objetos, encapsulación y enumerados.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["poo"] = {
  ejercicios: [
    { enunciado: "Implementa Empleado con nombre, salario bruto anual y retención IRPF. Valida datos, calcula salario neto anual con tramos marginales ilustrativos y muestra una ficha." },
    { enunciado: "Implementa Punto2D con constructores por defecto y por coordenadas, getters, suma con otro punto y escalado por un factor." },
    { enunciado: "Implementa Linea2D definida por dos puntos. Calcula longitud y pendiente, informa si es vertical, detecta paralelismo y permite desplazar ambos extremos." },
    { enunciado: "Implementa Vector para n dimensiones con copia defensiva, magnitud, suma con vector compatible, producto escalar, multiplicación por escalar y perpendicularidad." },
    { enunciado: "Implementa Circulo con centro y radio positivos. Calcula área y perímetro, desplaza el centro, calcula distancia entre centros y comprueba si un punto está dentro." },
    { enunciado: "Implementa Intervalo cerrado [inicio, fin]. Valida sus límites y ofrece longitud, contiene, unión cuando hay solapamiento o contacto, e intervalo desplazado." },
    { enunciado: "Implementa Fraccion irreducible con denominador no nulo, signo en el numerador, suma, resta, multiplicación, división y equivalencia." },
    { enunciado: "Define enum Palo y una clase Carta con palo y valor. Implementa toString en español, esFigura y comparación por valor y después por palo." },
    { enunciado: "Implementa Pokemon con nombre, tipo, nivel, salud y salud máxima. Añade subir nivel, curar, atacar con ventaja elemental y estaDebilitado." },
    { enunciado: "Implementa EntrenadorPokemon con equipo de hasta 6 integrantes únicos, visita al centro para curar, eliminar, contar por tipo y entrenar un integrante aleatorio." },
    { enunciado: "Implementa EmpleadoTech con salario y supervisor opcional. Calcula sueldo neto, permite una cadena de supervisores sin ciclos y distribuye una subida: parte para el empleado y parte para su supervisor." },
    { enunciado: "Implementa Hotel con una clase interna Habitacion que guarda huésped y tarifa. Permite entrada y salida, valida ocupación y calcula factura según noches." },
    { enunciado: "Implementa un inventario con Producto, ProductoPerecedero y ProductoElectronico. Permite vender, reponer y comprobar garantía; encapsula stock y precio." },
    { enunciado: "Implementa MaterialBibliografico con Libro y Revista. Los materiales se pueden prestar y devolver; rechaza préstamos duplicados y devoluciones inválidas." },
    { enunciado: "Implementa Vehiculo con matrícula y una igualdad basada en ella. Coche y Moto heredan, aportan atributos propios y sobrescriben toString." },
    { enunciado: "Implementa un Grimorio de Hechizos con enum Elemento y tipos de hechizo elemental, blanco y oscuro. Añade cálculo de coste, lanzamiento y filtros por tipo." }
  ],

  soluciones: [
    `public class Empleado {
    private final String nombre;
    private double salarioBruto;

        public Empleado(String nombre, double salarioBruto) {
            if (nombre == null || nombre.isBlank() || salarioBruto < 0) {
                throw new IllegalArgumentException("Datos de empleado no válidos.");
            }
            this.nombre = nombre;
            this.salarioBruto = salarioBruto;
        }

        public double calcularIRPF() {
            double[] limites = {12450, 20200, 35200, 60000};
            double[] tipos = {0.19, 0.24, 0.30, 0.37, 0.45};
            double impuesto = 0, tramoAnterior = 0;
            for (int i = 0; i < limites.length; i++) {
                double baseTramo = Math.max(0, Math.min(salarioBruto, limites[i]) - tramoAnterior);
                impuesto += baseTramo * tipos[i];
                tramoAnterior = limites[i];
            }
            if (salarioBruto > tramoAnterior) impuesto += (salarioBruto - tramoAnterior) * tipos[tipos.length - 1];
            return impuesto;
        }
    public double calcularNeto() { return salarioBruto - calcularIRPF(); }
    public void setSalarioBruto(double salario) {
        if (salario < 0) throw new IllegalArgumentException("Salario negativo.");
        salarioBruto = salario;
    }
    public String mostrarInformacion() {
        return nombre + " | bruto: " + salarioBruto + " | IRPF: " + calcularIRPF()
            + " | neto: " + calcularNeto();
    }

    public static void main(String[] args) {
        Empleado empleado = new Empleado("Lucía", 24000);
        System.out.println(empleado.mostrarInformacion());
    }
}`,
    `public class Punto2D {
    private final double x;
    private final double y;

    public Punto2D() { this(0, 0); }
    public Punto2D(double x, double y) { this.x = x; this.y = y; }
    public double getX() { return x; }
    public double getY() { return y; }
    public Punto2D sumar(Punto2D otro) {
        return new Punto2D(x + otro.x, y + otro.y);
    }
    public Punto2D multiplicarPorEscalar(double factor) {
        return new Punto2D(x * factor, y * factor);
    }
    @Override public String toString() { return "(" + x + ", " + y + ")"; }

    public static void main(String[] args) {
        System.out.println(new Punto2D(2, 3).sumar(new Punto2D(1, -1)));
    }
}`,
    `public class Linea2D {
    private double x1, y1, x2, y2;
    public Linea2D(double x1, double y1, double x2, double y2) {
        this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2;
    }
    public double longitud() { return Math.hypot(x2 - x1, y2 - y1); }
    public boolean esVertical() { return x1 == x2; }
    public double pendiente() {
        if (esVertical()) throw new IllegalStateException("Una línea vertical no tiene pendiente finita.");
        return (y2 - y1) / (x2 - x1);
    }
    public boolean esParalelaA(Linea2D otra) {
        return (x2 - x1) * (otra.y2 - otra.y1) == (y2 - y1) * (otra.x2 - otra.x1);
    }
    public void desplazar(double dx, double dy) {
        x1 += dx; x2 += dx; y1 += dy; y2 += dy;
    }
    public static void main(String[] args) {
        Linea2D linea = new Linea2D(0, 0, 3, 4);
        System.out.println(linea.longitud());
    }
}`,
    `import java.util.Arrays;

public class VectorN {
    private final double[] componentes;
    public VectorN(double... componentes) {
        if (componentes.length == 0) throw new IllegalArgumentException("El vector necesita dimensiones.");
        this.componentes = componentes.clone();
    }
    public double[] getComponentes() { return componentes.clone(); }
    public double magnitud() {
        double suma = 0;
        for (double valor : componentes) suma += valor * valor;
        return Math.sqrt(suma);
    }
    public VectorN sumar(VectorN otro) {
        comprobarDimension(otro);
        double[] r = new double[componentes.length];
        for (int i = 0; i < r.length; i++) r[i] = componentes[i] + otro.componentes[i];
        return new VectorN(r);
    }
    public double productoEscalar(VectorN otro) {
        comprobarDimension(otro);
        double suma = 0;
        for (int i = 0; i < componentes.length; i++) suma += componentes[i] * otro.componentes[i];
        return suma;
    }
    public VectorN escalar(double factor) {
        double[] r = new double[componentes.length];
        for (int i = 0; i < r.length; i++) r[i] = componentes[i] * factor;
        return new VectorN(r);
    }
    public boolean esPerpendicularA(VectorN otro) { return Math.abs(productoEscalar(otro)) < 1e-9; }
    private void comprobarDimension(VectorN otro) {
        if (componentes.length != otro.componentes.length) throw new IllegalArgumentException("Dimensiones distintas.");
    }
    @Override public String toString() { return Arrays.toString(componentes); }
    public static void main(String[] args) {
        System.out.println(new VectorN(1, 2).sumar(new VectorN(3, 4)));
    }
}`,
    `public class Circulo {
    private double x, y;
    private final double radio;
    public Circulo(double x, double y, double radio) {
        if (radio <= 0) throw new IllegalArgumentException("El radio debe ser positivo.");
        this.x = x; this.y = y; this.radio = radio;
    }
    public double area() { return Math.PI * radio * radio; }
    public double perimetro() { return 2 * Math.PI * radio; }
    public void desplazar(double dx, double dy) { x += dx; y += dy; }
    public double distanciaCentro(Circulo otro) { return Math.hypot(x - otro.x, y - otro.y); }
    public boolean contiene(double px, double py) { return Math.hypot(x - px, y - py) <= radio; }
    public static void main(String[] args) {
        Circulo c = new Circulo(0, 0, 2);
        System.out.println(c.contiene(1, 1));
    }
}`,
    `public class Intervalo {
    private final double inicio, fin;
    public Intervalo(double inicio, double fin) {
        if (inicio > fin) throw new IllegalArgumentException("El inicio debe ser <= al fin.");
        this.inicio = inicio; this.fin = fin;
    }
    public double longitud() { return fin - inicio; }
    public boolean contiene(double valor) { return valor >= inicio && valor <= fin; }
    public Intervalo unir(Intervalo otro) {
        if (otro.inicio > fin || inicio > otro.fin) throw new IllegalArgumentException("Los intervalos no se tocan.");
        return new Intervalo(Math.min(inicio, otro.inicio), Math.max(fin, otro.fin));
    }
    public Intervalo desplazar(double distancia) { return new Intervalo(inicio + distancia, fin + distancia); }
    @Override public String toString() { return "[" + inicio + ", " + fin + "]"; }
    public static void main(String[] args) {
        System.out.println(new Intervalo(1, 4).unir(new Intervalo(4, 8)));
    }
}`,
    `public class Fraccion {
    private final long numerador, denominador;
    public Fraccion(long numerador, long denominador) {
        if (denominador == 0) throw new IllegalArgumentException("Denominador cero.");
        long divisor = mcd(Math.abs(numerador), Math.abs(denominador));
        long signo = denominador < 0 ? -1 : 1;
        this.numerador = signo * numerador / divisor;
        this.denominador = Math.abs(denominador) / divisor;
    }
    private static long mcd(long a, long b) {
        while (b != 0) { long r = a % b; a = b; b = r; }
        return a == 0 ? 1 : a;
    }
    public Fraccion sumar(Fraccion f) { return new Fraccion(numerador*f.denominador + f.numerador*denominador, denominador*f.denominador); }
    public Fraccion restar(Fraccion f) { return new Fraccion(numerador*f.denominador - f.numerador*denominador, denominador*f.denominador); }
    public Fraccion multiplicar(Fraccion f) { return new Fraccion(numerador*f.numerador, denominador*f.denominador); }
    public Fraccion dividir(Fraccion f) {
        if (f.numerador == 0) throw new IllegalArgumentException("No se puede dividir por cero.");
        return new Fraccion(numerador*f.denominador, denominador*f.numerador);
    }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Fraccion)) return false;
        Fraccion f = (Fraccion) o;
        return numerador == f.numerador && denominador == f.denominador;
    }
    @Override public int hashCode() { return java.util.Objects.hash(numerador, denominador); }
    @Override public String toString() { return numerador + "/" + denominador; }
    public static void main(String[] args) {
        System.out.println(new Fraccion(1, 2).sumar(new Fraccion(1, 3)));
    }
}`,
    `enum Palo { OROS, COPAS, ESPADAS, BASTOS }

public class Carta implements Comparable<Carta> {
    private final Palo palo;
    private final int valor;
    public Carta(Palo palo, int valor) {
        if (palo == null || valor < 1 || valor > 12) throw new IllegalArgumentException("Carta no válida.");
        this.palo = palo; this.valor = valor;
    }
    public boolean esFigura() { return valor >= 10; }
    @Override public int compareTo(Carta otra) {
        int porValor = Integer.compare(valor, otra.valor);
        return porValor != 0 ? porValor : palo.compareTo(otra.palo);
    }
    @Override public String toString() {
        String nombre = valor == 10 ? "Sota" : valor == 11 ? "Caballo" : valor == 12 ? "Rey" : String.valueOf(valor);
        return nombre + " de " + palo.name().toLowerCase();
    }
    public static void main(String[] args) {
        System.out.println(new Carta(Palo.COPAS, 12).toString());
    }
}`,
    `public class Pokemon {
    private final String nombre, tipo;
    private int nivel, salud, saludMaxima;
    public Pokemon(String nombre, String tipo, int nivel, int saludMaxima) {
        if (nombre == null || tipo == null || nivel < 1 || saludMaxima < 1) throw new IllegalArgumentException();
        this.nombre = nombre; this.tipo = tipo; this.nivel = nivel;
        this.saludMaxima = saludMaxima; this.salud = saludMaxima;
    }
    public void subirNivel() { nivel++; saludMaxima += 5; salud = saludMaxima; }
    public void curar() { salud = saludMaxima; }
    public boolean estaDebilitado() { return salud == 0; }
    public String getNombre() { return nombre; }
    public String getTipo() { return tipo; }
    public void atacar(Pokemon objetivo) {
        if (estaDebilitado() || objetivo.estaDebilitado()) return;
        int danio = 10 + nivel;
        if (ventaja(tipo, objetivo.tipo)) danio *= 2;
        objetivo.salud = Math.max(0, objetivo.salud - danio);
    }
    private static boolean ventaja(String atacante, String defensor) {
        return (atacante.equals("agua") && defensor.equals("fuego"))
            || (atacante.equals("fuego") && defensor.equals("planta"))
            || (atacante.equals("planta") && defensor.equals("agua"));
    }
    @Override public String toString() { return nombre + " Nv." + nivel + " HP " + salud + "/" + saludMaxima; }
    public static void main(String[] args) {
        Pokemon agua = new Pokemon("Squirtle", "agua", 5, 40);
        Pokemon fuego = new Pokemon("Charmander", "fuego", 5, 40);
        agua.atacar(fuego);
        System.out.println(fuego);
    }
}`,
    `import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class EntrenadorPokemon {
    private final List<Pokemon> equipo = new ArrayList<>();
    private final Random random = new Random();
    public boolean anadir(Pokemon pokemon) {
        if (pokemon == null || equipo.size() == 6 || equipo.contains(pokemon)) return false;
        equipo.add(pokemon);
        return true;
    }
    public void visitarCentro() { for (Pokemon p : equipo) p.curar(); }
    public boolean eliminar(String nombre) { return equipo.removeIf(p -> p.getNombre().equals(nombre)); }
    public long contarPorTipo(String tipo) {
        return equipo.stream().filter(p -> p.getTipo().equalsIgnoreCase(tipo)).count();
    }
    public void entrenarAleatorio() {
        if (!equipo.isEmpty()) equipo.get(random.nextInt(equipo.size())).subirNivel();
    }
    public static void main(String[] args) {
        EntrenadorPokemon e = new EntrenadorPokemon();
        e.anadir(new Pokemon("Pikachu", "electrico", 5, 30));
        e.entrenarAleatorio();
    }
}`,
    `import java.util.HashSet;
import java.util.Set;

public class EmpleadoTech {
    private final String nombre;
    private double salario;
    private EmpleadoTech supervisor;
    public EmpleadoTech(String nombre, double salario) {
        if (nombre == null || nombre.isBlank() || salario < 0) throw new IllegalArgumentException();
        this.nombre = nombre; this.salario = salario;
    }
    public void setSupervisor(EmpleadoTech candidato) {
        Set<EmpleadoTech> visitados = new HashSet<>();
        for (EmpleadoTech p = candidato; p != null; p = p.supervisor) {
            if (p == this || !visitados.add(p)) throw new IllegalArgumentException("La jerarquía produciría un ciclo.");
        }
        supervisor = candidato;
    }
    public double sueldoNeto() { return salario * 0.82; }
    public void subida(double incremento) {
        if (incremento < 0) throw new IllegalArgumentException("Incremento negativo.");
        salario += incremento * 0.8;
        if (supervisor != null) supervisor.salario += incremento * 0.2;
    }
    public static void main(String[] args) {
        EmpleadoTech responsable = new EmpleadoTech("Alex", 4000);
        EmpleadoTech empleado = new EmpleadoTech("Noa", 2500);
        empleado.setSupervisor(responsable);
        empleado.subida(100);
        System.out.println(empleado.sueldoNeto());
    }
}`,
    `import java.util.HashMap;
import java.util.Map;

public class Hotel {
    private class Habitacion {
        private final double tarifa;
        private String huesped;
        Habitacion(double tarifa) {
            if (tarifa <= 0) throw new IllegalArgumentException("Tarifa no válida.");
            this.tarifa = tarifa;
        }
        double checkout(int noches) {
            if (huesped == null || noches <= 0) throw new IllegalStateException("Estancia no válida.");
            double factura = tarifa * noches;
            huesped = null;
            return factura;
        }
    }
    private final Map<Integer, Habitacion> habitaciones = new HashMap<>();
    public void anadirHabitacion(int numero, double tarifa) {
        if (habitaciones.putIfAbsent(numero, new Habitacion(tarifa)) != null) {
            throw new IllegalArgumentException("Habitación duplicada.");
        }
    }
    public void checkin(int numero, String huesped) {
        Habitacion h = habitaciones.get(numero);
        if (h == null || h.huesped != null || huesped == null || huesped.isBlank()) throw new IllegalStateException("No se puede hacer check-in.");
        h.huesped = huesped;
    }
    public double checkout(int numero, int noches) {
        Habitacion h = habitaciones.get(numero);
        if (h == null) throw new IllegalArgumentException("Habitación inexistente.");
        return h.checkout(noches);
    }
    public static void main(String[] args) {
        Hotel hotel = new Hotel();
        hotel.anadirHabitacion(1, 80);
        hotel.checkin(1, "Marta");
        System.out.println(hotel.checkout(1, 2));
    }
}`,
    `abstract class Producto {
    private final String nombre;
    private final double precio;
    private int stock;
    Producto(String nombre, double precio, int stock) {
        if (nombre == null || nombre.isBlank() || precio < 0 || stock < 0) throw new IllegalArgumentException();
        this.nombre = nombre; this.precio = precio; this.stock = stock;
    }
    public void vender(int cantidad) {
        if (cantidad <= 0 || cantidad > stock) throw new IllegalArgumentException("Stock insuficiente.");
        stock -= cantidad;
    }
    public void reponer(int cantidad) {
        if (cantidad <= 0) throw new IllegalArgumentException("Cantidad no válida.");
        stock = Math.addExact(stock, cantidad);
    }
    public int getStock() { return stock; }
    public String getNombre() { return nombre; }
    public double getPrecio() { return precio; }
}

class ProductoPerecedero extends Producto {
    private final java.time.LocalDate caducidad;
    ProductoPerecedero(String nombre, double precio, int stock, java.time.LocalDate caducidad) {
        super(nombre, precio, stock); this.caducidad = caducidad;
    }
    public boolean estaCaducado() { return !caducidad.isAfter(java.time.LocalDate.now()); }
}

class ProductoElectronico extends Producto {
    private final java.time.LocalDate finGarantia;
    ProductoElectronico(String nombre, double precio, int stock, int aniosGarantia) {
        super(nombre, precio, stock);
        if (aniosGarantia < 0) throw new IllegalArgumentException();
        finGarantia = java.time.LocalDate.now().plusYears(aniosGarantia);
    }
    public boolean enGarantia() { return !java.time.LocalDate.now().isAfter(finGarantia); }
}

public class Inventario {
    public static void main(String[] args) {
        ProductoElectronico raton = new ProductoElectronico("Ratón", 25, 4, 2);
        raton.vender(1);
        raton.reponer(3);
        System.out.println(raton.enGarantia() + " | stock " + raton.getStock());
    }
}`,
    `abstract class MaterialBibliografico {
    private final String titulo;
    private boolean prestado;
    MaterialBibliografico(String titulo) {
        if (titulo == null || titulo.isBlank()) throw new IllegalArgumentException();
        this.titulo = titulo;
    }
    public void prestar() {
        if (prestado) throw new IllegalStateException("El material ya está prestado.");
        prestado = true;
    }
    public void devolver() {
        if (!prestado) throw new IllegalStateException("El material no estaba prestado.");
        prestado = false;
    }
    public String getTitulo() { return titulo; }
    public abstract int diasPrestamo();
}

class Libro extends MaterialBibliografico {
    Libro(String titulo) { super(titulo); }
    @Override public int diasPrestamo() { return 21; }
}

class Revista extends MaterialBibliografico {
    Revista(String titulo) { super(titulo); }
    @Override public int diasPrestamo() { return 7; }
}

public class Biblioteca {
    public static void main(String[] args) {
        MaterialBibliografico libro = new Libro("Java desde cero");
        libro.prestar();
        System.out.println(libro.getTitulo() + ": " + libro.diasPrestamo() + " días");
        libro.devolver();
    }
}`,
    `import java.util.Objects;

abstract class Vehiculo {
    private final String matricula;
    Vehiculo(String matricula) {
        if (matricula == null || matricula.isBlank()) throw new IllegalArgumentException();
        this.matricula = matricula.toUpperCase();
    }
    public String getMatricula() { return matricula; }
    @Override public boolean equals(Object o) {
        return o instanceof Vehiculo && matricula.equals(((Vehiculo) o).matricula);
    }
    @Override public int hashCode() { return Objects.hash(matricula); }
}

class Coche extends Vehiculo {
    private final int puertas;
    Coche(String matricula, int puertas) {
        super(matricula);
        if (puertas < 2) throw new IllegalArgumentException();
        this.puertas = puertas;
    }
    @Override public String toString() { return "Coche " + getMatricula() + " (" + puertas + " puertas)"; }
}

class Moto extends Vehiculo {
    private final int cilindrada;
    Moto(String matricula, int cilindrada) {
        super(matricula);
        if (cilindrada <= 0) throw new IllegalArgumentException();
        this.cilindrada = cilindrada;
    }
    @Override public String toString() { return "Moto " + getMatricula() + " (" + cilindrada + " cc)"; }
}

public class Autos {
    public static void main(String[] args) {
        Vehiculo a = new Coche("1234abc", 5);
        Vehiculo b = new Moto("1234ABC", 125);
        System.out.println(a.equals(b)); // true: identidad por matrícula
        System.out.println(a);
    }
}`,
    `import java.util.ArrayList;
import java.util.List;

enum Elemento { FUEGO, AGUA, TIERRA, AIRE }

abstract class Hechizo {
    private final String nombre;
    private final int coste;
    Hechizo(String nombre, int coste) {
        if (nombre == null || nombre.isBlank() || coste < 0) throw new IllegalArgumentException();
        this.nombre = nombre; this.coste = coste;
    }
    public String getNombre() { return nombre; }
    public int getCoste() { return coste; }
    public abstract String lanzar(String objetivo);
}

class HechizoElemental extends Hechizo {
    private final Elemento elemento;
    HechizoElemental(String nombre, int coste, Elemento elemento) {
        super(nombre, coste); this.elemento = elemento;
    }
    @Override public String lanzar(String objetivo) { return elemento + " impacta a " + objetivo; }
}

class HechizoBlanco extends Hechizo {
    HechizoBlanco(String nombre, int coste) { super(nombre, coste); }
    @Override public String lanzar(String objetivo) { return objetivo + " recibe curación"; }
}

class HechizoOscuro extends Hechizo {
    HechizoOscuro(String nombre, int coste) { super(nombre, coste); }
    @Override public String lanzar(String objetivo) { return objetivo + " queda debilitado"; }
}

public class Grimorio {
    public static void main(String[] args) {
        List<Hechizo> grimorio = new ArrayList<>();
        grimorio.add(new HechizoElemental("Llama", 8, Elemento.FUEGO));
        grimorio.add(new HechizoBlanco("Sanar", 5));
        grimorio.add(new HechizoOscuro("Sombra", 10));
        grimorio.stream().filter(h -> h instanceof HechizoBlanco)
            .forEach(h -> System.out.println(h.lanzar("Aliado")));
    }
}`
  ],

  explicacion: [
    {
      titulo: "1. Clases, objetos y estado",
      parrafos: [
        "Una clase describe un tipo; un objeto es una instancia concreta. Sus atributos guardan estado y sus métodos definen operaciones. Diseñar una clase es decidir qué datos pertenecen al objeto y qué operaciones deben preservar las reglas de esos datos.",
        "Un constructor establece un estado inicial válido. Si el salario no puede ser negativo, conviene impedir esa situación al construir el objeto, en vez de esperar a que otro método falle más adelante.",
        "Cada objeto tiene su propio estado de instancia. Un campo static, en cambio, pertenece a la clase y se comparte entre sus instancias. Usa static cuando el dato o la operación realmente sea común y no dependa de un objeto concreto."
      ],
      codigo: `class Punto {
    private final double x;
    private final double y;

    Punto(double x, double y) {
        this.x = x;
        this.y = y;
    }
}`
    },
    {
      titulo: "2. Encapsulación: proteger las invariantes",
      parrafos: [
        "Los campos suelen ser private para que el resto del programa no pueda dejarlos en un estado incoherente. En vez de exponer la variable, ofrece métodos que expresen acciones válidas, como ingresar dinero o reservar una habitación.",
        "Un getter solo debe existir cuando otros objetos necesitan consultar el valor. Un setter no es obligatorio: si un identificador no debe cambiar, no lo hagas modificable. Encapsular no significa generar getters y setters para todo; significa controlar las operaciones sobre el estado.",
        "Una invariante es una regla que debe ser cierta siempre, por ejemplo, denominador distinto de cero o 0 <= stock. El constructor y cada método público deben mantenerla."
      ],
      codigo: `public void vender(int cantidad) {
    if (cantidad <= 0 || cantidad > stock) {
        throw new IllegalArgumentException("Venta no válida");
    }
    stock -= cantidad;
}`
    },
    {
      titulo: "3. this, constructores y sobrecarga",
      parrafos: [
        "this referencia el objeto actual y distingue un campo de un parámetro con el mismo nombre: this.nombre = nombre. También puede delegar en otro constructor mediante this(...), y esa llamada debe ser la primera instrucción del constructor.",
        "Si no declaras ningún constructor, Java genera uno sin argumentos. Al declarar uno propio, ese constructor por defecto deja de generarse. La sobrecarga ofrece diferentes formas válidas de crear un objeto sin duplicar la inicialización.",
        "Los campos final deben recibir un valor exactamente una vez, normalmente en su declaración o en todos los caminos del constructor. Son útiles para representar datos que forman la identidad estable de un objeto."
      ],
      codigo: `public Punto() {
    this(0, 0);
}

public Punto(double x, double y) {
    this.x = x;
    this.y = y;
}`
    },
    {
      titulo: "4. Referencias, alias e inmutabilidad",
      parrafos: [
        "Al asignar una variable de objeto a otra se copia la referencia. Las dos variables pueden designar al mismo objeto. Java sigue pasando argumentos por valor, pero en el caso de objetos ese valor copiado es la referencia.",
        "Una clase inmutable no permite cambiar el estado observable después de crearla. Puede usar campos final, omitir setters y devolver copias defensivas de arrays o colecciones internas.",
        "La inmutabilidad simplifica el razonamiento: una fracción o un punto que no cambia puede compartirse sin miedo a que otro componente modifique sus coordenadas o su valor."
      ],
      codigo: `public double[] getComponentes() {
    return componentes.clone();
}`
    },
    {
      titulo: "5. Métodos de objeto e igualdad",
      parrafos: [
        "toString ofrece una representación legible y se invoca automáticamente al concatenar un objeto con texto. equals debe comparar la identidad lógica que el dominio considere relevante; no siempre significa que cada atributo coincida.",
        "Si dos objetos son iguales según equals, deben devolver el mismo hashCode. HashSet y HashMap dependen de esa regla. Sobrescribir equals sin hashCode puede causar comportamientos sorprendentes en colecciones.",
        "Para comparar números decimales calculados, igualdad exacta puede fallar por redondeo binario. En cálculos geométricos suele usarse una tolerancia pequeña, con un valor adecuado a la escala del problema."
      ],
      codigo: `@Override
public boolean equals(Object otro) {
    if (!(otro instanceof Punto)) return false;
    Punto p = (Punto) otro;
    return x == p.x && y == p.y;
}`
    },
    {
      titulo: "6. Enumerados y relaciones UML",
      parrafos: [
        "Un enum representa un conjunto finito de valores con nombre. Evita códigos mágicos como 1 = fuego o cadenas escritas de forma distinta. Puede tener campos, constructor y métodos; su constructor es privado implícitamente.",
        "name devuelve el identificador de la constante, values crea un array con las constantes y valueOf convierte un nombre exacto a enum. ordinal devuelve una posición de declaración, no un identificador de negocio estable.",
        "En UML, una asociación representa que objetos se relacionan; la agregación suele representar una relación parte-todo con ciclo de vida independiente; la composición expresa una pertenencia más fuerte. Las multiplicidades indican cuántos objetos pueden participar en cada extremo."
      ],
      codigo: `enum Palo {
    OROS, COPAS, ESPADAS, BASTOS
}

enum Prioridad {
    BAJA(1), ALTA(3);
    private final int nivel;
    Prioridad(int nivel) { this.nivel = nivel; }
}`
    },
    {
      titulo: "7. Pruebas en Eclipse: estado, límites y transiciones",
      parrafos: [
        "Prueba el ciclo de vida del objeto: creación con datos válidos, rechazo de datos inválidos y cada transición. Para una habitación, prueba check-in desde libre, segundo check-in, checkout y segundo checkout.",
        "Comprueba que una operación sobre un objeto no modifica inesperadamente otro. Si un constructor recibe un array y la clase debe conservar una copia, modifica el array original después de construir y verifica el estado del objeto.",
        "En Eclipse, crea una clase de prueba con main y varios objetos, coloca breakpoints en los métodos y observa el estado antes y después. Los ejercicios de esta unidad están pensados para programarlos y ejecutarlos en el IDE, no para escribir la solución en la web."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué representa una instancia de una clase?",
      opciones: ["Una variable local", "Un objeto concreto creado a partir del tipo", "Un paquete de Java", "Una interfaz"],
      correcta: 1,
      explicacion: "La clase describe el tipo y el objeto es una instancia concreta con su propio estado."
    },
    {
      pregunta: "¿Cuál es una ventaja de hacer los atributos private?",
      opciones: ["Hace que el objeto no tenga estado", "Permite proteger invariantes y controlar modificaciones", "Impide crear constructores", "Convierte automáticamente los métodos en static"],
      correcta: 1,
      explicacion: "La clase puede validar los cambios en vez de permitir asignaciones arbitrarias desde fuera."
    },
    {
      pregunta: "¿Qué hace this(...) dentro de un constructor?",
      opciones: ["Llama a otro constructor de la misma clase", "Crea una subclase", "Invoca un método static", "Devuelve el objeto"],
      correcta: 0,
      explicacion: "this(...) delega en otro constructor de la misma clase y debe aparecer primero."
    },
    {
      pregunta: "Si se declara un constructor propio, ¿Java genera además el constructor vacío automáticamente?",
      opciones: ["Sí, siempre", "No, el constructor por defecto solo se genera si no se declara ninguno", "Solo si la clase es public", "Solo para enums"],
      correcta: 1,
      explicacion: "Al declarar cualquier constructor, si se necesita uno sin argumentos debe escribirse explícitamente."
    },
    {
      pregunta: "¿Qué debería devolver un getter de un array interno cuando se quiere proteger el estado?",
      opciones: ["El mismo array siempre", "Una copia defensiva", "El índice cero", "null"],
      correcta: 1,
      explicacion: "Devolver una copia evita que quien llama modifique directamente el array interno."
    },
    {
      pregunta: "¿Qué regla deben cumplir equals y hashCode?",
      opciones: ["Si equals es true, hashCode debe ser igual", "Siempre deben devolver cero", "equals debe ser static", "hashCode debe devolver un String"],
      correcta: 0,
      explicacion: "Las colecciones hash requieren el mismo hash para objetos que equals considera iguales."
    },
    {
      pregunta: "¿Qué modela correctamente un enum?",
      opciones: ["Una colección de valores arbitrarios que crece en ejecución", "Un conjunto finito de constantes con nombre", "Una clase que no puede tener campos", "Un array que siempre se ordena"],
      correcta: 1,
      explicacion: "Un enum define un conjunto cerrado de instancias constantes."
    },
    {
      pregunta: "¿Qué describe una invariante de clase?",
      opciones: ["Una regla que debe mantenerse para todo estado válido del objeto", "Una variable que cambia en cada método", "Un tipo de bucle", "Un comentario UML"],
      correcta: 0,
      explicacion: "Constructores y métodos deben preservar las condiciones que definen un estado válido."
    }
  ]
};

const ejerciciosPoo = window.CONTENIDO["poo"].ejercicios;
const solucionesPoo = window.CONTENIDO["poo"].soluciones;
if (ejerciciosPoo.length !== solucionesPoo.length) {
  throw new Error("Cada ejercicio de POO debe tener su solución.");
}
ejerciciosPoo.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesPoo[indice];
});
delete window.CONTENIDO["poo"].soluciones;
