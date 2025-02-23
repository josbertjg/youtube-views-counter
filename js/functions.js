function updateCounter(counter, direction, interval = 5) {
  if (!(counter === 0 && !direction)) {
    return direction ? counter + interval : Math.max(0, counter - interval);
  } else {
    return 0;
  }
}

function updateViewContent(counters) {
  $(".subs-count, .subs").text(`${formatNumbers(counters.countQ)}`);
  $(".like-count, .likes").text(`${formatNumbers(counters.countW)}`);
  $(".dislike-count, .dislikes").text(`${formatNumbers(counters.countE)}`);
  $(".views-count, .views").text(`${formatNumbers(counters.countR)}`);
}

function formatNumbers(number) {
  if (number >= 1000 && number < 10000) return `${(number / 1000).toFixed(1)} K`;
  if (number >= 10000 && number < 100000) return `${(number / 10000).toFixed(1)} K`;
  if (number >= 100000 && number < 1000000) return `${(number / 100000).toFixed(1)} K`;

  if (number >= 1000000 && number < 10000000) return `${(number / 1000000).toFixed(1)} M`;
  if (number >= 10000000 && number < 100000000) return `${(number / 10000000).toFixed(1)} M`;
  if (number >= 100000000 && number < 1000000000) return `${(number / 100000000).toFixed(1)} M`;

  return number;
}

function saveState(channelName, videoName, videoDescription) {
  localStorage.setItem("channelName", channelName);
  localStorage.setItem("videoName", videoName);
  localStorage.setItem("videoDescription", videoDescription);
  setState();
}

function setState() {
  const channelName = localStorage.getItem("channelName") || "";
  const videoName = localStorage.getItem("videoName") || "";
  const videoDescription = localStorage.getItem("videoDescription") || "";

  if (channelName.trim().length !== 0) {
    $("#channel-name").val(channelName);
    $(".channel-title").text(channelName);
  }
  if (videoName.trim().length !== 0) {
    $("#video-name").val(videoName);
    $(".channel-video-name").text(videoName);
    document.title = videoName;
  }
  if (videoDescription.trim().length !== 0) {
    $("#video-description").val(videoDescription);
    $(".description").text(videoDescription);
  }
}

function handleDislikesAndLikes(counters, keyPressed, direction) {
  if (keyPressed === 'w') {
    counters.countW = updateCounter(counters.countW, direction, 12);
  } else if (keyPressed === 'e') {
    counters.countE = updateCounter(counters.countE, direction, 12);
  }

  if (counters.countE >= counters.countW * 0.5 && keyPressed === 'e') {
    counters.countW = Math.max(0, counters.countW - 1);
  }

  if (counters.countW >= counters.countE * 0.5 && keyPressed === 'w') {
    counters.countE = Math.max(0, counters.countE - 1);
  }
  updateViewContent(counters); 
}