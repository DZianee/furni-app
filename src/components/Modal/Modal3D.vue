<template>
  <transition>
    <div class="3d_img_modal">
      <div class="modal fade" id="modalThree" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <form>
            <div class="modal-content">
              <canvas id="canvas" width="0" height="0"></canvas>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
let scene = new THREE.Scene();
const loader = new GLTFLoader();
let model;
let dirLight, hemiLight, ambientLight;
export default {
  name: "Img3DModal",
  props: {
    img3D: String,
  },
  methods: {
    createDirLight() {
      if (dirLight != null) {
        scene.remove(dirLight);
        getDirLight();
      } else {
        getDirLight();
      }
      function getDirLight() {
        dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(110, 0, 50);
        // dirLight.position.multiplyScalar(20);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 20;
        dirLight.shadow.camera.bottom = 2000;
        dirLight.shadow.camera.left = -10;
        dirLight.shadow.camera.right = 2000;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 1000;
        dirLight.intensity = 1;
        scene.add(dirLight);
        // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
        // scene.add(dirLightHelper);
      }
    },
    createHemLight() {
      if (hemiLight != null) {
        scene.remove(hemiLight);
        getHemiLight();
      } else {
        getHemiLight();
      }
      function getHemiLight() {
        hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);
        // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
      }
    },
    createAmbLight() {
      if (ambientLight != null) {
        scene.remove(ambientLight);
        getAmbLight();
      } else {
        getAmbLight();
      }
      function getAmbLight() {
        ambientLight = new THREE.AmbientLight("black", 1);
        scene.add(ambientLight);
      }
    },
    createObj() {
      if (model != null) {
        scene.remove(model);
        loadImg(this.img3D);
      } else {
        loadImg(this.img3D);
      }
      function loadImg(value) {
        loader.load(
          value,
          function (gltf) {
            model = gltf.scene;

            model.position.y = 20;
            model.position.z = -6;
            model.scale.set(5, 5, 5);
            model.castShadow = true;
            scene.add(model);
            console.log(model);
          },

          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loadedd");
          },
          function () {
            // console.log("An error happened", error);
          }
        );
      }
    },
    createPlane() {},
  },
  watch: {
    img3D() {
      this.createObj();
    },
  },
  mounted() {
    // const axesHelper = new THREE.AxesHelper(5);
    const canvas = document.querySelector("#canvas");
    let renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    camera.position.set(0, 80, 100);
    orbitControls.update();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    window.addEventListener("resize", onWindowResize);

    // scene.add(axesHelper);
    // scene.background = new THREE.Color(0x9c9efe);

    // Window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    this.createHemLight();
    this.createDirLight();
    this.createAmbLight();
    animate();
  },
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
}
.modal-content {
  position: relative;
}
/* #canvas {
  width: 200px;
} */
/* .modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}
.modal-body p {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.remove-btns {
  bottom: 10px;
  width: 100%;
  text-align: center;
}
.remove-btns button {
  margin: 7px;
}
button {
  border-radius: 7px;
  height: 35px;
  width: 102px;
  font-size: 16px;
  font-weight: 500;
}
.btn_cancel:hover {
  background-color: rgb(218, 218, 218);
}
@media screen and (max-width: 580px) {
  .modal-dialog {
    padding: 0 70px 0 30px;
    border-radius: 7px;
    left: 50%;
    transform: translateX(-50%) !important;
  }
  .modal-title {
    margin-left: 120px;
  }
  input {
    width: 100%;
  }
}
@media screen and (max-width: 480px) {
  .modal-dialog {
    padding: 0;
  }
  .modal-content {
    margin: 0;
  }
} */
</style>
