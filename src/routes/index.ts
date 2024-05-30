import { lazy } from 'react';

const dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Survey = lazy(() => import('../pages/Surveys'));
const History = lazy(() => import('../pages/CoreFeatures/EHistory'));
const Appraisal = lazy(() => import('../pages/CoreFeatures/UAppraisal'));
const Records = lazy(() => import('../pages/CoreFeatures/MRecords'));
const Adverts = lazy(() => import('../pages/CoreFeatures/IAdvertisement'));
const Uploads = lazy(() => import('../pages/CoreFeatures/CUpload'));
const Departments = lazy(() => import('../pages/Departments'));
const CreateEmployee = lazy(() => import('../pages/EmployeeActions/CreateEmployee'));
const ViewEmployee = lazy(() => import('../pages/EmployeeActions/ViewEmployee'));
const UpdateEmployee = lazy(() => import('../pages/EmployeeActions/UpdateEmployee'));
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
    path: '/core-features/history',
    title: 'Employment History',
    component: History,
  },
  {
    path: '/core-features/appraisal',
    title: 'Upward Appraisal',
    component: Appraisal,
  },
  {
    path: '/core-features/advertisement',
    title: 'Internal Adverts',
    component: Adverts,
  },
  {
    path: '/core-features/records',
    title: 'Medical Records',
    component: Records,
  },
  {
    path: '/core-features/uploads',
    title: 'File Uploads',
    component: Uploads,
  },
  {
    path: '/departments',
    title: 'Department',
    component: Departments,
  },
  {
    path: '/employee/create-employee',
    title: 'Create Employee',
    component: CreateEmployee,
  },
  {
    path: '/employee/view-employees',
    title: 'View Employees',
    component: ViewEmployee,
  },
  {
    path: '/employee/update-employee',
    title: 'Update Employee',
    component: UpdateEmployee,
  },
];

const routes = [...coreRoutes];
export default routes;
