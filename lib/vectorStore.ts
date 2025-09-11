export let chunks: string[] = []

export function addChunk(text: string) {
  chunks.push(text)
}

export function getAllChunks() {
  return chunks
}
