import { SuitabilityService } from '../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  applicationId = '';
  isError = false;
  name = '';

  constructor(
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.suitabilityService.getAppData(this.applicationId).subscribe(
      (r) => {
        if(r) {
          this.name = `${r.liquidity.firstName} ${r.liquidity.lastName}`;
        }
      },
      (error) => {
        this.isError = true;
        console.log('error===', error);
      }
    );
  }


}
