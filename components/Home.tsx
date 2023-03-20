import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { NextPage } from "next";
import TodoApp from "./TodoApp";

const Home: NextPage = () => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();

  // ログアウトする
  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log("Error logging out!", error.message);
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
          {session ? null : <h1>Supabase Todo App ログイン</h1>}
          {session ? (
            <>
              <TodoApp session={session} />
              <button
                className="my-4 border-2 border-black rounded-md px-2 bg-gray-200"
                onClick={signOut}
              >
                ログアウト
              </button>
            </>
          ) : (
            <Auth
              supabaseClient={supabaseClient}
              appearance={{ theme: ThemeSupa }}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
