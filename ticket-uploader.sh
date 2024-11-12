#!/bin/bash
# init variables
NEXTCLOUD_URL="https://cloud.your-domain.com/remote.php/dav/files/USERNAME/ticket.html"
USERNAME='SuperSafeUsername'
PASSWORD='SuperSafePassword'
DATEI_ZUM_HOCHLADEN='/Path/To/Ticket.html'

# download ticket.html
node /home/nodejs/ticket-downloader.js

# upload ticket.html
wget --method=PUT --user=$USERNAME --password=$PASSWORD --body-file=$DATEI_ZUM_HOCHLADEN $NEXTCLOUD_URL
