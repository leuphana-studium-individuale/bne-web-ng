import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

/**
 * Displays search panel for efforts
 */
@Component({
    selector: 'app-search-panel-times',
    templateUrl: './search-panel-times.component.html',
    styleUrls: ['./search-panel-times.component.scss']
})
export class SearchPanelTimesComponent {

    /** Filter value for effort */
    @Input() lessThanOneHour = [false, false];
    /** Filter value for effort */
    @Input() betweenOneAndTwoHours = [false, false];
    /** Filter value for effort */
    @Input() betweenTwoAndFourHours = [false, false];
    /** Filter value for effort */
    @Input() betweenOneAndTwoDays = [false, false];
    /** Filter value for effort */
    @Input() moreThanTwoDays = [false, false];
    /** Event emitter indicating value being changed */
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating value being changed */
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating value being changed */
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating value being changed */
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating value being changed */
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();

    //
    // Actions
    //

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onLessThanOneHourChanged(event: MatCheckboxChange) {
        this.lessThanOneHourChangedEmitter.emit([event.checked, this.lessThanOneHour[1]]);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoHoursChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoHoursChangedEmitter.emit([event.checked, this.betweenOneAndTwoHours[1]]);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenTwoAndFourHoursChanged(event: MatCheckboxChange) {
        this.betweenTwoAndFourHoursChangedEmitter.emit([event.checked, this.betweenTwoAndFourHours[1]]);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoDaysChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoDaysChangedEmitter.emit([event.checked, this.betweenOneAndTwoDays[1]]);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onMoreThanTwoDaysChanged(event: MatCheckboxChange) {
        this.moreThanTwoDaysChangedEmitter.emit([event.checked, this.moreThanTwoDays[1]]);
    }
}
