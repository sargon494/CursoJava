// Unidad 13: lambdas, Streams, Optional y composición funcional.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["funcional"] = {
  ejercicios: [
    { enunciado: "Con una colección de flores Iris, cuenta muestras por especie, indica la especie con más muestras y comprueba si todas tienen igual cantidad." },
    { enunciado: "Calcula medias generales de sépalo y pétalo y encuentra el pétalo más largo y el sépalo más estrecho." },
    { enunciado: "Agrupa flores por especie, calcula la media del pétalo y encuentra la flor de pétalo más grande en cada grupo." },
    { enunciado: "Filtra flores con sépalos más anchos que largos, pétalos mayores que sépalos y pétalos de más de 5 cm." },
    { enunciado: "Bonus: representa distribución y relaciones de medidas con XChart; añade su dependencia externa en Eclipse." },
    { enunciado: "Lee personas.csv con Files.lines, conserva mayores de edad y muestra sus nombres en mayúsculas sin cargar todo el fichero." }
  ],
  soluciones: [
    `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class IrisDistribucion {
    static class Flor {
        final String especie; final double sepalo, petalo;
        Flor(String e,double s,double p){especie=e;sepalo=s;petalo=p;}
    }
    public static void main(String[] args) {
        List<Flor> flores=Arrays.asList(new Flor("setosa",5.1,1.4),new Flor("setosa",4.9,1.4),
                new Flor("versicolor",6.4,4.5),new Flor("virginica",6.7,5.6));
        Map<String,Long> cantidades=flores.stream().collect(Collectors.groupingBy(f->f.especie,Collectors.counting()));
        System.out.println(cantidades);
        System.out.println("Más muestras: "+cantidades.entrySet().stream().max(Map.Entry.comparingByValue()).orElseThrow());
        System.out.println("Igual cantidad: "+(cantidades.values().stream().distinct().count()==1));
    }
}`,
    `import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class IrisEstadisticas {
    static class Flor { final double sepalo,petalo; Flor(double s,double p){sepalo=s;petalo=p;} }
    public static void main(String[] args) {
        List<Flor> flores=Arrays.asList(new Flor(5.1,1.4),new Flor(6.4,4.5),new Flor(6.7,5.6));
        double mediaSepalo=flores.stream().mapToDouble(f->f.sepalo).average().orElse(0);
        double mediaPetalo=flores.stream().mapToDouble(f->f.petalo).average().orElse(0);
        Optional<Flor> mayor=flores.stream().max((a,b)->Double.compare(a.petalo,b.petalo));
        Optional<Flor> menorSepalo=flores.stream().min((a,b)->Double.compare(a.sepalo,b.sepalo));
        System.out.println("Media sépalo="+mediaSepalo+" media pétalo="+mediaPetalo);
        mayor.ifPresent(f->System.out.println("Pétalo mayor="+f.petalo));
        menorSepalo.ifPresent(f->System.out.println("Sépalo menor="+f.sepalo));
    }
}`,
    `import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class IrisPorEspecie {
    static class Flor { final String especie;final double petalo;Flor(String e,double p){especie=e;petalo=p;} }
    public static void main(String[] args) {
        List<Flor> flores=Arrays.asList(new Flor("setosa",1.4),new Flor("setosa",1.5),
                new Flor("versicolor",4.5),new Flor("versicolor",4.7),new Flor("virginica",5.6));
        Map<String,Double> medias=flores.stream().collect(Collectors.groupingBy(f->f.especie,
                Collectors.averagingDouble(f->f.petalo)));
        Map<String,Flor> mayores=flores.stream().collect(Collectors.groupingBy(f->f.especie,
                Collectors.collectingAndThen(Collectors.maxBy((a,b)->Double.compare(a.petalo,b.petalo)),o->o.get())));
        System.out.println("Media por especie: "+medias);
        mayores.forEach((e,f)->System.out.println(e+" flor con mayor pétalo="+f.petalo));
        System.out.println("Pétalo más ancho="+flores.stream().mapToDouble(f->f.petalo).max().orElseThrow());
    }
}`,
    `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class IrisExploracion {
    static class Flor {
        final String especie;final double sepaloLargo,sepaloAncho,petaloLargo,petaloAncho;
        Flor(String e,double sl,double sa,double pl,double pa){especie=e;sepaloLargo=sl;sepaloAncho=sa;petaloLargo=pl;petaloAncho=pa;}
        public String toString(){return especie+" ("+petaloLargo+", "+petaloAncho+")";}
    }
    public static void main(String[] args) {
        List<Flor> flores=Arrays.asList(new Flor("setosa",5.1,3.5,1.4,.2),
                new Flor("versicolor",6.4,3.2,4.5,1.5),new Flor("virginica",7.2,3.6,6.1,2.5));
        System.out.println("Sépalo ancho>largo: "+flores.stream().filter(f->f.sepaloAncho>f.sepaloLargo).collect(Collectors.toList()));
        System.out.println("Pétalo > sépalo: "+flores.stream().filter(f->f.petaloLargo>f.sepaloLargo).collect(Collectors.toList()));
        System.out.println("Pétalo > 5 cm: "+flores.stream().filter(f->f.petaloLargo>5).collect(Collectors.toList()));
    }
}`,
    `// Requiere añadir la dependencia org.knowm.xchart:xchart al Build Path de Eclipse.
import java.util.Arrays;
import java.util.List;
import org.knowm.xchart.CategoryChart;
import org.knowm.xchart.CategoryChartBuilder;
import org.knowm.xchart.SwingWrapper;
import org.knowm.xchart.XYChart;
import org.knowm.xchart.XYChartBuilder;

public class IrisGraficosXChart {
    public static void main(String[] args) {
        List<Double> sepaloLargo=Arrays.asList(5.1,4.9,6.4,6.7);
        List<Double> petaloLargo=Arrays.asList(1.4,1.4,4.5,5.6);
        CategoryChart barras=new CategoryChartBuilder().width(800).height(500).title("Muestras Iris")
                .xAxisTitle("Especie").yAxisTitle("Cantidad").build();
        barras.addSeries("Muestras",Arrays.asList("setosa","versicolor","virginica"),Arrays.asList(2,1,1));
        new SwingWrapper<CategoryChart>(barras).displayChart();
        XYChart dispersion=new XYChartBuilder().width(800).height(500).title("Sépalo y pétalo")
                .xAxisTitle("Largo sépalo").yAxisTitle("Largo pétalo").build();
        dispersion.addSeries("Flores",sepaloLargo,petaloLargo);
        new SwingWrapper<XYChart>(dispersion).displayChart();
    }
}`,
    `import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class PersonasCSV {
    static class Persona { final String nombre;final int edad;Persona(String n,int e){nombre=n;edad=e;} }
    public static void main(String[] args) throws Exception {
        String ruta=args.length==0?"personas.csv":args[0];
        try(Stream<String> lineas=Files.lines(Paths.get(ruta))) {
            lineas.skip(1).map(l->l.split(",",-1)).filter(c->c.length>=2)
                    .map(c->new Persona(c[0].trim(),Integer.parseInt(c[1].trim())))
                    .filter(p->p.edad>=18).map(p->p.nombre.toUpperCase())
                    .forEach(System.out::println);
        }
    }
}`
  ],
  explicacionesSoluciones: [
    "groupingBy cuenta las muestras por especie. Las frecuencias permiten escoger la especie con mayor cantidad y comprobar que el mínimo y el máximo coinciden para todas.",
    "Se proyectan las medidas numéricas para calcular las dos medias y se usan comparadores para localizar el pétalo más largo y el sépalo más estrecho, evitando ordenar toda la colección.",
    "Se agrupa primero por especie y después se calcula la media del pétalo y el máximo de cada grupo. La agrupación mantiene juntos los datos que deben compararse entre sí.",
    "El filtro expresa cada condición de forma independiente y las combina: ancho del sépalo mayor que largo, pétalo mayor que sépalo y pétalo superior a cinco. Solo pasan las flores que cumplen todas.",
    "Las series se construyen desde las medidas de las flores y se entregan a XChart para dibujar distribuciones y relaciones. La biblioteca solo interviene en la visualización; las estadísticas provienen de los datos.",
    "Files.lines procesa el fichero como un stream que se cierra con try-with-resources. Cada línea se convierte en persona, se filtran mayores de edad y se transforma el nombre a mayúsculas sin cargar todo el fichero en memoria."
  ],

  explicacion: [
    { titulo: "1. Lambdas e interfaces funcionales", parrafos: [
      "Una lambda es una implementación breve de una interfaz funcional: una interfaz con un único método abstracto. El tipo se deduce del contexto, por eso una expresión lambda no existe de forma aislada sin un tipo funcional esperado.",
      "Predicate<T> prueba una condición, Function<T,R> transforma, Consumer<T> consume sin devolver y Supplier<T> produce un valor. Las lambdas pueden cerrar sobre variables locales solo si estas son final o efectivamente finales.",
      "Las method references como String::toUpperCase y System.out::println son una forma compacta de referirse a métodos compatibles; úsalas cuando mejoren la legibilidad."
    ], codigo: `Predicate<String> noVacio = s -> !s.isEmpty();
Function<String,Integer> longitud = String::length;
Consumer<String> mostrar = System.out::println;` },
    { titulo: "2. Streams: transformar sin alterar la fuente", parrafos: [
      "Un Stream describe una secuencia de operaciones, no una colección que almacena resultados. filter conserva elementos, map transforma, distinct elimina repetidos, sorted ordena y limit restringe.",
      "Las operaciones intermedias son perezosas: no se ejecutan hasta una operación terminal como count, collect, reduce o forEach. Un stream se consume una sola vez; crea otro desde la fuente para un segundo recorrido.",
      "Las operaciones deben evitar efectos secundarios compartidos. No modifiques una lista externa desde forEach cuando un collector expresa el resultado de forma más clara."
    ], codigo: `List<String> resultado = nombres.stream()
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .collect(Collectors.toList());` },
    { titulo: "3. Reducir y agrupar datos", parrafos: [
      "Collectors agrupa valores o calcula resúmenes: groupingBy crea grupos, counting cuenta, averagingDouble promedia, joining une cadenas y toMap construye un mapa.",
      "Para datos numéricos, mapToInt/mapToDouble ofrecen operaciones especializadas como sum, average, min y max sin envolver cada valor en un objeto de resultado.",
      "reduce combina los elementos para producir un único resultado. La operación debe ser asociativa y el valor identidad correcto si se usa la variante con identidad; para colecciones, suele ser más claro collect."
    ], codigo: `Map<String, Long> porEspecie = flores.stream()
    .collect(Collectors.groupingBy(Flor::getEspecie, Collectors.counting()));` },
    { titulo: "4. Optional y ausencia de resultado", parrafos: [
      "findFirst, min y max devuelven Optional porque puede no haber elementos. orElse entrega un valor alternativo, orElseGet calcula uno solo si hace falta y orElseThrow comunica que la ausencia es excepcional.",
      "No llames a get sin comprobar presencia. Tampoco uses Optional como sustituto universal de cualquier campo; es especialmente útil en resultados que pueden no existir.",
      "Una comprobación de filtro antes de get puede estar bien en un flujo pequeño, pero map, orElse y ifPresent expresan el caso opcional con menos riesgo de olvido."
    ], codigo: `Optional<String> primero = nombres.stream().findFirst();
primero.ifPresent(System.out::println);` },
    { titulo: "5. Streams y recursos", parrafos: [
      "Files.lines abre un recurso y devuelve un Stream que debe cerrarse. try-with-resources garantiza el cierre incluso si una operación lanza una excepción.",
      "Leer líneas con un stream permite procesar ficheros grandes de manera incremental. Aun así, define cómo tratar filas inválidas: ignorarlas sin aviso puede ocultar datos corruptos; se puede informar del número de línea o detener el proceso.",
      "La librería XChart del ejercicio bonus no forma parte del JDK. Añade su dependencia externa al proyecto Eclipse y separa el análisis de datos de la presentación gráfica."
    ], codigo: `try (Stream<String> lineas = Files.lines(ruta)) {
    lineas.filter(s -> !s.isEmpty()).forEach(System.out::println);
}` }
  ],
  quiz: [
    { pregunta: "¿Qué necesita una lambda para tener un tipo?", opciones: ["Una interfaz funcional de contexto", "Una clase abstracta obligatoriamente", "Un hilo nuevo", "Un array"], correcta: 0, explicacion: "El compilador deduce el tipo funcional desde el contexto donde se asigna o usa la lambda." },
    { pregunta: "¿Cuándo se ejecuta normalmente un Stream?", opciones: ["Al construirlo", "Al llegar a una operación terminal", "Al importar java.util", "Al crear la colección fuente"], correcta: 1, explicacion: "Las operaciones intermedias son perezosas y se activan al ejecutar una terminal." },
    { pregunta: "¿Qué hace map?", opciones: ["Filtra por condición", "Transforma cada elemento", "Ordena siempre", "Cierra el flujo"], correcta: 1, explicacion: "map aplica una función a cada elemento y produce otro Stream." },
    { pregunta: "¿Qué método representa una condición sobre T?", opciones: ["Supplier<T>", "Predicate<T>", "Consumer<T>", "Runnable<T>"], correcta: 1, explicacion: "Predicate<T> expone test(T) y devuelve boolean." },
    { pregunta: "¿Qué expresa Optional.empty()?", opciones: ["Un error de compilación", "Ausencia de valor", "Una lista vacía siempre", "Un valor null obligatorio"], correcta: 1, explicacion: "Optional representa explícitamente que el resultado puede estar ausente." },
    { pregunta: "¿Cómo se debe cerrar el Stream de Files.lines?", opciones: ["No se cierra nunca", "Con try-with-resources", "Con System.gc()", "Con remove()"], correcta: 1, explicacion: "Files.lines mantiene un recurso asociado al archivo y debe cerrarse." },
    { pregunta: "¿Qué operación resulta apropiada para agrupar por especie?", opciones: ["Collectors.groupingBy", "Optional.get", "Predicate.orElse", "Stream.close solamente"], correcta: 0, explicacion: "groupingBy produce un mapa agrupado por la clave seleccionada." },
    { pregunta: "¿Qué significa que una variable capturada sea effectively final?", opciones: ["Se reasigna en cada iteración", "No cambia después de inicializarse", "Es siempre static", "Es pública"], correcta: 1, explicacion: "Una lambda solo captura variables locales que no se vuelven a asignar." }
  ]
};
const ejerciciosFuncional = window.CONTENIDO["funcional"].ejercicios;
const solucionesFuncional = window.CONTENIDO["funcional"].soluciones;
const explicacionesSolucionesFuncional = window.CONTENIDO["funcional"].explicacionesSoluciones;
if (ejerciciosFuncional.length !== solucionesFuncional.length || ejerciciosFuncional.length !== explicacionesSolucionesFuncional.length) {
  throw new Error("Cada ejercicio funcional debe tener una solución y su explicación.");
}
ejerciciosFuncional.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesFuncional[indice];
  ejercicio.explicacion = explicacionesSolucionesFuncional[indice];
});
delete window.CONTENIDO["funcional"].soluciones;
delete window.CONTENIDO["funcional"].explicacionesSoluciones;
