import React, { useState } from "react";
import { supabase } from "~/utils/supabase";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
      }
    } catch (error) {
      alert("エラーが発生しました！");
    }
  };

  // const handleChangeEmail = (e: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setEmail(e.target.value);
  // };

  // const handleChangePassword = (e: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setPassword(e.target.value);
  // };

  const handleClick = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="font-medium">{isLogin ? "新規登録" : "ログイン"}</h1>
      </div>
      <form onSubmit={(e) => handleAuth(e)}>
        {/* Email入力 */}
        <div className="mb-4 rounded-md border-2">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-60"
          />
        </div>
        {/* Password入力 */}
        <div className="mb-4 rounded-md border-2">
          <input
            type="password"
            value={password}
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            className="w-60"
          />
        </div>
        <div className="mb-4 cursor-pointer underline">
          <span onClick={() => setIsLogin(!isLogin)}>
            {`${!isLogin ? "登録" : "ログイン"}モードへ切り替える`}
          </span>
        </div>

        <button
          type="submit"
          className="border-2 border-black rounded-md px-2 bg-gray-200"
        >
          {isLogin ? "登録" : "ログイン"}
        </button>
      </form>
    </div>
  );
};

export default Login;
