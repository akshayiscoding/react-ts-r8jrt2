import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

const coinLogos = [
  {
    match: 'kucoin',
    img: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png'
  },
  {
    match: 'binance',
    img: 'https://image.pngaaa.com/410/5124410-middle.png'
  },
  {
    match: 'kraken',
    img:
      'https://e7.pngegg.com/pngimages/465/269/png-clipart-kraken-bitcoin-cryptocurrency-exchange-ethereum-bitcoin-blue-text.png'
  },
  {
    match: 'crypto',
    img: 'https://assets.coingecko.com/coins/images/7310/large/cypto.png'
  },
  {
    match: 'coinbase',
    img: 'https://igaming.org/wp-content/uploads/2021/02/image_large_899.png'
  },
  {
    match: 'eth',
    img:
      'https://w7.pngwing.com/pngs/368/176/png-transparent-ethereum-cryptocurrency-blockchain-bitcoin-logo-bitcoin-angle-triangle-logo.png'
  },
  {
    match: 'harmony',
    img:
      'https://cdn.coinhako.com/assets/wallet-one-509538ab231943400af3c09c6ff29dbc67b31686bf4edc12da85d44bb2b7ef96.png'
  },
  {
    match: 'polygon',
    img: 'https://chainstack.com/wp-content/uploads/2021/05/Polygon-Logo.png'
  },
  { match: 'bsc', img: 'https://image.pngaaa.com/410/5124410-middle.png' },
  { match: 'nexo', img: 'https://image.pngaaa.com/667/3271667-middle.png' },
  {
    match: 'ada',
    img:
      'https://w7.pngwing.com/pngs/844/873/png-transparent-cardano-zug-cryptocurrency-blockchain-ethereum-bitcoin-wallet-thumbnail.png'
  },
  {
    match: 'sushi',
    img:
      'https://aws1.discourse-cdn.com/standard10/uploads/sushiswapclassic/original/1X/507bc40f53db1f27d254810bc9b895c87fdb638c.png'
  },
  {
    match: 'algorand',
    img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/4030.png'
  },
  {
    match: 'pancake',
    img: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png'
  },
  {
    match: 'compound',
    img:
      'https://assets.website-files.com/5f8e21b830b6431600cd03ae/60b6c446712ed00d8338d233_compound%201592221902093.png'
  },
  {
    match: 'quickswap',
    img: 'https://quickswap.exchange/static/media/logo_circle.0dc6c052.png'
  },
  {
    match: 'uniswap',
    img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/7083.png'
  },
  {
    match: 'balancer',
    img:
      'https://assets.coingecko.com/coins/images/11683/large/Balancer.png?1592792958'
  }
];

export default memo(({ data, isConnectable }: any) => {
  const labelText = (data.labelText || '').toLowerCase();
  return (
    <React.Fragment>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={params => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <div
        style={{
          textAlign: 'center',
          border: '1px solid #777',
          backgroundColor: 'rgb(245, 245, 245)',
          padding: 10,
          borderRadius: 6
        }}
      >
        {/* {logoMap[labelText] && (
          <img
            src={logoMap[labelText]}
            style={{ width: 24, height: 24, position: 'absolute', top: 8 }}
          />
        )} */}
        {coinLogos.map(item => {
          return labelText.indexOf(item.match) >= 0 ? (
            <img
              src={item.img}
              style={{ width: 24, height: 24, position: 'absolute', top: 8 }}
            />
          ) : null;
        })}
        {data.label || 'N/A'}
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </React.Fragment>
  );
});
