varying vec2 vUv;

void main () {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewPosition;


    vUv = uv;
}