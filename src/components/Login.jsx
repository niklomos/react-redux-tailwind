import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { checkUser } from '../reducers/userSlice';
function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(checkUser(userData));
      if (result.meta.requestStatus === "fulfilled") {
        navigate('/users');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Incorrect email or password',
          confirmButtonText: 'Try Again'
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'Please try again later',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2">
      <div className="login-box w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="card-header text-center mb-4">
          <a href="#" className="text-2xl  text-gray-900 ">
            <b>Redux</b> 
            <span className="ms-2 bg-gradient-to-r from-red-400 via-yellow-400 to-purple-600 bg-clip-text text-transparent">
  Restful API
</span>

          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg text-center text-gray-600 mb-4">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Email"
                id="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Password"
                id="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" id="remember" name="RememberMe" className="form-checkbox text-blue-500" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <button type="submit" className="bg-blue-500  px-4 py-2 bg-blue-500 text-white rounded-2xl  hover:bg-blue-600 focus:outline-none">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;