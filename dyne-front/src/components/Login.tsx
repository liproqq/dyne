import { useRef } from "react";

export const LoginForm = (props: object) => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const login = async () => {
    // `current` points to the mounted text input element
    console.log(username.current?.value);
  };
  return (
    <form>
      <input ref={username} type="text" />
      <input ref={password} type="text" />
      <button onClick={login}>Login</button>
    </form>)
}