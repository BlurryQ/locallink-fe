import '../../styles/auth/login.css';

export default function Login() {
  return (
    <form action="#" method="post" className="login">
      <label htmlFor="email">Email Address</label>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="someone@somewhere.com"
      ></input>

      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        id="password"
        placeholder="8 characters, minimum of 1 capital and 1 symbol"
      ></input>

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
