import Head from "next/head";
import { Inter } from "next/font/google";
import TodoApp from "../../components/TodoApp";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta
          name="description"
          content="TodoApp created by Next.js, TypeScript and Supabase."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoApp />
    </>
  );
}
