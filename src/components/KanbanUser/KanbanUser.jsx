import { useState, useEffect } from 'react';
import '../utility/Kanban.css';
import './KanbanUser.css';
import TaskCard from '../utility/TaskCard'; // Import the TaskCard component
import useFetchTicketsAndUsers from '../../hooks/useFetchTicketsAndUsers'; // Import the custom hook

const getPriorityIcon = (priority) => {
    const priorityMap = {
        0: { icon: 'no-priority', label: 'No Priority' },
        1: { icon: 'low', label: 'Low' },
        2: { icon: 'medium', label: 'Medium' },
        3: { icon: 'high', label: 'High' },
        4: { icon: 'urgent', label: 'Urgent' }
    };

    return priorityMap[priority] || priorityMap[0];
};

const KanbanUser = ({ order }) => {
    const { tickets, users, loading } = useFetchTicketsAndUsers(); // Use the hook

    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    const getUserColorClass = (userId) => {
        const colorClasses = ['user-color-0', 'user-color-1', 'user-color-2', 'user-color-3'];
        const numericId = parseInt(userId.split('-')[1], 10);
        if (isNaN(numericId)) {
            console.warn(`Invalid userId: ${userId}`);
            return 'user-color-default';
        }
        const className = colorClasses[numericId % colorClasses.length];
        // console.log(`User ID: ${userId}, Numeric ID: ${numericId}, Class: ${className}`);
        return className
    };

    const sortedTickets = [...tickets].sort((a, b) => {
        if (order === 'Title') {
            return a.title.localeCompare(b.title);
        } else if (order === 'Priority') {
            return b.priority - a.priority;
        }
        return 0;
    });

    const columns = users.map(user => ({
        id: user.id,
        title: user.name,
        tasks: sortedTickets.filter(ticket => ticket.userId === user.id)
    }));

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="kanban">
            {columns.map(column => (
                <div key={column.id} className="kanban-column">
                    <div className="column-header">
                        <div className="column-header-left">
                            <div className='column-icon'>
                                <div className={`user-status ${getUserById(column.id)?.available ? 'available' : 'unavailable'} ${getUserColorClass(column.id)}`}>
                                    {column.title.charAt(0)}
                                </div>
                            </div>
                            <h2>{column.title}</h2>
                        </div>
                        <div className="column-header-right">
                            <span className="task-count">{column.tasks.length}</span>
                            <img
                                src="/src/assets/add.svg"
                                alt="Add task"
                                className="action-icon"
                            />
                            <img
                                src="/src/assets/3dot.svg"
                                alt="More options"
                                className="action-icon"
                            />
                        </div>
                    </div>
                    <div className="task-list">
                        {column.tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                getUserById={getUserById}
                                getPriorityIcon={getPriorityIcon}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanUser; 