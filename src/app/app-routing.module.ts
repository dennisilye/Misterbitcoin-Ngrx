import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BitcoinAppComponent } from './pages/bitcoin-app/bitcoin-app.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthServiceService } from './services/auth-service.service';
const routes: Routes = [
  { path: 'contact/:id', component: ContactDetailsComponent },
  {
    path: 'contacts',
    component: BitcoinAppComponent,
    canActivate: [AuthServiceService],
  },
  { path: 'contacts/edit/:id', component: ContactEditComponent },
  { path: 'contacts/edit', component: ContactEditComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
