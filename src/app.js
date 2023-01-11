import * as THREE from "three";
import { AxesHelper } from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

document.getElementById("buttonStart").onclick = async () => {
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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0xff00ff }),
  new THREE.MeshBasicMaterial({ color: 0x00ffff }),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
];

// Add Image to the scene : doe
const loader = new THREE.TextureLoader();
const texture = loader.load("assets/les_biches_marie_laurencin.png");
const geometry = new THREE.PlaneGeometry(0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1);
// scene.add(mesh);

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
  new THREE.CylinderGeometry(1.26 * coef, 1.26 * coef, .1 * coef, 32, 1, true),
  new THREE.MeshBasicMaterial({ map: textureCylinder, side: THREE.DoubleSide })
);

scene.add(cylinder);

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
    let x = plane.scale.x;
    let y = plane.scale.y;
    let z = plane.scale.z;
    if (e.scale < 1.0) {
      plane.scale.set(x - 0.1, y - 0.1, z - 0.1);
    } else if (e.scale > 1.0) {
      plane.scale.set(x + 0.1, y + 0.1, z + 0.1);
    }
  },
  false
);

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

      // ancienne loop (au cas où hihi)
      // renderer.setAnimationLoop(function () {
      //   orbitControls.update();
      //   renderer.render(scene, camera);
      // });
    }
  };
  session.requestAnimationFrame(onXRFrame);
}
