<script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import * as dat from "three/examples/jsm/libs/lil-gui.module.min.js"
  import TWEEN from '@tweenjs/tween.js';


  

  // const canvas = ref<HTMLElement | null>(null)
  const scene = new THREE.Scene();
  const cameraGroup = new THREE.Group
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  const dirlight1 = new THREE.DirectionalLight(0xffffff,0.8)
  const dirlight2 = new THREE.DirectionalLight(0xffffff,0.3)
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  let sectionMeshes:any = []
  const init = ()=>{
    const canvas = document.querySelector('.webgl')
    scene.add(cameraGroup)
    cameraGroup.add(camera)
    camera.position.z = 7;
    /**
    * Object
    */

    const objectDistance = 4 //物体间距

    const geometry1 = new THREE.DodecahedronGeometry(1)
    const material1 = new THREE.MeshStandardMaterial({ color: 0x0000ff })
    const mesh1 = new THREE.Mesh(geometry1, material1)
  
    const geometry2 = new THREE.IcosahedronGeometry(1)
    const material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 })
    const mesh2 = new THREE.Mesh(geometry2, material2)

    const geometry3 = new THREE.OctahedronGeometry(1)
    const material3 = new THREE.MeshStandardMaterial({ color: 0xff00ff })
    const mesh3 = new THREE.Mesh(geometry3, material3)
    scene.add(mesh1,mesh2,mesh3)
    sectionMeshes = [mesh1,mesh2,mesh3]
    mesh1.position.x = -4
    mesh2.position.x = 4
    mesh3.position.x = -4
    mesh1.position.y = 0
    mesh2.position.y = - objectDistance * 1
    mesh3.position.y = - objectDistance * 2

    /**
     * light
    */
    dirlight1.position.set(1,1,0)
    dirlight2.position.set(-1,1,0)
    const ambLight = new THREE.AmbientLight(0xffffff,0.1)
    scene.add(dirlight1,dirlight2,ambLight)
    /**
     * 粒子背景
    */
    //模型
    const particlesCount = 400
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < positions.length; i++) {
      positions[i*3 + 0] = (Math.random()- 0.5) * 20
      positions[i*3 + 1] = (Math.random()- 0.5) * 2 * objectDistance * sectionMeshes.length
      positions[i*3 + 2] = (Math.random()- 0.5) * 20
    }
    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    //材质
    const particlesmaterial = new THREE.PointsMaterial({
      color: "#ffffff",
      // sizeAttenuation: true, //粒子大小深度衰减，默认为true
      size: 0.03
    })
    const particles = new THREE.Points(particlesGeometry,particlesmaterial)
    scene.add(particles)
    
    
    
    /**
     * Controls
     */
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true //开启控制的运动缓冲

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer(
      { 
        antialias: true,
        alpha:true
      }
    );
    renderer.setSize(sizes.width, sizes.height);
    canvas.appendChild(renderer.domElement);
    /* 
    *监听下拉
    */
    let scrollY = window.scrollY
  
    window.addEventListener('scroll',()=>{
      scrollY = window.scrollY
    })
    /**
     * 监听鼠标移动
     * 
    */
   const mousePosition = {
    x:0,
    y:0
   }
    window.addEventListener('mousemove', (event)=>{
      mousePosition.x = event.clientX / sizes.width - 0.5
      mousePosition.y = event.clientY / sizes.height -0.5
      

    })
      
    /**
     * 刷新tick
     * **/
    const clock = new THREE.Clock();
    let nowTime = 0
    function tick() {
      const ElapsedTime = clock.getElapsedTime()
      const deleteTime = ElapsedTime - nowTime
      nowTime = ElapsedTime
      //更新camera高度
      camera.position.y = - scrollY/sizes.height * objectDistance
      
      // 避免和下拉定位重复定位，改为cameraGroup定位,+=设置为缓动模式
      cameraGroup.position.x += (mousePosition.x - cameraGroup.position.x) * 4 * deleteTime
      cameraGroup.position.y += (- mousePosition.y - cameraGroup.position.y) * 4 * deleteTime
      // controls.update()
      // camera.lookAt(camera.position.x,camera.position.y,camera.position.z -7)
      /* 
      此场景不建议加入controls控制器，会引起camera lookat冲突导致视角一直看向（0，0，0）
      而不是正前方，会使场景显示不全,可以手动设定lookAt解决
      */
      
      for (const mesh of sectionMeshes) {
        mesh.rotation.x += deleteTime* 0.1
        mesh.rotation.y += deleteTime* 0.2
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();
    /* 
    *窗口尺寸变动更新
    */
    window.addEventListener('resize', () =>
    {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
  }
  onMounted(() => {
    init();
  })
</script>
<template>
  <div class="webgl"></div>
</template>

<style scoped>
.webgl{
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
