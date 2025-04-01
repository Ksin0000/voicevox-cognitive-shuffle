import { debugLog } from "./debug.ts";

export function textbox(
  submitText: HTMLButtonElement,
  textInput: HTMLButtonElement,
) {
  submitText.addEventListener("click", async () => {
    const input = textInput;
    debugLog(`入力されたテキスト: ${input.value}`);
    const url = await synthesizeVoice(`${input.value}`);
    const audio = new Audio(url);
    audio.play().catch((err) => {
      debugLog("再生エラー:", err);
    });
  });
}

async function synthesizeVoice(text: string, speaker: number = 1) {
  const url = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=${speaker}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.success) {
      debugLog("音声生成リクエストに失敗しました");
      return;
    }

    debugLog("生成リクエスト成功:", data);

    // ステータスURLから音声生成完了をポーリングで確認
    const isReady = await waitForAudioReady(data.audioStatusUrl);

    if (isReady) {
      debugLog("音声生成完了！MP3ダウンロードURL:", data.mp3DownloadUrl);
      return data.mp3DownloadUrl;
    } else {
      debugLog("音声生成に失敗しました");
    }
  } catch (error) {
    debugLog("通信エラー:", error);
  }
}

async function waitForAudioReady(
  statusUrl: string,
  maxWait: number = 15000,
  interval: number = 1000,
): Promise<boolean> {
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    const res = await fetch(statusUrl);
    const statusData = await res.json();

    if (statusData.success && statusData.isAudioReady) {
      return true;
    }

    if (statusData.isAudioError) {
      debugLog("音声生成エラー:", statusData.status);
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  console.warn("音声生成がタイムアウトしました");
  return false;
}

// 使用例
//synthesizeVoice("こんにちは、今日はいい天気ですね。");
