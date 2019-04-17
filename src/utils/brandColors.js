const classes = [
  'is-link',
  'is-success',
  'is-purple',
  'is-fun',
  'is-info',
  'is-danger',
  'is-warning',
  'is-primary',
]

export const brandColor = (id) => {
  return classes[id % classes.length]
}

export const altBrandColor = (id) => {
  id = (id + 2)
  return classes[id % classes.length]
}
