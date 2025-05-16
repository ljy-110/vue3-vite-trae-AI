<template>
  <div class="loading-container">
    <!-- From Uiverse.io by csozidev -->
    <div class="loader">
      <div class="box box-1">
        <div class="side-left"></div>
        <div class="side-right"></div>
        <div class="side-top"></div>
      </div>
      <div class="box box-2">
        <div class="side-left"></div>
        <div class="side-right"></div>
        <div class="side-top"></div>
      </div>
      <div class="box box-3">
        <div class="side-left"></div>
        <div class="side-right"></div>
        <div class="side-top"></div>
      </div>
      <div class="box box-4">
        <div class="side-left"></div>
        <div class="side-right"></div>
        <div class="side-top"></div>
      </div>
    </div>
    <div class="loading-text">正在加载中，请稍候...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isBackNavigation = ref(false)

onMounted(() => {
  // 检查是否是后退操作
  const hasVisitedLoading = localStorage.getItem('hasVisitedLoading')
  
  if (hasVisitedLoading === 'true') {
    // 如果已经访问过loading页面，则认为是后退操作
    localStorage.setItem('hasVisitedLoading', 'false')
    isBackNavigation.value = true
    console.log('检测到浏览器后退操作')
    // 这里可以添加后退操作的处理逻辑
    // 例如：立即跳转回dashboard或显示提示
    router.push('/login')
  } else {
    // 首次访问loading页面
    // 设置标记，表示已经访问过loading页面
    localStorage.setItem('hasVisitedLoading', 'true')
    
    // 设置5秒后自动跳转到dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: #000000;
  color: rgba(255, 255, 255, 0.6);
  gap: 2rem;
}

.loading-text {
  font-size: 1.2rem;
  letter-spacing: 1px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.loader {
  scale: 3;
  height: 50px;
  width: 40px;
}

.box {
  position: relative;
  opacity: 0;
  left: 10px;
}

.side-left {
  position: absolute;
  background-color: #4777e6;
  width: 19px;
  height: 5px;
  transform: skew(0deg, -25deg);
  top: 14px;
  left: 10px;
}

.side-right {
  position: absolute;
  background-color: #5483ff;
  width: 19px;
  height: 5px;
  transform: skew(0deg, 25deg);
  top: 14px;
  left: -9px;
}

.side-top {
  position: absolute;
  background-color: #6e8efb;
  width: 20px;
  height: 20px;
  rotate: 45deg;
  transform: skew(-20deg, -20deg);
}

.box-1 {
  animation: from-left 4s infinite;
}

.box-2 {
  animation: from-right 4s infinite;
  animation-delay: 1s;
}

.box-3 {
  animation: from-left 4s infinite;
  animation-delay: 2s;
}

.box-4 {
  animation: from-right 4s infinite;
  animation-delay: 3s;
}

@keyframes from-left {
  0% {
    z-index: 20;
    opacity: 0;
    translate: -20px -6px;
  }

  20% {
    z-index: 10;
    opacity: 1;
    translate: 0px 0px;
  }

  40% {
    z-index: 9;
    translate: 0px 4px;
  }

  60% {
    z-index: 8;
    translate: 0px 8px;
  }

  80% {
    z-index: 7;
    opacity: 1;
    translate: 0px 12px;
  }

  100% {
    z-index: 5;
    translate: 0px 30px;
    opacity: 0;
  }
}

@keyframes from-right {
  0% {
    z-index: 20;
    opacity: 0;
    translate: 20px -6px;
  }

  20% {
    z-index: 10;
    opacity: 1;
    translate: 0px 0px;
  }

  40% {
    z-index: 9;
    translate: 0px 4px;
  }

  60% {
    z-index: 8;
    translate: 0px 8px;
  }

  80% {
    z-index: 7;
    opacity: 1;
    translate: 0px 12px;
  }

  100% {
    z-index: 5;
    translate: 0px 30px;
    opacity: 0;
  }
}
</style>