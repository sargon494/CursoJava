// Unidad 15: acceso relacional con JDBC.
window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["bbdd"] = {
  ejercicios: [
    { enunciado: "Conecta con agenda y muestra nombre y correo de cada contacto recorriendo el ResultSet." },
    { enunciado: "Inserta un contacto con PreparedStatement y parámetros; valida entradas y muestra cuántas filas se insertaron." },
    { enunciado: "Actualiza el nombre y borra un contacto por id usando PreparedStatement y comprobando las filas afectadas." }
  ],
  soluciones: [
    `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConsultarContactos {
    static Connection conectar() throws SQLException {
        String url=System.getenv().getOrDefault("DB_URL","jdbc:mysql://localhost:3306/agenda");
        String usuario=System.getenv().getOrDefault("DB_USER","root");
        String clave=System.getenv().getOrDefault("DB_PASSWORD","");
        return DriverManager.getConnection(url,usuario,clave);
    }
    public static void main(String[]args)throws SQLException {
        String sql="SELECT nombre, correo FROM contacto ORDER BY nombre";
        try(Connection con=conectar();PreparedStatement ps=con.prepareStatement(sql);ResultSet rs=ps.executeQuery()){
            while(rs.next())System.out.println(rs.getString("nombre")+" <"+rs.getString("correo")+">");
        }
    }
}`,
    `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertarContacto {
    static Connection conectar()throws SQLException {
        return DriverManager.getConnection(
                System.getenv().getOrDefault("DB_URL","jdbc:mysql://localhost:3306/agenda"),
                System.getenv().getOrDefault("DB_USER","root"),
                System.getenv().getOrDefault("DB_PASSWORD",""));
    }
    static int insertar(String nombre,String correo)throws SQLException {
        if(nombre==null||nombre.trim().isEmpty()||correo==null||correo.trim().isEmpty())
            throw new IllegalArgumentException("Nombre y correo son obligatorios.");
        String sql="INSERT INTO contacto (nombre, correo) VALUES (?, ?)";
        try(Connection con=conectar();PreparedStatement ps=con.prepareStatement(sql)){
            ps.setString(1,nombre.trim());ps.setString(2,correo.trim());
            return ps.executeUpdate();
        }
    }
    public static void main(String[]args)throws SQLException {
        if(args.length!=2)throw new IllegalArgumentException("Uso: InsertarContacto nombre correo");
        int filas=insertar(args[0],args[1]);
        if(filas!=1)throw new SQLException("Se esperaba insertar una fila; filas afectadas: "+filas);
        System.out.println("Contacto insertado.");
    }
}`,
    `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ModificarBorrarContacto {
    static Connection conectar()throws SQLException {
        return DriverManager.getConnection(
                System.getenv().getOrDefault("DB_URL","jdbc:mysql://localhost:3306/agenda"),
                System.getenv().getOrDefault("DB_USER","root"),
                System.getenv().getOrDefault("DB_PASSWORD",""));
    }
    static int actualizarNombre(long id,String nombre)throws SQLException {
        if(id<=0||nombre==null||nombre.trim().isEmpty())throw new IllegalArgumentException("Datos no válidos.");
        try(Connection con=conectar();PreparedStatement ps=con.prepareStatement("UPDATE contacto SET nombre=? WHERE id=?")){
            ps.setString(1,nombre.trim());ps.setLong(2,id);return ps.executeUpdate();
        }
    }
    static int borrar(long id)throws SQLException {
        if(id<=0)throw new IllegalArgumentException("Id no válido.");
        try(Connection con=conectar();PreparedStatement ps=con.prepareStatement("DELETE FROM contacto WHERE id=?")){
            ps.setLong(1,id);return ps.executeUpdate();
        }
    }
    public static void main(String[]args)throws SQLException {
        if(args.length!=2)throw new IllegalArgumentException("Uso: ModificarBorrarContacto id nombre");
        long id=Long.parseLong(args[0]);int actualizadas=actualizarNombre(id,args[1]);
        if(actualizadas!=1)System.out.println("No se actualizó un único contacto: "+actualizadas+" filas.");
        System.out.println("Eliminadas: "+borrar(id));
    }
}`
  ],
  explicacionesSoluciones: [
    "DriverManager abre la conexión y PreparedStatement ejecuta la consulta. ResultSet representa las filas devueltas: next avanza una a una y getString obtiene las columnas necesarias. try-with-resources libera conexión y recursos.",
    "Los valores de entrada se validan antes de ejecutar la inserción. PreparedStatement separa la instrucción SQL de los datos y evita concatenarlos en la consulta; executeUpdate devuelve cuántas filas se insertaron.",
    "La misma conexión ejecuta UPDATE o DELETE con parámetros enlazados, filtrando por id. executeUpdate devuelve filas afectadas, lo que permite avisar si no existía el contacto; los recursos se cierran automáticamente."
  ],

  explicacion: [
    { titulo: "1. Por qué una base de datos", parrafos: [
      "Guardar todo en ficheros puede duplicar información, producir versiones inconsistentes y acoplar los datos a un formato que solo entiende un programa. Un SGBD administra almacenamiento, consultas, restricciones, concurrencia y permisos.",
      "Una tabla representa filas del mismo tipo y columnas con significado definido. Las claves primarias identifican filas; las claves foráneas expresan relaciones. Las restricciones NOT NULL, UNIQUE y CHECK ayudan a preservar reglas incluso si varios programas escriben.",
      "La base de datos no sustituye al diseño: el esquema debe representar las reglas del dominio, y las consultas deben devolver solo los datos necesarios."
    ] },
    { titulo: "2. JDBC: conexión, sentencias y recursos", parrafos: [
      "JDBC define interfaces comunes para conectarse a una base de datos. El conector del motor es una dependencia externa que debe añadirse al Build Path de Eclipse; el JDK no incluye el driver de MySQL.",
      "DriverManager obtiene una Connection, que crea PreparedStatement. ResultSet representa las filas obtenidas por una consulta y next avanza el cursor. Cierra ResultSet, sentencias y conexiones con try-with-resources.",
      "executeQuery se usa para SELECT y devuelve ResultSet. executeUpdate se usa en INSERT, UPDATE y DELETE y devuelve el número de filas afectadas."
    ], codigo: `try (Connection con = DriverManager.getConnection(url, usuario, clave);
     PreparedStatement ps = con.prepareStatement("SELECT nombre FROM contacto");
     ResultSet rs = ps.executeQuery()) {
    while (rs.next()) System.out.println(rs.getString("nombre"));
}` },
    { titulo: "3. Parámetros, errores y transacciones", parrafos: [
      "Usa placeholders ? en PreparedStatement y asigna valores con setString, setLong o el tipo apropiado. No concatenes valores del usuario dentro del SQL: además de errores de comillas, se altera la estructura de la consulta.",
      "SQLException debe propagarse o manejarse con información útil. Comprueba el número de filas afectadas cuando la operación espera modificar una cantidad concreta; cero puede significar que el id no existe.",
      "Varias escrituras que deben ser atómicas requieren transacción: desactiva auto-commit, ejecuta las operaciones, confirma con commit y revierte con rollback si algo falla. No cierres la conexión antes de decidir el resultado."
    ], codigo: `con.setAutoCommit(false);
try {
    // ejecutar varias sentencias relacionadas
    con.commit();
} catch (SQLException ex) {
    con.rollback();
    throw ex;
}` },
    { titulo: "4. Configuración de desarrollo", parrafos: [
      "Instala MySQL o MariaDB y crea la base agenda y la tabla contacto antes de ejecutar los ejemplos. La URL del ejemplo apunta a localhost:3306; cambia puerto y nombre de base si tu instalación usa otros valores.",
      "Los ejemplos aceptan DB_URL, DB_USER y DB_PASSWORD como variables de entorno para no guardar credenciales reales en el código. Usa una cuenta local con permisos mínimos necesarios.",
      "En Eclipse, añade el JAR oficial de Connector/J al proyecto y verifica que el driver y el servidor sean compatibles. Un error de conexión no es un resultado vacío: lee el mensaje SQLState y revisa URL, servicio, permisos y dependencia."
    ] }
  ],
  quiz: [
    { pregunta: "¿Qué devuelve executeQuery?", opciones: ["El número de filas actualizadas", "Un ResultSet de una consulta", "Una Connection nueva", "Un archivo binario"], correcta: 1, explicacion: "executeQuery ejecuta SELECT y devuelve un ResultSet." },
    { pregunta: "¿Qué método corresponde a INSERT, UPDATE y DELETE?", opciones: ["executeUpdate", "executeQuery", "next", "getString"], correcta: 0, explicacion: "executeUpdate devuelve el número de filas afectadas por una modificación." },
    { pregunta: "¿Por qué usar PreparedStatement?", opciones: ["Para interpolar SQL con concatenación", "Para parametrizar valores de forma segura", "Para evitar cerrar conexiones", "Para reemplazar el driver"], correcta: 1, explicacion: "Los parámetros conservan la estructura SQL y evitan concatenar valores directamente." },
    { pregunta: "¿Qué indica ResultSet.next() == false?", opciones: ["Hay otra fila", "No quedan filas", "La conexión se ha confirmado", "La sentencia insertó una fila"], correcta: 1, explicacion: "next avanza el cursor; false indica el final del resultado." },
    { pregunta: "¿Qué responsabilidad tiene el driver JDBC?", opciones: ["Traducir la API JDBC para el motor concreto", "Crear las tablas automáticamente siempre", "Sustituir SQL", "Cerrar Eclipse"], correcta: 0, explicacion: "El conector implementa JDBC para comunicarse con el motor, y debe añadirse al proyecto." },
    { pregunta: "¿Cómo se deben cerrar Connection y PreparedStatement?", opciones: ["Dejarlos abiertos", "Con try-with-resources", "Con System.gc()", "Solo si la consulta devuelve cero filas"], correcta: 1, explicacion: "try-with-resources los cierra incluso si se produce una excepción." },
    { pregunta: "¿Qué significa que UPDATE afecte cero filas?", opciones: ["Siempre hubo un error de sintaxis", "Puede que el id no exista o no haya cambios", "La base se borró", "Hay una fila necesariamente"], correcta: 1, explicacion: "El recuento debe interpretarse según el resultado esperado y el esquema." },
    { pregunta: "¿Cuándo usar una transacción?", opciones: ["Para agrupar varias escrituras que deben confirmarse o revertirse juntas", "Para mostrar texto", "Para ordenar un array", "Para reemplazar PreparedStatement"], correcta: 0, explicacion: "La transacción mantiene atomicidad cuando varias modificaciones forman una sola operación lógica." }
  ]
};
const ejerciciosJDBC = window.CONTENIDO["bbdd"].ejercicios;
const solucionesJDBC = window.CONTENIDO["bbdd"].soluciones;
const explicacionesSolucionesJDBC = window.CONTENIDO["bbdd"].explicacionesSoluciones;
if (ejerciciosJDBC.length !== solucionesJDBC.length || ejerciciosJDBC.length !== explicacionesSolucionesJDBC.length) {
  throw new Error("Cada ejercicio JDBC debe tener una solución y su explicación.");
}
ejerciciosJDBC.forEach((ejercicio, indice) => {
  ejercicio.solucion = solucionesJDBC[indice];
  ejercicio.explicacion = explicacionesSolucionesJDBC[indice];
});
delete window.CONTENIDO["bbdd"].soluciones;
delete window.CONTENIDO["bbdd"].explicacionesSoluciones;
