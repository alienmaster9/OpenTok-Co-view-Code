<?php

	require_once 'config.php';

	$sessionId = mysql_real_escape_string($_REQUEST['sessionId']);

	$dbObj = mysql_connect(OpenTokCoviewConfig::DB_HOST, OpenTokCoviewConfig::DB_USER, OpenTokCoviewConfig::DB_USER_PASSWORD);
	mysql_select_db(OpenTokCoviewConfig::DB_NAME, $dbObj);

	$query = "SELECT content_source, content_state FROM ".OpenTokCoviewConfig::TABLE_NAME." WHERE session_id = '$sessionId'";
	$result = mysql_query($query, $dbObj);

	$row = mysql_fetch_array($result);
		
	mysql_close($dbObj);
		
	echo json_encode(
		array(
			"sessionId" => $sessionId,
			"contentSource" => $row['content_source'],
			"contentState" => $row['content_state']
		)
	);
