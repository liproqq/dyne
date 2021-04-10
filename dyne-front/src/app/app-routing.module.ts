import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component"
import { EnterStatsComponent } from "./components/enter-stats/enter-stats.component"
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  { path: 'enter-stats', component: EnterStatsComponent,
    canActivate: [AuthGuard], // visit home only if authenticated
  },
  { path: '', component: EnterStatsComponent,
    canActivate: [AuthGuard], // visit home only if authenticated
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
