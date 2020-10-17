import './style.scss'
import modals from './components/modals'
import tabs from './components/tabs'
import forms from './components/forms'
import calc from "./components/calc"
import timer from "./components/timer"
import images from "./components/images"

window.addEventListener('DOMContentLoaded', () => {

    const order = {}
    const deadline = '2021-01-16 GMT+0300'

    modals()
    tabs('.decoration', '.decoration_content > div > div', 'after_click', '.no_click', '.decoration_item')
    tabs('.glazing', '.glazing_content', 'active', '.glazing_block', '.glazing_block')
    tabs('.popup_calc_content', '.big_img > img', 'do_image_more', '.balcon_icons_img','.balcon_icons')
    forms(order)
    calc(order,['popup_calc', 'popup_calc_profile', 'popup_calc_end'])
    timer('timer', deadline)
    images('.works')
})

