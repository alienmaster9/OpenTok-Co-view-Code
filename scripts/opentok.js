	var apiKey = 1127; // OpenTok sample API key. Replace with your own API key.
	var sessionId = '153975e9d3ecce1d11baddd2c9d8d3c9d147df18'; // Replace with your session ID.
	var token = 'devtoken'; // Should not be hard-coded.

	var session;
	var publisher;
	var subscribers = {};

	TB.addEventListener("exception", exceptionHandler);

    if (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS) {
        alert("You don't have the minimum requirements to run this application."
              + "Please upgrade to the latest version of Flash.");
    } else {
        session = TB.initSession(sessionId);	// Initialize session

        // Add event listeners to the session
        session.addEventListener('sessionConnected', sessionConnectedHandler);
        session.addEventListener('streamCreated', streamCreatedHandler);
    }

    //--------------------------------------
    //  LINK CLICK HANDLERS
    //--------------------------------------
    // Called when user wants to start publishing to the session
    function startPublishing() {
        if (!publisher) {
            var parentDiv = document.getElementById("videobox");
            var publisherDiv = document.createElement('div'); // Create a div for the publisher to replace
            publisherDiv.setAttribute('id', 'opentok_publisher');
            parentDiv.appendChild(publisherDiv);
            publisher = session.publish(publisherDiv.id, {width: "200"}); // Pass the replacement div id to the publish method

			show('unpublishLink');
            hide('publishLink');
        }
    }

    function stopPublishing() {
        if (publisher) {
            session.unpublish(publisher);
        }

        publisher = null;

        show('publishLink');
        hide('unpublishLink');
    }

    //--------------------------------------
    //  OPENTOK EVENT HANDLERS
    //--------------------------------------
    function sessionConnectedHandler(event) {
        // Subscribe to all streams currently in the Session
        for (var i = 0; i < event.streams.length; i++) {
            addStream(event.streams[i]);
        }

        show('publishLink');
    }

    function streamCreatedHandler(event) {
        // Subscribe to the newly created streams
        for (var i = 0; i < event.streams.length; i++) {
            addStream(event.streams[i]);
        }
    }

    function exceptionHandler(event) {
        alert("Exception: " + event.code + "::" + event.message);
    }

    //--------------------------------------
    //  HELPER METHODS
    //--------------------------------------

    function addStream(stream) {
        // Check if this is the stream that I am publishing, and if so do not publish.
        if (stream.connection.connectionId == session.connection.connectionId) {
            return;
        }

        var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
        subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
        document.getElementById("subscribers").appendChild(subscriberDiv);
        subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id);
    }

    function show(id) {
        document.getElementById(id).style.display = 'block';
    }

    function hide(id) {
        document.getElementById(id).style.display = 'none';
    }

