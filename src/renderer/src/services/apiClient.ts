import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import useAuthStore from '@renderer/stores/auth'
import useToastStore from '@renderer/stores/toast'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

// -------------------------------------------------------------- API Service Calls
//#region
async function post(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    config.data = data
  }

  const result = await axios(config)
  return result
}

async function postWithDownload(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'post',
    responseType: 'blob'
  }
  if (data) {
    config.data = data
  }
  const result = await axios(config)
  return result
}

async function get(url: string, isDownloadRequest: boolean = false) {
  const config: AxiosRequestConfig = {
    url,
    method: 'get'
  }

  if (isDownloadRequest) {
    config.responseType = 'blob'
  }

  const result = await axios(config)
  return result
}

async function put(url: string, data: any = null): Promise<any> {
  const config: AxiosRequestConfig = {
    url,
    method: 'put',
    data
  }
  const result = await axios(config)
  return result
}

async function deleteCall(url: string) {
  const config: AxiosRequestConfig = {
    url,
    method: 'delete'
  }
  const result = await axios(config)
  return result
}
//#endregion

axios.interceptors.request.use(
  async (config) => {
    const accessToken: string = useAuthStore.getState().sessionToken as any
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    return response
  },
  async (error: AxiosError) => {
    const data: any = await error.response?.data

    const { toastActions } = useToastStore.getState()

    if (data?.exception) {
      toastActions.show(data.exception)
    } else if (data?.message) {
      toastActions.show(data.message)
    } else {
      toastActions.show('Oops !!! something went wrong !!!')
    }

    return { data: null }
  }
)

//#endregion
const ApiService = {
  post,
  get,
  put,
  deleteCall,
  postWithDownload
}

export default ApiService

// -------------------------------------------------------------- API URLs
//#region
export const ApiUrls = {
  // user
  login: 'method/dinezo.api.os.auth.login',

  //products
  items_sync: 'method/dinezo.api.os.sync.get_items_sync',
  items_group: 'method/dinezo.api.os.sync.get_items_group_sync'
}
//#endregion
