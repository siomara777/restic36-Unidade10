import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = 'Botão';
  @Input() type: string = 'button';
  @Input() theme: 'default' | 'primary' = 'primary';
  @Input() disabled: boolean = false;
}
