// // // Modular upload client component
// // 'use client';

// // import React, { useState, useRef } from 'react';

// // const ImageUploadButton: React.FC = () => {
// //   // STATE FOR VISUAL CONFIRMATION TO THE USER
// //   const [uploading, setUploading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   //RESIZE IMAGE COMPONENT

// //   const resizeImage = (file: File): Promise<Blob> => {
// //     return new Promise((resolve, reject) => {
// //       const img = new Image();
// //       img.onload = () => {
// //         const canvas = document.createElement('canvas');
// //         // CHANGE THE DIMENSIONS TO FIT MACHINE LEARNING MODEL
// //         canvas.width = 224;
// //         canvas.height = 224;
// //         const ctx = canvas.getContext('2d');
// //         if (!ctx) {
// //           reject(new Error('Could not get canvas context'));
// //           return;
// //         }

// //         const scale = Math.max(
// //           canvas.width / img.width,
// //           canvas.height / img.height
// //         );
// //         const x = canvas.width / 2 - (img.width / 2) * scale;
// //         const y = canvas.height / 2 - (img.height / 2) * scale;
// //         ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

// //         canvas.toBlob(
// //           (blob) => {
// //             if (blob) resolve(blob);
// //             else reject(new Error('Could not create blob from canvas'));
// //           },
// //           'image/jpeg',
// //           0.95
// //         );
// //       };
// //       img.onerror = () => reject(new Error('Could not load image'));
// //       img.src = URL.createObjectURL(file);
// //     });
// //   };

// //   const blobToBase64 = (blob: Blob): Promise<string> => {
// //     return new Promise((resolve, reject) => {
// //       const reader = new FileReader();
// //       reader.onload = () => resolve(reader.result as string);
// //       reader.onerror = reject;
// //       reader.readAsDataURL(blob);
// //     });
// //   };

// //   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (!file) return;

// //     setUploading(true);
// //     setError(null);

// //     try {
// //       const resizedBlob = await resizeImage(file);
// //       const base64Data = await blobToBase64(resizedBlob);
// //       const fileName = `${Date.now()}_${file.name}`;

// //       const response = await fetch('/api/upload', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           file: base64Data.split(',')[1],
// //           fileName
// //         })
// //       });

// //       const contentType = response.headers.get('content-type');
// //       if (contentType && contentType.indexOf('application/json') !== -1) {
// //         const data = await response.json();
// //         if (!response.ok) {
// //           throw new Error(data.error || 'Upload failed');
// //         }
// //         console.log('File uploaded successfully!', data);
// //       } else {
// //         const text = await response.text();
// //         console.error('Unexpected response:', text);
// //         throw new Error('Unexpected response from server');
// //       }

// //       if (fileInputRef.current) fileInputRef.current.value = '';
// //     } catch (error: any) {
// //       setError(error.message);
// //       console.error('Upload error:', error);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleUpload}
// //         disabled={uploading}
// //         ref={fileInputRef}
// //         style={{ display: 'none' }}
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         disabled={uploading}
// //       >
// //         {uploading ? 'Uploading...' : 'Upload Scan'}
// //       </button>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //     </div>
// //   );
// // };

// // export default ImageUploadButton;

// // components/ImageUploadButton.tsx
// 'use client';

// import React, { useState, useRef } from 'react';

// interface ImageUploadButtonProps {
//   patientName: string;
// }

// const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
//   patientName
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const resizeImage = (file: File): Promise<Blob> => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = 224;
//         canvas.height = 224;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) {
//           reject(new Error('Could not get canvas context'));
//           return;
//         }

//         const scale = Math.max(
//           canvas.width / img.width,
//           canvas.height / img.height
//         );
//         const x = canvas.width / 2 - (img.width / 2) * scale;
//         const y = canvas.height / 2 - (img.height / 2) * scale;
//         ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

//         canvas.toBlob(
//           (blob) => {
//             if (blob) resolve(blob);
//             else reject(new Error('Could not create blob from canvas'));
//           },
//           'image/jpeg',
//           0.95
//         );
//       };
//       img.onerror = () => reject(new Error('Could not load image'));
//       img.src = URL.createObjectURL(file);
//     });
//   };

//   const blobToBase64 = (blob: Blob): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setError(null);

//     try {
//       const resizedBlob = await resizeImage(file);
//       const base64Data = await blobToBase64(resizedBlob);
//       const fileName = `${Date.now()}_${file.name}`;

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           file: base64Data.split(',')[1],
//           fileName,
//           patientName
//         })
//       });

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.indexOf('application/json') !== -1) {
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.error || 'Upload failed');
//         }
//         console.log('File uploaded successfully!', data);
//       } else {
//         const text = await response.text();
//         console.error('Unexpected response:', text);
//         throw new Error('Unexpected response from server');
//       }

//       if (fileInputRef.current) fileInputRef.current.value = '';
//     } catch (error: any) {
//       setError(error.message);
//       console.error('Upload error:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleUpload}
//         disabled={uploading}
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//       />
//       <button
//         onClick={() => fileInputRef.current?.click()}
//         disabled={uploading}
//       >
//         {uploading ? 'Uploading...' : 'Upload Scan'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default ImageUploadButton;

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadButtonProps {
  patientName: string;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  patientName
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Could not create blob from canvas'));
          },
          'image/jpeg',
          0.95
        );
      };
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const resizedBlob = await resizeImage(file);
      const base64Data = await blobToBase64(resizedBlob);
      const fileName = `${Date.now()}_${file.name}`;

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file: base64Data.split(',')[1],
          fileName,
          patientName
        })
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }
        console.log('File uploaded successfully!', data);
      } else {
        const text = await response.text();
        console.error('Unexpected response:', text);
        throw new Error('Unexpected response from server');
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      setError(error.message);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        style={{
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag and drop image here or click to choose file</p>
        )}
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ImageUploadButton;
