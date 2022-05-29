parseDescription = require('./DescriptionParse.js').parseDescription
fs = require('fs');
let itemsList = JSON.parse(fs.readFileSync('stats_db.json'));

let items = {}
itemsList.forEach(e=>{items[e.id] = e
})

function applyDepths( item, count){
    if(!item){return}
    //console.log(item)
    items[item.id].depth = count
    items[item.id].mythic = false
    if(count > 2){
        items[item.from[0]].mythic = true
    }
    item.to.forEach(e=>{
        //console.log(e)
        let res = items[e]
    
        applyDepths(res,count+1)
        
    })
}


const axios = require('axios');
const { maxHeaderSize } = require('http');
const SAVE_TRIM = 'trimmed_items.json'


const OMIT_ITEMS = [1035, 2052,3400,3599,3600]

const exclusivities  = {
    'boots':[3020,2422,3047,3117,3111,3158,3009,1001,3006],
    'critMod':[6677,3031,3124],
    'elixir':[2138,2139,2140],
    'Glory':[3041,1082],
    'Guardian':[3077,3074,3748],
    'Hydra':[3748],
    'Role':[1035,1039,3858,3859,3860,3862,3863,3864,3853,3850,3851,3854,3855,3857],
    'LastWhisper':[6694,3036,3035],
    'Lifeline':[3053,3156,6673,3155],
    'ManageCharge':[3003,3121,3004,3042,3040,3070,3119],
    'Mythic':[6664,3078,3068,6631,2065,4633,6693,4636,6617,6655,3190,6653,6672,4005,6673,3152,6630,6671,6662,6656,3001,6692,6691,6632,4644],
    'MythicComp':[6670,3802,4635,6029,6660],
    'Potion':[2031,2003,2033],
    'Quicksilver':[6035,3140,3139],
    'Sightstone':[4638,4643],
    'trinket':[3340,3363,3364],
    'voidPen':[4630,3135],
}

// Apply depth values and mythic booleans
let basics = []
Object.values(items).forEach(element => {
    if(!element.from.length){basics.push(element)}
});
basics.forEach(element =>{
    applyDepths(element,0)
})
console.log(items[6673])

Object.keys(exclusivities).forEach(e=>{
    let exes =  exclusivities[e]
    
    exes.forEach(item=>{
        console.log(item)
        if(items[item].exclusivities){
            items[item].exclusivities = items[item].exclusivities.concat(exes)
        }
        else{
            items[item].exclusivities = exes
        }
        let idx = items[item].exclusivities.indexOf(item)
        
        items[item].exclusivities.splice(idx,1)
    })
})
//console.log(items[6673])
console.log(items[3190])

parseDescription(items[3190].description)
//parseDescription(items[6673].description)

Object.values(items).forEach(item=>{
    
})