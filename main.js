import './style.css'
import batoiLogo from '/logoBatoi.png'
import Controller from './src/controller/controller.class'

document.querySelector('#app').innerHTML = `
  <header>
  <a href="http://www.cipfpbatoi.es" target="_blank">
    <img src="${batoiLogo}" class="logo" alt="CIP FP Batoi" />
  </a>
  <h1>
    BatoiBooks
  </h1>
  </header>
  <nav>
  <ul>
    <li><a href="#list">Ver Libros</a></li>
    <li><a href="#form">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
  </nav>
  <div id="messages"></div>
  <div>
  <div id="list"></div>
  <div id="form">
    <form id="bookForm">
      <legend>Añadir libro</legend>
      <div>
        <label for="id">Id:</label>
        <input type="text" id="id"><br>
      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module">
          <option>- Selecciona un módulo -</option>
        </select><br>
      </div>
    
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher"><br>
      </div>
    
      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price"><br>
      </div>
    
      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages"><br>
      </div>
    
      <div>
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <input type="radio" name="status" value="good">Bueno</br>
        <input type="radio" name="status" value="good">Bueno</br>
        <input type="radio" name="status" value="bad">Malo</br>
      </div>
    
      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
      </div>
    
      <button type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>        
  </div>
  <div id="about">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit totam, adipisci iste ducimus id voluptatum voluptatem aut ea vel aperiam magnam officiis non officia tempora dicta veritatis nihil doloremque fugit!</div>
  </div>
  <footer>Juan Segura - DWEC</footer>
`
//console.log('pintado')
document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})