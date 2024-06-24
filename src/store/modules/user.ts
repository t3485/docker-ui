import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { setAppKeyAndSecret, clearAppKeyAndSecret } from "@/utils/cache/local-storage"
import { resetRouter } from "@/router"
import { type LoginRequestData } from "@/api/login/types/login"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = ({ key, secret }: LoginRequestData) => {
    setAppKeyAndSecret(key, secret)
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }
  /** 登出 */
  const logout = () => {
    clearAppKeyAndSecret()
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, username, login, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
