import { SuitabilityService } from '../../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss'],
})
export class RiskComponent implements OnInit {
  applicationId = '';
  constructor(
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  title = 'Risk Section';
  isError = false;
  errorMessage = 'Something went wrong, please again try later!';

  riskForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    investmentYears: new FormControl('', [Validators.required]),
  });

  get getFormData() {
    return this.riskForm.controls;
  }

  ngOnInit(): void {
    this.suitabilityService.getAppData(this.applicationId).subscribe(
      (r) => {
        if(r.risk) {
          this.riskForm.setValue({
            email: r.risk && r.risk.email,
            investmentYears: r.risk && r.risk.investmentYears,
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
    if (this.riskForm.status === 'INVALID') {
      alert('please fill up the required fields');
      return;
    }
    const payload = {
      risk: {
        email: this.riskForm.value.email,
        investmentYears: this.riskForm.value.investmentYears,
      },
      applicationId: this.applicationId,
    };
    this.suitabilityService.callRiskApi(payload).subscribe(
      (r) => {
        this.router.navigate(['time', this.applicationId])
      },
      (error) => {
        this.isError = true;
        console.log('error===', error);
      }
    );
    // if(response.status === 'OK') {
    //   alert('success!');
    // }
  }
}
