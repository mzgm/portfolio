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

