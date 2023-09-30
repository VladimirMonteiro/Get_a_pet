import { useState, useEffect } from "react"
import { Link} from "react-router-dom"
import api from "../../utils/api"

import useFlashMessage from "../../hooks/useFlashMessage"
import RoundedImage from '../../components/roundedImage/RoundedImage'



export default function MyPets(){

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token' || ''))
    const {setFlashMessage} = useFlashMessage()


    useEffect(() => {
        api
          .get('/pets/mypets', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setPets(response.data.userPets)
          })
      }, [token])

      async function removePet(id){

        let msgType = 'sucess'

        const data = await api.delete(`/pets/${id}`, {
          headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        }).then((response)=> {
          const uptadedPets = pets.filter((pet) => pet._id !== id)
          setPets(uptadedPets)

          return response.data

        }).catch((err)=> {
          msgType = 'error'

          return err.response.data
        })

        setFlashMessage(data.message, msgType)
      }

      async function concludeAdoption(id) {
        let msgType = 'sucess'
    
        const data = await api
          .patch(`/pets/conclude/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            return response.data
          })
          .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
          })
    
        setFlashMessage(data.message, msgType)
      }
    return(
        <section>
            <div className={style.petlist_header}>
            <h1>My pets</h1>
            <Link to = '/pets/add'>Cadastrar pet</Link>
            </div>
            <div className={style.petlist_container}>
                {pets.length > 0 && pets.map((pet)=> (
                    <div key={pet._id} className={style.petlist_row}>
                        <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/pets/${pet.images[0]}`} alt={pet.name} width='px75'/>
                        <span className="bold">{pet.name}</span>
                        <div className={style.actions}>
                            {pet.avaible ? (
                              <>
                              {pet.adopter && <button className={style.concluded_btn} onClick={()=> {
                                concludeAdoption(pet._id)
                              }}>Concluir adoção</button>}
                              <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                              <button onClick={()=> removePet(pet._id)}>Excluir</button>
                              </>
                            ): (<p>Pet adotado</p>)}
                        </div>
                    </div>
                ))}
                {pets.length === 0 && <p>Não há pets cadastrados</p>}

            </div>

        </section>
    )
}