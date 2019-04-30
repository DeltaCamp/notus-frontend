const classes = [
  'is-link',
  'is-dark',
  'is-danger',
  'is-info',
  'is-purple'
  // 'is-info',
  // 'is-pink',
  // 'is-primary',
]

export const brandColor = (id) => {
  return classes[id % classes.length]
}
