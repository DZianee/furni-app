<template>
  <div class="test-3d">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import textureBgImg from "../assets/img/modern-abstract-fractal-art-digital-image-black-background-keith-webber-jr.jpg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "ThreeDTest",
  mounted() {
    const canvas = document.querySelector("#canvas");
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(5);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    camera.position.set(0, 2, 5);
    orbitControls.update();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Box
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxMat = new THREE.MeshPhongMaterial({
      color: "pink",
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.castShadow = true;
    box.receiveShadow = false; //default

    // Floor
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.MeshLambertMaterial({
      color: 0x004c8c,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = 0;
    floor.rotateX(-0.5 * Math.PI);
    floor.receiveShadow = true;

    //Ambient light
    const ambientLight = new THREE.AmbientLight("black", 2);

    // directional light
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1000;
    dirLight.intensity = 1.3;

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);

    // texture loading
    const textureLoader = new THREE.TextureLoader();
    scene.background = textureLoader.load(textureBgImg);

    // Scene adding
    scene.add(axesHelper);
    scene.add(box);
    scene.add(floor);
    scene.add(ambientLight);
    scene.add(dirLight);
    scene.add(dirLightHelper);

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      // box.rotation.x += 0.01;
      // box.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();
  },
};
</script>

<style scoped></style>
