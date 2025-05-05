import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'nosotros', component: AboutComponent },
{ path: 'servicios', component: ServicesComponent },
{ path: 'contacto', component: ContactComponent },
{
  path: 'blog',
  component: BlogComponent,
  title: 'Blog | Lion Systems'
},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
