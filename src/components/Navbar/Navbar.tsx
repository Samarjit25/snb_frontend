import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.scss';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // ✅ Check login status on mount
    useEffect(() => {
        const token = localStorage.getItem('token'); // Or whatever you use
        setIsLoggedIn(!!token); // Set true if token exists
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        setIsLoggedIn(false);
        setShowDropdown(false);
        navigate('/login');
    };

    return (
        <nav className={style.navbar}>
            <div className={style.logo}>MyApp</div>

            {/* <div className={`${style.links} ${showMenu ? style.mobileMenu : ''}`}>
        <Link to="/home" onClick={() => setShowMenu(false)}>Home</Link>
        <Link to="/about" onClick={() => setShowMenu(false)}>About</Link>
        <Link to="/addclass" onClick={() => setShowMenu(false)}>Add Class</Link>
        <Link to="/schedule" onClick={() => setShowMenu(false)}>Schedule</Link>
      </div> */}
            <div className={`${style.links} ${showMenu ? style.mobileMenu : ''}`}>
                <div className={style.linkWrapper}><NavLink to="/home" className={({ isActive }) => isActive ? style.active : ''} onClick={() => setShowMenu(false)}>Home</NavLink></div>
                <div className={style.linkWrapper}><NavLink to="/about" className={({ isActive }) => isActive ? style.active : ''} onClick={() => setShowMenu(false)}>About</NavLink></div>
                <div className={style.linkWrapper}><NavLink to="/addclass" className={({ isActive }) => isActive ? style.active : ''} onClick={() => setShowMenu(false)}>Add Class</NavLink></div>
                <div className={style.linkWrapper}><NavLink to="/schedule" className={({ isActive }) => isActive ? style.active : ''} onClick={() => setShowMenu(false)}>Schedule</NavLink></div>
            </div>

            <div className={style.profile}>
                <div
                    className={style.icon}
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    <FaUserCircle size={28} />
                </div>
                {showDropdown && (
                    <div className={style.dropdown}>
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        all: 'unset',
                                        cursor: 'pointer',
                                        padding: '0.8rem 1.2rem',
                                        display: 'block',
                                        fontSize: '1.5rem',
                                        color: '#333',
                                        width: '100%',
                                        textAlign: 'left',
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>  <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                                <Link to="/login" onClick={() => setShowDropdown(false)}>Login</Link>
                                <Link to="/signup" onClick={() => setShowDropdown(false)}>Signup</Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className={style.menuIcon} onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
        </nav>
    );
};

export default Navbar;
