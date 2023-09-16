
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'
import useFlashMessage from './useFlashMessage'


export default function useAuth(){

    const [authenticaded, setAuthenticaded] = useState(false)
    const {setFlashMessage} = useFlashMessage()

    const navigate = useNavigate()

    useEffect(()=> {

      const token = localStorage.getItem('token')
      
      if(token){
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticaded(true)
      }
    }, [])

    async function register(user){

      let msgText = 'Cadastro realizado com sucesso'
      let typeMsg = 'sucess'
       
      try {
        const data = await api.post('/users/register',user).then((response)=> {
          return response.data
        })
  
        await authUser(data)
        
      } catch (error) {
        console.log(error)
        msgText = error.response.data.message
        typeMsg = 'error'
        
        
      }
      setFlashMessage(msgText, typeMsg)
      
    }

    async function authUser(data){

      setAuthenticaded(true)

      localStorage.setItem('token', JSON.stringify(data.token))

      navigate('/')

    }

    async function login(user){
      let msgText = 'login realizado com sucesso!'
      let msgType = 'sucess'


      try {
        
        const data = await api.post('/users/login', user).then((response)=> {
          return response.data
        })

        await authUser(data)
        
      } catch (error) {
        msgText = error.response.data.message
        msgType = 'error'
        
      }
      setFlashMessage(msgText, msgType)
    }

    function logout(){

      const msgText = 'logout realizado com sucesso!'
      const typeMsg = 'sucess'

      setAuthenticaded(false)
      localStorage.removeItem('token')
      api.defaults.Authorization = undefined
      navigate('/')

      setFlashMessage(msgText, typeMsg)
    }
    


    return {authenticaded, register, logout, login}
}