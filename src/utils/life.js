export function getIconName (type) {
  switch (Number(type)) {
    case 2:
      return '#icon-bolt'
    case 1:
      return '#icon-waterdrop'
    case 3:
      return '#icon-ranqifei'
    default:
      return '#icon-bolt'
  }
}

export function getTypeName (type) {
  switch (Number(type)) {
    case 2:
      return '电费'
    case 1:
      return '水费'
    case 3:
      return '燃气费'
    default:
      return '电费'
  }
}
