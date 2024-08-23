import React, { useState } from 'react';
import { submitAppraisal } from '../../../services/ApiService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';
import { useAuth } from '../../Authentication/AuthContext';
import Breadcrumb from '../../../components/Breadcrumb';
import Swal from 'sweetalert2';

const SubmitAppraisalForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const employeeId = user?.employeeObj.employeeId || 0;
  
  const [appraisalData, setAppraisalData] = useState<any>({
    PublicationProgress: 0,
    Teaching: 0,
    PatentConferencing: 0,
    CommunityService: 0,
    AdministrationExperience: 0,
    Communication: 0,
    Teamwork: 0,
    Leadership: 0,
    ProblemSolving: 0,
    Punctuality: 0,
    Adaptability: 0,
    OverallSatisfaction: 0,
    Comments: "",
    Status: "Pending"
  });

  const handleViewAppraisals = () => {
    navigate('/core-features/appraisals/history', { state: { employeeId } });
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Appraisal Submission!',
      html: '<div style="color: orange"><small>Are you sure you want to submit your appraisal? <p>Cannot be undertaken again till 6 months, if approved/rejected!!</p></small></div>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit!'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await submitAppraisal(employeeId, appraisalData);
        toast.success('Appraisal submitted successfully!', {
          duration: 5000,
          onClose: () => navigate('/core-features/appraisals/submit'),
        }as any);
        navigate('/core-features/appraisals/submit');
      } catch (error) {
        toast.error('Failed to submit appraisal');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
  <>
  <Breadcrumb pageName="Appraisal Submission" />
  
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="border-b border-gray-200 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-black">Submit Your Appraisal</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {['PublicationProgress', 'Teaching', 'PatentConferencing', 'CommunityService', 'AdministrationExperience'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize dark:text-black">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={appraisalData[key]}
                  onChange={(e) => setAppraisalData({ ...appraisalData, [key]: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-500 dark:text-black">{appraisalData[key] + '%'}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {['Communication', 'Teamwork', 'Leadership', 'ProblemSolving', 'Punctuality', 'Adaptability', 'OverallSatisfaction'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize dark:text-black">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={appraisalData[key]}
                  onChange={(e) => setAppraisalData({ ...appraisalData, [key]: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-500 dark:text-black">{appraisalData[key] + '%'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-black">Comments</label>
          <textarea
            rows={4}
            value={appraisalData.Comments}
            onChange={(e) => setAppraisalData({ ...appraisalData, Comments: e.target.value })}
            className="w-full rounded-lg border-gray p-3 text-sm focus:outline-gray"
          />
        </div>

        <div className="mt-6">
          <div className="block text-md font-medium pb-2 text-gray-700 dark:text-black">Status: <b className="text-warning">{appraisalData.Status}</b></div>
        </div>
        <hr></hr>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleViewAppraisals}
            className="bg-transparent text-primary font-bold py-2 px-3"
          >
            View Appraisals History
          </button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded"
          >
            Submit Appraisal
          </button>
        </div>
      </div>
    </div>
  </>
    
  );
};

export default SubmitAppraisalForm;
