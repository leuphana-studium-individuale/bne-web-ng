import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Partner} from '../../../../core/entity/model/partner.model';

/**
 * Displays search panel
 */
@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

    /** Map of goals */
    @Input() goalsValuesMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    /** Background color for goal tags */
    @Input() goalsBackgroundColor: 'transparent';
    /** Map of competencies */
    @Input() competenciesValuesMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    /** Background color for competencies tags */
    @Input() competenciesBackgroundColor: 'transparent';
    /** Map of partners */
    @Input() partnersMap: Map<string, Partner>;

    /** Filter value for costs per child */
    @Input() costPerChildValue = 0;
    /** Minimum value for costs per child */
    @Input() costPerChildMin = 0;
    /** Maximum value for costs per child */
    @Input() costPerChildMax = 0;
    /** Color for cost slider */
    @Input() costPerChildColor = 'transparent';

    /** Filter value for effort */
    @Input() lessThanOneHour = false;
    /** Filter value for effort */
    @Input() betweenOneAndTwoHours = false;
    /** Filter value for effort */
    @Input() betweenTwoAndFourHours = false;
    /** Filter value for effort */
    @Input() betweenOneAndTwoDays = false;
    /** Filter value for effort */
    @Input() moreThanTwoDays = false;

    /** Event emitter indicating filter value being changed */
    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();
    /** Event emitter indicating filter value being changed */
    @Output() competenciesSelectedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();
    /** Event emitter indicating filter value being changed */
    @Output() priceSelectedEmitter = new EventEmitter<number>();
    /** Event emitter indicating filter value being changed */
    @Output() lessThanOneHourChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating filter value being changed */
    @Output() betweenOneAndTwoHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating filter value being changed */
    @Output() betweenTwoAndFourHoursChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating filter value being changed */
    @Output() betweenOneAndTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();
    /** Event emitter indicating filter value being changed */
    @Output() moreThanTwoDaysChangedEmitter = new EventEmitter<[boolean, boolean]>();

    /**
     * Handles selection of goals
     * @param event map of goals
     */
    onGoalsSelected(event: Map<string, [boolean, boolean]>) {
        this.goalsSelectedEmitter.emit(event);
    }

    /**
     * Handles selection of competencies
     * @param event map of competencies
     */
    onCompetenciesSelected(event: Map<string, [boolean, boolean]>) {
        this.competenciesSelectedEmitter.emit(event);
    }

    /**
     * Handles selection of a price limit
     * @param event price limit
     */
    onPriceSelected(event: number) {
        this.priceSelectedEmitter.emit(event);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onLessThanOneHourChanged(event: [boolean, boolean]) {
        this.lessThanOneHourChangedEmitter.emit(event);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoHoursChanged(event: [boolean, boolean]) {
        this.betweenOneAndTwoHoursChangedEmitter.emit(event);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenTwoAndFourHoursChanged(event: [boolean, boolean]) {
        this.betweenTwoAndFourHoursChangedEmitter.emit(event);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoDaysChanged(event: [boolean, boolean]) {
        this.betweenOneAndTwoDaysChangedEmitter.emit(event);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onMoreThanTwoDaysChanged(event: [boolean, boolean]) {
        this.moreThanTwoDaysChangedEmitter.emit(event);
    }
}
