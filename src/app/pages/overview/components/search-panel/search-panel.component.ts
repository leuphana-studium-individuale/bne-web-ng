import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Partner} from '../../../../core/entity/model/partner.model';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

    @Input() goalsValuesMap: Map<string, boolean> = new Map<string, boolean>();
    @Input() goalsBackgroundColor: 'transparent';
    @Input() competenciesValuesMap: Map<string, boolean> = new Map<string, boolean>();
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

    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, boolean>>();
    @Output() competenciesSelectedEmitter = new EventEmitter<Map<string, boolean>>();
    @Output() priceSelectedEmitter = new EventEmitter<number>();
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<boolean>();
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<boolean>();
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<boolean>();

    onGoalsSelected(event: Map<string, boolean>) {
        this.goalsSelectedEmitter.emit(event);
    }

    onCompetenciesSelected(event: Map<string, boolean>) {
        this.competenciesSelectedEmitter.emit(event);
    }

    onPriceSelected(event: number) {
        this.priceSelectedEmitter.emit(event);
    }

    onLessThanOneHourChanged(checked: boolean) {
        this.lessThanOneHourChangedEmitter.emit(checked);
    }

    onBetweenOneAndTwoHoursChanged(checked: boolean) {
        this.betweenOneAndTwoHoursChangedEmitter.emit(checked);
    }

    onBetweenTwoAndFourHoursChanged(checked: boolean) {
        this.betweenTwoAndFourHoursChangedEmitter.emit(checked);
    }

    onBetweenOneAndTwoDaysChanged(checked: boolean) {
        this.betweenOneAndTwoDaysChangedEmitter.emit(checked);
    }

    onMoreThanTwoDaysChanged(checked: boolean) {
        this.moreThanTwoDaysChangedEmitter.emit(checked);
    }
}
