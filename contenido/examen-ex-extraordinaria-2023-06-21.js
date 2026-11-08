window.CONTENIDO = window.CONTENIDO || {};
window.CONTENIDO["ex-extraordinaria-2023-06-21"] = {
  ejercicios: [
    {
      enunciado: `Ejercicio 1 (Convocatoria extraordinaria, 21/06/23)
Se desea crear un juego de rol, dicho juego se desarrollará mediante una aplicación en Java y en varias fases. En la primera fase se desea llevar a cabo la gestión de creación y guardado de los distintos tipos de personajes que se pueden utilizar.
Se dispone de tres tipos de personajes (mago, caballero, orco). De todos ellos se precisa guardar un identificador único, nombre, salud, ataque (alto, medio y bajo). Hay que tener en cuenta que un ataque alto quita 3 puntos de vida, uno medio quita 2 puntos de vida y uno bajo quita 1 punto de vida. De los magos se desea guardar el total de hechizos, de los caballeros si dispone de lanza y de los orcos el nombre de la horda a la que pertenecen. (2 puntos)
Para la clase que tenga las funcionalidades de gestión del juego, es necesario que implemente la siguiente interface (1 punto):
- public boolean anyade(Personaje obj) (1 punto)
- public boolean ataca(String idAtacante, String idAtacado) (2 puntos)
- public Personaje obten(String id) (1 punto)
- public boolean borraPersonaje(String id) (1 punto)
Se piden también los siguientes métodos estáticos dentro de la clase Personaje:
- Resucitar a todos los personajes muertos con un nivel de salud dado como parámetro. (2 puntos)
Observaciones:
- Si la aplicación no compila, no se corregirá el examen.
- Los alumnos/as que tengan sólo la segunda evaluación deberán realizar el mismo examen pero utilizando, únicamente, estructuras estáticas.`,
      solucion: `import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class PersonajesJuegoRol {

    public static void main(String[] args) {
        GestorJuego juego = new GestorJuego();
        juego.anyade(new Mago("M1", "Merlín", 5, Ataque.ALTO, 12));
        juego.anyade(new Caballero("C1", "Arturo", 4, Ataque.MEDIO, true));
        juego.anyade(new Orco("O1", "Grommash", 3, Ataque.BAJO, "Horda Negra"));

        juego.ataca("C1", "O1"); // medio: 2 puntos, el orco queda con 1
        juego.ataca("O1", "M1"); // bajo: 1 punto, el mago queda con 4
        juego.ataca("M1", "O1"); // alto: 3 puntos, el orco muere
        System.out.println(juego.obten("O1"));

        Personaje.resucitar(juego.todos(), 2);
        System.out.println(juego.obten("O1"));
    }
}

enum Ataque {
    ALTO(3), MEDIO(2), BAJO(1);

    private final int danio;

    Ataque(int danio) {
        this.danio = danio;
    }

    int getDanio() {
        return danio;
    }
}

abstract class Personaje {
    private final String id;
    private final String nombre;
    private int salud;
    private final Ataque ataque;

    protected Personaje(String id, String nombre, int salud, Ataque ataque) {
        this.id = id;
        this.nombre = nombre;
        this.salud = Math.max(0, salud);
        this.ataque = ataque;
    }

    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public int getSalud() {
        return salud;
    }

    public Ataque getAtaque() {
        return ataque;
    }

    public boolean estaVivo() {
        return salud > 0;
    }

    void recibeDanio(int danio) {
        salud = Math.max(0, salud - danio);
    }

    // Devuelve a la vida con la salud indicada a todos los personajes muertos.
    static void resucitar(Collection<? extends Personaje> personajes, int saludInicial) {
        if (saludInicial <= 0) {
            throw new IllegalArgumentException("La salud debe ser positiva");
        }
        for (Personaje p : personajes) {
            if (!p.estaVivo()) {
                p.salud = saludInicial;
            }
        }
    }

    @Override
    public String toString() {
        return String.format("%s[id=%s, nombre=%s, salud=%d, ataque=%s]",
                getClass().getSimpleName(), id, nombre, salud, ataque);
    }
}

class Mago extends Personaje {
    private final int hechizos;

    Mago(String id, String nombre, int salud, Ataque ataque, int hechizos) {
        super(id, nombre, salud, ataque);
        this.hechizos = hechizos;
    }

    public int getHechizos() {
        return hechizos;
    }
}

class Caballero extends Personaje {
    private final boolean lanza;

    Caballero(String id, String nombre, int salud, Ataque ataque, boolean lanza) {
        super(id, nombre, salud, ataque);
        this.lanza = lanza;
    }

    public boolean tieneLanza() {
        return lanza;
    }
}

class Orco extends Personaje {
    private final String horda;

    Orco(String id, String nombre, int salud, Ataque ataque, String horda) {
        super(id, nombre, salud, ataque);
        this.horda = horda;
    }

    public String getHorda() {
        return horda;
    }
}

interface GestionJuego {
    boolean anyade(Personaje obj);

    boolean ataca(String idAtacante, String idAtacado);

    Personaje obten(String id);

    boolean borraPersonaje(String id);
}

class GestorJuego implements GestionJuego {
    private final Map<String, Personaje> personajes = new LinkedHashMap<>();

    @Override
    public boolean anyade(Personaje obj) {
        if (obj == null || personajes.containsKey(obj.getId())) {
            return false;
        }
        personajes.put(obj.getId(), obj);
        return true;
    }

    @Override
    public boolean ataca(String idAtacante, String idAtacado) {
        Personaje atacante = personajes.get(idAtacante);
        Personaje atacado = personajes.get(idAtacado);
        if (atacante == null || atacado == null || idAtacante.equals(idAtacado)) {
            return false;
        }
        if (!atacante.estaVivo() || !atacado.estaVivo()) {
            return false;
        }
        atacado.recibeDanio(atacante.getAtaque().getDanio());
        return true;
    }

    @Override
    public Personaje obten(String id) {
        return personajes.get(id);
    }

    @Override
    public boolean borraPersonaje(String id) {
        return personajes.remove(id) != null;
    }

    public List<Personaje> todos() {
        return new ArrayList<>(personajes.values());
    }
}
`
    }
  ]
};
