import axios from 'axios'

const baseUrl = 'http://localhost:5000/api'

const api = {
  async getAllBanks() {
    const res = await axios.get(`${baseUrl}/banks/get-all`)
  
    return res.data
  },
  async createBank(bank) {
    const res = await axios.post(`${baseUrl}/banks/create`, {bank})
  
    return res.data
  },
  async deleteBank(bankId) {
    const res = await axios.delete(`${baseUrl}/banks/delete/${bankId}`)
  
    return res.data
  },
  async editBank(bankId, newBankData) {
    const res = await axios.put(`${baseUrl}/banks/edit/${bankId}`, {bank: newBankData})
    
    return res.data
  }
}

export default api 