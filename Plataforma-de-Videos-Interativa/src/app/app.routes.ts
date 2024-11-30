import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SearchVideoComponent } from './views/search-video/search-video.component';
import { WatchVideoComponent } from './views/watch-video/watch-video.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search-video', component: SearchVideoComponent },
  { path: 'watch-video/:id', component: WatchVideoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
