import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../common/Loader';
import { getEmployeeById, getRoles, updateEmployeeRole } from '../../services/ApiService';
import { toast, ToastOptions } from 'react-hot-toast';


interface Role {
  roleId: number;
  roleName: string;
}

interface FormData {
  roleId: number;
  roleName: string;
}

const UpdateEmployeeRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const [formData, setFormData] = useState<FormData>({
    roleId: 0,
    roleName: ''
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeAndRoles = async () => {
      if (!employee?.employeeId) {
        setLoading(false);
        return;
      }

      try {
        const [employeeData, rolesData] = await Promise.all([
          getEmployeeById(employee.employeeId),
          getRoles()
        ]);

        const employeeRole = rolesData.find((role: Role) => role.roleId === employeeData.roleId);

        setFormData({
          roleId: employeeData.roleId || 0,
          roleName: employeeRole ? employeeRole.roleName : ''
        });
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching employee or roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAndRoles();
  }, [employee?.employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = parseInt(e.target.value, 10);
    const selectedRole = roles.find(role => role.roleId === selectedRoleId);

    setFormData({
      roleId: selectedRoleId,
      roleName: selectedRole ? selectedRole.roleName : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.roleId) {
      toast.error('Role is required.');
      return;
    }

    setLoading(true);

    try {
      await updateEmployeeRole(employee?.employeeId ?? 0, {
        roleId: formData.roleId,
        roleName: formData.roleName
      });
      toast.success('Employee role updated successfully!', {
        duration: 5000
      } as ToastOptions);
      navigate('/employee/view-employees');
    } catch (error) {
      console.error('Error updating employee role:', error);
      toast.error('Failed to update employee role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Update Role" />
      <div className="container py-8 px-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Update {employee?.fullName}'s Role</h1>
        <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
          <div className="mb-4 w-full bg-white shadow-md rounded-md p-4">
            <label htmlFor="roleId" className="block text-md font-medium font-bold text-gray-700 dark:text-black dark:font-bold">Select Role</label>
            <select id="roleId" name="roleId" value={formData.roleId.toString()} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary focus:outline-none sm:text-sm">
              <option value="" disabled>Select New Role</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-primary text-white py-3 px-6 rounded-lg font-medium transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
              {loading ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployeeRole;
