# Bloc 1: Javascript
## Proyecto BatoiBooks
Vamos a hacer una aplicación para vender libros de texto y apuntes entre los estudiantes del CIP FP Batoi. De momento los datos con los que trabaja la aplicación los tenemos en el fichero `datos.js` en una variable llamada `data` que contiene los siguientes campos:
- **families**: array con los distintos departamentos del centro
- **courses**: son los distintos ciclos del centro. El campo _idFamily_ es FK de la tabla _families_
- **modules**: los distintos módulos que se estudian en cada ciclo. El campo _idCourse_ es FK de la tabla _courses_
- **sales**: donde se registran las ventas producidas
- **users**: datos de los usuarios registrados en la aplicación
- **books**: libros y apuntes en venta. Sus campos son:
  - _id_
  - _idUser_: FK de la tabla _users_
  - _idModule_: FK de la tabla _modules_
  - _publisher_: editorial que publica el libro. Si son apuntes su valor es "Apunts"
  - _price_: precio (numérico)
  - _pages_: páginas del libro/apuntes (numérico)
  - _status_: estado del libro que puede tomar uno de los valores "new", "good", "used", "bad". Si es un libro/apuntes digital su valor será "digital"
  - _photo_: ruta a la foto
  - _comments_: comentarios
  - _solDate_: fecha de venta del libro, en formato YYYY-MM-DD. Si aún no está vendido este campo estará en blanco

En las distintas ramas irás encontrando diferentes ejercicios para realizar hasta completar la aplicación. Las ramas que tienes son:
- [**2-Arrays**](./enunciados/2-Arrays.md): mientras aprendemos a trabajar con _arrays_ y a usar _Funtional Programming_ crearemos funciones para trabajar con los datos de nuestra aplicación, especialmente con los libros
- [**3-Clases**](./enunciados/3-Clases.md): mejoraremos la aplicación creando clases para los diferentes objetos de la aplicación
- [**4-DOM**](./enunciados/4-DOM.md): la daremos una interfaz gráfica a la aplicación usando el patrón MVC
- [**6-Events**](./enunciados/6-Events.md): permitiremos al usuario interactuar con nuestra aplicación desde la interfaz gráfica
- **8-Ajax**: trabajaremos la persistencia de los datos
- 