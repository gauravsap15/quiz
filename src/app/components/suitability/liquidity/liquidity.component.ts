import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './../../../services/local-store.service';
import { SuitabilityService } from '../../../services/suitability.service';

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

  //set useLocalStorage as true to use browser's local session 
  //set useLocalStorage as false to local API server 
  useLocalStorage = true;

  constructor(
    //dependency injection
    private suitabilityService: SuitabilityService,
    private localStorageService: LocalStorageService,
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

    //get the application data to fill the form on back or page load
    if ( this.useLocalStorage) {
      const data = this.localStorageService.get(this.applicationId);
      if (data && data.liquidity) {
        this.setFormFields(data.liquidity)
      }
    }
    else {
      this.suitabilityService.getAppData(this.applicationId)
        .subscribe((data) => {
          //on api success if form data exist then set the value of form fields
          if (data && data.liquidity) {
            this.setFormFields(data.liquidity)
          }
        },
        (error) => {
          //if api failed called generic error method
          this.onError(error)
        }
      );
    }
  }

  //set the value of form fields
  setFormFields(liquidity: any): void {
    this.liquidityForm.setValue({
      firstName: liquidity.firstName,
      lastName: liquidity.lastName,
      liquidityAmount: liquidity.liquidityAmount,
    });
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

    if (this.useLocalStorage) {
      //store in browser localStorage with application id as key and payload as value
      this.localStorageService.set(this.applicationId, payload);
      //redirect to next page
      this.router.navigate(['risk', this.applicationId]);
    }
    else {
      //call API service with payload & application id 
      this.suitabilityService.callLiquidityApi(this.applicationId, payload)
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
}
