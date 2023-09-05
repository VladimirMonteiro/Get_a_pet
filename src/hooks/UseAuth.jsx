

import {useState, useEffect} from 'react'
import {redirect} from 'react-router-dom'
import axios from "axios";


export default function useAuth(){


    async function register(user){
       await  axios.post('http://localhost:5000/users/register', user)
        .then(response => {
          // Lide com a resposta de sucesso aqui
          console.log(response.data);
        })
        .catch(error => {
          // Lide com os erros aqui
          console.error(error);
        });
    }


    return {register}
}