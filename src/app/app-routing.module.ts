import { NgModule, inject, Injectable } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecordComponent } from './pages/record/record.component';
import { RecordsComponent } from './pages/records/records.component';
import { ValidateComponent } from './pages/validate/validate.component';

@Injectable()
class PermissionsService {
  canActivate(router: Router): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    router.navigate(['login']);

    return false;
  }
}

const canActivate = () =>
  inject(PermissionsService).canActivate(inject(Router));

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RecordComponent },
  {
    path: 'registros',
    component: RecordsComponent,
    canActivate: [canActivate],
  },
  {
    path: ':id/validar',
    component: ValidateComponent,
    canActivate: [canActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionsService],
})
export class AppRoutingModule {}
