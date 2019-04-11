export const varDescriptionToVarName = (description) => {
  const firstLetter = description.charAt(0).toLowerCase()
  const remainingString = description.replace(/ /g, '').slice(1)

  return `${firstLetter}${remainingString}`
}
