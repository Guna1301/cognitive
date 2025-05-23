import Modal from './Modal';
import './GradioComponent.css';

const GradioComponent = ({ onClose }) => {
  return (
    // <Modal onClose={onClose}>
    //   <div id="gradio-container">
    //     <iframe
    //       className='ifr'
    //       title="Gradio Chatbot"
    //       src="https://a8f4fc2a44d4a7be56.gradio.live/"
    //     ></iframe>
    //   </div>
    // </Modal>
    <div>
      <div className="gradio-modal">
        <div className="gradio-modal-content">
          <span className="gradio-close" onClick={onClose}>&times;</span>
          <iframe
            className='ifr'
            title="Gradio Chatbot"
            src="https://a8f4fc2a44d4a7be56.gradio.live/"
          ></iframe>
        </div>
      </div>
    </div>

  );
};

export default GradioComponent;
