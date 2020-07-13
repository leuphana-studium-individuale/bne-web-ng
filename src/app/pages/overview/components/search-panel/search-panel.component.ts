import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Partner} from '../../../../core/entity/model/partner.model';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

    @Input() goalsValuesMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    @Input() goalsBackgroundColor: 'transparent';
    @Input() competenciesValuesMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    @Input() competenciesBackgroundColor: 'transparent';
    @Input() partnersMap: Map<string, Partner>;

    @Input() costPerChildValue = 0;
    @Input() costPerChildMin = 0;
    @Input() costPerChildMax = 0;
    @Input() costPerChildColor = 'transparent';

    @Input() lessThanOneHour = false;
    @Input() betweenOneAndTwoHours = false;
    @Input() betweenTwoAndFourHours = false;
    @Input() betweenOneAndTwoDays = false;
    @Input() moreThanTwoDays = false;

    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();
    @Output() competenciesSelectedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();
    @Output() priceSelectedEmitter = new EventEmitter<number>();
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();

    onGoalsSelected(event: Map<string, [boolean, boolean]>) {
        this.goalsSelectedEmitter.emit(event);
    }

    onCompetenciesSelected(event: Map<string, [boolean, boolean]>) {
        this.competenciesSelectedEmitter.emit(event);
    }

    onPriceSelected(event: number) {
        this.priceSelectedEmitter.emit(event);
    }

    onLessThanOneHourChanged(value: [boolean, boolean]) {
        this.lessThanOneHourChangedEmitter.emit(value);
    }

    onBetweenOneAndTwoHoursChanged(value: [boolean, boolean]) {
        this.betweenOneAndTwoHoursChangedEmitter.emit(value);
    }

    onBetweenTwoAndFourHoursChanged(value: [boolean, boolean]) {
        this.betweenTwoAndFourHoursChangedEmitter.emit(value);
    }

    onBetweenOneAndTwoDaysChanged(value: [boolean, boolean]) {
        this.betweenOneAndTwoDaysChangedEmitter.emit(value);
    }

    onMoreThanTwoDaysChanged(value: [boolean, boolean]) {
        this.moreThanTwoDaysChangedEmitter.emit(value);
    }
}
