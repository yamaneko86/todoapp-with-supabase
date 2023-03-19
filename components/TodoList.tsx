import { type } from "os";
import React from "react";
import { Todo } from "~/utils/interface";
import { deleteTodo, getAllTodos } from "~/utils/supabaseFunction";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<any>;
};

const TodoList = (props: Props) => {
  const { todos, setTodos } = props;

  const handleDelete = async (todo_id: string) => {
    await deleteTodo(todo_id);
    let todos = await getAllTodos();
    setTodos(todos);
  };

  return (
    <div>
      <ul className="mx-auto">
        {todos.map((todo) => (
          <div
            key={todo.todo_id}
            className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between"
          >
            <li className="font-medium">✅ {todo.title}</li>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(todo.todo_id)}
            >
              ❌
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
