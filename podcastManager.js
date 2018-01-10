
var episodeDownloader = require('./episodeDownloader')

/*

left:
check rss every 15 minutes
take new address in xml node
upload episode to self drive
set the file as 'public'
calc *downloadable* link
send to bitly
get its shorten version
update rss xml file in G Drive with shorted link 
delete the local file so my space in Heroku wont fill up

delete all 'chirbit' from source

how to support episode description?
use drive node package?
use bitly node package?

*/


exports.checkAndCreatePodcast = CheckAndAddToPopdcast;

function CheckAndAddToPopdcast()
{
    console.log("checking for new episode");
    
    var url = 'http://chirb.it/8HEdwm' //(invoke from zappier)

    episodeDownloader.parseEpisodeHtmlPage(url);
}
