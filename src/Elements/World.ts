import { AxesHelper, Clock, Mesh, Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Config } from '../Types'

// import matcapMaterial from '@/materials/matcap'
// import groundShadowMaterial  from '@/materials/groundShadow'

import Camera from './Camera'
import checkDev from '@/utils/checkDev'

import { gsap } from 'gsap'
import createBakeMaterial from '@/materials/createBakeMaterial'
import matcap from '@/materials/matcap'

// import Sound from './Sound'

export default class World {
    isDev: boolean
    isReady: boolean
    isActive: boolean

    width: number
    height: number

    clock: Clock

    controls: OrbitControls

    canvas: HTMLCanvasElement
    renderer: WebGLRenderer
    scene: Scene
    camera: Camera

    constructor (config: Config) {
        this.isDev = checkDev()
        this.isReady = false
        this.isActive = false

        this.width = config.width
        this.height = config.height

        this.clock = new Clock()

        this.canvas = config.canvas
        this.renderer = this.createRenderer()
        this.scene = new Scene()
        this.camera = new Camera(this.width, this.height)
        // this.controls = new OrbitControls(this.camera.main, this.canvas)
        // this.controls.enabled = false

        this.init()
        
    }

    private init () { 
        const axesHelper = new AxesHelper(50)
        this.scene.add(axesHelper)
    }

    private createRenderer () {
        const renderer = new WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,  
            alpha: true 
        })
        renderer.setSize( this.width, this.height)
        renderer.setAnimationLoop( this.render.bind(this) )
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputEncoding = sRGBEncoding

        // renderer.outputEncoding = sRGBEncoding
        return renderer
    }

    // Passed to renderer.setAnimationLoop
    private render () {
        
        if (this.isReady) {
            // !this.isDev && this.camera.update()
        } 

        // this.controls.update()

        // if (this.isDev) {
        //     this.controls.update()
        // }

        // this.controls.update()
        this.renderer.render( this.scene, this.camera.main )

    }

    // Build world elements with resources
    build (resources: any) {
        console.log(resources)

        // bg
        const bgModel = resources['model-bg'].scene.children[0]
        const bgMaterial = createBakeMaterial(resources['texture-bg'])
        bgModel.material = bgMaterial
        this.scene.add(bgModel)

        //bake
        const bakeModel = resources['model-bake'].scene.children[0]
        const bakeMaterial = createBakeMaterial(resources['texture-bake'])
        bakeModel.material = bakeMaterial
        this.scene.add(bakeModel)

        // matcap
        const matcapModels = resources['model-matcap'].scene.children
        matcapModels.forEach((mesh: Mesh) => {
            const model = mesh.clone()
            const color = model.name.split('0')[0]
            const matcapName = `matcap-${color}`
            const material = matcap(resources[matcapName]) 
            model.material = material
            this.scene.add(model)
        })

        // men
        const menScene = resources['model-men'].scene
        const menModels = menScene.children
        menModels.forEach((mesh: Mesh) => {
            const model = mesh
            const color = model.name.split('0')[0]
            const matcapName = `matcap-${color}`
            const material = matcap(resources[matcapName]) 
            model.material = material
        })
        this.scene.add(menScene)

        // men

        this.isReady = true

        this.camera.ready(() => {
            gsap.to('.actions', { top: 0})
        })

    }

    refresh () {
        this.isActive = false
        this.camera.ready(() => {
            gsap.to('.actions', { top: 0 })
        })
        // console.log('need refresh')
    }

    // Update canvas size when window resizing
    updateSize (width: number, height: number) {
        
        this.width = width
        this.height = height

        // update camera        
        this.camera.updateSize(width, height)
        
        // update renderer
        this.renderer.setSize(width, height)
        
    }
    
}