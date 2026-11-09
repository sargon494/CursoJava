window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-3eval-2026-05-25"] = {
  ejercicios: [
    {
      enunciado: `(RA5, RA6) La empresa de logística "UPS I did it again" necesita un nuevo software modular en Java para automatizar el procesamiento de los paquetes que llegan a sus diferentes almacenes. De cada paquete se necesita conocer: ID del paquete (identificador único), peso (en kg), dirección de envío, si el envío es urgente o no, y precio.

Funcionalidad (3 puntos): crea un método que reciba como argumento un String con la ruta de un directorio. El método deberá buscar todos los ficheros contenidos directamente en ese directorio (sin entrar en subcarpetas) y procesar su información.

Estructura de cada fichero:
- La primera línea contiene un número decimal que representa la tarifa por kilo (€/kg) acordada con el remitente de esos paquetes.
- Las siguientes líneas contienen la información de los paquetes separados por punto y coma (;): IDPaquete;Peso;DireccionEnvio;Urgente.

Por cada línea de paquete válida, se deberá calcular el precio de envío (Peso * TarifaPorKilo) y crear un objeto de la clase Paquete que almacene todos estos datos.

Ejemplo de fichero:
2.5
P-99A;10.5;Calle Alcala 45, Madrid;true
P-99B;3.2;Gran Via 12, Bilbao;false
P-99C;22.0;Av. Diagonal 88, Barcelona;true`,
      solucion: `import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

public class LectorPaquetes {

    public static List<Paquete> procesarDirectorio(String rutaDirectorio) {
        List<Paquete> paquetes = new ArrayList<>();
        // listFiles con File::isFile devuelve solo ficheros directos, sin subcarpetas
        File[] ficheros = new File(rutaDirectorio).listFiles(File::isFile);
        if (ficheros == null) {
            System.err.println("No se puede leer el directorio: " + rutaDirectorio);
            return paquetes;
        }
        for (File fichero : ficheros) {
            paquetes.addAll(procesarFichero(fichero));
        }
        return paquetes;
    }

    private static List<Paquete> procesarFichero(File fichero) {
        List<Paquete> paquetes = new ArrayList<>();
        try (BufferedReader lector = Files.newBufferedReader(fichero.toPath(), StandardCharsets.UTF_8)) {
            String primeraLinea = lector.readLine();
            if (primeraLinea == null) {
                return paquetes;
            }
            double tarifaPorKilo = Double.parseDouble(primeraLinea.trim());

            String linea;
            while ((linea = lector.readLine()) != null) {
                Paquete paquete = parsearLinea(linea, tarifaPorKilo);
                if (paquete != null) {
                    paquetes.add(paquete);
                }
            }
        } catch (IOException | NumberFormatException e) {
            System.err.println("Error procesando " + fichero.getName() + ": " + e.getMessage());
        }
        return paquetes;
    }

    private static Paquete parsearLinea(String linea, double tarifaPorKilo) {
        String[] campos = linea.split(";");
        if (campos.length != 4) {
            return null;
        }
        try {
            String id = campos[0].trim();
            double peso = Double.parseDouble(campos[1].trim());
            String direccion = campos[2].trim();
            boolean urgente = Boolean.parseBoolean(campos[3].trim());
            return new Paquete(id, peso, direccion, urgente, peso * tarifaPorKilo);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}

class Paquete implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String idPaquete;
    private final double peso;
    private final String direccionEnvio;
    private final boolean urgente;
    private final double precio;

    Paquete(String idPaquete, double peso, String direccionEnvio, boolean urgente, double precio) {
        this.idPaquete = idPaquete;
        this.peso = peso;
        this.direccionEnvio = direccionEnvio;
        this.urgente = urgente;
        this.precio = precio;
    }

    public String getIdPaquete() { return idPaquete; }
    public double getPeso() { return peso; }
    public String getDireccionEnvio() { return direccionEnvio; }
    public boolean isUrgente() { return urgente; }
    public double getPrecio() { return precio; }

    @Override
    public String toString() {
        return idPaquete + ";" + peso + ";" + direccionEnvio + ";" + urgente + ";" + precio;
    }
}
`,
      explicacion: "El método del directorio selecciona solo ficheros inmediatos y delega la lectura de cada uno. En cada fichero, la primera línea se convierte en tarifa y las siguientes se separan por punto y coma; cada fila válida crea un Paquete cuyo precio es peso por tarifa. try-with-resources cierra el lector automáticamente y los errores de lectura o formato se notifican."
    },
    {
      enunciado: `Funcionalidad (2.25 puntos): crea un método que reciba como argumento la ruta de un fichero de texto y la lista de paquetes procesados. Deberá generar un informe con el número total de paquetes, el precio medio de envío, el peso máximo encontrado y la fecha del día de hoy.

Formato del informe:
==================================================
INFORME DE ENVÍOS - UPS I did it again
Fecha: 25/05/2026
==================================================
Total de paquetes procesados: 3
Precio medio de envío: 29.75 €
Peso máximo registrado: 22.00 kg
==================================================`,
      solucion: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

public class InformeEnvios {
    private static final String SEPARADOR = "=".repeat(50);

    public static void generarInforme(String rutaFichero, List<Paquete> paquetes) throws IOException {
        int total = paquetes.size();
        // Con lista vacía no hay media ni máximo: se informa 0
        double precioMedio = paquetes.stream().mapToDouble(Paquete::getPrecio).average().orElse(0);
        double pesoMaximo = paquetes.stream().mapToDouble(Paquete::getPeso).max().orElse(0);
        String fecha = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        List<String> lineas = List.of(
                SEPARADOR,
                "INFORME DE ENVÍOS - UPS I did it again",
                "Fecha: " + fecha,
                SEPARADOR,
                "Total de paquetes procesados: " + total,
                String.format(Locale.US, "Precio medio de envío: %.2f €", precioMedio),
                String.format(Locale.US, "Peso máximo registrado: %.2f kg", pesoMaximo),
                SEPARADOR);

        Files.write(Path.of(rutaFichero), lineas, StandardCharsets.UTF_8);
    }
}

class Paquete implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    private final String idPaquete;
    private final double peso;
    private final String direccionEnvio;
    private final boolean urgente;
    private final double precio;

    Paquete(String idPaquete, double peso, String direccionEnvio, boolean urgente, double precio) {
        this.idPaquete = idPaquete;
        this.peso = peso;
        this.direccionEnvio = direccionEnvio;
        this.urgente = urgente;
        this.precio = precio;
    }

    public String getIdPaquete() { return idPaquete; }
    public double getPeso() { return peso; }
    public String getDireccionEnvio() { return direccionEnvio; }
    public boolean isUrgente() { return urgente; }
    public double getPrecio() { return precio; }
}
`,
      explicacion: "Los streams extraen de la lista los precios para calcular la media y los pesos para hallar el máximo. orElse(0) define qué informar si la lista está vacía. LocalDate obtiene la fecha actual, y List.of reúne las líneas que Files.write guarda en UTF-8. String.format limita importes y peso a dos decimales."
    },
    {
      enunciado: `Funcionalidad (2.25 puntos): crea un método que reciba la ruta de un archivo binario. El método debe filtrar y guardar objeto a objeto en dicho archivo únicamente aquellos paquetes cuyo envío sea urgente.`,
      solucion: `import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;

public class GuardarPaquetesUrgentes {

    public static void guardarUrgentes(String rutaBinario, List<Paquete> paquetes) throws IOException {
        try (ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream(rutaBinario))) {
            for (Paquete paquete : paquetes) {
                if (paquete.isUrgente()) {
                    salida.writeObject(paquete);
                }
            }
        }
    }
}

class Paquete implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    private final String idPaquete;
    private final double peso;
    private final String direccionEnvio;
    private final boolean urgente;
    private final double precio;

    Paquete(String idPaquete, double peso, String direccionEnvio, boolean urgente, double precio) {
        this.idPaquete = idPaquete;
        this.peso = peso;
        this.direccionEnvio = direccionEnvio;
        this.urgente = urgente;
        this.precio = precio;
    }

    public String getIdPaquete() { return idPaquete; }
    public double getPeso() { return peso; }
    public String getDireccionEnvio() { return direccionEnvio; }
    public boolean isUrgente() { return urgente; }
    public double getPrecio() { return precio; }
}
`,
      explicacion: "ObjectOutputStream serializa objetos Java en un fichero binario. El bucle recorre todos los paquetes, pero writeObject solo se ejecuta para los urgentes. Paquete implementa Serializable para permitir esa conversión; try-with-resources cierra el flujo incluso si ocurre un error."
    },
    {
      enunciado: `Funcionalidad (2.5 puntos): crea un método que reciba la ruta del archivo binario generado en el apartado anterior, lea los objetos uno a uno hasta llegar al final del fichero y los cargue en una nueva lista. Si había datos previamente guardados, sobrescríbelos.`,
      solucion: `import java.io.EOFException;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class LeerPaquetesUrgentes {

    // Cada llamada crea una lista nueva, así que los datos previos se sustituyen
    public static List<Paquete> cargarUrgentes(String rutaBinario) throws IOException, ClassNotFoundException {
        List<Paquete> paquetes = new ArrayList<>();
        try (ObjectInputStream entrada = new ObjectInputStream(Files.newInputStream(Path.of(rutaBinario)))) {
            while (true) {
                paquetes.add((Paquete) entrada.readObject());
            }
        } catch (EOFException fin) {
            // Se ha llegado al final del fichero
        }
        return paquetes;
    }
}

class Paquete implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    private final String idPaquete;
    private final double peso;
    private final String direccionEnvio;
    private final boolean urgente;
    private final double precio;

    Paquete(String idPaquete, double peso, String direccionEnvio, boolean urgente, double precio) {
        this.idPaquete = idPaquete;
        this.peso = peso;
        this.direccionEnvio = direccionEnvio;
        this.urgente = urgente;
        this.precio = precio;
    }

    public String getIdPaquete() { return idPaquete; }
    public double getPeso() { return peso; }
    public String getDireccionEnvio() { return direccionEnvio; }
    public boolean isUrgente() { return urgente; }
    public double getPrecio() { return precio; }
}
`,
      explicacion: "Se crea una lista nueva para que la carga sustituya cualquier contenido anterior. readObject devuelve un objeto cada vez y el bucle termina al llegar al fin del fichero, indicado por EOFException. Esa excepción se usa aquí como señal normal de fin; el resto de errores de entrada/salida o clases desconocidas se propagan al llamador."
    }
  ]
};
