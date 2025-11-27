import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ==========================================
// 1. INISIALISASI WEBGL RENDERER
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // Hitam abu elegan
scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02); // Kabut kedalaman

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Posisi kamera sedikit menunduk (High Angle) agar panggung terlihat
camera.position.set(0, 4, 10); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.1; // Mencegah kamera tembus lantai

// ==========================================
// 2. TATA CAHAYA & LINGKUNGAN (ATMOSFER)
// ==========================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Lampu Sorot Utama (Spotlight)
const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(0, 15, 5);
spotLight.angle = 0.6;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
scene.add(spotLight);

// Lampu Neon Dekorasi (Kiri & Kanan)
const blueLight = new THREE.PointLight(0x00f3ff, 20, 15);
blueLight.position.set(-6, 2, -2);
scene.add(blueLight);

const purpleLight = new THREE.PointLight(0xbc13fe, 20, 15);
purpleLight.position.set(6, 2, -2);
scene.add(purpleLight);

// ==========================================
// 3. PANGGUNG (LAYOUT ESTETIS)
// ==========================================
// Membuat lantai panggung yang reflektif
const stageGeo = new THREE.CylinderGeometry(8, 9, 0.5, 64);
const stageMat = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    roughness: 0.1, // Licin
    metalness: 0.8  // Seperti logam
});
const stage = new THREE.Mesh(stageGeo, stageMat);
stage.position.y = -2.5; // Turunkan sedikit
stage.receiveShadow = true;
scene.add(stage);

// Grid Helper Transparan (Hiasan Lantai)
const gridHelper = new THREE.GridHelper(20, 20, 0x00f3ff, 0x222222);
gridHelper.position.y = -2.24;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.2;
scene.add(gridHelper);

// ==========================================
// 4. GENERATOR KARAKTER (VOXEL & SHAPES)
// ==========================================
// Peta Bitmap Huruf (5x3 Grid)
const fontMap = {
    'A':[[0,1,0],[1,0,1],[1,1,1],[1,0,1],[1,0,1]], 'B':[[1,1,0],[1,0,1],[1,1,0],[1,0,1],[1,1,0]],
    'C':[[0,1,1],[1,0,0],[1,0,0],[1,0,0],[0,1,1]], 'D':[[1,1,0],[1,0,1],[1,0,1],[1,0,1],[1,1,0]],
    'E':[[1,1,1],[1,0,0],[1,1,0],[1,0,0],[1,1,1]], 'F':[[1,1,1],[1,0,0],[1,1,0],[1,0,0],[1,0,0]],
    'G':[[0,1,1],[1,0,0],[1,0,1],[1,0,1],[0,1,1]], 'H':[[1,0,1],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],
    'I':[[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]], 'J':[[0,0,1],[0,0,1],[0,0,1],[1,0,1],[0,1,0]],
    'K':[[1,0,1],[1,0,1],[1,1,0],[1,0,1],[1,0,1]], 'L':[[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],
    'M':[[1,0,1],[1,1,1],[1,0,1],[1,0,1],[1,0,1]], 'N':[[1,1,0],[1,0,1],[1,0,1],[1,0,1],[1,0,1]],
    'O':[[0,1,0],[1,0,1],[1,0,1],[1,0,1],[0,1,0]], 'P':[[1,1,0],[1,0,1],[1,1,0],[1,0,0],[1,0,0]],
    'Q':[[0,1,0],[1,0,1],[1,0,1],[1,1,0],[0,0,1]], 'R':[[1,1,0],[1,0,1],[1,1,0],[1,1,0],[1,0,1]],
    'S':[[0,1,1],[1,0,0],[0,1,0],[0,0,1],[1,1,0]], 'T':[[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
    'U':[[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,0]], 'V':[[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,0]],
    'W':[[1,0,1],[1,0,1],[1,0,1],[1,1,1],[1,0,1]], 'X':[[1,0,1],[1,0,1],[0,1,0],[1,0,1],[1,0,1]],
    'Y':[[1,0,1],[1,0,1],[0,1,0],[0,1,0],[0,1,0]], 'Z':[[1,1,1],[0,0,1],[0,1,0],[1,0,0],[1,1,1]],
    '0':[[0,1,0],[1,0,1],[1,0,1],[1,0,1],[0,1,0]], '1':[[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
    '2':[[0,1,0],[1,0,1],[0,0,1],[0,1,0],[1,1,1]], '3':[[1,1,0],[0,0,1],[0,1,0],[0,0,1],[1,1,0]],
    '4':[[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]], '5':[[1,1,1],[1,0,0],[1,1,0],[0,0,1],[1,1,0]],
    '6':[[0,1,1],[1,0,0],[1,1,0],[1,0,1],[0,1,0]], '7':[[1,1,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0]],
    '8':[[0,1,0],[1,0,1],[0,1,0],[1,0,1],[0,1,0]], '9':[[0,1,0],[1,0,1],[0,1,1],[0,0,1],[0,1,0]],
    '-':[[0,0,0],[0,0,0],[1,1,1],[0,0,0],[0,0,0]], '?':[[0,1,0],[1,0,1],[0,1,0],[0,0,0],[0,1,0]]
};

// Geometri Dasar (Primitif)
const boxGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const sphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
const crystalGeo = new THREE.OctahedronGeometry(0.25);

// Grup Utama Penampung Objek
const contentGroup = new THREE.Group();
scene.add(contentGroup);

function createChar(char, color, shapeType) {
    const charGroup = new THREE.Group();
    const map = fontMap[char] || fontMap['?'];
    
    // Pilih geometri
    let geo = boxGeo;
    if (shapeType === 'sphere') geo = sphereGeo;
    if (shapeType === 'crystal') geo = crystalGeo;

    const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
    });

    map.forEach((row, r) => {
        row.forEach((pixel, c) => {
            if (pixel) {
                const mesh = new THREE.Mesh(geo, mat);
                // Posisi pixel relatif (tengah)
                mesh.position.set((c - 1) * 0.5, (3 - r) * 0.5, 0);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                charGroup.add(mesh);
            }
        });
    });
    return charGroup;
}

// ==========================================
// 5. LOGIKA POSISI (LAYOUTING)
// ==========================================
function updateScene(char1, char2, num) {
    // Hapus objek lama
    while(contentGroup.children.length > 0) contentGroup.remove(contentGroup.children[0]);

    // -- Objek 1 (Kiri) --
    const obj1 = createChar(char1, 0x00f3ff, 'box'); // Cyan Box
    obj1.position.set(-3.5, 0, 0.5); // Geser kiri dan maju sedikit
    obj1.rotation.y = 0.4; // Menghadap serong ke tengah (Arc Layout)
    obj1.userData = { anim: 'spin' };
    contentGroup.add(obj1);

    // -- Objek 2 (Tengah) --
    const obj2 = createChar(char2, 0xbc13fe, 'sphere'); // Purple Sphere
    obj2.position.set(0, 0, -0.5); // Di tengah, agak mundur
    obj2.userData = { anim: 'float' };
    contentGroup.add(obj2);

    // -- Objek 3 (Kanan) --
    const obj3 = createChar(num, 0xffaa00, 'crystal'); // Gold Crystal
    obj3.position.set(3.5, 0, 0.5); // Geser kanan dan maju sedikit
    obj3.rotation.y = -0.4; // Menghadap serong ke tengah
    obj3.userData = { anim: 'pulse' };
    contentGroup.add(obj3);
}

// ==========================================
// 6. INTERAKSI UI
// ==========================================
const inputNama = document.getElementById('inputNama');
const inputNRP = document.getElementById('inputNRP');
const btnGenerate = document.getElementById('btnGenerate');
const infoText = document.getElementById('infoText');

function handleGenerate() {
    const nama = inputNama.value.trim().toUpperCase() || "USER";
    const nrp = inputNRP.value.trim() || "0";
    const c1 = nama.charAt(0);
    const c2 = nama.length > 1 ? nama.charAt(1) : "-";
    const n = nrp.slice(-1);
    
    infoText.innerText = `${c1}${c2} - ${n}`;
    updateScene(c1, c2, n);
}
btnGenerate.addEventListener('click', handleGenerate);
handleGenerate(); // Render awal

// ==========================================
// 7. RENDER LOOP & ANIMASI
// ==========================================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Animasi Panggung berputar sangat pelan
    stage.rotation.y = Math.sin(t * 0.1) * 0.05;

    // Animasi Karakter Individual
    contentGroup.children.forEach(obj => {
        if (obj.userData.anim === 'spin') {
            // Huruf Kiri: Rotasi pada sumbu Y
            obj.rotation.y = 0.4 + Math.sin(t) * 0.2; 
        }
        if (obj.userData.anim === 'float') {
            // Huruf Tengah: Melayang naik turun
            obj.position.y = Math.sin(t * 2) * 0.2;
        }
        if (obj.userData.anim === 'pulse') {
            // Angka Kanan: Membesar mengecil
            const s = 1 + Math.sin(t * 3) * 0.1;
            obj.scale.set(s, s, s);
            // Rotasi kristal agar berkilau
            obj.rotation.y = -0.4 + t * 0.5;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

// Responsif saat window di-resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();