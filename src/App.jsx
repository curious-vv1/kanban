import { useState } from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar'
import KanbanStatus from './components/KanbanStatus/KanbanStatus'
import KanbanPriority from './components/KanbanPriority/KanbanPriority'
import KanbanUser from './components/KanbanUser/KanbanUser'

function App() {
  const [selectedGroup, setSelectedGroup] = useState('User');
  const [selectedOrder, setSelectedOrder] = useState('Title');

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const handleOrderChange = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <Navbar onGroupChange={handleGroupChange} onOrderChange={handleOrderChange} />
      <main>
        {selectedGroup === 'Status' && <KanbanStatus order={selectedOrder} />}
        {selectedGroup === 'Priority' && <KanbanPriority order={selectedOrder} />}
        {selectedGroup === 'User' && <KanbanUser order={selectedOrder} />}
      </main>
    </>
  )
}

export default App
