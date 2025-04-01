export function textbox(submitText: HTMLButtonElement, textInput: HTMLButtonElement) {
  submitText.addEventListener('click', () => {
    const input = textInput
    alert(`入力されたテキスト: ${input.value}`)
  })
}

