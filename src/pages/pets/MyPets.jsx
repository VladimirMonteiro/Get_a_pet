import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function MyPets(){

    const [pets, setPets] = useState([])

    return(
        <section>
            <div>
            <h1>My pets</h1>
            <Link to = '/pets/add'>Cadastrar pet</Link>
            </div>
            <div>
                {pets.length > 0 && <p>Meu pets cadastrados</p>}
                {pets.length === 0 && <p>Não há pets cadastrados</p>}

            </div>

        </section>
    )
}