import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-search-panel-slider',
    templateUrl: './search-panel-slider.component.html',
    styleUrls: ['./search-panel-slider.component.scss']
})
export class SearchPanelSliderComponent implements OnChanges {

    @Input() value = 0;
    @Input() minValue = 0;
    @Input() maxValue = 0;
    @Input() color = 'primary';
    @Output() valueChangedEmitter = new EventEmitter<number>();

    ngOnChanges(changes: SimpleChanges): void {
        this.color = 'primary';
    }

    onValueChanged(event: number) {
        this.value = event;
        this.valueChangedEmitter.emit(event);
    }
}
