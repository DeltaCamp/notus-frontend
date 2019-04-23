const classes = [
  'is-link',
  'is-success',
  'is-purple',
  'is-info',
  'is-pink',
  'is-warning',
  // 'is-danger',
  // 'is-primary',
]

export const brandColor = (id) => {
  return classes[id % classes.length]
}

export const altBrandColor = (id) => {
  id = (id + 2)
  return classes[id % classes.length]
}
