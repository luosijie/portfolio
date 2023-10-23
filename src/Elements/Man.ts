
import skinningMatcap from '@/materials/skinningMatcap'
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, LoopRepeat, Scene, SkinnedMesh } from 'three'

type Actions = {
    playComputer: AnimationAction
    sayHello: AnimationAction
}

export default class Man {
    resources: any
    model: any
    scene: Scene

    animationMixer: AnimationMixer

    actions: Actions

    isSayHello: boolean

    constructor (resources: any) {
        this.resources = resources
        this.model = resources['model-man']

        this.scene = resources['model-man'].scene

        this.animationMixer = new AnimationMixer(this.scene)

        // init
        this.setMaterial()
        this.actions = this.createActions()

        this.isSayHello = false

        this.playComputer()
    }
    
    private createActions () {
        
        const animations = this.model.animations
        const playComputer = this.animationMixer.clipAction(animations.find((a: AnimationClip) => a.name === 'play-computer'))
        const sayHello = this.animationMixer.clipAction(animations.find((a: AnimationClip) => a.name === 'say-hello'))
        
        return {
            sayHello,
            playComputer
        }
    }

    playComputer () {
        this.actions.playComputer.reset()
        // this.actions.playComputer.setLoop(LoopRepeat, Infinity)
        this.actions.playComputer.play()
    }

    sayHello () {
        if (this.isSayHello) return
        this.isSayHello = true
        this.actions.sayHello.reset()
        // this.animationMixer.stopAllAction()
        if (this.actions.playComputer.isRunning()) {
            this.actions.playComputer.fadeOut(.5)
        }

        // this.actions.sayHello.reset()
        this.actions.sayHello.setLoop(LoopOnce, 1)
        this.actions.sayHello.play()
        
        setTimeout(() => {
            // this.actions.sayHello.fadeOut(1)
            this.actions.playComputer.reset()
            this.isSayHello = false
        }, 3000)
    }

    private setMaterial () {

        const menModels = this.scene.children[0].children
        menModels.forEach((mesh: any) => {
            if (mesh instanceof SkinnedMesh) {
                // console.log(mesh)
                const model = mesh
                const color = model.name.split('0')[0]
                const matcapName = `matcap-${color}`
                const material = skinningMatcap(this.resources[matcapName]) 
                model.material = material
            }
        })
    }

}