// Unidad 9: herencia, polimorfismo, interfaces y clases abstractas.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["herencia"] = {
  ejercicios: [
    { enunciado: "Diseña Vehiculo como clase abstracta con matrícula y calcularCostoDeUso. Implementa Camion y Autobus con costes distintos y calcula el coste de una flota polimórfica." },
    { enunciado: "Modela Empleado con salario anual y calcula el salario de empleados a jornada completa con antigüedad y empleados por horas. Procesa una lista heterogénea." },
    { enunciado: "Define FiguraGeometrica con area y perimetro. Implementa círculo, rectángulo y triángulo, y calcula el área total de una lista de figuras." },
    { enunciado: "Define Producto con nombre y precio, una clase abstracta ProductoBase y productos electrónicos y alimentos. Ordénalos por precio con Comparable y rechaza precios negativos." },
    { enunciado: "Crea Tanque, Avion y Barco derivados de VehiculoCombate. Gestiona un máximo de cinco unidades, permite atacar, consultar y retirar, reparar destruidos y eliminar unidades destruidas." },
    { enunciado: "Modela Warrior con Knight, WhiteMage, DarkMage y Orc. Implementa ataques polimórficos y un equipo con capacidad cinco que pueda atacar a un objetivo." },
    { enunciado: "Implementa ProductoBase, Perecedero y Electronico; calcula el precio con impuestos diferentes y presenta un inventario polimórfico." },
    { enunciado: "Modela MaterialBibliografico abstracto con Libro y Revista. Cada subtipo tiene un plazo de préstamo distinto; implementa préstamo y devolución comunes." },
    { enunciado: "Implementa Vehiculo con equals por matrícula y subclasses Coche y Moto con toString propio. Comprueba que dos vehículos con la misma matrícula son iguales." },
    { enunciado: "Diseña Cuenta como clase abstracta y cuentas Corriente, Vivienda y FondoInversion con reglas propias de ingreso, retirada y comisión. Rechaza operaciones inválidas." },
    { enunciado: "Crea Figura2D abstracta y Triangulo. Calcula perímetro, clasifica por lados, valida la desigualdad triangular y formatea sus lados con dos decimales." }
  ],

  soluciones: [
    `import java.util.ArrayList;
import java.util.List;

public class Flota {
    static abstract class Vehiculo {
        private final String matricula;
        Vehiculo(String matricula) { this.matricula = matricula; }
        abstract double calcularCostoDeUso(double kilometros);
        public String getMatricula() { return matricula; }
    }
    static class Camion extends Vehiculo {
        Camion(String m) { super(m); }
        @Override double calcularCostoDeUso(double km) { return km * 0.85 + 120; }
    }
    static class Autobus extends Vehiculo {
        Autobus(String m) { super(m); }
        @Override double calcularCostoDeUso(double km) { return km * 0.55 + 80; }
    }
    public static void main(String[] args) {
        List<Vehiculo> flota = new ArrayList<>();
        flota.add(new Camion("CAM-1"));
        flota.add(new Autobus("BUS-1"));
        for (Vehiculo v : flota) System.out.println(v.getMatricula() + ": " + v.calcularCostoDeUso(100));
    }
}`,
    `import java.util.Arrays;
import java.util.List;

public class Nominas {
    static abstract class Empleado {
        final String nombre;
        Empleado(String nombre) { this.nombre = nombre; }
        abstract double salarioMensual();
        double salarioAnual() { return salarioMensual() * 12; }
    }
    static class JornadaCompleta extends Empleado {
        private final double base;
        private final int anios;
        JornadaCompleta(String nombre, double base, int anios) {
            super(nombre); this.base = base; this.anios = anios;
        }
        @Override double salarioMensual() { return base + anios * 35; }
    }
    static class PorHoras extends Empleado {
        private final double tarifa;
        private final int horas;
        PorHoras(String nombre, double tarifa, int horas) {
            super(nombre); this.tarifa = tarifa; this.horas = horas;
        }
        @Override double salarioMensual() { return tarifa * horas; }
    }
    public static void main(String[] args) {
        List<Empleado> equipo = Arrays.asList(
            new JornadaCompleta("Ana", 2200, 4), new PorHoras("Leo", 18, 100));
        for (Empleado e : equipo) System.out.println(e.nombre + ": " + e.salarioAnual());
    }
}`,
    `import java.util.Arrays;
import java.util.List;

public class Figuras {
    interface FiguraGeometrica { double area(); double perimetro(); }
    static class Circulo implements FiguraGeometrica {
        final double r;
        Circulo(double r) { if (r <= 0) throw new IllegalArgumentException(); this.r = r; }
        public double area() { return Math.PI * r * r; }
        public double perimetro() { return 2 * Math.PI * r; }
    }
    static class Rectangulo implements FiguraGeometrica {
        final double b, h;
        Rectangulo(double b, double h) { if (b <= 0 || h <= 0) throw new IllegalArgumentException(); this.b=b; this.h=h; }
        public double area() { return b * h; }
        public double perimetro() { return 2 * (b + h); }
    }
    static class Triangulo implements FiguraGeometrica {
        final double a, b, c;
        Triangulo(double a, double b, double c) {
            if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) throw new IllegalArgumentException();
            this.a=a; this.b=b; this.c=c;
        }
        public double perimetro() { return a + b + c; }
        public double area() {
            double s = perimetro() / 2;
            return Math.sqrt(s * (s-a) * (s-b) * (s-c));
        }
    }
    public static void main(String[] args) {
        List<FiguraGeometrica> lista = Arrays.asList(new Circulo(2), new Rectangulo(3, 4), new Triangulo(3, 4, 5));
        System.out.println(lista.stream().mapToDouble(FiguraGeometrica::area).sum());
    }
}`,
    `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CatalogoProductos {
    interface Producto { String nombre(); double precio(); }
    static abstract class ProductoBase implements Producto, Comparable<ProductoBase> {
        private final String nombre;
        private final double precio;
        ProductoBase(String nombre, double precio) {
            if (nombre == null || nombre.isBlank() || precio < 0) throw new IllegalArgumentException();
            this.nombre = nombre; this.precio = precio;
        }
        public String nombre() { return nombre; }
        public double precio() { return precio; }
        public int compareTo(ProductoBase otro) {
            int porPrecio = Double.compare(precio, otro.precio);
            return porPrecio != 0 ? porPrecio : nombre.compareTo(otro.nombre);
        }
    }
    static class Electronico extends ProductoBase { Electronico(String n, double p) { super(n, p); } }
    static class Alimento extends ProductoBase { Alimento(String n, double p) { super(n, p); } }
    public static void main(String[] args) {
        List<ProductoBase> productos = new ArrayList<>();
        productos.add(new Electronico("Teclado", 45));
        productos.add(new Alimento("Arroz", 2));
        Collections.sort(productos);
        for (ProductoBase p : productos) System.out.println(p.nombre() + ": " + p.precio());
    }
}`,
    `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Batalla {
    static abstract class Unidad {
        final String nombre;
        int salud;
        Unidad(String nombre, int salud) { this.nombre=nombre; this.salud=salud; }
        abstract int ataque();
        void recibir(int danio) { salud = Math.max(0, salud-danio); }
        boolean destruido() { return salud == 0; }
        void reparar() { salud = 100; }
    }
    static class Tanque extends Unidad {
        Tanque(String n) { super(n, 100); }
        int ataque() { return 30; }
    }
    static class Avion extends Unidad {
        Avion(String n) { super(n, 80); }
        int ataque() { return 25; }
    }
    static class Barco extends Unidad {
        Barco(String n) { super(n, 120); }
        int ataque() { return 20; }
    }
    static class Ejercito {
        final List<Unidad> unidades = new ArrayList<>();
        boolean anadir(Unidad u) { if (unidades.size() == 5) return false; return unidades.add(u); }
        Unidad obtener(int i) { return unidades.get(i); }
        void atacar(int atacante, int objetivo) { obtener(objetivo).recibir(obtener(atacante).ataque()); }
        void repararDestruidos() { for (Unidad u : unidades) if (u.destruido()) u.reparar(); }
        void eliminarDestruidos() {
            for (Iterator<Unidad> it = unidades.iterator(); it.hasNext();) if (it.next().destruido()) it.remove();
        }
    }
    public static void main(String[] args) {
        Ejercito e = new Ejercito();
        e.anadir(new Tanque("T1")); e.anadir(new Avion("A1"));
        e.atacar(0, 1);
        System.out.println(e.obtener(1).salud);
    }
}`,
    `import java.util.ArrayList;
import java.util.List;

public class EquipoFantasia {
    static abstract class Warrior {
        final String nombre;
        int vida;
        Warrior(String nombre, int vida) { this.nombre=nombre; this.vida=vida; }
        abstract int attack();
        void recibir(int d) { vida = Math.max(0, vida - d); }
    }
    static class Knight extends Warrior { Knight(String n) { super(n, 120); } int attack() { return 25; } }
    static class WhiteMage extends Warrior { WhiteMage(String n) { super(n, 70); } int attack() { return 12; } }
    static class DarkMage extends Warrior { DarkMage(String n) { super(n, 75); } int attack() { return 22; } }
    static class Orc extends Warrior { Orc(String n) { super(n, 100); } int attack() { return 20; } }
    static class Equipo {
        final List<Warrior> miembros = new ArrayList<>();
        boolean anadir(Warrior w) { if (miembros.size() >= 5 || miembros.contains(w)) return false; miembros.add(w); return true; }
        void atacar(int i, Warrior objetivo) { objetivo.recibir(miembros.get(i).attack()); }
    }
    public static void main(String[] args) {
        Equipo equipo = new Equipo();
        equipo.anadir(new Knight("Ari")); equipo.anadir(new WhiteMage("Eli"));
        Orc enemigo = new Orc("Orco");
        equipo.atacar(0, enemigo);
        System.out.println(enemigo.vida);
    }
}`,
    `import java.util.ArrayList;
import java.util.List;

public class InventarioHerencia {
    static abstract class Producto {
        final String nombre;
        final double precio;
        Producto(String nombre, double precio) { if (precio < 0) throw new IllegalArgumentException(); this.nombre=nombre; this.precio=precio; }
        abstract double iva();
        double precioFinal() { return precio * (1 + iva()); }
    }
    static class Perecedero extends Producto {
        Perecedero(String n, double p) { super(n,p); }
        double iva() { return 0.04; }
    }
    static class Electronico extends Producto {
        Electronico(String n, double p) { super(n,p); }
        double iva() { return 0.21; }
    }
    public static void main(String[] args) {
        List<Producto> productos = new ArrayList<>();
        productos.add(new Perecedero("Pan", 2));
        productos.add(new Electronico("Monitor", 150));
        for (Producto p : productos) System.out.println(p.nombre + ": " + p.precioFinal());
    }
}`,
    `import java.util.Arrays;
import java.util.List;

public class Prestamos {
    static abstract class Material {
        final String titulo;
        boolean prestado;
        Material(String titulo) { this.titulo=titulo; }
        abstract int plazoDias();
        void prestar() { if (prestado) throw new IllegalStateException("Ya prestado."); prestado=true; }
        void devolver() { if (!prestado) throw new IllegalStateException("No estaba prestado."); prestado=false; }
    }
    static class Libro extends Material { Libro(String t) { super(t); } int plazoDias() { return 21; } }
    static class Revista extends Material { Revista(String t) { super(t); } int plazoDias() { return 7; } }
    public static void main(String[] args) {
        List<Material> materiales = Arrays.asList(new Libro("Java"), new Revista("Ciencia"));
        for (Material m : materiales) {
            m.prestar();
            System.out.println(m.titulo + ": " + m.plazoDias() + " días");
            m.devolver();
        }
    }
}`,
    `import java.util.Objects;

public class VehiculosIguales {
    static abstract class Vehiculo {
        final String matricula;
        Vehiculo(String matricula) { this.matricula=matricula.toUpperCase(); }
        @Override public boolean equals(Object o) {
            return o instanceof Vehiculo && matricula.equals(((Vehiculo)o).matricula);
        }
        @Override public int hashCode() { return Objects.hash(matricula); }
    }
    static class Coche extends Vehiculo {
        final int puertas;
        Coche(String m, int puertas) { super(m); this.puertas=puertas; }
        @Override public String toString() { return "Coche " + matricula + " (" + puertas + " puertas)"; }
    }
    static class Moto extends Vehiculo {
        final int cc;
        Moto(String m, int cc) { super(m); this.cc=cc; }
        @Override public String toString() { return "Moto " + matricula + " (" + cc + " cc)"; }
    }
    public static void main(String[] args) {
        Vehiculo a = new Coche("1234abc", 5), b = new Moto("1234ABC", 125);
        System.out.println(a.equals(b));
    }
}`,
    `import java.util.ArrayList;
import java.util.List;

public class Cuentas {
    static abstract class Cuenta {
        final String titular;
        double saldo;
        Cuenta(String titular, double saldo) { if (saldo < 0) throw new IllegalArgumentException(); this.titular=titular; this.saldo=saldo; }
        abstract double comisionMensual();
        void ingresar(double cantidad) { if (cantidad <= 0) throw new IllegalArgumentException(); saldo += cantidad; }
        boolean retirar(double cantidad) {
            if (cantidad <= 0 || cantidad + comisionMensual() > saldo) return false;
            saldo -= cantidad + comisionMensual();
            return true;
        }
        void liquidar() { saldo = Math.max(0, saldo - comisionMensual()); }
    }
    static class Corriente extends Cuenta { Corriente(String t,double s){super(t,s);} double comisionMensual(){return 5;} }
    static class Vivienda extends Cuenta { Vivienda(String t,double s){super(t,s);} double comisionMensual(){return 1;} }
    static class FondoInversion extends Cuenta {
        FondoInversion(String t,double s){super(t,s);}
        double comisionMensual(){return saldo * 0.01;}
    }
    public static void main(String[] args) {
        List<Cuenta> cuentas = new ArrayList<>();
        cuentas.add(new Corriente("Ada", 500));
        cuentas.add(new Vivienda("Noa", 900));
        cuentas.add(new FondoInversion("Leo", 1200));
        for (Cuenta c : cuentas) { c.liquidar(); System.out.println(c.titular + ": " + c.saldo); }
    }
}`,
    `import java.util.Locale;

public class Triangulo2D {
    static abstract class Figura2D {
        abstract double perimetro();
    }
    static class Triangulo extends Figura2D {
        final double a, b, c;
        Triangulo(double a, double b, double c) {
            if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
                throw new IllegalArgumentException("Lados no válidos.");
            }
            this.a=a; this.b=b; this.c=c;
        }
        @Override double perimetro() { return a + b + c; }
        String tipo() {
            if (a == b && b == c) return "equilátero";
            if (a == b || b == c || a == c) return "isósceles";
            return "escaleno";
        }
        @Override public String toString() {
            return String.format(Locale.ROOT, "Triángulo %s [%.2f, %.2f, %.2f], perímetro %.2f",
                tipo(), a, b, c, perimetro());
        }
    }
    public static void main(String[] args) { System.out.println(new Triangulo(3, 4, 5)); }
}`
  ],

  explicacionesSoluciones: [
    "Vehiculo define el contrato de cálculo y sus datos comunes; Camion y Autobus implementan sus propias fórmulas. La flota puede recorrer una lista de Vehiculo y llamar al método sobrescrito sin distinguir el subtipo.",
    "Empleado concentra los datos comunes y cada modalidad calcula su salario con reglas propias. Procesar la lista por el tipo real permite aplicar polimórficamente jornada completa o pago por horas.",
    "FiguraGeometrica declara operaciones comunes. Círculo, rectángulo y triángulo implementan sus fórmulas, y la suma del área se obtiene recorriendo una colección heterogénea y llamando a area().",
    "ProductoBase aporta nombre y precio y exige que sus subtipos definan lo específico. Comparable compara por precio y permite ordenar productos de distintos tipos; la validación impide precios negativos.",
    "VehiculoCombate agrupa estado y operaciones compartidas, mientras Tanque, Avion y Barco definen capacidades de ataque. El gestor impone el máximo de unidades y evita acciones inválidas sobre unidades destruidas.",
    "Warrior define el protocolo de combate y cada clase concreta implementa su ataque. El equipo conserva distintos tipos de guerrero y los recorre para atacar, aprovechando el despacho dinámico.",
    "ProductoBase encapsula el precio y define el cálculo común; Perecedero y Electronico sobrescriben impuestos o recargos. Al recorrer el inventario como productos base, cada elemento calcula su precio según su clase real.",
    "MaterialBibliografico mantiene los datos y el estado común de préstamo. Libro y Revista especializan el plazo; los métodos comunes validan cambios de estado y el polimorfismo selecciona el comportamiento correspondiente.",
    "equals compara matrículas y hashCode debe usar el mismo criterio para que colecciones basadas en hash funcionen correctamente. Coche y Moto heredan esa identidad y personalizan su representación textual.",
    "Cuenta concentra el saldo y define las operaciones comunes; cada tipo de cuenta implementa sus límites y comisiones. Los métodos rechazan cantidades inválidas antes de modificar el saldo.",
    "Figura2D representa el contrato general y Triangulo concreta los cálculos. La desigualdad triangular valida que los lados formen una figura real; después se clasifica por igualdad y se formatea el perímetro."
  ],

  explicacion: [
    {
      titulo: "1. Herencia modela una relación «es un»",
      parrafos: [
        "Una subclase hereda de una superclase mediante extends. La relación debe tener sentido en el dominio: un camión es un vehículo, por lo que un Camion puede usarse donde se espera Vehiculo. Heredar solo para reutilizar unas líneas puede crear una jerarquía que expresa una idea falsa.",
        "Los campos private del padre no son accesibles directamente desde la hija; la clase base puede exponer métodos protegidos o públicos que mantengan sus invariantes. Una clase Java solo extiende directamente de una clase.",
        "Los constructores no se heredan. La subclase llama al constructor del padre con super(...), y esa llamada debe ser la primera instrucción del constructor."
      ],
      codigo: `class Camion extends Vehiculo {
    Camion(String matricula) {
        super(matricula);
    }
}`
    },
    {
      titulo: "2. Sobrescritura y despacho dinámico",
      parrafos: [
        "Sobrescribir significa redefinir en la subclase un método de instancia con la misma firma compatible. @Override le pide al compilador verificar que realmente se está sobrescribiendo y convierte errores tipográficos en errores detectables.",
        "El tipo de la variable determina qué métodos puedes invocar; el tipo real del objeto determina qué implementación sobrescrita se ejecuta. Así una lista de Vehiculo puede contener camiones y autobuses, y cada objeto calcula su coste de forma propia.",
        "La sobrecarga no es sobrescritura: la sobrecarga cambia la lista de parámetros y se resuelve en compilación. La sobrescritura conserva la firma y se decide en tiempo de ejecución según el objeto."
      ],
      codigo: `Vehiculo v = new Camion("ABC");
System.out.println(v.calcularCostoDeUso(100)); // implementación de Camion`
    },
    {
      titulo: "3. Clases abstractas e interfaces",
      parrafos: [
        "Una clase abstracta no se instancia y puede compartir estado, constructor y comportamiento parcial. Los métodos abstractos obligan a las clases concretas a completar las operaciones que el tipo promete.",
        "Una interfaz define un contrato de capacidades. Una clase puede implementar varias interfaces, aunque solo puede extender una clase. Usa interfaces cuando tipos que no comparten una familia deban ofrecer la misma operación, por ejemplo, area y perimetro.",
        "No conviertas una implementación incompleta en una respuesta silenciosa. Si una operación no puede definirse para todos los subtipos, quizá no pertenece al padre o debe declararse abstracta."
      ],
      codigo: `interface Figura {
    double area();
}

class Circulo implements Figura {
    public double area() { return Math.PI * radio * radio; }
}`
    },
    {
      titulo: "4. super y el contrato heredado",
      parrafos: [
        "super(...) delega la construcción de la parte heredada; super.metodo(...) permite reutilizar la implementación del padre cuando se amplía un comportamiento. La inicialización del padre ocurre antes que la del hijo.",
        "Una subclase no debe debilitar las condiciones prometidas por su clase base. Si un método del padre acepta cierta operación, una hija no debería rechazar arbitrariamente entradas que el padre acepta.",
        "Mantén el estado común en el padre solo cuando todos los subtipos comparten realmente esa propiedad. La lógica específica y los datos propios pertenecen a la subclase."
      ]
    },
    {
      titulo: "5. Object, equals y hashCode en jerarquías",
      parrafos: [
        "Toda clase hereda de Object. toString proporciona una representación, equals define igualdad lógica y hashCode participa en colecciones basadas en hash.",
        "Diseñar igualdad entre una superclase y una subclase requiere cuidado: una igualdad basada solo en matrícula puede considerar iguales dos tipos distintos. Es una decisión de dominio que debe ser consistente y simétrica; las soluciones simples deben explicar qué identidad están usando.",
        "Cuando la igualdad depende de campos inmutables, su hash también puede basarse en ellos. No incluyas campos mutables en un hash mientras el objeto esté dentro de un HashSet o como clave de HashMap."
      ],
      codigo: `@Override
public int hashCode() {
    return Objects.hash(matricula);
}`
    },
    {
      titulo: "6. Polimorfismo, colecciones y pruebas",
      parrafos: [
        "Una colección del tipo base puede almacenar objetos de varios subtipos. Recorrerla y llamar al método sobrescrito aprovecha el polimorfismo y evita cadenas de if que preguntan la clase concreta para decidir qué comportamiento ejecutar.",
        "Prueba cada subtipo por separado y después prueba la misma operación mediante una referencia del tipo padre. Verifica también límites de colecciones, duplicados y estados terminales, como una unidad destruida.",
        "En Eclipse, usa el depurador para inspeccionar el tipo real del objeto y entrar en el método invocado. La pestaña de jerarquía de tipos ayuda a localizar qué clase implementa o sobrescribe cada operación."
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué expresa normalmente la relación extends?",
      opciones: ["«usa temporalmente»", "«es un tipo de»", "«contiene siempre una lista»", "«es igual a»"],
      correcta: 1,
      explicacion: "Una subclase puede usarse donde se espera la superclase, por lo que la relación debe representar un «es un» válido."
    },
    {
      pregunta: "¿Qué debe hacerse al declarar un constructor de una subclase?",
      opciones: ["Llamar a super(...) como primera instrucción cuando se delega al padre", "Llamar siempre a this y a super", "Sobrescribir el constructor del padre", "Hacerlo abstracto"],
      correcta: 0,
      explicacion: "La parte heredada se inicializa mediante el constructor del padre; super(...) debe ser la primera instrucción explícita."
    },
    {
      pregunta: "En una llamada sobrescrita, ¿qué determina la implementación que se ejecuta?",
      opciones: ["El nombre de la variable", "El tipo real del objeto", "El paquete que compila el código", "El orden de la lista"],
      correcta: 1,
      explicacion: "El despacho dinámico selecciona la versión según la clase real de la instancia."
    },
    {
      pregunta: "¿Qué permite una interfaz que una clase no puede hacer con extends?",
      opciones: ["Implementar varios contratos", "Crear objetos", "Declarar métodos", "Tener tipos"],
      correcta: 0,
      explicacion: "Una clase solo puede extender una clase, pero puede implementar varias interfaces."
    },
    {
      pregunta: "¿Puede instanciarse directamente una clase abstracta?",
      opciones: ["Sí, con new", "No, se instancia un subtipo concreto", "Solo desde main", "Solo si no tiene campos"],
      correcta: 1,
      explicacion: "La clase abstracta representa una base incompleta; debe crearse una instancia de una clase concreta."
    },
    {
      pregunta: "¿Para qué sirve @Override?",
      opciones: ["Hace que un método sea static", "Pide al compilador comprobar que la firma sobrescribe un método heredado", "Evita usar super", "Permite herencia múltiple de clases"],
      correcta: 1,
      explicacion: "La anotación permite detectar una firma mal escrita que de otro modo podría convertirse en un método nuevo."
    },
    {
      pregunta: "¿Qué contrato deben respetar equals y hashCode?",
      opciones: ["Si equals devuelve true, hashCode debe coincidir", "hashCode siempre es único", "equals debe ser abstracto", "Ambos deben usar todos los campos mutables"],
      correcta: 0,
      explicacion: "Las estructuras hash necesitan que objetos iguales produzcan el mismo hash."
    },
    {
      pregunta: "¿Por qué puede ser mala idea preguntar con instanceof en cada operación de una lista polimórfica?",
      opciones: ["Porque impide crear la lista", "Porque sustituye el despacho polimórfico por lógica acoplada a clases concretas", "Porque instanceof siempre lanza una excepción", "Porque las listas no admiten herencia"],
      correcta: 1,
      explicacion: "La operación debería delegarse al método sobrescrito cuando cada subtipo tiene un comportamiento propio."
    }
  ]
};

const ejerciciosHerencia = window.CONTENIDO["herencia"].ejercicios;
const solucionesHerencia = window.CONTENIDO["herencia"].soluciones;
const explicacionesSolucionesHerencia = window.CONTENIDO["herencia"].explicacionesSoluciones;
if (ejerciciosHerencia.length !== solucionesHerencia.length || ejerciciosHerencia.length !== explicacionesSolucionesHerencia.length) {
  throw new Error("Cada ejercicio de herencia debe tener una solución y su explicación.");
}
ejerciciosHerencia.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesHerencia[indice];
  ejercicio.explicacion = explicacionesSolucionesHerencia[indice];
});
delete window.CONTENIDO["herencia"].soluciones;
delete window.CONTENIDO["herencia"].explicacionesSoluciones;
