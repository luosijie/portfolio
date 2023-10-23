uniform sampler2D uTexture;
varying vec2 vUv;

void main () {
    vec2 uv = 1.0 - vec2(vUv.y, vUv.x);
    vec4 color = texture(uTexture, uv);

    gl_FragColor = color;   
}