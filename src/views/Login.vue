<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({ username: 'admin', password: '123456' })
const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度在3到20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在6到16个字符之间', trigger: 'blur' }
  ]
}
const formRef = ref(null)

const login = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      // 实际项目中这里替换为接口请求
      router.push('/loading')
    }
  })
}
</script>

<template>
  <div class="login-container">
    <!-- From Uiverse.io by Smit-Prajapati --> 
<div class="loader">
  <div class="box">
    <div class="logo">
      
    </div>
  </div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

    <div class="login-box">
      <h1 class="title">项目管理系统</h1>
      <p class="subtitle">欢迎回来，请登录您的账号</p>
      <el-form ref="formRef" :model="formData" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入账号" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" prefix-icon="Lock" />
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="login">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000000;
  position: relative;
  overflow: hidden;
}

.login-box {
  /* background: rgba(0, 0, 0, 0.8); */
  padding: 3rem;
  border-radius: 16px;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(8px);
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  animation: fadeIn 0.8s ease-in-out;
}

.title {
  text-align: center;
  color: #4777e6;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.login-form {
  margin-top: 2rem;
}

:deep(.el-form-item) {
  margin-bottom: 25px;
}

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.el-form-item__error) {
  color: rgba(255, 77, 79, 0.8);
}

:deep(.el-input) {
  --el-input-bg-color: rgba(255, 255, 255, 0.05);
  --el-input-border-color: rgba(255, 255, 255, 0.1);
  --el-input-hover-border-color: rgba(255, 255, 255, 0.2);
  --el-input-focus-border-color: #4777e6;
  height: 45px;
}

:deep(.el-input__wrapper) {
  background-color: var(--el-input-bg-color);
  box-shadow: 0 0 0 1px var(--el-input-border-color) inset;
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset !important;
}

:deep(.el-input__inner) {
  height: 100%;
  color: #ffffff;
  font-size: 16px;
}

:deep(.el-input__prefix-inner .el-icon) {
  color: rgba(255, 255, 255, 0.5);
}

.login-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #6e8efb, #4777e6);
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(71, 119, 230, 0.4);
  background: linear-gradient(135deg, #7b99ff, #5483ff);
}

.login-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(71, 119, 230, 0.4);
}
/* From Uiverse.io by Smit-Prajapati */ 
.loader {
  --size: 750px;
  --duration: 2s;
  --logo-color: grey;
  --background: linear-gradient(
    0deg,
    rgba(50, 50, 50, 0.2) 0%,
    rgba(100, 100, 100, 0.2) 100%
  );
  height: var(--size);
  aspect-ratio: 1;
  position: relative;
}

.loader .box {
  position: absolute;
  background: rgba(100, 100, 100, 0.15);
  background: var(--background);
  border-radius: 50%;
  border-top: 1px solid rgba(100, 100, 100, 1);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
  backdrop-filter: blur(5px);
  /* animation: ripple var(--duration) infinite ease-in-out; */
}

.loader .box:nth-child(1) {
  inset: 40%;
  z-index: 99;
}

.loader .box:nth-child(2) {
  inset: 30%;
  z-index: 98;
  border-color: rgba(100, 100, 100, 0.8);
  /* animation-delay: 0.2s; */
}

.loader .box:nth-child(3) {
  inset: 20%;
  z-index: 97;
  border-color: rgba(100, 100, 100, 0.6);
  /* animation-delay: 0.4s; */
}

.loader .box:nth-child(4) {
  inset: 10%;
  z-index: 96;
  border-color: rgba(100, 100, 100, 0.4);
  /* animation-delay: 0.6s; */
}

.loader .box:nth-child(5) {
  inset: 0%;
  z-index: 95;
  border-color: rgba(100, 100, 100, 0.2);
  /* animation-delay: 0.8s; */
}

.loader .logo {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  padding: 30%;
}

.loader .logo svg {
  fill: var(--logo-color);
  width: 100%;
  /* animation: color-change var(--duration) infinite ease-in-out; */
}

@keyframes ripple {
  0% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
  }
  50% {
    transform: scale(1.3);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px -0px;
  }
  100% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
  }
}

@keyframes color-change {
  0% {
    fill: var(--logo-color);
  }
  50% {
    fill: white;
  }
  100% {
    fill: var(--logo-color);
  }
}

</style>'