const axios = require('axios');
fs = require('fs');
let data = JSON.parse(fs.readFileSync('stats_db.json'));
let items = data
let tags = {}
Object.keys(items).forEach(element => {
    let item = items[element]
    let tag = item.categories

    tag.forEach(i=>{
        if(i in tags){
            tags[i].push('http://127.0.0.1:8000/items/'+item.id+'/')
        }
        else{
            tags[i] = ['http://127.0.0.1:8000/items/'+item.id+'/']
        }
    })
});
console.log(tags)
let count = 0
Object.keys(tags).forEach(e=>{
    let form = {
        id:count,
        tag:e,
        

    }
    
    axios.post('http://127.0.0.1:8000/tags/',form).then(f=>{
        console.log(f)
        
    }).catch(test=>{
        console.log(test)
    })
    count+=1    
    
    
    
})