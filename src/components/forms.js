import toast from './toast'
import validateInputs from "../utils/validateInputs";

export default (order) => {

    const forms = document.querySelectorAll('form')

    const validateName = input => {
        const isValid = input.value.length >= 2
        if (!isValid) toast(messages.warning)
        return isValid
    }

    const notifyAboutFormEvent = (elem, event) => {
        elem.dispatchEvent(new CustomEvent(event, {
            bubbles: true
        }))
    }

    const messages = {
        loading: {
            message: 'Идёт отправка данных...',
            color: 'grey'
        },
        success: {
            message: 'Данные отправлены. С вами скоро свяжутся!',
            color: 'green'
        },
        failure: {
            message: 'Что-то пошло не так... Попробуйте ещё раз..',
            color: 'tomato'
        },
        warning: {
            message: 'Введите имя',
            color: 'orange'
        }
    }

    validateInputs(document.querySelectorAll('input[name="user_phone"]'))

    const sendFormData = async (url, data) => {
        toast(messages.loading)
        const response = await fetch(`${url}`, {
            method: 'POST',
            body: data
        })
        return await response.text()
    }

    for (const form of forms) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            if (!validateName(form.querySelector('input[name="user_name"]'))) return
            const formData = new FormData(form)
            for (const [key, value] of Object.entries(order)) {
                formData.set(key, value)
            }
            console.log(order)
            sendFormData('assets/server.php', formData)
                .then(res => {
                    console.log(res)
                    toast(messages.success)
                    notifyAboutFormEvent(form, 'form-is-submit')
                })
                .catch(e => toast(messages.failure))
                .finally(() => {
                    form.reset()
                    order = {}
                })
        })
    }
}