import { supabase } from "./supabase";

// Todo全件取得
export const getAllTodos = async (user_id: string) => {
  const todos = await supabase.from("todos").select("*").eq("user_id", user_id);
  return todos.data;
};

// Todo追加
export const addTodo = async (title: string, user_id: string) => {
  await supabase.from("todos").insert({ title: title, user_id: user_id });
};

// Todo削除
export const deleteTodo = async (todo_id: string) => {
  await supabase.from("todos").delete().eq("todo_id", todo_id);
};
