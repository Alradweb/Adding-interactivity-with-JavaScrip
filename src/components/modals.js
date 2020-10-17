import getScrollbarWidth from "../utils/getScrollbarWidth";

const modals = () => {

    let modalIsOpen = false
    let currentModal = null
    let formHasSubmitted = false

    const changeModalStatus = (status) => {
        modalIsOpen = status
    }

    const notifyAboutModalEvent = (event) => {
        if (currentModal && modalIsOpen) {
            currentModal.dispatchEvent(new CustomEvent(event, {
                detail: {modal: currentModal},
                bubbles: true
            }))
        }
    }

    const openModal = modal => {
        if (currentModal) closeModal(currentModal)
        currentModal = modal
        changeModalStatus(true)
        notifyAboutModalEvent('modal-is-open')
        modal.style.display = 'block'
        document.body.style.paddingRight = `${getScrollbarWidth()}px`
        document.body.classList.add('modal-open')
    }

    const closeModal = modal => {
        notifyAboutModalEvent('modal-is-close')
        currentModal = null
        changeModalStatus(false)
        modal.style.display = 'none'
        document.body.classList.remove('modal-open')
        document.body.style.paddingRight = ''
    }

    const closeEventHandler = (modal, closeBtn) => {
        modal.addEventListener('click', ev => {
            if (ev.target === modal) closeModal(modal)
        })
        closeBtn.addEventListener('click', () => closeModal(modal))
    }

    const bindModal = (modalSelector, openBtnsSelectors, closeBtnSelector) => {

        const modal = document.querySelector(modalSelector)
        const openBtns = document.querySelectorAll(openBtnsSelectors)
        const closeBtn = document.querySelector(closeBtnSelector)

        for (const btn of openBtns) {
            btn.addEventListener('click', ev => {
                ev.preventDefault()
                openModal(modal)
                closeEventHandler(modal, closeBtn)
            })
        }
    }

    const startModalByTime = (modalSelector, closeBtnSelector, time) => {
        const modal = document.querySelector(modalSelector)
        const closeBtn = document.querySelector(closeBtnSelector)
        setTimeout(() => {
            if (formHasSubmitted) return
            if (!modalIsOpen) {
                openModal(modal)
                closeEventHandler(modal, closeBtn)
            }
        }, time)
    }

    document.addEventListener('form-is-submit', (ev) => {
        formHasSubmitted = true
        setTimeout(() => {
            if (currentModal && modalIsOpen) closeModal(currentModal)
        }, 5 * 1000)
    })

    bindModal('.popup_engineer', '.popup_engineer_btn', '.popup_engineer .popup_close')
    bindModal('.popup', '.phone_link', '.popup .popup_close')

    //dialog
    bindModal('.popup_calc', '.popup_calc_btn', '.popup_calc_close')
    bindModal('.popup_calc_profile', '.popup_calc_button', '.popup_calc_profile_close')
    bindModal('.popup_calc_end', '.popup_calc_profile_button', '.popup_calc_end_close')
    //end dialog

    //if the client is on the site for 2 minutes
    startModalByTime('.popup', '.popup .popup_close', 120 * 1000)

}

export default modals


