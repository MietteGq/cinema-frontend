export function formatTime (dateTime) {
  return `${dateTime.split('T')[0]} ${dateTime.split('T')[1].split('\.')[0]}`
}

export function formatDateTime (time) {
  var tmp = time.split('T')[0].split('-')
  return `${tmp[1]}月${tmp[2]}日`
}
export function formatHourSecondTime (time) {
  var tmp = time.split('T')[1].split('\.')[0].split('\:')
  return `${tmp[0]}:${tmp[1]}`
}
