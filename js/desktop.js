// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Create cubes for projects
const projects = [
  { title: "Project 1", desc: "My first project", link: "#" },
  { title: "Project 2", desc: "Another cool project", link: "#" },
  { title: "Project 3", desc: "3rd awesome project", link: "#" }
];

const cubes = [];

projects.forEach((proj, i) => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(Math.random()*6-3, Math.random()*4-2, Math.random()*-5);
  scene.add(cube);
  cube.userData = proj;
  cubes.push(cube);
});

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

  if(intersects.length > 0){
    const data = intersects[0].object.userData;
    document.getElementById('project-title').innerText = data.title;
    document.getElementById('project-desc').innerText = data.desc;
    document.getElementById('project-link').href = data.link;
    document.getElementById('project-panel').classList.remove('hidden');
  }
});

document.getElementById('close-btn').addEventListener('click', ()=>{
  document.getElementById('project-panel').classList.add('hidden');
});

// Animate
function animate(){
  requestAnimationFrame(animate);
  cubes.forEach(c => c.rotation.x += 0.01);
  cubes.forEach(c => c.rotation.y += 0.01);
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
