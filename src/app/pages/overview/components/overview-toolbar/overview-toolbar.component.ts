import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-overview-toolbar',
    templateUrl: './overview-toolbar.component.html',
    styleUrls: ['./overview-toolbar.component.scss']
})
export class OverviewToolbarComponent implements OnInit {

    @Output() menuItemEventEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onFilterClicked() {
        this.menuItemEventEmitter.emit('filter');
    }
}
