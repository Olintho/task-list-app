import { useState } from 'react'
import './admin.css'

import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')

    function handleRegister(e) {
        e.preventDefault()
        alert("clicoui")
    }

    async function handleLogout() {
        await signOut(auth)
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea 
                placeholder='Digite a tarefa....' 
                value={tarefaInput} 
                onChange={e => setTarefaInput(e.target.value)} 
                cols="80" rows="10" ></textarea>

                <button className='btn-register' type='submit'>Cadastrar tarefa</button>
            
            </form>

            <article className='list'>
                <p>Estudar JS react</p>
                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluir</button>
                </div>
            </article>
                    <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}