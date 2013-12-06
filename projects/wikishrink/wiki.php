<?php



/* This example request includes an optional API key which you will need to
// remove or replace with your own key.
// Read more about why it's useful to have an API key.
// The request also includes the userip parameter which provides the end
// user's IP address. Doing so will help distinguish this legitimate
// server-side traffic from traffic which doesn't come from an end-user.
$url = $_GET["uri"];

// sendRequest
// note how referer is set manually
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_REFERER, 'http://localhost/');
$body = curl_exec($ch);
curl_close($ch);

// now, process the JSON string
//$json = json_decode($body);
// now have some fun with the results...

echo $body;
*/
?>

<?php

// setting user agent for digg



function httpGet($url, $ttl = 0) 
{
  /* Change this or make it an option as appropriate. If you're
   * getting urls that shouldn't be visible to the public, put the
   * cache folder somewhere it can't be accessed from the web
   */
  $cache_path = dirname(__FILE__).'/cache';


  /* Check the cache first - setting force_refresh True overrides 
   * the check. I'm using crc32() to make URLs safe here; if you're
   * fetching millions of URLs, it might not be different enough to 
   * avoid clashes. If you get collisions, use md5() or something, 
   * and change the sprintf() pattern.
   */
  $cache_file   = sprintf('%s/%08X.dat', $cache_path, crc32($url));
  $cache_exists = is_readable($cache_file);

  /* If the cache is newer than the Time To Live, return it 
   * instead of doing a new request. The default TTL is 1 day.
   */
  if ($ttl && $cache_exists && 
      (filemtime($cache_file) > (time() - $ttl))
     ) 
  {
    return file_get_contents($cache_file);
  }

  /* Need to regenerate the cache. First thing to do here is update
   * the modification time on the cache file so that no one else 
   * tries to update the cache while we're updating it.
   */
  touch($cache_file);
  clearstatcache();


  /* Set up the cURL pointer. It's important to set a User-Agent 
   * that's unique to you, and provides contact details in case your 
   * script is misbehaving and a server owner needs to contact you. 
   * More than that, it's just the polite thing to do. 
   */
  $c = curl_init();
  curl_setopt($c, CURLOPT_URL, $url);
  curl_setopt($c, CURLOPT_TIMEOUT, 15);
  curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($c, CURLOPT_USERAGENT, 'wikiproject - mohamed.zougam@gmail.com');


  /* If we've got a cache, do the web a favour and make a 
   * conditional HTTP request. What this means is that if the  
   * server supports it, it will tell us if nothing has changed - 
   * this means we can reuse the cache for a while, and the 
   * request is returned faster.
   */
  if ($cache_exists) {
    curl_setopt($c, CURLOPT_TIMECONDITION, CURL_TIMECOND_IFMODSINCE);
    curl_setopt($c, CURLOPT_TIMEVALUE, filemtime($cache_file));
  }


  /* Make the request and check the result. */
  $content = curl_exec($c);
  $status = curl_getinfo($c, CURLINFO_HTTP_CODE);

  // Document unmodified? Return the cache file
  if ($cache_exists && ($status == 304)) { 
    return file_get_contents($cache_file);
  }

  /* You could be more forgiving of errors here. I've chosen to 
   * fail hard instead, because at least it'll be obvious when 
   * something goes wrong. 
   */
  if ($status != 200) { 
    throw new Exception(sprintf('Unexpected HTTP return code %d', $status));
  }


  /* If everything is fine, save the new cache file, make sure 
   * it's world-readable, and writeable by the server
   */
  file_put_contents($cache_file, $content);
  chmod($cache_file, 0644);
  return $content;
}

function createUriString($str) {
	$str = ltrim($str); $str = rtrim($str);
	$str = str_replace(" ", "_", $str); 
	return rawurlencode($str);
}

?>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<form name="request" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
<input type="text" name="title" id="title" value="<?php if(isset($_POST['title'])) { echo $_POST['title']; }  ?>"/>
<select name="limit" id="limit">
	<option>10</option>
	<option>30</option>
	<option>50</option>
	<option>100</option>
	<option>500</option>
</select>
<input type="submit" value="Go"/>

<p>
<?php
/* list of results */
if(isset($_POST['title'])) { 
	$searchquery = createUriString($_POST['title']);
	$fetch = 'http://en.wikipedia.org/w/api.php?action=query&list=backlinks&bltitle=' . $searchquery . '&bllimit=' . $_POST['limit'] . '&format=xml';
	$result = httpGet($fetch); 
	$data = simplexml_load_string($result);
	
	foreach($data->query->backlinks as $items) {
		foreach($items->bl as $item) {
			$uri = createUriString($item->attributes()->title);
			echo '<a href="http://en.wikipedia.org/wiki/' . $uri . '" target="_blank">' . $item->attributes()->title . '</a><br/> ';
		}
	}
} 
?>
</p>


</form>
</body>
</html>