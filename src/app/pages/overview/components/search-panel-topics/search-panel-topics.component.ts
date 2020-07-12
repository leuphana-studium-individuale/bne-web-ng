import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-search-panel-topics',
    templateUrl: './search-panel-topics.component.html',
    styleUrls: ['./search-panel-topics.component.scss']
})
export class SearchPanelTopicsComponent {

    @Input() valuesMap: Map<string, boolean> = new Map<string, boolean>();
    @Input() border: string;
    @Input() background: string;
    /** Event emitter indicating changes in tags */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, boolean>>();

    onTagsSelected(event: Map<string, boolean>) {
        this.tagsChangedEmitter.emit(event);
    }
}
