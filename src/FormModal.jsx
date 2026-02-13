import React, { useState } from "react";
import HookForm from "./HookForm";
import "./Modal.css";

const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="app-container">
      <button onClick={() => setIsOpen(true)}>Register Now</button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Register</h2>
              <button onClick={handleClose}>&times;</button>
            </div>
            
            {/* PASSING THE FUNCTION HERE:
               We pass 'handleClose' as a prop named 'closeModal'
            */}
            <HookForm closeModal={handleClose} />
            
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;