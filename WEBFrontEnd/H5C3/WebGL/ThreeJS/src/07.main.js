import * as THREE from "three";
import { AxesHelper } from "three";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
// 修改物体位置
// cube.position.set(5, 0, 0);
// cube.position.y = 3;
// 物体缩放
// cube.scale.set(1, 1, 3);
// cube.scale.z = 3;
// 物体选择
// cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");
// cube.rotation.x = Math.PI / 4;
// 将几何体添加至场景中
scene.add(cube);

/**
 * 4.初始化渲染器
 */
// 创建渲染器;
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸大小; (画布宽, 画布高);
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);
console.log(renderer.domElement);
// 将webgl渲染的canvas内容添加到body元素上
document.body.appendChild(renderer.domElement);

/**
 * 5.创建控制器
 */
// 创建轨道控制器; (相机,渲染器Canvas);
const control = new OrbitControls(camera, renderer.domElement);

// 最后使用渲染器,通过相机将场景渲染进来
renderer.render(scene, camera);

/**
 * 添加坐标轴辅助器
 */

const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

/**
 * 设置时钟
 */
const clock = new THREE.Clock();
/**
 * 封装渲染函数
 */
function render() {
  // 获取时钟运行总时长
  // let time = clock.getElapsedTime();
  // console.log(`时钟运行总时长为:${time}`);
  // 获取运行间隔时间(动画上一帧和下一帧的运行时差);
  let deltaTime = clock.getDelta();
  // console.log(`获取运行时间间隔:${deltaTime}`);
  
  // 两帧之差大概为0.008秒(8毫秒), 一秒 == 一千毫秒
  // 1000 / 8 就是一秒钟可以渲染多少帧(FPS计算);

  renderer.render(scene, camera);
  // 渲染下一帧时递归调用rander函数;
  requestAnimationFrame(render);
}
render();
