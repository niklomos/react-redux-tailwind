import axios from "axios";

export const ActionTypes = {
  FETCH_USERS: "FETCH_USERS",
  FETCH_USER: "FETCH_USER",
  CREATE_USER: "CREATE_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
};

const apiUrl = "https://66cd93858ca9aa6c8ccad958.mockapi.io/api/users";

export const checkUsers = (userData) => async (dispatch) => {
  try {
    // Fetch all users
    const response = await axios.get(apiUrl);
    const users = response.data;

    // Find user with matching email and password
    const user = users.find(u => u.email === userData.email && u.password === userData.password);

    if (user) {
      // Dispatch action to update the Redux state
      dispatch({ type: ActionTypes.FETCH_USER, payload: user });

      // Store user data and a cookie (you can use any unique identifier as the cookie, e.g., user.id)
      sessionStorage.setItem('user', JSON.stringify(user));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get(apiUrl);
  dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
};

export const fetchUser = (userId) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/${userId}`);
  dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
};

export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, user);
    dispatch({ type: ActionTypes.CREATE_USER, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${user.id}`, user);
    dispatch({ type: ActionTypes.EDIT_USER, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  await axios.delete(`${apiUrl}/${userId}`);
  dispatch({ type: ActionTypes.DELETE_USER, payload: userId });
};