import { useLogin } from "./useLogin.jsx";

export default function LoginButton() {
  const { loginStatus, login } = useLogin();
  const text = loginStatus ? "ログアウト" : "ログイン";

  return (
    <button type="button" name="login-button" onClick={() => login()}>
      {text}
    </button>
  );
}
