import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-details-toolbar',
    templateUrl: './details-toolbar.component.html',
    styleUrls: ['./details-toolbar.component.scss']
})
export class DetailsToolbarComponent {

    @Input() title = '';
    @Output() menuItemEventEmitter = new EventEmitter<string>();

    onBackClicked() {
        this.menuItemEventEmitter.emit('back');
    }
}
