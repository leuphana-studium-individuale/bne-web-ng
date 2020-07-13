import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-search-panel-costs',
    templateUrl: './search-panel-costs.component.html',
    styleUrls: ['./search-panel-costs.component.scss']
})
export class SearchPanelCostsComponent implements OnChanges {

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
