import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    salary: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      {/* <Breadcrumb pageName={`Update Employee ${id}`} /> */}
      <Breadcrumb pageName="Update Employee" />

      <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Update Employee {id}</h1>
        <form onSubmit={handleSubmit} className="max-w-full">
          <div className='flex justify-around gap-5'>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="Enter First Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} placeholder="Enter Last Name" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          <div className='flex justify-around gap-5'>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} placeholder="Enter Email Address" onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Department</label>
              <input type="text" id="department" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          <div className='flex justify-around gap-5'>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Position</label>
              <input type="text" id="position" name="position" placeholder="Enter Position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
            <div className="mb-4 w-1/2 bg-white shadow-md rounded-md p-4">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-black dark:font-bold">Salary</label>
              <input type="text" id="salary" name="salary" placeholder="Enter Salary" value={formData.salary} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">Update Employee</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;


