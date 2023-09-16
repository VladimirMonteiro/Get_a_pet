import { useState, useEffect } from 'react'
import api from '../../utils/api'
import useFlashMessage from '../../hooks/useFlashMessage'

import formStyles from '../../components/form/Form.module.css'
import styles from './Profile.module.css'
import Input from '../../components/form/Input'
import RoundedImage from '../../components/roundedImage/RoundedImage'


export default function Profile(){

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState('')
    const [token] = useState(localStorage.getItem('token'|| ''))
    const {setFlashMessage} = useFlashMessage()



    useEffect(() => {
        api
          .get('/users/checkuser', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setUser(response.data)
          })
      }, [token])
    
      function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
      }
    
      function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        let msgType = 'success'
    
        const formData = new FormData()
    
        const userFormData = await Object.keys(user).forEach((key) =>
          formData.append(key, user[key]),
        )
    
        formData.append('user', userFormData)
    
        const data = await api
          .patch(`/users/edit/${user._id}`, formData, {
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
            <div className={styles.profile_container}>
                <h1>Perfil</h1>
                {(user.image || preview) && (<RoundedImage src={
              preview
                ? URL.createObjectURL(preview)
                : `${import.meta.env.VITE_API_URL}/images/users/${user.image}`
            }
            alt={user.name}/>)}
            </div>
            <form className={formStyles.form_container} onSubmit={handleSubmit}>
                <Input type='file' text='Imagem' name='image' handleOnChange={onFileChange}/>
                <Input type='email' text='E-mail' name='email'placeholder='digite seu email...' value={user.email || ''} handleOnChange={handleChange}/>
                <Input type='name' text='Nome' name='name'placeholder='digite seu nome...' handleOnChange={handleChange} value={user.name || ''}/>
                <Input type='text' text='Telefone' name='phone' placeholder='digite seu telefone...' handleOnChange={handleChange} value={user.phone || ''}/>
                <Input type='password' text='Password' name='password'placeholder='digite sua senha...' handleOnChange={handleChange} value={user.password || ''}/>
                <Input type='password' text='confirme sua senha' name='confirmPassword'placeholder='digite novamente sua senha...' handleOnChange={handleChange} />

                <input type="submit" value="Editar" />
              
            </form>
           
        </section>
    )
}