<template>
  <div class="test-3d">
    <div class="monitor-area">
      <div class="btn-monitor">
        <button id="rotateToLeftButton">Rotate to the Left</button>
        <button id="rotateToRightButton">Rotate to the Right</button>
      </div>
    </div>

    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
// import { GUI } from "dat.gui";
// import textureMap from "../assets/img/pexels-pixmike-413195.jpg";
// import houseFloor from "../utils/house_floor.glb";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const loader = new GLTFLoader();

export default {
  name: "ThreeDTest",
  methods: {
    createHouseFloor() {
      loader.load(
        "https://res.cloudinary.com/dlft5gnht/image/upload/v1664613605/3D_Storage/house_floor_ver1_s4uysg.glb",
        function (gltf) {
          scene.add(gltf.scene);
          const houseFloor = gltf.scene.children[0];

          houseFloor.receiveShadow = true;
          gltf.scene.scale.set(1.5, 1.5, 1.5);
          gltf.animations;
          gltf.scene;
          gltf.scenes;
          gltf.cameras;
          gltf.asset;
          houseFloor.userData.ground = true;
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log("An error happened", error);
        }
      );
    },
    createDirLight() {
      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(-2, 1.8, 1);
      dirLight.position.multiplyScalar(30);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 20;
      dirLight.shadow.camera.bottom = -2;
      dirLight.shadow.camera.left = -10;
      dirLight.shadow.camera.right = 2;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 1000;
      dirLight.intensity = 1.3;
      scene.add(dirLight);
    },
    createHemLight() {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.color.setHSL(0.6, 1, 0.6);
      hemiLight.groundColor.setHSL(0.095, 1, 0.75);
      hemiLight.position.set(0.214, 45, -11.427);
      scene.add(hemiLight);
    },
  },
  mounted() {
    const canvas = document.querySelector("#canvas");
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

    camera.position.set(0, 50, 70);
    orbitControls.update();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(axesHelper);

    // Box
    // const boxGeo = new THREE.BoxGeometry(100, 100, 100);
    // const boxMat = new THREE.MeshLambertMaterial({
    //   color: "pink",
    // });
    // const box = new THREE.Mesh(boxGeo, boxMat);
    // box.position.set(0, 100, 180);
    // box.castShadow = true;
    // box.receiveShadow = false;
    // box.userData.draggable = true;
    // box.userData.name = "BOX";
    // const cubGeo = new THREE.BoxGeometry(10, 10, 10);
    // const cubMat = new THREE.MeshLambertMaterial({
    //   color: "pink",
    // });

    //Ambient light
    const ambientLight = new THREE.AmbientLight(0x2c3333, 1);
    scene.add(ambientLight);

    // directional light
    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);

    // hemisphere light
    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);

    //Raycaster
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
    const moveMouse = new THREE.Vector2();
    let draggable = new THREE.Object3D();
    draggable = null;

    canvas.addEventListener("click", (event) => {
      if (draggable != null) {
        // console.log(`dropping draggable ${draggable.userData.name}`);
        draggable = null;

        return;
      }
      clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(clickMouse, camera);
      const found = raycaster.intersectObjects(scene.children);
      if (found.length > 0 && found[0].object.userData.draggable) {
        draggable = found[0].object;
      }
    });

    canvas.addEventListener("mousemove", (event) => {
      moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function dragObject() {
      if (draggable != null) {
        raycaster.setFromCamera(moveMouse, camera);
        const found = raycaster.intersectObjects(scene.children);
        if (found.length > 0 && found[0].object.userData.draggable) {
          const selectObj = found.find(
            (item) => item.object.userData.draggable == true
          );
          draggable.position.z = selectObj.point.z;
          draggable.position.x = selectObj.point.x;
        }
      }
    }
    function rotateToLeft() {
      document
        .getElementById("rotateToLeftButton")
        .addEventListener("click", () => {
          draggable.rotation.y += Math.PI / 2;
        });
    }
    function rotateToRight() {
      document
        .getElementById("rotateToRightButton")
        .addEventListener("click", () => {
          draggable.rotation.y -= Math.PI / 2;
        });
    }
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      dragObject();
      renderer.render(scene, camera);
    }
    rotateToLeft();
    rotateToRight();
    this.createHouseFloor();
    this.createHemLight();
    this.createDirLight();
    animate();
  },
};
</script>

<style scoped>
.monitor-area {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5%;
  width: 100%;
}
.btn-monitor {
  width: 32%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
}
.btn-monitor button {
  background: rgb(255, 153, 0);
  padding: 20px;
  font-weight: 500;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  color: white;
}
</style>
