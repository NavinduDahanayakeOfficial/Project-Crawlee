import React, { useContext, useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import Certificate from '../../assets/Certificate.jpg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './certificate.css';
import { AuthContext } from '../../context/AuthContext';

const App = () => {
  const certificateWrapper = useRef(null);
  const CourseName = 'Machine Learning';
  const TeacherName = 'John Rodrigo';
  const Date = Date.now();

  const { user } = useContext(AuthContext);

  const handleDownload = (e) => {
    e.preventDefault();
    exportComponentAsPNG(certificateWrapper, {
      exportComponentAsPNG: { backgroundColor: null },
    });
  };

  return (
    <div className="App">
      <div className="Meta">
        <button onClick={handleDownload}>Download</button>
      </div>

      <div id="downloadWrapper" ref={certificateWrapper}>
        <div id="certificateWrapper">
          <p className="p1">{user.username}</p>
          <p className="p2">{Date}</p>
          <p className="p3">{CourseName}</p>
          <p className="p4">{TeacherName}</p>
          <img src={Certificate} alt="Certificate" />
        </div>
      </div>
    </div>
  );
};

export default App;