// Unidad 14: ficheros de texto, binarios y persistencia de objetos.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ficheros"] = {
  ejercicios: [
    { enunciado: "Recibe varias rutas y muestra para cada una si existe, usando Path y Files." },
    { enunciado: "Elimina ficheros de cero bytes y directorios que queden vacíos dentro de una ruta, sin borrar carpetas con contenido." },
    { enunciado: "Recorre un directorio recursivamente e imprime [F] o [D] delante de cada ruta." },
    { enunciado: "Busca recursivamente ficheros con una extensión y devuelve sus rutas absolutas." },
    { enunciado: "Calcula la profundidad máxima de subdirectorios respecto a una carpeta raíz." },
    { enunciado: "Cuenta las apariciones de una palabra en un fichero, sin distinguir mayúsculas y evitando tratarla como regex." },
    { enunciado: "Crea una copia del fichero eliminando las apariciones de una palabra completa sin distinguir mayúsculas." },
    { enunciado: "Implementa cifrado y descifrado César en ficheros, conservando mayúsculas y minúsculas." },
    { enunciado: "Carga libros.csv sin ISBN duplicados, ordena y busca libros, modifica un título y persiste el catálogo en binario." },
    { enunciado: "Persiste movimientos bancarios serializables, actualiza el saldo acumulado y lista ingresos y gastos." },
    { enunciado: "Carga eventos de texto, registra participantes únicos por evento, serializa los datos y genera un informe." },
    { enunciado: "Persiste una cola de llamadas; las urgentes se atienden antes que las normales y las de prioridad baja." },
    { enunciado: "Lee notas de texto, calcula medias y estados, informa de filas inválidas y genera un informe." }
  ],
  soluciones: [
    `import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

public class ComprobarRutas {
    public static void main(String[] args) {
        for(String ruta:args){Path p=Paths.get(ruta);System.out.println(p+" existe="+Files.exists(p));}
    }
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.stream.Stream;

public class BorrarVacios {
    public static void main(String[] args) throws IOException {
        Path raiz=Paths.get(args.length==0?".":args[0]);
        try(Stream<Path> rutas=Files.walk(raiz)) {
            for(Path p:(Iterable<Path>)rutas.sorted(Comparator.reverseOrder())::iterator) {
                if(Files.isRegularFile(p)&&Files.size(p)==0) Files.delete(p);
                else if(!p.equals(raiz)&&Files.isDirectory(p)) {
                    try(Stream<Path> hijos=Files.list(p)){if(!hijos.findAny().isPresent())Files.delete(p);}
                }
            }
        }
    }
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class ListarRecursivamente {
    public static void main(String[] args) throws IOException {
        Path raiz=Paths.get(args.length==0?".":args[0]);
        try(Stream<Path> rutas=Files.walk(raiz)) {
            rutas.forEach(p->System.out.println((Files.isDirectory(p)?"[D] ":"[F] ")+p));
        }
    }
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class BuscarExtension {
    static java.util.List<String> buscar(Path raiz,String extension)throws IOException {
        String sufijo=extension.startsWith(".")?extension.toLowerCase(Locale.ROOT):"."+extension.toLowerCase(Locale.ROOT);
        try(Stream<Path> rutas=Files.walk(raiz)){
            return rutas.filter(Files::isRegularFile).filter(p->p.getFileName().toString().toLowerCase(Locale.ROOT).endsWith(sufijo))
                    .map(p->p.toAbsolutePath().toString()).collect(Collectors.toList());
        }
    }
    public static void main(String[]args)throws IOException{System.out.println(buscar(Paths.get(args[0]),args[1]));}
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class ProfundidadDirectorios {
    static int maxima(Path raiz)throws IOException {
        try(Stream<Path> rutas=Files.walk(raiz)){
            return rutas.filter(Files::isDirectory).mapToInt(p->p.equals(raiz)?0:raiz.relativize(p).getNameCount()).max().orElse(0);
        }
    }
    public static void main(String[]args)throws IOException{System.out.println(maxima(Paths.get(args.length==0?".":args[0])));}
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ContarPalabraFichero {
    static long contar(String ruta,String palabra)throws IOException {
        Pattern patron=Pattern.compile(Pattern.quote(palabra),Pattern.CASE_INSENSITIVE|Pattern.UNICODE_CASE);
        long total=0;
        for(String linea:Files.readAllLines(Paths.get(ruta))){
            Matcher m=patron.matcher(linea);while(m.find())total++;
        }
        return total;
    }
    public static void main(String[]args)throws IOException{System.out.println(contar(args[0],args[1]));}
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class EliminarPalabraFichero {
    static void copiarSinPalabra(String entrada,String salida,String palabra)throws IOException {
        Pattern patron=Pattern.compile("(?iu)\\\\b"+Pattern.quote(palabra)+"\\\\b");
        String texto=Files.readAllLines(Paths.get(entrada)).stream().map(l->patron.matcher(l).replaceAll(""))
                .collect(Collectors.joining(System.lineSeparator()));
        Files.write(Paths.get(salida),texto.getBytes(java.nio.charset.StandardCharsets.UTF_8),
                StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING);
    }
    public static void main(String[]args)throws IOException{copiarSinPalabra(args[0],args[1],args[2]);}
}`,
    `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class CifradoCesar {
    static String transformar(String texto,int desplazamiento) {
        int n=Math.floorMod(desplazamiento,26);StringBuilder r=new StringBuilder();
        for(char c:texto.toCharArray()){
            if(c>='a'&&c<='z')r.append((char)('a'+(c-'a'+n)%26));
            else if(c>='A'&&c<='Z')r.append((char)('A'+(c-'A'+n)%26));
            else r.append(c);
        }
        return r.toString();
    }
    static void transformarFichero(String entrada,String salida,int clave)throws IOException {
        Files.write(Paths.get(salida),transformar(new String(Files.readAllBytes(Paths.get(entrada)),StandardCharsets.UTF_8),clave).getBytes(StandardCharsets.UTF_8));
    }
    public static void main(String[]args)throws IOException{transformarFichero(args[0],args[1],Integer.parseInt(args[2]));}
}`,
    `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class BibliotecaCSV {
    static class Libro implements Serializable {
        private static final long serialVersionUID=1L;
        final String isbn;String titulo;final int anio;
        Libro(String i,String t,int a){isbn=i;titulo=t;anio=a;}
        public String toString(){return isbn+" | "+titulo+" | "+anio;}
    }
    private final Map<String,Libro> libros=new HashMap<>();
    void cargarCSV(Path ruta)throws IOException {
        int linea=0;
        for(String s:Files.readAllLines(ruta)){
            linea++;if(linea==1&&s.toLowerCase(Locale.ROOT).contains("isbn"))continue;
            String[] c=s.split(",",3);if(c.length!=3)throw new IOException("CSV inválido, línea "+linea);
            Libro l=new Libro(c[0].trim(),c[1].trim(),Integer.parseInt(c[2].trim()));
            if(libros.putIfAbsent(l.isbn,l)!=null)throw new IOException("ISBN duplicado en línea "+linea+": "+l.isbn);
        }
    }
    void guardar(Path ruta)throws IOException {
        try(ObjectOutputStream out=new ObjectOutputStream(Files.newOutputStream(ruta))){out.writeObject(new ArrayList<>(libros.values()));}
    }
    List<Libro> ordenarPorTitulo(){List<Libro>r=new ArrayList<>(libros.values());r.sort(Comparator.comparing(l->l.titulo));return r;}
    Libro buscar(String isbn){return libros.get(isbn);}
    public static void main(String[]args)throws Exception {
        BibliotecaCSV b=new BibliotecaCSV();b.cargarCSV(Paths.get(args[0]));
        b.libros.values().stream().findFirst().ifPresent(l->l.titulo=l.titulo+" (revisado)");
        System.out.println(b.ordenarPorTitulo());b.guardar(Paths.get(args[1]));
    }
}`,
    `import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

public class RegistroMovimientos {
    static class Movimiento implements Serializable {
        private static final long serialVersionUID=1L;
        final LocalDateTime fecha;final String concepto;final double importe;final double saldo;
        Movimiento(String c,double i,double s){fecha=LocalDateTime.now();concepto=c;importe=i;saldo=s;}
    }
    private final List<Movimiento> movimientos=new ArrayList<>();private double saldo;
    void registrar(String concepto,double importe) {
        if(!Double.isFinite(importe)||importe==0)throw new IllegalArgumentException("Importe no válido.");
        saldo+=importe;movimientos.add(new Movimiento(concepto,importe,saldo));
    }
    void guardar(Path ruta)throws IOException{try(ObjectOutputStream o=new ObjectOutputStream(Files.newOutputStream(ruta))){o.writeObject(movimientos);}}
    public static void main(String[]args)throws Exception {
        RegistroMovimientos r=new RegistroMovimientos();r.registrar("Nómina",1500);r.registrar("Alquiler",-600);
        for(Movimiento m:r.movimientos)System.out.println((m.importe>0?"Ingreso":"Gasto")+" | "+m.fecha+" "+m.concepto+" "+m.importe+" saldo="+m.saldo);
        r.guardar(Paths.get(args.length==0?"movimientos.dat":args[0]));
    }
}`,
    `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class EventosParticipantes {
    static class Evento implements Serializable {
        private static final long serialVersionUID=1L;
        final String id,nombre;final Set<String> participantes=new TreeSet<>();
        Evento(String i,String n){id=i;nombre=n;}
    }
    public static void main(String[]args)throws Exception {
        Path entrada=Paths.get(args[0]),binario=Paths.get(args[1]),informe=Paths.get(args[2]);
        Map<String,Evento>eventos=new LinkedHashMap<>();
        int n=0;for(String linea:Files.readAllLines(entrada)){
            n++;String[]c=linea.split(";",3);if(c.length!=3)throw new IOException("Fila inválida "+n);
            eventos.computeIfAbsent(c[0],id->new Evento(id,c[1])).participantes.add(c[2]);
        }
        try(ObjectOutputStream out=new ObjectOutputStream(Files.newOutputStream(binario))){out.writeObject(new ArrayList<>(eventos.values()));}
        List<String>salida=new ArrayList<>();
        for(Evento e:eventos.values())salida.add(e.nombre+" ("+e.id+"): "+e.participantes.size()+" participantes "+e.participantes);
        Files.write(informe,salida);
    }
}`,
    `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class ColaLlamadasPersistente implements Serializable {
    private static final long serialVersionUID=1L;
    private final Deque<String>urgentes=new ArrayDeque<>(),normales=new ArrayDeque<>(),bajas=new ArrayDeque<>();
    void recibir(String llamada,int prioridad){if(prioridad>=3)urgentes.addLast(llamada);else if(prioridad==2)normales.addLast(llamada);else bajas.addLast(llamada);}
    String atender(){if(!urgentes.isEmpty())return urgentes.removeFirst();if(!normales.isEmpty())return normales.removeFirst();return bajas.pollFirst();}
    void guardar(Path ruta)throws IOException {try(ObjectOutputStream out=new ObjectOutputStream(Files.newOutputStream(ruta))){out.writeObject(this);}}
    static ColaLlamadasPersistente cargar(Path ruta)throws IOException,ClassNotFoundException {
        if(!Files.exists(ruta))return new ColaLlamadasPersistente();
        try(ObjectInputStream in=new ObjectInputStream(Files.newInputStream(ruta))){return (ColaLlamadasPersistente)in.readObject();}
    }
    public static void main(String[]args)throws Exception {
        Path ruta=Paths.get(args.length==0?"llamadas.dat":args[0]);ColaLlamadasPersistente c=cargar(ruta);
        c.recibir("Consulta general",1);c.recibir("Emergencia",3);c.guardar(ruta);
        System.out.println("Siguiente: "+c.atender());c.guardar(ruta);
    }
}`,
    `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class InformeNotas {
    static class Resultado {final String nombre,estado;final double media;Resultado(String n,double m){nombre=n;media=m;estado=m>=5?"Aprobado":"Suspenso";}}
    public static void main(String[]args)throws IOException {
        List<Resultado>resultados=new ArrayList<>();List<String>errores=new ArrayList<>();
        int numero=0;
        for(String linea:Files.readAllLines(Paths.get(args[0]))){
            numero++;String[]c=linea.split(";",-1);
            try{
                if(c.length<2)throw new IllegalArgumentException("faltan campos");
                double suma=0;int cantidad=0;
                for(int i=1;i<c.length;i++){suma+=Double.parseDouble(c[i].trim());cantidad++;}
                if(cantidad==0)throw new IllegalArgumentException("sin notas");
                resultados.add(new Resultado(c[0].trim(),suma/cantidad));
            }catch(IllegalArgumentException ex){
                errores.add("Línea "+numero+" inválida: "+ex.getMessage());
            }
        }
        if(resultados.isEmpty())throw new IOException("No hay registros válidos para informar.");
        double max=resultados.stream().mapToDouble(r->r.media).max().orElseThrow();
        double min=resultados.stream().mapToDouble(r->r.media).min().orElseThrow();
        List<String>informe=new ArrayList<>();
        for(Resultado r:resultados)informe.add(r.nombre+";media="+r.media+";"+r.estado);
        informe.add("Máxima="+max+";mínima="+min);informe.addAll(errores);
        Files.write(Paths.get(args[1]),informe);
        System.out.println("Registros válidos: "+resultados.size()+"; inválidos: "+errores.size());
    }
}`
  ],
  explicacionesSoluciones: [
    "Cada texto se convierte a Path y Files.exists consulta el sistema de archivos. Se procesa cada ruta por separado para informar de existencia sin asumir que todos los elementos sean ficheros.",
    "Se recorren primero los ficheros y se eliminan solo los de tamaño cero. Después se inspeccionan directorios y se borran únicamente si están vacíos; así no se elimina una carpeta que aún contiene datos.",
    "Files.walk visita cada ruta del árbol y devuelve un stream que debe cerrarse. Files.isDirectory distingue directorios de archivos y el prefijo pedido hace legible el listado.",
    "El recorrido recursivo inspecciona cada fichero, compara su extensión y guarda la ruta absoluta de las coincidencias. Las carpetas se recorren, pero no se incluyen como resultados.",
    "Para cada directorio se calcula la profundidad de sus subdirectorios y se conserva la máxima. La raíz tiene profundidad cero; sumar un nivel al descender permite comparar ramas de distinta longitud.",
    "La palabra buscada se trata como texto literal y se normalizan texto y consulta para ignorar mayúsculas. Se cuentan coincidencias no solapadas recorriendo el contenido sin usar la palabra como expresión regular.",
    "Se localizan las coincidencias de palabra completa con límites adecuados y se escribe un nuevo fichero sin ellas. La búsqueda ignora mayúsculas, pero la salida conserva el texto restante.",
    "Cada letra se desplaza dentro de su alfabeto conservando si es mayúscula o minúscula. El descifrado usa el desplazamiento inverso; los caracteres ajenos al alfabeto permanecen sin cambios.",
    "Las filas CSV se convierten en libros y un mapa indexado por ISBN evita duplicados. El catálogo se ordena y busca en memoria, y Object streams persisten los objetos sin perder sus tipos.",
    "Cada movimiento guarda su importe y el saldo resultante tras aplicarlo. La serialización conserva el historial y un recorrido permite separar ingresos de gastos para presentarlos.",
    "Un mapa asocia cada evento con sus participantes únicos. Se carga el texto, se evita repetir asistentes, se serializa la estructura y se genera el informe recorriendo los datos ya organizados.",
    "La cola de llamadas se serializa para conservar su estado entre ejecuciones. La prioridad distingue urgentes, normales y bajas; la extracción siempre atiende primero la clase más prioritaria.",
    "Cada fila se valida antes de convertir sus notas; una fila incorrecta se informa y no detiene la carga completa. Con las válidas se calculan medias y estados y se escribe un informe final."
  ],

  explicacion: [
    { titulo: "1. Rutas y operaciones de NIO.2", parrafos: [
      "Path representa una ruta y Files ofrece operaciones para consultar, recorrer, leer, escribir, copiar y borrar. Separar Path de las operaciones concretas facilita trabajar con rutas relativas, absolutas y distintos sistemas operativos.",
      "Files.walk devuelve un stream que mantiene recursos del directorio abierto; ciérralo con try-with-resources. Una visita recursiva debe tener una política clara ante errores de lectura: propagar el error o informarlo, no ignorarlo.",
      "Antes de borrar, comprueba el tipo y el criterio exacto. Para vaciar directorios, recorre primero las rutas más profundas; así no intentas eliminar un directorio que todavía contiene hijos."
    ], codigo: `try (Stream<Path> rutas = Files.walk(raiz)) {
    rutas.filter(Files::isRegularFile).forEach(System.out::println);
}` },
    { titulo: "2. Texto, codificación y expresiones regulares", parrafos: [
      "Declara una codificación como UTF-8 cuando conviertas bytes a texto. El constructor String(byte[]) sin charset depende de la configuración local y puede corromper acentos.",
      "En regex, los metacaracteres tienen significado. Si la palabra viene del usuario, usa Pattern.quote para tratarla como texto literal; para reemplazar palabras completas, define límites y el tratamiento de Unicode.",
      "readAllLines carga el archivo completo en memoria; Files.lines permite procesar líneas incrementalmente y se debe cerrar. Escoge según tamaño y necesidad."
    ], codigo: `Pattern literal = Pattern.compile(Pattern.quote(palabra),
    Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);` },
    { titulo: "3. Ficheros binarios y serialización", parrafos: [
      "DataInputStream y DataOutputStream son adecuados para un formato binario diseñado por el programa; el orden y los tipos leídos deben coincidir exactamente con los escritos.",
      "La serialización de objetos requiere clases Serializable y un serialVersionUID estable. Deserializar datos no confiables puede ejecutar código inesperado en ciertas clases: no aceptes objetos serializados de fuentes desconocidas.",
      "La serialización Java no sustituye un formato interoperable ni una base de datos. Para intercambiar datos entre sistemas, considera formatos explícitos y versionados."
    ], codigo: `try (ObjectOutputStream out = new ObjectOutputStream(Files.newOutputStream(ruta))) {
    out.writeObject(objeto);
}` },
    { titulo: "4. Fallos y atomicidad", parrafos: [
      "IOExceptions suelen requerir una decisión del llamador. Propagarla conserva el fallo; capturarla para seguir como si se hubiera guardado correctamente crea una falsa señal de éxito.",
      "Al guardar datos importantes, escribir primero a un archivo temporal y luego reemplazar el destino reduce el riesgo de dejar el archivo final parcialmente escrito.",
      "Valida y documenta formatos de entrada. Si una fila está mal formada, comunica su número y motivo; ignorarla silenciosamente hace que los informes parezcan completos cuando no lo son."
    ] }
  ],
  quiz: [
    { pregunta: "¿Qué API moderna representa una ruta?", opciones: ["FileSystemOnly", "Path", "Scanner", "Serializable"], correcta: 1, explicacion: "Path pertenece a NIO.2 y representa rutas de forma independiente de las operaciones." },
    { pregunta: "¿Por qué ordenar Files.walk en orden inverso antes de borrar directorios?", opciones: ["Para borrar primero los hijos", "Para acelerar la red", "Para cambiar permisos", "Para cerrar Streams"], correcta: 0, explicacion: "Un directorio solo puede borrarse cuando ya no contiene entradas." },
    { pregunta: "¿Por qué usar Pattern.quote con una palabra de entrada?", opciones: ["Para compilar más rápido", "Para tratarla como texto y no como sintaxis regex", "Para convertirla a mayúsculas", "Para cerrar el fichero"], correcta: 1, explicacion: "Quote escapa los metacaracteres de la cadena como literal." },
    { pregunta: "¿Qué charset conviene especificar al convertir texto y bytes?", opciones: ["El predeterminado del equipo", "UTF-8 explícitamente", "Ninguno", "ASCII siempre"], correcta: 1, explicacion: "Un charset explícito evita depender de la configuración local." },
    { pregunta: "¿Qué garantiza try-with-resources?", opciones: ["Que nunca haya IOException", "Que se cierren recursos al salir del bloque", "Que los datos sean válidos", "Que serialice cualquier objeto"], correcta: 1, explicacion: "Cierra recursos automáticamente, incluso ante excepciones." },
    { pregunta: "¿Qué riesgo tiene deserializar objetos de una fuente no confiable?", opciones: ["Ninguno", "Puede desencadenar comportamiento peligroso durante la deserialización", "Solo pierde acentos", "Ordena los objetos"], correcta: 1, explicacion: "No se deben aceptar objetos serializados arbitrarios de fuentes externas." },
    { pregunta: "¿Qué pasa si se ignora silenciosamente una fila inválida?", opciones: ["Se garantiza integridad", "El resultado puede parecer completo aunque falten datos", "Se cierra el stream", "Se corrige el formato"], correcta: 1, explicacion: "Hay que informar del número y motivo del error o detener el proceso." },
    { pregunta: "¿Cuándo conviene Files.lines frente a readAllLines?", opciones: ["Al procesar en streaming archivos grandes", "Solo para arrays", "Cuando no hay disco", "Nunca"], correcta: 0, explicacion: "Files.lines procesa líneas incrementalmente y reduce el uso de memoria, pero debe cerrarse." }
  ]
};
const ejerciciosFicheros = window.CONTENIDO["ficheros"].ejercicios;
const solucionesFicheros = window.CONTENIDO["ficheros"].soluciones;
const explicacionesSolucionesFicheros = window.CONTENIDO["ficheros"].explicacionesSoluciones;
if (ejerciciosFicheros.length !== solucionesFicheros.length || ejerciciosFicheros.length !== explicacionesSolucionesFicheros.length) {
  throw new Error("Cada ejercicio de ficheros debe tener una solución y su explicación.");
}
ejerciciosFicheros.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesFicheros[indice];
  ejercicio.explicacion = explicacionesSolucionesFicheros[indice];
});
delete window.CONTENIDO["ficheros"].soluciones;
delete window.CONTENIDO["ficheros"].explicacionesSoluciones;
