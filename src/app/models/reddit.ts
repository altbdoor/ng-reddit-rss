// https://jvilk.com/MakeTypes/

export interface RedditApiData {
    kind: string
    data: Data
}
interface Data {
    modhash: string
    dist: number
    children?: (ChildrenEntity)[] | null
    after: string
    before?: null
}
interface ChildrenEntity {
    kind: string
    data: Data1
}
interface Data1 {
    approved_at_utc?: null
    subreddit: string
    selftext: string
    author_fullname: string
    saved: boolean
    mod_reason_title?: null
    gilded: number
    clicked: boolean
    title: string
    link_flair_richtext?: (null)[] | null
    subreddit_name_prefixed: string
    hidden: boolean
    pwls?: number | null
    link_flair_css_class?: string | null
    downs: number
    thumbnail_height: number
    hide_score: boolean
    name: string
    quarantine: boolean
    link_flair_text_color: string
    author_flair_background_color?: string | null
    subreddit_type: string
    ups: number
    total_awards_received: number
    media_embed: MediaEmbed
    thumbnail_width: number
    author_flair_template_id?: null
    is_original_content: boolean
    user_reports?: (null)[] | null
    secure_media?: SecureMediaOrMedia | null
    is_reddit_media_domain: boolean
    is_meta: boolean
    category?: null
    secure_media_embed: SecureMediaEmbed
    link_flair_text?: string | null
    can_mod_post: boolean
    score: number
    approved_by?: null
    thumbnail: string
    edited: boolean
    author_flair_css_class?: null
    author_flair_richtext?: (null)[] | null
    gildings: GildingsOrMediaEmbedOrSecureMediaEmbed
    post_hint: string
    content_categories?: null
    is_self: boolean
    mod_note?: null
    created: number
    link_flair_type: string
    wls?: number | null
    banned_by?: null
    author_flair_type: string
    domain: string
    allow_live_comments: boolean
    selftext_html?: null
    likes?: null
    suggested_sort?: string | null
    banned_at_utc?: null
    view_count?: null
    archived: boolean
    no_follow: boolean
    is_crosspostable: boolean
    pinned: boolean
    over_18: boolean
    preview: Preview
    all_awardings?: (null)[] | null
    media_only: boolean
    can_gild: boolean
    spoiler: boolean
    locked: boolean
    author_flair_text?: string | null
    visited: boolean
    num_reports?: null
    distinguished?: null
    subreddit_id: string
    mod_reason_by?: null
    removal_reason?: null
    link_flair_background_color: string
    id: string
    is_robot_indexable: boolean
    report_reasons?: null
    author: string
    num_crossposts: number
    num_comments: number
    send_replies: boolean
    whitelist_status?: string | null
    contest_mode: boolean
    mod_reports?: (null)[] | null
    author_patreon_flair: boolean
    author_flair_text_color?: string | null
    permalink: string
    parent_whitelist_status?: string | null
    stickied: boolean
    url: string
    subreddit_subscribers: number
    created_utc: number
    discussion_type?: null
    media?: SecureMediaOrMedia1 | null
    is_video: boolean
    crosspost_parent_list?: (CrosspostParentListEntity)[] | null
    crosspost_parent?: string | null
    link_flair_template_id?: string | null
}
interface MediaEmbed {
    content?: string | null
    width?: number | null
    scrolling?: boolean | null
    height?: number | null
}
interface SecureMediaOrMedia {
    type: string
    oembed: Oembed
}
interface Oembed {
    provider_url: string
    description: string
    title: string
    type: string
    thumbnail_width: number
    height: number
    width: number
    html: string
    version: string
    provider_name: string
    thumbnail_url: string
    thumbnail_height: number
}
interface SecureMediaEmbed {
    content?: string | null
    width?: number | null
    scrolling?: boolean | null
    media_domain_url?: string | null
    height?: number | null
}
interface GildingsOrMediaEmbedOrSecureMediaEmbed {}
interface Preview {
    images?: (ImagesEntity)[] | null
    reddit_video_preview?: RedditVideoPreview | null
    enabled: boolean
}
interface ImagesEntity {
    source: ResolutionsEntityOrSource
    resolutions?: (ResolutionsEntityOrSource)[] | null
    variants: Variants
    id: string
}
interface ResolutionsEntityOrSource {
    url: string
    width: number
    height: number
}
interface Variants {
    obfuscated: ObfuscatedOrGifOrMp4OrNsfw
    gif?: ObfuscatedOrGifOrMp4OrNsfw1 | null
    mp4?: ObfuscatedOrGifOrMp4OrNsfw2 | null
    nsfw: ObfuscatedOrGifOrMp4OrNsfw
}
interface ObfuscatedOrGifOrMp4OrNsfw {
    source: ResolutionsEntityOrSource
    resolutions?: (ResolutionsEntityOrSource)[] | null
}
interface ObfuscatedOrGifOrMp4OrNsfw1 {
    source: ResolutionsEntityOrSource
    resolutions?: (ResolutionsEntityOrSource)[] | null
}
interface ObfuscatedOrGifOrMp4OrNsfw2 {
    source: ResolutionsEntityOrSource
    resolutions?: (ResolutionsEntityOrSource)[] | null
}
interface RedditVideoPreview {
    fallback_url: string
    height: number
    width: number
    scrubber_media_url: string
    dash_url: string
    duration: number
    hls_url: string
    is_gif: boolean
    transcoding_status: string
}
interface SecureMediaOrMedia1 {
    type: string
    oembed: Oembed
}
interface CrosspostParentListEntity {
    approved_at_utc?: null
    subreddit: string
    selftext: string
    author_fullname: string
    saved: boolean
    mod_reason_title?: null
    gilded: number
    clicked: boolean
    title: string
    link_flair_richtext?: (null)[] | null
    subreddit_name_prefixed: string
    hidden: boolean
    pwls?: number | null
    link_flair_css_class?: null
    downs: number
    thumbnail_height: number
    hide_score: boolean
    name: string
    quarantine: boolean
    link_flair_text_color: string
    author_flair_background_color?: null
    subreddit_type: string
    ups: number
    total_awards_received: number
    media_embed: MediaEmbed1
    thumbnail_width: number
    author_flair_template_id?: null
    is_original_content: boolean
    user_reports?: (null)[] | null
    secure_media: SecureMediaOrMedia2
    is_reddit_media_domain: boolean
    is_meta: boolean
    category?: null
    secure_media_embed: SecureMediaEmbed1
    link_flair_text?: null
    can_mod_post: boolean
    score: number
    approved_by?: null
    thumbnail: string
    edited: boolean
    author_flair_css_class?: null
    author_flair_richtext?: (null)[] | null
    gildings: GildingsOrMediaEmbedOrSecureMediaEmbed
    post_hint: string
    content_categories?: null
    is_self: boolean
    mod_note?: null
    created: number
    link_flair_type: string
    wls?: number | null
    banned_by?: null
    author_flair_type: string
    domain: string
    allow_live_comments: boolean
    selftext_html?: null
    likes?: null
    suggested_sort?: null
    banned_at_utc?: null
    view_count?: null
    archived: boolean
    no_follow: boolean
    is_crosspostable: boolean
    pinned: boolean
    over_18: boolean
    preview: Preview1
    all_awardings?: (null)[] | null
    media_only: boolean
    can_gild: boolean
    spoiler: boolean
    locked: boolean
    author_flair_text?: null
    visited: boolean
    num_reports?: null
    distinguished?: null
    subreddit_id: string
    mod_reason_by?: null
    removal_reason?: null
    link_flair_background_color: string
    id: string
    is_robot_indexable: boolean
    report_reasons?: null
    author: string
    num_crossposts: number
    num_comments: number
    send_replies: boolean
    whitelist_status?: string | null
    contest_mode: boolean
    mod_reports?: (null)[] | null
    author_patreon_flair: boolean
    author_flair_text_color?: null
    permalink: string
    parent_whitelist_status?: string | null
    stickied: boolean
    url: string
    subreddit_subscribers: number
    created_utc: number
    discussion_type?: null
    media: SecureMediaOrMedia2
    is_video: boolean
}
interface MediaEmbed1 {
    content: string
    width: number
    scrolling: boolean
    height: number
}
interface SecureMediaOrMedia2 {
    type: string
    oembed: Oembed
}
interface SecureMediaEmbed1 {
    content: string
    width: number
    scrolling: boolean
    media_domain_url: string
    height: number
}
interface Preview1 {
    images?: (ImagesEntity1)[] | null
    reddit_video_preview: RedditVideoPreview1
    enabled: boolean
}
interface ImagesEntity1 {
    source: ResolutionsEntityOrSource
    resolutions?: (ResolutionsEntityOrSource)[] | null
    variants: Variants1
    id: string
}
interface Variants1 {
    obfuscated: ObfuscatedOrGifOrMp4OrNsfw
    gif: ObfuscatedOrGifOrMp4OrNsfw
    mp4: ObfuscatedOrGifOrMp4OrNsfw
    nsfw: ObfuscatedOrGifOrMp4OrNsfw
}
interface RedditVideoPreview1 {
    fallback_url: string
    height: number
    width: number
    scrubber_media_url: string
    dash_url: string
    duration: number
    hls_url: string
    is_gif: boolean
    transcoding_status: string
}
