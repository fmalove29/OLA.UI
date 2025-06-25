import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path : '',
        component : LayoutComponent,
        children : [
            { path: 'dashboard/overview', loadComponent : () => import('../app/core/components/dashboard/overview/overview.component').then(d => d.OverviewComponent), canActivate: [authGuard] },
            { path : 'dashboard/reports', loadComponent : () => import('../app/core/components/dashboard/reports/reports.component').then(dr => dr.ReportsComponent), canActivate : [authGuard] },
            { path : 'Access', loadComponent : () => import('../app/core/components/Administrator/access/access.component').then(a => a.AccessComponent), canActivate : [authGuard]},
            { path : 'Permission', loadComponent : () => import('../app/core/components/Administrator/permission/permission.component').then(p => p.PermissionComponent), canActivate : [authGuard]}
        ],
        canActivate : [authGuard]
    },
    { path: 'login', loadComponent : () => import('../app/shared/components/auth/login/login.component').then(l => l.LoginComponent)},
    { path : '**' , loadComponent : () => import('../app/shared/components/notfound/notfound.component').then(nt => nt.NotfoundComponent) }
];
