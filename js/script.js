const serachForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const img = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', main_day())
serachForm.addEventListener('submit', apiSearch);

let i = 0
$(document).mouseleave(function(e){
    if ((e.clientY < 10) && (i < 1)) {
    rand.innerHTML = `Заходите на нашу страницу каждый день, чтобы быть в курсе последних новинок!`;
    $('#exampleModalCenter').modal('show');
    }
    i +=1
});

$(document).click(function(){
    document.getElementById("navbarSupportedContent").classList.remove('show');
});

function main_day() {
    up();
    movie.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    trailer.innerHTML = '';
    let trendType = '';
    if(1 === 2){
        trendType = 'movie';
    }else if(1 === 2){
        trendType = 'tv';
    }else{
        trendType = 'all';
    };
	fetch(`https://api.themoviedb.org/3/trending/${trendType}/day?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru`)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        let inner = `
        <h4 class="card pt-2 pb-2 col-12 center" >Самые популярные фильмы и сериалы сегодня</h4>
        `;
        if(output.results.length === 0){
            inner = '<h4 class="card pt-2 pb-2 col-12 center" >Упс, что-то пошло не так!</h4>';
        }
        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let mediaType = item.title ? 'movie' : 'tv';
            const poster = item.poster_path ? img + item.poster_path : './img/noposter.png';
            let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
            inner += `
            <div class="card pt-3 pb-3 col-12 col-md-4 col-xl-3 item">
                <img src="${poster}" class="poster mb-4" alt="${nameItem}" ${dataInfo}>
                <h5>${nameItem}</h5>
            </div>
            `;
        });
        movie.innerHTML = inner;
        addEventMedia();
    })
    .catch(function(reason){
        movie.innerHTML = `
        <h4 class="card pt-2 pb-2 mb-5 col-12 center">
            Упс, что-то пошло не так!
        </h4>
        `;
    console.error('error: ' + reason);
    });
}

function main_week() {
    up();
    movie.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    trailer.innerHTML = '';
    let trendType = '';
    if(1 === 2){
        trendType = 'movie';
    }else if(1 === 2){
        trendType = 'tv';
    }else{
        trendType = 'all';
    };
	fetch(`https://api.themoviedb.org/3/trending/${trendType}/week?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru`)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        let inner = `
        <h4 class="card pt-2 pb-2 col-12 center" >Самые популярные фильмы и сериалы за неделю</h4>
        `;
        if(output.results.length === 0){
            inner = '<h4 class="card pt-2 pb-2 col-12 center" >Упс, что-то пошло не так!</h4>';
        }
        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let mediaType = item.title ? 'movie' : 'tv';
            const poster = item.poster_path ? img + item.poster_path : './img/noposter.png';
            let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
            inner += `
            <div class="card pt-3 pb-3 col-12 col-md-4 col-xl-3 item">
                <img src="${poster}" class="poster mb-4" alt="${nameItem}" ${dataInfo}>
                <h5>${nameItem}</h5>
            </div>
            `;
        });
        movie.innerHTML = inner;
        addEventMedia();
    })
    .catch(function(reason){
        movie.innerHTML = `
        <h4 class="card pt-2 pb-2 mb-5 col-12 center">
            Упс, что-то пошло не так!
        </h4>
        `;
    console.error('error: ' + reason);
    });
}

function up() {
	var t;
	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0,-100);
		t = setTimeout('up()',25);
	}
	else clearTimeout(t);
	return false;
}

function apiSearch(event){
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value;
	if(searchText.trim().length === 0){
		movie.innerHTML = '<h4 class="card pt-2 pb-2 col-12 center">Пожалуйста заполните поисковую форму!</h4>';
		trailer.innerHTML = '';
		return;
	}
	movie.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
	trailer.innerHTML = '';
	let searchType = '';
	if(1 === 2){
        searchType = 'movie';
    }
    else if(1 === 2){
        searchType = 'tv';
    }
    else{
        searchType = 'multi';
    }
    fetch(`https://api.themoviedb.org/3/search/${searchType}?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru&query=${searchText}`)
        .then(function(value){
            if(value.status !== 200){
                return Promise.reject(new Error('Ошибка!'));
            }
            return value.json();
        })
        .then(function(output){
            let inner = '';
            if(output.results.length === 0){
                inner = '<h4 class="card pt-2 pb-2 col-12 center" >По вашему запросу ничего не обнаруженно!</h4>';
            }
            output.results.forEach(function (item){
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? img + item.poster_path : './img/noposter.png';
                let dataInfo = '';
                if(item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                <div class="card pt-3 pb-3 col-12 col-md-4 col-xl-3 item">
                    <img src="${poster}" class="poster" alt="${nameItem}" ${dataInfo}>
                    <h5>${nameItem}</h5>
                </div>
                `;
            });
            movie.innerHTML = inner;
            trailer.innerHTML = '';
            addEventMedia();
        })
        .catch(function(reason){
            movie.innerHTML = `
            <h4 class="card pt-2 pb-2 col-12 center">
                Упс, что-то пошло не так!
            </h4>
            `;
            console.error('error: ' + reason);
        });
}

function addEventMedia(){
    const media = movie.querySelectorAll('img[data-id]');
            media.forEach(function(elem){
                elem.style.cursor = 'pointer';
                elem.addEventListener('click', showFullInfo);
            });
}

function showFullInfo(){
    up();
    movie.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    let url = '';
    if(this.dataset.type === 'movie'){
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru';
    }else if(this.dataset.type === 'tv'){
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru';
    }else{
        movie.innerHTML = '<h4 class="card pt-2 pb-2 col-12 center" >Упс, что-то пошло не так!</h4>';
    };
    const id =  this.dataset.id;
    const type = this.dataset.type;
    fetch(url)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка!'));
        }
        return value.json();
    })
    .then(function (output) {
        const poster1 = output.poster_path ? img + output.poster_path : './img/noposter.png';
        movie.innerHTML = `
        <h4 class="card pt-2 pb-2 col-12 center" >${output.name || output.title}</h4>
        <div class="card pt-3 pb-3 col-12 col-md-4 col-xl-3">
            <img src='${poster1}' alt='${output.name || output.title}' class='mb-4'>
            ${(output.homepage) ? `<p class='center'> <a href="${output.homepage}" target="_blank"> Официальная страница </a> </p>` : ''}
            ${(output.imdb_id) ? `<p class='center'> <a href="https://imdb.com/title/${output.imdb_id}" target="_blank"> Страница на IMDB.COM </a> </p>` : ''}
        </div>
        <div class="card pt-3 pb-3 col-12 col-md-8 col-xl-9">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Премьера: ${output.first_air_date || output.release_date} </p>
            <p>Описание: ${output.overview}</p>
            <br>
            <div class='youtube'></div>
        </div>
        `;
    getVideoRu(id, type);
    })
    .catch(function(reason){
        movie.innerHTML = `<h4 class="card pt-2 pb-2 col-12 center">Упс, что-то пошло не так!</h4>`;
        console.error('error: ' + reason);
    });
}

function getVideoRu(id, type){
    fetch("https://api.themoviedb.org/3/"+type+"/"+id+"/videos?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru")
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error(value.status));
        }
        return value.json();
    })
    .then((output) => {
        let videoFrame = '<h3 class="card mt-4 pt-2 pb-2 col-12 center" >Трейлеры</h3>';
        if(output.results.length === 0){
            videoFrame = `<h3 class="card mt-4 pt-2 pb-2 col-12 center" >К сожалению трейлеры отсутствуют</h3>`;
        }
        output.results.forEach((item)=>{
            videoFrame += '<div class="card col-12"><iframe class="iframe" src="https://www.youtube.com/embed/' + item.key + '" frameborder="0"></iframe></div>';
        });
        trailer.innerHTML = videoFrame;
    })
    .catch((reason) => {
        trailer.innerHTML = `<h3 class="card mt-4 pt-2 pb-2 col-12 center" >К сожалению трейлеры отсутствуют</h3>`;
        console.error(reason || reason.status);
    });
}

function top_chart() {
    up();
    movie.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    trailer.innerHTML = '';
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru`)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        let chartdata = []
        let chart2data = []
        let tabledata = []
        output.results.forEach(function (item){
            chartdata.push(
                {
                    y: item.popularity,
                    name: item.name || item.title
                },
            )
            chart2data.push(
                {
                    label: item.name || item.title,
                    y: item.vote_average
                },
            )
            tabledata.push(
                {
                    name: item.name || item.title,
                    x: item.popularity,
                    y: item.vote_average

                },
            )
        })
        let inner = `
            <h4 class="card pt-2 pb-2 col-12 center" >Кассовые сборы самых популярных фильмов и сериалов</h4>
            <div class="container mb-4 chart">
                <div id="chartContainer" style="height: 40vh; max-height: 300px; margin: 5px auto;"></div>
            </div>
            <h4 class="card pt-2 pb-2 col-12 center" >Рейтинг самых популярных фильмов и сериалов</h4>
            <div class="container mb-4 chart">
                <div id="chart2Container" style="height: 40vh; max-height: 300px; margin: 5px auto;"></div>
            </div>
            <h4 class="card pt-2 pb-2 col-12 center" >Топ 5 новых фильмов и сериалов</h4>
            <div class="container mb-4 chart">
                <table class="table table-dark text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Рейтинг</th>
                            <th scope="col">Cборы</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>${tabledata[0].name}</td>
                            <td>${tabledata[0].y} из 10</td>
                            <td>${tabledata[0].x} млн. $</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>${tabledata[1].name}</td>
                            <td>${tabledata[1].y} из 10</td>
                            <td>${tabledata[1].x} млн. $</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>${tabledata[2].name}</td>
                            <td>${tabledata[2].y} из 10</td>
                            <td>${tabledata[2].x} млн. $</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>${tabledata[3].name}</td>
                            <td>${tabledata[3].y} из 10</td>
                            <td>${tabledata[3].x} млн. $</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>${tabledata[4].name}</td>
                            <td>${tabledata[4].y} из 10</td>
                            <td>${tabledata[4].x} млн. $</td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
            </div>
        `;
        movie.innerHTML = inner;
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark2",
            exportFileName: "Doughnut Chart",
            animationEnabled: true,
            data: [{
                type: "doughnut",
                innerRadius: 90,
                toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
                indexLabel: "{name} - #percent%",
                dataPoints: chartdata
            }]
        });
        chart.render();
        var chart2 = new CanvasJS.Chart("chart2Container", {
            animationEnabled: true,
            theme: "dark2",
            data: [{
                type: "bar",
                yValueFormatString: "Рейтинг - #,##0.00",
                dataPoints: chart2data
            }]
        });
        chart2.render();





})
}

function random_movie(){
    rand.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    let url = '';
    if('movie' === 'movie'){
        url = 'https://api.themoviedb.org/3/movie/546554?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru';
    }else{
        rand.innerHTML = '<h4 class="card pt-2 pb-2 col-12 center" >Упс, что-то пошло не так!</h4>';
    };
    fetch(url)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка!'));
        }
        return value.json();
    })
    .then(function (output) {
        const poster1 = output.poster_path ? img + output.poster_path : './img/noposter.png';
        rand.innerHTML = `
        <h4 class="card pt-2 pb-2 col-12 center" >${output.name || output.title}</h4>
        <div class="card pt-3 pb-3 col-12">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Премьера: ${output.first_air_date || output.release_date} </p>
            <p>Описание: ${output.overview}</p>
            <br>
            <div class='youtube'></div>
        </div>
        `;
    })
    .catch(function(reason){
        rand.innerHTML = `<h4 class="card pt-2 pb-2 col-12 center">Упс, что-то пошло не так!</h4>`;
        console.error('error: ' + reason);
    });
}

function random_tv(){
    rand.innerHTML = `<div class="spin"><div class="spinner"></div></div>`;
    let url = '';
    if('movie' === 'movie'){
        url = 'https://api.themoviedb.org/3/tv/655?api_key=dcaf7f5ea224596464b7714bac28142f&language=ru';
    }else{
        rand.innerHTML = '<h4 class="card pt-2 pb-2 col-12 center" >Упс, что-то пошло не так!</h4>';
    };
    fetch(url)
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка!'));
        }
        return value.json();
    })
    .then(function (output) {
        const poster1 = output.poster_path ? img + output.poster_path : './img/noposter.png';
        rand.innerHTML = `
        <h4 class="card pt-2 pb-2 col-12 center" >${output.name || output.title}</h4>
        <div class="card pt-3 pb-3 col-12">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Премьера: ${output.first_air_date || output.release_date} </p>
            <p>Описание: ${output.overview}</p>
            <br>
            <div class='youtube'></div>
        </div>
        `;
    })
    .catch(function(reason){
        rand.innerHTML = `<h4 class="card pt-2 pb-2 col-12 center">Упс, что-то пошло не так!</h4>`;
        console.error('error: ' + reason);
    });
}
