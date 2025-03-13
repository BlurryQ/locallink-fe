import { useState } from 'react';
import '../../styles/auth/signup.css';
import PasswordChecklist from 'react-password-checklist';
import { UserType } from '../../types/UserType';
import postUser from '../../api/postUser';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  // Ex@mpl3!

  const createUser = async (user: UserType) => {
    try {
      const res = await postUser(user);
      console.log(res);
      // TODO loader while posting and move function
      // if (res.status) window.location.href = '/events';
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!passwordValid || !email) return;
    const newUser: UserType = {
      email,
      password,
    };
    createUser(newUser);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address <span className="mandatory">*</span>
      </label>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="eg, someone@somewhere.com"
        required
        aria-required="true"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>

      <label htmlFor="password">
        Password <span className="mandatory">*</span>
      </label>
      <input
        name="password"
        type="password"
        id="password"
        placeholder="eg, Ex@mpl3!"
        required
        aria-required="true"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>

      <label htmlFor="pw-confirm">
        Confirm Password <span className="mandatory">*</span>
      </label>
      <input
        name="pw-confirm"
        type="password"
        id="pw-confirm"
        placeholder="********"
        required
        aria-required="true"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
      ></input>

      <PasswordChecklist
        rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
        minLength={8}
        value={password}
        valueAgain={passwordConfirm}
        onChange={(isValid) => {
          setPasswordValid(isValid);
        }}
      />

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
