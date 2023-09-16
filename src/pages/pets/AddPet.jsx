import styles from './AddPet.module.css'

import api from '../../utils/api'
import { useState } from 'react'
import { Navigate } from 'react-router'
import useFlashMessage from '../../hooks/useFlashMessage'

import PetForm from '../../components/form/PetForm'

const AddPet = () => {

    return(
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um pet</h1>
                <p>Depois ele ficará disponivel para adoção</p>
            </div>
            <PetForm btnText='Cadastrar pet'/>

        </section>

    )
}

export default AddPet