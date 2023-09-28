import './style.css'
import batoiLogo from '/logoBatoi.png'
import data from './datos'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="http://www.cipfpbatoi.es" target="_blank">
      <img src="${batoiLogo}" class="logo" alt="CIP FP Batoi" />
    </a>
    <p class="read-the-docs">
      Abre la consola (F12)
    </p>
  </div>
`
