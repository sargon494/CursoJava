window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ficheros"] = [
  {
    pista: "Piensa en Paths.get para convertir cada texto en una ruta y en Files.exists para comprobarla. Basta un bucle sobre los argumentos.",
    razonamiento: [
      "String es solo texto. Path es el objeto que NIO.2 usa para operar con una ruta. Paths.get crea el Path y Files.exists pregunta al sistema de ficheros si esa ruta existe, sea fichero o carpeta.",
      "exists comprueba la ruta tal como se escribe, así que una ruta relativa se resuelve respecto al directorio desde el que se ejecuta el programa, no respecto al fichero fuente. Este es un fallo habitual al lanzarlo desde Eclipse.",
      "La solución imprime el resultado directamente para mantener el ejemplo corto. Si quisieras guardarlo, bastaría con un boolean[] del mismo tamaño que el array de rutas."
    ]
  },
  {
    pista: "Recorre primero los elementos más profundos. Un directorio solo se puede borrar cuando ya no tiene hijos, así que el orden importa.",
    razonamiento: [
      "Files.walk devuelve la raíz y todo lo que contiene. Al ordenar en orden inverso, una ruta hija siempre aparece antes que su carpeta padre, porque empieza igual y es más larga. Así, cuando llega el turno de un directorio, sus hijos ya se han procesado.",
      "Hay dos reglas. Un fichero se borra si es regular y su size es 0. Un directorio se borra si no es la raíz y Files.list no devuelve ningún hijo, comprobado con findAny. La carpeta raíz nunca se borra, aunque esté vacía.",
      "Stream no implementa Iterable, por eso la solución usa un cast a Iterable con el method reference iterator para poder usar for. Files.list también abre un recurso y va en try-with-resources. Un error común es llamar a Files.delete sobre una carpeta con contenido, lo que lanza DirectoryNotEmptyException."
    ]
  },
  {
    pista: "Files.walk ya recorre las subcarpetas. Lo que falta es decidir si cada ruta lleva la etiqueta [F] o [D].",
    razonamiento: [
      "Files.walk(raiz) devuelve un Stream<Path> con la raíz y todo su contenido a cualquier profundidad. La recursión la hace el propio método, así que no hace falta escribir una función recursiva a mano.",
      "Para cada ruta, Files.isDirectory decide el prefijo: «[D] » si es una carpeta y «[F] » en otro caso. Después se imprime el Path con su ruta completa tal como la devuelve walk.",
      "Como en el ejercicio anterior, el stream va en try-with-resources porque mantiene abierto el directorio. Si quisieras limitar la profundidad, Files.walk admite un segundo parámetro maxDepth."
    ]
  },
  {
    pista: "Compara el nombre de cada fichero con el sufijo buscado. Antes de comparar, normaliza la extensión a minúsculas y con el punto delante.",
    razonamiento: [
      "La solución filtra en dos pasos: Files::isRegularFile descarta las carpetas y endsWith compara el nombre del fichero. Usar endsWith es más preciso que buscar la subcadena en cualquier posición, porque «copia.txt.bak» contendría «.txt» pero no termina en él.",
      "El argumento se normaliza para que «TXT» y «.txt» den el mismo resultado. Se usa Locale.ROOT en toLowerCase para que la conversión no dependa del idioma del equipo, un problema clásico con la letra i en turco.",
      "Las rutas se devuelven con toAbsolutePath, así que el resultado no depende de la carpeta desde la que se ejecuta el programa. Files.walk recorre las subcarpetas sin código recursivo propio."
    ]
  },
  {
    pista: "Piensa en la profundidad de cada carpeta como el número de niveles que la separan de la raíz. Puedes medirla con relativize.",
    razonamiento: [
      "raiz.relativize(p) devuelve la ruta de cada carpeta respecto a la raíz, y getNameCount() cuenta cuántos nombres la forman. Una carpeta directamente dentro de la raíz tiene un nombre, así que su profundidad es 1. La propia raíz se trata aparte y vale 0.",
      "Files::isDirectory limita el cálculo a carpetas, mapToInt convierte cada ruta en su profundidad y max() devuelve la mayor. orElse(0) es una salvaguarda, porque si la raíz existe el stream nunca queda vacío.",
      "Un error habitual es contar niveles con la longitud de la cadena o con las barras. getNameCount no depende del separador del sistema operativo. Si la raíz solo contiene ficheros, el resultado es 0."
    ]
  },
  {
    pista: "Busca la palabra como texto literal, no como expresión regular, y cuenta cada coincidencia dentro de cada línea. Recuerda la opción para ignorar mayúsculas.",
    razonamiento: [
      "Pattern.quote convierte la palabra en un patrón literal, así que un punto o un asterisco no se interpretan como regex. Con CASE_INSENSITIVE y UNICODE_CASE la búsqueda no distingue mayúsculas, incluidas las letras con acento.",
      "readAllLines lee el fichero entero y se crea un Matcher por línea. find() avanza al siguiente acierto, así que el while cuenta coincidencias y no líneas: si una línea contiene la palabra dos veces, suma dos.",
      "Esta solución cuenta coincidencias de subcadena, no de palabras completas. Con «casa» también suma «casas» o «casapuerta». Si el enunciado pidiera solo la palabra exacta, habría que añadir los límites de palabra \\b, como hace el ejercicio siguiente."
    ]
  },
  {
    pista: "Usa una expresión regular que solo coincida con la palabra completa, sin distinguir mayúsculas. Reemplaza cada coincidencia por cadena vacía y escribe el resultado en otro fichero.",
    razonamiento: [
      "El patrón empieza con (?iu): la i ignora mayúsculas y la u trata Unicode. Después va \\b, un límite de palabra, luego Pattern.quote protege la palabra de caracteres especiales y otro \\b cierra. Así «gato» se elimina en «el gato» pero no en «gatos».",
      "Cada línea se procesa con patron.matcher(l).replaceAll(\"\"), que sustituye cada coincidencia por nada. Las líneas se unen con System.lineSeparator() y se escriben en UTF-8. Como readAllLines no conserva el salto final, el fichero resultante pierde ese último salto de línea.",
      "En el código Java la barra aparece escrita dos veces, porque dentro de una cadena la barra se escapa; la expresión regular que recibe contiene una sola. Usar TRUNCATE_EXISTING sobrescribe el fichero de salida si ya existía."
    ]
  },
  {
    pista: "Cada letra se desplaza un número fijo de posiciones dentro de su alfabeto. Solo las letras cambian; los espacios, los signos y los números se quedan igual.",
    razonamiento: [
      "En transformar, la letra se convierte en un número de 0 a 25 restando la letra base, 'a' o 'A'. Después se suma el desplazamiento y se aplica % 26 para volver al principio del alfabeto. Así una «z» con desplazamiento 1 pasa a «a».",
      "El desplazamiento se normaliza con Math.floorMod(desplazamiento, 26). Con el operador % normal, un valor negativo daría un resultado negativo, mientras que floorMod siempre devuelve un valor entre 0 y 25. La solución implementa una sola función; para descifrar se aplica la misma función con el desplazamiento negado.",
      "El fichero se lee completo como bytes convertidos a String con UTF-8, y se escribe igual. Un charset explícito evita que los caracteres cambien según la configuración del equipo. El cifrado solo afecta a las letras de la a a la z, así que las vocales acentuadas no se transforman."
    ]
  },
  {
    pista: "Divide el trabajo en pasos: leer y validar cada línea, guardar en un mapa por ISBN, ordenar una copia para mostrarla y serializar la lista al final.",
    razonamiento: [
      "Un HashMap indexado por ISBN hace directa la comprobación de duplicados. putIfAbsent devuelve null si la clave no existía, y en ese caso el libro se guarda; si devuelve un valor, el ISBN ya estaba. La solución convierte ese caso en una IOException con el número de línea, en lugar de ignorar la fila en silencio.",
      "La primera línea se salta si contiene «isbn», porque es la cabecera. El split con límite 3 separa en tres partes, así que una coma dentro del título desplaza los campos y provoca un error al convertir el año. Es una limitación de esta solución que conviene conocer.",
      "ordenarPorTitulo copia los valores a una lista nueva antes de ordenar, para no alterar el mapa. guardar serializa un ArrayList con ObjectOutputStream, y Libro implementa Serializable con serialVersionUID. El main cambia el título del primer libro del mapa, pero un HashMap no tiene orden fijo, así que ese libro puede no ser el primero del CSV."
    ]
  },
  {
    pista: "El saldo cambia con cada operación. Guárdalo junto a cada movimiento para que el listado muestre el saldo que había en ese momento.",
    razonamiento: [
      "registrar suma el importe al saldo y después crea el Movimiento con el saldo ya actualizado. Cada movimiento guarda así una foto del saldo tras esa operación. Si solo se guardara el saldo final, no se podría reconstruir el historial.",
      "Un ingreso es un importe positivo y un gasto es negativo, y la misma suma sirve para los dos casos. El listado decide entre «Ingreso» y «Gasto» mirando el signo del importe. La validación rechaza valores no finitos y el cero con IllegalArgumentException, porque un movimiento de 0 no aporta nada.",
      "Movimiento implementa Serializable, y LocalDateTime también lo es, así que la lista se guarda con ObjectOutputStream. La fecha se toma en el constructor con LocalDateTime.now(), por lo que queda fijada al crear el movimiento y no cambia al guardar o cargar."
    ]
  },
  {
    pista: "Usa un mapa por id de evento para no repetir eventos, y un conjunto por evento para que cada participante aparezca una sola vez.",
    razonamiento: [
      "computeIfAbsent crea el Evento la primera vez que aparece su id y devuelve el existente en las líneas siguientes. Después, add en el Set añade el participante; si ya estaba, el Set lo ignora. Así se cumplen las dos reglas a la vez.",
      "LinkedHashMap conserva el orden en que aparecen los eventos en el fichero, y TreeSet ordena alfabéticamente los participantes de cada evento. TreeSet es serializable, por lo que el conjunto viaja dentro del Evento.",
      "Las filas se separan con split(\";\", 3). Si una fila no tiene tres campos, la solución lanza IOException con el número de fila antes de escribir nada. Otra decisión posible sería saltar esa fila e informarla; lo importante es elegir una y que el código lo haga de forma explícita."
    ]
  },
  {
    pista: "Usa tres colas, una por prioridad, y consulta primero la más importante. Guarda el objeto completo para que el estado sobreviva entre ejecuciones.",
    razonamiento: [
      "recibir decide la cola según la prioridad: 3 o más va a urgentes, 2 a normales y el resto a bajas. addLast añade al final de cada cola, así que dentro de cada prioridad se mantiene el orden de llegada.",
      "atender prueba urgentes, luego normales y por último bajas. En las dos primeras usa removeFirst, porque ya se ha comprobado que no están vacías. En bajas usa pollFirst, que devuelve null si la cola está vacía en lugar de lanzar excepción, por eso atender puede devolver null.",
      "La clase implementa Serializable y se escribe a sí misma con writeObject(this). ArrayDeque es serializable, así que las tres colas viajan dentro del objeto. Si el fichero no existe, cargar devuelve una cola vacía, y la solución guarda tras recibir y tras atender para que el fichero siga al día."
    ]
  },
  {
    pista: "Procesa cada línea dentro de un try. Si algo falla en esa línea, anota el error y sigue con la siguiente, en lugar de detener todo el programa.",
    razonamiento: [
      "Cada línea se separa con split(\";\", -1). El -1 conserva los campos vacíos del final, así que «Ana;» genera dos campos y no se confunde con una línea sin nada. Se exige al menos un nombre y una nota; después se calcula la media y el estado es Aprobado si la media llega a 5.",
      "Las notas se convierten con Double.parseDouble. Si una nota no es numérica se lanza NumberFormatException, que hereda de IllegalArgumentException. Por eso un único catch de IllegalArgumentException recoge tanto los campos que faltan como los números mal escritos.",
      "Las líneas inválidas se guardan en una lista de errores con su número de línea y se añaden al informe, así que no se pierden. El máximo y el mínimo se calculan sobre las medias válidas, y si no hay ningún registro válido la solución lanza IOException en lugar de generar un informe vacío."
    ]
  }
];
