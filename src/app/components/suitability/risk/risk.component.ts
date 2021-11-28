import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './../../../services/local-store.service';
import { SuitabilityService } from '../../../services/suitability.service';
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss'],
})
export class RiskComponent implements OnInit {
  //declare variables & properties
  applicationId: string = '';
  riskForm!: FormGroup;
  title = 'Risk Section';
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
    this.riskForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      investmentYears: ['', Validators.required],
    });

    //get the application data to fill the form on back or page load
    if ( this.useLocalStorage) {
      const data = this.localStorageService.get(this.applicationId);
      if (data && data.risk) {
        this.setFormFields(data.risk)
      }
    }
    else {
      this.suitabilityService.getAppData(this.applicationId)
        .subscribe((data) => {
          //on api success if form data exist then set the value of form fields
          if (data && data.risk) {
            this.setFormFields(data)
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
  setFormFields(risk: any): void {
    this.riskForm.setValue({
      email: risk.email,
      investmentYears: risk.investmentYears,
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
      risk: { ...this.riskForm.value },
    };

    if (this.useLocalStorage) {
      //store in browser localStorage with application id as key and payload as value
      this.localStorageService.set(this.applicationId, payload);
      //redirect to next page
      this.router.navigate(['time', this.applicationId]);
    }
    else {
      //call API service with payload & application id 
      this.suitabilityService.callRiskApi(this.applicationId, payload)
        .subscribe((r) => {
          //on success redirect to next page
          this.router.navigate(['time', this.applicationId]);
        },
        (error) => {
          //on error called error method
          this.onError(error)
        }
      );
    }
  }
}
