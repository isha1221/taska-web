import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./modal.css";
import { Grid } from "@mui/material";

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [description, setDescription] = useState<string>("");
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ];

  const quillRef = useRef<HTMLDivElement>(null);

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

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="input-field">
          <input id="username" type="text" placeholder="Add Title" />
        </div>

        <div ref={quillRef} style={{ height: "400px" }} className="main_box" />
        <Grid container justifyContent={"space-between"} sx={{marginTop:'30px'}}>
          <Grid xs={6} item>
            <button className="button1" type="submit">
              Close
              <div />
            </button>
          </Grid>
          <Grid xs={6} item display={"flex"} justifyContent={"center"}>
            <button className="button2" type="submit">
              Save
              <div />
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : null;
};

export default Modal;
