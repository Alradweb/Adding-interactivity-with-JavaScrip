export default (elemId, endTime) => {

    const timer = document.getElementById(elemId)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')

    const appendZero = value => `0${value}`.slice(-2)

    const getTimeRemaining = (endTime) => {
        const total = new Date(Date.parse(endTime)) - Date.parse(new Date()),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            days = Math.floor(total / (1000 * 60 * 60 * 24))
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const showTimer = () => {
        const intervalId = setInterval(() => start(), 1000)

        const start = () => {
            const {total, days: d, hours: h, minutes: m, seconds: s} = getTimeRemaining(endTime)
            days.innerText = appendZero(d)
            hours.innerText = appendZero(h)
            minutes.innerText = appendZero(m)
            seconds.innerText = appendZero(s)
            if (total <= 0) {
                clearInterval(intervalId)
                const zero = '00'
                days.innerText = zero
                hours.innerText = zero
                minutes.innerText = zero
                seconds.innerText = zero
            }
        }
        start()
    }
    showTimer()
}