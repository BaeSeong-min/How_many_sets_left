const fourSetButton = document.getElementById("fourSet");
const fiveSetButton = document.getElementById("fiveSet");
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");

const progressBar = document.getElementById('progressBar');
const progressButton = document.getElementById('progressButton')

const circle = document.querySelector('.circle');
const formStructor = document.querySelector('.form-structor');

const setFinishPercentageElement = document.getElementById('setFinishPercentage');
const advieTextElement = document.getElementById('adviceText');
const finishedNumberElement = document.getElementById('finishedNumber');
const backToMainPageElement = document.getElementById('backToMainPage');

let progressButtonClickHandler;

function updateSetProgress(currentSet, totalSet, adviceTexts, circleClasses) {
  circle.classList = ['circle'];
  circle.classList.add(circleClasses[currentSet - 1]);

  if (!(circle.classList.contains('circle360'))) {
    formStructor.classList.add('breakTimeDisplay');
    timerDisplay();
  }

  let progressPercentage = (currentSet / totalSet) * 100;
  document.getElementById('setFinishPercentage').innerHTML = progressPercentage + '%';
  document.getElementById('adviceText').innerHTML = adviceTexts[currentSet - 1];

}

function showProgressCircle(setNumber) {
  let adviceTexts = setNumber === 4
    ? [
      '"헬스클럽은 클럽보다 더 즐거운 곳이다." - 김종국',
      '"근육을 잃느니 차라리 사랑을 잃겠다." - 김종국',
      '이제 마지막 세트에요, 마지막까지 파이팅!!',
      '최고최고, 세트를 끝내셨어요. 대단해요!'
    ]
    : [
      '"헬스클럽은 클럽보다 더 즐거운 곳이다." - 김종국',
      '"근육을 잃느니 차라리 사랑을 잃겠다." - 김종국',
      '"패션의 완성은 몸매다" - 범식햄',
      '이제 마지막 세트에요, 마지막까지 파이팅!!',
      '최고최고, 세트를 끝내셨어요. 대단해요!'
    ];

  let circleClasses = setNumber === 4
    ? ['circle90', 'circle180', 'circle270', 'circle360']
    : ['circle72', 'circle144', 'circle216', 'circle288', 'circle360'];

  let currentSet = 1;
  let finishedNumber = 0;

  if (progressButtonClickHandler) {
    progressButton.removeEventListener('click', progressButtonClickHandler);
  }

  progressButtonClickHandler = () => {
    if (currentSet <= setNumber) {
      console.log(`1: ${currentSet} 2: ${setNumber}`);
      updateSetProgress(currentSet, setNumber, adviceTexts, circleClasses);
      currentSet++;
    } else {
      currentSet = 1;
      finishedNumber += 1;
      setFinishPercentageElement.innerHTML = '0%';
      advieTextElement.innerHTML = '이 기세를 몰아서 다음 운동으로 넘어가볼까요?!';
      finishedNumberElement.innerText = '💪 ' + (finishedNumber) + '회 완료';
      circle.classList = ['circle'];
    }
  }

  progressButton.addEventListener('click', progressButtonClickHandler);
}

function showProgressBar(setNumber) {
  let currentSet = 0;

  progressButton.addEventListener('click', () => {
    if (currentSet < setNumber) {
      currentSet++;
      const progressPercentage = (currentSet / setNumber) * 100;
      progressBar.style.width = progressPercentage + '%';
    } else {
      currentSet = 0;
      progressBar.style.width = '0%';
    }
  });
}

fourSetButton.addEventListener('click', function() {
  firstPage.style.display = 'none';
  secondPage.style.display = 'block';

  const totalSet = 4;
  showProgressBar(totalSet);
  showProgressCircle(totalSet);
});

fiveSetButton.addEventListener('click', function() {
  firstPage.style.display = 'none';
  secondPage.style.display = 'block';

  const totalSet = 5;
  showProgressBar(totalSet);
  showProgressCircle(totalSet);
});

backToMainPageElement.addEventListener('click', function() {
  firstPage.style.display = 'block';
  secondPage.style.display = 'none';
  finishedNumberElement.innerText = '💪 0회 완료';
  setFinishPercentageElement.innerText = '0%';
  advieTextElement.innerText = '같이 힘내서 4세트 끝내봐요!'
  progressBar.style.width = 0 + '%';

  circle.classList = ['circle'];
})

function timerDisplay() {
  const totalTime = 60000;
  const oldTime = Date.now();

  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const diff = currentTime - oldTime;

    const remainMSec = totalTime - diff;
    const remainSec = Math.ceil(remainMSec / 1000);
    let label = `${remainSec}`;

    if (remainSec <= 0) {
      formStructor.classList.remove('breakTimeDisplay');
      label = ' ';
      clearInterval(timerId);
    }
    document.querySelector('#countdown').innerHTML = label;
  }, 1000);
}
