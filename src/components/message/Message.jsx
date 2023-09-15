import { useState, useEffect } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'


const Message = ()=> {

    const [visibity, setVisibity] = useState(false)
    const[message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(()=> {

        bus.addListener('flash', ({type, message})=> {

            setVisibity(true)
            setMessage(message)
            setType(type)

            setTimeout(()=> {
                setVisibity(false)
            }, 3000)
        })

    }, [])

    return(
        visibity && (
            <div className={`${styles.message} ${styles[type]}`}>
                <p>{message}</p>
            </div>
        )

    )
}

export default Message