import api from "../../utils/api";
import styles from './PetDetails.module.css'

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFlashMessage from "../../hooks/useFlashMessage";


export default function PetDetails(){

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(()=> {

        api.get(`/pets/${id}`).then((response)=> {
            setPet(response.data.pet)
        })
    },[id])

    async function shedule(){

        let msgType = 'sucess'

        const data = await api.patch(`/pets/schedule/${pet._id}`, {Authorization: `Bearer ${JSON.parse(token)}`}).then((response)=>{
            return response.data

        }).catch((err)=> {
            msgType = 'error'
            return err.response.data
        })
        
        setFlashMessage(data.message, msgType)
    }

    return(
        <>

        {pet.name && (
            <section className={styles.pet_details_container}>
                <div className={styles.pet_details_header}>
                    <h1>Conhecendo o pet {pet.name}</h1>
                    <p>Se tiver interesse, marque uma visita para vê-lo</p>
                </div>
                <div className={styles.pet_images}>
              
                    {pet.images.map((image, index)=> (
                        <img src={`${import.meta.env.VITE_API_URL}/images/pets/${image}`} alt={pet.name} key={index} />
                    ))}
                </div>

                <p>
                    <span className="bold">Peso:{pet.weight}</span>
                </p>
                <p>
                <span className="bold">Idade:{pet.age}</span>
                </p>
                {token ? (<button onClick={shedule}>Solicitar uma visita</button>) : (<Link to='/register'><p>Crie uma conta para adotar!</p></Link>)}

            </section>
        )}
        
        
        </>
    )
}