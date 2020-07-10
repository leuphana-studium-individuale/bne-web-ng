import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchPanelChipsComponent} from './search-panel-chips.component';

describe('SearchPanelChipsComponent', () => {
    let component: SearchPanelChipsComponent;
    let fixture: ComponentFixture<SearchPanelChipsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPanelChipsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPanelChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
