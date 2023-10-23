import gsap from 'gsap'

const margin = 10

type Buttons = {
    pre: HTMLDivElement
    close: HTMLDivElement
    next: HTMLDivElement
}

type Listeners = {
    pre: EventListener
    close: EventListener
    next: EventListener
}

export default class Slider {
    container: HTMLDivElement
    buttons: Buttons
    listeners: Listeners | null

    total: number
    cur: number
    itemWidth: number

    constructor (container: HTMLDivElement, buttons: Buttons) {
        this.container = container
        this.buttons = buttons
        this.listeners = null
        
        this.total = 0
        this.cur = 1
        this.itemWidth = 0
    
        const items = container.querySelectorAll('.item')
        this.total = items.length
        this.itemWidth = items[0].getBoundingClientRect().width + margin * 2

        this.init()
    
    }

    private init () {
        this.container.style.left = window.innerWidth + 'px'
        this.slideTo(this.cur)

        gsap.to('.works-actions', {opacity: 1, display: 'flex', delay: .5})

        const listenPre = this.pre.bind(this)
        this.buttons.pre.addEventListener('click', listenPre)

        const listenNext = this.next.bind(this)
        this.buttons.next.addEventListener('click', () => {
            this.next()
        })
        
        const listenClose =  this.close.bind(this)
        this.buttons.close.addEventListener('click', () => {
            this.close()
        })

        this.listeners = {
            pre: listenPre,
            close: listenClose,
            next: listenNext
        }

    }

    pre () {
        if (this.cur === 0) return
        this.cur--
        this.slideTo(this.cur)

    }

    close () {
        
        if (this.listeners) {
            this.buttons.pre.removeEventListener('click', this.listeners.pre)
            this.buttons.close.removeEventListener('click', this.listeners.close)
            this.buttons.pre.removeEventListener('click', this.listeners.pre)
        }

        gsap.to('.works', { opacity: 0 , display: 'none', onComplete: () => {
            this.container.style.left = window.innerWidth + 'px'
        }})
        gsap.to('.works-actions', { opacity: 0, display: 'none'})

    }

    next () {
        if (this.cur === this.total - 1) return

        this.cur++
        this.slideTo(this.cur)
    }

    slideTo (index: number) {
        const left = window.innerWidth / 2 - index * this.itemWidth - this.itemWidth / 2 
        gsap.to(this.container, {left})

        if (this.cur === 0) {
            gsap.to(this.buttons.pre, { opacity: 0})
        } else {
            gsap.to(this.buttons.pre, { opacity: 1})
            
        }

        if (this.cur === this.total - 1) {
            gsap.to(this.buttons.next, {opacity: 0})
        } else {
            gsap.to(this.buttons.next, {opacity: 1})
        }
        
    }

}