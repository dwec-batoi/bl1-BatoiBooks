# Bloc 1: Javascript. UT 6: Eventos
## Práctica 6.1 - BatoiBooks interactivo
Nuestra aplicación ya tiene cierta interactividad porque tenemos escuchadores para el formulario y el botón de eliminar libro pero ahora vamos a mejorar esto. Lo haremos usando una nueva rama de git.

Para permitir al usuario interactuar más fácilmente con la aplicación vamos a añadir unos botones con iconos para realizar diferentes tareas.

Vamos a usar los [iconos de Material Design](https://google.github.io/material-design-icons/) de Google para lo que debemos enlazar la librería añadiendo al _head_ de nuestro _index.html_ la línea:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

No es lo más recomendable ya que estamos cargando todos los iconos (varios cientos de MB) cuando sólo necesitaremos unos pocos pero por ahora vamos a hacerlo así por comodidad.

Una vez hecho, donde queramos añadir un icono sólo es necesario añadir una etiqueta `<span>` con la clase '**material-icons**' que contenga el nombre del icono. Por ejemplo para añadir el icono de una cara (el icono se llama _face_) pondremos:
```html
<span class="material-icons">face</span>
```

En la página de Material Design podemos ver cómo cambiar el estilo o el tamaño de los iconos.

Nosotros los incluiremos dentro de botones, por lo que su HTML será:
```html
<button>
    <span class="material-icons">face</span>
</button>
```

Lo primero que haremos es eliminar el botón para borrar libros que tenemos antes del formulario porque vamos a incluir 3 botones en la parte inferior de cada libro para:
- añadir el libro al carrito (icono *add_shopping_cart*): para añadir el libro al carrito de la compra
- modificar el libro (icono _edit_): servirá para editar el libro en el formulario que tenemos
- eliminar el libro (icono _delete_): para eliminar el libro

### Eliminar libro
Al pulsar sobre el icono de _eliminar libro_ se nos pedirá confirmación mostrando la id y el módulo del libro y a continuación se eliminará como ya hacíamos.

### Añadir al carrito
Para gestionar el carro de compra crearemos una nueva clase que se llamará `Cart` similar a la de libros: sólo tendrá la propiedad `data` que se inicializará a un array vacío en el constructor. Tendrá los métodos:
- `populateData`: por ahora no hará nada
- `getBookById`: recibe una _id_ y devuelve el libro del carrito con esa _id_ o {} si no existe
- `addItem`: recibe un objeto de tipo `Book` del que hace una copia y lo añade al `data`. Si ya estuviera lanza un error
- `removeItem`: recibe una _id_ y borra del carrito el libro con esa _id_. Si no estuviera lanza un error
- `toString`: muestra información de los libros del carrito

Modificaremos el controlador para que tenga también un carrito y al inicializarlo llamará también al `populateData` del carrito.

Y ahora ya, el botón de añadir al carrito añadirá el libro al carrito y mostrará un mensaje diciendo que se ha añadido.

### Editar libro
Este icono "carga" el libro en el formulario que tenemos para poderlo editar. Para utilizar este formulario tanto para añadir como para editar libros haremos unos cambios en el HTML del formulario dentro del `main.js`:
- vamos a ponerle un título, que será 'Añadir libro'
- vamos a crear otro DIV de texto para poner la id del libro, pero este DIV estará oculto. Lo pondremos al principio, antes del SELECT

Cuando el usuario pulse el botón de editar lo que debe pasar es:
- cambia el título del formulario a 'Editar libro'
- cambia el texto del botón 'Añadir' a 'Cambiar'
- se muestra el DIV de la id pero deshabilitado
- se completan todos los INPUT del formulario con los datos del libro

¿Quién será el responsable de hacer esos cambios?

Y ahora el formulario sirve tanto para añadir como para editar por lo que el manejador de su `submit` en el controlador deberá saber qué quiere hacerse y obrar en consecuencia.

Tras modificarse el libro se vacía el formulario y vuelve a quedarse preparado para añadir. Lo mismo pasará al ir desde el menú a 'Añadir libro'.

Para modificar un libro necesitaremos añadir un nuevo método en la clase `Books` y para renderizarlo otro en la _vista_.

## Ejercicio 6.2 - SPA
Vamos a hacer que no aparezcan a la vez todas las páginas de nuestra aplicación. Para ello podríamos usar una librería de _router_ que se encargara de ello de una forma sencilla pero en vez de eso vamos a construir nuestro propio router.

Lo primero necesitaremos una forma de ocultar o mostrar cosas. Para ello usaremos CSS y crearemos una regla para que se oculten los elementos con la clase `hidden` poniendo su propiedad `display` a **none**. 

Una vez tenemos claro cómo ocultar elementos necesitamos enterarnos de que el usuario quiere navegar a otra página. Para ello podríamos poner escuchadores a los enlaces del formulario pero va a ser más sencillo poner un escuchador para cuando cambia el _hash_ de la URL con el evento `hashchange` de `window`.