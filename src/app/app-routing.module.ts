import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeComponent } from './components/suitability/time/time.component';
import { RiskComponent } from './components/suitability/risk/risk.component';
import { LiquidityComponent } from './components/suitability/liquidity/liquidity.component';
import { CongratsComponent } from './components/congrats/congrats.component';

const routes: Routes = [
  { path: '', redirectTo: '/liquidity/1234', pathMatch: 'full'},
  { path: 'time/:id', component: TimeComponent },
  { path: 'risk/:id', component: RiskComponent },
  { path: 'liquidity/:id', component: LiquidityComponent },
  { path: 'congrats/:id', component: CongratsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
