(function(){
	$(document).ready(function(){

		if (document.getElementById('wlfTips')) {
			document.body.removeChild(document.getElementById('wlfTips'));
			return;
		}
		var a = document.createElement('div');
		a.setAttribute('style', 'width:200px;height:200px;z-index:1000000000;resize:both;overflow: auto;position:fixed;left:10px;top:0;color:#fff;background:#272727;');
		a.setAttribute('id', 'wlfTips');
		a.setAttribute('contentEditable', 'true');
		document.body.appendChild(a);
		try {
			
			if( new RegExp("/disk/home").test(location.href) ){
				if(  new RegExp("category").test(location.href) ){
					var cat = location.href.split('type=')[1].split('&')[0];
					var url = 'http://pan.baidu.com/api/categorylist?order=time&desc=1&showempty=0&web=1&page=1&num=100&t=0.9164920633193105&bdstoken='+yunData.MYBDSTOKEN+'&channel=chunlei&clienttype=0&web=1&app_id=250528&category='+cat;
				}else{
					var url = 'http://pan.baidu.com/api/list?order=time&desc=1&showempty=0&web=1&page=1&num=100&dir='+location.href.split('path=')[1]+'&t=0.9164920633193105&bdstoken='+yunData.MYBDSTOKEN+'&channel=chunlei&clienttype=0&web=1&app_id=250528';
				}
				$.ajax({
					url: url, 
					context: document.body, 
					success: function(res){
				       var x = res.list || res.info;
						for (i = 0; i < x.length; i++) {
							var title =  x[i].server_filename;
							if( x[i].isdir ){
								title = '<span style="color:#fda34b">'+title+"</span>";
							}
							a.innerHTML += '<p>' + title + '</p>'
						}
					}
				});
			}else if( new RegExp("/share/home").test(location.href) ){

				var url = 'http://pan.baidu.com/pcloud/feed/getsharelist?category=0&auth_type=1&request_location=share_home&start=0&limit=60&_='+FileUtils.systemTimestamp+'&bdstoken='+FileUtils.bdstoken+'&channel=chunlei&clienttype=0&web=1&app_id=250528&query_uk='+ FileUtils.sysUK_Master;
			
				$.ajax({
					url: url, 
					context: document.body, 
					success: function(res){
				       var x = res.list || res.records;
						for (i = 0; i < x.length; i++) {
							var title =  x[i].title;
							if( x[i].filelist[0].isdir ){
								title = '<span style="color:#fda34b">'+title+"</span>";
							}
							a.innerHTML += '<p>' + title + '</p>'
						}
					}
				});
			}else if(new RegExp("/s").test(location.href)|| new RegExp("/share/link").test(location.href)){
				var x = $('[node-type=name]','[node-type=list]');
				for (i = 0; i < x.length; i++) {
					var color = ( x.parents('[data-extname]').attr('data-extname') == 'dir') ? '#fda34b': '#fff'; 
					a.innerHTML += '<p style="color:'+color+'">' + x[i].title + '</p>'
				};
			}else{

				a.innerHTML += '<p style="font-size:20px;">Oops，页面可能出错了，请先尝试使用谷歌等高级浏览器</p><p style="font-size:20px;">如果无效，烦请通知<a onclick=window.open("http://weibo.com/mayloveless") target="_blank">@mayloveless</a>，并告知页面地址。</p>' 
			}
		} catch(e) {
			/*
			var x = FileUtils.getListView()._mElementsData;
			if( Object.prototype.toString.call(x[0]) === "[object Array]" ) x = x[0];
			for (i = 0; i < x.length; i++) {
				a.innerHTML += '<p>' + x[i].server_filename + '</p>'
			};
			var x = $('[node-type=name]','[node-type=list]');
				for (i = 0; i < x.length; i++) {
					a.innerHTML += '<p>' + x[i].title + '</p>'
				};
			*/
		}
	});
})()