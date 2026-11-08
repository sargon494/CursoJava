window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-ordinaria-2025-05-19"] = {
  ejercicios: [
    {
      enunciado: `La Junta de Conservación Natural desea un programa en Java para gestionar el sistema de sensores inteligentes desplegados en el Parque Regional de Valdeverde. Este sistema debe permitir monitorizar diferentes condiciones del entorno, registrar las lecturas obtenidas por cada sensor y generar informes periódicos.

Todos los sensores comparten: un identificador único, las coordenadas en las que se encuentran instalados, un porcentaje de batería restante y un indicador de si el sensor está dañado o no.

Cada tipo de sensor gestiona las lecturas internamente de forma distinta. Todos los valores son de tipo double:
- Sensor de calidad del aire: las mediciones se almacenan y analizan en el orden en que se producen, es decir, las más antiguas primero.
- Sensor de temperatura extrema: se centra en las lecturas más recientes, así que las más recientes tienen prioridad: las más recientes primero.
- Sensor de actividad sísmica: no interesa registrar valores repetidos; solo se guarda cada valor distinto detectado.

Independientemente del tipo, todos los sensores deben tener, accesible desde la clase base:
1) Registrar nueva lectura, teniendo en cuenta cómo la almacena cada sensor. Si el sensor está dañado o no tiene batería, lanzará ReadNotPossibleException.
2) Obtener el número de lecturas almacenadas.
3) Obtener el siguiente dato a procesar, teniendo en cuenta cómo lo almacena cada sensor.

Implementa las clases necesarias con sus atributos, constructores, estructuras de datos y métodos adecuados. Se evaluará: el diseño de la jerarquía, herencia, encapsulamiento y comportamiento común (2 puntos); la lógica de almacenamiento y análisis diferenciada por tipo de sensor (2 puntos); y que todos los sensores puedan ordenarse por porcentaje de batería restante, de mayor a menor, usando el número de lecturas como criterio secundario en caso de empate (1 punto).

La clase CentralDeMonitoreo gestiona los sensores del Parque Regional y ofrece:
1. Cargar sensores desde un fichero CSV con líneas id;tipo;latitud;longitud;bateria;daniado, donde tipo es CALIDAD_AIRE, TEMPERATURA_EXTREMA o ACTIVIDAD_SISMICA, bateria está entre 0 y 100 y daniado es true o false. Ejemplo:
S1;CALIDAD_AIRE;41.4036;2.1744;78.5;false
S2;TEMPERATURA_EXTREMA;41.4037;2.1745;52.0;true
S3;ACTIVIDAD_SISMICA;41.4038;2.1746;90.0;false
(2 puntos)
2. Eliminar un sensor por ID. Si no existe, lanzar SensorNotFoundException. (1 punto)
3. Método estático que reciba una lista de sensores y repare los que están dañados. (1 punto)
4. Método que agrupe los sensores según si están dañados o no: public Map<Boolean, List<Sensor>> agruparSensoresPorDanio(). (1 punto)`,
      solucion: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.BufferedReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Queue;
import java.util.Set;
import java.util.stream.Collectors;

public class CentralDeMonitoreo {
    private final Map<String, Sensor> sensores = new LinkedHashMap<>();

    public void cargarSensoresDesdeCSV(String rutaFichero) {
        Path ruta = Path.of(rutaFichero);
        if (!Files.exists(ruta)) {
            // Sin fichero no se cargan datos, pero la aplicación sigue funcionando
            System.out.println("El fichero " + rutaFichero + " no existe. No se cargan sensores.");
            return;
        }
        try (BufferedReader lector = Files.newBufferedReader(ruta, StandardCharsets.UTF_8)) {
            String linea;
            while ((linea = lector.readLine()) != null) {
                Sensor sensor = parsearSensor(linea);
                if (sensor != null) {
                    sensores.put(sensor.getId(), sensor);
                }
            }
        } catch (IOException e) {
            System.out.println("Error al leer " + rutaFichero + ": " + e.getMessage());
        }
    }

    private static Sensor parsearSensor(String linea) {
        String[] campos = linea.split(";");
        if (campos.length != 6) {
            return null;
        }
        try {
            String id = campos[0].trim();
            TipoSensor tipo = TipoSensor.valueOf(campos[1].trim());
            double latitud = Double.parseDouble(campos[2].trim());
            double longitud = Double.parseDouble(campos[3].trim());
            double bateria = Double.parseDouble(campos[4].trim());
            boolean daniado = Boolean.parseBoolean(campos[5].trim());
            return crearSensor(tipo, id, latitud, longitud, bateria, daniado);
        } catch (IllegalArgumentException e) {
            // Incluye NumberFormatException y tipos de sensor desconocidos
            return null;
        }
    }

    private static Sensor crearSensor(TipoSensor tipo, String id, double latitud, double longitud,
                                      double bateria, boolean daniado) {
        return switch (tipo) {
            case CALIDAD_AIRE -> new SensorCalidadAire(id, latitud, longitud, bateria, daniado);
            case TEMPERATURA_EXTREMA -> new SensorTemperaturaExtrema(id, latitud, longitud, bateria, daniado);
            case ACTIVIDAD_SISMICA -> new SensorActividadSismica(id, latitud, longitud, bateria, daniado);
        };
    }

    public void eliminarSensor(String id) throws SensorNotFoundException {
        if (sensores.remove(id) == null) {
            throw new SensorNotFoundException(id);
        }
    }

    public static void repararSensoresDanados(List<Sensor> lista) {
        for (Sensor sensor : lista) {
            if (sensor.isDaniado()) {
                sensor.reparar();
            }
        }
    }

    public Map<Boolean, List<Sensor>> agruparSensoresPorDanio() {
        return sensores.values().stream().collect(Collectors.partitioningBy(Sensor::isDaniado));
    }

    public List<Sensor> getSensoresOrdenados() {
        return sensores.values().stream().sorted().collect(Collectors.toList());
    }
}

enum TipoSensor {
    CALIDAD_AIRE, TEMPERATURA_EXTREMA, ACTIVIDAD_SISMICA
}

abstract class Sensor implements Comparable<Sensor> {
    private final String id;
    private final double latitud;
    private final double longitud;
    private double bateria;
    private boolean daniado;

    protected Sensor(String id, double latitud, double longitud, double bateria, boolean daniado) {
        this.id = id;
        this.latitud = latitud;
        this.longitud = longitud;
        this.bateria = bateria;
        this.daniado = daniado;
    }

    public void registrarLectura(double valor) throws ReadNotPossibleException {
        if (daniado || bateria <= 0) {
            throw new ReadNotPossibleException(id);
        }
        almacenar(valor);
    }

    protected abstract void almacenar(double valor);

    public abstract int numeroLecturas();

    public abstract Optional<Double> siguienteDato();

    public void reparar() {
        daniado = false;
    }

    public String getId() { return id; }
    public double getLatitud() { return latitud; }
    public double getLongitud() { return longitud; }
    public double getBateria() { return bateria; }
    public boolean isDaniado() { return daniado; }

    // Orden: batería de mayor a menor; empate: más lecturas primero
    @Override
    public int compareTo(Sensor otro) {
        int porBateria = Double.compare(otro.bateria, this.bateria);
        if (porBateria != 0) {
            return porBateria;
        }
        return Integer.compare(otro.numeroLecturas(), this.numeroLecturas());
    }
}

class SensorCalidadAire extends Sensor {
    private final Queue<Double> lecturas = new ArrayDeque<>(); // FIFO: las más antiguas primero

    SensorCalidadAire(String id, double latitud, double longitud, double bateria, boolean daniado) {
        super(id, latitud, longitud, bateria, daniado);
    }

    @Override
    protected void almacenar(double valor) {
        lecturas.offer(valor);
    }

    @Override
    public int numeroLecturas() {
        return lecturas.size();
    }

    @Override
    public Optional<Double> siguienteDato() {
        return Optional.ofNullable(lecturas.poll());
    }
}

class SensorTemperaturaExtrema extends Sensor {
    private final Deque<Double> lecturas = new ArrayDeque<>(); // LIFO: las más recientes primero

    SensorTemperaturaExtrema(String id, double latitud, double longitud, double bateria, boolean daniado) {
        super(id, latitud, longitud, bateria, daniado);
    }

    @Override
    protected void almacenar(double valor) {
        lecturas.push(valor);
    }

    @Override
    public int numeroLecturas() {
        return lecturas.size();
    }

    @Override
    public Optional<Double> siguienteDato() {
        return Optional.ofNullable(lecturas.poll());
    }
}

class SensorActividadSismica extends Sensor {
    private final Set<Double> lecturas = new LinkedHashSet<>(); // sin repetidos, en orden de detección

    SensorActividadSismica(String id, double latitud, double longitud, double bateria, boolean daniado) {
        super(id, latitud, longitud, bateria, daniado);
    }

    @Override
    protected void almacenar(double valor) {
        lecturas.add(valor);
    }

    @Override
    public int numeroLecturas() {
        return lecturas.size();
    }

    @Override
    public Optional<Double> siguienteDato() {
        Iterator<Double> it = lecturas.iterator();
        if (!it.hasNext()) {
            return Optional.empty();
        }
        Double siguiente = it.next();
        it.remove();
        return Optional.of(siguiente);
    }
}

class ReadNotPossibleException extends Exception {
    ReadNotPossibleException(String idSensor) {
        super("No se puede registrar la lectura: el sensor " + idSensor + " está dañado o sin batería");
    }
}

class SensorNotFoundException extends Exception {
    SensorNotFoundException(String id) {
        super("No existe ningún sensor con id " + id);
    }
}
`
    }
  ]
};
