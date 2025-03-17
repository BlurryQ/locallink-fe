import '../../styles/auth/login.css';
import { useState } from 'react';

// api
import loginUser from '../../api/loginUser';

// context
import { useUser } from '../../context/UserContext';

// types
import { UserType } from '../../types/UserType';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const userContext = useUser();
  if (!userContext) return;
  const { login } = userContext;

  // Ex@mpl3!

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const user: UserType = await loginUser(email, password);
      // TODO loader while posting and move function
      if (user.error) {
        setError(user.error);
        return;
      }
      login(user);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
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
  );
}
