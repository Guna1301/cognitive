/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
const REACT_APP_PREDICTION_URL = process.env.REACT_APP_PREDICTION_URL || "http://localhost:8089";

function DResult() {
    const location = useLocation();
    const [submitted, setSubmitted] = useState(false);
    const [resp, setResp] = useState(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchResult() {
            try {
                const response = await axios.post(`${REACT_APP_PREDICTION_URL}/dpredict`, {
                    vals: location.state.vals
                });
                
                const apiPred = response.data.prediction;
                let predText = "";
                let resText = "";
                
                if (apiPred === 2) {
                    predText = "Your chance of having dyslexia is LOW.....";
                    resText = "You are Good..";
                } else if (apiPred === 1) {
                    predText = "Your chance of having dyslexia is MODERATE.....";
                    resText = "If you have any doubt consult a doctor...";
                } else {
                    predText = "Your chance of having dyslexia is HIGH.....";
                    resText = "Consult a doctor...";
                }

                const formattedResponse = {
                    output: apiPred,
                    prediction: predText,
                    result: resText
                };
                
                if (isMounted) {
                    setResp(formattedResponse);
                    setSubmitted(true);
                    setLoading(false);
                }

                try {
                    await axios.post(`${REACT_APP_BACKEND_URL}/dislexia`, {
                        name: localStorage.getItem('name'),
                        email: localStorage.getItem('email'),
                        score: Math.round(formattedResponse.output),
                    });
                } catch (error) {
                    console.error('Error submitting survey to backend:', error);
                }
            } catch (error) {
                console.error('Error getting prediction:', error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        
        fetchResult();
        return () => { isMounted = false };
    }, [location.state.vals]);

    return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 z-2">
    <div className="bg-white shadow-lg rounded-5 d-flex flex-column w-50 gap-4 p-5">
      
      <h2 className="text-center mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Thank you for submitting the survey!
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <p className="text-secondary" style={{ fontFamily: 'Poppins' }}>Processing your results...</p>
        </div>
      ) : submitted && resp !== null ? (
        <div className="d-flex flex-column align-items-center gap-2">
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-600 mb-1" style={{ fontFamily: 'Poppins' }}>
              Your Score: {resp.output}
            </p>
            <p className="mb-1" style={{ fontFamily: 'Poppins' }}>
              {resp.prediction}
            </p>
            <p className="mb-0" style={{ fontFamily: 'Poppins' }}>
              {resp.result}
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p className="text-danger">An error occurred while fetching your result.</p>
        </div>
      )}
    </div>
  </div>
);

}

export default DResult;
