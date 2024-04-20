// eslint-disable-next-line consistent-return
import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    const userStorage = useUserStore()

    if (to?.query?.code) {
      if (to?.query?.sso_provider === 'google') {
        userStorage.googleAuth(to.query.code)
      } else if (to?.query?.sso_provider === 'facebook') {
        userStorage.facebookAuth(to.query.code)
      }
      return navigateTo('/');
    }
  }
})
