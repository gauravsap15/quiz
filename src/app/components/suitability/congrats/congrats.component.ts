import { SuitabilityService } from '../../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  applicationId = '';
  name = '';

  constructor(
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    //call the get application data service to get the user name on page load
    this.suitabilityService.getAppData(this.applicationId)
    .subscribe((r) => {
        //on api success read the data for user name
        if(r) {
          this.name = `${r.liquidity.firstName} ${r.liquidity.lastName}`;
        }
      },
      (error) => {
        //if api failed ignore the error and not show the user name
        console.log('error====', error);
      }
    );
  }

}
