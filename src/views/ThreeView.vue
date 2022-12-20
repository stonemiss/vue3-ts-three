<script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import * as dat from "three/examples/jsm/libs/lil-gui.module.min.js"
import { TubeGeometry } from 'three';
  console.log(dat.GUI);
  

  // const canvas = ref<HTMLElement | null>(null)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const init = ()=>{
    const canvas = document.querySelector('.webgl')
    camera.position.set(0, 0, 5);
    /**
    * Object
    */

    const objectDistance = 2

    const geometry1 = new THREE.BoxGeometry(1, 1, 1)
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh1 = new THREE.Mesh(geometry1, material1)
  
    const geometry2 = new THREE.BoxGeometry(1, 1, 1)
    const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const mesh2 = new THREE.Mesh(geometry2, material2)

    const geometry3 = new THREE.BoxGeometry(1, 1, 1)
    const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const mesh3 = new THREE.Mesh(geometry3, material3)
    // scene.add(mesh1,mesh2,mesh3)

    mesh1.position.x = -2
    mesh2.position.x = 0
    mesh3.position.x = 2
    mesh1.position.y = - objectDistance * 0
    mesh2.position.y = - objectDistance * 1
    mesh3.position.y = - objectDistance * 2

    /**
     * 粒子背景
    */
    //模型
    const particlesCount = 200
    const positions = new Float32Array(particlesCount*3) 
    for (let i = 0; i < positions.length; i++) {
      positions[i*3 + 0] = (Math.random()- 0.5) * 10
      positions[i*3 + 1] = (Math.random()- 0.5) * 10
      positions[i*3 + 2] = (Math.random()- 0.5) * 10
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
    const renderer = new THREE.WebGLRenderer(
      { 
        antialias: true,
      }
    );
    renderer.setSize(sizes.width, sizes.height);
    canvas.appendChild(renderer.domElement);
    /**
     * 刷新
     * **/
    const clock = new THREE.Clock();
    function tick() {
      const ElapsedTime = clock.getElapsedTime()
      controls.update()
      requestAnimationFrame(tick);
      renderer.render(scene, camera);
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
  position: absolute;
}
</style>
