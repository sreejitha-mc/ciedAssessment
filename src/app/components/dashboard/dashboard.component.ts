import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

/* @figmaId 1:2 */
@Component({
    selector: 'cl-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

    basicData: any;
    userData: any;
    probabilityData: any;
    activeListData: any;
    leadData: any;
    constructor(
        private _dashboard: DashboardService,
    ) { }
    ngOnInit(): void {
        this.getBasicData();
    }

    getBasicData() {
        this._dashboard.getDashboardGraph().subscribe(res => {
            this.basicData = res;
        });
        this._dashboard.getUserData().subscribe(res => {
            this.userData = res;
        });
        this._dashboard.getProbabilty().subscribe(res => {
            this.probabilityData = res;
        });
        this._dashboard.getActiveLead().subscribe(res => {
            this.activeListData = res;
        });
        this._dashboard.getLeadList().subscribe(res => {
            this.leadData = res;
        });
        
    }

}
