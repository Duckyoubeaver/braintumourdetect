// UserIdDisplay.tsx
import React from 'react';

interface UserIdDisplayProps {
  userId: string;
}

const UserIdDisplay: React.FC<UserIdDisplayProps> = ({ userId }) => {
  return <div>User ID: {userId}</div>;
};

export default UserIdDisplay;
