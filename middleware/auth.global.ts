// eslint-disable-next-line consistent-return
import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware(to => {
  if (process.client) {
    const userStorage = useUserStore()

    if (to?.query?.code) {
      userStorage.googleAuth(to.query.code)
    }
  }
})
