console.log("welcome to the News Channel!");
let newsBox = document.getElementById('newsBox');

let articles;
let topic = "top-headlines";
let source1 = "bbc-news";
let apiKey = '21e8680e98464dd2aa81da4b344dd4b1';
let get_url = `https://newsapi.org/v2/top-headlines?language=en&sources=${source1}&apiKey=${apiKey}`;

showNews();

document.getElementById('sports').addEventListener('click', function () {
    get_url = `https://newsapi.org/v2/top-headlines?language=en&category=sports&apiKey=${apiKey}`;
    showNews();
});
document.getElementById('top-headlines').addEventListener('click', function () {
    get_url = `https://newsapi.org/v2/top-headlines?language=en&sources=${source1}&apiKey=${apiKey}`
    showNews();
});
document.getElementById('business').addEventListener('click', function () {
    get_url = `https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=${apiKey}`;
    showNews();
});
document.getElementById('health').addEventListener('click', function () {
    get_url = `https://newsapi.org/v2/top-headlines?language=en&category=health&apiKey=${apiKey}`;
    showNews();
});
document.getElementById('entertainment').addEventListener('click', function () {
    get_url = `https://newsapi.org/v2/top-headlines?language=en&category=entertainment&apiKey=${apiKey}`;
    showNews();
});

function showNews() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', get_url, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let news = JSON.parse(this.responseText);
            articles = news.articles;
            console.log(articles[2]);
            let newsHtml = "";
            articles.forEach(function (element, index) {
                if (element["title"] == "Rybakina fights back to win Wimbledon final") {//showing error when content has a table

                } else {
                    let news_html;
                    if (element["content"] != null) {
                        news_html = `<div class="card mx-3 my-3" style="width: 18rem; border: 1px solid red;">
            <img src="${element["urlToImage"]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element["title"]}</h5>
              <p class="card-text">${element["content"]}</p>
              <a href="${element["url"]}" target="_blank" class="btn btn-primary">Read More</a>
            </div>
            </div>`;
                    } else {
                        news_html = `<div class="card mx-3 my-3" style="width: 18rem; border: 1px solid red;">
            <img src="${element["urlToImage"]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element["title"]}</h5>
              <p class="card-text">Click Below To Read More</p>
              <a href="${element["url"]}" target="_blank" class="btn btn-primary">Read More</a>
            </div>
            </div>`;
                    }
                    newsHtml += news_html;
                }
            });
            newsBox.innerHTML = newsHtml;
        }
        else {
            console.log("Some error occured")
        }
    }
    document.getElementById("searchTxt").value="";
    xhr.send();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('card mx-3 my-3');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})