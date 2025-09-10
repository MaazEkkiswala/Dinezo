import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import useAuthStore from '@renderer/stores/auth'

axios.defaults.baseURL = import.meta.env.API_BASE_URL
axios.defaults.withCredentials = true

// -------------------------------------------------------------- API Service Calls
//#region
async function post(url: string, data: any = null) {
  const config: AxiosRequestConfig = {
    url,
    method: 'post'
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
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.data instanceof Blob) {
      const { data } = response
      return { data }
    }

    return response.data
  },
  async (error: AxiosError) => {
    const data: any = await error.response?.data
    const status = error.response?.status
    if (status === axios.HttpStatusCode.UnprocessableEntity) {
      return { data: null, errors: data.errors }
    }

    // const { show } = useToastStore.getState()

    if (
      [
        axios.HttpStatusCode.InternalServerError,
        axios.HttpStatusCode.NotFound,
        axios.HttpStatusCode.BadRequest
      ].includes(status as any)
    ) {
      // const message = AppUtils.getErrorMsgFromBadRequest(data.errors)

      // show(message, 'error')
      return { data: null }
    }

    if (status === axios.HttpStatusCode.UnprocessableEntity) {
      return { data: null, errors: data.errors }
    }

    if (status === axios.HttpStatusCode.Forbidden) {
      // const message = AppUtils.getErrorMsgFromBadRequest(data.errors)

      // show(message, 'error')
      return { data: null }
    }

    if (status === axios.HttpStatusCode.Unauthorized) {
      return { data: null }
    }

    return { data: null, errors: data.errors }
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
  login: 'auth/login'
}
//#endregion
