var APP_ID = 'oysuL2dORvTNIna81kWEojQM-gzGzoHsz';
var APP_KEY = 'RuAWNvvWTsPo21IHHUViSmgV';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
//首页推荐歌曲
let $olSongs = $('ol#songs')
var query = new AV.Query('Song');
query.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        let song = results[i].attributes
        let li = `
        <li>
        <a href="./song.html?id=${results[i].id}">
        <h3>${song.name}</h3>
            <P><i class="#icon-sq"></i>${song.singer}</P>
            <div class="playButton"></div>
        </a>
        </li>`
        $olSongs.append(li)
    }
})


//热门歌曲

let $olhotSongs = $('ol#hotsongs')
var query = new AV.Query('Song');
query.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        let song = results[i].attributes
        if(i<9){
            let li = `
           <li>
           <a href="./song.html?id=${results[i].id}">
           <div class="bangdan">
           <div class="number">0${i+1}</div>
           <div class="geming"><h3>${song.name}<small></small></h3>
           <p><i class="#icon-sq"></i>${song.singer}</p>
           </div>
            <div class="action">
            <div class="playButton"></div>
           </div>
           </div>
            </a>
           </li>`;
            $olhotSongs.append(li)
        }else{
            let li = `
           <li>
           <a href="./song.html?id=${results[i].id}">
           <div class="bangdan">
           <div class="number">${i+1}</div>
           <div class="geming"><h3>${song.name}<small></small></h3>
           <p><i class="#icon-sq"></i>${song.singer}</p>
           </div>
            <div class="action">
            <div class="playButton"></div>
           </div>
           </div>
            </a>
           </li>`;
            $olhotSongs.append(li)
        }
    }
})
//清空按钮
var close = function () {
    $('#search').val('')
    $('.close').removeClass('active')
    $('#searchResult').empty()
    $('.default').show()
    $('.holder').removeClass('active')
    $('.search-content').hide()
    $('.hotlist').removeClass('active')
    // $('#searchResult')[0].value = ''

}
$('.close').on('click', function () {
    return (close())
})

//函数节流
let timer = null
$('input#search').on('input', function (e) {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(function () {
        timer = null
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if(value ===''){return(close())}
        var query2 = new AV.Query('Song');
        query2.contains('name', value);
        var query1 = new AV.Query('Song');
        query1.contains('singer', value);
        var query = AV.Query.or(query1, query2)
        query.find().then(function (results) {
            $('#searchResult').empty()
            $('.close').addClass('active')
            $('.hotlist').addClass('active')
            $('.holder').addClass('active')
            $('.search-content').html(`<h3>搜索"${value}"</h3>`).show()
            if (results.length === 0) {
                //$('.search-content').hide()
                $('#searchResult').html(`<h3>搜索不到</h3>`)

            } else {
                for (var i = 0; i < results.length; i++) {
                    let song = results[i].attributes
                    let li = `
                <li data-id="${results[i].id}">
                <i class="tubiao"></i>
                <a href="./song.html?id=${results[i].id}">${song.name} - ${song.singer}</a>
        </li>
        `;
                    $('#searchResult').append(li)
                }
                if(value===''){
                    return(close())
                }
            }})

    }, 500)
})
