import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsComponent} from './pages/details/details.component';

const routes: Routes = [
    {path: ':id', component: DetailsComponent},
    {path: '', component: DetailsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsRoutingModule {
}
