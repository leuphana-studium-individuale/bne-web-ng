import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './pages/overview/overview.component';
import {OverviewRoutingModule} from './overview-routing.module';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {ProjectListItemComponent} from './components/project-list-item/project-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {TagChipsModule} from '../../ui/tag-chips/tag-chips.module';
import {OverviewToolbarComponent} from './components/overview-toolbar/overview-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { SearchPanelChipsComponent } from './components/search-panel-chips/search-panel-chips.component';
import { SearchPanelSliderComponent } from './components/search-panel-slider/search-panel-slider.component';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
    declarations: [
        OverviewComponent,
        OverviewToolbarComponent,
        ProjectListComponent,
        ProjectListItemComponent,
        SearchPanelComponent,
        SearchPanelChipsComponent,
        SearchPanelSliderComponent
    ],
    exports: [
        OverviewComponent
    ],
    imports: [
        CommonModule,
        OverviewRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSliderModule,
        MatToolbarModule,
        MatTooltipModule,
        TagChipsModule
    ]
})
export class OverviewModule {
}
