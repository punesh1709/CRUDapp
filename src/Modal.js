// Modal.js
import React from 'react';
import { Modal } from 'bootstrap'; // Assuming you are using Bootstrap modal

const CustomModal = ({ isOpen, handleClose, children }) => {
  const modalRef = React.createRef();

  React.useEffect(() => {
    if (isOpen) {
      const modal = new Modal(modalRef.current);
      modal.show();
    }
  }, [isOpen]);

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
