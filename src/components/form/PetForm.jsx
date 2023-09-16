import { useState } from "react"

import formStyles from './Form.module.css'
import Input from "./Input"


const PetForm = ({handleSubmit, petData, btnText})=> {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])

    function onFileChange(){

    }

    function handleChange(e){

    }

    return(
        <form className={formStyles.form_container}>
            <Input text='Imagens do pet' type='file' name='images' handleOnChange={onFileChange} multiple={true}/>
            <Input text='Nome do pet' type='text' name='name' placeholder='Digite o nome do pet' handleOnChange={handleChange} value={pet.name || ''}/>
            <Input text='Idade do pet' type='text' name='age' placeholder='Digite a idade do pet' handleOnChange={handleChange} value={pet.age || ''}/>
            <Input text='Peso do pet' type='text' name='weight' placeholder='Digite o peso do pet' handleOnChange={handleChange} value={pet.weight || ''}/>

            <input type="submit" value={btnText} />
    
        </form>
    )
}

export default PetForm