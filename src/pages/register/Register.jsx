

import Input from "../../components/form/Input"
import styles from '../../components/form/Form.module.css'


import { Link } from "react-router-dom"

import {useState, useContext} from 'react'

import { Context } from "../../context/UserContext"

const Register = () => {

    const [user, setUser] = useState({})
    const {register} = useContext(Context)


    
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //enviar usuario para o banco
        console.log(user)
         register(user)
    }
    
    
    
    return(
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                
                <Input text='Nome' name='name' id= 'name' type='text' placeholder='Digite seu nome...' handleOnChange={handleChange} />
                <Input text='Telefone' name='phone' type='text' placeholder='Digite seu telefone...' handleOnChange={handleChange} />
                <Input text='E-mail' name='email' type='email' placeholder='Digite seu E-mail...' handleOnChange={handleChange} />
                <Input text='Password' name='password' type='password' placeholder='Digite sua senha...' handleOnChange={handleChange} />
                <Input text='Password' name='confirmPassword' type='password' placeholder='Confirme sua senha...' handleOnChange={handleChange} />

                <input type="submit" value="Cadastrar" />
               
            </form>
            <p>Já possui conta? <Link to={`/login`}>Clique aqui!</Link></p>
        </section>
    )
}


export default Register