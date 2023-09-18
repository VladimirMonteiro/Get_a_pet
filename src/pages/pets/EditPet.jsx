import api from "../../utils/api"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from './AddPet.module.css'
import PetForm from '../../components/form/PetForm'
import useFlashMessage from "../../hooks/useFlashMessage"

export default function EditPets(){

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token' || ''))
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage() 


    useEffect(()=> {

        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response)=> {
            setPet(response.data.pet)

        })
    }, [token, id])

    async function updatePet(pet) {
        let msgType = 'sucess'
    
        const formData = new FormData()
    
        const petFormData = await Object.keys(pet).forEach((key) => {
          if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
              formData.append(`images`, pet[key][i])
            }
          } else {
            formData.append(key, pet[key])
          }
        })
    
        formData.append('pet', petFormData)
    
        const data = await api
          .patch(`pets/${pet._id}`, formData, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response.data)
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
            <div className={styles.addpet_header}>
                <h1>Editando o pet {pet.name}</h1>
            </div>
            {pet.images && (<PetForm handleSubmit={updatePet} btnText='Atualizar pet' petData={pet}/>)}

        </section>
    )
}