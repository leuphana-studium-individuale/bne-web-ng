import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-search-panel-times',
    templateUrl: './search-panel-times.component.html',
    styleUrls: ['./search-panel-times.component.scss']
})
export class SearchPanelTimesComponent {

    @Input() lessThanOneHour = false;
    @Input() betweenOneAndTwoHours = false;
    @Input() betweenTwoAndFourHours = false;
    @Input() betweenOneAndTwoDays = false;
    @Input() moreThanTwoDays = false;
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<boolean>();
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<boolean>();

    onLessThanOneHourChanged(event: MatCheckboxChange) {
        this.lessThanOneHourChangedEmitter.emit(event.checked);
    }

    onBetweenOneAndTwoHoursChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoHoursChangedEmitter.emit(event.checked);
    }

    onBetweenTwoAndFourHoursChanged(event: MatCheckboxChange) {
        this.betweenTwoAndFourHoursChangedEmitter.emit(event.checked);
    }

    onBetweenOneAndTwoDaysChanged(event: MatCheckboxChange) {
        this.betweenOneAndTwoDaysChangedEmitter.emit(event.checked);
    }

    onMoreThanTwoDaysChanged(event: MatCheckboxChange) {
        this.moreThanTwoDaysChangedEmitter.emit(event.checked);
    }
}
