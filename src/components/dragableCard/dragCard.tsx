import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import './dragCard.styles.css';
import { motion } from "framer-motion"
import { Box, Grid } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DeleteIcon from '@mui/icons-material/Delete';

interface DragCardProps {
  dragConstraintsRef: React.RefObject<HTMLDivElement>;
}

const DragCard: React.FC<DragCardProps> = ({ dragConstraintsRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - (cardRef.current?.offsetLeft || 0),
      y: e.clientY - (cardRef.current?.offsetTop || 0),
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && cardRef.current) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      cardRef.current.style.left = `${x}px`;
      cardRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div drag dragConstraints={dragConstraintsRef} className="login-form-container" ref={cardRef} onMouseDown={handleMouseDown}>
      <h2 className="login-form-title">Task Heading!</h2>
      <form className="login-form">
        <div className="input-field">
          <Box className="input">
            Add description here.....
          </Box>
          <div className="input-bottom-gradient" />
        </div>
        <Grid container>
          <Grid xs={1.5} className='clock'><AccessAlarmIcon /></Grid>
          <Grid xs={9.5} display={'flex'} paddingTop={'3px'} className='time'> 7:30am-9:30am</Grid>
          <Grid xs={1} className='delete'><DeleteIcon /></Grid>
        </Grid>
        <Grid container justifyContent={'space-between'}>
          <Grid xs={6} item>
            <button className="button1" type="submit">
              More
            </button>
          </Grid>
          <Grid xs={6} item display={'flex'} justifyContent={'center'}>
            <button className="button2" type="submit">
              Done
            </button>
          </Grid>
        </Grid>
      </form>
    </motion.div>
  );
};

export default DragCard;
