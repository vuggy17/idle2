export function throwIfAborted(abort?: AbortSignal) {
  if (abort?.aborted) {
    throw new Error(abort.reason);
  }
  return true;
}

export const MANUALLY_STOP = 'manually-stop';

export function isEmptyUpdate(binary: Uint8Array) {
  return (
    binary.byteLength === 0 ||
    (binary.byteLength === 2 && binary[0] === 0 && binary[1] === 0)
  );
}
