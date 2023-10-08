# Bloc 1: Javascript. UT 4: Ajax
## Práctica 4.1 - Persistencia en BatoiBooks
Continuando con nuestra aplicación para vender libros de texto y apuntes vamos a conseguir que nuestros datos persistan guardándolos en una base de datos y usando una API para obtenerlos y modificarlos. Por tanto ahora los datos ya NO están en el fichero `datos.js`.

Como aún no tenemos nuestra API de Batoibooks hecha vamos a utilizar la API que proporciona `json-server`, que trabajará con los datos almacenados en el fichero `batoibooks.json` (recordad que esto es del _backside_ y no tiene nada que ver con nuestra aplicación en el _front_ por lo que ni debería estar en nuestro repositorio).

**NOTA**: Fijaos que los usuarios tienen un nuevo campo, `password`, donde se almacenará su contraseña. Por tanto deberemos modificar el constructor de a clase `User` y el código donde lo llamamos. 

Para organizar el código crearemos en _/src_ el directorio `/repositories` y allí haremos un fichero JS para cada tabla del modelo (_users_, _modules_ y _books_) con los métodos necesarios para manipular dicha tabla. Los métodos necesarios serán:
- `getAllXxxx`: devuelve todos los registros de esa tabla. Haremos `getAllUsers`, `getAllModules` y `getAllBooks`
- `getXxxxById` (o _ByCode_ en el caso de los módulos): devuelve el registro cuya _id_ (o _code_) coincide con la pasada como parámetro
- `addXxxx`: recibe un nuevo objeto que añadirá a la tabla
- `removeXxxx`: recibe la _id_ (o _code_) de un nuevo objeto y lo borrará de la tabla
- `changeXxxx`: recibe un objeto que ya existe en la tabla y lo modifica, usando el método PUT

Además de estos 5 métodos que estarán en cada repositorio tendremos alguno más:
- `updateUserPassword` en `users.repository.js`: recibirá la _id_ de un usuario y una contraseña y la modificará en la base de datos
- `updatePriceOfBook` en `books.repository.js`: recibe la _id_ de un libro y un precio y lo modifica

Ahora deberemos modificar nuestras clases para que hagan uso de la API que hemos creado, en concreto:
- los métodos `populateData` no recibirán nada como parámetro sino que obtendrán los datos de la base de datos
- los métodos `addItem` y `removeItem` modificarán los datos en la BBDD y sólo cuando eso se haya producido los cambiarán en el array `data`
- lo mismo para el método `incrementPriceOfbooks`. Además, si no lo habíamos hecho antes, siempre redondearemos el nuevo precio a 2 decimales (pero que siga siendo numérico)
- y ya podemos eliminar los métodos/funciones encargados de obtener la _id_ al añadir un nuevo elemento porque de ello se encargará la BBDD

**REFLEXIÓN**: ¿Qué deberíamos hacer con el resto de métodos (`getItem`, `booksFrom...`, etc)? En principio deberíamos hacer peticiones a la API para obtener esos datos y así asegurarnos que tenemos los últimos datos ya que si otro usuario hace cambios en la BBDD nosotros no nos enteraremos porque sólo leemos los datos al carga la página. Pero por ahora vamos a suponer que sólo nosotros usamos esta aplicación y no habrá más cambios que los que hagamos nosotros, por lo que nuestras clases estarán cargadas con los datos buenos.

En el `main.js` lo que haremos es:
- cargamos los datos de usuarios, módulos y libros en las clases _users_, _modules_ y _books_
- mostramos por consola: 
  - todos los libros del usuario 4
  - todos los libros del módulo 5021 que están en buen estado ("good")
  - incrementa un 10% el precio de los libros del módulo 5025 y muéstralos (ten encuenta que cada vez que ejecutes esto estás incrementando su precio de verdad. Si quieres ten una copia de batoibooks.json y vuelve a ella de vez en cuando)

El resultado debe ser igual al de la práctica anterior:

![consola](img/consolaClases.png)

**MUY IMPORTANTE**: pasa los tests para asegurarte aprobar este ejercicio.
