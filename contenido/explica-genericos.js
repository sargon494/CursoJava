window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["genericos"] = [
  {
    pista: "Si null es un valor que se puede guardar, ¿cómo distingues una caja vacía de una caja que contiene null? Piensa en un dato extra que recuerde si se ha guardado algo.",
    razonamiento: [
      "Caja<T> guarda un valor de cualquier tipo T. Al declarar Caja<String>, el compilador impide guardar un número en esa caja. El campo vacia empieza en true y guardar() lo pone a false, así que la caja sabe si ha recibido algún valor.",
      "Comprobar contenido == null para saber si está vacía sería un error, porque una caja con null guardado parecería vacía. Por eso obtener() comprueba vacia y lanza IllegalStateException si no hay nada que devolver. vaciar() deja contenido a null y vacia a true.",
      "Si no quisieras admitir null, bastaría con rechazarlo en guardar() y comprobar contenido == null, sin necesidad de un campo extra. Con el indicador, la clase acepta cualquier valor, incluido null."
    ]
  },
  {
    pista: "Dos pares son iguales si lo son sus dos partes. Piensa qué método compara el contenido de los objetos y cuál compara sus direcciones de memoria.",
    razonamiento: [
      "El Par guarda clave y valor como campos final, así que no cambian después de creado. equals recibe un Object, comprueba con instanceof que el otro también es un Par y compara ambas partes. Como en equals no se conocen los tipos genéricos del otro objeto, se hace el cast a Par<?, ?>.",
      "Objects.equals compara cada parte y, a diferencia de ==, no falla si alguna es null. Con == se compararían referencias, y dos cadenas con el mismo texto podrían dar false. hashCode usa Objects.hash con las mismas dos partes, así que el contrato entre equals y hashCode se mantiene.",
      "Si el par pudiera cambiar sus valores, el hash cambiaría mientras el objeto está dentro de un HashMap o un HashSet, y el objeto se perdería. Por eso la clase es final y sus campos también."
    ]
  },
  {
    pista: "Recorre el array con un índice y piensa cómo comparar dos valores de tipo T sin saber cuál es ese tipo. El tipo se declara antes del tipo de retorno.",
    razonamiento: [
      "El método es static y declara <T> antes de int, porque es genérico y no depende de ninguna clase concreta. Se llama con arrays de cualquier tipo de referencia: el compilador comprueba que el objetivo y los elementos sean del mismo tipo.",
      "La comparación usa Objects.equals y no ==. Con == se compararían referencias, así que dos Strings con el mismo texto podrían no coincidir. Objects.equals también funciona cuando alguno de los valores es null. El método devuelve el primer índice encontrado y, si no hay coincidencia, -1.",
      "Si el parámetro fuera una List<T> en lugar de un array, la lógica sería la misma, pero usando size() y get(). El método no crea ningún array de T, así que no choca con las limitaciones del borrado."
    ]
  },
  {
    pista: "El límite T extends Number te da acceso a los métodos comunes de todos los números. Piensa qué método sirve para sumar valores de cualquier tipo numérico.",
    razonamiento: [
      "Sin el límite, el compilador no sabría que T tiene doubleValue(), y no podría sumar los elementos. Con <T extends Number>, la clase acepta Integer, Double o cualquier subclase de Number, y rechaza un String en tiempo de compilación.",
      "suma() acumula en un double y usa valor.doubleValue() para convertir cada elemento. media() divide la suma, que ya es double, entre el número de elementos, así que no se pierden decimales. Si el acumulador fuera int, la media de enteros se truncaría.",
      "El constructor lanza IllegalArgumentException si la lista es null o vacía, porque dividir entre cero daría NaN. List.copyOf crea una copia inmutable, así que cambiar la lista original después no altera las estadísticas."
    ]
  },
  {
    pista: "Comparable<T> garantiza que cada valor sabe compararse con otro del mismo tipo. Piensa qué devuelve compareTo y qué signo indica que un valor va antes que otro.",
    razonamiento: [
      "El límite Comparable<T> permite llamar a compareTo sobre primero y segundo. compareTo devuelve un número negativo si el objeto va antes, cero si son iguales y positivo si va después. Los tres métodos se basan solo en ese signo.",
      "menor() devuelve primero cuando compareTo es menor o igual que cero, así que en caso de empate devuelve el primero. mayor() hace lo contrario con >= 0. estanOrdenados() comprueba que primero no vaya después de segundo. Usar <= o >= en lugar de < o > evita que los empates den un resultado inesperado.",
      "Con más de dos valores, este enfoque no escala. Para una lista se usarían Collections.min y Collections.max, que reciben el mismo límite Comparable y hacen el recorrido por ti."
    ]
  },
  {
    pista: "Una pila de nodos solo necesita conocer el nodo de la cima. Piensa qué referencia cambia en push y en pop, y qué debe ocurrir cuando la pila está vacía.",
    razonamiento: [
      "Nodo<E> es una clase anidada static con el valor y una referencia al siguiente nodo. Es static porque no necesita acceder a nada de la pila de la que forma parte. La pila guarda solo la referencia cima y un contador size.",
      "push crea un nodo nuevo que apunta a la cima actual y lo convierte en la nueva cima. pop guarda el valor de la cima, mueve la cima al siguiente nodo y resta uno al tamaño. En ambos casos el cambio es de punteros, así que no se copian datos.",
      "pop y peek lanzan IllegalStateException cuando la pila está vacía. Devolver null sería ambiguo, porque null también podría ser un valor válido guardado en la pila. Con la excepción, el llamador sabe que ha pedido algo que no existe."
    ]
  },
  {
    pista: "Trabaja sobre una copia del array original. Piensa qué pares de posiciones deben intercambiarse y hasta dónde hay que llegar para no deshacer el trabajo.",
    razonamiento: [
      "datos.clone() crea un array nuevo con los mismos elementos, así que el original no se modifica. El tipo de la copia es el mismo que el del array original, por ejemplo String[], y por eso no hace falta crear un array de T directamente.",
      "El bucle recorre solo la mitad del array. En cada vuelta intercambia copia[i] con copia[length - 1 - i], usando una variable temporal. Si recorriera todo el array, cada par se intercambiaría dos veces y el resultado volvería a ser el original.",
      "Con un número impar de elementos, el elemento del centro no cambia de posición, lo que es correcto. Si el método debiera devolver el mismo array modificado, bastaría con quitar clone() y trabajar directamente sobre datos."
    ]
  },
  {
    pista: "La lista de origen solo se lee y la de destino solo recibe valores. Los comodines expresan esa dirección: piensa cuál de los dos necesita extends y cuál necesita super.",
    razonamiento: [
      "List<Integer> no es subtipo de List<Number>, aunque Integer sí lo sea de Number. Si lo fuera, alguien podría añadir un Double a la lista de Integer. Por eso se usan comodines: List<? extends T> acepta una lista de Integer para leer valores T, y List<? super T> acepta una lista de Number para escribir valores T.",
      "El bucle lee cada elemento de origen como T y lo añade a destino. Con T inferido como Integer, la lista de origen cumple ? extends Integer y la de destino cumple ? super Integer, porque Number es supertipo de Integer. Esta regla se resume como PECS: Producer Extends, Consumer Super.",
      "Un error frecuente es invertir los comodines. Si origen fuera List<Number> y destino List<Integer>, no compilaría, porque no se pueden añadir Number a una lista de Integer. Lo que produce valores se declara con extends y lo que los consume con super."
    ]
  }
];
