import { useState, useRef } from 'react';
import FloatingActionButton from '../floatingActionButton/FloatingActionButton';
import Modal from '../modal/Modal';
import DragCard from '../dragableCard/dragCard';

const Foreground = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dragConstraintsRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className='fixed top-50 left-0 z-[3] w-full h-full '>
      <FloatingActionButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div ref={dragConstraintsRef}> {/* Create a ref here */}
      <DragCard dragConstraintsRef={dragConstraintsRef} />
      <DragCard dragConstraintsRef={dragConstraintsRef} /> {/* Pass the ref to DragCard */}
      </div>
    </div>
  );
};

export default Foreground;
