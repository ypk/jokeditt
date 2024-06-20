interface RedditVideo {
    bitrate_kbps: number;
    fallback_url: string;
    has_audio: boolean;
    height: number;
    width: number;
    scrubber_media_url: string;
    dash_url: string;
    duration: number;
    hls_url: string;
    is_gif: boolean;
    transcoding_status: string;
}

export interface Media {
    reddit_video?: RedditVideo;
}