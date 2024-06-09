'use client'
import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from './inputField';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('This field is required')
      .matches(/^[a-zA-Z]{3,15}@seniors24\.com$/, 'Invalid email'),
    password: Yup.string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters long'),
  });



  const submit = async (user: User) => {
    await signIn(user.email, user.password);
    router.replace('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await submit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 md:text-left">Log In</h1>
              <InputField label="Email" name="email" type="text" />
              <InputField label="Password" name="password" type="password" />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
                  } text-white font-semibold`}
              >
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
