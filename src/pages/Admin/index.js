import { useState, useEffect } from 'react'
import './admin.css'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})


    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@userDetail")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            description: doc.data().description,
                            userUid: doc.data().userUid
                        })
                    })

                    console.log(lista)
                    setTarefas(lista)
                })
            }

        }

        loadTarefas()

    }, [])


    async function handleRegister(e) {
        e.preventDefault()
        if (tarefaInput === '') {
            alert("Digite uma tarefa")
            return
        }

        if(edit?.id) {
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"), {
            description: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
            finished: null
        })
            .then(() => {
                console.log("Tarefa Registrada")
                setTarefaInput('')

            })
            .catch((error) => {
                console.log("Error: " + error)
            })



    }

    async function handleLogout() {
        await signOut(auth)
    }

    function editTask(item) {
        setTarefaInput(item.tarefa)
        setEdit(item)

    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            console.log("Tarefa Atualizada")
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) => {
            console.log(error)
            setTarefaInput('')
            setEdit({})
        })

    }

    async function finishTask(id) {

        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    return (
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite a tarefa....'
                    value={tarefaInput}
                    onChange={e => setTarefaInput(e.target.value)}
                    cols="80" rows="20" ></textarea>

              {Object.keys(edit).length > 0 ? (
                <button className='btn-register' style={{backgroundColor: '#6add39'}} type='submit'>Atualizar tarefa</button>
              ) : (
                <button className='btn-register' type='submit'>Cadastrar tarefa</button>
              )} 
              
            </form>

            {tarefas.map((item) => (

                <article key={item.id} className='list'>
                    <p>{item.description}</p>
                    <div>
                        <button onClick={() => editTask(item)}>Editar</button>
                        <button className='btn-finish' onClick={() => finishTask(item.id)}>Concluir</button>
                    </div>
                </article>

            ))}


            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}