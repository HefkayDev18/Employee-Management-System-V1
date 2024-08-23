import React, { useEffect, useState } from 'react';
import { fetchAppraisalsHistory } from '../../../services/ApiService';
// import { useAuth } from '../../Authentication/AuthContext';
import Loader from '../../../common/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import { useLocation } from 'react-router-dom';


interface Employee {
    fullName: string;
    position: string;
    department: string;
}
  
interface Appraisal {
    appraisalId: number;
    employee?: Employee;
    publicationProgress: string;
    teaching: string;
    patentConferencing: string;
    communityService: string;
    administrationExperience: string;
    communication: string;
    teamwork: string;
    leadership: string;
    problemSolving: string;
    punctuality: string;
    adaptability: string;
    overallSatisfaction: string;
    comments: string;
    managerComment: string;
    status: string;
    appDateCreated: string;
    reviewedAt: string;
}

const AppraisalHistory: React.FC = () => {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
//   const { user } = useAuth();
//   const employeeId = user?.employeeObj.employeeId || 0;

  const employeeId = location.state?.employeeId || 0;


  useEffect(() => {
    const fetchAppraisalHistory = async () => {
      try {
        const data = await fetchAppraisalsHistory(employeeId);
        console.log("data", data);
        setAppraisals(data);
      } catch (error) {
        console.error('Error fetching appraisals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisalHistory();
  }, [employeeId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Appraisal History" />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-black">Your Appraisal History</h1>
          </div>

          {appraisals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date Reviewed</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Manager Comment</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Progress</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PatentConferencing</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">CommunityService</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AdministrationExperience</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Communication</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Teamwork</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Leadership</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ProblemSolving</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Punctuality</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Adaptability</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">OverallSatisfaction</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appraisals.map((appraisal, index) => (
                  <tr key={appraisal.appraisalId}>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.status}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{new Date(appraisal.appDateCreated).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{new Date(appraisal.reviewedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.managerComment}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.publicationProgress}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.teaching}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.patentConferencing}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.communityService}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.administrationExperience}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.communication}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.teamwork}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.leadership}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.problemSolving}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.punctuality}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.adaptability}%</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{appraisal.overallSatisfaction}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            <p className="py-4 text-center text-3xl text-gray-600 dark:text-gray-400">No appraisals found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AppraisalHistory;
