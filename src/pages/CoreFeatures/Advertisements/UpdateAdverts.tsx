import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateAds } from '../../../services/ApiService';
import Breadcrumb from '../../../components/Breadcrumb';
import toast from 'react-hot-toast';
import Loader from '../../../common/Loader';

const UpdateAdvertisement: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ad = location.state?.ad;


  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(ad?.title || '');
  const [description, setDescription] = useState(ad?.description || '');
  const [advertLink, setAdvertLink] = useState(ad?.link || '');
  const [isAdActive, setIsAdActive] = useState(ad?.isAdActive || false);
  const [imageUrl, setImageUrl] = useState(ad?.imageUrl || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [useImageFile, setUseImageFile] = useState(!!ad?.imageUrl);


  useEffect(() => {
    if (ad) {
      setTitle(ad.title || '');
      setDescription(ad.description || '');
      setAdvertLink(ad.link || '');
      setIsAdActive(ad.isAdActive || false);
      setImageUrl(ad.imageUrl || '');
      setUseImageFile(!!ad.imageUrl);
    }
  }, [ad]);


  const handleUpdateAd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !advertLink ||  (!imageUrl && !imageFile)) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', advertLink);
    formData.append('isAdActive', isAdActive.toString());

    if (useImageFile && imageFile) {
      formData.append('imageFile', imageFile);
    } else if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      setLoading(true);
      await updateAds(ad?.employeeId || '', Number(ad?.advertisementId || 0), formData);
      toast.success('Advertisement updated successfully', {
        duration: 8000,
        onClose: () => navigate('/core-features/viewadverts'),
        } as any);
        navigate('/core-features/viewadverts');
    } catch (error) {
      toast.error('Failed to update advertisement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Update Advertisement" />
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg px-6 py-8">
        <form onSubmit={handleUpdateAd}>
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
            <label className="block text-gray-700 font-bold mb-2 dark:text-black" htmlFor="isAdActive">
              Active
            </label>
            <input
              id="isAdActive"
              type="checkbox"
              checked={isAdActive}
              onChange={(e) => setIsAdActive(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <span className="text-sm dark:text-black">Is Advertisement Active</span>
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
              Change Image Source
            </label>
            <div className="flex items-center mb-2">
              <label className="mr-4">
                <input
                  type="radio"
                  className="mr-2 text-sm"
                  checked={!useImageFile}
                  onChange={() => setUseImageFile(false)}
                />
                Use Image URL
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2 text-sm"
                  checked={useImageFile}
                  onChange={() => setUseImageFile(true)}
                />
                Upload Image File
              </label>
            </div>

            {useImageFile ? (
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                className="shadow appearance-none border rounded w-5/6 text-sm py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required={!imageUrl}
              />
            ) : (
              <input
                id="imageUrl"
                type="text"
                className="shadow appearance-none border rounded w-5/6 text-sm py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required={!imageFile}
              />
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAdvertisement;
