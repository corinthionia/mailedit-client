export const copyTextToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('클립보드에 복사되었습니다.');
  } catch {
    alert('링크 복사에 실패했습니다.\n다시 시도해 주세요.');
  }
};
