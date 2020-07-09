import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntityModule} from './entity/entity.module';
import {NotificationModule} from './notification/notification.module';
import {UiModule} from './ui/ui.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EntityModule,
        NotificationModule,
        UiModule
    ]
})
export class CoreModule {
}
