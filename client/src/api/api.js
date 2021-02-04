import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'

const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

const saveRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

const getAccessTokenFromLS = () => {
  return localStorage.getItem('accessToken')
}

const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refreshToken')
}

const removeTokensFromLs = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

axios.interceptors.request.use(
  config => {
    const token = getAccessTokenFromLS()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => {
    console.log(err)
  }
)

// axios.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config
//     if (originalRequest.url === `${baseUrl}/new-token`) {
//       removeTokensFromLs()
//       window.location.href = '/'
//     }
//     const refreshToken = getRefreshTokenFromLS()
//     if ((error.response.status === 401 || error.response.status === 403) && refreshToken && !originalRequest._retry) {
//       originalRequest._retry = true
//       const newToken = await api.getNewAccessToken(refreshToken)
//       if (newToken.success) {
//         saveAccessTokenToLS(newToken.accessToken)
//         return axios(originalRequest)
//       } else {
//         window.location.href = '/'
//       }
//     } else {
//       window.location.href = '/'
//     }
//   }
// )

const api = {
  async getAllBanks() {
    const res = await axios.get(`${baseUrl}/banks/get-all`)

    return res.data
  },
  async createBank(bank) {
    const res = await axios.post(`${baseUrl}/banks/create`, { bank })

    return res.data
  },
  async deleteBank(bankId) {
    const res = await axios.delete(`${baseUrl}/banks/delete/${bankId}`)

    return res.data
  },
  async editBank(bankId, newBankData) {
    const res = await axios.put(`${baseUrl}/banks/edit/${bankId}`, {
      bank: newBankData,
    })

    return res.data
  },
  async addMortage(mortage) {
    const res = await axios.post(
      `${baseUrl}/add-mortage`,
      { mortage },
      // { headers: { Authorization: getAccessTokenFromLS() } }
    )

    return res.data
  },
  async removeMortage(mortageId) {
    const res = await axios.delete(`${baseUrl}/remove-mortage/${mortageId}`, {
      // headers: { Authorization: getAccessTokenFromLS() },
    })

    return res.data
  },
  async login(authData) {
    try {
      const res = await axios.post(`${baseUrl}/login`, { ...authData })

      saveAccessTokenToLS(res.data.accessToken)
      saveRefreshTokenToLS(res.data.refreshToken)
      
      return res.data
    } catch (err) {
      return err.response.data
    }
    

  },
  async register(authData) {
    try {
      const res = await axios.post(`${baseUrl}/register`, { ...authData })
      return res.data
    } catch (err) {
      return err.response.data
    }
  },
  async logOut() {
    const refreshToken = getRefreshTokenFromLS()
    const res = await axios.post(`${baseUrl}/logout`, { refreshToken })

    if (res.status === 204) {
      removeTokensFromLs()
      return { success: true }
    }

    return { success: false }
  },
  async getNewAccessToken() {
    const refreshToken = getRefreshTokenFromLS()

    if (refreshToken) {
      const res = await axios.post(`${baseUrl}/get-new-token`, { refreshToken })

      if (res.status === 401 || res.status === 403) {
        return { success: false }
      } else {
        saveAccessTokenToLS(res.data.accessToken)

        return {
          success: true,
          accessToken: res.data.accessToken,
          user: res.data.user,
        }
      }
    } else {
      return { success: false }
    }
  },
}

export default api
