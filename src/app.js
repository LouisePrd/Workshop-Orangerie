async function activateXR() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const gl = canvas.getContext("webgl", { xrCompatible: true });

  const scene = new THREE.Scene();

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  ];

  const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), materials);
  cube.position.set(0, 0, -1);
  // scene.add(cube);
  

  // ADD Image to the scene
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://images.unsplash.com/photo-1516795768040-fde4b306f577?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60');
  const geometry = new THREE.PlaneBufferGeometry(0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -1);
  scene.add(mesh);

  const texture2 = loader.load('https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1077&q=80');
  const geometry2 = new THREE.PlaneBufferGeometry(1, 1);
  const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(3, 0, -5);
  // mesh.rotateY();
  scene.add(mesh2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl
  });
  renderer.autoClear = false;

  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  // Initialize a WebXR session using "immersive-ar".
  const session = await navigator.xr.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
  });


  const referenceSpace = await session.requestReferenceSpace('local');

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time, frame) => {
    // Queue up the next draw request.
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame.getViewerPose(referenceSpace);

    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setSize(viewport.width, viewport.height)

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      camera.matrix.fromArray(view.transform.matrix)
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      renderer.render(scene, camera)
    }
  }
  session.requestAnimationFrame(onXRFrame);


  // To be continued in upcoming steps.
}