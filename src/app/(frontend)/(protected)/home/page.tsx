
import Link from 'next/link'
import LogoutButton from '../../../../components/LogoutButton'
import { getUser } from '../../../../utils/get-user'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  
const { user, payload } = await getUser()

// if(!user) {
//   redirect('/login');
// }

  const todos = await payload?.find({
    collection: 'todos',
    limit: 10,  
  })

  return (
    <div className="home">
      <h1>Lista ToDo do payload {user?.email}</h1>
      <Link href="/todo-create">Criar novo ToDo</Link>
      <LogoutButton />
     <div className="todos">
        {todos?.docs?.map((todo) => (
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
