import axios from 'axios'

const api_url = import.meta.env.VITE_API_BACKOFFICE

export const CallBackOffice = async () => {
  const res = await fetch(`${api_url}/params`)
  const jres = await res.json()

  return jres
}

export const sendQuoteBuy = async (request: object) => {
  return axios
    .post(`${api_url}/quote/buy`, request)
    .then((res) => {
      console.log('response axios.post ==> ', res)
      return res.data
    })
    .catch((error) => {
      console.log(error.response)
      return error
    })
}

export const registerData = async (request: object) => {
  return axios
    .post(`${api_url}/session/register`, request)
    .then((res) => {
      //   e.preventDefault()
      //   location.href = 'http://criptobank.pe/login'
      //   console.log(res.data)
      //   buttonRegister.value = false
      //   console.log(res.data)
      return res.data
    })
    .catch((error) => {
      return error.response.data
    })
}
export const LoginData = async (request: object) => {
  console.log(request)
  return axios
    .post(`${api_url}/session/username`, request)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data
    })
}

export const CallSummary = async (code: string) => {
  const res = await fetch(`${api_url}/quote/${code}`)
  const jres = await res.json()
  return jres
}

export const CallPrivacyPolicies = async () => {
  const res = await fetch(
    `${api_url}/document/a271d7a5-7fa8-4cf0-a3bc-057b80ad0e1f`
  )
  const jres = await res.json()

  console.log(jres)
  return jres
}
export const pushClainStore = async (request: object) => {
  return axios
    .post(`${api_url}/complaint/store`, request)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data
    })
}
export const complaintGet = async (request: object) => {
  return axios
    .post(`${api_url}/complaint/get`, request)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data
    })
}
