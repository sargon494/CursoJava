window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-3eval-2025-05-12"] = {
  ejercicios: [
    {
      enunciado: `Se desea desarrollar una aplicación para gestionar el catálogo de libros de una biblioteca. Cada libro contiene la siguiente información:

- ISBN: Identificador único del libro (cadena)
- Título del libro
- Nombre del autor
- Editorial
- Año de publicación
- Precio
- Prestado: Se debe poder conocer si un libro está prestado o no.

Los datos de los libros se deben almacenar en una estructura de datos del framework Collections de Java que optimice los tiempos de acceso y búsqueda por ISBN.

La aplicación debe contar con la siguiente funcionalidad:

1) La aplicación debe permitir cargar automáticamente los datos desde un fichero CSV, cuyo formato sea:
   978-84-376-0494-7;El Quijote;Miguel de Cervantes;Espasa;1605;19.95;false
   978-84-376-1234-0;Rayuela;Julio Cortázar;Cátedra;1963;15.50;true
   978-84-376-5678-1;¿Qué es Java?;Pepelu;Santillana;2015;25.50;false
   Si el fichero no existe, no se cargarán datos en la aplicación, pero esta debe seguir funcionando. (2 puntos)
   public void loadFromCSV(String rutaFichero)
2) Añadir un nuevo libro, comprobando que no exista ya un libro con el mismo ISBN. En caso contrario, debe lanzar una excepción DuplicatedBookException. (0.75 puntos)
   public void addBook(Book book) throws DuplicatedBookException
3) Eliminar un libro dado su ISBN. Si no existe, debe lanzarse BookNotAvaibleException. (0.75 puntos)
   public void removeBook(String isbn) throws BookNotAvaibleException
4) Obtener un listado de libros ordenados por año de publicación (de más reciente a más antiguo). (1.5 puntos)
   public List<Libro> getSortedByYear()
5) Obtener todas las editoriales del catálogo sin duplicados, ordenadas alfabéticamente. Utiliza para ello la estructura de datos adecuada. (1.25 puntos)
6) Prestar un libro: Cada vez que un libro se presta, debe registrarse en una estructura que mantenga un historial ordenado cronológicamente de los ISBN prestados. (1.25 puntos)
   public void lendBook(String isbn) throws BookNotAvaibleException
7) Obtener el libro más recientemente prestado. (0.5 puntos)
   public Book lastLoanedBook()
8) Devolver un libro. (0.5 puntos)
   public void devolverLibro(String isbn) throws BookNotAvaibleException
9) Buscar libros por texto en el título: Dada una cadena de texto (por ejemplo "soledad") y una ruta de fichero de salida (por ejemplo "coincidencias.txt"), debe escribirse en ese fichero solo el título, autor y precio de aquellos libros que contengan esa cadena en el título, sin importar mayúsculas o minúsculas. El fichero de salida debe tener este formato:
   ¿Qué es Java?;Pepelu;25.50
   (1.5 puntos)
   public void searchAndSave(String texto, String rutaSalida)`,
      solucion: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

public class CatalogoLibros {
    // Acceso y busqueda por ISBN en tiempo constante.
    private final Map<String, Book> libros = new HashMap<>();
    // Historial de prestamos en orden cronologico.
    private final List<String> historialPrestamos = new ArrayList<>();

    public void loadFromCSV(String rutaFichero) {
        Path ruta = Paths.get(rutaFichero);
        if (!Files.exists(ruta)) {
            System.out.println("No existe el fichero " + rutaFichero + ": no se carga ningun libro.");
            return;
        }
        try {
            for (String linea : Files.readAllLines(ruta, StandardCharsets.UTF_8)) {
                if (linea.isBlank()) {
                    continue;
                }
                try {
                    addBook(parsearLinea(linea));
                } catch (DuplicatedBookException | RuntimeException e) {
                    System.out.println("Linea omitida (" + e.getMessage() + "): " + linea);
                }
            }
        } catch (IOException e) {
            System.out.println("Error al leer " + rutaFichero + ": " + e.getMessage());
        }
    }

    private Book parsearLinea(String linea) {
        String[] campos = linea.split(";");
        return new Book(
                campos[0].trim(),
                campos[1].trim(),
                campos[2].trim(),
                campos[3].trim(),
                Integer.parseInt(campos[4].trim()),
                Double.parseDouble(campos[5].trim()),
                Boolean.parseBoolean(campos[6].trim()));
    }

    public void addBook(Book book) throws DuplicatedBookException {
        if (libros.containsKey(book.getIsbn())) {
            throw new DuplicatedBookException(book.getIsbn());
        }
        libros.put(book.getIsbn(), book);
    }

    public void removeBook(String isbn) throws BookNotAvaibleException {
        if (libros.remove(isbn) == null) {
            throw new BookNotAvaibleException(isbn);
        }
    }

    // De mas reciente a mas antiguo.
    public List<Book> getSortedByYear() {
        List<Book> lista = new ArrayList<>(libros.values());
        lista.sort(Comparator.comparingInt(Book::getAnio).reversed());
        return lista;
    }

    public SortedSet<String> getEditoriales() {
        SortedSet<String> editoriales = new TreeSet<>();
        for (Book libro : libros.values()) {
            editoriales.add(libro.getEditorial());
        }
        return editoriales;
    }

    public void lendBook(String isbn) throws BookNotAvaibleException {
        Book libro = libros.get(isbn);
        if (libro == null || libro.isPrestado()) {
            throw new BookNotAvaibleException(isbn);
        }
        libro.setPrestado(true);
        historialPrestamos.add(isbn);
    }

    public Book lastLoanedBook() {
        if (historialPrestamos.isEmpty()) {
            return null;
        }
        return libros.get(historialPrestamos.get(historialPrestamos.size() - 1));
    }

    public void devolverLibro(String isbn) throws BookNotAvaibleException {
        Book libro = libros.get(isbn);
        if (libro == null || !libro.isPrestado()) {
            throw new BookNotAvaibleException(isbn);
        }
        libro.setPrestado(false);
    }

    // Escribe titulo;autor;precio de los libros cuyo titulo contiene el texto (sin distinguir mayusculas).
    public void searchAndSave(String texto, String rutaSalida) {
        String buscado = texto.toLowerCase(Locale.ROOT);
        List<String> lineas = new ArrayList<>();
        for (Book libro : libros.values()) {
            if (libro.getTitulo().toLowerCase(Locale.ROOT).contains(buscado)) {
                lineas.add(String.format(Locale.US, "%s;%s;%.2f",
                        libro.getTitulo(), libro.getAutor(), libro.getPrecio()));
            }
        }
        try {
            Files.write(Paths.get(rutaSalida), lineas, StandardCharsets.UTF_8);
        } catch (IOException e) {
            System.out.println("No se pudo escribir " + rutaSalida + ": " + e.getMessage());
        }
    }
}

class Book {
    private final String isbn;
    private final String titulo;
    private final String autor;
    private final String editorial;
    private final int anio;
    private final double precio;
    private boolean prestado;

    public Book(String isbn, String titulo, String autor, String editorial,
                int anio, double precio, boolean prestado) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial;
        this.anio = anio;
        this.precio = precio;
        this.prestado = prestado;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getEditorial() {
        return editorial;
    }

    public int getAnio() {
        return anio;
    }

    public double getPrecio() {
        return precio;
    }

    public boolean isPrestado() {
        return prestado;
    }

    public void setPrestado(boolean prestado) {
        this.prestado = prestado;
    }
}

class DuplicatedBookException extends Exception {
    public DuplicatedBookException(String isbn) {
        super("Ya existe un libro con ISBN " + isbn);
    }
}

class BookNotAvaibleException extends Exception {
    public BookNotAvaibleException(String isbn) {
        super("El libro con ISBN " + isbn + " no esta disponible");
    }
}
`,
      explicacion: "El catálogo usa un Map para localizar libros por ISBN, una lista para conservar el orden cronológico de préstamos y un TreeSet para obtener editoriales únicas y ordenadas. Los datos se convierten al leer cada línea CSV; los préstamos actualizan tanto el estado del libro como el historial. Para la búsqueda, título y consulta se pasan a minúsculas antes de comparar, y los resultados se escriben con el formato solicitado."
    }
  ]
};
