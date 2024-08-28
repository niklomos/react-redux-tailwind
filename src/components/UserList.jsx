import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers } from '../actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Generate page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine the range of page numbers to display
  const getPageRange = () => {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    return pageNumbers.slice(start - 1, end);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-2 text-2xl font-bold">User List</h3>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {indexOfFirstUser + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button
                      className="rounded bg-red-500 px-3 py-1 text-white"
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      Delete
                    </button>
                    <Link to={`/edit/${user.id}`}>
                      <button className="rounded bg-blue-500 px-3 py-1 text-white">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {getPageRange().map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 mx-1 rounded ${number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
