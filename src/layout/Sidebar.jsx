import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  
  const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(sessionUser)

 

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 bg-gray-800 text-white">
      {/* Brand Logo */}
      <a href="#" className="brand-link ">
        <img
          src="../../dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3 "
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light ml-3 text-lg">Redux RestfulAPI</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 ">
          <div className="image">
            <img
              src={'dist/img/avatar4.png'} // ใช้ avatar จาก sessionStorage หรือรูปภาพเริ่มต้น
              className="img-circle elevation-2 "
              alt="User Image"
            />
          </div>
          <div className="info ml-3">
            <a href="#" className="d-block text-white font-medium hover:text-gray-300 transition-colors">
              {/* แสดงชื่อผู้ใช้จาก sessionStorage */}
              {sessionUser ? sessionUser.name : 'Guest'}
            </a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
            <NavLink
                to="/users"
                className={({ isActive }) =>
                  `nav-link flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors ${
                    isActive || location.pathname.match(/^\/edit\/\d+/) ? "bg-gray-700" : ""
                  }`
                }
              >
                <i className="nav-icon fas fa-home mr-3" />
                <p className="text">Home</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/insert"
                className={({ isActive }) =>
                  `nav-link flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <i className="nav-icon fas fa-plus mr-3" />
                <p className="text">Add</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors">
                <i className="nav-icon far fa-circle text-red-500 mr-3" />
                <p className="text">Important</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors">
                <i className="nav-icon far fa-circle text-yellow-500 mr-3" />
                <p className="text">Warning</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors">
                <i className="nav-icon far fa-circle text-blue-500 mr-3" />
                <p className="text">Informational</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
