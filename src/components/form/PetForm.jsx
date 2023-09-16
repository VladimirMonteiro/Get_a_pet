import { useState } from "react"

import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./Select"


const PetForm = ({handleSubmit, petData, btnText})=> {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Caramelo', 'Preto', 'Cinza']

    function onFileChange(e){
        setPet({...pet, images: [...e.target.files]})

    }

    function handleChange(e){
        setPet({...pet, [e.target.name]: [e.target.value]})

    }

    function handleColor(e){
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})

    }

    function submit(e){
        e.preventDefault()
        console.log(pet)
       // handleSubmit(pet)

    }

    return(
        <form className={formStyles.form_container} onSubmit={submit}>
            <Input text='Imagens do pet' type='file' name='images' handleOnChange={onFileChange} multiple= {true}/>
            <Input text='Nome do pet' type='text' name='name' placeholder='Digite o nome do pet' handleOnChange={handleChange} value={pet.name || ''}/>
            <Input text='Idade do pet' type='text' name='age' placeholder='Digite a idade do pet' handleOnChange={handleChange} value={pet.age || ''}/>
            <Input text='Peso do pet' type='text' name='weight' placeholder='Digite o peso do pet' handleOnChange={handleChange} value={pet.weight || ''}/>
            <Select name='color' text='selecione uma opção' options={colors} handleOnChange={handleColor} value={pet.color || ''}/>

            <input type="submit" value={btnText} />
    
        </form>
    )
}

export default PetForm