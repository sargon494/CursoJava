window.EXPLICACION = window.EXPLICACION || {};
window.EXPLICACION["herencia"] = [
  {
    pista: "Busca qué parte del cálculo es igual para todos los vehículos y qué parte cambia según el tipo. La parte que cambia es un buen candidato a método abstract.",
    razonamiento: [
      "Vehiculo declara calcularCostoDeUso como abstract porque no sabe calcularlo: cada tipo de vehículo tiene su fórmula. Camion y Autobus heredan la matrícula por medio de super(m) y cada uno aporta su propia implementación.",
      "La parte interesante está en el bucle. La lista es de tipo List<Vehiculo>, así que la variable v puede apuntar a un Camion o a un Autobus, y la llamada v.calcularCostoDeUso(100) ejecuta la versión del objeto real. Esto es polimorfismo: el bucle no necesita ningún if para saber qué fórmula aplicar.",
      "Un error frecuente es olvidar que un método abstract no tiene cuerpo. La subclase debe implementarlo con la misma firma, y el @Override ayuda a detectar un nombre mal escrito. Si mañana añades una Moto, solo escribes su clase y el bucle sigue igual."
    ]
  },
  {
    pista: "Piensa si el cálculo anual es distinto para cada tipo de empleado o si siempre sale de la misma regla aplicada al salario mensual.",
    razonamiento: [
      "Cada tipo de empleado calcula su salario mensual de forma distinta: la jornada completa suma un plus por antigüedad y el empleado por horas multiplica tarifa por horas. Por eso salarioMensual() es abstract y cada subclase lo implementa.",
      "El salario anual es igual para todos: salarioMensual() * 12. La solución lo escribe una sola vez en Empleado y lo llama sin saber qué clase concreta es. Dentro del método del padre, la llamada a salarioMensual() también se resuelve en tiempo de ejecución, así que se usa la versión de la hija.",
      "Si en el futuro algunos empleados cobraran 14 pagas, bastaría con sobrescribir salarioAnual() solo en esa clase. Arrays.asList crea una lista de tamaño fijo, que es suficiente aquí porque no se añaden elementos después."
    ]
  },
  {
    pista: "Una interfaz define qué debe saber hacer cada figura. Cada clase decide cómo calcularlo, y para el total basta con recorrer la lista usando la interfaz como tipo.",
    razonamiento: [
      "FiguraGeometrica solo declara area() y perimetro(). Círculo, Rectángulo y Triángulo implementan la interfaz, cada uno con sus fórmulas. Así una lista de FiguraGeometrica puede contener cualquier figura y calcular el área total sin conocer el tipo concreto.",
      "Los métodos que implementan una interfaz deben ser public, aunque en la interfaz no se escriba. Si se dejan sin modificador, el compilador da error porque se reduciría la visibilidad. El constructor valida los datos y lanza IllegalArgumentException para que no exista una figura imposible.",
      "El triángulo necesita comprobar la desigualdad triangular: cada lado debe ser menor que la suma de los otros dos. El área se calcula con la fórmula de Herón, usando el semiperímetro s = perímetro / 2. La suma final usa mapToDouble(FiguraGeometrica::area).sum(), que aplica area() a cada elemento de la lista."
    ]
  },
  {
    pista: "Piensa qué tienen en común electrónicos y alimentos (nombre y precio) y dónde conviene poner la regla de ordenación para que valga para todos.",
    razonamiento: [
      "La interfaz Producto define el contrato (nombre y precio). ProductoBase implementa esa interfaz y Comparable, de modo que el orden por precio se escribe una sola vez. Electronico y Alimento solo heredan el comportamiento, por lo que basta con llamar a super(n, p).",
      "compareTo compara primero por precio y, si empatan, por nombre. Se usa Double.compare porque devuelve un entero negativo, cero o positivo, que es lo que exige compareTo. Con Collections.sort(productos), la lista queda ordenada de menor a mayor precio.",
      "El constructor rechaza nombres vacíos y precios negativos, así que ningún objeto de la lista puede romper el orden. Para ordenar de mayor a menor bastaría invertir la comparación o usar Comparator.reverseOrder()."
    ]
  },
  {
    pista: "Cuando recorres una lista y quieres quitar algunos elementos, piensa qué herramienta permite hacerlo sin romper el recorrido.",
    razonamiento: [
      "Unidad es la clase abstracta común: guarda el nombre y la salud, y define ataque() como abstract. Tanque, Avion y Barco fijan su salud inicial y su ataque. En el enunciado la clase base aparece como VehiculoCombate; el nombre no cambia la lógica.",
      "Ejercito limita la lista a cinco unidades en anadir, comprobando el tamaño antes de añadir. atacar resta al objetivo el ataque del atacante a través de recibir(), que nunca deja la salud por debajo de cero. repararDestruidos devuelve la salud de las unidades destruidas a 100.",
      "Para eliminar las destruidas, la solución usa un Iterator y su método remove(). Si se intentara llamar a unidades.remove() dentro de un for-each, Java lanzaría ConcurrentModificationException porque la lista cambiaría durante el recorrido. El iterador hace el borrado de forma segura."
    ]
  },
  {
    pista: "Piensa qué método es el que cambia según el tipo de guerrero y cómo el equipo puede llamarlo sin conocer la clase concreta.",
    razonamiento: [
      "Warrior es abstract y declara attack(). Knight, WhiteMage, DarkMage y Orc fijan su vida y su ataque. El equipo guarda una lista de Warrior, así que miembros.get(i).attack() ejecuta el ataque propio de cada miembro sin ningún if.",
      "anadir rechaza un sexto miembro y también un guerrero que ya está en el equipo. La comprobación con contains() usa equals(); como Warrior no lo sobrescribe, equals compara referencias, y por eso el mismo objeto no puede entrar dos veces.",
      "atacar(i, objetivo) reduce la vida del objetivo con recibir(), que usa Math.max(0, vida - d) para no bajar de cero. Si quisieras que los magos blancos curaran en lugar de atacar, sobrescribirías attack() en WhiteMage o añadirías un método nuevo en la jerarquía."
    ]
  },
  {
    pista: "Piensa qué parte de un producto cambia según su tipo y qué parte se calcula igual para todos. Una plantilla en el padre puede llamar a un método que cada hija define.",
    razonamiento: [
      "Producto es abstract y declara iva() como método abstracto, porque el tipo impositivo depende de la clase. precioFinal() está escrito una sola vez en el padre: aplica precio * (1 + iva()). Así el cálculo del precio final es común y solo cambia el porcentaje.",
      "Perecedero usa un 4 % y Electronico un 21 %. Cuando main llama a p.precioFinal() sobre un objeto de la lista, la llamada a iva() se resuelve en tiempo de ejecución y devuelve el porcentaje de la subclase real.",
      "El constructor del padre comprueba que el precio no sea negativo, de modo que las dos subclases heredan la validación sin repetirla. Si añadieras un tipo de producto exento de IVA, solo tendrías que devolver 0 en su iva()."
    ]
  },
  {
    pista: "Separa lo que es igual para todos los materiales (prestar, devolver) de lo que cambia (el plazo). Piensa también qué excepción conviene lanzar cuando el estado del objeto no permite la operación.",
    razonamiento: [
      "Material es abstract con plazoDias() abstracto, porque Libro (21 días) y Revista (7 días) tienen plazos distintos. prestar() y devolver() están en el padre, porque la lógica del préstamo es la misma para todos y solo depende del campo prestado.",
      "Las dos operaciones comprueban el estado antes de cambiarlo. Si ya está prestado, prestar() lanza IllegalStateException; si no lo está, devolver() hace lo mismo. Se usa IllegalStateException porque el argumento es correcto y lo que falla es el estado del objeto.",
      "En main, Arrays.asList crea una lista de Material con libros y revistas. El bucle presta, muestra el plazo que corresponde a cada objeto y devuelve, sin preguntar en ningún momento de qué clase es."
    ]
  },
  {
    pista: "Piensa qué significa que dos vehículos sean iguales. Si la igualdad debe ignorar algunos detalles, como mayúsculas, convendría normalizar el dato al crear el objeto.",
    razonamiento: [
      "equals y hashCode se escriben en Vehiculo, la clase base, para que Coche y Moto los hereden. equals recibe un Object, comprueba con instanceof que el otro también es un Vehiculo y compara las matrículas. La firma debe ser equals(Object); si se escribiera equals(Vehiculo) sería una sobrecarga y no una sobrescritura.",
      "La matrícula se pasa a mayúsculas en el constructor, por eso «1234abc» y «1234ABC» son el mismo vehículo. hashCode usa la misma matrícula con Objects.hash, así que dos objetos iguales producen el mismo hash, como exige el contrato. Como la matrícula es final, el hash no cambia mientras el objeto está en un HashSet.",
      "Aquí la igualdad depende solo de la matrícula, así que un Coche y una Moto con la misma matrícula son iguales. Es una decisión de dominio: si quisieras distinguirlos, tendrías que añadir el tipo a la comparación. Coche y Moto solo añaden su toString propio."
    ]
  },
  {
    pista: "Varias cuentas comparten la misma operación de retirada, pero cada una cobra una comisión distinta. Piensa cuál de los métodos debe ser abstract y cuál puede quedar en el padre.",
    razonamiento: [
      "Cuenta es abstract y declara comisionMensual() como método abstracto. ingresar(), retirar() y liquidar() están en el padre porque su lógica es común y solo llaman a comisionMensual(). Corriente cobra 5, Vivienda 1 y FondoInversion el 1 % del saldo, calculado en el momento de la llamada.",
      "retirar() calcula la comisión antes de restar, y comprueba que cantidad + comisión no supere el saldo. Si la operación no es válida devuelve false en lugar de lanzar una excepción. Ingresar, en cambio, lanza IllegalArgumentException para importes no positivos. Ambas formas sirven, pero conviene mantener un criterio uniforme en la clase.",
      "liquidar() descuenta la comisión sin dejar el saldo negativo, usando Math.max(0, ...). Si quisieras que una cuenta no pudiera quedar en descubierto, la comprobación debería hacerse en retirar(), antes de modificar el saldo."
    ]
  },
  {
    pista: "Un triángulo solo existe si sus lados cumplen una condición, y la clasificación depende de cuántos lados iguales tiene. Piensa también cómo formatear la salida con dos decimales sin que dependa del idioma del ordenador.",
    razonamiento: [
      "Figura2D es abstract y obliga a implementar perimetro(). Triangulo guarda los tres lados y el constructor comprueba la desigualdad triangular: cada lado debe ser menor que la suma de los otros dos. Así no puede existir un triángulo imposible.",
      "tipo() clasifica el triángulo en equilátero, isósceles o escaleno comparando los lados con ==. Esto funciona porque los valores son los que escribió el usuario. Si los lados fueran resultados de cálculos con decimales, conviene comparar con una tolerancia, por ejemplo Math.abs(a - b) < 1e-9.",
      "toString usa String.format con Locale.ROOT para que el separador decimal sea el punto en cualquier configuración regional, y con %.2f muestra dos decimales. Sin ese Locale, un ordenador configurado en español podría mostrar una coma y el resultado sería distinto del esperado."
    ]
  }
];
