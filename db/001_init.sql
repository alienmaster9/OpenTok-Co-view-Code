create database opentok_coview;

use opentok_coview;

CREATE TABLE coview_state(
	session_id varchar(40) primary key,
	content_source varchar(255) not null,
	content_state varchar(64)
)engine=INNODB;