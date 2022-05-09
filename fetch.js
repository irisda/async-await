const axios = require('axios');

// with response variables we are getting the async fetch response 
const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('https://api.apilayer.com/fixer/latest',
        {
            headers: {
                'apikey': 'gUrlhKWj1U4Q7teDPytzHkJ2L0azrKrI'
            }
        }
    )

    const rates = response.data.rates;
    const Npr = 1 / rates[fromCurrency]
    const exchangeRate = Npr * rates[toCurrency];
    //check if exchnage rate is not avaliable 
    if (isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency} `)
    }
}
//This function gives the list of exchnage rate based on  date 
const getPastExchangeRate = async (date) => {
    let response = await axios.get(`https://api.apilayer.com/fixer/${date}?`,
        {
            headers: {
                'apikey': 'gUrlhKWj1U4Q7teDPytzHkJ2L0azrKrI'
            }
        })


return response.data;
}


getPastExchangeRate('2022-03-16');
getExchangeRate('EUR', 'ALL')


// (async () => {
//    try {
//        const directors = await fetch('https://maciejtreder.github.io/asynchronous-javascript/directors').then(response => response.json());
//        const directorId = directors.find(director => director.name === directorToCheck).id;

//        const movies = await fetch('https://maciejtreder.github.io/asynchronous-javascript/directors/' + directorId + '/movies').then(response => response.json());

//        let reviewPromises = [];
//        movies.forEach(movie => {
//            reviewPromises.push(
//                fetch('https://maciejtreder.github.io/asynchronous-javascript/movies/'+ movie.id +'/reviews')
//                .then(response => response.json())
//                .then(reviews => { return {title: movie.title, reviews: reviews}})
//            );
//        });

//        let moviesRating = [];
  
//        for await (let reviewsSet of reviewPromises) {
//            let aggregatedScore = 0;
//            reviewsSet.reviews.forEach(review => aggregatedScore += review.rating);
//            let averageScore = aggregatedScore / reviewsSet.reviews.length;
//            moviesRating.push({title: reviewsSet.title, score: averageScore});
//        }
  
//        const best = moviesRating.sort((movie1, movie2) => movie2.score - movie1.score)[0].title;
      
//        spinner.succeed(best + "!");

//    } catch(error) {
//        spinner.fail(error);
//    }
// })();