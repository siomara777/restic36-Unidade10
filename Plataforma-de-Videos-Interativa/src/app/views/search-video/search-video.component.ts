import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';

import { VideoCardComponent } from "../../components/video-card/video-card.component";
import { Video } from '../../types/models';

@Component({
  selector: 'app-search-video',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './search-video.component.html',
  styleUrl: './search-video.component.css'
})
export class SearchVideoComponent {
  videos: Video[] = [];
  query!: string;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.searchVideos();
    });
  }

  searchVideos() {
    this.videoService.searchVideos(this.query).subscribe(videos => {
      this.videos = videos;
    });
  }
}
