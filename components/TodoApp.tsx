import React, { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase";
import Home from "./Home";
import Login from "./Login";

const TodoApp = () => {
  // 以下の"<any>" →　改善の余地あり
  const [session, setSession] = useState<any>({});

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          {!session ? <Home /> : <Login />}
        </div>
      </section>
    </>
  );
};

export default TodoApp;
