import Head from "next/head";
import Home from "../../components/Home";

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

      <Home />
    </>
  );
}
