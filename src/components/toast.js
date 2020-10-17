export default ({message, color = ''}) => {
    const snackbar = document.createElement('div')
    snackbar.classList.add('snackbar')
    snackbar.classList.add('show')
    snackbar.style.backgroundColor = color
    snackbar.innerText = message
    document.body.appendChild(snackbar)
    setTimeout(() => {
        snackbar.classList.remove('show')
    }, 4000)
}