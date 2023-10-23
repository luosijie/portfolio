import vertexShader from '@/shaders/clock-screen/vertex.glsl'
import fragmentShader from '@/shaders/clock-screen/fragment.glsl'
import { ShaderMaterial, Texture } from 'three'

export default function (texture: Texture) {
    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTexture: {
                value: texture
            }
        }
    })
}