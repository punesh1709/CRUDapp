import React from "react";
import EmpCreate from "./EmpCreate";

function EmpCreateModal() {
  return (
    <div className="modal fade" id="empCreateModal" tabIndex="-1" aria-labelledby="empCreateModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="empCreateModalLabel">Create Employee</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <EmpCreate />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpCreateModal;
