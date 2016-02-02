##Bitcoin Tracker

###TBC.
This project has been shelved for awhile. Was used as an introduction to the Mean stack. Lots of features need to be added and a lot of tidy up work should be done.   

To get working you must provide a configuration file.
config/default.json

 "dbConfig": {
   "url": <<URL>>
 },
 "auth": {
   "secret": <<SECRET>>
 }

###To run:

Make sure a mongodb instance is running and you have put the url in config/default.json. You can start mongo with the command mongod.  

node server.js
gulp
