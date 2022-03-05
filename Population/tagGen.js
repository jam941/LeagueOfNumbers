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
for(let e in tags){
    let form = {
        id:count,
        tag:e,
        

    }
    
    const DO_BOTH = false
    if(DO_BOTH){
        axios.post('http://127.0.0.1:8000/tags/',form).then(f=>{
            console.log(f)
            tags[e].forEach(item=>{
                axios.get(item).then(i=>{
                    i.tags.push('http://127.0.0.1:8000/tags/'+count+'/')
                    axios.put(item,i)
                })
            })
            }).catch(temp=>{
                //console.log(temp)
            })
        
    }
    else{
        tags[e].forEach(item=>{
            axios.get('http://127.0.0.1:8000/items/3143/').then(response=>{
                
                let i = response.data
                i.tags.push('http://127.0.0.1:8000/tags/'+count+'/')
                axios.put(item,i).catch(err =>{console.log(i)})
                //console.log('Item: ', item,'\nData: ',i )
            }).catch(temp=>{
                //console.log(temp)
            })
        })
    }
    count+=1 
        
    
    
    
}