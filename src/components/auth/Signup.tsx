import '../../styles/auth/signup.css';

export default function Signup() {
  /*     '<USER_ID>', // userId (unique)
      'email@example.com', // email
      '', // password
      '+12065550100', // phone (optional)
      '<NAME>'; // name (optional) */

  return (
    <form action="/" method="post" className="signup">
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

      <label htmlFor="pw-confirm">Confirm Password</label>
      <input
        name="pw-confirm"
        type="password"
        id="pw-confirm"
        placeholder="Same as above"
      ></input>

      <label htmlFor="phone">Phone Number</label>
      <input
        name="phone"
        type="tel"
        id="phone"
        placeholder="0202 123 4567"
      ></input>

      <label htmlFor="name">Name</label>
      <input
        name="name"
        type="text"
        id="name"
        placeholder="Chuck Norris"
      ></input>

      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
