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

export function getIconImgName (type, available) {
  switch (Number(type)) {
    case 2:
      return available ? 'img:statics/life/dianfei.png' : 'img:statics/life/dianfei-unavailable.png'
    case 1:
      return available ? 'img:statics/life/shuifei.png' : 'img:statics/life/shuifei-unavailable.png'
    case 3:
      return available ? 'img:statics/life/ranqifei.png' : 'img:statics/life/ranqifei-unavailable.png'
    default:
      return available ? 'img:statics/life/dianfei.png' : 'img:statics/life/dianfei-unavailable.png'
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

/**
 * 数据 按照 拼音首字母 排序 并分组
 *
 * @param {Json} data ; 需要 排序的 数据
 * @param {String} field ；必须；排序所依据的 字段 名
 *
 * @return {Json} ; 例如：{A:[{},{}],B:[{},{}],C:[{}],#:[]}
 */
export function dataLetterSort (data, field) {
  var letterReg = /^[A-Z]$/
  var list = []
  let letter
  for (var i = 0; i < data.length; i++) {
    // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
    list['#'] = []
    // 首字母 转 大写英文
    letter = (data[i][field]).substr(0, 1).toUpperCase()
    // 是否 大写 英文 字母
    if (!letterReg.test(letter)) {
      letter = '#'
    }
    // 创建 字母 分组
    if (!(letter in list)) {
      list[letter] = []
    }
    // 字母 分组 添加 数据
    list[letter].push(data[i])
  }
  // 转换 格式 进行 排序；
  var result = []
  for (var key in list) {
    result.push({
      letter: key,
      list: list[key]
    })
  }
  result.sort(function (x, y) {
    return x.letter.charCodeAt(0) - y.letter.charCodeAt(0)
  })
  // # 号分组 放最后
  var lastArr = result[0]
  result.splice(0, 1)
  result.push(lastArr)

  // 转换 数据 格式
  var jsonSort = {}
  let cityGroups = []
  for (let i = 0; i < result.length; i++) {
    jsonSort[result[i].letter] = result[i].list
    if (result[i].letter !== '#') {
      let cityGroup = {}
      cityGroup.word = result[i].letter
      cityGroup.cities = result[i].list
      cityGroups.push(cityGroup)
    }
  }

  // return jsonSort
  return cityGroups
}
