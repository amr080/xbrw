// JavaScript Document

var getMapInfo = function(targetMap,ticker,targetObj){
		
	switch(targetMap) {
		case 'fund_map':
			for(var i=0;i<window[targetMap].length;i++){
				// if the ticker is in the map tickerArray and targetObj is defined
				if($.inArray( ticker, window[targetMap][i].tickerArray) >-1 && targetObj != undefined){
					// return targetObj from targetMap
					return window[targetMap][i][targetObj];
				} else if ($.inArray( ticker, window[targetMap][i].tickerArray) >-1) {
					// return fund_map position
					return i;
				}
			}
			break;
		case 'performance_map':
			if (targetObj != undefined) {
				// return target object from the performance_map
				return window[targetMap][targetObj]
			} else {
				// return resource array for passed ticker
				return window[targetMap].performanceResourceMap[ticker]
			}

			break;
	}
	
	return "N/A"; // didn't find info	
}

// usage examples:
// getMapInfo('fund_map', classes[0], 'tickerArray');
// getMapInfo('fund_map', classes[0], 'inceptionDate');
// getMapInfo('fund_map', classes[0]); <-- returns number
// getMapInfo('performance_map', classes[0], 'performanceResourceMap');
// getMapInfo('performance_map', classes[0], 'performancePeriodMap');
// getMapInfo('performance_map', classes[0]);
//////////

// ============================

// Scrolls to anchor on page halt. Called by default in api_INIT.
function pageHaltScrollTo() {
	
	// get hashtag from address bar if it exists and sanitize it.
	var hashTag = encodeURI(location.hash);
	var scrollToPadding = $('body').data('scrolltopadding');
	
	// if scrollToPadding isn't defined on the body element as data-scrolltopadding="int", use 270 by default.
	if (scrollToPadding == undefined) {
		scrollToPadding = 150; // collapsed hero height
	}
	
	// scroll to the anchor if it exists.
	if (hashTag != "") {
		
		// add active class to sidebar for consistent offset detection.
		
		$('html, body').animate({
			scrollTop: $(hashTag).offset().top - scrollToPadding
		}, 200)
			
	}
}

// ============================

function swapTempLocationTickers(calledBy) {
	
	var dataLocationElements = $( '[data-location]:not([data-swappedticker="true"])' );
	
	$.each(dataLocationElements, function( i, dataObj ) {
		
		var tempLocation = $(dataObj).attr('data-location');
		
		if( tempLocation.indexOf('thisFundArray') > -1 ) {
				
				if(tempLocation.length > 13){
					
					// splits thisFundArray[i] string to get index position
					var tF_split = tempLocation.split('[');
					tF_split.shift();
					
					// replaces data-location with coresponding ticker
					
					dataObj.setAttribute("data-location", thisFundArray[tF_split[0].substring(0,tF_split[0].length-1)].toUpperCase());
					$(dataObj).data('swappedticker', true).attr('data-swappedticker', true);
					
				} else {
				
					var commaFundArray = '';
					
					// builds comma separated list from thisFundArray
					thisFundArray.forEach(function(){
						commaFundArray = thisFundArray.join(",");
					});
					
					// replaces thisFundArray string in data-location with ticker(s)
					dataObj.setAttribute("data-location", commaFundArray.toUpperCase());
					$(dataObj).data('swappedticker', true).attr('data-swappedticker', true);

				}	
			
		}
		
	});
	
	$.each($( '[data-overrideresource]:not([data-swappedticker="true"])' ), function( i, dataObj ) {
		
		var tempLocation = $(dataObj).attr('data-overrideresource');
		
		if( tempLocation.indexOf('thisFundArray') > -1 ) {
				
				if(tempLocation.length > 13){
					
					// splits thisFundArray[i] string to get index position
					var tF_split = tempLocation.split('[');
					tF_split.shift();
					
					// replaces data-location with coresponding ticker
					
					dataObj.setAttribute("data-overrideresource", thisFundArray[tF_split[0].substring(0,tF_split[0].length-1)].toUpperCase());
					$(dataObj).data('swappedticker', true).attr('data-swappedticker', true);
					
				} else {
				
					var commaFundArray = '';
					
					// builds comma separated list from thisFundArray
					thisFundArray.forEach(function(){
						commaFundArray = thisFundArray.join(",");
					});
					
					// replaces thisFundArray string in data-location with ticker(s)
					dataObj.setAttribute("data-overrideresource", commaFundArray.toUpperCase());
					$(dataObj).data('swappedticker', true).attr('data-swappedticker', true);

				}	
			
		}
		
	});
	
	if (typeof swapTempLocationCallback != 'undefined' && $.isFunction(swapTempLocationCallback)) {
		swapTempLocationCallback(calledBy);
	}
	
}

function swapTempLocationCallback() {
	appendFundMapData();
}


///////////

/* 
Load data from fund_map using data attributes:
To use, add data-fund_map="fundMapKey" data-location="thisFundArray[0]" to an element
*/

function appendFundMapData() {
	$.each($('[data-fund_map]'), function(i,val) {
		var location = $(this).data('location');
		var key = $(this).data('fund_map');
		var fundIndex = getMapInfo('fund_map', location);
		var classIndex = window.fund_map[fundIndex].tickerArray.indexOf(location);
		if ($.isArray(window.fund_map[fundIndex][key])) {
			$(this).text(window.fund_map[fundIndex][key][classIndex]);
		} else {
			$(this).text(window.fund_map[fundIndex][key]);
		}
		
	});
}

function dateFormatter_v2(date, dateformat) { 

	var formattedDate;
	
	if (date && date.indexOf("/") != -1 && date.length <= 10) {
		var d = moment(date, "MM/DD/YYYY")
	} else {
		var d = moment(date);
	}

	switch (dateformat) {
	  case 'abbre':
		 formattedDate = d.format("ll");
		 break;
			
	  case 'full':
		 formattedDate = d.format("LL");
		 break;
			
	  case 'dashed':
		 formattedDate = d.format("MM-DD-YYYY");
		 break;
			
	  case 'dotted':
		 formattedDate = d.format("MM.DD.YYYY");
		 break;
			
	  case 'slashed':
	  default:
		 formattedDate = d.format("L");
	}
 
	return formattedDate;
	
}


function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	var roundedNumber = Math.round(number * factor) / factor
	return roundedNumber.toFixed(precision);
}


if (!String.prototype.trim) {
	String.prototype.trim = function () {
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		return this.replace(rtrim, "");
	}
}

function addEventSimple(obj, evt, fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt, fn, false);
	else if (obj.attachEvent)
		obj.attachEvent('on' + evt, fn);
}

function removeEventSimple(obj, evt, fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt, fn, false);
	else if (obj.detachEvent)
		obj.detachEvent('on' + evt, fn);
}

function touchHandler(event) {

	//alert(event)
	var touches = event.changedTouches,
		first = touches[0],
		type = "";
	switch (event.type) {
		case "touchstart":
			type = "mousedown";
			break;
		case "touchmove":
			type = "mousemove";
			break;
		case "touchend":
			type = "mouseup";
			break;
		default:
			return;
	}
	//initMouseEvent(type, canBubble, cancelable, view, clickCount,
	//           screenX, screenY, clientX, clientY, ctrlKey,
	//           altKey, shiftKey, metaKey, button, relatedTarget);

	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0 /*left*/ , null);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}


// anonymous function to wrap first word of a target phrase. currently set to make first word of page name bold.
/*$(document).ready(function() {
	(function () { 
	var node = $(".hero-short__title").contents().filter(function () { return this.nodeType == 3 }).first(),
		text = node.text(),
		first = text.slice(0, text.indexOf(" "));

	if (!node.length)
		return;

	node[0].nodeValue = text.slice(first.length);
	node.before('<strong>' + first + '</strong>');
	})(); 
	
	//var tempArray = $('.hero-short__title').text().split(" ");
	//console.log(tempArray[0])

	
});*/


function foreach(objs, fn) {
	for (var i = 0, len = objs.length; i < len; i++) {
		fn(objs[i]);
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function doScrollTo(str, e) {
	// str == 'top' to go to top of page
	//console.log(window.headerWaypointOffset);
	Waypoint.disableAll();

	if (str == "top") {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			{
				duration: 400,
				easing: "easeOutQuad",
				complete: function () {
					Waypoint.enableAll();
					$(".hero-short").removeClass("hero-short--collapsed");
				},
			}
		);
	} else {
		var hero_short_collapsed_height = 111;
		//$('.hero-short').removeClass('hero-short--collapsed');

		$("html, body").animate(
			{
				scrollTop:
					$("#" + str).offset().top -
					(hero_short_collapsed_height + Number($(".hero-short").css("margin-top").replace("px", "")) + 20),
			},
			{
				duration: 400,
				easing: "easeOutQuad",
				complete: function () {
					Waypoint.enableAll();
					//$('.hero-short').addClass('hero-short--collapsed');
				},
			}
		);
		$(".hero-short").addClass("hero-short--collapsed");
	}
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Get length of JS Object

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
//var size = Object.size(myObj);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Object Filter

Object.filter = function (obj, predicate, filterBy) {
  return Object.keys(obj).filter(function (key) {
	if (filterBy == "key") {
		return predicate(key);
	} else {
		return predicate(obj[key]);
	} 
  }).reduce(function (res, key) {
    return res[key] = obj[key], res;
  }, {});
};

/* 
example usage:

var ages = {
  John: 22,
  Sarah: 33,
  Janet: 18
};

var filtered1 = Object.filter(ages, function (age) {
  return age > 18;
}, "value");

var filtered2 = Object.filter(ages, function (name) {
  return name == "John";
}, "key");

console.log(filtered1);

expected output:
  Object {
    John: 22,
    Sarah: 33
  }

console.log(filtered2);

expected output:
  Object {
    John: 22
  }

*/


function setCSS(objs, css) {
	foreach(objs, function (e) {

		if (document.getElementById(e)) {

			document.getElementById(e).setAttribute('style', css);
			//console.log(document.getElementById(e).style,x,css[x]);

		}
	});
}

if (!Object.keys) {
	Object.keys = (function () {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({
				toString: null
			}).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [],
				prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}

if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun /*, thisArg*/ ) {
		'use strict';

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

function get_basic_xmlhttp() {

	var req = false;
	try {
		req = new XMLHttpRequest();
	} catch (err1) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (err2) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (err3) {
				req = false;
			}
		}
	}
	return req;

}

function basic_ajax(type, fn, params) {
	var basic_xmlhttp = get_basic_xmlhttp();
	var url = "ajax-request-page.php";
	params += "&type=" + type;
	basic_xmlhttp.open("POST", url, true);
	basic_xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	basic_xmlhttp.setRequestHeader("Connection", "close");
	basic_xmlhttp.onreadystatechange = function () {
		if (basic_xmlhttp.readyState == 4 && basic_xmlhttp.status == 200) {
			if (fn) fn();
		}
	};
	basic_xmlhttp.send(params);

}

function sortDataArray(sortBy, data) {

	data.sort(function(a,b) {

		switch (sortBy) {
			case 'dateasc':
					var aDate = a.startdate.date.split(' ');
					var bDate = b.startdate.date.split(' ');
					return ( ( aDate[0] > bDate[0]) ? -1 : ( ( aDate[0] < bDate[0]) ? 1 : 0 ) );
				break;
			case 'datedesc':
					var aDate = a.startdate.date.split(' ');
					var bDate = b.startdate.date.split(' ');
					return ( ( aDate[0] < bDate[0]) ? -1 : ( ( aDate[0] > bDate[0]) ? 1 : 0 ) );
				break;
			case 'dateandtimeasc':
					var aDate = a.startdate.date;
					var bDate = b.startdate.date;
					return ( ( aDate > bDate ) ? -1 : ( ( aDate < bDate ) ? 1 : 0 ) );
				break;
			case 'dateandtimedesc':
					var aDate = a.startdate.date;
					var bDate = b.startdate.date;
					return ( ( aDate < bDate ) ? -1 : ( ( aDate > bDate ) ? 1 : 0 ) );
				break;
			case 'alphaasc':
					var aName = a.title;
					var bName = b.title;
					return ( ( aName < bName ) ? -1 : ( ( aName > bName ) ? 1 : 0 ) );
				break;
			case 'alphadesc':
					var aName = a.title;
					var bName = b.title;
					return ( ( aName > bName ) ? -1 : ( ( aName < bName ) ? 1 : 0 ) );
				break;
			case 'dateandname':
					var aDate = a.startdate.date.split(' ');
					var bDate = b.startdate.date.split(' ');
					var aName = a.title;
					var bName = b.title;
					var cmp = function (x, y){
						return x > y ? 1 : x < y ? -1 : 0;
					};
				return cmp(
					[cmp(bDate[0], aDate[0]), -cmp(bName, aName)],
					[cmp(aDate[0], bDate[0]), -cmp(aName, bName)]
				);

			break;
			default: {} // No sorting. API dictates order
		}

	});

	return data;
}// closes sortBy


function sortDataArray_v2(sortBy, data) {
	
	data.sort(function(a,b) {
		
		switch (sortBy) {
			case 'dateasc':
					var aDate = a.startdate.split(' ');
					var bDate = b.startdate.split(' ');
					return ( ( aDate[0] > bDate[0]) ? -1 : ( ( aDate[0] < bDate[0]) ? 1 : 0 ) );
				break;
			case 'datedesc':
					var aDate = a.startdate.split(' ');
					var bDate = b.startdate.split(' ');
					return ( ( aDate[0] < bDate[0]) ? -1 : ( ( aDate[0] > bDate[0]) ? 1 : 0 ) );
				break;
			case 'dateandtimeasc':
					var aDate = a.startdate;
					var bDate = b.startdate;
					return ( ( aDate > bDate ) ? -1 : ( ( aDate < bDate ) ? 1 : 0 ) );
				break;
			case 'dateandtimedesc':
					var aDate = a.startdate;
					var bDate = b.startdate;
					return ( ( aDate < bDate ) ? -1 : ( ( aDate > bDate ) ? 1 : 0 ) );
				break;
			case 'alphaasc':
					var aName = a.title;
					var bName = b.title;
					return ( ( aName < bName ) ? -1 : ( ( aName > bName ) ? 1 : 0 ) );
				break;
			case 'alphadesc':
					var aName = a.title;
					var bName = b.title;
					return ( ( aName > bName ) ? -1 : ( ( aName < bName ) ? 1 : 0 ) );
				break;
			case 'typeanddate':
					var aType = a.type;
					var bType = b.type;
					var aDate = a.startdate;
					var bDate = b.startdate;
					var cmp = function (x, y){
						return x > y ? 1 : x < y ? -1 : 0;
					};
					return cmp(
						[-cmp(bType[0], aType[0]), cmp(bDate[0], aDate[0])],
						[-cmp(aType[0], bType[0]), cmp(aDate[0], bDate[0])]
					);
				break;
			case 'dateandname':
					var aDate = a.startdate.split(' ');
					var bDate = b.startdate.split(' ');
					var aName = a.title;
					var bName = b.title;
					var cmp = function (x, y){
						return x > y ? 1 : x < y ? -1 : 0;
					};
				return cmp(
					[cmp(bDate[0], aDate[0]), -cmp(bName, aName)],
					[cmp(aDate[0], bDate[0]), -cmp(aName, bName)]
				);

			break;
			default: {} // No sorting. API dictates order
		}

	});
	
	return data;
}// closes sortBy


var drawFundInception = function (tickerStr) {

	var returnString = null;
	tickerStr = tickerStr.toLowerCase();

	for (var i = 0; i < fund_map.length; i++) {

		if (fund_map[i].tickerArray[0] == tickerStr || fund_map[i].tickerArray[1] == tickerStr) {
			returnString = fund_map[i].inceptionDate;
		}
	}

	if (returnString != null) {
		document.write(returnString);
	} else {
		document.write("Missing Data");
	}

}

// use:
//<script>drawFundInception('zzzzz');</script>




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 




// (ticker) => writes to document String date or 'missing data'
// will search FundMap in website_config.php for fund and get long-hand date
// expecting lowercase string

var drawFundInception__long = function (tickerStr) {

	var returnString = null;
	tickerStr = tickerStr.toLowerCase();

	for (var i = 0; i < fund_map.length; i++) {

		if (fund_map[i].tickerArray[0] == tickerStr || fund_map[i].tickerArray[1] == tickerStr) {
			returnString = fund_map[i].inceptionDate__long;
		}
	}

	if (returnString != null) {
		document.write(returnString);
	} else {
		document.write("Missing Data");
	}

}

// use:
//<script>drawFundInception__long('zzzzz');</script>




// (ticker) => will return String date or 'missing data'
// will search FundMap in website_config.php for fund and get short-hand date
// expecting lowercase string

var getFundInception = function (tickerStr) {

	var returnString = null;
	tickerStr = tickerStr.toLowerCase();

	for (var i = 0; i < fund_map.length; i++) {

		if (fund_map[i].tickerArray[0] == tickerStr || fund_map[i].tickerArray[1] == tickerStr) {
			returnString = fund_map[i].inceptionDate;
		}
	}

	if (returnString != null) {
		return returnString;
	} else {
		return "Missing Data";
	}

}

// use:
//<script>getFundInception('zzzzz');</script>


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 




// (ticker) => will return String date or 'missing data'
// will search FundMap in website_config.php for fund and get long-hand date
// expecting lowercase string

var getFundInception__long = function (tickerStr) {



	var returnString = null;
	tickerStr = tickerStr.toLowerCase();

	for (var i = 0; i < fund_map.length; i++) {

		if (fund_map[i].tickerArray[0] == tickerStr || fund_map[i].tickerArray[1] == tickerStr) {
			returnString = fund_map[i].inceptionDate__long;
		}
	}

	if (returnString != null) {
		return returnString;
	} else {
		return "Missing Data";
	}

}

// use:
//<script>getFundInception__long('zzzzz');</script>



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// (ticker) => writes to document String fund title or 'missing data'
// will search FundMap in website_config.php for fund and get fund title

var drawFundTitle = function (tickerStr) {

	var returnString = null;
	tickerStr = tickerStr.toLowerCase();

	for (var i = 0; i < fund_map.length; i++) {

		if (fund_map[i].tickerArray[0] == tickerStr || fund_map[i].tickerArray[1] == tickerStr) {
			returnString = fund_map[i].title;
		}
	}

	if (returnString != null) {
		document.write(returnString);
	} else {
		document.write("Missing Data");
	}

}

// use:
//<script>drawFundTitle('zzzzz');</script>

// ============ Adds active class to selected radio button for PFBC Form. 
// Use for styling radio buttons in Firefox by hiding radio and using a .radio:before selector.

$(document).ready(function () {
	$('.radio input[type=radio]').click(function (event) {
		$('.radio input[type=radio]').parent().removeClass('active');
		$('.radio input[type=radio]:checked').parent().addClass('active');
	});

	$('.radio input[type=radio]:checked').parent().addClass('active');
});
$(document).ready(function () {
	$('.checkbox input[type=checkbox]').click(function (event) {
		$('.checkbox input[type=checkbox]').parent().removeClass('active');
		$('.checkbox input[type=checkbox]:checked').parent().addClass('active');
	});

	$('.checkbox input[type=checkbox]:checked').parent().addClass('active');
});




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// fire draw function on window resize completion. Found code here:
// https://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
// https://jsfiddle.net/h6h2pzpu/3/
/* Usage: 
$(window).resize(function () {
	waitForFinalEvent(function () {
		yourFunctionCallHere(); 
	}, 500, "yourUniqueIDHere");
});
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout(timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();



// appendTicker function
function appendTicker() {
			
	$('[data-appendticker]').each(function () {
		var dataAppendTo = $(this).data();
		var attributeType = dataAppendTo.appendticker.split("-");
		// option to tell it which ticker in the array to use by adding data-appendticker="X"
		if (dataAppendTo.fundclass != undefined) {
			// use data-class and data-fund if they are set.
			var thisTicker = thisFundArray[dataAppendTo.fundclass].toLowerCase();
		} else {
			// no array position specified. use the first available ticker
			var thisTicker = thisFundArray[0].toLowerCase();
		}
		// appends the ticker to the attribute passed in from data-appendticker
		if (dataAppendTo.appendticker == 'href') {
			// adds the ticker to the end of the current url
			$(this).attr(dataAppendTo.appendticker, this.href + thisTicker);
		} else if (dataAppendTo.appendticker == 'class') {
			// adds the ticker to the end of the current classlist
			$(this).attr(dataAppendTo.appendticker, this.classList + thisTicker);
		} else if (dataAppendTo.appendticker == 'id') {
			// adds the ticker to the end of the current id
			$(this).attr(dataAppendTo.appendticker, this.id + thisTicker);
		} else if (dataAppendTo.appendticker == 'data') {
			// adds the ticker to the end of the current data attribute
			$(this).attr(dataAppendTo.appendticker, $(this).attr('data') + thisTicker);
		} else {
			// default overwrites the attribute rather than appending
			$(this).attr(dataAppendTo.appendticker, thisTicker);
			// updates data as well, because updating the attribute doesn't make the ticker available in $(this).data();
			$(this).data(attributeType[1], thisTicker);

		}
	});
	
}

// run appendTicker on document.ready
$(document).ready(function () {
	appendTicker();
});


// appendFundName and prependFundName functions
$(document).ready(function () {
	
	// append fund name
	$('[data-appendfundname]').each(function () {
		var dataAppendTo = $(this).data();
		// option to tell it which ticker in the array to use by adding data-appendticker="X"
		if (dataAppendTo.fundclass != undefined) {
			// use data-class and data-fund if they are set.
			var thisFundName = getMapInfo('fund_map',thisFundArray[dataAppendTo.fundclass],'pageName');
		} else {
			// no array position specified. use the first available ticker
			var thisFundName = getMapInfo('fund_map',thisFundArray[0],'pageName');
		}
		// appends the ticker to the attribute passed in from data-appendticker
		if (dataAppendTo.appendfundname == 'href') {
			// adds the ticker to the end of the current url
			$(this).attr(dataAppendTo.appendfundname, function () {
				return this.href + thisFundName;
			});
		} else if (dataAppendTo.appendfundname == 'rel') {
			// adds the ticker to the end of the current classlist
			$(this).attr(dataAppendTo.appendfundname, function () {
				return dataAppendTo.rel + thisFundName;
			});
		} else if (dataAppendTo.appendfundname == 'class') {
			// adds the ticker to the end of the current classlist
			$(this).attr(dataAppendTo.appendfundname, function () {
				return this.classList + thisFundName;
			});
		} else if (dataAppendTo.appendfundname == 'id') {
			// adds the ticker to the end of the current id
			$(this).attr(dataAppendTo.appendfundname, function () {
				return this.id + thisFundName;
			});
		} else if (dataAppendTo.appendfundname == 'data') {
			// adds the ticker to the end of the current data attribute
			$(this).attr(dataAppendTo.appendfundname, function () {
				return $(this).attr('data') + thisFundName;
			});
		} else {
			// default overwrites the attribute rather than appending
			$(this).attr(dataAppendTo.appendfundname, function () {
				return thisFundName;
			});
		}
	});
	// prepend fund name
	$('[data-prependfundname]').each(function () {
		var dataPrependTo = $(this).data();
		//console.log(dataPrependTo)
		// option to tell it which ticker in the array to use by adding data-appendticker="X"
		if (dataPrependTo.fundclass != undefined) {
			// use data-class and data-fund if they are set.
			var thisFundName = getMapInfo('fund_map',thisFundArray[dataPrependTo.fundclass],'pageName');
		} else {
			// no array position specified. use the first available ticker
			var thisFundName = getMapInfo('fund_map',thisFundArray[0],'pageName');
		}
		// appends the ticker to the attribute passed in from data-appendticker
		if (dataPrependTo.prependfundname == 'href') {
			// adds the ticker to the end of the current url
			$(this).attr(dataPrependTo.prependfundname, function () {
				return "../"+thisFundName + $(this).attr('href');
			});
		} else if (dataPrependTo.prependfundname == 'rel') {
			// adds the ticker to the end of the current classlist
			$(this).attr(dataPrependTo.prependfundname, function () {
				return "../"+thisFundName + $(this).attr('rel');
			});
		} else if (dataPrependTo.prependfundname == 'class') {
			// adds the ticker to the end of the current classlist
			$(this).attr(dataPrependTo.prependfundname, function () {
				return thisFundName + this.classList;
			});
		} else if (dataPrependTo.prependfundname == 'id') {
			// adds the ticker to the end of the current id
			$(this).attr(dataPrependTo.prependfundname, function () {
				return thisFundName + this.id;
			});
		} else if (dataPrependTo.prependfundname == 'data') {
			// adds the ticker to the end of the current data attribute
			$(this).attr(dataPrependTo.prependfundname, function () {
				return thisFundName + $(this).attr('data');
			});
		} else {
			// default overwrites the attribute rather than appending
			$(this).attr(dataPrependTo.prependfundname, function () {
				return thisFundName;
			});
		}
	});
});

// - - - - - - - - - - - - - -Styled Selects- - - - - - - - - - - - -


function styledSelect() {
	// Iterate over each select element
	$('.styled-select:not(.s-hidden)').each(function () {
		// Cache the number of options
		var $this = $(this),
			numberOfChildren = $(this).children().length,
			numberOfOptions = $(this).children('option').length,
			numberOfSubOptions = ($(this).children('optgroup').length) - 1;
		// Hides the select element
		$this.addClass('s-hidden');
		// Wrap the select element in a div
		$this.wrap('<div class="select"></div>');
		// Insert a styled div to sit over the top of the hidden select element
		$this.after('<div class="styledSelect" tabindex="0" aria-haspopup="listbox"></div>');
		// Cache the styled div
		var $styledSelect = $this.next('div.styledSelect');
		// Show the first select option in the styled div
		if ($this.children('optgroup').length > 0) {
			$styledSelect.text($this.children('optgroup').eq(0).text());
		} else {
			$styledSelect.text($this.children('option').eq(0).text());
		}
		// Insert an unordered list after the styled div and also cache the list
		var $list = $('<ul />', {
			'class': ($this.data('scroll') ? 'options opt-scroll ' : 'options ') + $this.attr('id') + '',
			'role': 'listbox'
		}).insertAfter($styledSelect);
		// Insert a list item into the unordered list for each select option
		for (var i = 0; i < numberOfChildren; i++) {
			if ($this[0].children[i].tagName !== 'OPTGROUP') {
				$('<li />', {
					html: $this.children()[i].innerHTML
						.split(' / ').join(' / <span style="font-weight:bold">'),
					rel: $this.children().eq(i).val(),
					tabindex: 0,
					role: 'option'
				}).appendTo($list);
			} else {
				if ($this.children()[i + 1].tagName == 'OPTGROUP') {
					$('<li />', {
						html: $this.children()[i].label,
						class: 'mainoptgroup'
							//rel: $this.children('optgroup').eq(i).val()
					}).appendTo($list);
				} else {
					$('<li />', {
						html: $this.children()[i].label,
						class: 'suboptgroup'
							//rel: $this.children('optgroup').eq(i).val()
					}).appendTo($list);
				}
			}
		}
		// remove placeholder item from tabindex
		$('li[rel="init"]').attr('tabindex', -1);
		// Cache the list items
		var $listItems = $list.children('li');
		// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('div.styledSelect.active').each(function () {
				$(this).removeClass('active').next('ul.options').hide();
			});
			$(this).toggleClass('active').next('ul.options').toggle();
		});
		
		// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
		// Updates the select element to have the value of the equivalent option
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			if (!$(this).hasClass("mainoptgroup") && !$(this).hasClass("suboptgroup")) {
				// check for literature and performance select

				if ($(this).parent().hasClass('distributionsDropdown')) {
					filterDistributions($(this).attr('rel'));
				} else if ($(this).parents('.newsYear').length) {
					filterFundNews($(this).attr('rel'));
				} else if ($(this).parents('.s19Year').length) {
					filterS19s($(this).attr('rel'));
				}
				else {
					// default is to redirect to page.
					window.location = document.getElementsByTagName('base')[0].href + '../' + $(this).attr('rel');
				}
			}
			$list.hide();
		});

	});
	
	$('.styledSelectMobile').click(function (e) {
		e.stopPropagation();
		$('div.styledSelectMobile.active').each(function () {
			$(this).removeClass('active').next('ul.options').hide();
		});
		$(this).toggleClass('active').next('ul.options').toggle();
	});



	// Hides the unordered lists when clicking outside of them
	$(document).click(function () {
		$('.styledSelectMobile, .styledSelect').removeClass('active');
		$('.styledSelect, .styledSelectMobile').next('.options').hide();
	});
	
	
	$( '.styledSelect, .styledSelectMobile' ).on( "click", function() {
		if ($(this)[0].hasAttribute('aria-expanded')) {
			$(this).removeAttr('aria-expanded');
		} else {
			$(this).attr('aria-expanded','true');
		}	
	});
	

	$( ".styledSelectMobile ~ .options [role='option']" ).on( "click", function(e) {
		e.preventDefault();
		Waypoint.disableAll();
		// set hero-short to zero so it doesn't add extra top padding to waypoint when page first loads.
		$('.hero-short').addClass('hero-short--collapsed');
		 // hero-short height plus padding and borders
		var scrollToPadding = $('.hero-short').height() + 90;
		var href = $(this).attr('rel');
		$(this).parent().toggle();
		$('.styledSelectMobile').html($(this).text());
		$('.hero-short').addClass('hero-short--collapsed');
		$(".subnav__wrapper").addClass("subnav__wrapper--fixed");
		
		if (href.match("^#")) {
		   // treat href as anchor if it begins with #
			$('html, body').animate({
				scrollTop: $(href).offset().top - scrollToPadding
			}, 200).promise().done(function () {
				Waypoint.enableAll();
			});	
		} else {
			// load new window as link by default
			window.location = href;	
		}
		
	});

	$(".subnavDropdown").hide();

	$(".styledSelect").html(
		$(".subnavDropdown li")
			.eq($(".subnav > li").index($(".active")) + 1)
			.html()
	);

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


var calculateDayOfYear = function () {

	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	//console.log('Day of year: ' + day);

	return parseFloat(day);

}


var calculateSlideToDisplay = function (num) {

	var tempDayofYear = num;
	var numSlides = 4;
	while (tempDayofYear > numSlides) {
		tempDayofYear -= numSlides;
	}

	return tempDayofYear;

}


function verifyData(data) {
	if (data != undefined && !$.isEmptyObject(data[0]) && data != "[]" && data != "{}" && data != "") {
		return true;	
	} else {
		return false;
	}
}


function formatDollar (value) {
	if (value != null && value != undefined) {
		return "$" + Number(value).toFixed(2);
	} else {
		return "-";
	}
}

function formatPercentage (value) {
	if (value != null && value != undefined) {
		return parseFloat(value*100).toFixed(2)+"%";
	} else {
		return "-";
	}
}

function addCommasDollar (value) {
	if (value != null && value != undefined) {
		return '$' + Number(value).toLocaleString('en');
	} else {
		return "-";
	}
}

function addCommas (value) {
	if (value != null && value != undefined) {
		return Number(value).toLocaleString('en');
	} else {
		return "-";
	}
}

function testDefined (value) {
	if (value != null && value != undefined) {
		return Number(value).toFixed(2);
	} else {
		return "-";
	}
}

/* 
RESPONSIVE TEXT:
To use, add a data-responsivetext attribute to the element you want to swap with an object containing mobile and desktop keys/values:
data-reponsivetext='{"mobile":"Mobile Display Text", "desktop":"Desktop Display Text"}' 
*/

function swapResponsiveText(breakpoint) {
	if (window.innerWidth < breakpoint) {
		$.each($('[data-responsivetext]'), function(i,val) {
			var mobileText = $(val).data('responsivetext').mobile;
			$(val).text(mobileText);
		});
	} else {
		$.each($('[data-responsivetext]'), function(i,val) {
			var desktopText = $(val).data('responsivetext').desktop;
			$(val).text(desktopText);
		});
	}
}

$(document).ready(function() {
	swapResponsiveText(962);
});

$(window).resize(function() {
	swapResponsiveText(962);
});


/////////// 
/* 
Returns all primary tickers. 
Accepts targetMap as an argument with a default of fund_map. 
*/

function getAllPrimaryTickers(targetMap) {
	
	var tempArray = [];
	
	if (!targetMap) targetMap = "fund_map";
	
	for(var i=0;i<window[targetMap].length;i++) {
		tempArray.push(window[targetMap][i].tickerArray[0]);
	}
	
	if(!tempArray){
		tempArray = "N/A"; // didn't find info	
	}
	
	return tempArray; 
}






