import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const InternalAdvertisementView = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      title: 'Join Our Team!',
      description: 'Exciting opportunities available. Apply now!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/jobs',
    },
    {
      id: 2,
      title: 'New Product Launch',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/OIP.6NfuhwWC7-0v3norFMe9rAHaHa?pid=ImgDet&w=185&h=185&c=7',
      link: 'https://example.com/products',
    },
    {
      id: 3,
      title: 'New Product Launch',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
    {
      id: 4,
      title: 'New Article Launch',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
    {
      id: 5,
      title: 'New Publication Available',
      description: 'Introducing our latest publication. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
    {
      id: 6,
      title: 'New Publication Available',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
    {
      id: 7,
      title: 'New Publication Available',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
    {
      id: 8,
      title: 'New Publication Available',
      description: 'Introducing our latest product. Learn more!',
      image: 'https://th.bing.com/th/id/R.5b2e7338bc317e81ded108df674f13f0?rik=Djo5X1xCFqSkiA&pid=ImgRaw&r=0',
      link: 'https://example.com/products',
    },
  ]);

  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    image: '',
    link: ''
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setNewAd(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const newId = advertisements.length + 1; 
    setAdvertisements([...advertisements, { ...newAd, id: newId }]);
    setNewAd({ title: '', description: '', image: '', link: '' }); 
  };

  return (
    <>
      <Breadcrumb pageName="Internal Advertisements" />

      <div className="container mx-auto py-8">
        <h1 className="text-center text-black mb-6 text-xl font-bold hover:text-gray dark:text-white"><a href="#newAdvert">Add New Adverts &darr;</a></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
              <div className="p-4 dark:bg-boxdark">
                <h2 className="text-lg font-semibold mb-2 dark:text-white">{ad.title}</h2>
                <p className="text-gray-700 mb-4 dark:text-white">{ad.description}</p>
                <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-white">Learn More</a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 px-4 py-4 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:shadow-lg dark:bg-boxdark">
          <h2 className="text-xl text-black font-bold mb-5.5 mt-1 dark:text-white" id="newAdvert">Add New Advertisements</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newAd.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="block w-full p-2 border border-boxdark rounded focus:outline-none"
              required
            />
            <input
              type="text"
              name="image"
              value={newAd.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="block w-full p-2 border border-boxdark rounded focus:outline-none"
            />
            <input
              type="url"
              name="link"
              value={newAd.link}
              onChange={handleInputChange}
              placeholder="Link"
              className="block w-full p-2 border border-boxdark rounded focus:outline-none"
              required
            />
            <textarea
              name="description"
              value={newAd.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="block w-full p-2 border border-boxdark rounded focus:outline-none"
              required
            />
            <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
              Add Advertisement
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InternalAdvertisementView;


