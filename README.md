# UK-TicketUpdater
Ein kleines Script zum automatisieren des monatlichen Downloads des Semstertickets.

Die Datei `ticket-downloader.js` beinhaltet das eigentliche Download-Script, die Datei `ticket-uploader.sh` ist ein Beispiel, wie man das Ticket nach dem Download automatisch in eine Cloud laden kann. Ich nutze dafür NextCloud, es sollte aber ohne Probleme an jede andere Cloud anpassbar sein (ChatGPT/Copilot/... ist dein Freund). Alternativ zu einem eigenen Upload-Script kann auch [rclone](https://rclone.org/) genutzt werden.

Das Download-Script einfach auf einem Linux-System mit nodejs, puppeteer und chromium-browser ablegen und per Cronjob immer am Ersten des Monats ausführen lassen.

## Wie installiere ich nodejs unter Debian 12?
Auf einem neuen Debian 12:
```
apt update && apt upgrade -y
apt install nodejs npm
apt install chromium
```

Danach noch einen Benutzer für nodejs anlegen:
```
adduser nodejs
```

Zum neuen Nutzer wechseln:
```
su nodejs
cd ~
```

Und puppeteer installieren:
```
npm install puppeteer
```

Das Script sollte nun mit dem nodejs Benutzer ausführbar sein.

## Wie erstelle ich einen Cronjob?
Die crontab-Datei öffnen und mit dem Editor deiner Wahl barbeiten:
```
crontab -e
```

Am Ende der Datei folgende Zeile hinzufügen:
```
0 0-10 1 * * /Path/To/Script.sh
```

Jetzt wird das Script immer am ersten des Monats von 0 bis 10 Uhr zu jeder vollen Stunde einmal ausgeführt (Falls die Uni Server ausnahmweise mal Probleme machen sollten).
