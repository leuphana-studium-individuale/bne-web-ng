import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

export class SelectableTag {
    name: string;
    selected: boolean;

    constructor(name: string, selected: boolean) {
        this.name = name;
        this.selected = selected;
    }
}

/**
 * Displays tag chips
 */
@Component({
    selector: 'app-selectable-tag-chips',
    templateUrl: './selectable-tag-chips.component.html',
    styleUrls: ['./selectable-tag-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableTagChipsComponent implements OnChanges {

    /** Tags to be displayed */
    @Input() selectableTagsMap: Map<string, boolean> = new Map<string, boolean>();
    /** Selected tags */
    /** Whether the component is readonly */
    @Input() readonly = false;
    /** Array of options */
    @Input() tagOptions: string[] = [];
    /** Text color of the tag */
    @Input() color = 'black';
    /** Background color of the tag */
    @Input() background = 'transparent';
    /** Placeholder for new elements */
    @Input() placeholder = 'New tag';
    /** Event emitter indicating changes in tags */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, boolean>>();

    selectableTags: SelectableTag[] = [];

    //
    // Lifecycle hooks
    //

    ngOnChanges(changes: SimpleChanges) {
        this.initializeSelectableTags();
    }

    //
    // Initialization
    //

    private initializeSelectableTags() {
        this.selectableTags = [];
        this.selectableTagsMap.forEach((value: boolean, key: string) => {
            this.selectableTags.push(new SelectableTag(key, value));
        });
    }

    //
    // Actions
    //

    onChipClicked(tag: SelectableTag) {
        this.selectableTagsMap.set(tag.name, !tag.selected);
        this.initializeSelectableTags();

        this.tagsChangedEmitter.emit(this.selectableTagsMap);
    }

    //
    // Helpers
    //

    getBackground(tag: SelectableTag) {
        return tag.selected ? this.background : 'transparent';
    }
}
