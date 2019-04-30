export function getNounArticle (noun) {
  if (!noun) { return '' }

  const firstLetter = noun.charAt(0)
  const startsWithVowel = /[aeiou]/i.test(firstLetter)

  return startsWithVowel ? `an` : `a`
}
