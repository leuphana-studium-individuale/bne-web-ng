import {Component, EventEmitter, Input, Output} from '@angular/core';
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

    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, boolean>>();
    @Output() competenciesSelectedEmitter = new EventEmitter<Map<string, boolean>>();
    @Output() priceSelectedEmitter = new EventEmitter<number>();

    onGoalsSelected(event: Map<string, boolean>) {
        this.goalsSelectedEmitter.emit(event);
    }

    onCompetenciesSelected(event: Map<string, boolean>) {
        this.competenciesSelectedEmitter.emit(event);
    }

    onPriceSelected(event: number) {
        this.priceSelectedEmitter.emit(event);
    }
}
