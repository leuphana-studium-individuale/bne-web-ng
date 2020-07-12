import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPanelCostsComponent} from './search-panel-costs.component';

describe('SearchPanelCostsComponent', () => {
    let component: SearchPanelCostsComponent;
    let fixture: ComponentFixture<SearchPanelCostsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPanelCostsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPanelCostsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
