import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeuxComponent } from './jeux/jeux.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: JeuxComponent},
  {path: '**', pathMatch: 'full', component: JeuxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
