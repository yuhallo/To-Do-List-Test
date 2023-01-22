//할 일을 입력 하고 
//+버튼을 누르면 할일이 추가된다.  -> addTask -> 정보는 객체롤 받아 오는게 좋다! + 버튼이벤트
//delete 버튼을 누르면 삭제되고, 
//check 버튼을 누르면 할일이 끝난 표시가 된다. -> complete 를 true로 바꿔주고, 효과 넣기
//탭에 따라 언더바가 이동하고, 탭 별로 분류한다.
//전체 탭을 누르면 다시 전체로 돌아온다.

const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-button');
const tabs = document.querySelectorAll(".task-tabs div")

addBtn.addEventListener("mousedown", addTask);  //할일 추가 버튼에 이벤트를 넣는다.
taskInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
        addTask(event);
    }
});

const taskList = [];  //추가할 할일을 배열로 만들어준다.
function addTask() {  //배열안에 할일을 추가하는 함수 -> 객체형으로 넣어준다. -> 할일을 완료했는지 안했는지를 구분해 주기위해
    let task = {
        id : randomId(),   // 각 할일을 구분하기 위해 id를 부여한다. (함수로)
        taskContent: taskInput.value,
        isComplete : false
    };

    taskList.push(task);
    taskInput.value = ""; //입력 후에 창을 빈창으로 만들어 준다.
    render();
}

for(let i = 1; i < tabs.length; i++) {   //tabs 의 div 를 순회하며 클릭에 이벤트를 부여한다.
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
};

//탭별로 분류하기 위한 함수
let tabId = "all";
let filterList = [];

function filter(event) {
    if(event) {
        tabId = event.target.id;
    }

    filterList = [];
    if (tabId === "on-going") {
        taskList.filter((e) => e.isComplete === false ? filterList.push(e) : "");
    }
    else if (tabId === "completed") {
        taskList.filter((e) => e.isComplete ? filterList.push(e) : "");
    }
    render();  // if문 안에서 렌더를 했을 때는, 렌더
}


function render() {  //그림을 그려주는 모든 역할을 넣는다.
    let result = '';
    let list = [];
    
    if(tabId === "all") {
        list = taskList;
    }else{
        list = filterList;
    }
    
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete) { //끝난 애들이라면 done이라는 클래스(css)를 추가한다.
            result += `<div class="tasks">
            <div class="done"> ${list[i].taskContent} </div> 
            <div>
            <button onclick = "btnComplete('${list[i].id}')">check</button> 
            <button onclick = "deleteTask('${list[i].id}')">delete</button>
            </div>
            </div>`;
        }else{
            result += `<div class="tasks">
            <div> ${list[i].taskContent} </div>
            <div>
            <button onclick = "btnComplete('${list[i].id}')">check</button> 
            <button onclick = "deleteTask('${list[i].id}')">delete</button>
            </div>
            </div>`;
        }
    }
    document.querySelector('#task-board').innerHTML = result;
}

// id를 랜덤하게 만들어주는 함수
function randomId() {   
    return '_' + Math.random().toString(36).substr(2, 9);
}

//체크버튼에 온클릭 속성으로 넣어준 함수
function btnComplete(id) {   
    //어떤 할일의 버튼인지 특정해야한다. -> 할일에 id를 부여
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;  //누를 때마다 ture, false의 반댓값을 넣어준다. ('!' 꼭꼭 기억하기!!!!!!)
            break;
        }
    }
    render();  //렌더를 불러줘야 css 가 적용된다.
}

//딜리트버튼에 온클릭 속성으로 넣어준 함수 -> how to remove item from array javascript -> 배열의 인덱스를 삭제하자!
function deleteTask(id) { 
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}