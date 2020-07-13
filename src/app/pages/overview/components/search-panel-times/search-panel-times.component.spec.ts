import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPanelTimesComponent} from './search-panel-times.component';

describe('SearchPanelTimesComponent', () => {
    let component: SearchPanelTimesComponent;
    let fixture: ComponentFixture<SearchPanelTimesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPanelTimesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPanelTimesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
