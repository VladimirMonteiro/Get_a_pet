

//components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Container from './components/container/Container'
import Message from './components/message/Message.jsx'


import { Outlet } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'

function App() {


  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Message/>

        <Container>
          <Outlet />
        </Container>

        <Footer />
     

      </UserProvider>

    </div>
  )
}

export default App
