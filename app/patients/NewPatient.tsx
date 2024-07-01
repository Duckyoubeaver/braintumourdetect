// 'use client';

// import React, { useState } from 'react';

// interface NewPatientFormProps {
//   userId: string;
// }

// const NewPatientForm: React.FC<NewPatientFormProps> = ({ userId }) => {
//   const [patientName, setPatientName] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/patients', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ patientName, userId })
//     });

//     if (response.ok) {
//       setPatientName('');
//       // Optionally, refresh the patient list or show a success message
//     } else {
//       // Handle error
//       console.error('Failed to create patient');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ color: 'black' }}>
//       <input
//         type="text"
//         value={patientName}
//         onChange={(e) => setPatientName(e.target.value)}
//         placeholder="Enter patient name"
//         required
//         style={{ color: 'black', backgroundColor: 'white' }} // Inline style to ensure text color is black
//       />
//       <button
//         type="submit"
//         style={{ color: 'black', backgroundColor: 'white' }}
//       >
//         Create Patient
//       </button>
//     </form>
//   );
// };

// export default NewPatientForm;

// NewPatientForm.tsx
'use client';

import React, { useState } from 'react';

interface NewPatientFormProps {
  userId: string;
  onPatientAdded: () => void;
}

const NewPatientForm: React.FC<NewPatientFormProps> = ({
  userId,
  onPatientAdded
}) => {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientName, userId })
    });

    if (response.ok) {
      setPatientName('');
      onPatientAdded();
    } else {
      console.error('Failed to create patient');
    }
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <input
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Enter patient name"
        required
      />
      <button type="submit">Create Patient</button>
    </form>
  );
};

export default NewPatientForm;
