import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Partner} from '../model/partner.model';
import {PARTNER_DATA} from '../model/partner.mock';

/**
 * Handles partners
 */
@Injectable({
    providedIn: 'root'
})
export class PartnerService {

    /** Subject that publishes partners */
    partnersSubject = new Subject<Map<number, Partner>>();

    /** Map of partners */
    private partners: Map<number, Partner>;

    /**
     * Fetches partners from storage
     * @param forceReload force reload
     */
    public fetchPartners(forceReload = false) {
        if (this.partners != null && !forceReload) {
            this.partnersSubject.next(this.partners);
        } else {
            this.findPartners();
        }
    }

    /**
     * Loads mock partners
     */
    private findPartners() {
        const partnersMap = new Map<number, Partner>();

        PARTNER_DATA.forEach(p => {
            partnersMap.set(p.id, p);
        });

        this.notifyPartners(partnersMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param partnersMap partners map
     */
    public notifyPartners(partnersMap: Map<number, Partner>) {
        this.partnersSubject.next(partnersMap);
    }
}
