export default function LoginButton({ loginStatus, setloginStatus }) {
  const text = loginStatus ? "ログアウト" : "ログイン";

  const login = () => {
    if (loginStatus) {
      setloginStatus(false);
    } else {
      setloginStatus(true);
    }
  };
  return (
    <button type="button" name="login-button" onClick={() => login()}>
      {text}
    </button>
  );
}
