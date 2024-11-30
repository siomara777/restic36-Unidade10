import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../services/video/video.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

import { Video, VideoInteraction } from '../../types/models';

import { VideoCardComponent } from "../../components/video-card/video-card.component";
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-watch-video',
  standalone: true,
  imports: [VideoCardComponent, DatePipe],
  templateUrl: './watch-video.component.html',
  styleUrl: './watch-video.component.css'
})
export class WatchVideoComponent {
  currentVideo!: Video;
  videos: Video[] = [];
  likes: number = 0;
  safeVideoUrl!: SafeResourceUrl;
  isLiked!: boolean;
  isFavorited!: boolean;
  isWatchLater!: boolean;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const videoId = params['id'];
      this.loadVideo(videoId);
    });
  }

  loadVideo(videoId: number) {
    this.videoService.getVideoById(videoId).subscribe(video => {
      this.currentVideo = video
      const url = this.currentVideo.url.replace('watch?v=', 'embed/');
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      this.videoService.incrementViews(videoId, this.currentVideo.views).subscribe(() => {
        this.loadMoreVideos();
        this.currentVideo.views++;
      });

      this.videoService.getInteractionsByVideoId(videoId, 'likes').subscribe(likes => this.likes = likes.length);

      this.authService.getUser().subscribe(user => {
        const userId = user?.sub;

        this.videoService.getInteractionsByVideoId(videoId, 'likes').subscribe(interactions => {
          this.isLiked = interactions.some(interaction => interaction.userId === userId);
        });

        this.videoService.getInteractionsByVideoId(videoId, 'favorites').subscribe(interactions => {
          this.isFavorited = interactions.some(interaction => interaction.userId === userId);
        });

        this.videoService.getInteractionsByVideoId(videoId, 'watchLater').subscribe(interactions => {
          this.isWatchLater = interactions.some(interaction => interaction.userId === userId);
        });
      });
    });
  }

  loadMoreVideos() {
    return this.videoService.getVideos().subscribe(videos => {
      this.videos = this.shuffleVideos(videos).slice(0, 10);
    });
  }

  shuffleVideos(videos: Video[]) {
    for (let i = videos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [videos[i], videos[j]] = [videos[j], videos[i]];
    }
    return videos
  }

  toggleInteraction(interactionType: 'likes' | 'favorites' | 'watchLater') {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.videoService.getInteractionsByVideoId(this.currentVideo.id, interactionType).subscribe(interactions => {
          const isInteracted: VideoInteraction | undefined = interactions.find(interaction => interaction.userId === user.sub);

          if (!isInteracted) {
            if (user.sub) {
              this.userService.addInteraction(this.currentVideo.id, user.sub, interactionType).subscribe(() => {
                if (interactionType === 'likes') {
                  this.isLiked = true;
                  this.likes++;
                } else if (interactionType === 'favorites') {
                  this.isFavorited = true;
                } else if (interactionType === 'watchLater') {
                  this.isWatchLater = true;
                }
              });
            }
          } else {
            this.userService.removeInteraction(isInteracted.id, interactionType).subscribe(() => {
              if (interactionType === 'likes') {
                this.isLiked = false;
                this.likes--;
              } else if (interactionType === 'favorites') {
                this.isFavorited = false;
              } else if (interactionType === 'watchLater') {
                this.isWatchLater = false;
              }
            });
          }
        });
      }
    })
  }
}
