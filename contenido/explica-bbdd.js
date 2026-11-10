window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["bbdd"] = [
  {
    pista: "Piensa en tres recursos que hay que abrir y cerrar: la conexión, la sentencia y el resultado. Después recorre el resultado fila a fila.",
    razonamiento: [
      "DriverManager.getConnection abre la conexión con una URL, un usuario y una clave. La solución lee estos datos de variables de entorno con getOrDefault, así que la clave no queda escrita en el código. Si las variables no existen, usa los valores por defecto de un MySQL local.",
      "La consulta se prepara con prepareStatement y se ejecuta con executeQuery, que devuelve un ResultSet. El bucle while (rs.next()) avanza fila a fila, y getString(\"nombre\") lee la columna por su nombre. Llamar a getString antes de next() no lee una fila válida.",
      "Conexión, sentencia y resultado van en un único try-with-resources, así que se cierran en orden inverso al salir, incluso si hay una SQLException. El ORDER BY nombre hace que la base de datos devuelva el listado ordenado, en lugar de ordenarlo en Java."
    ]
  },
  {
    pista: "Usa un signo de interrogación por cada valor y pásalo con setString. Antes de insertar, comprueba que los datos no son nulos ni vacíos.",
    razonamiento: [
      "Los ? son marcadores de posición. setString(1, ...) y setString(2, ...) asignan los valores por posición, empezando en 1. El motor recibe la sentencia con su estructura fija y los datos aparte, así que una comilla o un texto con SQL dentro no altera la consulta. Esa es la protección frente a la inyección SQL.",
      "executeUpdate devuelve el número de filas afectadas. La solución no lo muestra tal cual: en main, si el valor no es 1, lanza SQLException con el número real. Un INSERT correcto debe afectar exactamente a una fila, así que cualquier otro valor indica algo inesperado.",
      "La validación lanza IllegalArgumentException si el nombre o el correo son nulos o vacíos, antes de abrir la conexión. Validar primero evita abrir una conexión para una operación que ya sabemos que no es válida. Una mejora posible sería comprobar el formato del correo con una expresión regular."
    ]
  },
  {
    pista: "Las dos operaciones necesitan un id para localizar la fila. Usa executeUpdate y mira el número de filas afectadas para saber si algo cambió.",
    razonamiento: [
      "UPDATE y DELETE usan WHERE id = ? para afectar solo a la fila indicada. Sin WHERE, la sentencia afectaría a todas las filas de la tabla, y esa es la trampa más peligrosa de estas operaciones.",
      "actualizarNombre y borrar devuelven el número de filas modificadas. En main, si la actualización no afecta exactamente a una fila, se muestra un aviso, pero el programa sigue y ejecuta el borrado. Es una decisión de la solución: si quisieras que ambas operaciones fueran atómicas, necesitarías una transacción.",
      "Las comprobaciones de entrada (id positivo y nombre no vacío) se hacen antes de conectar. Long.parseLong convierte el argumento, y si no es un número la excepción sale antes de tocar la base de datos."
    ]
  }
];
