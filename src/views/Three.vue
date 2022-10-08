<template>
  <div class="test-3d">
    <div class="monitor-area">
      <div class="btn-monitor">
        <button id="rotateToLeftButton">Rotate to the Left</button>
        <button id="rotateToRightButton">Rotate to the Right</button>
      </div>
    </div>
    <div class="display-product-list">
      <i
        class="bx bx-chevrons-left bx-sm bx-fw"
        @click="displayProductList = !displayProductList"
      ></i>
      Display list
    </div>
    <div class="wrapper-list" v-if="displayProductList">
      <i
        class="bx bx-x bx-sm"
        style="cursor: pointer"
        @click="displayProductList = !displayProductList"
      ></i>
      <h6>List of Items</h6>
      <div class="product-3d-list">
        <div class="item" v-for="item in shoplist" :key="item.index">
          <img
            :src="`http://localhost:2371/${item.img}`"
            alt="img-3D"
            @click="
              getDataImg(item.img3D, item.quantityProduct, item.product_id)
            "
          />
          <p>Quantity: {{ item.quantityProduct }}</p>
        </div>
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
let houseModel, dirLight, hemiLight, ambientLight;
export default {
  name: "ThreeDTest",
  data() {
    return {
      shoplist: [],
      countQuantityProduct: 0,
      displayProductList: true,
      tempArr: [],
    };
  },
  methods: {
    getShopList() {
      const result = JSON.parse(this.$store.state.shoppingList);
      this.shoplist = result;
    },
    getDataImg(img3D, quantity, id) {
      let result;
      const obj = {
        id: id,
        quantity: quantity,
        used_quantity: 1,
      };
      if (this.tempArr == "") {
        this.tempArr.push(obj);
        this.createObj(img3D);
      } else {
        result = this.tempArr.find((item) => item.id === id);
        if (result == null || result == "") {
          this.tempArr.push(obj);
          this.createObj(img3D);
        } else {
          result.used_quantity += 1;
          if (result.used_quantity > result.quantity) {
            return;
          } else {
            this.createObj(img3D);
          }
        }
      }
    },
    createHouseFloor() {
      if (houseModel != null) {
        scene.remove(houseModel);
        getHouseModel();
      } else {
        getHouseModel();
      }
      function getHouseModel() {
        loader.load(
          "https://res.cloudinary.com/dlft5gnht/image/upload/v1664613605/3D_Storage/house_floor_ver1_s4uysg.glb",
          function (gltf) {
            houseModel = gltf.scene;
            scene.add(houseModel);
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
      }
    },
    createDirLight() {
      if (dirLight != null) {
        scene.remove(dirLight);
        getDirLight();
      } else {
        getDirLight();
      }
      function getDirLight() {
        dirLight = new THREE.DirectionalLight(0xffffff);
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
        // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
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
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0.214, 45, -11.427);
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
        ambientLight = new THREE.AmbientLight(0x2c3333, 1);
        scene.add(ambientLight);
      }
    },
    createObj(value) {
      loader.load(
        value,
        function (gltf) {
          const model = gltf.scene;

          model.position.y = 7;
          scene.add(model);
          model.scale.set(0.4, 0.4, 0.4);
          // model.userData.name = "test";
          model.isDraggable = true;
          console.log(model);
        },
        function () {
          // console.log((xhr.loaded / xhr.total) * 100 + "% loadedd");
        },
        function () {
          // console.log("An error happened", error);
        }
      );
    },
  },
  mounted() {
    this.getShopList();
    const canvas = document.querySelector("#canvas");
    // const axesHelper = new THREE.AxesHelper(5);
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
    console.log(scene);
    camera.position.set(0, 50, 70);
    orbitControls.update();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", onWindowResize);
    scene.background = new THREE.Color(0xb1b2ff);
    // scene.add(axesHelper);

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
        if (draggable.parent != null) {
          draggable = draggable.parent;
        }
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
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
    this.createAmbLight();
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

.display-product-list {
  padding: 10px;
  background: #251d3a;
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 50px;
  font-weight: 500;
  color: white;
  cursor: pointer;
}
/* --- list --- */
.wrapper-list {
  padding: 10px;
  background: #251d3a;
  position: absolute;
  top: 0;
  right: 0;
  width: 295px;
  height: 100%;
  color: white;
}
.wrapper-list .product-3d-list {
  padding: 10px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
  overflow: auto;
  scroll-behavior: smooth;
  max-height: 800px;
}
.wrapper-list .product-3d-list .item p {
  padding: 5px;
  font-size: 13px;
  font-weight: 500;
  background: #e1ffb1;
  color: black;
}
.wrapper-list .product-3d-list .item img {
  width: 100%;
}
</style>
