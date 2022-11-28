import { DepartmentCreateEditComponent } from './components/department-create-edit/department-create-edit.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentViewComponent } from './components/department-view/department-view.component';

export const DEPARTMENT_COMPONENTS = [
    DepartmentCreateEditComponent,
    DepartmentViewComponent,
    DepartmentListComponent
];

export const DEPARTMENT_ROUTES = [
    {
        path: 'department',
        component: DepartmentListComponent,
        data: {
            title: 'Departments',
            breadcrumb: 'Departments',
        },
    },
    {
        path: 'create-department',
        component: DepartmentCreateEditComponent,
        data: {
            title: 'Create Department',
            breadcrumb: 'Create Department',
        },
    },
    {
        path: ':type/:id/update-department',
        component: DepartmentCreateEditComponent,
        data: {
            title: 'Edit Department',
            breadcrumb: 'Edit Department',
        },
    },
    {
        path: ':id/view-partment',
        component: DepartmentViewComponent,
        data: {
            title: 'View Department',
            breadcrumb: 'View Department',
        },
    },
    // {
    //     path: '',
    //     component: DepartmentListComponent,
    //     data: {
    //         title: 'Departments',
    //         breadcrumb: 'Departments',
    //     },
    // }
];

export * from './components/department-create-edit/department-create-edit.component';
export * from './components/department-list/department-list.component';
export * from './components/department-view/department-view.component';
