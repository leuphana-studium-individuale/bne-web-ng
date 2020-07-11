import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPanelSliderComponent} from './search-panel-slider.component';

describe('SearchPanelSliderComponent', () => {
    let component: SearchPanelSliderComponent;
    let fixture: ComponentFixture<SearchPanelSliderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPanelSliderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPanelSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
