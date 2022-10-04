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
    createObj() {
      loader.load(
        "https://res.cloudinary.com/dlft5gnht/image/upload/v1664718877/3D_Storage/linnmon_table_ver1_nw7wmp.glb",
        function (gltf) {
          const model = gltf.scene;

          model.position.y = 7;
          scene.add(model);
          console.log(model);
          model.scale.set(0.4, 0.4, 0.4);
          // model.userData.name = "test";
          model.isDraggable = true;
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loadedd");
        },
        function (error) {
          console.log("An error happened", error);
        }
      );
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
    let result;

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
      if (found.length > 0) {
        draggable = found[0].object;
        if (draggable.parent.parent != null) {
          draggable = draggable.parent.parent;
        }
        console.log(draggable);
        if (draggable.isDraggable) {
          result = draggable;
        }
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
        if (found.length > 0) {
          for (let obj3d of found) {
            if (!obj3d.object.isDraggable) {
              result.position.x = obj3d.point.x;
              result.position.z = obj3d.point.z;
              break;
            }
          }
        }
      }
    }
    function rotateToLeft() {
      document
        .getElementById("rotateToLeftButton")
        .addEventListener("click", () => {
          result.rotation.y += Math.PI / 2;
        });
    }
    function rotateToRight() {
      document
        .getElementById("rotateToRightButton")
        .addEventListener("click", () => {
          result.rotation.y -= Math.PI / 2;
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
    this.createObj();
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
