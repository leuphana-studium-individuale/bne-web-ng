import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

/**
 * Displays search for costs
 */
@Component({
    selector: 'app-search-panel-costs',
    templateUrl: './search-panel-costs.component.html',
    styleUrls: ['./search-panel-costs.component.scss']
})
export class SearchPanelCostsComponent implements OnChanges {

    /** Filter value for costs per child */
    @Input() costPerChildValue = 0;
    /** Minimum value for costs per child */
    @Input() costPerChildMin = 0;
    /** Maximum value for costs per child */
    @Input() costPerChildMax = 0;
    /** Color for cost slider */
    @Input() costPerChildColor = 'primary';
    /** Event emitter indicating value being changed */
    @Output() valueChangedEmitter = new EventEmitter<number>();

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-changes lifecycle phase
     */
    ngOnChanges(changes: SimpleChanges) {
        this.costPerChildColor = 'primary';
    }

    //
    // Actions
    //

    /**
     * Handles value change
     * @param event new value
     */
    onValueChanged(event: number) {
        this.costPerChildValue = event;
        this.valueChangedEmitter.emit(event);
    }
}
