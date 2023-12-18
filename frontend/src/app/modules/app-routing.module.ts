
/*
 * Copyright (c) 2023 Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../access.guard';
import { AuthBaseComponent } from '../components/public/authentication/auth-base/auth-base.component';
import { CoreComponent } from '../components/main/core/core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AccessGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../components/protected/dashboard/_module/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'setup',
        loadChildren: () => import('../components/protected/setup/_module/setup.module').then(m => m.SetupModule)
      },
      {
        path: 'user-roles-management',
        loadChildren: () => import('../components/protected/manage/user-and-roles/_module/users-roles.module').then(m => m.UsersRolesModule)
      },
      {
        path: 'sql-studio',
        loadChildren: () => import('../components/protected/create/sql-studio/_module/sql-studio.module').then(m => m.SqlStudioModule)
      },
      {
        path: 'endpoints',
        loadChildren: () => import('../components/protected/manage/endpoints/_module/endpoints.module').then(m => m.EndpointsModule)
      },
      {
        path: 'databases',
        loadChildren: () => import('../components/protected/create/databases/_module/databases.module').then(m => m.DatabasesModule)
      },
      {
        path: 'endpoint-generator',
        loadChildren: () => import('../components/protected/create/endpoint-generator/_module/endpoint.module').then(m => m.EndpointModule)
      },
      {
        path: 'plugins',
        loadChildren: () => import('../components/protected/manage/plugins/_module/plugins.module').then(m => m.PluginsModule)
      },
      {
        path: 'hyperlambda-playground',
        loadChildren: () => import('../components/protected/manage/hyperlambda-playground/_module/hyperlambda-playground.module').then(m => m.HyperlambdaPlaygroundModule)
      },
      {
        path: 'hyper-ide',
        loadChildren: () => import('../components/protected/create/hyper-ide/module/ide.module').then(m => m.IdeModule)
      },
      {
        path: 'chatbot-wizard',
        loadChildren: () => import('../components/protected/create/chatbot-wizard/_module/chatbot-wizard.module').then(m => m.ChatbotWizardModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('../components/protected/manage/tasks/_module/task.module').then(m => m.TaskModule)
      },
      {
        path: 'health-check',
        loadChildren: () => import('../components/protected/misc/health-check/_module/health-check.module').then(m => m.HealthCheckModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('../components/protected/misc/configuration/_module/config.module').then(m => m.ConfigModule)
      },
      {
        path: 'log',
        loadChildren: () => import('../components/protected/misc/log/_module/log.module').then(m => m.LogModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../components/protected/user/profile/_module/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'machine-learning',
        loadChildren: () => import('../components/protected/manage/machine-learning/_module/machine-learning.module').then(m => m.MachineLearningTrainingModule)
      },
    ]
  },
  {
    path: 'authentication',
    component: AuthBaseComponent,
    loadChildren: () => import('../components/public/authentication/_module/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('../components/public/not-found/_module/notfound.module').then(m => m.NotfoundModule),
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
