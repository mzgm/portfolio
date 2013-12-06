<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <?php ini_set('user_agent', 'MyFeeds-0.1'); ?>
   
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
 
 <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.16.custom.css" media="screen"/>
 <link rel="stylesheet" href="css/styles.css" media="screen"/>

</head>
<body>
<div id="header">
<div id="headwrap">
<h1>Wikishrink <span>beta</span> </h1> 
<input type="text" name="title" id="title" placeholder="start typing" value="<?php if(isset($_POST['title'])) { echo $_POST['title']; }  ?>"/>
<img src="ajax-loader.gif" id="loading"/>
</div>
		<!--input type="submit" value="Go" id="go"/-->
</div>
<div id="content"> <div id="results">

	</div> </div>


	<div class="left" id="main">
	<div id="controls">


	</div>
	
	
	

	
	</div>
	
</div>
</body>
<script type="text/javascript" src="assets/scripts.js"></script>
</html>