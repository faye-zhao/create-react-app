import { credentials } from "./credentials";

export const fetchInstrument = (symbol) => {  
    return new Promise((resolve, reject) => {
        const Robinhood = require('robinhood')(credentials, () => {
            Robinhood.instruments(symbol,function(err, response, body){
                if(err){
                    console.error(err)
                    reject(err)
                }else{
                    resolve(body)
                }
            })
        })
    })
}

export const fetchPositions = () => {  
    return new Promise((resolve, reject) => {
        const Robinhood = require('robinhood')(credentials, function(err, data){
            Robinhood.nonzero_positions(function(err, response, body){
                if (err){
                    console.error(err);
                    reject(err)
                }else{
                    const {results} = body
                    //console.log(results)
                    const positons = results.map(t => {
                        const {symbol, quantity, average_buy_price} = t
                        return {symbol, quantity: Math.round(quantity), cost_basis: Number(average_buy_price)}
                    })
                    resolve(positons)
                }
            });
        });
    })
}

export const placeOrder = ({symbol, price, url, quantity, type}) => {  
    if (!symbol) {
        console.log('Specify symbol')
        return
    }
    if (!price) {
        console.log('Specify price')
        return
    }
    return new Promise((resolve, reject) => {
        const Robinhood = require('robinhood')(credentials, () => {
            const options = {
                type: 'limit',
                quantity: quantity || 1,
                bid_price: price,
                instrument: {
                    url,
                    symbol
                }
                // // Optional:
                // trigger: String, // Defaults to "gfd" (Good For Day)
                // time: String,    // Defaults to "immediate"
                // type: String     // Defaults to "market"
            }
            const func =  (type === 'buy') ? Robinhood.place_buy_order : Robinhood.place_sell_order
            
            func(options, (error, response, body) => {
                if(error){
                    console.error('Order error.', error)
                    reject(error)
                }else{
                    //console.log('Order OK.', body)
                    resolve(body)
                }
            })
        })
    })
}

//price is optional. If not specified, the last price is used
//quantity is optional. If not specified, the quantity of the position is used
export const sell = async ({symbol, quantity, price}) => {
    if (!symbol) {
        console.log('Specify symbol')
        return
    }
    /*
    if (!quantity) {
        console.log('Specify quantity')
        return
    }
    */
    const options = {symbol, quantity}

    const instrumentsBody  = await fetchInstrument(symbol)
    const instrument = instrumentsBody.results.find(t => t.symbol === symbol.toUpperCase())
    
    if (!instrument) {
        console.log('Instrument not found')
        return
    }
    options.url = instrument.url
    //url: 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/',

    if (quantity) {
        options.quantity = quantity
    } else {
        const positions  = await fetchPositions()
        const symbolPosition = positions.find(t => t.symbol.toUpperCase() === symbol.toUpperCase()) 
        if (!symbolPosition) {
            console.log('Position not found')
            return
        }
        options.quantity = symbolPosition.quantity
    }

    if (price) {
        options.price = price
    } else {
        const quote  = await fetchQuote(symbol)
        options.price = quote.last
    }

    options.type = 'sell'
    console.log(options)

    const dummy = await placeOrder(options)
}


//price is optional
export const buy = async ({symbol, quantity, price}) => {
    if (!symbol) {
        console.log('Specify symbol')
        return
    }
    if (!quantity) {
        console.log('Specify quantity')
        return
    }
    const options = {symbol, quantity}

    const instrumentsBody  = await fetchInstrument(symbol)
    const instrument = instrumentsBody.results.find(t => t.symbol === symbol.toUpperCase())
    
    if (!instrument) {
        console.log('Instrument not found')
        return
    }
    options.url = instrument.url
    //url: 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/',

    if (price) {
        options.price = price
    } else {
        const quote  = await fetchQuote(symbol)
        options.price = quote.last
    }
    options.type = 'buy'
    console.log(options)
    const dummy = await placeOrder(options)
}

export const positionsWithQuote = async () => {
    const positions  = await fetchPositions()
    //console.log('positions', positions)
    const positionsWithQuote = []
    let totalGain = 0
    for (const t of positions) {
        const quote = await fetchQuote(t.symbol)
        //console.log(t.symbol, t.quantity, quote.last)
        const {last} = quote
        const diff = Math.round((last - t.cost_basis) * 100) / 100
        const diffPercent = Math.round((diff / t.cost_basis) * 10000) / 100
        const gain = Math.round((diff * t.quantity) * 100) / 100
        totalGain += gain
        positionsWithQuote.push({...t, last, diff, percent: diffPercent, gain})
    }
    totalGain = Math.round(totalGain * 100) / 100
    console.log(positionsWithQuote, totalGain)
    return {positionsWithQuote, totalGain}
}