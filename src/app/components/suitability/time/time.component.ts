import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './../../../services/local-store.service';
import { SuitabilityService } from '../../../services/suitability.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  //declare variables & properties
  applicationId: string = '';
  formData: any = {};
  title = 'Time Section';
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

    //get the application data to fill the form on back or page load
    if ( this.useLocalStorage) {
      const data = this.localStorageService.get(this.applicationId)
      if (data && data.time) {
        this.setFormFields(data.time)
      }
    }
    else {
      this.suitabilityService.getAppData(this.applicationId)
        .subscribe((data) => {
          //on api success if form data exist then set the value of form fields
          if (data && data.time) {
            this.setFormFields(data.time)
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
  setFormFields(time: any): void {
    this.formData = {
      ...time
    };
  }

  //generic error function
  onError(error: any): void {
    this.isError = true;
    console.log('error====', error);
  }

  //function called on form submit
  onSubmit(timeForm:any): void {
    //create payload which need to be submit via API
    let payload = {
      time: { ...timeForm.value },
    };

    if (this.useLocalStorage) {
      //store in browser localStorage with application id as key and payload as value
      this.localStorageService.set(this.applicationId, payload);
    }
    //call API service with payload & application id 
    if (this.useLocalStorage) { //Send ALL forms data
      payload = {...this.localStorageService.get(this.applicationId), processId: this.applicationId};
    }
    this.suitabilityService.callTimeApi(this.applicationId, payload)
      .subscribe((r) => {
        //on success redirect to next page
        this.router.navigate(['congrats', this.applicationId]);
      },
      (error) => {
        //on error called error method
        this.onError(error);
      }
    );
  }
}
