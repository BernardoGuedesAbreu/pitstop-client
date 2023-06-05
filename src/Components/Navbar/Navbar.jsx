import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';

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
  {
    display: 'Calendar',
    to: '/calendar',
    section: 'calendar'
  },
  {
    display: 'About',
    to: '/about',
    section: 'about'
  },
  {
    display: "Login",
    to: '/login',
    section: ''
  },
];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = location.pathname;
    const activeItem = sidebarNavItems.findIndex(item => curPath.startsWith(item.to));
    setActiveIndex(activeItem);
  }, [location]);

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        PitStop
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div ref={indicatorRef} className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <NavLink to={item.to} key={index}>
            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar__menu__item__text">
                {item.display}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
