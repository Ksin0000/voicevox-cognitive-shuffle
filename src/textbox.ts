import { debugLog } from './debug.ts'

export function textbox(submitText: HTMLButtonElement, textInput: HTMLButtonElement) {
  submitText.addEventListener('click', () => {
    const input = textInput
    debugLog(`入力されたテキスト: ${input.value}`);
  })
}
