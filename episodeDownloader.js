
var atob = require('atob');
var request = require('request');
var fs = require('fs');


function getEpisodeName(body)
{
    //give episode name from <div class="chirbit-title">
    var regexp = new RegExp('<div class="chirbit-title">(.*?)</div>');
    var match_array = regexp.exec(body);
    var name = match_array[1]; //the value of chirbit-title

    console.log("chirbit-title: " + name);

    return name;
}

function getEpisodeDataFd(body)
{
    // find 'data-fd' and copy its value
    // i used https://regex101.com/ for help
    var myRegexp = new RegExp('data-fd="(.*?)"');
    var match = myRegexp.exec(body);
    var data_fd = match[1]; //the value of data-fd

    console.log("data-fd: " + data_fd);

    return data_fd;
}

function reverse(s)
{
    return s.split('').reverse().join('');
}

function errorInDownloadingTheFile(error)
{
    //todo: when episode is expired - email me 'failed'. examine the fileStream. fileStream size = 0 in this case
    console.log("failed to download the episode");
}

function errorInSavingFileToDisc(error)
{
    //todo: email if failed to save to disc
    console.log("failed to save episode to disc");
}

function downloadEpisode(soundURL, name)
{
    var fileStream = request(soundURL)
                .on('error', function(e){errorInDownloadingTheFile(e)})
                .pipe(fs.createWriteStream(name+'.mp3'))
                .on('error', function(e){errorInSavingFileToDisc(e)});

    fileStream.on('finish', function ()
    {
        //todo: email me the success
        console.log("done!");
    });
}

function parseEpisodeHtmlPage(url)
{
    //read the html
    request.get(url, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            name = getEpisodeName(body);
            data_fd = getEpisodeDataFd(body);

            //decrypt the real url
            var soundURL = atob(reverse(data_fd));

            console.log("url: " + soundURL);

            downloadEpisode(soundURL, name);
        }
        else
        {
            //signal zapier to send me an email with error or response code
            console.log("error: " + error + ". statusCode: " + response.statusCode);
        }
    });
}

exports.parseEpisodeHtmlPage = parseEpisodeHtmlPage;