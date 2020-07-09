import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    // Overview module
    {path: 'overview', loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)},
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
