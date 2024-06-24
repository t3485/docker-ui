import router from "@/router"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import { getAppKey } from "@/utils/cache/local-storage"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  console.log(to)
  NProgress.start()
  const token = getAppKey()

  if (to.path !== "/login" && !token) {
    return next("/login")
  }
  return next()
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
