export function debugLog(message: string) {
    const debugArea = document.querySelector<HTMLDivElement>('#debug-output');
    if (debugArea) {
      const timestamp = new Date().toLocaleTimeString();
      debugArea.innerHTML += `[${timestamp}] ${message}<br>`;
      debugArea.scrollTop = debugArea.scrollHeight;
    }
  }