let idCounter = 0

export default function uniqueId(prefix: string) {
  const id = ++idCounter
  return prefix.toString() + id
}