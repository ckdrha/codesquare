var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
var boardId=$("[name=id]").val()
$(function() {
	$(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
    createSmartEditor();
});
$(".lecture-video>span>h5").click(function(){
  var urlPaste="<input type=\"url\" name=\"url\" id=\"url\"  placeholder=\"https://example.com\"  pattern=\"https://.*\" size=\"30\"  required>";
  urlPaste+="<button type=\"button\" id=\"btn-video-regist\" class=\"btn btn-secondary btn-block\">등록</button>";
  $(".lecture-video>span>span").html(urlPaste);
})
$(document).on('click','#btn-video-regist,#btn-video-change',function(){
	var url=$("#url").val();
	var urlId=youtubeId(url);
	videoLoad(urlId);
})

$(".btn-lecture-regist, .btn-lecture-cancel, .btn-lecture-modify").click(function(){
	var txt=$(this).text();
	if(txt=='등록'){
		alert("등록")
		oEditors.getById["content"].exec("UPDATE_CONTENTS_FIELD", []);
		var content=$("[name=lectureResgistForm]").serialize();
		insertLectureContent(content);
	}else if(txt=='수정'){
		oEditors.getById["content"].exec("UPDATE_CONTENTS_FIELD", []);
		var content=$("[name=lectureResgistForm]").serialize();
		updateLectureContent(content);
	}else{
		var result=confirm("강의 작성을 취소하시겠습니까?");
		if(result){
			window.history.back();
		}		
	}
})


function insertLectureContent(content){
	$.ajax({
		url:'/learn/course',
		type:'POST',
		data:content
	}).done(function(data){
		if(data!=0){
			boardId=data;
			saveLectureVideo();
		}
	}).fail(function(data){
		if(data!=1){
			alert("lecture insert Fail");
		}
	});
}

function updateLectureContent(content){
	$.ajax({
		url:'/learn/course',
		type:'PUT',
		data:content
	}).done(function(data){
		if(data!=0){
			saveLectureVideo();
		}
	}).fail(function(data){
		if(data!=1){
			alert("Load Review Fail");
		}
	});
}
function saveLectureVideo(){
	var videoUrl=$("#player").data('modifyVideoid');
	$.ajax({
		url:'/learn/video',
		type:'POST',
		data:{"videoUrl":videoUrl,"id":boardId}
	}).done(function(data){
		if(data!=0){
			alert("영상 저장 성공");
			window.history.back();
		}else{
			alert("뭔가 실패");
		}
	}).fail(function(data){
		if(data!=1){
			alert("Load Review Fail");
		}
	});
}


var oEditors = [];
function createSmartEditor(){
	nhn.husky.EZCreator.createInIFrame({
		oAppRef : oEditors,
		elPlaceHolder : "content",
		sSkinURI : "/static/js/smarteditor2/dist/SmartEditor2Skin.html",
		fCreator : "createSEditor2",
		// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
		bUseModeChanger : false,
		fOnAppLoad : function(){
	    }

	});
}



var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
	
	player = new YT.Player('player', {
		height: '100%',
		width: '100%',
		playerVars: {
			'autoplay': 0, // 자동재생
			'controls': 1, // 재생컨트롤 노출여부
			'autohide': 1, // 재생컨트롤이 자동으로 사라질지의 여부
			'rel': 0, // 동영상 재생완료 후 유사동영상 노출여부
			'playsinline': 1, // 현페이지에서 재생
			'wmode': 'transparent'
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
var playerState;
var playNum = 0;
function onPlayerStateChange(event) {
	playerState = event.data == YT.PlayerState.ENDED ? 'end' :
		event.data == YT.PlayerState.PLAYING ? 'playing' :
			event.data == YT.PlayerState.PAUSED ? 'stop' :
				event.data == YT.PlayerState.BUFFERING ? 'buffering' :
					event.data == YT.PlayerState.CUED ? 'playready' :
						event.data == -1 ? 'not start' : 'error';
	if (playerState == "end") {
		$(".video-finish").css('display','block');
				
	}
}
function onPlayerReady(){
	if($("body").attr('id')!='write-page'){
	    var data=$("#player").data('modifyVideoid');
		videoLoad(data);
	}
}

function youtubeId(url) {
    var tag = "";
    if(url)  {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var matchs = url.match(regExp);
        if (matchs) {
            tag +=matchs[7];
        }
        return tag;
    }
}
function videoLoad(url){
	var content="";
	$(".lecture-video *:not(#player)").remove();
	$("#player").css('display','block');
	player.cueVideoById(url);
	content+="<input type=\"url\"  id=\"url\"  placeholder=\"https://example.com\"  pattern=\"https://.*\" size=\"30\"  required>";
	content+="<button type=\"button\" id=\"btn-video-change\" class=\"btn btn-secondary btn-block\" style=\"margin-bottom:3px;\">변경</button>";
	$(".video-change-box").html(content);
	$("#player").data('modifyVideoid',url);
}








