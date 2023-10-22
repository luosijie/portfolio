varying vec2 vPoint;
#include <skinning_pars_vertex>

void main () {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    #include <project_vertex>

    // Set matcap coordinate
    vec3 n = mat3(modelViewMatrix) * normal;
    n = normalize(n);

    vec3 normalizedPosition = normalize(mvPosition.xyz);
    vec3 x = normalize(vec3(normalizedPosition.z, 0., normalizedPosition.x));
    vec3 y = cross(normalizedPosition, x);
    vec2 point = vec2(dot(x, n), dot(y, n));
    point = point * .4 + .5; 

    vPoint = point;
}