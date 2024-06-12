'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import { db, storage } from '@/lib/firebase/clientApp';
import { ref as storageRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ref as databaseRef, get, push, off } from 'firebase/database';
import { ProgressBar } from 'primereact/progressbar';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useMessage } from '@/lib/contexts/MessageContext';
import SelectField from './form/selectField';
import ImageField from './form/imageField';
import MessageField from './form/messageField';

interface User {
  name: string;
  uid: string;
}

interface FormValues {
  selectedUser: string;
  message: string;
}

const validationSchema = Yup.object({
  selectedUser: Yup.number().required('Select a user'),
  message: Yup.string().required('Message is required'),
});

const AdditionForm = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { showSuccessMessage } = useMessage();

  useEffect(() => {
    if (!user) return;
    const usersRef = databaseRef(db, 'users');

    get(usersRef).then((snapshot) => {
      const data = snapshot.val();
      const users = Object.keys(data)
        .filter((key) => key !== user.uid)
        .map((key) => {
          return {
            name: data[key].name,
            uid: key,
          };
        }).sort((a, b) => a.name.localeCompare(b.name));
      setUsers(users);
    });
    return () => {
      off(usersRef);
    };
  }, [user]);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  };

  const uploadImage = async (image: File, uid: string) => {
    const imageRef = storageRef(storage, `images/${uid}/${uuidv4()}`);
    const compressedImage = await compressImage(image);
    const uploadTask = uploadBytesResumable(imageRef, compressedImage);
    setUploading(true);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    });
    await uploadTask;
    setUploading(false);
    return await getDownloadURL(imageRef);
  }

  const submit = async (values: FormValues) => {
    const imageUrl = image ? await uploadImage(image, values.selectedUser) : null;
    const message = {
      sender: user?.displayName,
      imageUrl: imageUrl,
      message: values.message,
      timestamp: new Date().toUTCString(),
    };
    const messageRef = databaseRef(db, `messages/${values.selectedUser}`);
    await push(messageRef, message);
    showSuccessMessage('Message sent successfully');
  };


  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-8 m-4 rounded-lg shadow-lg max-w-md w-full">
        <Formik
          initialValues={{ selectedUser: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await submit({ ...values, selectedUser: users[Number(values.selectedUser)].uid });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <SelectField label='Select a user' name='selectedUser' placeholder='select a user' options={users} />
              <ImageField label='Optional photo' name='photo' type='file' update={setImage} />
              {uploading && (
                <ProgressBar value={progress} displayValueTemplate={(value) => `${value}%`} />
              )}
              <MessageField label='Message' name='message' type='text' />
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdditionForm;
