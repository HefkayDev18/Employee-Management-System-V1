import { lazy } from 'react';

const dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Survey = lazy(() => import('../pages/Surveys'));
const History = lazy(() => import('../pages/CoreFeatures/EHistory'));
const AddHistory = lazy(() => import('../pages/CoreFeatures/AddEHistory'));
const UpdateHistory = lazy(() => import('../pages/CoreFeatures/UpdateEHistory'));
const SubmitAppraisal = lazy(() => import('../pages/CoreFeatures/Appraisals/SubmitAppraisal.tsx'));
const ReviewAppraisal = lazy(() => import('../pages/CoreFeatures/Appraisals/ReviewAppraisal.tsx'));
const AppraisalsHistory = lazy(() => import('../pages/CoreFeatures/Appraisals/AppraisalHistory.tsx'));
const AddMedicalRecord = lazy(() => import('../pages/CoreFeatures/MedicalRecords/AddMedRecords.tsx'));
const AddAdmMedicalRecord = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ADM_ViewMedRecords.tsx'));
const ViewMedicalRecords = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ViewAllMedRecords.tsx'));
const ViewEmpMedicalRecords = lazy(() => import('../pages/CoreFeatures/MedicalRecords/ViewEmpMedRecords.tsx'));
const Adverts = lazy(() => import('../pages/CoreFeatures/IAdvertisement'));
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
    path: '/core-features/advertisement',
    title: 'Internal Adverts',
    component: Adverts,
  },
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
    roles: ['Admin'],
  },

  //#region Departments
  {
    path: '/departments/add-department',
    title: 'Add Department',
    component: AddDepartment,
    roles: ['Admin'],
  },
  {
    path: '/departments/update-department',
    title: 'Update Department',
    component: UpdateDepartment,
    roles: ['Admin'],
  },
  {
    path: '/departments/view-departments',
    title: 'View Departments',
    component: ViewDepartments,
    roles: ['Admin'],
  },
  //#endregion
  
  //#region Faculties
   {
    path: '/faculties/add-faculties',
    title: 'Add Faculties',
    component: AddFaculties,
    roles: ['Admin'],
  },
  {
    path: '/faculties/view-faculties',
    title: 'View Faculties',
    component: ViewFaculties,
    roles: ['Admin'],
  },
  //#endregion

  //#region Employee Actions
  {
    path: '/employee/create-employee',
    title: 'Create Employee',
    component: CreateEmployee,
    roles: ['Admin'],
  },
  {
    path: '/employee/view-employees',
    title: 'View Employees',
    component: ViewEmployee,
    roles: ['Admin'],
  },
  {
    path: '/employee/update-employee',
    title: 'Update Employee',
    component: UpdateEmployee,
    roles: ['Admin'],
  },
  //#endregion
  
  //#region Employee History 
  {
    path: '/core-features/history',
    title: 'Employment History',
    component: History,
    roles: ['Admin'],
  },
  {
    path: '/core-features/add-history',
    title: 'Add Employment History',
    component: AddHistory,
    roles: ['Admin'],
  },
  {
    path: '/core-features/update-history',
    title: 'Update Employment History',
    component: UpdateHistory,
    roles: ['Admin'],
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
  
  {
    path: '/medicals/add-adm_medical-records',
    title: 'Add Medical Record',
    component: AddAdmMedicalRecord,
    roles: ['Admin'],
  }, 
  {
    path: '/medicals/add-medical-records',
    title: 'Add Medical Record',
    component: AddMedicalRecord,
    roles: ['Admin'],
  },
  {
    path: '/medicals/view-medical-records',
    title: 'View Medical Records',
    component: ViewMedicalRecords,
    roles: ['Admin'],
  },
  {
    path: '/medicals/view-empmedical-records',
    title: 'View Employee Medical Records',
    component: ViewEmpMedicalRecords,
    roles: ['User'],
  },
  {
    path: '/employee/update-employee-role',
    title: 'Update Employee Role',
    component: UpdateEmployeeRole,
    roles: ['Admin'],
  },
];

const routes = [...coreRoutes];
export default routes;
