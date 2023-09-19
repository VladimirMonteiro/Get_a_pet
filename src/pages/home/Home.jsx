import api from "../../utils/api"
import { useState, useEffect } from "react"
import styles from './Home.module.css'
import { Link } from "react-router-dom"
const Home = () => {

    const [pets, setPets] = useState([])

    useEffect(()=> {

        api.get('/pets').then((response) => setPets(response.data.pets))
       
    },[])

    return(
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um pet</h1>
                <p>Veja os detalhes de cada um e fale com o seu tutor</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 && pets.map((pet)=> (
                    <div key={pet._id} className={styles.pet_card}>
                        <div style={{backgroundImage:`url(${import.meta.env.VITE_API_URL}/images/pets/${pet.images[0]})`}} className={styles.pet_card_image}>

                        </div>
                        <h3>{pet.name}</h3>
                        <p className="bold">peso:{pet.weight}</p>
                        {pet.avaible ? (<Link to={`/pets/${pet._id}`}>Mais detalhes</Link>): (<p className={styles.adopter_text}>Adotado!</p>)}
                    </div>
                ))}
                {pets.length === 0 && ( <p>Não há pets cadastrados ou disponiveis no momento</p>)}
            </div>
        </section>
    )
}

export default Home