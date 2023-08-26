import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShipListComponent } from './ships/ship-list/ship-list.component';
import { ShipDetailComponent } from './ships/ship-detail/ship-detail.component';
import { authGuard } from './_guards/auth.guard';
import { ShipDeleteComponent } from './ships/ship-delete/ship-delete.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'ships', component: ShipListComponent},
      {path: 'ships/new', component: ShipDetailComponent},
      {path: 'ships/delete/:id', component: ShipDeleteComponent},
      {path: 'ships/:id', component: ShipDetailComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
