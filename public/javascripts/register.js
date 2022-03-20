const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
const register = document.querySelector('#register')
const differetPassword = document.querySelector('#differetPassword')

register.addEventListener('click', (event) => {
  if (password.value !== confirmPassword.value) {
    differetPassword.innerHTML = `Password is different!`
    event.preventDefault()
  }

})