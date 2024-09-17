import { lazy } from 'react';

const dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Survey = lazy(() => import('../pages/Surveys'));
const History = lazy(() => import('../pages/CoreFeatures/EmploymentHistory/EHistory.tsx'));
const UserHistory = lazy(() => import('../pages/CoreFeatures/EmploymentHistory/UserEHistory.tsx'));
const AddHistory = lazy(() => import('../pages/CoreFeatures/EmploymentHistory/AddEHistory.tsx'));
const UpdateHistory = lazy(() => import('../pages/CoreFeatures/EmploymentHistory/UpdateEHistory.tsx'));
const SubmitAppraisal = lazy(() => import('../pages/CoreFeatures/Appraisals/SubmitAppraisal.tsx'));
const ReviewAppraisal = lazy(() => import('../pages/CoreFeatures/Appraisals/ReviewAppraisal.tsx'));
const AppraisalsHistory = lazy(() => import('../pages/CoreFeatures/Appraisals/AppraisalHistory.tsx'));
const AddMedicalRecord = lazy(() => import('../pages/CoreFeatures/MedicalRecords/AddMedRecords.tsx'));
const AddAdmMedicalRecord = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ADM_ViewMedRecords.tsx'));
const ViewMedicalRecords = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ViewAllMedRecords.tsx'));
const ViewEmpMedicalRecords = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ViewEmpMedRecords.tsx'));
const AddAdverts = lazy(() => import('../pages/CoreFeatures/Advertisements/AddAdverts.tsx'));
const UpdateAdverts = lazy(() => import('../pages/CoreFeatures/Advertisements/UpdateAdverts.tsx'));
const ViewAdverts = lazy(() => import('../pages/CoreFeatures/Advertisements/ViewAdverts.tsx'));
const FileUploads = lazy(() => import('../pages/CoreFeatures/FileUploads/CUpload.tsx'));
const empFileUploads = lazy(() => import('../pages/CoreFeatures/FileUploads/ViewUpload.tsx'));
const admFileUploads = lazy(() => import('../pages/CoreFeatures/FileUploads/ADM_ViewUploads.tsx'));
const AddDepartment = lazy(() => import('../pages/Departments/AddDepartment'));
const UpdateDepartment = lazy(() => import('../pages/Departments/UpdateDepartment.tsx'));
const ViewDepartments = lazy(() => import('../pages/Departments/ViewDepartments'));
const ViewFaculties = lazy(() => import('../pages/Faculties/ViewFaculties'));
const AddFaculties = lazy(() => import('../pages/Faculties/AddFaculty'));
const CreateEmployee = lazy(() => import('../pages/EmployeeActions/CreateEmployee'));
const ViewEmployee = lazy(() => import('../pages/EmployeeActions/ViewEmployee'));
const UpdateEmployee = lazy(() => import('../pages/EmployeeActions/UpdateEmployee'));
const UpdateEmployeeRole = lazy(() => import('../pages/EmployeeActions/UpdateEmployeeRole'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));


const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: dashboard,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/analytics',
    title: 'Analytics',
    component: Analytics,
  },
  {
    path: '/survey',
    title: 'Survey',
    component: Survey,
  },
  {
    path: '/core-features/addadverts',
    title: 'Upload Adverts',
    component: AddAdverts,
    roles: ['HR_Admin'],
  },
  {
    path: '/core-features/updateadverts',
    title: 'Update Adverts',
    component:  UpdateAdverts,
    roles: ['HR_Admin'],
  },
  {
    path: '/core-features/viewadverts',
    title: 'View Adverts',
    component: ViewAdverts,
  },

  //#region File Uploads
  {
    path: '/files/uploads',
    title: 'File Uploads',
    component: FileUploads,
  },
  {
    path: '/files/view-emp-uploads',
    title: 'Personal File Uploads',
    component: empFileUploads,
    roles: ['User'],
  },
  {
    path: '/files/view-adm-uploads',
    title: 'All File Uploads',
    component: admFileUploads,
    roles: ['HR_Admin'],
  },
  //#endregion

  //#region Departments
  {
    path: '/departments/add-department',
    title: 'Add Department',
    component: AddDepartment,
    roles: ['Faculty_Officer'],
  },
  {
    path: '/departments/update-department',
    title: 'Update Department',
    component: UpdateDepartment,
    roles: ['Faculty_Officer'],
  },
  {
    path: '/departments/view-departments',
    title: 'View Departments',
    component: ViewDepartments,
  },
  //#endregion
  
  //#region Faculties
   {
    path: '/faculties/add-faculties',
    title: 'Add Faculties',
    component: AddFaculties,
    roles: ['Faculty_Officer'],
  },
  {
    path: '/faculties/view-faculties',
    title: 'View Faculties',
    component: ViewFaculties,
  },
  //#endregion

  //#region Employee Actions
  {
    path: '/employee/create-employee',
    title: 'Create Employee',
    component: CreateEmployee,
    roles: ['HR_Admin'],
  },
  {
    path: '/employee/view-employees',
    title: 'View Employees',
    component: ViewEmployee,
    roles: ['Admin', 'HR_Admin'],
  },
  {
    path: '/employee/update-employee',
    title: 'Update Employee',
    component: UpdateEmployee,
    roles: ['HR_Admin'],
  },
  //#endregion
  
  //#region Employee History 
  {
    path: '/core-features/history',
    title: 'Employment History',
    component: History,
    roles: ['Admin', 'HR_Admin'],
  },
  {
    path: '/core-features/userhistory',
    title: 'User Employment History',
    component: UserHistory,
  },
  {
    path: '/core-features/add-history',
    title: 'Add Employment History',
    component: AddHistory,
    roles: ['HR_Admin'],
  },
  {
    path: '/core-features/update-history',
    title: 'Update Employment History',
    component: UpdateHistory,
    roles: ['HR_Admin'],
  },
  //#endregion
  
  //#region Appraisals
  {
    path: '/core-features/appraisals/submit',
    title: 'Submit Appraisal',
    component: SubmitAppraisal,
  },
  {
    path: '/core-features/appraisals/history',
    title: 'Appraisals History',
    component: AppraisalsHistory,
  },
  {
    path: '/core-features/appraisals/review',
    title: 'Review Appraisal',
    component: ReviewAppraisal,
    roles: ['Admin'],
  },

  //#endregion
  
  //#region Medical Records
  {
    path: '/medicals/add-adm_medical-records',
    title: 'Add Medical Record',
    component: AddAdmMedicalRecord,
    roles: ['MED_Admin'],
  }, 
  {
    path: '/medicals/add-medical-records',
    title: 'Add Medical Record',
    component: AddMedicalRecord,
    roles: ['MED_Admin'],
  },
  {
    path: '/medicals/view-medical-records',
    title: 'View Medical Records',
    component: ViewMedicalRecords,
    roles: ['MED_Admin'],
  },
  {
    path: '/medicals/view-empmedical-records',
    title: 'View Employee Medical Records',
    component: ViewEmpMedicalRecords,
    // roles: ['User'],
  },
  //#endregion

  {
    path: '/employee/update-employee-role',
    title: 'Update Employee Role',
    component: UpdateEmployeeRole,
    roles: ['HR_Admin'],
  },
];

const routes = [...coreRoutes];
export default routes;
