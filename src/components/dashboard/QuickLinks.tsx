
import React from 'react';
import { Link } from "react-router-dom";

const QuickLinks: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/profile/edit" className="text-blue-600 hover:underline">
            Edit Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-blue-600 hover:underline">
            Account Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
