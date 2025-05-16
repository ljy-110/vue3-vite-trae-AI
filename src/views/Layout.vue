<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { menuConfig } from '@/config/menu'
const router = useRouter()
const dynamicMenus = ref([])
const redirectPath = ref('')

const handleMenuClick = (path) => {
  localStorage.setItem('lastMenuPath', path)
}

onMounted(async () => {
  // 检查本地存储是否有上次的菜单路径
  const lastMenuPath = localStorage.getItem('lastMenuPath')
  
  // 模拟获取动态菜单（实际项目中替换为API请求）
  const mockMenus = menuConfig
  dynamicMenus.value = mockMenus
  if (lastMenuPath) {
    redirectPath.value = lastMenuPath
    router.push(redirectPath.value)
  }else{
    if (dynamicMenus.value.length > 0) {
      const firstMenu = dynamicMenus.value[0]
      redirectPath.value = firstMenu.path
      if (firstMenu.children && firstMenu.children.length > 0) {
        redirectPath.value = firstMenu.children[0].path
      }
      router.push(redirectPath.value)
    }
  }
  
})

const handleProfile = () => {
  // 个人中心逻辑
}

const handleLogout = () => {
  router.push('/login')
}
</script>

<template>
  <div class="layout-container">
    <!-- 头部 -->
    <div class="header">
      <div class="system-name">管理后台</div>
      <div class="user-info">
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-dropdown>
          <span class="user-name">张三<el-icon><ArrowDown /></el-icon></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="main">
      <!-- 左侧菜单 -->
      <el-menu :default-active="redirectPath" class="left-menu" router unique-opened="true" 
      text-color="#fff" active-text-color="#409eff">
  <el-sub-menu v-for="menu in dynamicMenus" :key="menu.title" :index="menu.title">
    <template #title>
      <el-icon><component :is="menu.icon" /></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <el-menu-item v-for="child in menu.children" :key="child.title" :index="child.path" @click="handleMenuClick(child.path)">
  {{ child.title }}
</el-menu-item>
  </el-sub-menu>
</el-menu>
      <!-- 右侧内容 -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d2d2d;
  color: white;
  padding: 0 20px;
  font-size: 18px;
}
.main {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.left-menu {
  width: 200px;
  background: #2d2d2d;
  padding: 10px;
}
:deep(.el-sub-menu) {
  padding: 8px 0;
}
:deep(.el-sub-menu__title) {
  color: #fff;
}
:deep(.el-sub-menu__title:hover) {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1) !important;
}
:deep(.el-menu-item) {
  padding: 0 8px;
  /* color: #fff; */
  background-color: transparent !important;
}
:deep(.el-menu-item:hover) {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1) !important;
}
:deep(.el-sub-menu .el-menu) {
  background-color: transparent;
}
.content {
  flex: 1;
  padding: 20px;
  background: white;
  overflow-y: auto;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-name {
  color: #fff;
  margin-left: 8px;
}
</style>
