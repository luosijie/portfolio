import { MeshBasicMaterial, sRGBEncoding, Texture } from 'three'

export default function (texture: Texture) {
    texture.encoding = sRGBEncoding
    const material = new MeshBasicMaterial({
        map: texture,
            
    })
    if (material.map) {
        material.map.flipY = false

    }
    return material
}