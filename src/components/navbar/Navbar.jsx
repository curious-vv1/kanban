import { useState, useEffect, useRef } from 'react';
import displayIcon from '../../assets/Display.svg';
import './Navbar.css';

function Navbar({ onGroupChange, onOrderChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [group, setGroup] = useState('Status');
    const [order, setOrder] = useState('Priority');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const savedGroup = localStorage.getItem('group') || 'Status';
        const savedOrder = localStorage.getItem('order') || 'Priority';
        setGroup(savedGroup);
        setOrder(savedOrder);
        onGroupChange(savedGroup);
        onOrderChange(savedOrder);
    }, [onGroupChange, onOrderChange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGroupChange = (value) => {
        setGroup(value);
        localStorage.setItem('group', value);
        onGroupChange(value);
    };

    const handleOrderChange = (value) => {
        setOrder(value);
        localStorage.setItem('order', value);
        onOrderChange(value);
    };

    return (
        <div className='container-nav' >
            <div className="navbar-container"ref={dropdownRef}>
                <div className="navbar" onClick={() => setIsOpen(!isOpen)}>
                    <img src={displayIcon} alt="Display Icon" />
                    <span className="navbar-text">Display</span>
                    <span className="dropdown-arrow">▼</span>
                </div>

                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <span>Grouping</span>
                            <select value={group} onChange={(e) => handleGroupChange(e.target.value)}>
                                <option value="Priority">Priority</option>
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                            </select>
                        </div>

                        <div className="dropdown-item">
                            <span>Ordering</span>
                            <select value={order} onChange={(e) => handleOrderChange(e.target.value)}>
                                <option value="Priority">Priority</option>
                                <option value="Title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
