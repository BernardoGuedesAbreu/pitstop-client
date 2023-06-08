import { useEffect, useRef, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from "../../context/auth.context";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const { loggedIn, logout } = useContext(AuthContext);

  const sidebarNavItems = [
    {
      display: 'Home',
      to: '/',
      section: ''
    },
    {
      display: 'Dashboard',
      to: '/dashboard',
      section: 'dashboard'
    },
    {
      display: 'Drivers',
      to: '/drivers',
      section: 'drivers'
    },
    {
      display: 'Contructors',
      to: '/constructors',
      section: 'constructors'
    },
    {
      display: 'Circuits',
      to: '/circuits',
      section: 'circuits'
    },
    
  ];

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(".sidebar__menu__item");
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = location.pathname;
    const activeItem = sidebarNavItems.findIndex((item) => curPath.startsWith(item.to));
    setActiveIndex(activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">PitStop</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <NavLink to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </NavLink>
        ))}
        {loggedIn ? (
          <div
            className="sidebar__menu__item"
            onClick={() => logout()}
          >
            <div className="sidebar__menu__item__text">Logout</div>
          </div>
        ) : (
          <>
            <NavLink to="/login">
              <div className="sidebar__menu__item">
                <div className="sidebar__menu__item__text">Login</div>
              </div>
            </NavLink>
            <NavLink to="/signup">
              <div className="sidebar__menu__item">
                <div className="sidebar__menu__item__text">Signup</div>
              </div>
            </NavLink>
          </>
        )}
      </div>
      <img src="https://cdn.discordapp.com/attachments/1095737455967207474/1116313105945858048/logo-f1.png" alt="image not loaded" className="nav-f1-logo"/>
    </div>
  );
};

export default Navbar;
