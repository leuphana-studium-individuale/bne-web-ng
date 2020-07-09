import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Partner} from '../model/partner.model';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {

    constructor() {
    }

    /** Subject that publishes partners */
    partnersSubject = new Subject<Map<string, Partner>>();

    /** Map of partners */
    private partners: Map<string, Partner>;

    public fetchPartners(forceReload = false) {
        if (this.partners != null && !forceReload) {
            this.partnersSubject.next(this.partners);
        } else {
            this.findPartners();
        }
    }

    private findPartners() {
        const partnersMap = new Map<string, Partner>();
        partnersMap.set('1', new Partner(
            'GemüseAckerdemie',
            'Wir ackern für Bildung und Ernährung. Mit unseren Projekten für Kinder und Jugendliche stärken wir die Wertschätzung von Lebensmitteln.',
            '+49 123 444 555',
            'info@ackerdemia.de'
        ));

        this.notifyPartners(partnersMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param partnersMap partners map
     */
    public notifyPartners(partnersMap: Map<string, Partner>) {
        this.partnersSubject.next(partnersMap);
    }
}
