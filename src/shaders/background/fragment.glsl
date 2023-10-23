uniform sampler2D uTexture;
varying vec2 vUv;

void main () {
    vec4 color = texture(uTexture, vUv);
    vec2 centeredUv = (vUv - .5) * 2.;
    float alpha = length(centeredUv);
    color.a = 1. - alpha;
    gl_FragColor = color;   
}