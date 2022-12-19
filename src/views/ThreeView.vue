<script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


  // const canvas = ref<HTMLElement | null>(null)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const init = ()=>{
    const canvas = document.querySelector('.webgl')
    camera.position.set(0, 0, 10);
    /**
    * Object
    */
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)
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

<style>
</style>
