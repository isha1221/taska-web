import { useState, useRef } from 'react';
import FloatingActionButton from '../floatingActionButton/FloatingActionButton';
import Modal from '../modal/Modal';
import DragCard from '../dragableCard/dragCard';
// import './fg.css'
const generateRandomId = () => Math.floor(Math.random() * 10000);

const Foreground = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([
    { id: generateRandomId() },
    { id: generateRandomId() },
    { id: generateRandomId() },
    { id: generateRandomId() }
  ]); // Initial cards with random IDs
  const dragConstraintsRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  

  return (
    <div className='absolute top-50 left-0 z-[3] w-full h-fit '>
      <FloatingActionButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      <div ref={dragConstraintsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cards.map((card) => (
          <DragCard key={card.id} dragConstraintsRef={dragConstraintsRef} />
        ))}
      </div>
    </div>
  );
};

export default Foreground;
