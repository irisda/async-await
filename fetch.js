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



const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
        const countryNames = response.data.map(country => { return country.name });
        return countryNames;
    } catch (error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`)
    }
    }


    const convertCurrency = async (fromCurrency, toCurrency, amount) => {
        const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);//this will wait until it get the final result
       console.log(exchangeRate)
        const countries = await getCountries(toCurrency);
       const convertedAmount = (amount * exchangeRate).toFixed(2);
        return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spent it in following countries ${countries}`;//1 USD is worth 119 NPR
       }

 convertCurrency('USD', 'EUR', 1)
 .then(message => {
 console.log(message)
 }).catch(err => {
 console.error(err)
 })
