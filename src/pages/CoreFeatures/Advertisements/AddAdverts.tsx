import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAds } from '../../../services/ApiService';
import { useAuth } from '../../Authentication/AuthContext';
import toast from 'react-hot-toast';
import Breadcrumb from '../../../components/Breadcrumb';
import Loader from '../../../common/Loader';

const AddAdvertisement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [advertLink, setAdvertLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImageUrl('');
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !advertLink || (!imageFile && !imageUrl)) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('Link', advertLink);

    if (imageFile) {
      formData.append('ImageFile', imageFile);
    } else if (imageUrl) {
      formData.append('ImageUrl', imageUrl);
    }

    const empId = user?.employeeObj.employeeId;

    if (empId) {
      try {
        setLoading(true);
        await uploadAds(empId, token, formData);
        toast.success('Advertisement uploaded successfully.', {
          duration: 8000,
          onClose: () => navigate('/core-features/viewadverts')
        } as any);
        navigate('/core-features/viewadverts');
      } catch (error) {
        toast.error('Failed to upload advertisement');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Upload Advertisement" />
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 dark:text-black" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 dark:text-black" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 dark:text-black" htmlFor="advertLink">
              Advert Link
            </label>
            <input
              id="advertLink"
              type="url"
              className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              value={advertLink}
              onChange={(e) => setAdvertLink(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 dark:text-black">
              Image Source
            </label>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 dark:text-black">
                  Upload Image File
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleFileChange}
                  disabled={!!imageUrl}
                  required={!imageUrl}
                />
              </div>
              <span className="text-gray-500">or</span>
              <div className="w-5/6">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-black">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  disabled={!!imageFile}
                  required={!imageFile}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 dark:text-black">
              Choose to upload an image file or provide a direct image URL.
            </p>
          </div>
          
          <div className="flex items-center justify-end">
            <button
              className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAdvertisement;

