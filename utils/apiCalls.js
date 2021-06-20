const axios = require('axios')

// const data = {
//     input: "life",
//     source: "en",
//     target: "es"
// }

let x_rapidapi_key
let x_rapidapi_host

exports.getDataFromAPI = (data) => {
    return new Promise((resolve, reject) => {
    
        var config = {
            method: 'get',
            url: 'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source='
                + data.source + '&target=' + data.target + '&input=' + data.input,
            headers: { 
              'x-rapidapi-key': x_rapidapi_key, 
              'x-rapidapi-host': x_rapidapi_host
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
    
}
  
// getDataFromAPI(data).then((value) => {
//     console.log(value);
// }).catch((error) => {
//     console.log(error);
// });