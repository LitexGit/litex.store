export function dateFormat (date) {
  const year =
    date.getYear() % 100 > 9
      ? (date.getYear() % 100).toString()
      : '0' + (date.getYear() % 100)
  const month =
    date.getMonth() > 9
      ? (date.getMonth() + 1).toString()
      : '0' + (date.getMonth() + 1)
  const day =
    date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate()
  let formattedDate = day + '/' + month + '/' + year
  return formattedDate
}

export function timeFormat (date) {
  const hours =
    date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours()
  const minutes =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes()
  const seconds =
    date.getSeconds() > 9
      ? date.getSeconds().toString()
      : '0' + date.getSeconds()
  let formattedTime = hours + ':' + minutes + ':' + seconds
  return formattedTime
}
