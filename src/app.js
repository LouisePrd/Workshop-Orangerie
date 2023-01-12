import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/examples/jsm/webxr/XRHandModelFactory.js";
// marri
import bg from "./assets/bg.jpg";
import textureBtn from "./assets/discover.png";

let started = false;
let pinchActivate = true;
let inFiled = false;

// Articles
let article1 = document.getElementById("cubisme");
let article2 = document.getElementById("nymphisme");
let article3 = document.getElementById("feminisme");
let article4 = document.getElementById("artiste");
let article5 = document.getElementById("lesBiches");

back.addEventListener("click", (event) => {
  for(let i = 1; i < 4; i++) {
    let target = "article" + i;
    target.style.top = "120vh";
  setTimeout(() => {
    target.style.display = "none";
  }, 2000);
  }
});

document.getElementById("buttonStart").onclick = async () => {
  await activateXR();
  started = true;

  // À mettre au trigger de chaque bouton correspondant
  // ----- Article #1 Cubisme
  // triggerArticle(article1);

  // ----- Page #2 Nymphisme
  // triggerArticle(article2);

  // ----- Page #3 Féminisme
  // triggerArticle(article3);

  // ----- Page #4 Artiste
  triggerArticle(article4);
  
  // ----- Page #5 Les Biches
  // triggerArticle(article5);
};

let activate = false;

function checkField() {
  if (isInFieldOfCamera(buttonStart)) {
    inFiled = true;
  } else {
    inFiled = false;
  }

  if (inFiled && !activate) {
    activate = true;
    setTimeout(() => {
      buttonStart.scale.set(
        buttonStart.scale.x + 0.2,
        buttonStart.scale.y + 0.2,
        buttonStart.scale.z + 0.2
      );
    }, 500);
  } else if (!inFiled && activate) {
    buttonStart.scale.set(
      buttonStart.scale.x - 0.2,
      buttonStart.scale.y - 0.2,
      buttonStart.scale.z - 0.2
    );
    activate = false;
  }
}

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

// Add rectangle to the scene to set the painting
const geometryPlane = new THREE.PlaneGeometry(0.62, 0.43);
const materialPlane = new THREE.MeshBasicMaterial({
  color: 689582,
  side: THREE.DoubleSide,
  opacity: 0.01,
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
  cylinder.scale.set(plane.scale.x, plane.scale.y * 1.2 , plane.scale.z);
  cylinder.position.set(x, y, z);
  scene.add(cylinder);
  started = false;
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

const buttonCircle = new THREE.CircleGeometry(0.25, 32);
const materialButton = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
});
const buttonStart = new THREE.Mesh(buttonCircle, materialButton);
buttonStart.position.set(planex, planey, -1);
buttonStart.rotation.y = -0.6;
const textureCircle = loader2.load(textureBtn);
buttonStart.material.map = textureCircle;
buttonStart.scale.set(0.4, 0.4, 0.4);
scene.add(buttonStart);

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
});

interactionManager.add(buttonStart);
buttonStart.addEventListener("click", (event) => {
  // soluce
});

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

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time, frame) => {
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl.bindFramebuffer(
      gl.FRAMEBUFFER,
      session.renderState.baseLayer.framebuffer
    );

    const pose = frame.getViewerPose(referenceSpace);

    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setSize(viewport.width, viewport.height);

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
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
