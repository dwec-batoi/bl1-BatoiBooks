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
  <div id="form" class="hidden">
    <form id="bookForm" novalidate>
      <legend>Añadir libro</legend>
      <div class="hidden">
        <label for="id">Id:</label>
        <input type="text" id="id" disabled><br>
        <span class="error"></span>
      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" required>
          <option value="">- Selecciona un módulo -</option>
        </select><br>
        <span class="error"></span>
      </div>
    
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required><br>
        <span class="error"></span>
      </div>
    
      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" required min="0" step="0.01"><br>
        <span class="error"></span>
      </div>
    
      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required min="0"><br>
        <span class="error"></span>
      </div>
    
      <div>
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <input type="radio" name="status" value="new" required>Nuevo</br>
        <input type="radio" name="status" value="good">Bueno</br>
        <input type="radio" name="status" value="used">Usado</br>
        <input type="radio" name="status" value="bad">Malo</br>
        <span class="error"></span>
      </div>
    
      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
        <span class="error"></span>
      </div>
    
      <button type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>        
  </div>
  <div id="about" class="hidden">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit totam, adipisci iste ducimus id voluptatum voluptatem aut ea vel aperiam magnam officiis non officia tempora dicta veritatis nihil doloremque fugit!</div>
  </div>
  <footer>Juan Segura - DWEC</footer>
`
//console.log('pintado')
document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})