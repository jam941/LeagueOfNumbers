

function clean_edges(br_br){
    
    let countFront  = 0
    let countBack  = 0
    for(let i in br_br){
        br_br[i] = br_br[i].replace('</attention>','')
        let temp = br_br[i]
        
        countFront = 0
        countBack = 0

        for(let c_i in temp){
            let c = temp[c_i]
            if (c.match(/^[0-9a-z]+$/)){
                break
            }
            countFront+=1
        
        }
        br_br[i] = temp.substring(countFront)
        br_br[i] = br_br[i].replace('</','')
            
        
    }
}


module.exports = function(){
    fs = require('fs');
    let data = JSON.parse(fs.readFileSync('stats_db.json'));
    let items = data

    let stats = {}
    //console.log('Items found before removing non-rift items:',Object.keys(items).length)
    for(let k in items){
        let item = items[k]
        
        let desc =  item.description
        if(!item.requiredAlly){
            try{desc = desc.split('stats>')[1]
            desc = desc.split('<attention>')
            desc = desc.join()
            //console.log(desc)
            
            let att_br = desc.split('attention').join()
            //console.log(att_br)

            let br_br = desc.split('<br>')

            clean_edges(br_br)
            console.log(br_br)
            let stat = {}
            br_br.forEach(e=>{
                let v = e.substring(0,e.indexOf(' '))
                let label = e.substring(e.indexOf(' ')+1)
                while(label.includes(' ')){
                    label = label.replace(' ','_')
                }
                //console.log(v)
                //console.log(label)
                stat[label] = v
            })
            //console.log(stat)
            stats[item.id] = stat}
        
            catch(err){ }
        }
    }
    return stats
}