export function debugLog(...messages: any[]) {
  const debugArea = document.querySelector<HTMLDivElement>("#debug-output");
  if (debugArea) {
    const timestamp = new Date().toLocaleTimeString();
    const combinedMessage = messages
      .map((msg) =>
        typeof msg === "object" ? JSON.stringify(msg) : String(msg),
      )
      .join(" ");
    debugArea.innerHTML += `[${timestamp}] ${combinedMessage}<br>`;
    debugArea.scrollTop = debugArea.scrollHeight;
  }
}
