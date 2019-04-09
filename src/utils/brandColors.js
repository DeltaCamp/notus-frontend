const classes = [
  'is-link',
  'is-info',
  'is-fun',
  'is-primary',
  'is-purple',
  'is-success',
  'is-danger',
  'is-warning'
]

export const brandColor = (id) => {
  return classes[id % classes.length]
}

export const altBrandColor = (id) => {
  id = (id + 2)
  return classes[id % classes.length]
}
