import { Vector2 } from 'three'
import { Pane } from 'tweakpane'

type Time = {
    elapsed: number
    delta: number
}

type Mouse = {
    x: number
    y: number
    normal: Vector2
}

export default class Global {

    private static instance: Global

    pane: Pane
    time: Time

    width: number
    height: number
    pixelRatio: number

    mouse: Mouse

    resources: any

    constructor () {
        this.pane = new Pane()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = window.devicePixelRatio
        
        this.time = {
            elapsed: 0, 
            delta: 0
        }

        this.mouse = {
            x: 0,
            y: 0,
            normal: new Vector2()
        }

        this.resources = null

    }

    static getInstance () {
        if (!Global.instance)  Global.instance = new Global()
        return Global.instance
    }

    updateMouse (evt: MouseEvent) {
        this.mouse.x = evt.clientX
        this.mouse.y = evt.clientY

        this.mouse.x = evt.x - this.width / 2
        this.mouse.y = -(evt.y - this.height / 2)
        this.mouse.normal  = new Vector2(
            (evt.clientX / this.width) * 2 - 1,
            -(evt.clientY / this.height) * 2 + 1
        )

    }

}
