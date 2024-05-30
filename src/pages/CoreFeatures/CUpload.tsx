import Breadcrumb from '../../components/Breadcrumb';

const CredentialUpload = () => {
  return (
    <>

      <Breadcrumb pageName="Credentials Upload" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Document Type
            </label>
            <select required
              className="w-1/2 cursor-pointer p-1 rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-form-strokedark dark:bg-form-input dark:hover:bg-primary dark:hover:bg-opacity-10 dark:focus:border-primary"
            >
              <option value="">Select Document Type</option>
              <option value="Advert Certificates">Advert Certificates</option>
              <option value="Educational Certificates">Educational Certificates</option>
              <option value="Professional Certifications">Professional Certifications</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-1/2 mt-2">
            <label className="mb-3 block text-black dark:text-white">
              Attach file to upload
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              required
            />
          </div>

          <div className="w-3/4 mt-2">
            <label className="mb-3 block text-black dark:text-white">
              Description (Optional)
            </label>
            <textarea
              rows={5}
              className="w-full rounded-md border border-stroke p-3 outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white"
              placeholder="Add a brief description..."
            ></textarea>
          </div>

          <div className="mt-2">
            <button
              className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default CredentialUpload;
