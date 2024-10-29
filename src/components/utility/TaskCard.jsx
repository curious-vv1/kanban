import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, getUserById, getPriorityIcon }) => {
  const assignedUser = getUserById(task.userId);

  const getUserColorClass = (userId) => {
    const colorClasses = ['user-color-0', 'user-color-1', 'user-color-2', 'user-color-3'];
    const numericId = parseInt(userId.split('-')[1], 10);
    if (isNaN(numericId)) {
      console.warn(`Invalid userId: ${userId}`);
      return 'user-color-default';
    }
    const className = colorClasses[numericId % colorClasses.length];
    // console.log(`User ID: ${userId}, Numeric ID: ${numericId}, Class: ${className}`);
    return className;
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{task.id}</span>
        <div className="task-assignee">
          <div className={`user-status ${assignedUser?.available ? 'available' : 'unavailable'} ${getUserColorClass(task.userId)}`}>
            {assignedUser?.name.split(' ').map(n => n.charAt(0)).join('')}
          </div>
        </div>
      </div>
      <div className="task-title">{task.title}</div>
      <div className="task-footer">
        <div className="priority-indicator">
          <img
            src={`/src/assets/${getPriorityIcon(task.priority).icon}.svg`}
            alt={getPriorityIcon(task.priority).label}
            className="priority-icon"
          />
          <span className="priority-label">{getPriorityIcon(task.priority).label}</span>
        </div>
        <div className="task-tags">
          {task.tag.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 