import isNumeric from "./isNumeric";

export default (inputs, fn) => {
    for (const input of inputs) {
        input.addEventListener('input', ({target}) => {
            let newValue = ''
            for (let i = 0; i < target.value.length; i++) {
                if (isNumeric(target.value[i])) {
                    newValue += target.value[i]
                }
            }
            target.value = newValue
            if (fn) fn()
        })
    }
}