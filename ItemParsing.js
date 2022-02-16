fs = require('fs');
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
}
var ALL_STATS = [];
console.log('Adding basic items to database')
for(let id in items){
    let item = items[id]
    if(!item.depth){
        let form_item = {
            "name": item.name,
            "colloq": item.colloq,
            "plaintext": item.plaintext,
            "base_price": item.gold.base,
            "sell_price": item.gold.sell,
            "buyable": item.gold.purchasable,
            "depth": item.depth
        }

        let item_stats = {

        }
        
    }
    let stats_i = item.stats;
    let temp = Object.keys(stats_i);

    //TODO GRAFT Haste out of descriptions, mana regen, lethality, pen, tenacity,
    for(let x in temp){
        //console.log(temp)
        temp.forEach(e=>{
            if(!ALL_STATS.includes(e)){
                ALL_STATS.push(e);
            }
        })
        
    }
}
console.log(ALL_STATS)