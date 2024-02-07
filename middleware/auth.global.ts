// eslint-disable-next-line consistent-return
import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware(to => {
  const userStorage = useUserStore()

  if (process.client) {
    if (to?.query?.code) {
      console.debug(to)
      userStorage.googleAuth(to.query.code)
    }
  }
})
