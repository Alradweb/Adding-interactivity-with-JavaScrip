import validateInputs from "../utils/validateInputs"
import toast from "./toast";

export default (order, selectors) => {

    const handlers = {
        'popup_calc': (modal) => {
            const button = getButton(modal)
            const inputs = getInputs(modal)
            const isValid = inputs => [].every.call(inputs, input => input.value.length > 2)
            disableButton(button, isValid, inputs)
            validateInputs(inputs, () => disableButton(button, isValid, inputs))
            button.addEventListener('click', () => {
                for(const input of inputs){
                    order[input.id] = input.value
                }
                const balconyShape = modal.querySelector('.do_image_more > img')
                order['balcony_shape'] = balconyShape.getAttribute('alt')
            })
        },
        'popup_calc_profile': (modal) => {
            const button = getButton(modal)
            const inputs = getInputs(modal)
            const select = getSelect(modal)
            const isValid = (inputs, select) => {
                return [].find.call(inputs, i => i.hasAttribute('order-checked')) && select.value
            }
            disableButton(button, isValid, inputs, select)
            for (const input of inputs) {
                input.addEventListener('change', (ev) => {
                    input.setAttribute('order-checked', ev.target.value)
                    disableButton(button, isValid, inputs, select)
                })
            }
            button.addEventListener('click', () => {
                order["view_type"] = select.value
                for (const input of inputs){
                    if(input.hasAttribute('order-checked')){
                        order["glazing"] = input.getAttribute('order-checked')
                    }
                }
            })
        },
        'popup_calc_end': (modal) => {

        },
    }

    const getButton = modal => modal.querySelector('button[name="next"]')
    const getInputs = modal => modal.querySelectorAll('input')
    const getSelect = modal => modal.querySelector('select')

    const disableButton = (btn, fn, ...args) => !(fn(...args)) ? btn.setAttribute('disabled', '') : btn.removeAttribute('disabled')

    const searchMatch = modal => selectors.find((s) => modal.classList.contains(s))
    const getPosition = selector => selectors.indexOf(selector)

    document.addEventListener('modal-is-open', (ev) => {
        const {modal} = ev.detail
        const selector = searchMatch(modal)
        if (selector) {
            toast({message : `Шаг ${getPosition(selector) + 1} из ${selectors.length}`, color: 'green'})
            handlers[selector](modal)
        }
    })
    document.addEventListener('modal-is-close', (ev) => {
        const {modal} = ev.detail
        const selector = searchMatch(modal)
        if (selector && getPosition(selector) + 1 === selectors.length) {
            toast({message : `Спасибо за обращение!`, color: 'blue'})
        }
    })
}