import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

document.getElementById("buttonStart").onclick=async ()=>{
  await activateXR();
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

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0xff00ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ffff }),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
];

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  materials
);
cube.position.set(0, 0, -1);
// scene.add(cube);

// ADD Image to the scene
const loader = new THREE.TextureLoader();
const texture = loader.load(
  "https://images.unsplash.com/photo-1516795768040-fde4b306f577?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
);
const geometry = new THREE.PlaneGeometry(0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1);
scene.add(mesh);

//  cube in the ground
const cubeGround = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  materials
);
cubeGround.position.set(0, -0.5, -1);

// animate cubeGround
const animate = () => {
  requestAnimationFrame(animate);
  cubeGround.rotation.x += 0.01;
  cubeGround.rotation.y += 0.01;
};
animate();
scene.add(cubeGround);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  preserveDrawingBuffer: true,
  canvas: canvas,
  context: gl,
});
renderer.autoClear = false;

const camera = new THREE.PerspectiveCamera();
camera.matrixAutoUpdate = false;

// (code Louise en cours)
// Drag controls
// const controls = new DragControls(cubeGround, camera, renderer.domElement);
// controls.addEventListener("dragstart", function (event) {
//   event.object.material.emissive.set(0xaaaaaa);
// });
// controls.addEventListener("dragend", function (event) {
//   event.object.material.emissive.set(0x000000);
// });


async function activateXR() {

  // Initialize a WebXR session using "immersive-ar".
  const session = await navigator.xr.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl),
  });

  const referenceSpace = await session.requestReferenceSpace("local");

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time, frame) => {
    // Queue up the next draw request.
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

      renderer.setAnimationLoop(function () {
        renderer.render(scene, camera);
      });
    }
  };
  session.requestAnimationFrame(onXRFrame);

  // To be continued in upcoming steps.
}
