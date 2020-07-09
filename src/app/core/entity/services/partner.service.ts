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
    partnerSubject = new Subject<Map<string, Partner>>();
}
