import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-search-panel-times',
    templateUrl: './search-panel-times.component.html',
    styleUrls: ['./search-panel-times.component.scss']
})
export class SearchPanelTimesComponent {

    @Input() lessThanOneHour = [false, false];
    @Input() betweenOneAndTwoHours = [false, false];
    @Input() betweenTwoAndFourHours = [false, false];
    @Input() betweenOneAndTwoDays = [false, false];
    @Input() moreThanTwoDays = [false, false];
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();

    onLessThanOneHourChanged(event: MatCheckboxChange) {
        this.lessThanOneHourChangedEmitter.emit([event.checked, this.lessThanOneHour[1]]);
    }

    onBetweenOneAndTwoHoursChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoHoursChangedEmitter.emit([event.checked, this.betweenOneAndTwoHours[1]]);
    }

    onBetweenTwoAndFourHoursChanged(event: MatCheckboxChange) {
        this.betweenTwoAndFourHoursChangedEmitter.emit([event.checked, this.betweenTwoAndFourHours[1]]);
    }

    onBetweenOneAndTwoDaysChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoDaysChangedEmitter.emit([event.checked, this.betweenOneAndTwoDays[1]]);
    }

    onMoreThanTwoDaysChanged(event: MatCheckboxChange) {
        this.moreThanTwoDaysChangedEmitter.emit([event.checked, this.moreThanTwoDays[1]]);
    }
}
