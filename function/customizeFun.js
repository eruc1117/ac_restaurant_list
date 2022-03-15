function predataEdit(array) {
  let list = array.results
  for (let index = 0; index < list.length; index++) {
    //先對資料進行處理，增加sameName作為key，名稱和英文名稱(name and name_en)完全相同value為false，不同為true
    list[index].name === list[index].name_en ?
      list[index].sameName = false :
      list[index].sameName = true
  }
  return list
}
function phoneSet(str) {
  //補充對電話號碼格式的修改，比較符合習慣
  return str.replace(/[\s]/g, '-')
}


function bodyDataEdit(listBody) {
  listBody.name = listBody.name.trim()
  listBody.name_en = listBody.name_en.trim()
  listBody.category = listBody.category.trim()
  listBody.location = listBody.location.trim()
  listBody.description = listBody.description.trim()
  listBody.sameName = listBody.name !== listBody.name_en
  return listBody
}

function createNew(listBody) {
  listBody.id = Number(listBody.id.trim())
  listBody.name = listBody.name.trim()
  listBody.name_en = listBody.name_en.trim()
  listBody.category = listBody.category.trim()
  listBody.location = listBody.location.trim()
  listBody.description = listBody.description.trim()
  listBody.sameName = listBody.name !== listBody.name_en
  return listBody
}



//將模組輸出
module.exports = {
  predataEdit,
  bodyDataEdit,
  createNew,
  phoneSet
}