import config from "@/payload.config";
import { getPayload, } from "payload";
import Image from 'next/image';


export default async function TodoPage({params}: {readonly params: {readonly id: string}}) {
    const payloadConfig = await config;
    const payload = await getPayload({config: payloadConfig});
    const todo = await payload.findByID({
        collection: "todos",
        id: params.id,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API}/todos/${params.id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch todo');
    }
    const todoREST = await response.json();

return (
    <div>
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <p>Status: {todo.completed ? "Completed" : "Incomplete"}</p>
        <p>Created at: {todo.created_at}</p>
        <p>Updated at: {todo.updated_at}</p>
        {typeof todo.media === 'object' && todo.media !== null && 'url' in todo.media && 'alt' in todo.media && (
            <Image src={todo.media.url ?? ''} alt={todo.media.alt ?? ''} width={500} height={500} />
        )}

        <h1>{todoREST.title}</h1>
        <p>{todoREST.description}</p>
        <p>Status: {todoREST.completed ? "Completed" : "Incomplete"}</p>
        <p>Created at: {todoREST.created_at}</p>
        <p>Updated at: {todoREST.updated_at}</p>
        {typeof todoREST.media === 'object' && todoREST.media !== null && 'url' in todoREST.media && 'alt' in todoREST.media && (
            <Image src={todoREST.media.url ?? ''} alt={todoREST.media.alt ?? ''} width={500} height={500} />
        )}
    </div>
);
}