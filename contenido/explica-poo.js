window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["poo"] = [
  {
    pista: "El IRPF se calcula por tramos: cada parte del salario paga el tipo de su tramo, no el salario entero. Piensa cómo recorrer los límites y qué parte del salario cae en cada uno.",
    razonamiento: [
      "Los límites y los tipos viven en arrays paralelos: el tramo i tiene como techo limites[i] y como tipo tipos[i]. Para cada tramo, Math.min(salarioBruto, limite) - tramoAnterior da la parte del salario que cae dentro, y Math.max(0, ...) evita valores negativos cuando el salario no llega al tramo.",
      "Después del bucle, lo que queda por encima del último límite paga el último tipo, tipos[tipos.length - 1]. El if final cubre ese resto. Los tramos y tipos del código son ilustrativos, no los reales de la normativa.",
      "El constructor valida el nombre y el salario, y setSalarioBruto valida el cambio. Así el objeto nunca queda con un salario negativo, sea cual sea el camino que lo modifique."
    ]
  },
  {
    pista: "Un punto que no cambia es más fácil de razonar. Piensa qué devuelven sumar y multiplicarPorEscalar: ¿modifican el punto actual o crean otro?",
    razonamiento: [
      "Los campos x e y son final, así que un Punto2D no cambia después de creado. sumar y multiplicarPorEscalar devuelven un punto nuevo con new, y el original sigue igual. Esto permite encadenar operaciones sin efectos secundarios.",
      "El constructor por defecto delega en el de coordenadas con this(0, 0). Así la inicialización está en un solo sitio y no se repite la asignación.",
      "Sumar (2, 3) y (1, -1) da (3.0, 2.0): las coordenadas son double, por eso se imprimen con decimales. El toString sobrescrito permite ver el resultado al imprimirlo."
    ]
  },
  {
    pista: "Hay tres preguntas distintas: la longitud, la pendiente y el paralelismo. Piensa en qué caso puede producirse una división entre cero y cómo evitar la división al comparar.",
    razonamiento: [
      "La longitud es la distancia entre los dos extremos, y Math.hypot la calcula a partir de las diferencias de coordenadas. La pendiente es (y2 - y1) / (x2 - x1), así que falla cuando x1 == x2: una línea vertical no tiene pendiente finita y la solución lanza IllegalStateException.",
      "Para el paralelismo no se comparan pendientes, sino productos cruzados: (x2 - x1) * (dy de la otra) == (y2 - y1) * (dx de la otra). No hay división, así que las líneas verticales se tratan sin excepciones.",
      "Con números decimales la igualdad exacta puede fallar por el redondeo binario; en ese caso conviene una tolerancia, como en el ejercicio de vectores. Desplazar mueve los dos extremos la misma distancia y no cambia la longitud."
    ]
  },
  {
    pista: "Un vector de n dimensiones puede guardarse en un único array de double. Piensa qué operaciones necesitan que las dimensiones coincidan y qué pasa si alguien modifica el array original.",
    razonamiento: [
      "El constructor usa varargs (double... componentes), así que new VectorN(1, 2) y pasar un array funcionan igual. Se guarda una copia con clone() para que cambiar el array original desde fuera no altere el vector. getComponentes también devuelve una copia, por la misma razón.",
      "Las operaciones que combinan dos vectores llaman a comprobarDimension antes de operar. Sumar o calcular el producto escalar de vectores de distinto tamaño no tiene sentido, y la excepción aparece antes de leer posiciones que no existen.",
      "La perpendicularidad se comprueba con el producto escalar igual a cero. Como es un double, la solución usa Math.abs(...) < 1e-9 en lugar de ==. Esa tolerancia debe ajustarse si los componentes son muy grandes o muy pequeños."
    ]
  },
  {
    pista: "Las fórmulas del área y el perímetro vienen de la geometría. Piensa qué datos deben ser válidos desde el constructor y qué operación sirve para medir distancias entre dos puntos.",
    razonamiento: [
      "El radio es final y se valida en el constructor: un círculo con radio cero o negativo no tiene sentido. El área es PI × r² y el perímetro 2 × PI × r, y la clase usa Math.PI para la constante.",
      "La distancia entre dos centros y la comprobación de si un punto está dentro usan Math.hypot. Un punto está dentro si su distancia al centro es menor o igual que el radio. El <= incluye el borde, y ese detalle conviene decidirlo según el enunciado.",
      "desplazar cambia x e y, pero no el radio, así que el círculo se mueve sin cambiar de tamaño. Con new Circulo(0, 0, 2), el punto (1, 1) está dentro porque su distancia al centro es unos 1,41."
    ]
  },
  {
    pista: "Un intervalo tiene dos extremos que deben estar en orden. Piensa qué significa que dos intervalos se toquen y qué datos hay que comparar para saber si se pueden unir.",
    razonamiento: [
      "El constructor exige inicio <= fin, y como los campos son final el intervalo no cambia nunca. La longitud es fin - inicio, y contiene comprueba valor >= inicio && valor <= fin: los extremos están incluidos porque el intervalo es cerrado.",
      "unir solo acepta intervalos que se solapan o se tocan, es decir, cuando ni otro.inicio > fin ni inicio > otro.fin. La comparación es estricta, así que [1, 4] y [4, 8], que solo se tocan en 4, sí se unen.",
      "El resultado toma el mínimo de los inicios y el máximo de los fines. La unión de [1, 4] y [4, 8] es [1.0, 8.0]; se muestra con decimales porque la clase usa double."
    ]
  },
  {
    pista: "Una fracción conviene guardarla siempre en su forma más simple y con el signo en el numerador. Piensa qué hacer en el constructor para que dos fracciones iguales tengan los mismos campos.",
    razonamiento: [
      "El constructor calcula el mcd (máximo común divisor) del numerador y el denominador en valor absoluto, y divide ambos por él. Si el denominador es negativo, el signo pasa al numerador, así el denominador siempre es positivo. Por eso equals puede comparar los campos directamente.",
      "Las operaciones crean una fracción nueva con su fórmula, y el constructor la simplifica. Dividir exige un divisor distinto de cero, y la solución lo comprueba con f.numerador == 0 antes de construir el resultado.",
      "Con 0 en el numerador, el mcd devuelve el denominador y la fracción queda como 0/1. Como equals y hashCode usan los campos, 1/2 y 2/4 son iguales después de simplificar. Los campos son long para reducir el riesgo de desbordamiento al multiplicar."
    ]
  },
  {
    pista: "Un enum sirve para el palo porque sus valores forman un conjunto cerrado. Piensa qué regla debe seguir la comparación: primero por valor y, si empatan, por palo.",
    razonamiento: [
      "El enum Palo define las cuatro constantes, y la carta guarda una de ellas. compareTo implementa Comparable: compara primero el valor con Integer.compare y solo si son iguales usa palo.compareTo, que ordena los palos según el orden en que están declarados en el enum.",
      "El método toString traduce los valores 10, 11 y 12 a Sota, Caballo y Rey, y usa palo.name().toLowerCase() para el palo. name() devuelve el texto de la constante, no un número.",
      "esFigura comprueba valor >= 10. Con new Carta(Palo.COPAS, 12) el texto es Rey de copas. Dentro de un enum la comparación con == es segura, porque cada constante existe una sola vez."
    ]
  },
  {
    pista: "Los ataques dependen del nivel y del tipo del atacante. Piensa qué comparación debe usarse para textos y qué pasa con la salud cuando llega a cero.",
    razonamiento: [
      "El daño base es 10 + nivel, y con ventaja elemental se multiplica por 2. La función ventaja comprueba los tres pares favorables con equals, no con ==: dos String pueden tener el mismo contenido sin ser el mismo objeto.",
      "atacar no hace nada si cualquiera de los dos está debilitado, así un Pokemon sin salud no ataca ni recibe más daño. La salud se reduce con Math.max(0, ...), que impide valores negativos.",
      "Dentro de la misma clase, un método puede leer el campo privado de otro objeto, como objetivo.salud. subirNivel sube el máximo en 5 y cura al Pokemon por completo."
    ]
  },
  {
    pista: "Una lista con límite de tamaño necesita comprobar ese límite antes de añadir. Piensa qué significa ser único en el enunciado y qué método elimina elementos según una condición.",
    razonamiento: [
      "El equipo es un ArrayList<Pokemon>. anadir rechaza null, un equipo ya completo de 6 y el mismo objeto dos veces. Pokemon no sobrescribe equals, así que contains compara referencias: único significa que no se repite el mismo objeto, no que no haya dos con el mismo nombre.",
      "eliminar usa removeIf con una lambda que compara nombres y devuelve si borró algo. visitarCentro recorre todos y llama a curar. contarPorTipo usa un stream con filter y count; equalsIgnoreCase hace que Fuego y fuego cuenten igual.",
      "entrenarAleatorio elige un índice entre 0 y size - 1 con random.nextInt(size), así que nunca se sale del rango. Si el equipo está vacío, el método no hace nada, lo que evita el error de índice."
    ]
  },
  {
    pista: "Una cadena de supervisores puede volver atrás y formar un ciclo. Piensa cómo recorrerla desde el candidato hasta el final y qué reparto de la subida pide el enunciado.",
    razonamiento: [
      "setSupervisor recorre la cadena que empieza en el candidato y sigue por el campo supervisor de cada uno. Si encuentra this, el candidato depende de este empleado y se formaría un ciclo. El Set visitados es una protección extra por si la cadena ya contuviera un bucle.",
      "sueldoNeto aplica un 82 % al salario, un tipo fijo de ejemplo. subida reparte el incremento: el 80 % va al empleado y el 20 % a su supervisor, si lo tiene. Si no hay supervisor, el método no toca ningún otro objeto.",
      "Con Noa (2500) y su supervisor Alex, una subida de 100 deja a Noa en 2580 y suma 20 al salario de Alex. La parte del supervisor no se reparte más arriba en la cadena."
    ]
  },
  {
    pista: "Piensa qué información pertenece a cada habitación y cuál pertenece al hotel. Una clase interna puede agrupar datos que solo tienen sentido dentro de Hotel.",
    razonamiento: [
      "Habitacion es una clase interna privada: solo Hotel la usa, así que no hace falta exponerla. Guarda la tarifa y el huésped; huesped es null cuando la habitación está libre.",
      "El hotel guarda las habitaciones en un Map<Integer, Habitacion> indexado por el número de habitación, no en un array. putIfAbsent añade una habitación solo si no existía, y su valor de retorno permite detectar duplicados. Un array también serviría si los números fueran consecutivos desde 0.",
      "checkin valida que la habitación exista, esté libre y que el nombre no esté vacío. checkout calcula la factura como tarifa × noches, libera la habitación poniendo huesped a null y devuelve el importe. Con tarifa 80 y dos noches, la factura es 160.0."
    ]
  },
  {
    pista: "Piensa qué comparten todos los productos y en qué se diferencian los perecederos y los electrónicos. El stock solo debe cambiar por caminos controlados.",
    razonamiento: [
      "Producto es una clase abstract que guarda nombre, precio y stock como private. Vender y reponer son los únicos caminos para cambiar el stock, y cada uno valida su cantidad. reponer usa Math.addExact para detectar un desbordamiento de int.",
      "ProductoPerecedero y ProductoElectronico extienden Producto y llaman a super(...) como primera instrucción de su constructor. En ProductoElectronico, la validación de aniosGarantia va después del super, porque la clase padre debe construirse antes.",
      "estaCaducado compara la fecha de caducidad con LocalDate.now(), y enGarantia compara con la fecha de fin de garantía. Como dependen del día actual, la salida cambia con el tiempo; para probarlo de forma repetible conviene recibir la fecha como parámetro."
    ]
  },
  {
    pista: "Un material tiene dos estados posibles: prestado y disponible. Piensa qué transiciones están permitidas y qué parte cambia según el tipo de material.",
    razonamiento: [
      "MaterialBibliografico es abstract y guarda el flag prestado. prestar solo funciona si el material está libre, y devolver solo si está prestado; en los dos casos se lanza IllegalStateException cuando la transición no es válida. Así el estado nunca queda inconsistente.",
      "diasPrestamo es un método abstract: cada subclase decide su valor. Libro devuelve 21 y Revista 7. La variable es de tipo MaterialBibliografico, pero la llamada usa la versión de la clase real del objeto: esto es polimorfismo.",
      "No se puede crear un objeto de una clase abstract directamente; por eso el main declara la variable con el tipo padre y la inicializa con new Libro(...). Probar a prestar dos veces seguidas es una buena prueba de la transición inválida."
    ]
  },
  {
    pista: "Dos vehículos son iguales por su matrícula, no por todos sus datos. Piensa qué hay que sobrescribir para que la igualdad funcione también dentro de colecciones, y qué hacer con las mayúsculas.",
    razonamiento: [
      "Vehiculo pasa la matrícula a mayúsculas en el constructor, así que 1234abc y 1234ABC son el mismo vehículo. equals compara solo la matrícula y comprueba con instanceof que el otro objeto sea un Vehiculo. Coche y Moto heredan esa igualdad sin repetir código.",
      "hashCode usa la misma matrícula con Objects.hash. Esto respeta la regla: si equals dice que dos objetos son iguales, sus hashCode deben coincidir, algo que HashSet y HashMap necesitan.",
      "Coche y Moto añaden atributos propios y sobrescriben toString, que se usa al imprimir con System.out.println. Con este diseño, un coche y una moto con la misma matrícula se consideran iguales, como indica el enunciado."
    ]
  },
  {
    pista: "Hay un tipo común, Hechizo, y varias variantes. Piensa qué método debe ser común a todas, cuál cambia en cada una y cómo filtrar por tipo.",
    razonamiento: [
      "Hechizo es abstract, con nombre, coste y el método abstract lanzar. Cada subclase implementa lanzar a su manera: HechizoElemental usa el Elemento del enum en el texto, y HechizoBlanco y HechizoOscuro devuelven mensajes distintos. El enum Elemento evita usar números o cadenas sueltas para el tipo elemental.",
      "El grimorio es una List<Hechizo>, así que puede guardar cualquier subclase. Al llamar a lanzar, Java ejecuta la versión de la clase real del objeto, aunque la variable sea de tipo Hechizo.",
      "El filtro por tipo del main usa h instanceof HechizoBlanco dentro de un stream. Funciona bien con pocos tipos; si crecen, puede ser mejor un campo que identifique la escuela del hechizo."
    ]
  }
];
