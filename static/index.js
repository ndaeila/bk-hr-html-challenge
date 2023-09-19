'use strict';

(function() {
  window.addEventListener('load', init);

  function init() {
    // Initialize timer that uses video length to figure out when video ends, then triggers next after that period.
    nextVideo();

    document.getElementById("next_button_987239d8sxcvbs4hn98237b4").addEventListener("click", async function(event) {
      event.preventDefault();
      await nextVideo();
    });

    document.getElementById('youtube_video').addEventListener('load', function() {
      // Hide the loader when iframe content is loaded
      hide('#load_animation');
      show('#youtube_video');
      show('#hr_article');
    });
  }

  function changeIframeSrc(newSrc) {
    // Change the iframe's src. This will start loading new content and 
    // the load event listener will hide the loader once content is fully loaded.
    document.getElementById('youtube_video').src = newSrc;
  }

  function nextVideo() {
    hide('#youtube_video');
    show('#load_animation');
    hide('#hr_article');
    hide('#next_button_987239d8sxcvbs4hn98237b4');

    fetch("/next", {method: "GET"})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        let obj = JSON.parse(resp);
        let link = "https://www.youtube.com/embed/" + resp["video_id"] + "?rel=0&modestbranding=1&autoplay=1&controls=0&showinfo=0&mute=1";
        changeIframeSrc(link);
        start_next_timer(obj["duration"]);
        document.querySelector('#lesson_from_video').textContent = obj["transcript_desc"];
      });
  }

  function start_next_timer(seconds) {
    console.log(seconds);
    setTimeout(show('#next_button_987239d8sxcvbs4hn98237b4'), seconds * 1000);
  }

  function show(selector) {
    document.querySelector(selector).style.display = 'block';
  }

  function hide(selector) {
    document.querySelector(selector).style.display = 'none';
  }

  async function statusCheck(resp) {
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    return resp;
  }
})();