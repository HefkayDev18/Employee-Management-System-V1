import{r as o,a as g,u as y,j as e,b as v,_ as n,C as j}from"./index-8cf87543.js";import{B as w}from"./Breadcrumb-9ee5e05d.js";const D=()=>{const[s,c]=o.useState(""),[u,p]=o.useState([]),[m,f]=o.useState(""),[i,b]=o.useState(!1),t=g(),{user:l,token:x}=y(),k=async r=>{if(r.preventDefault(),!s||u.length===0){n.error("Please fill in all required fields.");return}const a=new FormData;a.append("documentType",s),a.append("description",m),u.forEach(d=>{a.append("files",d,d.name)});const h=l==null?void 0:l.employeeObj.employeeId;if(h)try{b(!0),await j(h,x,a),n.success("Files uploaded successfully.",{duration:8e3,onClose:()=>t("/files/uploads")}),t("/files/uploads"),c(""),p([]),f("")}catch{n.error("Failed to upload files.",{duration:8e3,onClose:()=>t("/files/uploads")}),t("/files/uploads")}finally{b(!1)}};return i?e.jsx(v,{}):e.jsxs(e.Fragment,{children:[e.jsx(w,{pageName:"Credentials Upload"}),e.jsx("div",{className:"rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark",children:e.jsx("div",{className:"flex flex-col gap-5.5 p-6.5",children:e.jsxs("form",{onSubmit:k,children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm text-black dark:text-white",children:"Document Type"}),e.jsxs("select",{required:!0,value:s,onChange:r=>c(r.target.value),className:"w-1/2 cursor-pointer text-sm p-1 rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-form-strokedark dark:bg-form-input dark:hover:bg-primary dark:hover:bg-opacity-10 dark:focus:border-primary",children:[e.jsx("option",{value:"",children:"Select Document Type"}),e.jsx("option",{value:"Advert Certificates",children:"Advert Certificates"}),e.jsx("option",{value:"Educational Certificates",children:"Educational Certificates"}),e.jsx("option",{value:"Professional Certifications",children:"Professional Certifications"}),e.jsx("option",{value:"Other",children:"Other"})]})]}),e.jsxs("div",{className:"w-1/2 mt-4",children:[e.jsx("label",{className:"mb-2 block text-sm text-black dark:text-white",children:"Attach files to upload"}),e.jsx("input",{type:"file",onChange:r=>p(Array.from(r.target.files||[])),multiple:!0,className:"w-full text-sm cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary",required:!0})]}),e.jsxs("div",{className:"w-3/4 mt-4",children:[e.jsx("label",{className:"mb-2 block text-sm text-black dark:text-white",children:"Description (Optional)"}),e.jsx("textarea",{rows:5,value:m,onChange:r=>f(r.target.value),className:"w-full rounded-lg text-sm border border-stroke p-3 outline-none transition focus:border-primary hover:bg-primary hover:bg-opacity-10 dark:border-strokedark dark:bg-form-input dark:focus:border-primary dark:text-white",placeholder:"Add a brief description..."})]}),e.jsx("div",{className:"mt-4",children:e.jsx("button",{type:"submit",className:"bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark",disabled:i,children:i?"Uploading...":"Upload"})})]})})})]})};export{D as default};
