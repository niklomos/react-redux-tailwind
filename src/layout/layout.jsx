import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // ปรับเส้นทางตามที่ตั้งของคุณ

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ตรวจสอบเซสชันของผู้ใช้
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));

    if (!sessionUser) {
      // หากไม่มีเซสชันผู้ใช้ ให้เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      navigate('/');
    }
  }, [navigate]);

  const showNavbarSidebarFooter = location.pathname !== '/';

  return (
    <div className="wrapper">
      {showNavbarSidebarFooter && <Navbar />}
      {showNavbarSidebarFooter && <Sidebar />}
      <div className="flex-1 overflow-auto content-wrapper">
        <Outlet />
      </div>
      {showNavbarSidebarFooter && <Footer />}
    </div>
  );
};

export default Layout;
