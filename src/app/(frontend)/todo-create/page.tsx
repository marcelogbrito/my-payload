import { createTodo } from "../../actions/createTodoActions";


const TodoCreatePage = () => {




    return (
        <div>
            <h1>Create New TODO</h1>
            <form action={createTodo}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"

                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <input
                        type="checkbox"
                        name="completed"
                    />
                </div>
                <div>
                    <label htmlFor="media">Media</label>
                    <input
                        type="file"
                        name="media"
                    />      
                </div>
                <button type="submit">Create TODO</button>
            </form>
        </div>
    );
};

export default TodoCreatePage;