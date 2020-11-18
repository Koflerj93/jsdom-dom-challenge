const counter = document.querySelector("#counter");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");
const likeBtn = document.querySelector("#heart");
const pauseBtn = document.querySelector("#pause");
const commentSection = document.querySelector('#list')
const submitBtn = document.querySelector("#submit");
const ulElement = document.querySelector(".likes");
const form = document.querySelector("#comment-form");

let startTimer = setInterval(addToCounter, 1000);
let interval = 0;

function minusFromCounter() {
    let num = parseInt(counter.innerText, 10);
    num -= 1;
    counter.innerText = num;
}

function addToCounter() {
    let num = parseInt(counter.innerText, 10);
    num += 1;
    counter.innerText = num;
}

minusBtn.addEventListener("click", e => {
    minusFromCounter();
});

plusBtn.addEventListener("click", e => {
    addToCounter();
});

likeBtn.addEventListener("click", e => {
    const counterValue = counter.innerText;
    const array = Array.from(document.querySelectorAll('li'));
    let array1 = [];
    let array2 = [];
    for (let i = 0; i < array.length; i++) {
      array1.push(array[i].innerText.split(" - "));
    }
    for (let i = 0; i < array1.length; i++) {
      array2.push(array1[i].splice(1));
    }
    if (array1.flat().includes(counterValue)){
      let likesLi = Array.from(document.getElementsByTagName("li"));
      let found;
      for (let i = 0; i < likesLi.length; i++) {
        if (likesLi[i].innerText.substring(1,0) == counterValue || likesLi[i].innerText.substring(2,0) == counterValue|| likesLi[i].innerText.substring(3,0) == counterValue) {
          found = likesLi[i];
          break;
        }
      }
      let splitArray = found.innerText.split(' - ');
      let lastNum = parseInt(splitArray[1], 10);
      found.innerText = `${counterValue} - ${lastNum += 1}`;
      
    } else {
      const li = document.createElement('li');
      let likeNum = 1;
      li.innerHTML = `
      ${counter.innerText} - ${likeNum}
      `;
      ulElement.append(li);
    }
});

pauseBtn.addEventListener('click', e => {
    clearTimeout(startTimer);
    if (interval === -1){
      pauseBtn.innerText = "pause";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      likeBtn.disabled = false;
      myInterval = setInterval(addToCounter, 1000);
    } else {
      clearInterval(interval);
      pauseBtn.innerText = "resume";
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      likeBtn.disabled = true;
      interval = -1;
    }
  });

form.addEventListener("submit", e => {
    e.preventDefault()
    const pTag = document.createElement('p');
    const comment = form.comment.value;
    pTag.innerText = comment;
    commentSection.append(pTag);
  })