import '../../styles/auth/signup.css';
import { useState } from 'react';

// api
import { checkUserExists, postUser } from '../../apis/users.api';

// component
import LottieLoader from '../LottieLoader';

// package
import PasswordChecklist from 'react-password-checklist';

// types
import { UserType } from '../../types/UserType';

// utils
import { hashPassword } from '../../utils/Passwords';

export default function Signup() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const createUser = async (user: UserType) => {
    try {
      const res = await postUser(user);
      console.log(res);
      if (res.status) window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!passwordValid || !email) return setLoading(false);
    const doesEmailExist: boolean = await checkUserExists(email);
    // if email address already exists
    if (doesEmailExist) {
      setLoading(false);
      return setError('Email address already in database');
    }

    // if database error
    if (typeof doesEmailExist === 'string') {
      setLoading(false);
      return setError(doesEmailExist);
    }

    password = await hashPassword(password);
    const newUser: UserType = {
      email,
      password,
    };
    setLoading(false);
    createUser(newUser);
  };

  return (
    <>
      {loading ? <LottieLoader type="thinking" /> : null}

      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email Address <span className="mandatory">*</span>
        </label>
        <input
          autoFocus
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
        <p className={`error ${error ? '' : 'invisible'}`}>
          {error ? error : 'placeholder'}
        </p>
      </form>
    </>
  );
}
