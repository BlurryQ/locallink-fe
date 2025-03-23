import '../../styles/auth/login.css';
import { useState } from 'react';

// api
import { loginUser } from '../../apis/users.api';

// component
import LottieLoader from '../LottieLoader';

// context
import { useUser } from '../../context/UserContext';

// types
import { UserType } from '../../types/UserType';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const userContext = useUser();
  if (!userContext) return;
  const { login } = userContext;
  // Ex@mpl3!

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) return setLoading(false);
    try {
      const user: UserType = await loginUser(email, password);
      if (user.error) {
        setError(user.error);
        return setLoading(false);
      }
      login(user);
      setLoading(false);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      return setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LottieLoader type="thinking" /> : null}
      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          autoFocus
          name="email"
          type="email"
          id="email"
          placeholder="someone@somewhere.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <p className={`error ${error ? '' : 'invisible'}`}>
          {error ? error : 'placeholder'}
        </p>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
}
