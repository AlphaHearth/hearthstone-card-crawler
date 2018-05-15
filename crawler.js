const request = require('request');
const fs = require('fs');

const basicUrl = `https://media.services.zam.com/v1/media/byName/hs/cards/enus/`;

// 异步读取
fs.readFile('cards.collectible.json', function (err, data) {
    if (err) {
        return console.error(err);
    }
    cards = JSON.parse(data);
    for (let index in cards) {
        let originalCard = cards[index].id + '.png';
        let premiumCard = cards[index].id + '_premium.gif';
        console.log(basicUrl + originalCard);
        console.log(basicUrl + 'animated/' + premiumCard);
        getImage(originalCard, basicUrl + originalCard);
        getImage(premiumCard, basicUrl + 'animated/' + premiumCard);
    }
});

function getImage(imgFile, imgSrc) {
    request(imgSrc, {timeout: 50000})
        .on('error', function (err) {
            console.log(err);
            console.log(imgSrc);
        })
        .pipe(fs.createWriteStream('./images/' + imgFile))
        .on('close', () => {
            console.log('Done', imgSrc);
        });
}