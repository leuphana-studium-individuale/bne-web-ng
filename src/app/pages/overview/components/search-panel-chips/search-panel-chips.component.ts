import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-search-panel-chips',
    templateUrl: './search-panel-chips.component.html',
    styleUrls: ['./search-panel-chips.component.scss']
})
export class SearchPanelChipsComponent {

    @Input() valuesMap: Map<string, boolean> = new Map<string, boolean>();
    @Input() background: string;
    /** Event emitter indicating changes in tags */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, boolean>>();

    onTagsSelected(event: Map<string, boolean>) {
        this.tagsChangedEmitter.emit(event);
    }
}
