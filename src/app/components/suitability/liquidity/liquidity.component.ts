import { SuitabilityService } from '../../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
})
export class LiquidityComponent implements OnInit {
  //declare variables & properties
  applicationId: string = '';
  liquidityForm!: FormGroup;
  title = 'Liquidity Section';
  isError = false;
  errorMessage = 'Something went wrong, please again try later!';

  constructor(
    //dependency injection
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //get application id on the page load
    this.applicationId = this.activatedRoute.snapshot.params.id;

    //initialize the form with initial value and required validations
    this.liquidityForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      liquidityAmount: ['', Validators.required],
    });

    //call the get application data service to fill the form on back or page load
    this.suitabilityService.getAppData(this.applicationId)
      .subscribe((r) => {
        //on api success if form data exist then set the value of form fields
        if (r.liquidity) {
          this.liquidityForm.setValue({
            firstName: r.liquidity.firstName,
            lastName: r.liquidity.lastName,
            liquidityAmount: r.liquidity.liquidityAmount,
          });
        }
      },
      (error) => {
        //if api failed called generic error method
        this.onError(error)
      }
    );
  }

  //generic error function
  onError(error: any): void {
    this.isError = true;
    console.log('error====', error);
  }

  //function called on form submit
  onSubmit(): void {
    //create payload which need to be submit via API 
    const payload = {
      liquidity: { ...this.liquidityForm.value },
    };

    //called API service with payload & application id 
    this.suitabilityService.callLiquidityApi(payload, this.applicationId)
      .subscribe((r) => {
        //on success redirect to next page
        this.router.navigate(['risk', this.applicationId]);
      },
      (error) => {
        //on error called error method
        this.onError(error)
      }
    );
  }
}
