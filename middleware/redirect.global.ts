import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    if (/^\/?profile(\/\w+)?\/?$/.test(to.path)) {
      const userStorage = useUserStore()

      if (!userStorage.isLoggedIn) {
        console.info('💥 The user is not logged in to the account!')
        return navigateTo('/')
      }
    }
  }
})
