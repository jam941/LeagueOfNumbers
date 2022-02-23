
const DEBUG = true
fs = require('fs');
const axios = require('axios');
const SAVE_TRIM = 'trimmed_items.json'

const SUPPORT_ITEMS = [3850,3851,3853,3858,3855,3857,3859,3860,3863,3864,3862,3854]
const SMITE_ITEMS = [1035,1039]
const OMIT_ITEMS = [1035, 2052,3400,3599,3600]


const STAT_LOOKUP = {
    'FlatMovementSpeedMod':'armor',
    'FlatHPPoolMod':'hp',
    'FlatCritChanceMod':'crit_chance',
    'FlatMagicDamageMod':'ability_power',
    'FlatMPPoolMod':'mana',
    'FlatArmorMod':'armor',
    'FlatSpellBlockMod':'magic_resist',
    'FlatPhysicalDamageMod':'attack_damage',
    'PercentAttackSpeedMod':'attack_speed',
    'PercentLifeStealMod':'lifesteal',
    'FlatHPRegenMod':'hp_regen',
    'PercentMovementSpeedMod':'MS%',
}
//fs.readFile()


let data = JSON.parse(fs.readFileSync('item.json'));
let items = data.data

console.log('Items found before removing non-rift items:',Object.keys(items).length)
for(let k in items){
    let item = items[k]
    isRift = item.maps['11']
    
    if(!isRift){
        console.log('Removed the item: ',item.name)
        delete items[k]
    }
}
console.log('Items found after removing non-rift items:',Object.keys(items).length)

var save_json = JSON.stringify(data)
//await fs.unlink(SAVE_TRIM)
fs.writeFile(SAVE_TRIM,save_json,'utf8',()=>{})


//Depth values
//3 = completed item
//2 = components

function isItem(check){
    return check.depth == 3
}

function isComponent(check){
    return check.depth == 2
}

function isBasic(check,check_id){
    check_id = parseInt(check_id)
    return !check.depth && !isSupportItem(check_id) && !isSmiteItem(check_id) && !isOmitted(check_id)
}



function isSupportItem(check){
    //console.log('Is: ', check, ' a support item?  ', SUPPORT_ITEMS.includes(check))
    return SUPPORT_ITEMS.includes(check)
}

function isSmiteItem(check){
    return SMITE_ITEMS.includes(check)
}

function isOmitted(check){
    return OMIT_ITEMS.includes(check)
}

function isTrinket(check){
    return check.description.includes('Trinket')
}
for(let id in items){
    let item = items[id]

    
    console.log('Adding additional boolean values for: ', item.name)
    item.isSupportItem = isSupportItem(parseInt(id))
    item.isSmiteItem = isSmiteItem(parseInt(id))
    item.isOmitted = isOmitted(parseInt(id))
    if(isBasic(items,id)){
        item.isTrinket = isTrinket(item)
    }
    else{
        item.isTrinket = false
    }
    //item.isTrinket = isTrinket(parseInt(id))
    if(isBasic(item,id)){
        
        
          //console.log(item.name, ' ', id) 
          item.depth = 0
          console.log('Added depth value for: ', item.name) 
        
    }
    if((!('depth' in item))||item.depth == undefined){
        item.depth = -1
    }
}

function getBuilds(item){
    if('from' in item){
        let retList = []
        //console.log('Formating build partents for: ', item.name)
        item.from.forEach(e=>{
            
            retList.push('http://127.0.0.1:8000/items/'+ e + '/')
        })
        
        return retList
    }
    
    return []
}


let id_set = {}
for(let id in items){
    let item = items[id]

    if (item.depth in Object.keys(id_set)){
        id_set[item.depth].push(id)
    }
    else{
        console.log('creating depth set for: ', item.depth, 'with item name: ', item.name)
        id_set[item.depth] = [id]
    }
}


var ALL_STATS = [];
console.log('Adding basic items to database')


var sorted_keyset = Object.keys(id_set).sort()
console.log('sorted keyset: ', sorted_keyset)

function make_request(form){
    console.log(form)
    return axios.post('http://127.0.0.1:8000/items/',form).catch(e=>{
        console.log('Issues with: ', form.name)
    })
}

async function postItems(depth_limit,itemList){
    let promises = []

    for(let i in itemList){
        let item = itemList[i]
        let id = i
        //console.log('Doing item for: ', id)

        if(item.depth === depth_limit){
            //console.log('Adding item: ', item.name)
            let builds  = getBuilds(item)
        
            let form_item = {
                "id":parseInt(id),
                "name": item.name,
                "base_price": item.gold.base,
                "sell_price": item.gold.sell,
                "buyable": item.gold.purchasable,
                "depth": item.depth,
                "builds_from": []
            }
            
            promises.push(make_request(form_item,item))
            
        }
    }
    let d = await promises
    return d


}

//sorted_keyset = [-1]
let test_set = [-1,0,1,2,3]
for(let k in sorted_keyset){
    if(parseInt(k) in test_set){
        //console.log(typeof k)
        //const responses  = postItems(parseInt(k), items)
    
    } 
}


Object.keys(items).forEach(e=>{
    let item = items[e]
    let url = 'http://127.0.0.1:8000/items/'+e+'/'
    axios.get(url).then(res=>{
        let d = res.data
        res.data.builds_from=getBuilds(item)
        console.log()
        axios.put(url,res.data).catch(()=>{console.log('Error PUT of: ',item.name,' when trying to add build paths')})
    }).catch(err =>{
        console.log('Error GET of: ',item.name,' when trying to add build paths')
    })
})


console.log('Done')
