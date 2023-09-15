import { useState, useContext } from "react"
import Input from "../../components/form/Input"
import { Context } from "../../context/UserContext"
import styles from '../../components/form/Form.module.css'
import { Link } from "react-router-dom"



const Login = () => {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})

    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }



    return(
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input type='email' text='E-mail' name='email' placeholder='Informe seu e-mail' handleOnChange={handleChange}/>
                <Input type='password' text='Password' name='password' placeholder='Informe sua senha' handleOnChange={handleChange}/>
                
                <input type="submit" value="Entrar" />
                <p>Não possui conta?<Link to='/register'>Clique aqui!</Link></p>
            </form>
        </section>
    )
}


export default Login