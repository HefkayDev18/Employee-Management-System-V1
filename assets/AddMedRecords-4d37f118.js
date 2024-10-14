import{c as b,r as p,a as h,v as j,j as e,b as y,n,w as N}from"./index-8cf87543.js";import{B as k}from"./Breadcrumb-9ee5e05d.js";const C=()=>{var u;const i=(u=b().state)==null?void 0:u.employeeId,[a,l]=p.useState({diagnosis:"",prescription:"",appointmentDate:"",doctorName:"",comments:""}),[o,m]=p.useState(!1),c=h();j();const t=d=>{const{name:s,value:x}=d.target;if(s==="appointmentDate"){const r=new Date(x).toISOString().split("T")[0];l(f=>({...f,[s]:r}))}else l(r=>({...r,[s]:x}))},g=async d=>{if(d.preventDefault(),!i){n.error("Employee ID is missing.");return}m(!0);try{await N(parseInt(i),a),n.success("Medical record added successfully!",{duration:8e3,onClose:()=>c("/medicals/view-adm_medical-records")}),c("/medicals/view-adm_medical-records")}catch{n.error("Failed to add medical record. Please try again.")}finally{m(!1)}};return o?e.jsx(y,{}):e.jsxs(e.Fragment,{children:[e.jsx(k,{pageName:"Employee Medical Records"}),e.jsxs("div",{className:"container py-8 px-6 bg-gray-900 rounded-lg shadow-lg",children:[e.jsx("h1",{className:"text-3xl font-bold text-center mb-8 dark:text-white",children:"Add Medical Record"}),e.jsxs("form",{onSubmit:g,className:"max-w-full",children:[e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-full bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"diagnosis",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Diagnosis"}),e.jsx("input",{type:"text",id:"diagnosis",name:"diagnosis",value:a.diagnosis,placeholder:"Enter Diagnosis",onChange:t,required:!0,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-full bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"prescription",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Prescription"}),e.jsx("input",{type:"text",id:"prescription",name:"prescription",value:a.prescription,placeholder:"Enter Prescription",onChange:t,required:!0,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-full bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"appointmentDate",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Appointment Date"}),e.jsx("input",{type:"date",id:"appointmentDate",name:"appointmentDate",value:a.appointmentDate,onChange:t,required:!0,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-full bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"doctorName",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Doctor's Name"}),e.jsx("input",{type:"text",id:"doctorName",name:"doctorName",value:a.doctorName,placeholder:"Enter Doctor's Name",onChange:t,required:!0,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-full bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"comments",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Comments"}),e.jsx("textarea",{id:"comments",name:"comments",value:a.comments,placeholder:"Enter Comments",onChange:t,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx("button",{type:"submit",className:"bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark",disabled:o,children:o?"Adding...":"Add Medical Record"})})]})]})]})};export{C as default};
