import React, { Fragment, useState, useEffect } from 'react';
import Nav from './nav';

const socket = new WebSocket('ws://localhost:8080/chat');

socket.onopen = () => {
  console.log('Conexión establecida');
};

socket.onerror = (error) => {
  console.error('Error en la conexión WebSocket:', error);
};

socket.onclose = () => {
  console.log('Conexión cerrada');
};

export default function Chat() {
  const [elements, setElement] = useState([/*{ name: "Hola", descripcion: "Escribe algo:" }*/])

  socket.onmessage = (event) => {
    console.log(event.data);
    const nuevoElemento = {
      name: event.data.split(': ')[0],
      descripcion: event.data.replace((event.data.split(': ')[0] + ': '), "")
    };
    console.log(nuevoElemento)
    setElement([...elements, nuevoElemento]);
  };

  const sendMessage = () => {
    const value = document.getElementById('chatInput');
    if (document.cookie == null || value.value == '') return // agregar excepcion
    //console.log(document.cookie.split('=')[1])
    socket.send(document.cookie.split('=')[1] + ',' + value.value)
    value.value = ''
  }

  return (
    <div className='bg-slate-900 w-screen max-h-screen h-screen flex flex-col items-center overflow-hidden'>
      <Nav></Nav>
      <section className='flex flex-col flex-1 w-screen justify-center text-white'>

        <div className='flex-1 overflow-y-scroll max-h-80vh'>
          {elements.map((elemento, index) => (
            <div key={index} className='py-1'>
              <p className='text-xl max-lg:text-2xl max-sm:text-3xl'>{elemento.name}: <p className='text-lg inline-block max-lg:text-2xl max-sm:text-3xl'>{elemento.descripcion}</p></p>
            </div>
          ))}
        </div>

        <section className='flex justify-center h-1/6 items-center border border-solid border-gray-600'>
          <input className='bg-slate-800 rounded-xl px-3 py-2 w-2/4 max-xl:px-6 max-lg:text-2xl max-lg:py-4 max-lg:w-4/6' placeholder='Mensaje' id='chatInput'></input>
          <button className='bg-indigo-600 text-center py-2 px-3 ml-3 rounded-xl max-lg:px-6 max-lg:text-2xl max-lg:py-4 max-lg:ml-0' onClick={sendMessage}>Enviar</button>
        </section>
      </section>
    </div>
  );
}