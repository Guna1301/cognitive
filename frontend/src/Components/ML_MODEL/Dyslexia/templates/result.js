import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DResult() {
    const location = useLocation();
    const [submitted, setSubmitted] = useState(false);
    const [resp, setResp] = useState(null);
    
    async function handleSubmit() {
        try {
            const response = await axios.post('https://final-ps-ml1.onrender.com/dpredict', {
                vals: location.state.vals
            });
            setSubmitted(true);
            setResp(response.data);

            try {
                const scr = await axios.post('https://final-ps-backend.vercel.app/api/dislexia', {
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                    score: Math.round(response.data.output),
                });
            } catch (error) {
                console.error('Error submitting survey:', error);
            }
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    }

    return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 z-2">
    <div className="bg-white shadow-lg rounded-5 d-flex flex-column w-50 gap-4 p-5">
      
      <h2 className="text-center mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Thank you for submitting the survey!
      </h2>

      {submitted ? (
        <div className="d-flex flex-column align-items-center gap-2">
          {resp !== null && (
            <div className="text-center">
              <p className="mb-1" style={{ fontFamily: 'Poppins' }}>{resp.prediction}</p>
              <p className="mb-0" style={{ fontFamily: 'Poppins' }}>{resp.result}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success px-4 py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default DResult;
