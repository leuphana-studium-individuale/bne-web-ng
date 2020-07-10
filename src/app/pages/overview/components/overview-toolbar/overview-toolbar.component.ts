import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-overview-toolbar',
    templateUrl: './overview-toolbar.component.html',
    styleUrls: ['./overview-toolbar.component.scss'],
    animations: [
        trigger('searchResetButtonAnimation', [
            state('open', style({
                opacity: '1',
                overflow: 'hidden',
                width: '*',
            })),
            state('closed', style({
                opacity: '0',
                overflow: 'hidden',
                width: '0px',
            })),
            transition('* => *', animate('400ms ease-in-out'))
        ])
    ]
})
export class OverviewToolbarComponent implements OnInit {

    @Input() searchPanelState = false;
    @Output() menuItemEventEmitter = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onFilterClicked() {
        this.menuItemEventEmitter.emit('filter');
    }

    onResetFilterClicked() {
        this.menuItemEventEmitter.emit('filter-reset');
    }
}
