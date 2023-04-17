export const formatLink = (text: string) => {
  return text
    .trim()
    .replaceAll('/', '')
    .replaceAll('%', 'per')
    .replaceAll('& ', '')
    .replaceAll(' ', '-')
    .toLowerCase()
}
