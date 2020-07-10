import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-search-panel-chips',
    templateUrl: './search-panel-chips.component.html',
    styleUrls: ['./search-panel-chips.component.scss']
})
export class SearchPanelChipsComponent implements OnInit {

    @Input() valuesMap: Map<string, string> = new Map<string, string>();
    @Input() background: string;
    /** Event emitter indicating changes in tags */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, boolean>>();

    selectableTags = new Map<string, boolean>();

    constructor() {
    }

    ngOnInit() {
        this.initializeValues(this.valuesMap);
    }

    private initializeValues(valuesMap: Map<string, string>) {
        Array.from(valuesMap.values()).forEach(value => {
            this.selectableTags.set(value, false);
        });
    }

    onTagsSelected(event: Map<string, boolean>) {
        this.tagsChangedEmitter.emit(event);
    }
}
