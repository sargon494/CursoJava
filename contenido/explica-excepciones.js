window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["excepciones"] = [
  {
    pista: "Hay dos fallos posibles, uno al leer y otro al dividir. Piensa qué ocurre con la entrada incorrecta cuando nextInt() falla y cómo sale el bucle cuando todo va bien.",
    razonamiento: [
      "El bucle se repite hasta que la división se hace sin errores. El try contiene las dos lecturas y la división, así que cualquier error vuelve a pedir ambos valores. Con break se sale cuando el resultado se ha mostrado.",
      "InputMismatchException aparece cuando el token no es un entero, y ArithmeticException cuando el divisor es cero. Las dos se capturan por separado porque el mensaje que se da al usuario es distinto. El detalle clave es el token: nextInt() no lo consume al fallar, así que la solución lo descarta con sc.next() para no repetir el mismo error. El if (sc.hasNext()) evita un bucle infinito si la entrada se ha terminado.",
      "Con int, la división por cero lanza ArithmeticException. Si las variables fueran double, a / b daría Infinity sin excepción, y habría que comprobar b == 0 a mano. El try-with-resources cierra el Scanner al salir del bloque, incluso si hay un error."
    ]
  },
  {
    pista: "La excepción que lanza la raíz debe ser comprobada y declararse con throws. Piensa en qué bloque conviene capturarla para volver a pedir el dato sin terminar el programa.",
    razonamiento: [
      "NumeroNegativoException extiende Exception, así que es una excepción comprobada. El método raiz la declara con throws, y el compilador obliga a quien lo llama a capturarla. Esto hace visible en la firma que la operación puede fallar.",
      "El bucle usa sc.hasNextDouble() como condición. Si el usuario escribe un valor negativo, la excepción se captura, se muestra el mensaje y el bucle sigue. Si escribe algo que no es un número, hasNextDouble() devuelve false y el programa termina sin raíz. Si quisieras seguir pidiendo en ese caso, habría que descartar el token como en el ejercicio anterior.",
      "Math.sqrt(0) vale 0, así que el cero no es un error: la comprobación es numero < 0 y no numero <= 0. Un error frecuente es declarar throws en raiz y capturar la excepción dentro de ese mismo método, lo que hace inútil la declaración."
    ]
  },
  {
    pista: "Cada dato tiene su propia regla. Si creas una excepción por regla, el mensaje de error dirá exactamente qué dato ha fallado.",
    razonamiento: [
      "Las tres excepciones extienden Exception y cada una construye su mensaje con super(...). El constructor de Usuario declara throws con las tres, porque cualquiera de ellas puede ocurrir durante el registro. Las comprobaciones se hacen antes de asignar los campos, así que un registro fallido no deja un objeto a medio construir.",
      "El nombre se valida con trim().isEmpty(), que rechaza tanto la cadena vacía como una formada solo por espacios. La edad debe estar entre 0 y 120. El correo se comprueba con matches() y una expresión regular: en Java la barra invertida se escribe doble en el texto. Esta regla solo detecta un formato básico con @ y un punto, no es un validador completo de correos.",
      "En main, la captura múltiple con | agrupa las tres excepciones en un solo catch, porque las tres se tratan igual. Esto solo es posible si ninguna es subclase de otra, lo que aquí se cumple. Si cada caso necesitara un mensaje distinto, se escribirían catch separados."
    ]
  },
  {
    pista: "Piensa cómo se comunica el fallo entre la interfaz, la clase Biblioteca y main, y dónde debe decidirse qué mensaje se muestra al usuario.",
    razonamiento: [
      "Prestable declara prestar() y devolver() con sus excepciones comprobadas. Libro las implementa cambiando el campo prestado y lanza la excepción cuando el estado no permite la operación. Biblioteca guarda los libros en un HashMap indexado por id, y cada método comprueba antes de modificar algo.",
      "buscar() convierte un null de Map.get() en MaterialNoEncontradoException. Así ningún método devuelve null sin avisar. prestar() y devolver() llaman a buscar() y dejan que la excepción suba hasta quien llama, que es el único que sabe qué mensaje dar. La firma de cada método debe incluir las excepciones comprobadas que puede lanzar, directa o indirectamente.",
      "La solución de la web solo muestra una demostración en main. El menú pedido en el enunciado no aparece aquí, pero puedes añadirlo en un bucle con Scanner y un switch que llame a estos mismos métodos y capture las excepciones dentro del bucle, para que el menú siga funcionando tras un error."
    ]
  },
  {
    pista: "Antes de cambiar el estado del hotel, comprueba cada condición en orden: que exista la habitación, que el cliente no tenga ya otra reserva y que la habitación esté libre.",
    razonamiento: [
      "Reservable declara reservar() y cancelar() con sus excepciones. Habitacion guarda el cliente que la ocupa, y Hotel guarda las habitaciones en un Map por número. Hotel es quien coordina las comprobaciones que dependen de varias habitaciones, como la de cliente duplicado.",
      "En Hotel.reservar() el orden importa: primero se busca la habitación, después se recorre el mapa para ver si el cliente ya tiene otra reserva y, por último, Habitacion.reservar() comprueba si la habitación está ocupada. Así el estado solo cambia cuando todas las condiciones se cumplen. La solución reutiliza ReservaNoEncontradaException también cuando la habitación no existe, lo que sirve pero no describe el caso con precisión.",
      "Hay un detalle frágil: cliente.equals(otra.cliente) lanza NullPointerException si cliente es null, antes de llegar a la validación de Habitacion. Una versión más robusta comprobaría el nulo al principio del método. El catch múltiple de main muestra el mensaje de cada error sin ocultarlo."
    ]
  }
];
