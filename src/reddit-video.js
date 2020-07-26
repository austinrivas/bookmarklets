const findVal = (object, key) => {
  let value;
  Object.keys(object).some(function(k) {
      if (k === key) {
          value = object[k];
          return true;
      }
      if (object[k] && typeof object[k] === 'object') {
          value = findVal(object[k], key);
          return value !== undefined;
      }
  });
  return value;
};

const fetch_reddit_video_url = async (url) => {
  const json_url = url.slice(0, -1).concat(".json");

  const resp = await fetch(json_url);

  const resp_json = await resp.json();

  const video_url_key = "fallback_url";

  let video_url = findVal(resp_json, video_url_key);

  if (video_url) {
    video_url = video_url.split("?")[0];
    alert(video_url);
  }

  console.log("REDDIT VIDEO BOOKMARKLET");
  console.log("POST URL", url);
  console.log("JSON VIDEO URL", json_url);
  console.log("Fetch Response", resp);
  console.log("Response JSON", resp_json);
  console.log("VIDEO URL KEY", video_url_key);
  console.log("VIDEO URL", video_url);
};

fetch_reddit_video_url(window.location.href);