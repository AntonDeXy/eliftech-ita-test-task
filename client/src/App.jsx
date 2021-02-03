import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/header'
import BanksPage from './pages/banks/banks-page'
import MortagePage from './pages/mortage/mortage-page'
import { useCallback, useEffect, useState } from 'react'
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
      getBanks()
    }
  }

  useEffect(() => {
    getBanks()
  }, [getBanks])
  
  return (
    <BrowserRouter>
      <Header />
      <BankModalComp
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
