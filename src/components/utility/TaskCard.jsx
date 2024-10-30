import React from 'react';
import './TaskCard.css';
import noPriority from '../../assets/no-priority.svg';
import low from '../../assets/low.svg';
import medium from '../../assets/medium.svg';
import high from '../../assets/high.svg';
import urgent from '../../assets/urgent.svg';
import done from '../../assets/Done.svg';
import backlog from '../../assets/backlog.svg';
import inProgress from '../../assets/inProgress.svg';
import todo from '../../assets/todo.svg';
import cancelled from '../../assets/Cancelled.svg';


const TaskCard = ({ task, getUserById, getPriorityIcon, currentGroup }) => {
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
      <div className='task-body'>
        {(currentGroup === 'User' || currentGroup === 'Priority') ? <img className='task-body-icon' src={task.status === 'Done' ? done : task.status === 'Backlog' ? backlog : task.status === 'In progress' ? inProgress : task.status === 'Todo' ? todo : cancelled} alt={task.status} /> : null}
        <div className="task-title">{task.title}</div>
      </div>
      <div className="task-footer">
        <div className="priority-indicator">
          <img
            src={getPriorityIcon(task.priority).icon === 'no-priority' ? noPriority : getPriorityIcon(task.priority).icon === 'low' ? low : getPriorityIcon(task.priority).icon === 'medium' ? medium : getPriorityIcon(task.priority).icon === 'high' ? high : urgent}
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