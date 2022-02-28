const axios = require('axios');
fs = require('fs');
let data = JSON.parse(fs.readFileSync('stats_db.json'));
let items = data
items.array.forEach(element => {
    
});