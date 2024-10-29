import { useState, useEffect } from 'react';
import '../utility/Kanban.css';
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

const KanbanStatus = ({ order }) => {
  const { tickets, users, loading } = useFetchTicketsAndUsers(); // Use the hook

  const sortedTickets = [...tickets].sort((a, b) => {
    if (order === 'Title') {
      return a.title.localeCompare(b.title);
    } else if (order === 'Priority') {
      return b.priority - a.priority;
    }
    return 0;
  });

  const columns = [
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: sortedTickets.filter(ticket => ticket.status === 'Backlog')
    },
    {
      id: 'todo',
      title: 'Todo',
      tasks: sortedTickets.filter(ticket => ticket.status === 'Todo')
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: sortedTickets.filter(ticket => ticket.status === 'In progress')
    },
    {
      id: 'done',
      title: 'Done',
      tasks: sortedTickets.filter(ticket => ticket.status === 'done')
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      tasks: sortedTickets.filter(ticket => ticket.status === 'cancelled')
    }
  ];

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="kanban">
      {columns.map(column => (
        <div key={column.id} className="kanban-column">
          <div className="column-header">
            <div className="column-header-left">
              <img
                src={`/src/assets/${column.id}.svg`}
                alt={`${column.title} icon`}
                className="column-icon"
              />
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

export default KanbanStatus; 