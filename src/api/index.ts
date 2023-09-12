import axios from 'axios'

export const getToken = () => {
  const token = document.cookie.match(/odev-token=([^ ;]*)/)
  const localstorageToken = window.localStorage.getItem('odev-token')
  if (token && token.length > 0) {
    return token[1]
  }
  if (localstorageToken) {
    return localstorageToken
  }
  return null
}

// eslint-disable-next-line no-magic-numbers
const msInMonth = 1000 * 3600 * 24 * 30

export const setToken = (user, token) => {
  const expirationDate = new Date(Date.now() + msInMonth).toUTCString()
  document.cookie = `odev-token=${token}; expires${expirationDate}; path=/`
  window.localStorage.setItem('odev-token', token)

  const cacheItem = {
    name: `${user.last_name} ${user.first_name}`,
    id: user.id,
    token,
  }
  const cacheString = window.localStorage.getItem('users')
  if (cacheString) {
    const cache = JSON.parse(cacheString)
    if (!cache[user.id]) {
      cache[user.id] = cacheItem
      window.localStorage.setItem('users', JSON.stringify(cache))
    }
  } else {
    window.localStorage.setItem(
      'users',
      JSON.stringify({ [user.id]: cacheItem }),
    )
  }
}

export const deleteToken = () => {
  document.cookie.split(';').forEach(cookie => {
    document.cookie = cookie
      .replace(/^ +/, '')
      // eslint-disable-next-line no-div-regex
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
  })
  window.localStorage.removeItem('odev-token')
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
})

apiClient.interceptors.request.use(request => {
  const token = getToken()
  if (token && request.url !== '/login/') {
    request.headers.Authorization = `Token ${token}`
  }
  return request
})

apiClient.interceptors.response.use(
  ({ config, data }) => {
    if (config.url === '/login/') setToken(data.user, data.token)
    return data
  },
  error => {
    console.error(error)
    if (error.response.config.url.startsWith('/risks/my_global_role')) {
      return Promise.reject(error)
    }
    // to let others parts of the code to catch the same error
    // and to omit the fail to the `then` block
    return Promise.reject(error)
  },
)

// api methods return any type because of AxiosInstance response intercepting
/* eslint-disable @typescript-eslint/no-explicit-any */
export class HTTP {
  static get(endpoint = '', params = {}): Promise<any> {
    return apiClient.get(`${endpoint}`, params)
  }

  static post(endpoint = '', data = {}, config = {}): Promise<any> {
    return apiClient.post(`${endpoint}`, data, config)
  }

  static patch(endpoint = '', data = {}): Promise<any> {
    return apiClient.patch(`${endpoint}`, data)
  }

  static put(endpoint = '', data = {}): Promise<any> {
    return apiClient.put(`${endpoint}`, data)
  }

  static delete(endpoint = '', params = {}): Promise<any> {
    return apiClient.delete(`${endpoint}`, params)
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// export class Endpoint<T> {
//   model
//   endpoint: string
//   cache: boolean
//   ruName?: string | undefined
//   wordEnd?: string

//   constructor(
//     endpoint,
//     endpointChild,
//     cache = false,
//     ruName: undefined | string = undefined,
//     wordEnd = '',
//   ) {
//     this.endpoint = endpoint
//     this.model = endpointChild
//     this.cache = cache
//     this.ruName = ruName
//     this.wordEnd = wordEnd
//   }

//   get(id, params = {}): Promise<T> {
//     return (
//       apiClient
//         .get(`${this.endpoint}/${id}${id ? '/' : ''}`, params)
//         // eslint-disable-next-line new-cap
//         .then(data => new this.model(data))
//     )
//   }

//   async list(params = {}): Promise<Array<T>> {
//     const key = this.endpoint + JSON.stringify(params)
//     if (this.cache && caches[key]) return caches[key]

//     const request = await apiClient
//       .get(`${this.endpoint}/`, params)
//       // eslint-disable-next-line new-cap
//       .then(array => array.map(element => new this.model(element)))

//     if (this.cache) caches[key] = request

//     return request
//   }

//   post(data: Serializable | object, params = {}): Promise<T> {
//     const info = 'serialize' in data ? data.serialize() : data
//     return apiClient.post(`${this.endpoint}/`, info, params).then(element => {
//       if (this.ruName)
//         emitter.$emit('success', `${this.ruName} успешно создан${this.wordEnd}`)
//       // eslint-disable-next-line new-cap
//       return new this.model(element)
//     })
//   }

//   patch(data: Serializable | object, params = {}, qargs = ''): Promise<T> {
//     const info = 'serialize' in data ? data.serialize() : data
//     return apiClient
//       .patch(`${this.endpoint}/${data?.id}/${qargs}`, info, params)
//       .then(element => {
//         if (this.ruName) emitter.$emit('success', 'Изменения успешно сохранены')
//         // eslint-disable-next-line new-cap
//         return new this.model(element)
//       })
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   delete(id, params = {}): Promise<any> {
//     return apiClient.delete(`${this.endpoint}/${id}`, params).then(data => {
//       if (this.ruName)
//         emitter.$emit(
//           'success',
//           `  ${this.ruName} успешно удален${this.wordEnd}`,
//         )
//       return data
//     })
//   }
// }
