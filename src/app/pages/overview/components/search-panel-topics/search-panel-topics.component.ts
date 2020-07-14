import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Displays search panel for topics
 */
@Component({
    selector: 'app-search-panel-topics',
    templateUrl: './search-panel-topics.component.html',
    styleUrls: ['./search-panel-topics.component.scss']
})
export class SearchPanelTopicsComponent {

    /** Map of filter values */
    @Input() valuesMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    /** Border color for tags */
    @Input() border: string;
    /** Background color for tags */
    @Input() background: string;
    /** Event emitter indicating tags being changed */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();

    //
    // Actions
    //

    /**
     * Handles tag selection
     * @param event event
     */
    onTagsSelected(event: Map<string, [boolean, boolean]>) {
        this.tagsChangedEmitter.emit(event);
    }
}
