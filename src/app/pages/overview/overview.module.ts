import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './pages/overview/overview.component';
import {OverviewRoutingModule} from './overview-routing.module';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {ProjectListItemComponent} from './components/project-list-item/project-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {TagChipsModule} from '../../ui/tag-chips/tag-chips.module';


@NgModule({
    declarations: [OverviewComponent, ProjectListComponent, ProjectListItemComponent],
    exports: [
        OverviewComponent
    ],
    imports: [
        CommonModule,
        OverviewRoutingModule,
        MatButtonModule,
        MatCardModule,
        TagChipsModule
    ]
})
export class OverviewModule {
}
