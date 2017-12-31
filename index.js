
var atob = require('atob');
var request = require('request');
var fs = require('fs');

var url = 'http://chirb.it/8HEdwm' //(invoke from zappier)

//read the html
request.get(url, function (error, response, body)
{
    if (!error && response.statusCode == 200)
    {
        //give episode name from <div class="chirbit-title">
        var regexp = new RegExp('<div class="chirbit-title">(.*?)</div>');
        var match_array = regexp.exec(body);
        var name = match_array[1]; //the value of chirbit-title
        console.log("chirbit-title: " + name);


        // find 'data-fd' and copy its value
        // i used https://regex101.com/ for help
        var myRegexp = new RegExp('data-fd="(.*?)"');
        var match = myRegexp.exec(body);
        var data_fd = match[1]; //the value of data-fd
        console.log("data-fd: " + data_fd);

        //decrypt the real url
        var soundURL = atob(reverse(data_fd));

        console.log("url: " + soundURL);

        function reverse(s)
        {
            return s.split('').reverse().join('');
        }

        //download the episode
        var fileStream = request(soundURL).pipe(fs.createWriteStream(name+'.mp3'));
        //todo: when episode is expired - email me 'failed'. examine the fileStream. fileStream size = 0 in this case
        //todo: email if failed to save to disc
        fileStream.on('finish', function ()
        {
            //todo: email me the success
            console.log("done!");
        });
    }
    else
    {
        //signal zapier to send me an email with error or response code
        console.log("error: " + error + ". statusCode: " + response.statusCode);
    }
});
