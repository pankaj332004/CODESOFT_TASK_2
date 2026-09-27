/**
 * Formats seconds into human readable "X min Y sec" or "00:00"
 * @param {number} totalSeconds
 * @param {boolean} verbose - if true, returns "5 min 12 sec", else "05:12"
 */
export const formatTime = (totalSeconds = 0, verbose = true) => {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;

  if (verbose) {
    if (mins === 0) {
      return `${remainingSecs} sec`;
    }
    return `${mins} min ${remainingSecs} sec`;
  }

  const mm = String(mins).padStart(2, '0');
  const ss = String(remainingSecs).padStart(2, '0');
  return `${mm}:${ss}`;
};

export default formatTime;
