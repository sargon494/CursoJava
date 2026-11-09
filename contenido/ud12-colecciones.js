// Unidad 12: estructuras de datos y Java Collections Framework.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["colecciones"] = {
  ejercicios: [
    { enunciado: "Comprueba si una expresión con paréntesis, corchetes y llaves está balanceada y respeta el orden de cierre." },
    { enunciado: "Evalúa una expresión postfija de números y operadores +, -, *, / usando una pila." },
    { enunciado: "Convierte una expresión infija con operadores +, -, *, / y paréntesis a postfija mediante Shunting-Yard." },
    { enunciado: "Crea un historial de texto con deshacer y rehacer basado en dos pilas de estados." },
    { enunciado: "Simula Round Robin: cada proceso recibe un quantum hasta terminar y vuelve al final de la cola si queda trabajo." },
    { enunciado: "Planifica procesos por prioridad descendente y, en empate, por orden de llegada." },
    { enunciado: "Guarda estudiantes sin repetir NIA y ordénalos por NIA, apellidos y media usando Comparator." },
    { enunciado: "Elimina duplicados de una lista conservando la primera aparición e informa cuántos se quitaron." },
    { enunciado: "Extrae palabras únicas en orden de aparición, ignorando mayúsculas y puntuación." },
    { enunciado: "Implementa unión, intersección, diferencia, diferencia simétrica y pruebas de igualdad/subconjunto." },
    { enunciado: "Gestiona eventos sin duplicados por fecha y lugar; ordénalos, busca por rango, elimina y consulta el próximo." },
    { enunciado: "Cuenta palabras y muéstralas alfabéticamente, por frecuencia descendente y entre las N más frecuentes." },
    { enunciado: "Construye para cada palabra un mapa de letras y frecuencias, ignorando mayúsculas y caracteres no alfabéticos." },
    { enunciado: "Gestiona inventario: agregar, vender, ordenar por nombre, listar stock bajo y eliminar agotados." },
    { enunciado: "Guarda notas por asignatura, calcula medias y encuentra estudiantes con mejor y peor media." },
    { enunciado: "Genera una factura de supermercado con subtotales y el IVA del 21 %." },
    { enunciado: "Agrupa tareas por día de la semana en orden de llegada y consulta el día futuro más próximo con tareas." },
    { enunciado: "Implementa una lista enlazada propia con invertir, eliminar duplicados, ordenar, últimos N, máximo, concatenar y clonar." },
    { enunciado: "Implementa una pila con array y operaciones remove, contains, reverse, merge; resuelve Torres de Hanoi recursivamente." },
    { enunciado: "Implementa una cola enlazada con clear, merge, equals e interleave; prioriza llamadas urgentes, normales y bajas." }
  ],
  soluciones: [
    `import java.util.ArrayDeque;
import java.util.Deque;

public class ParentesisBalanceados {
    static boolean balanceada(String texto) {
        Deque<Character> pila = new ArrayDeque<>();
        for (char c : texto.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') pila.push(c);
            else if (c == ')' || c == ']' || c == '}') {
                if (pila.isEmpty()) return false;
                char abre = pila.pop();
                if ((c == ')' && abre != '(') || (c == ']' && abre != '[') || (c == '}' && abre != '{')) return false;
            }
        }
        return pila.isEmpty();
    }
    public static void main(String[] args) {
        System.out.println(balanceada("{[()]}"));
        System.out.println(balanceada("([)]"));
    }
}`,
    `import java.util.ArrayDeque;
import java.util.Deque;

public class EvaluarPostfija {
    static int evaluar(String expresion) {
        Deque<Integer> pila = new ArrayDeque<>();
        for (String token : expresion.trim().split("\\\\s+")) {
            if (token.matches("-?\\\\d+")) pila.push(Integer.parseInt(token));
            else {
                if (pila.size() < 2) throw new IllegalArgumentException("Expresión mal formada.");
                int b = pila.pop(), a = pila.pop();
                switch (token) {
                    case "+": pila.push(a + b); break;
                    case "-": pila.push(a - b); break;
                    case "*": pila.push(a * b); break;
                    case "/": pila.push(a / b); break;
                    default: throw new IllegalArgumentException("Operador desconocido: " + token);
                }
            }
        }
        if (pila.size() != 1) throw new IllegalArgumentException("Expresión mal formada.");
        return pila.pop();
    }
    public static void main(String[] args) { System.out.println(evaluar("8 2 / 3 +")); }
}`,
    `import java.util.ArrayDeque;
import java.util.Deque;

public class InfijaAPostfija {
    static int prioridad(String op) { return op.equals("+") || op.equals("-") ? 1 : 2; }
    static String convertir(String expresion) {
        Deque<String> operadores = new ArrayDeque<>();
        StringBuilder salida = new StringBuilder();
        for (String t : expresion.trim().split("\\\\s+")) {
            if (t.matches("\\\\d+")) salida.append(t).append(' ');
            else if (t.equals("(")) operadores.push(t);
            else if (t.equals(")")) {
                while (!operadores.isEmpty() && !operadores.peek().equals("(")) salida.append(operadores.pop()).append(' ');
                if (operadores.isEmpty()) throw new IllegalArgumentException("Paréntesis no balanceados.");
                operadores.pop();
            } else if (t.matches("[+*/-]")) {
                while (!operadores.isEmpty() && !operadores.peek().equals("(")
                        && prioridad(operadores.peek()) >= prioridad(t)) salida.append(operadores.pop()).append(' ');
                operadores.push(t);
            } else throw new IllegalArgumentException("Token no válido: " + t);
        }
        while (!operadores.isEmpty()) {
            String op = operadores.pop();
            if (op.equals("(")) throw new IllegalArgumentException("Paréntesis no balanceados.");
            salida.append(op).append(' ');
        }
        return salida.toString().trim();
    }
    public static void main(String[] args) { System.out.println(convertir("( 2 + 3 ) * 4")); }
}`,
    `import java.util.ArrayDeque;
import java.util.Deque;

public class HistorialTexto {
    private String texto = "";
    private final Deque<String> deshacer = new ArrayDeque<>(), rehacer = new ArrayDeque<>();
    void escribir(String nuevo) { deshacer.push(texto); texto = nuevo; rehacer.clear(); }
    void deshacer() { if (!deshacer.isEmpty()) { rehacer.push(texto); texto = deshacer.pop(); } }
    void rehacer() { if (!rehacer.isEmpty()) { deshacer.push(texto); texto = rehacer.pop(); } }
    public static void main(String[] args) {
        HistorialTexto h = new HistorialTexto();
        h.escribir("Hola"); h.escribir("Hola Java"); h.deshacer(); System.out.println(h.texto);
        h.rehacer(); System.out.println(h.texto);
    }
}`,
    `import java.util.ArrayDeque;
import java.util.Queue;

public class RoundRobin {
    static class Proceso { String nombre; int restante; Proceso(String n, int t) { nombre=n; restante=t; } }
    static void ejecutar(Queue<Proceso> cola, int quantum) {
        if (quantum <= 0) throw new IllegalArgumentException("Quantum debe ser positivo.");
        while (!cola.isEmpty()) {
            Proceso p = cola.remove();
            int usado = Math.min(quantum, p.restante);
            p.restante -= usado;
            System.out.println(p.nombre + " ejecuta " + usado + " ms; quedan " + p.restante);
            if (p.restante > 0) cola.add(p);
        }
    }
    public static void main(String[] args) {
        Queue<Proceso> q = new ArrayDeque<>();
        q.add(new Proceso("A", 5)); q.add(new Proceso("B", 3)); ejecutar(q, 2);
    }
}`,
    `import java.util.PriorityQueue;

public class PlanificadorPrioridad {
    static class Proceso {
        final String nombre; final int prioridad, llegada;
        Proceso(String n, int p, int l) { nombre=n; prioridad=p; llegada=l; }
    }
    public static void main(String[] args) {
        PriorityQueue<Proceso> q = new PriorityQueue<>((a,b) -> {
            int porPrioridad = Integer.compare(b.prioridad, a.prioridad);
            return porPrioridad != 0 ? porPrioridad : Integer.compare(a.llegada, b.llegada);
        });
        q.add(new Proceso("A", 2, 0)); q.add(new Proceso("B", 3, 1)); q.add(new Proceso("C", 3, 2));
        while (!q.isEmpty()) { Proceso p=q.remove(); System.out.println(p.nombre + " prioridad " + p.prioridad); }
    }
}`,
    `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class GestionEstudiantes {
    static class Estudiante {
        final String nia, apellidos; final double media;
        Estudiante(String n, String a, double m) { nia=n; apellidos=a; media=m; }
        public String toString() { return nia + " " + apellidos + " " + media; }
    }
    public static void main(String[] args) {
        List<Estudiante> lista = new ArrayList<>();
        lista.add(new Estudiante("3", "López", 8.2)); lista.add(new Estudiante("1", "Díaz", 7.5));
        lista.sort(Comparator.comparing((Estudiante e) -> e.nia)
                .thenComparing(e -> e.apellidos).thenComparingDouble(e -> e.media));
        lista.forEach(System.out::println);
    }
}`,
    `import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class EliminarDuplicados {
    public static void main(String[] args) {
        List<String> entrada = Arrays.asList("Java", "SQL", "Java", "Eclipse", "SQL");
        Set<String> unicos = new LinkedHashSet<>(entrada);
        int eliminados = entrada.size() - unicos.size();
        System.out.println(unicos + " | duplicados eliminados: " + eliminados);
    }
}`,
    `import java.util.LinkedHashSet;
import java.util.Set;

public class PalabrasUnicas {
    public static void main(String[] args) {
        String texto = "Java, aprende Java y practica con Eclipse.";
        Set<String> palabras = new LinkedHashSet<>();
        for (String p : texto.toLowerCase().split("[^\\\\p{L}]+")) if (!p.isEmpty()) palabras.add(p);
        System.out.println(palabras);
    }
}`,
    `import java.util.HashSet;
import java.util.Set;

public class OperacionesConjuntos {
    public static void main(String[] args) {
        Set<Integer> a = new HashSet<>(), b = new HashSet<>();
        a.add(1); a.add(2); a.add(3); b.add(3); b.add(4);
        Set<Integer> union = new HashSet<>(a); union.addAll(b);
        Set<Integer> inter = new HashSet<>(a); inter.retainAll(b);
        Set<Integer> diferencia = new HashSet<>(a); diferencia.removeAll(b);
        Set<Integer> simetrica = new HashSet<>(union); simetrica.removeAll(inter);
        System.out.println("unión=" + union + " intersección=" + inter + " A-B=" + diferencia + " simétrica=" + simetrica);
        System.out.println("iguales=" + a.equals(b) + " A subconjunto de unión=" + union.containsAll(a));
    }
}`,
    `import java.time.LocalDate;
import java.util.Comparator;
import java.util.TreeSet;

public class GestionEventos {
    static class Evento {
        final LocalDate fecha; final String lugar, nombre;
        Evento(LocalDate f, String l, String n) { fecha=f; lugar=l; nombre=n; }
        public String toString() { return fecha + " " + lugar + " " + nombre; }
    }
    public static void main(String[] args) {
        TreeSet<Evento> eventos = new TreeSet<>(Comparator.comparing((Evento e) -> e.fecha).thenComparing(e -> e.lugar));
        eventos.add(new Evento(LocalDate.now().plusDays(2), "Madrid", "Charla"));
        eventos.add(new Evento(LocalDate.now().plusDays(5), "Sevilla", "Taller"));
        eventos.add(new Evento(LocalDate.now().plusDays(2), "Madrid", "Duplicado"));
        LocalDate desde=LocalDate.now(), hasta=LocalDate.now().plusDays(3);
        for (Evento e : eventos) if (!e.fecha.isBefore(desde) && !e.fecha.isAfter(hasta)) System.out.println(e);
        System.out.println("Próximo: " + eventos.ceiling(new Evento(LocalDate.now(), "", "")));
    }
}`,
    `import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FrecuenciaPalabras {
    public static void main(String[] args) {
        String texto = "Java es útil y Java es popular";
        Map<String,Integer> cuenta = new HashMap<>();
        for (String p : texto.toLowerCase().split("[^\\\\p{L}]+")) if (!p.isEmpty()) cuenta.put(p, cuenta.getOrDefault(p,0)+1);
        List<String> alfabetico = new ArrayList<>(cuenta.keySet());
        alfabetico.sort(String::compareTo);
        List<Map.Entry<String,Integer>> frecuencia = new ArrayList<>(cuenta.entrySet());
        frecuencia.sort(Map.Entry.<String,Integer>comparingByValue(Comparator.reverseOrder()).thenComparing(Map.Entry::getKey));
        System.out.println("Alfabético: " + alfabetico);
        System.out.println("Por frecuencia: " + frecuencia);
        System.out.println("Top 2: " + frecuencia.subList(0, Math.min(2, frecuencia.size())));
    }
}`,
    `import java.util.LinkedHashMap;
import java.util.Map;

public class FrecuenciaLetras {
    static Map<Character,Integer> frecuencia(String palabra) {
        Map<Character,Integer> mapa = new LinkedHashMap<>();
        for (char c : palabra.toLowerCase().toCharArray()) if (Character.isLetter(c)) mapa.put(c, mapa.getOrDefault(c,0)+1);
        return mapa;
    }
    public static void main(String[] args) {
        String[] palabras = {"Java", "Eclipse"};
        for (String p : palabras) System.out.println(p + " -> " + frecuencia(p));
    }
}`,
    `import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InventarioStock {
    private final Map<String,Integer> stock = new HashMap<>();
    void agregar(String producto, int cantidad) {
        if (cantidad <= 0) throw new IllegalArgumentException("Cantidad positiva requerida.");
        stock.put(producto, stock.getOrDefault(producto,0)+cantidad);
    }
    void vender(String producto, int cantidad) {
        int actual=stock.getOrDefault(producto,0);
        if (cantidad <= 0 || cantidad > actual) throw new IllegalArgumentException("Stock insuficiente.");
        stock.put(producto, actual-cantidad);
    }
    public static void main(String[] args) {
        InventarioStock i=new InventarioStock(); i.agregar("Teclado",8); i.agregar("Ratón",3);
        List<String> nombres=new ArrayList<>(i.stock.keySet()); nombres.sort(Comparator.naturalOrder());
        for (String n:nombres) System.out.println(n+" = "+i.stock.get(n)+(i.stock.get(n)<5?" (stock bajo)":""));
        i.stock.values().removeIf(c -> c == 0);
    }
}`,
    `import java.util.HashMap;
import java.util.Map;

public class NotasEstudiantes {
    static double media(Map<String,Double> notas) {
        if (notas.isEmpty()) throw new IllegalArgumentException("Sin notas.");
        return notas.values().stream().mapToDouble(Double::doubleValue).average().getAsDouble();
    }
    public static void main(String[] args) {
        Map<String,Map<String,Double>> alumnos=new HashMap<>();
        Map<String,Double> ana=new HashMap<>(); ana.put("Java",8.0); ana.put("BD",9.0); alumnos.put("Ana",ana);
        Map<String,Double> luis=new HashMap<>(); luis.put("Java",6.0); luis.put("BD",7.0); alumnos.put("Luis",luis);
        String mejor=null, peor=null;
        for(String n:alumnos.keySet()) {
            if(mejor==null || media(alumnos.get(n))>media(alumnos.get(mejor))) mejor=n;
            if(peor==null || media(alumnos.get(n))<media(alumnos.get(peor))) peor=n;
            System.out.println(n+" media="+media(alumnos.get(n)));
        }
        System.out.println("Mejor="+mejor+" peor="+peor);
    }
}`,
    `import java.util.ArrayList;
import java.util.List;

public class FacturaSupermercado {
    static class Producto { String nombre; double precio; int cantidad;
        Producto(String n,double p,int c){nombre=n;precio=p;cantidad=c;}
        double subtotal(){return precio*cantidad;}
    }
    public static void main(String[] args) {
        List<Producto> compra=new ArrayList<>();
        compra.add(new Producto("Pan",1.20,2)); compra.add(new Producto("Leche",1.05,3));
        double base=0;
        for(Producto p:compra){base+=p.subtotal();System.out.printf("%s x%d: %.2f €%n",p.nombre,p.cantidad,p.subtotal());}
        double iva=base*0.21;
        System.out.printf("Base: %.2f € | IVA 21%%: %.2f € | Total: %.2f €%n",base,iva,base+iva);
    }
}`,
    `import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.EnumMap;
import java.util.Map;
import java.util.Queue;

public class TareasPorDia {
    private final Map<DayOfWeek,Queue<String>> tareas=new EnumMap<>(DayOfWeek.class);
    void agregar(DayOfWeek dia,String tarea){tareas.computeIfAbsent(dia,d->new ArrayDeque<>()).add(tarea);}
    String procesar(DayOfWeek dia){Queue<String> q=tareas.get(dia);return q==null||q.isEmpty()?null:q.remove();}
    DayOfWeek proximoDiaConTarea(DayOfWeek hoy){
        for(int i=1;i<=7;i++){DayOfWeek d=DayOfWeek.of((hoy.getValue()-1+i)%7+1);if(tareas.containsKey(d)&&!tareas.get(d).isEmpty())return d;}
        return null;
    }
    public static void main(String[] args){
        TareasPorDia agenda=new TareasPorDia();agenda.agregar(DayOfWeek.FRIDAY,"Estudiar colecciones");
        System.out.println("Próximo: "+agenda.proximoDiaConTarea(LocalDate.now().getDayOfWeek()));
    }
}`,
    `public class ListaEnlazadaPropia<T extends Comparable<T>> implements Cloneable {
    private static class Nodo<E>{E valor;Nodo<E> sig;Nodo(E v){valor=v;}}
    private Nodo<T> cabeza;
    void add(T v){Nodo<T> n=new Nodo<>(v);if(cabeza==null)cabeza=n;else{Nodo<T> p=cabeza;while(p.sig!=null)p=p.sig;p.sig=n;}}
    void invertir(){Nodo<T> ant=null,act=cabeza;while(act!=null){Nodo<T>s=act.sig;act.sig=ant;ant=act;act=s;}cabeza=ant;}
    void eliminarDuplicados(){for(Nodo<T>a=cabeza;a!=null;a=a.sig){Nodo<T>p=a;while(p.sig!=null){if(a.valor.equals(p.sig.valor))p.sig=p.sig.sig;else p=p.sig;}}}
    void ordenar(){for(Nodo<T>a=cabeza;a!=null;a=a.sig)for(Nodo<T>b=a.sig;b!=null;b=b.sig)if(a.valor.compareTo(b.valor)>0){T t=a.valor;a.valor=b.valor;b.valor=t;}}
    T maximo(){if(cabeza==null)throw new IllegalStateException("Lista vacía.");T m=cabeza.valor;for(Nodo<T>p=cabeza.sig;p!=null;p=p.sig)if(p.valor.compareTo(m)>0)m=p.valor;return m;}
    java.util.List<T> ultimos(int n){if(n<0)throw new IllegalArgumentException();java.util.List<T>todos=new java.util.ArrayList<>();for(Nodo<T>p=cabeza;p!=null;p=p.sig)todos.add(p.valor);return new java.util.ArrayList<>(todos.subList(Math.max(0,todos.size()-n),todos.size()));}
    void concatenar(ListaEnlazadaPropia<T> otra){for(Nodo<T>p=otra.cabeza;p!=null;p=p.sig)add(p.valor);}
    @Override public ListaEnlazadaPropia<T> clone(){ListaEnlazadaPropia<T>c=new ListaEnlazadaPropia<>();for(Nodo<T>p=cabeza;p!=null;p=p.sig)c.add(p.valor);return c;}
    public String toString(){StringBuilder s=new StringBuilder();for(Nodo<T>p=cabeza;p!=null;p=p.sig)s.append(p.valor).append(" -> ");return s.append("null").toString();}
    public static void main(String[]args){ListaEnlazadaPropia<Integer>l=new ListaEnlazadaPropia<>();l.add(3);l.add(1);l.add(3);l.eliminarDuplicados();l.ordenar();System.out.println(l+" max="+l.maximo()+" últimos="+l.ultimos(2));}
}`,
    `import java.util.ArrayList;
import java.util.List;

public class ArrayStack<T> {
    private final List<T> datos=new ArrayList<>();
    void push(T v){datos.add(v);}
    T pop(){if(datos.isEmpty())throw new IllegalStateException("Pila vacía.");return datos.remove(datos.size()-1);}
    boolean contains(T v){return datos.contains(v);}
    boolean remove(T v){return datos.remove(v);}
    void reverse(){java.util.Collections.reverse(datos);}
    void merge(ArrayStack<T> otra){datos.addAll(otra.datos);}
    public static void hanoi(int n,char origen,char auxiliar,char destino){
        if(n<0)throw new IllegalArgumentException("Número negativo.");
        if(n==0)return;
        hanoi(n-1,origen,destino,auxiliar);
        System.out.println(origen+" -> "+destino);
        hanoi(n-1,auxiliar,origen,destino);
    }
    public static void main(String[]args){ArrayStack<Integer>p=new ArrayStack<>();p.push(1);p.push(2);p.reverse();System.out.println(p.datos);hanoi(3,'A','B','C');}
}`,
    `import java.util.ArrayDeque;
import java.util.Objects;

public class LinkedListQueue<T> {
    private static class Nodo<E>{E valor;Nodo<E>sig;Nodo(E v){valor=v;}}
    private Nodo<T> primero,ultimo;private int size;
    void offer(T v){Nodo<T>n=new Nodo<>(v);if(ultimo==null)primero=n;else ultimo.sig=n;ultimo=n;size++;}
    T poll(){if(primero==null)return null;T v=primero.valor;primero=primero.sig;if(primero==null)ultimo=null;size--;return v;}
    void clear(){primero=ultimo=null;size=0;}
    int size(){return size;}
    void merge(LinkedListQueue<T>otra){while(otra.primero!=null)offer(otra.poll());}
    void interleave(LinkedListQueue<T>otra){LinkedListQueue<T>salida=new LinkedListQueue<>();while(primero!=null||otra.primero!=null){if(primero!=null)salida.offer(poll());if(otra.primero!=null)salida.offer(otra.poll());}merge(salida);}
    @Override public boolean equals(Object o){if(!(o instanceof LinkedListQueue<?>))return false;LinkedListQueue<?>q=(LinkedListQueue<?>)o;if(size!=q.size)return false;Nodo<T>a=primero;Nodo<?>b=q.primero;while(a!=null){if(!Objects.equals(a.valor,b.valor))return false;a=a.sig;b=b.sig;}return true;}
    static class CentralTelefonica{
        private final java.util.Queue<String>urgentes=new ArrayDeque<>(),normales=new ArrayDeque<>(),bajas=new ArrayDeque<>();
        void recibir(String llamada,int prioridad){(prioridad>=3?urgentes:prioridad==2?normales:bajas).add(llamada);}
        String atender(){if(!urgentes.isEmpty())return urgentes.remove();if(!normales.isEmpty())return normales.remove();return bajas.poll();}
    }
    public static void main(String[]args){LinkedListQueue<Integer>a=new LinkedListQueue<>(),b=new LinkedListQueue<>();a.offer(1);a.offer(3);b.offer(2);a.interleave(b);System.out.println(a.poll());}
}`
  ],
  explicacionesSoluciones: [
    "Al encontrar un delimitador de apertura se apila; ante uno de cierre se desapila y se comprueba que sea del tipo correspondiente. La expresión solo está balanceada si nunca hay cierres incompatibles y la pila termina vacía.",
    "Cada operando se apila. Al encontrar un operador se extraen primero el operando derecho y luego el izquierdo, se calcula el resultado y se vuelve a apilar; al final debe quedar un único valor.",
    "Shunting-Yard envía operandos a la salida y usa una pila para operadores. La precedencia determina cuándo sacar operadores anteriores; los paréntesis fuerzan el orden hasta encontrar su apertura.",
    "Cada edición guarda una instantánea del texto en la pila de deshacer y limpia la pila de rehacer. Deshacer y rehacer mueven estados entre pilas, manteniendo el texto actual como estado activo.",
    "La cola representa el orden de llegada. Cada proceso ejecuta como máximo un quantum; si le queda tiempo, se actualiza su trabajo restante y vuelve al final para dar turno a los demás.",
    "La cola de prioridad compara primero el nivel de prioridad descendente y usa una secuencia incremental para desempatar. Así procesos con la misma prioridad salen en orden estable de llegada.",
    "Un mapa evita NIA duplicados y conserva acceso por identificador. Un Comparator encadena comparaciones por NIA, apellidos y media, definiendo un orden determinista para el listado.",
    "Un conjunto de inserción ordenada conserva la primera aparición y rechaza duplicados posteriores. La diferencia entre el tamaño original y el final informa cuántos elementos se eliminaron.",
    "Se separan las palabras, se normalizan a minúsculas y se quita la puntuación. Un conjunto ordenado por inserción conserva una sola copia en el orden de su primera aparición.",
    "Las operaciones de conjuntos se implementan con addAll, retainAll y removeAll sobre copias para no modificar accidentalmente los originales. Las pruebas de igualdad y subconjunto comparan pertenencia, no orden.",
    "Un mapa indexa eventos por una clave de fecha y lugar para impedir duplicados. Las operaciones de rango filtran por fechas, el ordenamiento establece una secuencia y el próximo evento es el primero futuro.",
    "Un Map asocia cada palabra con su frecuencia. Las vistas se ordenan con Comparator por frecuencia descendente y luego por palabra; limitar el resultado permite obtener las N más frecuentes.",
    "Para cada palabra se crea un mapa de caracteres a conteos. La normalización elimina diferencias de mayúsculas y los caracteres no alfabéticos se omiten antes de incrementar la frecuencia.",
    "El inventario busca productos por nombre y actualiza stock al vender o reponer. Las consultas filtran el stock bajo, el listado se ordena por nombre y se eliminan solo los productos agotados.",
    "Un mapa agrupa las notas por estudiante y asignatura. Las medias se calculan con suma y cantidad; después se comparan las medias para identificar los extremos sin mezclar asignaturas.",
    "Cada producto aporta su precio a un subtotal y el IVA se calcula sobre la base imponible. La factura suma subtotales y aplica el porcentaje una sola vez al total según la regla del ejercicio.",
    "Un mapa por día agrupa tareas y sus listas conservan el orden de llegada. Para la próxima fecha con tareas se avanza desde el día actual hasta encontrar una entrada no vacía, contemplando el cambio de semana.",
    "La lista propia mantiene referencias entre nodos y actualiza head/tail y size tras cada cambio. Las operaciones recorren o enlazan nodos, y clonar crea nodos nuevos para no compartir estructura mutable.",
    "La pila guarda elementos en un array y controla una cima para las operaciones básicas. Hanoi se resuelve recursivamente moviendo n-1 discos, luego el mayor y finalmente el grupo temporal.",
    "La cola enlazada actualiza cabeza y cola al insertar o retirar, y sus métodos de combinación recorren enlaces sin perder el orden. La prioridad de llamadas se representa con colas separadas o un comparador que ordena urgente, normal y baja."
  ],

  explicacion: [
    { titulo: "1. Elegir la estructura adecuada", parrafos: [
      "Una colección no es solo una forma de guardar datos: su contrato determina cómo se consultan, en qué orden aparecen y qué coste tiene cada operación. List conserva posiciones, Set expresa unicidad, Map relaciona claves con valores y Queue modela procesamiento pendiente.",
      "ArrayList es una buena opción por defecto para listas recorridas y consultadas por índice. LinkedList solo suele ser preferible cuando el algoritmo aprovecha operaciones de extremo; no es automáticamente más rápida para insertar en medio si primero hay que localizar la posición.",
      "Pila significa LIFO: sale el último que entró. Cola significa FIFO: sale el primero. ArrayDeque suele ser preferible a la clase Stack heredada para una pila ordinaria."
    ], codigo: `Deque<String> pila = new ArrayDeque<>();
pila.push("primero");
pila.push("después");
System.out.println(pila.pop()); // después` },
    { titulo: "2. Igualdad, orden y duplicados", parrafos: [
      "HashSet y las claves de HashMap se basan en equals y hashCode. Si dos objetos son iguales según equals, deben producir el mismo hashCode; no deben depender de campos mutables usados para su igualdad mientras están dentro del conjunto.",
      "TreeSet y TreeMap usan el orden natural o un Comparator. Para TreeSet, compare(a,b) == 0 significa que ambos elementos se consideran la misma entrada, aunque equals diga otra cosa.",
      "LinkedHashSet conserva el orden de inserción; HashSet no promete un orden. No escribas pruebas que dependan del orden de una colección que no lo garantiza."
    ], codigo: `Set<String> unicos = new LinkedHashSet<>();
unicos.add("Java");
unicos.add("Java"); // no añade un duplicado` },
    { titulo: "3. Mapas, recorridos y ordenación", parrafos: [
      "Map no implementa Collection: representa asociaciones clave-valor. getOrDefault simplifica contadores, computeIfAbsent permite inicializar valores agrupados y entrySet recorre claves y valores juntos.",
      "Un Iterator permite eliminar el elemento actual mediante iterator.remove sin modificar estructuralmente la colección desde fuera durante el recorrido.",
      "Comparator permite construir un orden explícito y encadenar criterios con thenComparing. Evita restar números para comparar, porque puede desbordarse; usa Integer.compare o comparingInt."
    ], codigo: `Map<String,Integer> cuenta = new HashMap<>();
cuenta.put(palabra, cuenta.getOrDefault(palabra, 0) + 1);
lista.sort(Comparator.comparing(Alumno::getApellidos));` },
    { titulo: "4. Costes, colas de prioridad y estructuras propias", parrafos: [
      "Las tablas hash suelen ofrecer operaciones constantes en promedio, no garantizadas para cualquier caso. Los árboles equilibrados ofrecen búsquedas logarítmicas. Una lista enlazada requiere recorrer nodos para acceder a una posición.",
      "PriorityQueue entrega el elemento de mayor prioridad según su Comparator al consultar la cabeza; iterar directamente la cola no equivale a recorrerla ordenada. Extrae repetidamente para observar el orden de prioridad.",
      "Al implementar nodos, mantén invariantes claras: cola vacía implica primero y último nulos; después de retirar el último nodo, ambos deben volver a nulo."
    ], codigo: `while (!prioridades.isEmpty()) {
    System.out.println(prioridades.remove());
}` },
    { titulo: "5. Prueba los casos límite", parrafos: [
      "Comprueba estructura vacía, un solo elemento, duplicados, empates, elementos nulos si están permitidos, valores no comparables y eliminación de la cabeza y la cola.",
      "Para una cola de tareas, verifica que una tarea reinsertada se coloca al final. Para una pila, comprueba que deshacer y rehacer conservan el orden correcto.",
      "No ocultes errores de entrada o de estado con resultados inventados. Define cuándo una operación devuelve null, cuándo devuelve Optional y cuándo lanza una excepción."
    ] }
  ],
  quiz: [
    { pregunta: "¿Qué colección expresa elementos únicos y normalmente no define orden?", opciones: ["ArrayList", "HashSet", "ArrayDeque", "HashMap"], correcta: 1, explicacion: "HashSet evita duplicados según equals/hashCode y no garantiza orden de iteración." },
    { pregunta: "¿Qué caracteriza a una pila LIFO?", opciones: ["Sale primero el primero que entró", "Sale primero el último que entró", "Ordena por prioridad", "Asocia claves y valores"], correcta: 1, explicacion: "LIFO significa Last In, First Out." },
    { pregunta: "¿Qué contrato usa HashMap para reconocer claves equivalentes?", opciones: ["Solo compareTo", "equals y hashCode", "toString", "El orden de inserción"], correcta: 1, explicacion: "Las claves se ubican con hashCode y se comparan con equals." },
    { pregunta: "¿Iterar una PriorityQueue garantiza el orden de prioridad?", opciones: ["Sí, siempre", "No; extrae con remove/poll para obtener el siguiente prioritario", "Solo si usa Integer", "Solo si está vacía"], correcta: 1, explicacion: "La cabeza es prioritaria, pero el iterador no recorre toda la cola ordenadamente." },
    { pregunta: "¿Cuál es la complejidad media habitual de una búsqueda en HashMap?", opciones: ["O(1)", "O(n log n)", "O(n²)", "O(2ⁿ)"], correcta: 0, explicacion: "Es O(1) en promedio, aunque existen casos con colisiones y no es una garantía universal." },
    { pregunta: "¿Qué hace Iterator.remove()?", opciones: ["Elimina de forma segura el elemento actual del recorrido", "Vacía toda la colección", "Ordena la colección", "Solo funciona con arrays"], correcta: 0, explicacion: "Permite retirar el elemento actual evitando modificaciones estructurales externas durante la iteración." },
    { pregunta: "¿Qué estructura conserva el orden de inserción y evita duplicados?", opciones: ["HashSet", "LinkedHashSet", "TreeMap", "PriorityQueue"], correcta: 1, explicacion: "LinkedHashSet mantiene el orden de inserción además de la unicidad." },
    { pregunta: "En un Comparator, ¿por qué se prefiere Integer.compare(a, b) a a - b?", opciones: ["Es más corto", "Evita errores por desbordamiento", "Convierte a texto", "Ordena de forma aleatoria"], correcta: 1, explicacion: "La resta puede desbordarse; el método de comparación evita ese problema." }
  ]
};
const ejerciciosColecciones = window.CONTENIDO["colecciones"].ejercicios;
const solucionesColecciones = window.CONTENIDO["colecciones"].soluciones;
const explicacionesSolucionesColecciones = window.CONTENIDO["colecciones"].explicacionesSoluciones;
if (ejerciciosColecciones.length !== solucionesColecciones.length || ejerciciosColecciones.length !== explicacionesSolucionesColecciones.length) {
  throw new Error("Cada ejercicio de colecciones debe tener una solución y su explicación.");
}
ejerciciosColecciones.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesColecciones[indice];
  ejercicio.explicacion = explicacionesSolucionesColecciones[indice];
});
delete window.CONTENIDO["colecciones"].soluciones;
delete window.CONTENIDO["colecciones"].explicacionesSoluciones;
