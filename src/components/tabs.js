export default (container, contentItem, activeClass, activeTarget, navSelector) => {
    const tabContainer = document.querySelector(container)
    const tabContent = tabContainer.querySelectorAll(contentItem)
    const navItems = tabContainer.querySelectorAll(navSelector)
    const activeTargets = tabContainer.querySelectorAll(activeTarget)

    const showTab = (id = 0) => {
        tabContent[id].style.display = 'initial'
        activeNavs(activeTargets, id).forEach(item => {
            item.classList.add(activeClass)
        })
    }
    const activeNavs = (navs, id) => {
        return [].filter.call(navs, (nav) => {
            return +(nav.firstElementChild.dataset.id) === id
        })
    }
    const removeActiveClasses = () => {
        for (const item of activeTargets) {
            item.classList.remove(activeClass)
        }
    }
    const hideTabs = () => {
        for (const tab of tabContent) {
            tab.style.display = 'none'
        }
        removeActiveClasses()
    }
    const hasAttr = elem => elem.hasAttribute('data-id');

    [].forEach.call(navItems, (item) => {
        item.addEventListener('click', ({target}) => {
            let id = null
            if (hasAttr(target)) {
                id = target.dataset.id
            } else {
                do {
                    const child = target.firstElementChild
                    id = hasAttr(child) ? child.dataset.id : null
                    target = target.firstElementChild
                } while (!id || target.firstElementChild)
            }
            hideTabs()
            showTab(+id)
        })
    })

    hideTabs()
    showTab()
}
