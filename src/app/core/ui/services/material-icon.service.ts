import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

/**
 * Represents icon topic subdirectory
 */
enum IconTopic {
    ACTION = 'action',
    ALERT = 'alert',
    AV = 'av',
    CONTENT = 'content',
    COMMUNICATION = 'communication',
    DEVICE = 'device',
    EDITOR = 'editor',
    FILE = 'file',
    HARDWARE = 'hardware',
    IMAGE = 'image',
    MAPS = 'maps',
    NAVIGATION = 'navigation',
    SOCIAL = 'social'
}

/**
 * Represents a material design icon
 */
class Icon {
    /** Topic */
    topic: IconTopic;
    /** Name */
    name: string;
    /** File */
    file: string;

    /**
     * Constructor
     * @param topic topic
     * @param name icon name
     * @param file icon file name
     */
    constructor(topic: IconTopic, name: string, file: string) {
        this.topic = topic;
        this.name = name;
        this.file = file;
    }
}

/**
 * Handles Material icons
 */
@Injectable({
    providedIn: 'root'
})
export class MaterialIconService {

    /** Root directory of material design icons */
    private ICON_ROOT_DIR = 'assets/material-design-icons';
    /** Icon variant */
    private VARIANT = 'production';
    /** List of icons */
    private icons: Icon[] = [
        // {topic: IconTopic.ACTION, name: 'search', file: 'ic_search_24px.svg'},
        // {topic: IconTopic.CONTENT, name: 'filter_list', file: 'ic_filter_list_24px.svg'},
        // {topic: IconTopic.IMAGE, name: 'flash_on', file: 'ic_flash_on_24px.svg'},
        // {topic: IconTopic.IMAGE, name: 'nature', file: 'ic_nature_24px.svg'},
        // {topic: IconTopic.IMAGE, name: 'nature_people', file: 'ic_nature_people_24px.svg'},
        // {topic: IconTopic.MAPS, name: 'local_dining', file: 'ic_local_dining_24px.svg'}
    ];

    /**
     * Initializes icons
     *
     * @param iconRegistry icon registry
     * @param sanitizer sanitizer
     */
    public initializeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        this.icons.forEach(icon => {
            iconRegistry.addSvgIcon(icon.name,
                sanitizer.bypassSecurityTrustResourceUrl(this.ICON_ROOT_DIR + '/' + icon.topic + '/svg/' + this.VARIANT + '/' + icon.file));
        });
        iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_search_24px.svg'));
        iconRegistry.addSvgIcon('filter_list', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_filter_list_24px.svg'));
        iconRegistry.addSvgIcon('flash_on', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_flash_on_24px.svg'));
        iconRegistry.addSvgIcon('nature', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_nature_24px.svg'));
        iconRegistry.addSvgIcon('nature_people', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_nature_people_24px.svg'));
        iconRegistry.addSvgIcon('local_dining', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_local_dining_24px.svg'));

        iconRegistry.addSvgIcon('gender-male-female', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_gender_male_female_24px.svg'));
        iconRegistry.addSvgIcon('heart-pulse', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_heart_pulse_24px.svg'));
        iconRegistry.addSvgIcon('school', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_school_24px.svg'));
        iconRegistry.addSvgIcon('cup-water', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_cup_water_24px.svg'));
        iconRegistry.addSvgIcon('infinity', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_infinity_24px.svg'));
        iconRegistry.addSvgIcon('weather-sunny', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_weather_sunny_24px.svg'));
        iconRegistry.addSvgIcon('finance', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_finance_24px.svg'));
        iconRegistry.addSvgIcon('factory', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_factory_24px.svg'));
        iconRegistry.addSvgIcon('equal', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_equal_24px.svg'));
        iconRegistry.addSvgIcon('city-variant-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_city_variant_outline_24px.svg'));
        iconRegistry.addSvgIcon('earth', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_earth_24px.svg'));
        iconRegistry.addSvgIcon('waves', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_waves_24px.svg'));
        iconRegistry.addSvgIcon('peace', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_peace_24px.svg'));
        iconRegistry.addSvgIcon('handshake-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/material-icons/ic_handshake_outline_24px.svg'));
    }
}
