import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/ui/services/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MaterialIconService} from './core/ui/services/material-icon.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

/**
 * App component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    /** Default app theme */
    themeClass = 'light-theme';

    /**
     * Constructor
     * @param iconRegistry icon registry
     * @param materialIconService material icon service
     * @param overlayContainer overlay container
     * @param sanitizer sanitizer
     * @param themeService theme service
     */
    constructor(private iconRegistry: MatIconRegistry,
                private materialIconService: MaterialIconService,
                private overlayContainer: OverlayContainer,
                private sanitizer: DomSanitizer,
                private themeService: ThemeService) {
    }

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-init lifecycle phase
     */
    ngOnInit() {
        this.initializeTheme();
        this.initializeThemeSubscription();

        this.materialIconService.initializeIcons(this.iconRegistry, this.sanitizer);
    }

    //
    // Initialization
    //

    /**
     * Initializes theme
     */
    private initializeTheme() {
        this.themeClass = this.themeService.theme;
        this.overlayContainer.getContainerElement().classList.add(this.themeService.theme);
    }

    /**
     * Initializes theme subscription
     */
    private initializeThemeSubscription() {
        this.themeService.themeSubject.subscribe(value => {

            this.themeClass = value;

            // Theme menus and dialogs
            const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
            const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
            if (themeClassesToRemove.length) {
                overlayContainerClasses.remove(...themeClassesToRemove);
            }
            overlayContainerClasses.add(value);
        });
    }
}
