import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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

    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, boolean>>();
    @Output() competenciesSelectedEmitter = new EventEmitter<Map<string, boolean>>();

    onGoalsSelected(event: Map<string, boolean>) {
        this.goalsSelectedEmitter.emit(event);
    }

    onCompetenciesSelected(event: Map<string, boolean>) {
        this.competenciesSelectedEmitter.emit(event);
    }
}
