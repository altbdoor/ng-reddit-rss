// https://jvilk.com/MakeTypes/

export interface GfycatData {
    gfyItem: GfyItem
}
interface GfyItem {
    tags?: (null)[] | null
    languageCategories?: (null)[] | null
    domainWhitelist?: (null)[] | null
    geoWhitelist?: (null)[] | null
    published: number
    nsfw: string
    gatekeeper: number
    mp4Url: string
    gifUrl: string
    webmUrl: string
    webpUrl: string
    mobileUrl: string
    mobilePosterUrl: string
    extraLemmas: string
    thumb100PosterUrl: string
    miniUrl: string
    gif100px: string
    miniPosterUrl: string
    max5mbGif: string
    title: string
    max2mbGif: string
    max1mbGif: string
    posterUrl: string
    languageText: string
    views: number
    userName: string
    description: string
    hasTransparency: boolean
    hasAudio: boolean
    likes: string
    dislikes: string
    gfyNumber: string
    userDisplayName: string
    userProfileImageUrl: string
    gfyId: string
    gfyName: string
    avgColor: string
    rating: string
    width: number
    height: number
    frameRate: number
    numFrames: number
    mp4Size: number
    webmSize: number
    createDate: number
    source: number
    content_urls: ContentUrls
    userData: UserData
}
interface ContentUrls {
    max2mbGif: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    webp: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    max1mbGif: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    '100pxGif': Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    mobilePoster: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    mp4: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    webm: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    max5mbGif: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    largeGif: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
    mobile: Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile
}
interface Max2mbGifOrWebpOrMax1mbGifOr100pxGifOrMobilePosterOrMp4OrWebmOrMax5mbGifOrLargeGifOrMobile {
    url: string
    size: number
    height: number
    width: number
}
interface UserData {
    name: string
    profileImageUrl: string
    url: string
    username: string
    followers: number
    subscription: number
    following: number
    profileUrl: string
    views: number
    verified: boolean
}
