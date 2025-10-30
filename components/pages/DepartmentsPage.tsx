import React, { useState } from 'react';
import { Department, Employee } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import DepartmentForm from '../departments/DepartmentForm';
import Dialog from '../common/Dialog';
import { useToast } from '../../hooks/useToast';

interface DepartmentsPageProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  employees: Employee[];
}

const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ departments, setDepartments, employees }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingDeptId, setDeletingDeptId] = useState<string | null>(null);
  const { addToast } = useToast();

  const getDepartmentStats = (deptId: string) => {
    const employeeCount = employees.filter(e => e.departmentId === deptId).length;
    return { employeeCount };
  };

  const handleSaveDepartment = (deptData: Department) => {
    if (editingDepartment) {
      setDepartments(departments.map(d => d.id === deptData.id ? deptData : d));
      addToast({ type: 'success', message: 'Department updated successfully!' });
    } else {
      setDepartments(prev => [...prev, deptData]);
      addToast({ type: 'success', message: 'Department created successfully!' });
    }
    setEditingDepartment(null);
    setIsFormOpen(false);
  };
  
  const openEditForm = (dept: Department) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
  };
  
  const openAddForm = () => {
    setEditingDepartment(null);
    setIsFormOpen(true);
  };

  const openConfirmDelete = (id: string) => {
    setDeletingDeptId(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    if (deletingDeptId) {
      setDepartments(departments.filter(d => d.id !== deletingDeptId));
      addToast({ type: 'success', message: 'Department deleted successfully.' });
    }
    setIsConfirmOpen(false);
    setDeletingDeptId(null);
  };


  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <Button onClick={openAddForm}>Create Department</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(dept => {
            const manager = employees.find(e => e.id === dept.managerId);
            const stats = getDepartmentStats(dept.id);
            return (
              <Card key={dept.id} className="flex flex-col" footer={
                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => openEditForm(dept)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => openConfirmDelete(dept.id)}>Delete</Button>
                </div>
              }>
                  <h3 className="text-xl font-semibold text-foreground">{dept.name}</h3>
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Manager: {manager ? manager.name : 'Not Assigned'}</p>
                    <p>Employees: {stats.employeeCount}</p>
                  </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {isFormOpen && (
        <DepartmentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveDepartment}
          department={editingDepartment}
          employees={employees}
        />
      )}

      {isConfirmOpen && (
         <Dialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Confirm Deletion">
            <p className="text-muted-foreground mt-2">Are you sure you want to delete this department? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
         </Dialog>
      )}
    </>
  );
};

export default DepartmentsPage;
