import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

export class SelectableTag {
    name: string;
    selected: boolean;
    disabled: boolean;

    constructor(name: string, selected: boolean, disabled: boolean) {
        this.name = name;
        this.selected = selected;
        this.disabled = disabled;
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
    @Input() selectableTagsMap: Map<string, [boolean, boolean]> = new Map<string, [boolean, boolean]>();
    /** Whether the component is readonly */
    @Input() readonly = false;
    /** Array of options */
    @Input() tagOptions: string[] = [];
    /** Text color of the tag */
    @Input() color = 'black';
    /** Border color of the tag */
    @Input() border = 'transparent';
    /** Background color of the tag */
    @Input() background = 'transparent';
    /** Placeholder for new elements */
    @Input() placeholder = 'New tag';
    /** Event emitter indicating changes in tags */
    @Output() tagsChangedEmitter = new EventEmitter<Map<string, [boolean, boolean]>>();

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
        this.selectableTagsMap.forEach((value: [boolean, boolean], key: string) => {
            this.selectableTags.push(new SelectableTag(key, value[0], value[1]));
        });
    }

    //
    // Actions
    //

    onChipClicked(tag: SelectableTag) {
        if (!tag.disabled) {
            this.selectableTagsMap.set(tag.name, [!tag.selected, tag.disabled]);
            this.initializeSelectableTags();

            this.tagsChangedEmitter.emit(this.selectableTagsMap);
        }
    }

    //
    // Helpers
    //

    getBorder() {
        return `${this.border} 2px solid`;
    }

    getBackground(tag: SelectableTag) {
        return tag.selected ? this.background : 'transparent';
    }

    getDisabled(tag: SelectableTag) {
        return tag.disabled;
    }
}
