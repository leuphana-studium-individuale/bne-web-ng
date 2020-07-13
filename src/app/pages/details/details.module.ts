import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsRoutingModule} from './details-routing.module';
import {DetailsComponent} from './pages/details/details.component';
import { DetailsToolbarComponent } from './components/details-toolbar/details-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TagChipsModule} from '../../ui/tag-chips/tag-chips.module';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
    declarations: [
        DetailsComponent,
        DetailsToolbarComponent
    ],
    exports: [
        DetailsComponent
    ],
    imports: [
        CommonModule,
        DetailsRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
        TagChipsModule
    ]
})
export class DetailsModule {
}
