import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/ui/services/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /** Default app theme */
  themeClass = 'light-theme';

  constructor(private overlayContainer: OverlayContainer,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.initializeTheme();
    this.initializeThemeSubscription();
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
