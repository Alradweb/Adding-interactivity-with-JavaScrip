export default (container) => {
    const box = document.querySelector(container)

    const showImage = (src) => {
        const div = document.createElement('div')
        div.classList.add('modal-img')
        div.style.display = 'block'
        const img = new Image()
        img.src = src
        img.classList.add('modal-img-content')
        div.appendChild(img)
        document.body.appendChild(div)
        document.body.style.overflow = 'hidden'
        div.addEventListener('click', ({target}) => {
            if (target.tagName === 'IMG') return
            div.style.display = 'none'
            document.body.style.overflow = ''
        })
    }

    box.addEventListener('click', (ev) => {
        ev.preventDefault()
        if ((ev.target.tagName) === 'IMG') {
            const src = ev.target.parentNode.getAttribute('href')
            showImage(src)
        }
    })
}