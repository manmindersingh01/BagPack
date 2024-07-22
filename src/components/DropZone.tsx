"use client";
import Dropzone from 'react-dropzone';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../fitebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const DropZone = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const maxSize = 1024 * 1024 * 20; // Maximum file size: 20MB

  const uploadPost = async (file: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        fileName: file.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        type: file.type,
        size: file.size,
        timestamp: serverTimestamp(),
        createdAt: new Date(),
        lastModified: file.lastModified,
      });

      console.log('Document reference created:', docRef.id); // Log document reference ID

      const imgRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      await uploadBytes(imgRef, file);

      const downloadUrl = await getDownloadURL(imgRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl,
      });

      console.log('File uploaded successfully:', downloadUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading aborted");
      reader.onerror = () => console.log("File reading failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={handleDrop}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <section>
          <div
            {...getRootProps()}
            className={`p-4 border rounded-md ${isDragActive ? 'bg-blue-600 animate-pulse' : 'dark:bg-slate-800 bg-slate-200'} text-center p-10 h-40 m-5 flex items-center justify-center`}
          >
            <input {...getInputProps()} />
            {!isDragActive && <p>Drag 'n' drop some files here, or click to select files</p>}
            {isDragActive && !isDragReject && <p>Drop to upload this file</p>}
            {isDragReject && <p>File type not supported</p>}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DropZone;
