import './style.css'
import { setupCounter } from './counter.ts'
import { textbox } from './textbox.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Voicevox Cognitive Shuffle</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <input type="text" id="textInput" placeholder="テキストを入力" />
      <button id="submitText" type="button">送信</button>
    </div>
    <div id="debug-output" class="debug-area"></div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
textbox(document.querySelector<HTMLButtonElement>('#submitText')!, document.querySelector<HTMLButtonElement>('#textInput')!)

