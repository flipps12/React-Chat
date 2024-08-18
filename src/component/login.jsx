import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './nav';

const useAuthAPI = (requestTo, json) => {
  axios.post(`http://localhost:8080/api/v1/auth/${requestTo}`, json)
    .then(function (response) {
      const error = document.getElementById('error');
      
      console.log(response.data)
      if (response.data == 'user') {
        error.textContent = 'El usuario no existe';
        return;
      }
      if (response.data == 'password') {
        error.textContent = 'La contraseña no coincide';
        return;
      }
      let date = new Date()
      date.setMonth(date.getMonth + 11)

      document.cookie = `jwt=${response.data}; expires=${date}; path=/`
      location.href = '/'

    })
    .catch(function (error) {
      console.log(error);
    });
}


export default function Login() {
  const [state, setState] = useState("Login");

  const auth = async () => {
    const userInput = document.getElementById('userInput');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    if (state == 'Login') useAuthAPI('login', { username: usernameInput.value, password: passwordInput.value })

    else useAuthAPI('register', { name: userInput.value, username: usernameInput.value, password: passwordInput.value })
  }

  const FormLogin = () => {
    if (state == 'Register') {
      return (
        <Fragment>
          <span className='mt-4 text-lg max-sm:text-2xl'>Nombre:</span>
          <input className='bg-slate-800 rounded-xl px-2 py-1 mt-1 max-sm:text-xl max-sm:py-2 max-sm:px-3' placeholder='User' id='userInput'></input>
        </Fragment>
      )
    }
  }

  return (
    <div className='bg-slate-900 w-screen h-screen'>
      <Nav></Nav>
      <section className=' flex items-center justify-center h-4/5'>
        <form className='bg-slate-900 py-6 px-8 rounded-xl text-white flex flex-col border-solid border-gray-600 border max-sm:w-5/6'>
          <h2 className='text-2xl text-center max-sm:text-3xl'>{"Login" == state ? "Iniciar sesion" : "Registrarse"}</h2>

          <FormLogin></FormLogin>

          <span className='mt-4 text-lg max-sm:text-2xl'>Nombre de usuario:</span>
          <input className='bg-slate-800 rounded-xl px-2 py-1 mt-1 max-sm:text-xl max-sm:py-2 max-sm:px-3' placeholder='Username' id='usernameInput'></input>

          <span className='mt-4 text-lg max-sm:text-2xl'>Contraseña:</span>
          <input className='bg-slate-800 rounded-xl px-2 py-1 mt-1 max-sm:text-xl max-sm:py-2 max-sm:px-3' placeholder='Password' id='passwordInput'></input>

          <span className='text-red-400 text-center mt-1' id='error'></span>
          <div className='bg-indigo-600 text-center py-1 mt-2 rounded-xl' onClick={auth}>Enviar</div>
          <div className='text-indigo-500 underline mt-3 text-center'
            onClick={() => setState("Register" == state ? "Login" : "Register")}
          >{"Register" == state ? "Iniciar sesion" : "Registrarse"}</div>
        </form>
      </section>

    </div>
  )// agregar login y guardar cuki
}