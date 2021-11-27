import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RiskComponent } from './components/suitability/risk/risk.component';
import { LiquidityComponent } from './components/suitability/liquidity/liquidity.component';
import { TimeComponent } from './components/suitability/time/time.component';
import { ButtonComponent } from './components/button/button.component';
import { CongratsComponent } from './components/suitability/congrats/congrats.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RiskComponent,
    LiquidityComponent,
    TimeComponent,
    ButtonComponent,
    CongratsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
