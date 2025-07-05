import React from 'react';
import { Task, TaskStatus } from '../types';

const statusStyles = {
  [TaskStatus.Completed]: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    icon: '✅',
  },
  [TaskStatus.InProgress]: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    icon: '⏳',
  },
  [TaskStatus.Pending]: {
    bg: 'bg-slate-200',
    text: 'text-slate-600',
    icon: '⚪️',
  },
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const styles = statusStyles[task.status];
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-xl pt-1">{styles.icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-slate-800">{task.name}</p>
        <p className="text-sm text-slate-500">Type: {task.type} &bull; Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        {task.status === TaskStatus.Completed && task.completedDate && (
             <p className="text-sm text-emerald-600">Completed on: {new Date(task.completedDate).toLocaleDateString()}</p>
        )}
      </div>
      <div className={`px-3 py-1 text-xs font-medium rounded-full ${styles.bg} ${styles.text}`}>
        {task.status}
      </div>
    </div>
  );
};


const Progress: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const statusOrder: TaskStatus[] = [TaskStatus.InProgress, TaskStatus.Pending, TaskStatus.Completed];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Task Progress</h1>
        <p className="text-slate-500">Here is the latest update on your deliverables and milestones.</p>
      </div>

      <div className="space-y-6">
        {statusOrder.map(status => (
          tasksByStatus[status] && tasksByStatus[status].length > 0 && (
            <div key={status}>
              <h2 className="text-xl font-bold text-slate-800 mb-4">{status}</h2>
              <div className="space-y-3">
                {tasksByStatus[status].map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
       <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700">
                View Detailed Report (PDF)
            </button>
        </div>
    </div>
  );
};

export default Progress;