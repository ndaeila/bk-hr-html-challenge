'use strict';

(function() {
  var a = true;

  window.addEventListener('load', init);

  function init() {
    // Initialize timer that uses video length to figure out when video ends, then triggers next after that period.
    nextVideo();

    // Add an event listener for the back button
    document.getElementById('back_button_sdficnj34iunhy78vsdizzf4').addEventListener('click', function(event) {
      event.preventDefault();
      history.back(); // Go to the previous page/tab
    });

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
          showWinnerMessage();
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
        let link = "https://www.youtube.com/embed/" + obj["video_id"] + "?rel=0&modestbranding=1&autoplay=1&controls=0&showinfo=0&mute=0";
        changeIframeSrc(link);
        start_next_timer(obj["duration"]);
        document.querySelector('#lesson_from_video').textContent = obj["transcript_desc"];
      });
  }

  function start_next_timer(seconds) {
    a = false;

    // Create a countdown element
    let countdownElement = document.createElement('span');
    countdownElement.setAttribute('id', 'countdown_timer');
    countdownElement.textContent = `${seconds} seconds...`;
    document.querySelector("#next").appendChild(countdownElement);

    // Start countdown interval
    let countdown = seconds;
    let interval = setInterval(() => {
      countdown--;
      countdownElement.textContent = `${countdown} seconds...`;

      // When countdown reaches 0, clear the interval and show the button
      if (countdown <= 0) {
        clearInterval(interval);
        document.querySelector("#next").innerHTML = ""; // Clear the countdown
        a = true;
        build_next_button();
      }
    }, 100); // Adjusted to 1 second interval (1000 milliseconds)
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

  function showWinnerMessage() {
    document.querySelector("main").innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <div style="font-size: 100px;">🏆</div>
        <div style="font-size: 48px; font-weight: bold; color: #ffcc00; margin-top: 20px;">
          Winner Winner Chicken Dinner!!
        </div>
      </div>
    `;
  }
})();
