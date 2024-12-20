export type TrackListResponce = {
    status: number
    trackList: TrackList
}
export type UrlResponce = {
    status: number
    url: StreamUrls
}

export type TrackList = {
    duration: number
    genre: string
    release_day: number | null
    permalink: string
    permalink_url: string
    release_month: number | null
    release_year: number | null
    description: string
    uri: string
    label_name: string
    label_id: number | null
    label: string | null
    tag_list: string
    track_count: number
    user_id: number
    last_modified: string
    license: string
    user: User
    playlist_type: string
    type: string
    id: number
    downloadable: boolean | null
    likes_count: number
    sharing: string
    created_at: string
    release: string | null
    tags: string
    kind: string
    title: string
    purchase_title: string
    ean: string
    streamable: boolean
    embeddable_by: string
    artwork_url: string
    purchase_url: string
    tracks_uri: string
    tracks: Track[]
}
export type Track = {
    kind: string
    id: number
    created_at: string
    duration: number
    commentable: boolean
    comment_count: number
    sharing: string
    tag_list: string
    streamable: boolean
    embeddable_by: string
    purchase_url: string
    purchase_title: string
    genre: string
    title: string
    description: string
    label_name: string
    release: string
    key_signature: string
    isrc: string
    bpm: number
    release_year: string
    release_month: string
    release_day: string
    license: string
    uri: string
    user: User
    permalink_url: string
    artwork_url: string
    stream_url: string
    download_url: string
    waveform_url: string
    available_country_codes: string
    secret_uri: string
    user_favorite: string
    user_playback_count: string
    playback_count: number
    download_count: number
    favoritings_count: number
    reposts_count: number
    downloadable: boolean
    access: string
    policy: string
    monetization_model: string
}
export type User = {
    avatar_url: string
    id: number
    kind: string
    permalink_url: string
    uri: string
    username: string
    permalink: string
    created_at: string
    last_modified: string
    first_name: string
    last_name: string
    full_name: string
    city: string
    description: string
    country: string
    track_count: number
    public_favorites_count: number
    reposts_count: number
    followers_count: number
    followings_count: number
    plan: string
    myspace_name: string
    discogs_name: string
    website_title: string
    website: string
    comments_count: number
    online: boolean
    likes_count: number
    playlist_count: number
}
export type StreamUrls = {
    http_mp3_128_url: string
    hls_mp3_128_url: string
    hls_opus_64_url: string
    preview_mp3_128_url: string
}
export type AuthToken = {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
}
