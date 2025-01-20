import React, { useState, useEffect } from "react";

const EventModal = ({ event, onSave, modalId }) => {
  const [formData, setFormData] = useState(event);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      onSave(formData);
    } else {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              Edit Event
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                  required
                  type="datetime-local"
                  className="form-control"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                  required
                  type="datetime-local"
                  className="form-control"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="repeat"
                  checked={formData.repeat}
                  onChange={(e) =>
                    setFormData({ ...formData, repeat: e.target.checked })
                  }
                />
                <label className="form-label">Repeat Event</label>
              </div>
              {formData.repeat && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Repeat Type</label>
                    <select
                      className="form-control"
                      name="repeatType"
                      value={formData.repeatType}
                      onChange={handleChange}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Repeat Count</label>
                    <input
                      type="number"
                      className="form-control"
                      name="repeatCount"
                      value={formData.repeatCount}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="btn btn-success"
                //data-bs-dismiss="modal"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
