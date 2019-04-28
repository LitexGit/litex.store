export default {
  supported: [
    { symbol: 'eth', contract: null, price: 0, icon: 'statics/tokens/eth.svg', status: 'open', balance: 1.2345 },
    { symbol: 'usdt', contract: '0xdac17f958d2ee523a2206206994597c13d831ec7', priceCNY: 0, icon: 'statics/tokens/usdt.svg', status: 'close', balance: 0 },
    { symbol: 'lxt', contract: '0xbc46d9961a3932f7d6b64abfdec80c1816c4b835', priceCNY: 0, icon: 'statics/tokens/lxt.png', status: 'null', balance: 0 }
  ],
  incoming: [
    { symbol: 'eth', icon: 'statics/tokens/eth.svg', status: 'open', balance: 1.2345 },
    { symbol: 'usdt', icon: 'statics/tokens/usdt.svg', status: 'close', balance: 0 },
    { symbol: 'lxt', icon: 'statics/tokens/lxt.png', status: 'null', balance: 0 }
  ],
  selected: ''
}
