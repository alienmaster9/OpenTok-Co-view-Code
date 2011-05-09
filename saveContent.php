<?php

	require_once 'config.php';

	$sessionId = mysql_real_escape_string($_REQUEST['sessionId']);
	$contentSource = mysql_real_escape_string($_REQUEST['contentSource']);
	$contentState = mysql_real_escape_string($_REQUEST['contentState']);

	$dbObj = mysql_connect(OpenTokCoviewConfig::DB_HOST, OpenTokCoviewConfig::DB_USER, OpenTokCoviewConfig::DB_USER_PASSWORD);
	mysql_select_db(OpenTokCoviewConfig::DB_NAME, $dbObj);

	$query = "INSERT INTO ".OpenTokCoviewConfig::TABLE_NAME."(session_id, content_source, content_state) VALUES('$sessionId', '$contentSource', '$contentState') ON DUPLICATE KEY UPDATE content_source='$contentSource', content_state='$contentState'";

	mysql_query($query, $dbObj);
	
	mysql_close($dbObj);
	
	echo json_encode(array('success' => true));
