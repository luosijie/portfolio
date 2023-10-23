import vertexShader from '@/shaders/background/vertex.glsl'
import fragmentShader from '@/shaders/background/fragment.glsl'
import { ShaderMaterial, Texture } from 'three'

export default function (texture: Texture) {
    texture.flipY = false
    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
            uTexture: {
                value: texture
            }
        }
    })
}