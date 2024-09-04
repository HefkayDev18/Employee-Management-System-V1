import React, { useEffect, useState } from 'react';
import { getAllAds } from '../../../services/ApiService';
import Breadcrumb from '../../../components/Breadcrumb';
import toast from 'react-hot-toast';
import Loader from '../../../common/Loader';
import Pagination from '../../../components/Pagination';
import { FaImage } from 'react-icons/fa';
import { useAuth } from '../../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

const InternalAdvertisementView: React.FC = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(6);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const adsData = await getAllAds();
        const activeAds = adsData.filter((ad: any) => ad.isAdActive);
        setAds(activeAds);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Failed to fetch advertisements:');
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <Loader />;
  }


  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(ads.length / adsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Breadcrumb pageName="View Advertisements" />
      <div className="container mx-auto p-4">
        {/* <h2 className="text-2xl font-bold mb-4">Advertisements</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAds.map((ad: any) => (        
            <div key={ad.id} className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform transform hover:scale-110 dark:shadow-5xl flex flex-col">
                {ad.imageUrl ? (
                <img 
                    src={ad.imageUrl} 
                    alt={ad.title} 
                    className="w-full h-48 object-cover" 
                    onError={(e) => {
                    const target = e.currentTarget;
                    const fallbackDiv = target.nextElementSibling as HTMLElement | null;
            
                    if (fallbackDiv) {
                        target.style.display = 'none';
                        fallbackDiv.style.display = 'flex';
                    }
                    }}
                />
                ) : null}
            
                <div 
                    className="w-full h-48 flex items-center gap-2 justify-center bg-gray-200" 
                    style={{ display: ad.imageUrl ? 'none' : 'flex' }}
                    >
                    <FaImage className="text-gray-400 text-4xl dark:text-black" />
                    <h5 className="text-gray-400 text-center text-sm dark:text-black">Image not fetched</h5>
                </div>
            
                <div className="p-4 dark:bg-boxdark flex-grow">
                    <h3 className="text-lg font-bold mb-2 dark:text-white"><b>{ad.title}</b></h3>
                    <p className="text-gray-700 mb-3 text-sm dark:text-white">{ad.description}</p>
                </div>
            
                <div className="p-4 dark:bg-boxdark mt-auto">
                    {user?.role === 'Admin' ? (
                        <div className="flex items-center justify-between">
                        <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-boxdark text-sm hover:underline dark:text-white">
                            Learn More
                        </a>
                        <button 
                            onClick={() => navigate(`/core-features/updateadverts`, { state: { ad } })}
                            className="hover:bg-gray text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Modify
                        </button>
                        </div>
                    ) : (
                        <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline dark:text-white">
                        Learn More
                        </a>
                    )}
                </div>
          </div>
          
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
};

export default InternalAdvertisementView;
