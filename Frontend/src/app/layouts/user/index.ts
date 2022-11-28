import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const USER_COMPONENTS = [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
];

export const USER_ROUTES = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login',
            breadcrumb: 'Login',
        },
    },
    {
        path: 'signup',
        component: RegisterComponent,
        data: {
            title: 'User Registration',
            breadcrumb: 'User Registration',
        },
    },
    {
        path: 'forgotpwd',
        component: ForgotPasswordComponent,
        data: {
            title: 'Forgot Password',
            breadcrumb: 'Forgot Password',
        },
    },
    {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Login',
            breadcrumb: 'Login',
        },
    }
];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';