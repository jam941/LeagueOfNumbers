fs = require('fs');
let data = JSON.parse(fs.readFileSync('item.json'));
let items = data.data

const STAT_CONV = {
    hp:"FlatHPPoolMod",
    hp_per_level:"rFlatHPModPerLevel",
    :"FlatMPPoolMod",
    :"rFlatMPModPerLevel",
    :"PercentHPPoolMod",
    :"PercentMPPoolMod",
    :"FlatHPRegenMod",
    :"rFlatHPRegenModPerLevel",
    :"PercentHPRegenMod",
    :"FlatMPRegenMod",
    :"rFlatMPRegenModPerLevel",
    :"PercentMPRegenMod",
    :"FlatArmorMod",
    :"rFlatArmorModPerLevel",
    :"PercentArmorMod",
    :"rFlatArmorPenetrationMod",
    :"rFlatArmorPenetrationModPerLevel",
    :"rPercentArmorPenetrationMod",
    :"rPercentArmorPenetrationModPerLevel",
    :"FlatPhysicalDamageMod",
    :"rFlatPhysicalDamageModPerLevel",
    :"PercentPhysicalDamageMod",
    :"FlatMagicDamageMod",
    :"rFlatMagicDamageModPerLevel",
    :"PercentMagicDamageMod",
    :"FlatMovementSpeedMod",
    :"rFlatMovementSpeedModPerLevel",
    :"PercentMovementSpeedMod",
    :"rPercentMovementSpeedModPerLevel",
    :"FlatAttackSpeedMod",
    :"PercentAttackSpeedMod",
    :"rPercentAttackSpeedModPerLevel",
    :"rFlatDodgeMod",
    :"rFlatDodgeModPerLevel",
    :"PercentDodgeMod",
    :"FlatCritChanceMod",
    :"rFlatCritChanceModPerLevel",
    :"PercentCritChanceMod",
    :"FlatCritDamageMod",
    :"rFlatCritDamageModPerLevel",
    :"PercentCritDamageMod",
    :"FlatBlockMod",
    :"PercentBlockMod",
    :"FlatSpellBlockMod",
    :"rFlatSpellBlockModPerLevel",
    :"PercentSpellBlockMod",
    :"FlatEXPBonus",
    :"PercentEXPBonus",
    :"rPercentCooldownMod",
    :"rPercentCooldownModPerLevel",
    :"rFlatTimeDeadMod",
    :"rFlatTimeDeadModPerLevel",
    :"rPercentTimeDeadMod",
    :"rPercentTimeDeadModPerLevel",
    :"rFlatGoldPer10Mod",
    :"rFlatMagicPenetrationMod",
    :"rFlatMagicPenetrationModPerLevel",
    :"rPercentMagicPenetrationMod",
    :"rPercentMagicPenetrationModPerLevel",
    :"FlatEnergyRegenMod",
    :"rFlatEnergyRegenModPerLevel",
    :"FlatEnergyPoolMod
    :"rFlatEnergyModPerLevel
    :"PercentLifeStealMod
    :"PercentSpellVampMod
  }



//console.log('Items found before removing non-rift items:',Object.keys(items).length)
for(let k in items){
    let item = items[k]
    isRift = item.maps['11']
    
    if(!isRift){
        //console.log('Removed the item: ',item.name)
        delete items[k]
    }
}
//console.log('Items found after removing non-rift items:',Object.keys(items).length)

var test_element = 0

console.log(data.basic.stats)

for(let id in items){
    let item = items[id]
    if (item.name.includes('s Treads')){
        let description = item.description
        description = description.split('>')
        //console.log(description)

        let extracted = []
        for( let e in description){
            let line = description[e]
            if(line.includes('<',1)){
                extracted.push(line.split('<'))
            }
            
        }
        
        //console.log(extracted)
        let itemStats = []
        for(let e in extracted){
            let block = extracted[e]
            if(block[1].includes('attention')){
                let val = block[0]
                let temp = extracted[e]
                let next  = parseInt(e)+1
                let type = extracted[next][0]
                itemStats.push([val,type])
            }
        }
        //console.log(itemStats)


    }
    test_element += 1

}