import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerResolver } from './customer.resolver';

// RESOLVER NÃO UTILIZADO PARA MELHOR FUNCIONAMENTO DA PAGINACAO

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent, 
    resolve: {
      customerResolver: CustomerResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
