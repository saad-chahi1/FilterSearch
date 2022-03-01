import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommencerDechargementComponent } from './component/dechargement/commencer-dechargement/commencer-dechargement.component';

const routes: Routes = [
  { path: 'home', component: CommencerDechargementComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
