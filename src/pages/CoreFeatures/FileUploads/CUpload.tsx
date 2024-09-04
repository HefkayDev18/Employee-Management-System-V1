
import { useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { uploadCredentials } from '../../../services/ApiService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';
import Loader from '../../../common/Loader';

const CredentialUpload = () => {
  const [documentType, setDocumentType] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!documentType || files.length === 0) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('description', description);
    
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    const empId = user?.employeeObj.employeeId;

    if (empId) {
      try {
        setLoading(true);
        await uploadCredentials(empId, token, formData);
        toast.success('Files uploaded successfully.', {
          duration: 8000,
          onClose: () => navigate('/files/uploads')
        } as any);
        navigate('/files/uploads');
        setDocumentType('');
        setFiles([]);
        setDescription('');
      } catch (error) {
        toast.error('Failed to upload files.', {
          duration: 8000,
          onClose: () => navigate('/files/uploads')
        } as any);
        navigate('/files/uploads');
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
      <Breadcrumb pageName="Credentials Upload" />
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-black dark:text-white">Document Type</label>
              <select
                required
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-1/2 cursor-pointer text-sm p-1 rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-form-strokedark dark:bg-form-input dark:hover:bg-primary dark:hover:bg-opacity-10 dark:focus:border-primary"
              >
                <option value="">Select Document Type</option>
                <option value="Advert Certificates">Advert Certificates</option>
                <option value="Educational Certificates">Educational Certificates</option>
                <option value="Professional Certifications">Professional Certifications</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="w-1/2 mt-4">
              <label className="mb-2 block text-sm text-black dark:text-white">Attach files to upload</label>
              <input
                type="file"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                multiple
                className="w-full text-sm cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                required
              />
            </div>

            <div className="w-3/4 mt-4">
              <label className="mb-2 block text-sm text-black dark:text-white">Description (Optional)</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg text-sm border border-stroke p-3 outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
                placeholder="Add a brief description..."
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CredentialUpload;
