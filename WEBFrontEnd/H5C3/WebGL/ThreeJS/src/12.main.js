import * as THREE from "three";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入GSAP动画库
import gsap from "gsap";
// 导入GUI图形操作库
import * as dat from "dat.gui";

/**
 * 1.创建场景
 */
const scene = new THREE.Scene();

/**
 * 2.创建相机(
 */
// 创建透视相机; (角度, 宽高比,近端参, 远端参;)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置; (x,y,z);
camera.position.set(0, 0, 10);
// 把相机添加到场景中
scene.add(camera);

/**
 * 3.场景中添加物体
 */
// 创建几何体; (width,height,depth);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建基础网格材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体; (几何体Obj, 材质Obj);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 将几何体添加至场景中
scene.add(cube);
console.log(cube);
/**
 * 创建GUI
 */
const GUI = new dat.GUI();
// 添加物体位置控制
GUI.add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("ChangeX")
  .onChange((val) => {
    console.log("改变时触发", val);
  })
  .onFinishChange((val) => {
    console.log("改变并完全停下时触发", val);
  });
let params = {
  color: "#ff0",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};
// 添加物体颜色控制
GUI.addColor(params, "color").onChange((val) => {
  cube.material.color.set(val);
});
// 添加物体隐藏显示控制
GUI.add(cube, "visible").name("ShowOrHide");
// 添加按钮点击触发某个事件
GUI.add(params, "fn").name("ClickRun");
// 添加文件夹
let folder = GUI.addFolder("SetCube");
folder.add(cube.material, "wireframe").name("SetWireframe");

/**
 * 4.初始化渲染器
 */
// 创建渲染器;
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸大小; (画布宽, 画布高);
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body元素上
document.body.appendChild(renderer.domElement);

/**
 * 5.创建控制器
 */
// 创建轨道控制器; (相机,渲染器Canvas);
const control = new OrbitControls(camera, renderer.domElement);
// 设置阻尼感,操作效果更真实;
control.enableDamping = true;

// 最后使用渲染器,通过相机将场景渲染进来
renderer.render(scene, camera);

/**
 * 添加坐标轴辅助器
 */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * 封装渲染函数
 */
function render() {
  control.update();
  renderer.render(scene, camera);
  // 渲染下一帧时递归调用rander函数;
  requestAnimationFrame(render);
}
render();

/**
 * 监听窗口改变,重新渲染画布
 */
window.addEventListener("resize", () => {
  // 更新摄像头宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

/**
 * 双击控制全屏模式
 */
window.addEventListener("contextmenu", () => {
  // 判断是否在全屏状态(返回全屏元素DOM);
  if (document.fullscreenElement) {
    // 在全屏状态时退出全屏
    document.exitFullscreen();
  } else {
    // 不再全屏状态时开启全屏
    renderer.domElement.requestFullscreen();
  }
});
