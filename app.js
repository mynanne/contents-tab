// console.log('app');
// console.log(popularContents);
// console.log(viewContents);
// console.log(recentContents);

const listDom = document.getElementById("list");
const loadingDom = document.getElementById("loading");
const moreDom = document.getElementById("more");
const navTabs = document.getElementsByClassName("nav nav-tabs")[0];

let timeout;
let moreClick = 0;
const tabList = {"최근":recentContents, "많이본":viewContents, "실시간인기":popularContents};

//5. 로딩이미지 효과: 각 콘텐츠 노출시에 로딩이미지를 1초 노출후에 콘텐츠 노출
const loading = () => {
    loadingDom.hidden = false;
    moreDom.hidden = true;
    timeout = setTimeout(showList, 1000);
};

//2. 각 탭을 누를때마다 해당 JSON을 사용하여 결과 표시
const showList = () => {
    const tab = navTabs.getElementsByClassName("active")[0];
    
    const list = tabList[tab.innerText]
    for(let i=0; i<10; i++) {
        const dom = makeDom(list[i + moreClick*10]);
        listDom.appendChild(dom);
    }

    loadingDom.hidden = true;
    moreDom.hidden = list.length <= (moreClick+1)*10;
};


//6. API에서 제목, 링크, 이미지, CP 를 적절히 표시
const makeDom = ({title, img, cp, url}) => {
    const mainDom = document.createElement("div");
    const titleDom = document.createElement("div");
    const imageDom = document.createElement("IMG");
    const urlDom = document.createElement("div");

    mainDom.style.border = "4px solid #AAAAAA";
    mainDom.style.marginBottom = "10px";
    mainDom.style.padding = "15px";

    titleDom.innerText = `[${cp}] ${title}\n`;
    imageDom.height = 300;
    imageDom.src = img;
    urlDom.innerText = url;

    mainDom.append(titleDom, imageDom, urlDom);

    return mainDom;
}

//---------- ButtonEvent ----------

//3. 각 탭이 선택되면 선택된 탭 class(active) 적용
for(let navTab of navTabs.children) {
    navTab.addEventListener("click", _event => {

        for(let navTab2 of navTabs.children) {
            const classList = navTab2.classList;
            navTab===navTab2 ? classList.add('active') : classList.remove('active');
        }

        //초기화
        while(listDom.hasChildNodes()) {
            listDom.removeChild(listDom.firstChild);
        }
        moreClick = 0;
        clearTimeout(timeout);

        loading();
    });
}

//7. 처음 10개만 보여주고 더보기 클릭이 남은 10개 보여주기 (로딩이미지 효과도 구현)
moreDom.addEventListener("click", _event => {
    loading();
    moreClick++;
});


//---------- 화면 처음 진입 ----------
//처음 리스트 로딩
loading();