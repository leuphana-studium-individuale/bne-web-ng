import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {emit} from 'cluster';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

    @Input() goalsMap: Map<string, Goal>;
    @Input() goalsBackgroundColor: 'transparent';
    @Input() competenciesMap: Map<string, Competency>;
    @Input() partnersMap: Map<string, Partner>;

    /** Event emitter indicating changes in tags */
    @Output() goalsSelectedEmitter = new EventEmitter<Map<string, boolean>>();

    goalsValuesMap: Map<string, string> = new Map<string, string>();

    constructor() {
    }

    ngOnInit() {
        this.goalsMap.forEach((value: Goal, key: string) => {
            this.goalsValuesMap.set(value.title, value.title);
        });
    }

    onGoalsSelected(event: Map<string, boolean>) {
        this.goalsSelectedEmitter.emit(event);
    }
}
