var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

var whiteSkin = new Skin({fill:"white"});
var C_S = new Skin({fill: "#0808EE"}); //85A3FF
var F_S = new Skin({fill:"#111199"}); //3366FF
var K_S = new Skin({fill:"#000000"}); //1A3380
var B_S = new Skin({
	fill:"#777777", 
	borders:{left:1, right:1, top:1, bottom:1}, 
	stroke:"black"
});

var whiteS = new Skin({
	fill:"white", 
	borders:{left:0, right:0, top:1, bottom:1}, 
	stroke:"black"
});
var logoSkin = new Skin({
	width:150,
	fill:"white"
});


var labelStyle = new Style( { font: "20px", color:"black" } );
var titleStyle = new Style({font: "15px", color:"white"});
var resultStyle = new Style({font:"45px", color:"black"});


var buttonBehavior = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}

var buttonBehavior2 = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}

var buttonBehaviorRandom = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}

var buttonBehaviorLast = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}

var buttonBehaviorNewest = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}

buttonBehavior.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		if (curr > 1){
			application.invoke(new Message("/getInfoL"));
			
		}
	}}
});

buttonBehavior2.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		if (curr != newest){
			application.invoke(new Message("/getInfoR"));
			
		}	
	}}
});

buttonBehaviorRandom.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		application.invoke(new Message("/getInfoRandom"));
		
	}}
});

buttonBehaviorLast.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		application.invoke(new Message("/getInfoLast"));
		
	}}
});

buttonBehaviorNewest.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		application.invoke(new Message("/getInfo"));
		
	}}
});

var myButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right: 0, width: 20, skin: B_S,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style: titleStyle})
	],
	behavior: new buttonBehavior
}});
var myButtonTemplate2 = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right: 0, width: 20, skin: B_S,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style: titleStyle})
	],
	behavior: new buttonBehavior2
}});
var myButtonTemplateRandom = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right: 0, width: 20, skin: B_S,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style: titleStyle})
	],
	behavior: new buttonBehaviorRandom
}});
var myButtonTemplateLast = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right: 0, width: 0, skin: B_S,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style: titleStyle})
	],
	behavior: new buttonBehaviorLast
}});
var myButtonTemplateNewest = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right: 0, width: 0, skin: B_S,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style: titleStyle})
	],
	behavior: new buttonBehaviorNewest
}});

var button = new myButtonTemplate({textForLabel:"< Prev"});
var button2 = new myButtonTemplate2({textForLabel:"Next >"});
var buttonR = new myButtonTemplateRandom({textForLabel:"Random"});
var buttonL = new myButtonTemplateLast({textForLabel:"| <"});
var buttonN = new myButtonTemplateNewest({textForLabel:"> |"});


var curr = 0;
var newest = 0;
var tag = "";


var ColCon = new Column({left:0, right:0, top:0, bottom:0, skin: whiteSkin});

var zeroColumn = new Container({
	left:0, right:0, top:0, bottom:0, height: 10, skin: whiteSkin,
	contents:[
		new Label({left: 15, right:0, height: 10, string: "Loading...", style: labelStyle, name:"nameLabel"})
	]
});

var oneColumn = new Container ({ left: 0, right: 0, top:0, bottom:0, height: 200,
	skin: whiteSkin, 
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, name:"picLabel", url: ""})
		]
});

var twoColumn = new Line ({ left: 0, right: 0, top:0, bottom:0, 
	skin: F_S, 
	contents:[
		buttonL,
		button,
		buttonR,
		button2,
		buttonN
	]
});

var threeColumn = new Container ({ left: 0, right: 0, top:0, bottom:0, height: 80,
	skin: K_S, 
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, name:"picLabel", url: ""})
		]
}); 




Handler.bind("/getInfo", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("http://xkcd.com/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		oneColumn.picLabel.url = json.img;
		curr = json.num;
		newest = json.num;
		tag = json.title;
		zeroColumn.nameLabel.string = "XKCD " + json.num + ": " + json.title;
		application.invoke(new Message("/getFlickr"));
	}
});

Handler.bind("/getInfoL", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("http://xkcd.com/" + (curr - 1).toString() + "/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		oneColumn.picLabel.url = json.img;
		curr = json.num;
		tag = json.title;
		zeroColumn.nameLabel.string = "XKCD " + json.num + ": " + json.title;
		application.invoke(new Message("/getFlickr"));
	}
});

Handler.bind("/getInfoR", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("http://xkcd.com/" + (curr + 1).toString() + "/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		oneColumn.picLabel.url = json.img;
		curr = json.num;
		tag = json.title;
		tag = json.title;
		zeroColumn.nameLabel.string = "XKCD " + json.num + ": " + json.title;
		application.invoke(new Message("/getFlickr"));
	}
});

Handler.bind("/getInfoRandom", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("http://xkcd.com/" + (Math.floor(Math.random() * newest)).toString() + "/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		oneColumn.picLabel.url = json.img;
		curr = json.num;
		tag = json.title;
		zeroColumn.nameLabel.string = "XKCD " + json.num + ": " + json.title;
		application.invoke(new Message("/getFlickr"));
	}
});

Handler.bind("/getInfoLast", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("http://xkcd.com/1/info.0.json"), Message.JSON);
	},
	onComplete: function(handler, message, json){
		oneColumn.picLabel.url = json.img;
		curr = json.num;
		zeroColumn.nameLabel.string = "XKCD " + json.num + ": " + json.title;
		application.invoke(new Message("/getFlickr"));
	}
});
//id: "80641914@N00", 

Handler.bind("/getFlickr", {
	onInvoke: function(handler, message){
		handler.invoke(new Message("https://api.flickr.com/services/feeds/photos_public.gne?" + serializeQuery( {format: "json", nojsoncallback: 1, tags: tag.split(" ")[0].replace(/\W/g, '').toLowerCase()}) ), Message.JSON);
	},
	onComplete: function(handler, message, json){
	
		//trace (tag.split(" ")[0].replace(/\W/g, '').toLowerCase() + "\n");
		
		var i_len = json.items.length;
		
		if (i_len != 0){
			var x = Math.floor(Math.random() * i_len);
			threeColumn.picLabel.url = json.items[x].media.m;
		}
		else{
			threeColumn.picLabel.url = "http://lostandfoundtravel.net/wp-content/themes/AiwazMag/images/no-img.png";
		}
		
		
		
	}
});



application.behavior = Object.create(Behavior.prototype, {	
	onLaunch: { value: function(application, data){
		application.add(ColCon);
		ColCon.add(zeroColumn);
		ColCon.add(oneColumn);
		ColCon.add(twoColumn);
		ColCon.add(threeColumn);
		
		
		application.invoke(new Message("/getInfo"));
		
	}}
});