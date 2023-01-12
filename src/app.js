import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { InteractionManager } from "three.interactive";

let started = false;
let pinchActivate = true;

document.getElementById("buttonStart").onclick = async () => {
  await activateXR();
  started = true;
};

const canvas = document.createElement("canvas");

document.body.appendChild(canvas);
const gl = canvas.getContext("webgl", { xrCompatible: true });

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const scene = new THREE.Scene();

<<<<<<< HEAD
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0xff00ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ffff }),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
];
=======
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
>>>>>>> 66755f105c4d805d868e83d4b834ee9d47ba3367

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

// ADD Cylinder to the scene
const loader2 = new THREE.TextureLoader();
const textureCylinder = loader2.load(
  "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2447&q=80"
);

const coef = 0.6;

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1.2, 1.2, 1.2, 10, 1, true),
  new THREE.MeshBasicMaterial({ map: textureCylinder, side: THREE.DoubleSide })
);

function start() {
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

// Add button start fixed
const button = new THREE.PlaneGeometry(0.25, 0.2);
const materialButton = new THREE.MeshBasicMaterial({
  color: 689582,
  side: THREE.DoubleSide,
});
const buttonStart = new THREE.Mesh(button, materialButton);
scene.add(camera);
camera.add(buttonStart);
buttonStart.position.set(0, -0.5, -1);

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// Interaction manager -> import which manages click
interactionManager.add(plane);
plane.addEventListener("click", (event) => {
  alert("click");
  start();
  removebutton();
  pinchActivate = false;
});

// hide button, desactivate dragcontrols
function removebutton() {
  buttonStart.visible = false;
  controls.deactivate();
}

// Drag controls
const controls = new DragControls(dragObjetcs, camera, renderer.domElement);
controls.addEventListener("dragstart", function (event) {
  event.object.material.emissive.set(0xaaaaaa);
});
controls.addEventListener("dragend", function (event) {
  event.object.material.emissive.set(0x000000);
});

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

// Returne true if object is in the camera field
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
      };

      render();
    }
  };
  session.requestAnimationFrame(onXRFrame);
}
<<<<<<< HEAD

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2;
  const near = 1.1;
  const far = 50;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 7;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  // Create cube
  const geometry = new THREE.PlaneGeometry(1, 0.8);
  const labelContainerElem = document.querySelector("#labels");
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = 0;

  const elem = document.createElement("div");
  elem.textContent = "Start";
  labelContainerElem.appendChild(elem);

  let cubes = { cube, elem };

  const tempV = new THREE.Vector3();

  function render(time) {
    time *= 0.001;

    const { cube, elem } = cubes;

    // get the position of the center of the cube
    cube.updateWorldMatrix(true, false);
    cube.getWorldPosition(tempV);

    tempV.project(camera);

    // convert the normalized position to CSS coordinates
    const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;

    // move the elem to that position
    elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // const interactionManager = new InteractionManager(
  //   renderer,
  //   camera,
  //   renderer.domElement
  // );

  // interactionManager.add(cubes.cube);
  // cubes.cube.addEventListener("click", (event) => {
  //   alert("click");
  // });
}

main();
=======
>>>>>>> 66755f105c4d805d868e83d4b834ee9d47ba3367
