/*--------
  Array |   				
---------*/

// php = in_array()
// checks for existence of value (val) in array (this)
Array.prototype.inArray = function(val){ 
    return new RegExp('(^|\,)'+val+'(\,|$)','gi').test(this);
} 

//php = array_diff()
// returns values that are not in argument array - only works with indexed arrays.
Array.prototype.diff = function(arr) {
	for (var i = 0; i < arr.length; i+= 1) {
		for (var j = 0; j < this.length; j+= 1) {
        if (this[j] === arr[i]) {
            this.splice(j,1);
        	}
		}
	}
	return this;
}

//php = array_intersect()
// returns all matches between this and argument array - only for indexed arrays
Array.prototype.intersect = function(arr) {
    var temp = [];
    var x = 0;
    for (var i = 0; i < arr.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
            if (arr[i] === this[j]) {
                if (!temp.inArray(arr[i])) {
                    temp[x] = arr[i];
                    x += 1;
                }
            }
        }
    }
    return temp;
}

//php = shuffle()
// shuffles this array
Array.prototype.shuffle = function() {
   for(var i = 0; i < (this.length - 1); i+= 1) {
			var rand = i + Math.round((Math.random() % (this.length - 1))); /* pick random number from array */
			var temp = this[i]; this[i] = this[rand]; this[rand] = temp; /* switch value with random value */
		}
	return this;
}

// php = array_rand()
// returns a random value from the array
Array.prototype.random = function() {
	return this[Math.round(Math.random() * this.length)];
}

// php = array_multisort()
// sort multidimensional array
Array.prototype.multisort = function() {
	var arr = this.sort();
	for (var i = 0; i < arr.length; i += 1) {
		if(arr[i] instanceof Array) {
			arr[i].multisort();
		}
	}
	return arr;
}

// turns a multidimensional array into single dimension
Array.prototype.implode = function() {
    var arr = this.toString().split(',');
    return arr;
}


// php = array_chunk(number)
// splits array into chunks
Array.prototype.chunk = function(size) {
	if (size < 1 || size > (this.length - 1)) { 
		throw new Error('Arguments should be greater than 1 and less then length of array'); } 
	else {
		var chunk = [size]; 
		var chnks = Math.floor(this.length / size);
		var remainder = this.length % size;
		
		for (var i = 0; i < size; i+= 1) {
			chunk[i] = this.splice(0,chnks); 
			if (i == (size-1) && remainder > 0) {
				for(var j = 1; j < remainder+1; j+= 1) {
					chunk[i].push(parseInt(this.splice(0,j)));
				}
			}
		}
		return chunk;
	}
};

// php = array_each()
// iterates through each key in an array everytime it is called
Array.prototype.each = (function() {
    var i = 0;
    return function() { return this[i++] };
})();




/*--------
  String |   				
---------*/

// ruby = .reverse
// reverses the string
String.prototype.reverse = function() {
	var wordArray = [this.length];
	for (var i=0; i<this.length; i+=1) {
		wordArray[i] = this[i];
	}
	wordArray = wordArray.reverse() + "";
    return wordArray.replace(/,/gi, "");
}

// php = explode()
// turns a string into an array
String.prototype.explode = function(this) {
	var wordArray = [this.length];
	for (var i=0; i<this.length; i+=1) {
		wordArray[i] = this[i];
	}
    return wordArray;
}

// php = count_chars()
// returns  number of times a character is matched - case insensitive
String.prototype.countChars = function(char) {
    len = 0;
    for(var i=0; i<this.length; i++) {
        if (new RegExp(char,'gi').test(this[i])) {
            len++;
        }
    } 
    return len;
}


/*-------------
	Date	
--------------*/

// returns clearly formatted current time
Date.prototype.clearTime = function(loc) {
	var d = new Date;
	function roundUp(num) {
		if (num < 10) { return "0" + num ; }
	}
	if (typeof document.getElementById(loc).textContent == "string") {
		setTimeout()
	} else {
		return d.getHours() + ':' + roundUp(d.getMinutes()) + ':' + roundUp(d.getSeconds());
	}
}

/*--------------------
	Utility Functions
----------------------*/

*/


// function for prototypal inheritance
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

//function for copying all properties for inheritance
function extend2(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

// SHALLOW COPY returns a new object that inherits all properties of object used as argument
function shallowCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
}
    c.uber = p;
    return c;
}

// DEEP COPY , child inherits all properties,objects but you can edit them without affecting parents props/obj
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
} else {
    c[i] = p[i];
}
}
    return c;
}

// returns new object with argument as its prototype
function object(o) {
    var n;
    function F() {};
    F.prototype = o;
    n = new F();
    n.uber = o;
    return n;
}

// returns new object that has first parameter as prototype and inherits addition props/methods of second argument
function objectPlus(o, stuff) {
    var n;
    function F() {};
    F.prototype = o;
    n = new F();
    n.uber = o;

    for (var i in stuff) {
        n[i] = stuff[i];
    }
    
    return n;
}

// returns new object that inherits from unlimited number of objects passed as arguments
function multi() {
    var n = {}, stuff, j=0, len = arguments.length;
    for (j = 0; j < len; j++) {
        stuff = arguments[j];
        for (var i in stuff) {
            n[i] = stuff[i];
        }
    }
    return n;
}

// iterate through the DOM recursively
function walkDom(n) {
    do {
        console.log(n); // can use document.write instead
    if (n.hasChildNodes()) {
        walkDom(n.firstChild)
        }
    } while (n = n.nextSibling)
}

// cross browser event listening
function callback(evt) {
	// prep work
		evt = evt || evt.window;
		var target = (typeof evt.target !== 'undefined') ? evt.target : evt.srcElement; 
	// actual callback function goes here
		console.log(target.nodeName);
}


// AJAX

// callback function for onreadystatechange
function callback() {
	if (xhr.readyState < 4) {
		return; // not ready yet
	}
	if (xhr.status !== 200) {
		alert('Status Error'); // HTTP Status is not OK
	}
	// if above is ok then run the actual callback function
	alert(xhr.responseText);
}

// cross browser function that returns an ajax object
function createAjax() {
var ids = ['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP']
var xhr;
if (typeof window.XMLHttpRequest === 'function' || 'object') {
    xhr = new XMLHttpRequest();
} else {
    for (var i = 0; i < ids.length; i++) {
		try {
			xhr = newActiveXObject(ids[i]);
			break;
    } catch (e) {alert('No Ajax');}
   }
}
return xhr;
}
// usage: var xhr = createAjax()

// a simple request(url)/response(callback) function that creates object, requests data
function request(url,callback) {
	var xhr = createAjax();
	xhr.onreadystatechange = (function(myxhr) {
		return function() {
			callback(myxhr);
			}
		})(xhr);
	xhr.open('GET', url, true);
	xhr.send('');
}
// usage: request('content.txt',function(o) {document.getElementById('text').innerHTML = o.responseText;}); - where o is the xhr object

// Cross browser Event Listener
function addEvent(el, eType, fn, uC) {
	if (el.addEventListener) {
		el.addEventListener(eType, fn, uC);
		return true;
	} else if (el.attachEvent) {
		return el.attachEvent('on' + eType, fn);
	} else {
		el['on' + eType] = fn;
	}
} // usage: addEvent(document.getElementByID('idname'),'click',functionname,false);

// Cross browser stop propogation & stop default
function stopProp(e) {
	if (e && e.stopPropogation) e.stopPropogation();
		else if (window.event && window.event.cancelBubble)
		window.event.cancelBubble = true;
	}
function stopDef(e) {
	if (e &&e.preventDefault) e.preventDefault();
		else if (window.event && window.event.returnValue)
		window.eventReturnValue = false;
} 

// Global object 
var MYAPP = MYAPP || {};

// DOM Utility
MYAPP.dom = {}
// Element constructor, which takes an array of attributes (prop)
MYAPP.dom.Element = function(type,prop) {
	var tmp = document.createElement(type);
	for (var i in prop) {
		tmp.setAttribute(i, prop[i]);
	}
	return tmp;
}

// Text node constructor
MYAPP.dom.Text = function(txt) {
	return document.createTextNode(txt);
}

// (CONFIGURATION OBJECT)
// example
MYAPP.dom.Button = function(conf) {
    var i = 0;
    var b = document.createElement('input');
    b.id = conf.id || 'myButton'; // uses smart defaults in case the object passed is paramter does not contain the paramater needed
    b.value = conf.value || 'Submit';
    b.className = conf.class || '';
    b.type = conf.type || 'Button';
    return b;
}
// initialise configuration object - var config = {value:'Search', class:'noclass'}
// passing it as an argument to a constructor function - var a = new MYAPP.dom.Button(config);
 