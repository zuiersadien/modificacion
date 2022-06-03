import axios from 'axios'

const api_url = import.meta.env.VITE_API_BACKOFFICE

export const CallBackOffice = async () => {
  const res = await fetch(`${api_url}/api/params`)
  const jres = await res.json()

  return jres
}

export const sendQuoteBuy = async (request: object) => {
  return axios
    .post(`${api_url}/api/v1/quotation/buy`, request)
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
    .post(`${api_url}/api/v1/session/register`, request)
    .then((res) => {
      //   e.preventDefault()
      //   location.href = 'http://criptobank.pe/login'
      //   console.log(res.data)
      //   buttonRegister.value = false
      //   console.log(res.data)
      console.log('response axios.post ==> ', res)
      return res.data
    })
    .catch((error) => {
      console.log(error.response)
      return error
    })
}
