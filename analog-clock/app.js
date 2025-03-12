const secondsHand = document.querySelector("#seconds-hand");
const minutesHand = document.querySelector("#minutes-hand");
const hoursHand = document.querySelector("#hours-hand");

function getTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const secondsInterval = 6;
  const minutesInterval = 6;
  const hoursInterval = 30;

  secondsHand.style.transform = `rotate(${seconds * secondsInterval}deg)`;
  minutesHand.style.transform = `rotate(${
    minutes * minutesInterval + seconds / 10
  }deg)`;
  hoursHand.style.transform = `rotate(${
    hours * hoursInterval + minutes / 2
  }deg)`;
}

getTime();
setInterval(getTime, 100);
