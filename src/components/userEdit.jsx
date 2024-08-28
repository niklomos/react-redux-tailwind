import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, editUser, fetchUser } from "../actions/userActions";

const UserEdit = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    country: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleSave = async () => {
    const result = userData.id ? await dispatch(editUser(userData)) : await dispatch(createUser(userData));

    if (result.success) {
      setMessage("User saved successfully.");
      setIsError(false);
      navigate("/users"); // Redirect after successful save
    } else {
      setMessage(result.message || "An error occurred.");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Edit</h2>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-4 w-full rounded border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-4 w-full rounded border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="city"
        value={userData.city}
        onChange={handleChange}
        placeholder="City"
        className="mb-4 w-full rounded border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="country"
        value={userData.country}
        onChange={handleChange}
        placeholder="Country"
        className="mb-4 w-full rounded border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {message && <div className={isError ? "text-red-500 mb-4" : "text-green-500 mb-4"}>{message}</div>}

      <button onClick={handleSave} className="rounded bg-green-500 px-3 py-2 text-white font-semibold shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
      <i className="nav-icon fas fa-edit mr-1" />
        Edit
      </button>
    </div>
  );
};

export default UserEdit;
