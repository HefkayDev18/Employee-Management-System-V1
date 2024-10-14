import{r as c,a as x,v as y,j as e,b as g,T as h,n as o}from"./index-8cf87543.js";import{B as b}from"./Breadcrumb-9ee5e05d.js";const j=()=>{const[s,d]=c.useState({facultyName:""}),[a,r]=c.useState(!1),l=x();y();const i=t=>{const{name:n,value:m}=t.target;d(f=>({...f,[n]:m}))},u=async t=>{t.preventDefault(),r(!0);try{await h(s),o.success("Faculty created successfully!",{duration:8e3,onClose:()=>{l("/faculties/view-faculties")}}),l("/faculties/view-faculties")}catch{o.error("Failed to create faculty. Please try again.")}finally{r(!1)}};return a?e.jsx(g,{}):e.jsxs(e.Fragment,{children:[e.jsx(b,{pageName:"Add Faculty"}),e.jsxs("div",{className:"container py-8 px-6 bg-gray-900 rounded-lg shadow-lg",children:[e.jsx("h1",{className:"text-3xl font-bold text-center mb-8 dark:text-white",children:"Add A New Faculty"}),e.jsxs("form",{onSubmit:u,className:"max-w-full",children:[e.jsx("div",{className:"flex justify-around gap-5",children:e.jsxs("div",{className:"mb-4 w-1/2 bg-white shadow-md rounded-md p-4",children:[e.jsx("label",{htmlFor:"facultyName",className:"block text-sm font-medium text-gray-700 dark:text-black dark:font-bold",children:"Faculty Name"}),e.jsx("input",{type:"text",id:"facultyName",name:"facultyName",value:s.facultyName,placeholder:"Enter Faculty Name",onChange:i,required:!0,className:"mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"})]})}),e.jsx("div",{className:"flex justify-center mt-6",children:e.jsx("button",{type:"submit",className:"bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark",disabled:a,children:a?"Creating...":"Add Faculty"})})]})]})]})};export{j as default};
