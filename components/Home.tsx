import React, { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import { addTodo, getAllTodos } from "~/utils/supabaseFunction";
import TodoList from "./TodoList";

const Home = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") return;

    // Todoの追加
    await addTodo(title);
    // Todoリスト更新
    let todos = await getAllTodos();
    setTodos(todos);
    // 入力域を空にする
    setTitle("");
  };

  // ログアウトする
  const signOut = () => {
    supabase.auth.signOut();
  };

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
      <TodoList todos={todos} setTodos={setTodos} />
      <button
        className="my-4 border-2 border-black rounded-md px-2 bg-gray-200"
        onClick={signOut}
      >
        ログアウト
      </button>
    </section>
  );
};

export default Home;
