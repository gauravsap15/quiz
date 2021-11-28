import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './../../../services/local-store.service';
import { SuitabilityService } from '../../../services/suitability.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  applicationId = '';
  name = '';

  //set useLocalStorage as true to use browser's local session 
  //set useLocalStorage as false to local API server 
  useLocalStorage = true;

  constructor(
    private suitabilityService: SuitabilityService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    //get the application data to get the user name on page load
    if ( this.useLocalStorage) {
      const data = this.localStorageService.get(this.applicationId);
      if (data.liquidity) {
        this.name = `${data.liquidity.firstName} ${data.liquidity.lastName}`;
      }
    }
    else {
      //call the get application data service to get the user name on page load
      this.suitabilityService.getAppData(this.applicationId)
      .subscribe((data) => {
        //on api success read the data for user name
        if (data.liquidity) {
          this.name = `${data.liquidity.firstName} ${data.liquidity.lastName}`;
        }
      },
      (error) => {
        //if api failed ignore the error and not show the user name
        console.log('error====', error);
      }
      );
    }
  }
}
