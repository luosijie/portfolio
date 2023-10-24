import './style.scss'

import { gsap } from 'gsap'

import Loader from './utils/Loader'
import configResources from './config/resources'
import Actions from './Actions'

import World from './Elements/World'
import { Config } from './Types'

import Global from './Global'

const global = Global.getInstance()

const loader = new Loader()

// Config ready to create world
const config: Config = {
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: document.createElement('canvas')
}

let world: World

// Init World
const canvas = document.querySelector('canvas')
if (canvas) {
    config.canvas = canvas
    world = new World(config)
}

/** Load process start */
loader.load(configResources)

const percent = document.querySelector('.percent')
loader.onFileLoaded(() => {
    const value: number = loader.totalSuccess / loader.total * 100
    if (percent instanceof HTMLElement) {
        percent.innerText = String(Math.round(value))
    }
})

loader.onLoadEnd(resources => {
    world.build(resources)

    const tl = gsap.timeline({onComplete: () => {

        const navAbout = document.querySelector('.nav-about')
        const navWorks = document.querySelector('.nav-works')

        if (navAbout instanceof HTMLDivElement && navWorks instanceof HTMLDivElement) {
            new Actions({
                about: navAbout,
                works: navWorks
            })
        }

    }})
    tl.to('.loading .value', {opacity: 0})
    tl.to('.loading img', { scale: 0, opacity: 0, ease: 'power2' })
    tl.to('.loading', { opacity: 0, display: 'none' })
    tl.to('.nav', { top: 0, duration: 1, ease: 'power2'})

})

/** Load process end */

window.addEventListener('resize', () => {
    world.updateSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('mousemove', (evt: MouseEvent) => {
    global.updateMouse(evt)
})

/***************************************************************
 * Buttons event binding
 **************************************************************/

