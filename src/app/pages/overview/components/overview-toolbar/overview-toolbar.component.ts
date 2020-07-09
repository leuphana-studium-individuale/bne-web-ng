import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-overview-toolbar',
    templateUrl: './overview-toolbar.component.html',
    styleUrls: ['./overview-toolbar.component.scss']
})
export class OverviewToolbarComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    onFilterClicked() {
        console.log('BOING');
    }
}
