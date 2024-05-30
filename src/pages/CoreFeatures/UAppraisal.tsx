import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const UpwardAppraisal = () => {
  // Dummy data for appraisal
  const [appraisalData, setAppraisalData] = useState({
    communication: 0,
    teamwork: 0,
    leadership: 0,
    problemSolving: 0,
    punctuality: 0,
    adaptability: 0,
    overallSatisfaction: 0,
    comments: "",
  });

  const handleRatingChange = (field: string, value: number) => {
    setAppraisalData({ ...appraisalData, [field]: value });
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppraisalData({ ...appraisalData, comments: event.target.value });
  };

  const submitAppraisal = () => {
    console.log("Appraisal submitted:", appraisalData);
  };

  return (
    <>
      <Breadcrumb pageName="Upward Appraisal" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h1 className="font-bold text-xl text-black text-center dark:text-white">Rate Your Line Head</h1>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">Communication</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.communication}
                  onChange={(e) => handleRatingChange("communication", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Teamwork</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.teamwork}
                  onChange={(e) => handleRatingChange("teamwork", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Leadership</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.leadership}
                  onChange={(e) => handleRatingChange("leadership", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Problem Solving</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.problemSolving}
                  onChange={(e) => handleRatingChange("problemSolving", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Punctuality</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.punctuality}
                  onChange={(e) => handleRatingChange("punctuality", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Adaptability</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.adaptability}
                  onChange={(e) => handleRatingChange("adaptability", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Overall Satisfaction</label>
                <input
                  type="range"
                  min="0" max="10" step="1"
                  value={appraisalData.overallSatisfaction}
                  onChange={(e) => handleRatingChange("overallSatisfaction", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">Comments</label>
                <textarea
                  rows={4}
                  value={appraisalData.comments}
                  onChange={handleCommentsChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  onClick={submitAppraisal}
                  className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
                >
                  Submit Appraisal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpwardAppraisal;
