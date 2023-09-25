'use strict';

(function() {
  var a = true;

  window.addEventListener('load', init);

  function init() {
    // Initialize timer that uses video length to figure out when video ends, then triggers next after that period.
    nextVideo();

    document.getElementById('youtube_video').addEventListener('load', function() {
      // Hide the loader when iframe content is loaded
      hide('#load_animation');
      show('#youtube_video');
      show('#hr_article');
    });

    document.addEventListener('click', async function(event) {
      if (event.target.id === 'next_button_987239d8sxcvbs4hn98237b4') {
        event.preventDefault();
        document.querySelector("#next").innerHTML = "";
        await nextVideo();
        if (a === false) {
          document.querySelector("main").innerHTML = "Winner Winner Chicken Dinner!!";
        }
      }
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

    fetch("/next", {method: "GET"})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        let obj = JSON.parse(resp);
        let link = "https://www.youtube.com/embed/" + obj["video_id"] + "?rel=0&modestbranding=1&autoplay=1&controls=0&showinfo=0&mute=1";
        changeIframeSrc(link);
        start_next_timer(obj["duration"]);
        document.querySelector('#lesson_from_video').textContent = obj["transcript_desc"];
      });
  }

  function start_next_timer(seconds) {
    a = false;
    setTimeout(() => {
      a = true;
      build_next_button();
    }, seconds * 100);
  }

  function build_next_button() {
    let next_name = "next_button_987239d8sxcvbs4hn98237b4";
    let next_button = document.createElement("button");
    next_button.setAttribute('id', next_name);
    next_button.textContent = ">";
    document.querySelector("#next").appendChild(next_button);
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