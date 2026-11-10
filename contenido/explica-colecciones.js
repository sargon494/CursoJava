window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["colecciones"] = [
  {
    pista: "Una pila guarda los paréntesis abiertos que todavía no se han cerrado. Piensa cuál de ellos debe cerrarse primero cuando llega un símbolo de cierre.",
    razonamiento: [
      "La idea es que cada cierre debe emparejarse con el último símbolo de apertura pendiente. Por eso se usa una pila: push guarda cada apertura y pop saca la más reciente. ArrayDeque se usa como pila porque es más moderna que la clase Stack.",
      "No basta con contar paréntesis. En «([)]» hay el mismo número de aperturas y cierres, pero el ] llega cuando el último pendiente es un «(», así que el orden está mal. La comparación de cada cierre con el pop() sirve precisamente para detectar ese caso.",
      "Al final, la pila debe estar vacía; si queda algún símbolo abierto, la expresión no está balanceada. Para añadir otros pares de símbolos, basta con ampliar las comparaciones."
    ]
  },
  {
    pista: "En notación postfija cada operador usa los dos valores que están justo antes en la expresión. Piensa qué valor sale primero de la pila cuando aplicas una resta o una división.",
    razonamiento: [
      "Se recorre la expresión token a token. Si el token es un número, se mete en la pila. Si es un operador, se sacan dos valores, se aplica la operación y el resultado vuelve a la pila. Al final, debe quedar exactamente un valor, que es el resultado.",
      "El orden de los pop() es importante. El primer valor que sale es el operando derecho (b) y el segundo es el izquierdo (a). Por eso la solución escribe int b = pila.pop(), a = pila.pop(); y calcula a - b o a / b. Con «8 2 /» se obtiene 8 / 2 = 4, no 2 / 8.",
      "La división es entera porque los operandos son int, así que «8 2 / 3 +» da 7. La comprobación de tamaño antes de cada operador evita un error cuando la expresión está mal formada, por ejemplo cuando empieza por un operador."
    ]
  },
  {
    pista: "Los números van directamente a la salida. Los operadores esperan en una pila hasta que llega otro operador de prioridad igual o menor, y los paréntesis indican cuándo empieza y termina un bloque.",
    razonamiento: [
      "Es el algoritmo Shunting-Yard. Los operandos se escriben en la salida en el mismo orden en que aparecen. Los operadores pasan por una pila de operadores, y su orden de salida depende de la prioridad: + y - tienen 1 y * y / tienen 2. El paréntesis de apertura se apila y no se escribe en la salida.",
      "Al llegar un operador, se sacan de la pila los operadores pendientes con prioridad mayor o igual, salvo los paréntesis, y después se apila el nuevo. Usar >= en lugar de > hace que los operadores de igual prioridad salgan antes, que es lo que corresponde a la asociatividad por la izquierda. Al llegar un «)», se sacan operadores hasta encontrar el «(» y se descarta.",
      "La solución separa los tokens por espacios, así que la expresión debe escribirse con espacios entre cada número y operador. Si añadieras el operador ^ con asociatividad por la derecha, la comparación debería cambiar a >, porque ahí los operadores iguales no deben salir antes."
    ]
  },
  {
    pista: "Cada cambio debe guardar el estado anterior. Piensa cómo pueden moverse los estados entre dos pilas: una para deshacer y otra para rehacer.",
    razonamiento: [
      "escribir() empuja el texto anterior a la pila deshacer y pone el nuevo texto como actual. También vacía la pila rehacer, porque después de un cambio nuevo ya no tiene sentido rehacer lo que se deshizo antes. Las cadenas son inmutables, así que guardar la referencia equivale a guardar una copia.",
      "deshacer() saca el último estado de la pila deshacer, pero antes guarda el texto actual en la pila rehacer. rehacer() hace lo mismo en sentido inverso. El cambio de texto siempre es un intercambio entre las dos pilas, por eso el orden se conserva.",
      "El enunciado pide un historial de N cambios, y la solución no limita el tamaño. Una pila no permite quitar el elemento del fondo, así que para limitarla habría que usar un ArrayDeque y quitar el último con removeLast() cuando se supere N."
    ]
  },
  {
    pista: "Cada proceso recibe un trozo de tiempo y, si todavía le falta trabajo, vuelve al final de la cola. Piensa qué estructura da ese orden de turnos y cómo evitar darle más tiempo del que le queda.",
    razonamiento: [
      "La cola es FIFO: se atiende al proceso que lleva más tiempo esperando. remove() saca el primero, se le asigna el tiempo y, si queda trabajo, add() lo coloca al final. Así todos los procesos se turnan sin que ninguno espere para siempre.",
      "Math.min(quantum, p.restante) asegura que un proceso no reciba más tiempo del que le queda. Sin esa comprobación, restante podría quedar negativo. La solución también rechaza un quantum menor o igual que cero, porque con cero el bucle no avanzaría nunca.",
      "Si cada proceso tuviera su propio quantum, bastaría con añadir un campo a Proceso y usarlo en lugar del parámetro. Usar una pila en lugar de una cola cambiaría el orden: se ejecutaría primero el último que llegó."
    ]
  },
  {
    pista: "Una PriorityQueue saca primero el elemento que el comparador considera menor. Decide qué significa «menor» para que salga antes el proceso de mayor prioridad y, en empates, el que llegó primero.",
    razonamiento: [
      "PriorityQueue no garantiza el orden de llegada entre elementos de igual prioridad. Por eso el comparador tiene un segundo criterio: la llegada, de menor a mayor. Con los dos criterios, el orden es total y predecible.",
      "Integer.compare(b.prioridad, a.prioridad) invierte el orden: si b tiene más prioridad, el resultado es negativo y b sale antes. Así los números mayores funcionan como mayor prioridad sin cambiar nada más. Si la prioridad fuera un número donde menos significa más urgente, bastaría con intercambiar los argumentos.",
      "En el ejemplo, B y C tienen prioridad 3 y B llegó antes, así que sale primero. El resultado es B, C y A. Un error frecuente es comparar con a.prioridad - b.prioridad, que puede desbordar con números grandes; Integer.compare evita ese problema."
    ]
  },
  {
    pista: "Comparator.comparing crea un orden a partir de un campo. thenComparing añade criterios que solo se usan cuando el anterior empata. Piensa qué campo debe ir primero.",
    razonamiento: [
      "sort() recibe un Comparator que compara primero por NIA, después por apellidos y, en último lugar, por media. Cada thenComparing se aplica solo cuando el criterio anterior devuelve cero, así que la lista queda ordenada por todos los criterios en el orden indicado.",
      "Como el NIA es un String, se ordena alfabéticamente: «10» aparece antes que «3». Si el NIA fuera numérico, habría que guardarlo como int para que el orden fuera numérico. Como el NIA va primero, los apellidos y la media solo desempatarían si hubiera NIA repetidos.",
      "El enunciado pide además que no se repitan NIA, y la solución no lo impide. Para garantizarlo se podría usar un Map con el NIA como clave, o comprobar si ya existe antes de añadir. La clase Estudiante no tiene equals ni hashCode, así que contains() no serviría para esa comprobación."
    ]
  },
  {
    pista: "Un conjunto no admite repetidos, pero necesitas conservar el orden en que aparecen los elementos. Piensa qué tipo de Set mantiene el orden de inserción.",
    razonamiento: [
      "Se crea un LinkedHashSet a partir de la lista. Al añadir los elementos, el conjunto descarta los repetidos y conserva la primera aparición de cada uno, en el orden original. Un HashSet eliminaría los repetidos, pero no garantizaría el orden.",
      "El número de duplicados eliminados es la diferencia entre el tamaño de la lista y el del conjunto. Esta cuenta funciona porque el conjunto solo guarda una copia de cada valor distinto.",
      "Si los elementos fueran objetos propios, el conjunto usaría equals y hashCode para decidir qué es repetido. Por eso esas dos operaciones deben estar bien escritas, como se vio en la unidad de herencia."
    ]
  },
  {
    pista: "Separa el texto usando como separador todo lo que no sea letra. Piensa qué estructura elimina repetidos y, a la vez, conserva el orden de aparición.",
    razonamiento: [
      "El texto se pasa a minúsculas para que «Java» y «java» cuenten como la misma palabra. Después se separa con split() usando como separador cualquier secuencia de caracteres que no sean letras. La expresión \\p{L} representa las letras de cualquier idioma, así que las tildes se conservan.",
      "split() puede dejar una cadena vacía al principio si el texto empieza por un signo, por eso la solución comprueba !p.isEmpty() antes de añadir. Usar split(\" \") sin más dejaría signos pegados a las palabras, como «Eclipse.».",
      "LinkedHashSet elimina los repetidos y mantiene el orden de la primera aparición. Un TreeSet ordenaría alfabéticamente, lo que no sería el orden pedido. Si quisieras conservar las mayúsculas originales, habría que guardar la forma original en otra estructura."
    ]
  },
  {
    pista: "Los métodos addAll, retainAll y removeAll modifican el conjunto sobre el que se llaman. Piensa cómo conservar el conjunto original mientras calculas cada resultado.",
    razonamiento: [
      "Cada operación empieza creando una copia nueva con new HashSet<>(a), de modo que a y b no cambian. La unión es la copia de a con addAll(b). La intersección es la copia de a con retainAll(b), que conserva solo los elementos que también están en b. La diferencia es la copia de a con removeAll(b).",
      "La diferencia simétrica se calcula como unión menos intersección. Si hubieras escrito union = a y después union.addAll(b), también habrías cambiado a, porque las dos variables apuntan al mismo conjunto. Ese es el error más frecuente en este tipo de ejercicios.",
      "a.equals(b) compara el contenido, no la identidad: dos conjuntos son iguales si tienen los mismos elementos, sin importar el orden. La solución comprueba A como subconjunto de la unión con containsAll, que siempre da true porque la unión contiene a A. Para saber si A está contenido en B, la comprobación sería b.containsAll(a)."
    ]
  },
  {
    pista: "Un TreeSet mantiene los elementos ordenados y considera repetidos los que el comparador da como iguales. Piensa qué clave debe usar el comparador para que dos eventos del mismo día y lugar cuenten como el mismo.",
    razonamiento: [
      "El comparador ordena primero por fecha y después por lugar. El TreeSet no usa equals para detectar repetidos: si compare() devuelve cero, el elemento ya existe y add() no lo inserta. Por eso el tercer evento de Madrid, con la misma fecha, no entra en el conjunto.",
      "Para el rango, la solución recorre todos los eventos y comprueba que la fecha no sea anterior a desde ni posterior a hasta. TreeSet también ofrece subSet() para obtener el rango directamente. ceiling() devuelve el primer evento que no es anterior al valor dado, así que es la forma de buscar el próximo evento.",
      "La solución de la web no muestra la eliminación. Se haría con remove(evento), y funciona porque el TreeSet localiza el elemento con el comparador. Como la salida depende de LocalDate.now(), los resultados cambian cada día; conviene fijar una fecha para probar."
    ]
  },
  {
    pista: "Cuenta las palabras con un mapa de palabra a contador. Para ordenar por frecuencia, piensa qué elementos debes ordenar: las claves o las entradas del mapa.",
    razonamiento: [
      "Cada palabra se cuenta con getOrDefault(p, 0) + 1, que devuelve 0 cuando la palabra aún no está en el mapa. El HashMap no guarda un orden fiable, así que el orden alfabético y por frecuencia se obtiene copiando los datos en listas y ordenándolas.",
      "Para el orden alfabético se copia el keySet en una lista y se ordena con String::compareTo. Para el orden por frecuencia hay que ordenar las entradas, Map.Entry, usando comparingByValue con orden inverso y, en empates, la clave. La frecuencia es un valor, así que hay que ordenar la entrada completa.",
      "Los N más frecuentes son las primeras posiciones de la lista ya ordenada. subList(0, Math.min(2, size)) evita un IndexOutOfBoundsException cuando hay menos palabras que N. La N está fijada a 2 en el ejemplo, y podría ser un parámetro del método."
    ]
  },
  {
    pista: "Recorre cada carácter de la palabra y usa el propio carácter como clave de un mapa que guarda cuántas veces aparece.",
    razonamiento: [
      "El mapa usa Character como clave y Integer como valor. Se recorre la palabra en minúsculas, se descartan los caracteres que no son letras con Character.isLetter y se cuenta cada uno con getOrDefault(c, 0) + 1.",
      "Se usa LinkedHashMap para que las letras aparezcan en el orden de su primera aparición en la palabra. Con HashMap el orden no sería predecible, aunque el conteo fuera correcto. Un error frecuente es escribir mapa.get(c) + 1 sin el valor por defecto: en la primera aparición get() devuelve null y el desempaquetado lanza NullPointerException.",
      "El método frecuencia() recibe cualquier palabra y devuelve su mapa, así que sirve para cada elemento del array. Si quisieras contar varias palabras a la vez, podrías usar un único mapa de mapas, con la palabra como clave externa."
    ]
  },
  {
    pista: "Un mapa producto-cantidad permite cambiar el stock con una sola operación. Piensa qué comprobaciones deben hacerse antes de modificar el mapa, para no dejar el inventario a medias.",
    razonamiento: [
      "agregar() suma la cantidad al stock actual, que es 0 si el producto no existe. vender() obtiene el stock actual y comprueba que la cantidad sea positiva y no supere el stock disponible. Solo si la venta es válida se escribe el nuevo valor en el mapa.",
      "Las validaciones van antes de cualquier cambio. Si vender() modificara el mapa y después comprobara la cantidad, un error dejaría el inventario con un valor incorrecto. El mismo criterio se aplica a todas las operaciones que cambian el estado.",
      "En main, la lista de nombres se ordena con naturalOrder() solo para mostrarla. Los productos con menos de 5 unidades se marcan al listar; la solución no crea una lista aparte de stock bajo. Para eliminar agotados, values().removeIf(c -> c == 0) borra las entradas cuyo valor es cero, porque la vista de valores está ligada al mapa."
    ]
  },
  {
    pista: "Un mapa de mapas representa la relación alumno, asignatura y nota. Piensa cómo calcular la media de cada alumno con una función aparte y cómo comparar medias sin repetir código.",
    razonamiento: [
      "El mapa exterior asocia cada nombre con un mapa de asignatura a nota. La media se calcula con stream().mapToDouble(Double::doubleValue).average(), que devuelve un OptionalDouble. Por eso getAsDouble() se llama después de comprobar que el mapa no está vacío, porque en ese caso lanzaría una excepción.",
      "El recorrido compara cada media con la del mejor y la del peor hasta el momento. Empiezan en null y la primera iteración los asigna; por eso la comparación se hace con mejor == null antes de usar su media. La media se calcula varias veces, lo que es aceptable en un ejemplo pequeño.",
      "El enunciado pide también eliminar estudiantes, que la solución no muestra. Se haría con alumnos.remove(nombre). Como el mapa de notas es un mapa interno, quitar al alumno elimina todas sus notas de una vez."
    ]
  },
  {
    pista: "Calcula el subtotal de cada línea y después suma. Piensa dónde se aplica el IVA: sobre la base de todas las líneas o línea a línea.",
    razonamiento: [
      "Producto calcula su subtotal como precio por cantidad. El método main recorre la lista, imprime cada línea con printf y acumula la base imponible. Con %.2f cada importe se muestra con dos decimales, y %n produce el salto de línea del sistema.",
      "El IVA se calcula sobre la base total: base * 0.21. Como todos los productos tienen el mismo IVA, el resultado es igual que calcularlo línea a línea. El símbolo de porcentaje en printf se escribe como %%, porque % tiene un significado especial en el formato.",
      "Con double, algunos importes pueden tener errores de redondeo. Para facturación real se usa BigDecimal, que representa los decimales exactamente. Para este ejercicio, la solución con double es suficiente, pero conviene conocer la diferencia."
    ]
  },
  {
    pista: "Un mapa con clave DayOfWeek y una cola por día sirve para guardar las tareas en orden de llegada. Para buscar el próximo día, piensa cómo avanzar día a día y volver al lunes después del domingo.",
    razonamiento: [
      "EnumMap es un mapa optimizado para enumeraciones, y mantiene los días en su orden natural. computeIfAbsent crea la cola de un día la primera vez que se añade una tarea, así no hace falta comprobar null. La cola es un ArrayDeque, y procesar() saca la primera tarea con remove(), que es FIFO.",
      "proximoDiaConTarea() empieza en i = 1, así que el día actual no cuenta como próximo. La fórmula (hoy.getValue() - 1 + i) % 7 + 1 avanza un día por vuelta y da la vuelta a la semana: después del domingo vuelve al lunes. Olvidar esa vuelta es el error más común.",
      "La solución de main muestra el próximo día desde hoy. Si el enunciado pidiera la fecha exacta en lugar del día de la semana, se usaría LocalDate con plusDays en el bucle, y no haría falta la aritmética de módulo."
    ]
  },
  {
    pista: "La lista solo tiene referencias al siguiente nodo, así que cada operación recorre la lista desde la cabeza. Para invertirla o reordenarla, piensa cuántas referencias necesitas mover a la vez.",
    razonamiento: [
      "invertir() recorre la lista con tres punteros, ant, act y s. En cada paso guarda el siguiente nodo, cambia el enlace de act para que apunte hacia atrás y avanza. Al final, la cabeza pasa a ser el último nodo original. No se crea ninguna estructura auxiliar.",
      "eliminarDuplicados() usa un bucle exterior con el nodo a y un bucle interior con p, que recorre el resto de la lista. Cuando p.sig tiene el mismo valor que a, se salta ese nodo sin avanzar p. ordenar() intercambia los valores de los nodos, no los nodos en sí, lo que simplifica el código a costa de un coste cuadrático.",
      "El enunciado indica que se deben usar métodos «sin estructuras adicionales». ultimos() copia la lista en un ArrayList para calcular los últimos N, lo que no respeta esa restricción. Una versión estricta contaría los nodos y avanzaría hasta el punto de inicio, sin copias. clone() construye una lista nueva con los mismos valores, así que la copia es independiente."
    ]
  },
  {
    pista: "En una pila sobre ArrayList, la cima es el último elemento de la lista. Para Torres de Hanoi, piensa qué pasa con el disco más grande y qué papel juega cada torre en cada llamada.",
    razonamiento: [
      "push() añade al final y pop() quita el último, así que las dos operaciones trabajan en el extremo de la lista y son rápidas. remove(T v) quita la primera coincidencia; reverse() usa Collections.reverse() para invertir la pila, y merge() añade al final los elementos de otra pila, que quedan encima.",
      "En datos.remove(v), v tiene tipo T, así que Java elige remove(Object) y busca por valor. En cambio, datos.remove(datos.size() - 1) recibe un int y se refiere a un índice. Confundir ambos casos con un ArrayList<Integer> da resultados inesperados.",
      "hanoi() mueve n - 1 discos de origen a auxiliar, mueve el disco más grande de origen a destino y después mueve los n - 1 discos desde auxiliar hasta destino. El caso base es n = 0. La solución deja hanoi como método static dentro de ArrayStack en lugar de una clase TorresDeHanoi<T>, pero la idea es la misma."
    ]
  },
  {
    pista: "Para añadir al final sin recorrer toda la lista, guarda también una referencia al último nodo. Piensa qué referencias hay que actualizar cuando la cola queda vacía.",
    razonamiento: [
      "offer() añade al final usando ultimo, y poll() quita el primero. Si después de quitar el primero la cola queda vacía, primero y ultimo deben ponerse a null; por eso poll() comprueba si primero es null y entonces anula ultimo. Si no se hiciera, ultimo apuntaría a un nodo que ya no pertenece a la cola.",
      "merge() vacía la cola de origen al pasar sus elementos a la actual, porque poll() quita los nodos. interleave() construye una cola auxiliar alternando elementos de las dos colas y después la devuelve a la actual con merge(). equals() compara primero el tamaño y después nodo a nodo con Objects.equals.",
      "CentralTelefonica usa tres ArrayDeque, una por nivel de prioridad. El método recibir() elige la cola según la prioridad y atender() saca primero de urgentes, luego de normales y por último de bajas. Usa poll() en la última cola porque devuelve null si está vacía, en lugar de lanzar excepción."
    ]
  }
];
