//同步顯示rating改變
const ratingRange = document.querySelector('#ratingRange')
ratingRange.addEventListener('input', () => {
  let rating = document.querySelector('#rating')
  rating.innerHTML = ratingRange.value
})

//透過點擊預覽按鈕顯示圖片
const previewButton = document.querySelector('#previewButton')
previewButton.addEventListener('click', () => {
  console.log(1)
  let previewImage = document.querySelector('#preview')
  let image = document.querySelector('#image')
  previewImage.src = image.value
})

//Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at frontEnd.js: 3: 13 目前沒有影響吧？


