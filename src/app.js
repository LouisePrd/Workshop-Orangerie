async function activateXR() {
  // window width 
  const width = window.innerWidth;
  // window height
  const height = window.innerHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  document.body.appendChild(canvas);
  const gl = canvas.getContext("webgl", { xrCompatible: true });

  const scene = new THREE.Scene();



  // 108 660 * 8622

  // ADD Image to the scene
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2447&q=80"
  );


  //  cube in the ground
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 1.2, 10, 1, true),
    new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
  );
  cylinder.position.set(0, 0, 0);

  // animate cubeGround
  // const animate = () => {
  //   requestAnimationFrame(animate);
  //   cubeGround.rotation.x += 0.01;
  //   cubeGround.rotation.y += 0.01;
  // }
  // animate();
  scene.add(cylinder);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl,
  });
  renderer.autoClear = false;

  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

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

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
