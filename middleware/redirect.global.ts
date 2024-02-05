import { useUserStore } from '../store/user'

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    if (/^\/?profile(\/\w+)?\/?$/.test(to.path)) {
      const userStorage = useUserStore()

      if (!userStorage.isLoggedIn) {
        // eslint-disable-next-line no-console
        console.info('💥 The user is not logged in to the account!')
        return navigateTo('/')
      }
    }
  }
})
