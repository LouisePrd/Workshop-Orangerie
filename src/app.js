import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/examples/jsm/webxr/XRHandModelFactory.js";
import { AxesHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// marri
import bg from "./assets/bg.jpg";

let started = false;
let pinchActivate = true;
let inFiled = false;

// Articles
let article1 = document.getElementById("cubisme");
let article2 = document.getElementById("nymphisme");
let article3 = document.getElementById("feminisme");
let article4 = document.getElementById("artiste");
let article5 = document.getElementById("lesBiches");

document.getElementById("buttonStart").onclick = async () => {
  await activateXR();
  started = true;
};

function checkField() {}

const canvas = document.createElement("canvas");
canvas.attributes.id = "AR";

document.body.appendChild(canvas);
const gl = canvas.getContext("webgl", { xrCompatible: true });

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Add rectangle to the scene to set the painting
const geometryPlane = new THREE.PlaneGeometry(0.62, 0.43);
const materialPlane = new THREE.MeshBasicMaterial({
  color: 689582,
  side: THREE.DoubleSide,
  opacity: 0.008,
});
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.material.transparent = true;
plane.position.set(0, 0, -1);
scene.add(plane);

let planex = plane.position.x;
let planey = plane.position.y;
let planez = plane.position.z;

// ADD Cylinder to the scene
const loader2 = new THREE.TextureLoader();
const textureCylinder = loader2.load(bg);

const coef = 1;

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2 * coef, 2 * coef, 1 * coef, 32, 1, true),
  new THREE.MeshBasicMaterial({ map: textureCylinder, side: THREE.BackSide })
);

function start(x, y, z) {
  cylinder.scale.set(-1, plane.scale.y * 1.2, plane.scale.z);
  cylinder.position.set(x, y, z);
  scene.add(cylinder);
  started = false;
  plane.visible = false;
  let audio = new Audio("/son/Marie_Laurencin_Audio.mp3");
  audio.play();
} // create cylinder

// Tab for Drag Controls
const dragObjetcs = [plane];

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  preserveDrawingBuffer: true,
  canvas: canvas,
  context: gl,
});
renderer.autoClear = false;

const camera = new THREE.PerspectiveCamera();
camera.matrixAutoUpdate = false;

const buttonCircleFirst = new THREE.TorusGeometry(0.04, 0.005, 16, 100);
const buttonCircleFirst2 = new THREE.TorusGeometry(0.06, 0.003, 16, 100);
const buttonCircle = new THREE.TorusGeometry(0.05, 0.005, 16, 100);
const buttonCircle2 = new THREE.TorusGeometry(0.07, 0.003, 16, 100);
const materialButton = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
});
const btnFirstArticle = new THREE.Mesh(buttonCircleFirst, materialButton);
const btnFirstArticle2 = new THREE.Mesh(buttonCircleFirst2, materialButton);
btnFirstArticle.position.set(planex + 0.06, planey - 0.08, planez - 0.8);
btnFirstArticle2.position.set(planex + 0.06, planey - 0.08, planez - 0.8);
createCircle(btnFirstArticle);
createCircle(btnFirstArticle2);
// moins de bleu

const btnSecondArticle = new THREE.Mesh(buttonCircle, materialButton);
const btnSecondArticle2 = new THREE.Mesh(buttonCircle2, materialButton);
btnSecondArticle.position.set(planex + 1.6, planey + 0.08, planez - 0.6);
btnSecondArticle2.position.set(planex + 1.6, planey + 0.08, planez - 0.6);
btnSecondArticle.rotation.y = -1.2;
btnSecondArticle2.rotation.y = -1.2;
createCircle(btnSecondArticle2);
createCircle(btnSecondArticle);

const btnThirdArticle = new THREE.Mesh(buttonCircle, materialButton);
const btnThirdArticle2 = new THREE.Mesh(buttonCircle2, materialButton);
btnThirdArticle.position.set(planex + 1.8, planey + 0.1, -0.4);
btnThirdArticle2.position.set(planex + 1.8, planey + 0.1, -0.4);
btnThirdArticle.rotation.y = -1.6;
btnThirdArticle2.rotation.y = -1.6;
createCircle(btnThirdArticle);
createCircle(btnThirdArticle2);

const btnFourthArticle = new THREE.Mesh(buttonCircle, materialButton);
const btnFourthArticle2 = new THREE.Mesh(buttonCircle2, materialButton);
btnFourthArticle.position.set(planex + 0.6, planey - 0.15, planez + 1.5);
btnFourthArticle2.position.set(planex + 0.6, planey - 0.15, planez + 1.5);
btnFourthArticle.rotation.y = -2.8;
btnFourthArticle2.rotation.y = -2.8;
// createCircle(btnFourthArticle);
// createCircle(btnFourthArticle2);

// const btnFifthArticle = new THREE.Mesh(buttonCircle, materialButton);
// btnFifthArticle.position.set(planex + 3.5, planey, 0);
// btnFifthArticle.rotation.y = -0.8;
// createCircle(btnFifthArticle);

// every 2 secs, change scale of btns

function animBtn() {
  btns.forEach((btn) => {
    if (btn.scale.x > 1.15) {
      btn.scale.set(
        (btn.scale.x -= 0.01),
        (btn.scale.y -= 0.01),
        (btn.scale.z -= 0.01)
      );
    } else {
      btn.scale.set(
        (btn.scale.x += 0.01),
        (btn.scale.y += 0.01),
        (btn.scale.z += 0.01)
      );
    }
  });
  requestAnimationFrame(animBtn);
}

requestAnimationFrame(animBtn);

function createCircle(mesh) {
  // mesh.material.map = textureCircle;
  // mesh.material.color.setHex(0xffffff);
  mesh.scale.set(0.8, 0.8, 0.8);
  mesh.material.transparent = true;
  mesh.material.opacity = 0.8;
  scene.add(mesh);
}

const btns = [
  btnFirstArticle,
  btnFirstArticle2,
  btnSecondArticle,
  btnSecondArticle2,
  btnThirdArticle,
  btnThirdArticle2,
  btnFourthArticle,
  btnFourthArticle2,
];
btns.forEach((btn) => {
  btn.visible = false;
});

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// Interaction manager -> import which manages click
interactionManager.add(plane);
plane.addEventListener("click", (event) => {
  // removebutton();
  pinchActivate = false;
  start(plane.position.x, plane.position.y, plane.position.z);
  btns.forEach((btn) => {
    btn.visible = true;
  });
});

// Interactive buttons -> Manage
interactionManager.add(btnFirstArticle);
interactionManager.add(btnFirstArticle2);
btnFirstArticle.addEventListener("click", (event) => {
  if (btnFirstArticle.visible == true) {
    triggerArticle(article1);
  }
});
btnFirstArticle2.addEventListener("click", (event) => {
  if (btnFirstArticle2.visible == true) {
    triggerArticle(article1);
  }
});
interactionManager.add(btnSecondArticle);
interactionManager.add(btnSecondArticle2);
btnSecondArticle.addEventListener("click", (event) => {
  triggerArticle(article2);
});
btnSecondArticle2.addEventListener("click", (event) => {
  triggerArticle(article2);
});
interactionManager.add(btnThirdArticle);
interactionManager.add(btnThirdArticle2);
btnThirdArticle.addEventListener("click", (event) => {
  triggerArticle(article3);
});
btnThirdArticle2.addEventListener("click", (event) => {
  triggerArticle(article3);
});
interactionManager.add(btnFourthArticle);
interactionManager.add(btnFourthArticle2);
btnFourthArticle.addEventListener("click", (event) => {
  triggerArticle(article4);
});
btnFourthArticle2.addEventListener("click", (event) => {
  triggerArticle(article4);
});
// interactionManager.add(btnFifthArticle);
// btnFifthArticle.addEventListener("click", (event) => {
//   triggerArticle(article5);
// });

// desactivate dragcontrols
function removebutton() {
  // controls.deactivate();
}

// // Drag controls
// const controls = new DragControls(dragObjetcs, camera, renderer.domElement);
// controls.addEventListener("dragstart", function (event) {
//   event.object.material.emissive.set(0xaaaaaa);
// });
// controls.addEventListener("dragend", function (event) {
//   event.object.material.emissive.set(0x000000);
// });

// Pinch to resize
window.addEventListener(
  "gestureend",
  function (e) {
    if (pinchActivate) {
      let x = plane.scale.x;
      let y = plane.scale.y;
      let z = plane.scale.z;
      if (e.scale < 1.0) {
        plane.scale.set(x - 0.1, y - 0.1, z - 0.1);
      } else if (e.scale > 1.0) {
        plane.scale.set(x + 0.1, y + 0.1, z + 0.1);
      }
    }
  },
  false
);

// Return true if object is in the camera field
function isInFieldOfCamera(object) {
  let frustum = new THREE.Frustum();
  let projScreenMatrix = new THREE.Matrix4();
  projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );

  // frustum.setFromProjectionMatrix(camera.projectionMatrix);
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );

  object.updateMatrix(); // make sure plane's local matrix is updated
  object.updateMatrixWorld();

  return frustum.intersectsObject(object);
}

async function activateXR() {
  const session = await navigator.xr.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl),
  });

  const referenceSpace = await session.requestReferenceSpace("local");

  // Create a render loop that allows us to draw on the AR view
  const onXRFrame = (time, frame) => {
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl.bindFramebuffer(
      gl.FRAMEBUFFER,
      session.renderState.baseLayer.framebuffer
    );

    /**
     * Models
     */

    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);

    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/musicBox/draco/");

    // const gltfLoader = new GLTFLoader();
    // gltfLoader.setDRACOLoader(dracoLoader);

    // gltfLoader.load("/musicBox/models/box1.glb", (glb) => {
    //   glb.scene.scale.set(0.025, 0.025, 0.025);
    //   glb.scene.position.z -= 0.5;
    //   scene.add(glb.scene);
    // });

    // gltfLoader.load("/musicBox/models/box2.glb", (glb) => {
    //   glb.scene.scale.set(0.025, 0.025, 0.025);
    //   // glb.scene.position.x += -1;
    //   glb.scene.position.y += 0.02;
    //   glb.scene.position.z -= 0.5;
    //   glb.scene.rotateX(Math.PI * -0.5);
    //   glb.scene.rotateY(Math.PI * -0.5);
    //   scene.add(glb.scene);

    //   session.requestAnimationFrame(animate);

    //   function animate() {
    //     glb.scene.rotation.x += 0.01;
    //     if (glb.scene.rotation.x < 0) {
    //       session.requestAnimationFrame(animate);
    //     }
    //   }
    // });

    // gltfLoader.load("/musicBox/models/danse1.glb", (glb) => {
    //   glb.scene.scale.set(0.025, 0.025, 0.025);

    //   scene.add(glb.scene);
    //   glb.scene.position.z -= 0.5;
    //   session.requestAnimationFrame(animate);

    //   function animate() {
    //     glb.scene.rotation.y += 0.1;
    //     session.requestAnimationFrame(animate);
    //   }
    // });

    // gltfLoader.load("/musicBox/models/danse2.glb", (glb) => {
    //   glb.scene.scale.set(0.025, 0.025, 0.025);
    //   glb.scene.position.z -= 0.5;

    //   scene.add(glb.scene);

    //   session.requestAnimationFrame(animate);

    //   function animate() {
    //     glb.scene.rotation.y += 0.1;
    //     session.requestAnimationFrame(animate);
    //   }
    // });

    const pose = frame.getViewerPose(referenceSpace);

    if (pose) {
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setSize(viewport.width, viewport.height);

      // Use the view's transform matrix and projection matrix
      camera.matrix.fromArray(view.transform.matrix);
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      // Render loop
      var render = function () {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        checkField();
      };

      render();
    }
  };
  session.requestAnimationFrame(onXRFrame);
}
