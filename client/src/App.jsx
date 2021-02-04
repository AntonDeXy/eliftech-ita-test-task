import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/header'
import BanksPage from './pages/banks/banks-page'
import MortagePage from './pages/mortage/mortage-page'
import BankModalComp from './components/bank-modal/bank-modal'
import api from './api/api'

function App() {
  const [bankModal, setBankModal] = useState({isOpen: false, type: '', bankData: {}})
  const [banks, setBanks] = useState(null)

  const getBanks = useCallback(async () => {
    const res = await api.getAllBanks()

    setBanks(res.banks)
  }, [])

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

  useEffect(() => {
    getBanks()
  }, [getBanks])
  
  return (
    <BrowserRouter>
      <Header />
      <BankModalComp
        updateBank={(id, bank) => handleBankUpdate(id, bank)}
        createBank={(bank) => handleBankCreate(bank)}
        closeModal={() => setBankModal({isOpen: false})}
        modalData={bankModal} />
      <main>
        <Switch>
          <Redirect from="/" to="/banks" exact />
          <Route path="/banks">
            <BanksPage 
              banks={banks} 
              deleteBank={handleBankDelete} 
              openBankModal={(type, bankData) => setBankModal({isOpen: true, type, bankData})} />
          </Route>
          <Route path="/mortage">
            <MortagePage banks={banks}/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
