fs = require('fs');
const axios = require('axios');
const { maxHeaderSize } = require('http');
const SAVE_TRIM = 'trimmed_items.json'

const SUPPORT_ITEMS = [3850,3851,3853,3858,3855,3857,3859,3860,3863,3864,3862,3854]
const SMITE_ITEMS = [1035,1039]
const OMIT_ITEMS = [1035, 2052,3400,3599,3600]


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

console.log('Items found after removing non-rift items:',Object.keys(items).length)


var ALL_STATS = [];
console.log('Adding basic items to database')


var sorted_keyset = Object.keys(id_set).sort()
console.log('sorted keyset: ', sorted_keyset)

var newItems = []
for (var id in items){
    var item = items[id]
    var newItem = {
        "id":parseInt(id),
        "name": item.name,
        "base_price": item.gold.base,
        "sell_price": item.gold.sell,
        "buyable": item.gold.purchasable,
        "depth": item.depth,
        "builds_from": [],
        "img":item.image.full
    }
    newItem.builds_from=getBuilds(item)
    newItem.description = item.description

    newItems.push(newItem)
}


console.log(newItems)
