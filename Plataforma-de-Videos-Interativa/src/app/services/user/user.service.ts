import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoInteraction, User, Video } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUserById(id: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users?id=${id}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`)
  }

  createUser(user: Partial<User>) {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  addInteraction(videoId: number, userId: string, interactionType: 'likes' | 'favorites' | 'watchLater') {
    return this.http.post<VideoInteraction>(`${this.apiUrl}/${interactionType}`, { videoId, userId });
  }

  removeInteraction(interactionId: string, interactionType: 'likes' | 'favorites' | 'watchLater') {
    return this.http.delete(`${this.apiUrl}/${interactionType}/${interactionId}`);
  }

  getFavorites(userId: string) {
    return this.http.get<VideoInteraction[]>(`${this.apiUrl}/favorites?userId=${userId}&_embed=video`);
  }

  getWatchLater(userId: string) {
    return this.http.get<VideoInteraction[]>(`${this.apiUrl}/watchLater?userId=${userId}&_embed=video`);
  }
}
