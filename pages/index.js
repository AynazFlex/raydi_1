import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../store/authReducer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault();
	dispatch(registration({email, password}))
  };

  return (
    <>
      <div className="container">
        <div className="container__elem container__elem--12">
          API
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="register" />
          </form>
		  {/* {url.length > 0 && <div>{url}</div>}
		  {error.length > 0 && <div>{error}</div>} */}
        </div>
      </div>
    </>
  );
}
