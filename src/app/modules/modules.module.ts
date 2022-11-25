import {
    NgModule,
} from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DEPARTMENT_COMPONENTS } from './department';

@NgModule({
    declarations: [        
        ...DEPARTMENT_COMPONENTS,
    ],
    imports: [ModulesRoutingModule],
})

export class ModulesModule { }