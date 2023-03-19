import { supabase } from "./supabase";

// Todo全件取得
export const getAllTodos = async () => {
  const todos = await supabase.from("todos").select("*");
  return todos.data;
};

// Todo追加
export const addTodo = async (title: string) => {
  await supabase.from("todos").insert({ title: title });
};

// Todo削除
export const deleteTodo = async (todo_id: string) => {
  await supabase.from("todos").delete().eq("todo_id", todo_id);
};
