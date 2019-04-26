const classes = [
  'is-link',
  // 'is-success',
  'is-warning',
  'is-purple',
  // 'is-info',
  'is-pink',
  // 'is-danger',
  // 'is-primary',
]

export const brandColor = (id) => {
  return classes[id % classes.length]
}