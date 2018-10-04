import React from 'react';

const Notification = ({ content }) => (
  <div className="message system">
    <span className="notification-content">{content}</span>
  </div>
);

export default Notification;
