// eslint-disable-next-line consistent-return
import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    const userStorage = useUserStore()

    if (to?.path === '/sso/google') {
        userStorage.googleAuth(to.query.code)
        return navigateTo('/')
    }
    if (to?.path === '/sso/facebook') {
        userStorage.facebookAuth(to.query.code)
        return navigateTo('/')
    }
  }
})
