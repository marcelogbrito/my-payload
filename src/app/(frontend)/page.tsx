import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })


  const todos = await payload.find({
    collection: 'todos',
    limit: 10,  
  })

  return (
    <div className="home">
      <h1>Lista ToDo do payload {user?.email}</h1>
     <div className="todos">
        {todos.docs.map((todo) => (
          <div key={todo.id} className="todo" style={{ border: 'solid' ,borderRadius: '10px', padding: '10px', margin: '10px' }}>
            <h2>{todo.title}</h2>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
            <p>{todo.description}</p>
            <p>{todo.completed ? 'Concluído' : 'Pendente'}</p>
          </div>  ))}
          </div>
     </div>

  )
}
