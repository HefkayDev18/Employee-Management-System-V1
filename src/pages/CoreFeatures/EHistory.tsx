import Breadcrumb from '../../components/Breadcrumb';


const EmploymentHistory = () => {
  const employmentHistory = [
    {
      id: 1,
      companyName: "University of Lagos",
      position: "Associate Professor",
      duration: "January 2003 - Present",
      currentlyEmployed: true,
      description: "Lead a team of lectures to deliver high-quality lessons on mechatronics engineering.",
      salary: "600,000",
      faculty: "Engineering",
    },
    // {
    //   id: 2,
    //   companyName: "XYZ Inc.",
    //   position: "Senior Lecturer",
    //   duration: "July 2010 - December 2020",
    //   currentlyEmployed: false,
    //   description: "Taught over 1000 students algebra",
    // },
  ];

  return (
    <>
      <Breadcrumb pageName="Employment History" />

      <div className="flex justify-center mt-8">
        <div className="max-w-full md:max-w-2xl lg:max-w-4xl border-white-300 p-10 bg-white rounded-lg overflow-hidden shadow-lg dark:bg-transparent">
          {employmentHistory.map((employment) => (
            <div key={employment.id} className="p-6 md:p-8 lg:p-12 border border-stroke bg-white rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
              <h2 className="text-lg lg:text-xl mb-8 font-semibold text-black dark:text-white">{employment.companyName} History Card</h2>
              <dl className="mt-4 space-y-2">
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Position:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.position}</dd>
                </div>
                <hr></hr>
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Duration:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.duration}</dd>
                </div>
                <hr></hr>
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Currently Employed:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.currentlyEmployed ? 'Yes' : 'No'}</dd>
                </div>
                <hr></hr>
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Description:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.description}</dd>
                </div>
                <hr></hr>
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Salary:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.salary}</dd>
                </div>
                <hr></hr>
                <div className="flex flex-wrap">
                  <dt className="w-1/3 md:w-1/4 lg:w-1/3 font-medium text-gray-500 dark:text-white">Faculty:</dt>
                  <dd className="w-2/3 md:w-3/4 lg:w-2/3 text-gray-900 dark:text-white">{employment.faculty}</dd>
                </div>
                <hr></hr>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmploymentHistory;
