import React, { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from 'dayjs';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import './editTextModal.css'
import { Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import axios from 'axios';
import { Base_Url } from "../../config/api.config";

const EditModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ];

  const quillRef = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (isOpen && quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write description...",
        modules: {
          toolbar: toolbarOptions,
          syntax: true,
        },
      });
      quill.on("text-change", () => {
        setDescription(quill.root.innerHTML);
      });
    }
  }, [isOpen]);

  const handleSave = async () => {
   

    try {
      const response = await axios.post(`${Base_Url}/task`, {
        taskTitle: title,
        taskDescription: description,
        startTime: startTime?.toDate(),
        endTime: endTime?.toDate(),
      },{
        withCredentials:true
      });
      console.log('Task created:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="input-field">
          <input
            id="title"
            type="text"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div ref={quillRef} style={{ height: "200px" }} className="main_box" />
        <div className="input-field">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              className="date-time-field"
            />
            <DateTimeField
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              className="date-time-field"
            />
          </LocalizationProvider>
        </div>
        <Grid container justifyContent={"space-between"} sx={{ marginTop: '30px' }}>
          <Grid xs={6} item>
            <button className="button1" type="button" onClick={onClose}>
              Close
            </button>
          </Grid>
          <Grid xs={6} item display={"flex"} justifyContent={"center"}>
            <button className="button2" type="button" onClick={handleSave}>
              Save
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : null;
};

export default EditModal;
