import gsap from 'gsap'
import Slider from './Slider'

type Nav = {
    about: HTMLDivElement
    works: HTMLDivElement
}

export default class Actions {
    nav: Nav

    slider: Slider | null

    constructor (nav: Nav) {
        this.nav = nav

        this.slider = null

        // about
        this.nav.about.addEventListener('click', () => {
            if (this.nav.works.className.includes('active')) this.hideWorks()
            if (this.nav.about.className.includes('active')) {
                this.hideAbout() 
            } else {
                this.showAbout()
            }
        })

        const aboutClose = document.querySelector('.about-close')
        aboutClose?.addEventListener('click', () => {
            this.hideAbout()
        })

        //works
        const worksShow = document.querySelector('.nav-works')
        worksShow?.addEventListener('click', () => {
            if (this.nav.about.className.includes('active')) this.hideAbout()
            if (this.nav.works.className.includes('active')) {
                this.hideWorks()
            } else {
                this.showWorks()
            }
        })

        const worksClose = document.querySelector('.works-actions > .close')
        worksClose?.addEventListener('click', () => {
            this.hideWorks()
        })
    }

    showAbout () {
        this.nav.about.classList.add('active')
        gsap.to('.about', { opacity: 1, display: 'block' })
    }

    hideAbout () {
        this.nav.about.classList.remove('active')
        gsap.to('.about', { opacity: 0, display: 'none' })

    }

    showWorks () {
        this.nav.works.classList.add('active')
        gsap.to('.works', { opacity: 1, display: 'flex', onComplete: () => {
            this.initSlider()
        } })
    }

    hideWorks () {
        this.nav.works.classList.remove('active')
        gsap.to('.works', { opacity: 0, display: 'none' })
        this.slider?.close()
    }

    private initSlider () {
        const slide = document.querySelector('.slide')
        const pre = document.querySelector('.works-actions .pre')
        const close = document.querySelector('.works-actions .close')
        const next = document.querySelector('.works-actions .next')

        if (
            slide instanceof HTMLDivElement && 
            pre instanceof HTMLDivElement && 
            close instanceof HTMLDivElement && 
            next instanceof HTMLDivElement
        ) {
            this.slider = new Slider(
                slide, 
                { pre, close, next }
            )
        }

    }

}