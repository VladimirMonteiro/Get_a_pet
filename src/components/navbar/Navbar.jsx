
import {Link} from 'react-router-dom'

import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.png'

import { useContext } from 'react'
import { Context } from '../../context/UserContext'


const Navbar = () => {

    const {authenticaded, logout} = useContext(Context)

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt='get a pet' />
                <h2>Get a pet</h2>
            </div>
            <ul>
                <li><Link to='/'>Adotar</Link></li>
                {authenticaded ? (
                <>  
                    <li><Link to='/pets/mypets'>Meus pets</Link></li>
                    <li><Link to='/users/profile'>Perfil</Link></li>
                    <li onClick={logout}>Sair</li>
                    
                </>): 

                (<>
                    <li><Link to='/login'>Entrar</Link></li>
                    <li><Link to='/register'>Registrar</Link></li>
                </>
                )}
                
            </ul>

        </nav>
    )
}

export default Navbar