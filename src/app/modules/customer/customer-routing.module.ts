import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerResolver } from './customer.resolver';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerViewResolver } from './customer-view/customer-view.resolver';

// RESOLVER NÃO UTILIZADO PARA MELHOR FUNCIONAMENTO DA PAGINACAO

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent, 
    resolve: {
      customerResolver: CustomerResolver
    }
  }, 
  {
    path: ":id",
    component: CustomerViewComponent,
    resolve: {
      customerViewResolver: CustomerViewResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
