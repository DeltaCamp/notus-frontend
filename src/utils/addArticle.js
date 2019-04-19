export function addArticle(noun) {
  if (!noun) { return '' }
  const firstLetter = noun.charAt(0)
  const startsWithVowel = /[aeiou]/i.test(firstLetter)

  return startsWithVowel ? `an ${noun}` : `a ${noun}`
}