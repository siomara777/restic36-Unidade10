import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video, VideoInteraction } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get<Video[]>(`${this.apiUrl}/videos`);
  }

  getVideoById(videoId: number) {
    return this.http.get<Video>(`${this.apiUrl}/videos/${videoId}`);
  }

  getInteractionsByVideoId(videoId: number, interactionType: 'likes' | 'favorites' | 'watchLater') {
    return this.http.get<VideoInteraction[]>(`${this.apiUrl}/${interactionType}?videoId=${videoId}`);
  }

  incrementViews(videoId: number, currentViews: number) {
    return this.http.patch(`${this.apiUrl}/videos/${videoId}`, { views: currentViews + 1 });
  }

  searchVideos(query: string) {
    return this.http.get<Video[]>(`${this.apiUrl}/videos?q=${query}`);
  }
}
