<?php
$user = $_REQUEST['user'];
if (!isset($user) || $user === ''){
	$user = 'simonlidesign';
}
$homepage = file_get_contents('https://twitter.com/status/user_timeline/'.$user);
echo $homepage;
?>