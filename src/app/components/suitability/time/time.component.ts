import { SuitabilityService } from '../../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  applicationId = '';
  constructor(
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  title = 'Time Section';
  isError = false;
  errorMessage = 'Something went wrong, please again try later!';

  timeForm = new FormGroup({
    hasSaving: new FormControl('', Validators.required),
  });

  get getFormData() {
    return this.timeForm.controls;
  }

  ngOnInit(): void {
    this.suitabilityService.getAppData(this.applicationId).subscribe(
      (r) => {
        if(r.time) {
          this.timeForm.setValue({
            hasSaving: r.time && r.time.hasSaving,
          });
        }
      },
      (error) => {
        this.isError = true;
        console.log('error===', error);
      }
    );
  }

  onSubmit(): void {
    if (this.timeForm.status === 'INVALID') {
      alert('please fill up the required fields');
      return;
    }
    const payload = {
      time: {
        hasSaving: this.timeForm.value.hasSaving,
      },
      applicationId: this.applicationId,
    };
    this.suitabilityService.callTimeApi(payload).subscribe(
      (r) => {
        this.router.navigate(['congrats', this.applicationId]);
      },
      (error) => {
        this.isError = true;
        console.log('error===', error);
      }
    );
  }
}

