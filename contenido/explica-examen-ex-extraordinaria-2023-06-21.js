window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["ex-extraordinaria-2023-06-21"] = [
  {
    pista: "Antes de programar, define la jerarquía: una clase base abstracta con los datos comunes, tres subclases con su dato propio y una interfaz para la gestión del juego.",
    razonamiento: [
      "Personaje es abstracta. Lo común a magos, caballeros y orcos (id, nombre, salud y ataque) vive en la base, y cada subclase añade lo suyo: hechizos, lanza u horda. El ataque se modela con un enum Ataque en el que cada constante lleva su daño: ALTO 3, MEDIO 2 y BAJO 1. Así el daño es un dato del tipo y no un número repetido por el código.",
      "La salud nunca baja de 0. recibeDanio usa Math.max(0, salud - danio), y el constructor también acota la salud inicial. estaVivo se define como salud > 0, y ataca comprueba que ambos personajes estén vivos antes de aplicar el daño.",
      "GestionJuego es la interfaz con los cuatro métodos pedidos, y GestorJuego la implementa con un LinkedHashMap indexado por id. anyade devuelve false si el id ya existe; obten devuelve null si no existe; borraPersonaje usa el valor de retorno de remove. ataca devuelve false si falta alguno de los personajes, si atacante y atacado son el mismo o si alguno está muerto.",
      "resucitar es static dentro de Personaje y recibe una Collection<? extends Personaje>. El comodín permite pasar una lista de Personaje o de una subclase. Como el método está dentro de la clase, puede acceder al campo privado salud de cualquier Personaje, no solo al suyo. Revive a los muertos con la salud indicada y lanza IllegalArgumentException si esa salud no es positiva.",
      "El examen evalúa la herencia con constructores que llaman a super, los enums con atributos, las interfaces y los métodos static. Un fallo común es modificar salud desde fuera de la clase, algo que no compila porque el campo es private. La forma correcta es pasar por un método como recibeDanio o por resucitar."
    ]
  }
];
