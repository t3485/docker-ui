<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { type FormInstance } from "element-plus"
import { type LoginRequestData } from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Owl from "./components/Owl.vue"
import { useFocus } from "./hooks/useFocus"
import { useUserStore } from "@/store/modules/user"

const router = useRouter()

const { isFocus } = useFocus()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

const loginFormData: LoginRequestData = reactive({
  key: "",
  secret: ""
})
/** 登录逻辑 */
const handleLogin = () => {
  useUserStore().login({ key: loginFormData.key, secret: loginFormData.secret })
  router.push({ path: "/" })
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input v-model.trim="loginFormData.key" placeholder="key" type="text" tabindex="1" size="large" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="loginFormData.secret" placeholder="secret" type="text" tabindex="2" size="large" />
          </el-form-item>
          <el-button type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
