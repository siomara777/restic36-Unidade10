import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  queryControl = new FormControl('');

  constructor(private router: Router) {}

  searchVideo(event: Event) {
    event.preventDefault();
    if (this.queryControl.value) {
      this.router.navigate(['/search-video'], { queryParams: { q: this.queryControl.value } });
      this.queryControl.reset();
    }
  }

}
