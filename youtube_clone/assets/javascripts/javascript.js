const videoCardContainer = document.querySelector('.video-wrapper');
const api_key = "AIzaSyCZiomqAbb634sXj-Rec8Wq4I4gtyeaJ6A";

const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
    // endpoint hai

    video_http + new URLSearchParams({
        part: "snippet,contentDetails,statistics,player",
        chart: "mostPopular",
        maxResults: 20,
        regionCode: "IN",
        key: api_key,
    })
)
.then((res) => res.json())
.then((data) => {
    data.items.forEach((item) => {
        getChannelIcon(item);
    });
})
.catch((err) => console.log("Error fetching video data:", err));

const getChannelIcon = (video_data) => {
    fetch(
        // new URLSearchParams ==> yeh url query hai parameters
    //    URL query parameters provide a versatile mechanism for passing data, customizing requests, filtering results, and managing sessions in web development.
        channel_http + new URLSearchParams({
            key: api_key,
            id: video_data.snippet.channelId,
            part: "snippet",
        })
    )
    .then((res) => res.json())
    .then((channelData) => {
        const channelThumbnail = channelData.items[0]?.snippet?.thumbnails?.default?.url || '';
        makeVideoCard(video_data, channelThumbnail);
    })
    .catch((err) => console.log("Error fetching channel data:", err));
};

const makeVideoCard = (data, channelThumbnail) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");

    videoCard.innerHTML = `
        <div class="video-content">
            <img src="${data.snippet.thumbnails.high.url}" alt="thumbnail" class="thumbnail">
        </div>
        <div class="video-details">
            <div class="channel-logo">
                <img src="${channelThumbnail}" alt="" class="channel-icon">
            </div>
            <div class="detail">
                <h3 class="title">${data.snippet.title}</h3>
                <div class="channel-name">${data.snippet.channelTitle}</div>
            </div>
        </div>
    `;

    videoCardContainer.appendChild(videoCard);
};
