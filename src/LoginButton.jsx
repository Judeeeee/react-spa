export default function LoginButton({ loginStatus, setloginStatus }) {
  let text;
  if (loginStatus) {
    text = "ログアウト";
  } else {
    text = "ログイン";
  }

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
