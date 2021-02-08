import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/header'
import BanksPage from './pages/banks/banks-page'
import MortagePage from './pages/mortage/mortage-page'
import BankModalComp from './components/bank-modal/bank-modal'
import api from './api/api'
import AuthModal from './pages/auth/auth-page'

import 'antd/dist/antd.css'

function App() {
  const [bankModal, setBankModal] = useState({isOpen: false, type: '', bankData: {}})
  const [banks, setBanks] = useState(null)
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [user, setUser] = useState({})

  const getBanks = useCallback(async () => {
    const res = await api.getAllBanks()

    setBanks(res.banks)
  }, [])

  const createMortage = async (mortage) => {
    if (!user.username) {
      return false
    }

    const res = await api.addMortage(mortage)

    if (res.success) {
      setUser(res.user)
    }

    return res
  }

  const handleRemoveMortage = async (mortageId) => {
    if (!user.username) {
      return false
    }

    const res = await api.removeMortage(mortageId)

    if (res.success) {
      setUser(res.user)
    }

    return res
  }

  const checkIfUserIsLogined = useCallback(async () => {
    const res = await api.getNewAccessToken()

    if (res.success) {
      setUser(res.user)
    } else {
      setUser({})
    }
  }, [])

  useEffect(() => {
    checkIfUserIsLogined()
  }, [checkIfUserIsLogined])

  const handleBankDelete = async (id) => {
    const res = await api.deleteBank(id)
    
    if (res.success) {
      setBanks(banks.filter(bank => bank._id !== id))
    }
  }

  const handleBankCreate = async (bank) => {
    const res = await api.createBank(bank)

    if (res.success) {
      setBanks([...banks, res.bank])
      return true
    }

    return false
  }

  const handleBankUpdate = async (id, bank) => {
    const res = await api.editBank(id, bank)

    const findAndUpdatebank = (bank) => {
      if (bank._id === id) {
        return res.bank
      }
      
      return bank
    }
    
    if (res.success) {
      const newBanksArr = banks.map(findAndUpdatebank)

      setBanks([...newBanksArr])

      return true
    }

    return false
  }

  const handleLogin = async (authData) => {
    const res = await api.login(authData)

    if (res.success) {
      setUser(res.user)
    } 

    return res
  }

  const handleRegister = async (authData) => {
    return await api.register(authData)
  }

  const handleLogout = async () => {
    const res = await api.logout()

    if (res.success) {
      setUser({})
    }

    return res
  }

  useEffect(() => {
    getBanks()
  }, [getBanks])
  
  return (
    <BrowserRouter>
      <Header logout={handleLogout} user={user} openAuthModal={() => setAuthModalOpen(true)} />

      <BankModalComp
        updateBank={(id, bank) => handleBankUpdate(id, bank)}
        createBank={(bank) => handleBankCreate(bank)}
        closeModal={() => setBankModal({isOpen: false})}
        modalData={bankModal} />
      
      <AuthModal 
        login={authData => handleLogin(authData)}
        register={authData => handleRegister(authData) }
        closeModal={() => setAuthModalOpen(false)} 
        isModalOpen={isAuthModalOpen} />

      <main>
        <Switch>
          <Redirect from="/" to="/banks" exact />
          <Route path="/banks">
            <BanksPage 
              banks={banks} 
              deleteBank={handleBankDelete} 
              openBankModal={(type, bankData) => setBankModal({isOpen: true, type, bankData})} />
          </Route>
          <Route path='/mortage'>
            <MortagePage 
              removeMortage={handleRemoveMortage}
              createMortage={createMortage} 
              mortagesHistory={user.mortages} banks={banks}/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
