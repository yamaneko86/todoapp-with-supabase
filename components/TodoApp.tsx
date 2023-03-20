import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { addTodo, deleteTodo, getAllTodos } from "~/utils/supabaseFunction";
import { Todo } from "~/utils/interface";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<any>;
};

const TodoApp = ({ session }: { session: Session }) => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  const supabaseClient = useSupabaseClient();
  const user = session.user;

  useEffect(() => {
    // Todo全件取得
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    getTodos();
  }, [supabaseClient]);

  // Todoの追加
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length) {
      // Todoの追加 実行
      await addTodo(title);
      // Todoリスト更新
      let todos = await getAllTodos();
      setTodos(todos);
      // 入力域を空にする
      setTitle("");
    }
  };

  // Todo削除
  const handleDelete = async (todo_id: string) => {
    // Todoの削除 実行
    await deleteTodo(todo_id);
    // Todoリスト更新
    let todos = await getAllTodos();
    setTodos(todos);
  };

  // ログアウトする
  // const signOut = async () => {
  //   const { error } = await supabaseClient.auth.signOut();
  //   if (error) console.log("Error logging out!", error.message);
  // };

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>Supabase Todo App</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="mr-2 shadow-lg p-1 outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200">
          Add
        </button>
      </form>

      {/* <TodoList todos={todos} setTodos={setTodos} /> */}
      {/* Todoリスト */}
      <div>
        <ul className="mx-auto">
          {todos.map((todo: any) => (
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

      {/* <button
        className="my-4 border-2 border-black rounded-md px-2 bg-gray-200"
        onClick={signOut}
      >
        ログアウト
      </button> */}
    </section>
  );
};

export default TodoApp;
