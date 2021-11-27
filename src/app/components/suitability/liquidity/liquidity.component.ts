import { SuitabilityService } from '../../../services/suitability.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.scss']
})
export class LiquidityComponent implements OnInit {
  applicationId = '';
  constructor(
    private suitabilityService: SuitabilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.applicationId = this.activatedRoute.snapshot.params.id;
  }

  title = 'Liquidity Section';
  isError = false;
  errorMessage = 'Something went wrong, please again try later!';

  liquidityForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    liquidityAmount: new FormControl('', Validators.required),
  });

  get getFormData() {
    return this.liquidityForm.controls;
  }

  ngOnInit(): void {
    this.suitabilityService.getAppData(this.applicationId).subscribe(
      (r) => {
        if(r.liquidity) {
          this.liquidityForm.setValue({
            firstName: r.liquidity && r.liquidity.firstName,
            lastName: r.liquidity && r.liquidity.lastName,
            liquidityAmount: r.liquidity && r.liquidity.liquidityAmount,
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
    if (this.liquidityForm.status === 'INVALID') {
      alert('please fill up the required fields');
      return;
    }
    const payload = {
      liquidity: {
        firstName: this.liquidityForm.value.firstName,
        lastName: this.liquidityForm.value.lastName,
        liquidityAmount: this.liquidityForm.value.liquidityAmount,
      },
      applicationId: this.applicationId,
    };
    
    this.suitabilityService.callLiquidityApi(payload).subscribe(
      (r) => {
        this.router.navigate(['risk', this.applicationId])
      },
      (error) => {
        this.isError = true;
        console.log('error===', error);
      }
    );
  }
}
