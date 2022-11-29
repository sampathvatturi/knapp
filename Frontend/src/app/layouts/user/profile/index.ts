import { ProfileComponent } from './profile.component';

export const PROFILE_COMPONENTS = [
    ProfileComponent,
];

export const PROFILE_ROUTES = [
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Profile',
            breadcrumb: 'Profile',
        },
    },
];

export * from './profile.component';
