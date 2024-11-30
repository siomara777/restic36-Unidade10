export interface User {
  id: string;
  name: string;
  email: string;
  socialLinkProvider: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  uploadedAt: string;
}

export interface VideoInteraction {
  id: string;
  userId: string;
  videoId: number;
  video?: Video;
}
