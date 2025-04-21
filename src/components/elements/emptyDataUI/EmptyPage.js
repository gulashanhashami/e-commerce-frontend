import React from 'react';
import styled from 'styled-components';

// Empty page UI
const EmptyPage = ({ message = "No Data Matched", fetchProductDataRequest }) => {
  return (
    <EptyPageStyle>
      <div className="empty-box">
        <img
          className="empty-icon"
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="No Data"
        />
        <p className="empty-message">{message}</p>
        <button className="retry-button" onClick={() => { fetchProductDataRequest({}) }}>Retry</button>
      </div>
    </EptyPageStyle>
  );
};

export default EmptyPage;

const EptyPageStyle = styled.div`
.empty-box {
    width: 300px;
    margin: 100px auto;
    padding: 30px 20px;
    text-align: center;
    border-radius: 6px;
    border-top: 4px solid #3f51b5;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .empty-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    opacity: 0.7;
  }
  
  .empty-message {
    font-size: 16px;
    color: #777;
    margin-bottom: 20px;
    font-style: italic;
  }
  
  .retry-button {
    background-color: #3f51b5;
    color: white;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: background-color 0.3s ease;
  }
  
  .retry-button:hover {
    background-color: #303f9f;
  }
`;