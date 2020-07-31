function formatTime() {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()

  return [y, m, d].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(num) {
  num = num.toString()
  return num[1] ? num: '0' + num
}

module.exports = {
  formatTime: formatTime
}