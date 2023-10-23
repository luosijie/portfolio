import createClockScreenMaterial from '@/materials/createClockScreenMaterial'
import { CanvasTexture, Mesh, RepeatWrapping, ShaderMaterial } from 'three'

export default class ClockScreen {
    width: number
    height: number

    mesh: Mesh
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null

    material: ShaderMaterial
    texture: CanvasTexture

    constructor (mesh: Mesh) {
        this.width = 495
        this.height = 288

        this.mesh = mesh
        this.canvas = this.createCanvas()
        this.ctx = this.canvas.getContext('2d')

        this.texture = this.createTexture()

        this.material = createClockScreenMaterial(this.texture)

        console.log(this.mesh)

        this.init()

    }

    private init () {

        console.log('ss', this.material)
        this.mesh.material = this.material

        setInterval(() => {
            this.draw()
        }, 1000)
    }

    private createCanvas () {
        const canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height

        return canvas
    }

    private createTexture () {
        const texture = new CanvasTexture(this.canvas)
        
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        // texture.flipY = false
        return texture
    }

    private draw () {
        if (!this.ctx) return 
        const date = new Date()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        
        this.ctx.clearRect(0,0, this.width, this.height)
        this.ctx.fillStyle = '#ffffff'
        this.ctx.font = '130px Digital-Dismay'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'bottom'
        this.ctx.fillText(`${hours}:${minutes}:${seconds}`, this.width / 2, this.height / 2 + 10)

        // this.ctx.fillRect(0, 0, 200, 20)

        this.texture.needsUpdate = true
    }

    // update () {
    //     this.draw()
    //     //
    // }

}