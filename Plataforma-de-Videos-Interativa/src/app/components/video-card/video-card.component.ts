import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
  @Input() id!: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() title: string = 'Título do vídeo';
  @Input() description: string = 'Descrição do vídeo';
  @Input() url!: string;
  @Input() thumbnail!: string;
  @Input() views: number = 0;
  @Input() uploadedAt!: string;

  constructor(private router: Router) {}
}
