fs = require('fs');
let data = JSON.parse(fs.readFileSync('stats_db.json'));


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

const STAT_CONV = {
    hp:"FlatHPPoolMod",
    hp_per_level:"rFlatHPModPerLevel",
    p12:"FlatMPPoolMod",
    p1:"rFlatMPModPerLevel",
    p1:"PercentHPPoolMod",
    p1:"PercentMPPoolMod",
    p1:"FlatHPRegenMod",
    p1:"rFlatHPRegenModPerLevel",
    p1:"PercentHPRegenMod",
    p1:"FlatMPRegenMod",
    p1:"rFlatMPRegenModPerLevel",
    p1:"PercentMPRegenMod",
    p1:"FlatArmorMod",
    p1:"rFlatArmorModPerLevel",
    p1:"PercentArmorMod",
    p1:"rFlatArmorPenetrationMod",
    p1:"rFlatArmorPenetrationModPerLevel",
    p1:"rPercentArmorPenetrationMod",
    p1:"rPercentArmorPenetrationModPerLevel",
    p1:"FlatPhysicalDamageMod",
    p1:"rFlatPhysicalDamageModPerLevel",
    p1:"PercentPhysicalDamageMod",
    p1:"FlatMagicDamageMod",
    p1:"rFlatMagicDamageModPerLevel",
    p1:"PercentMagicDamageMod",
    Move_Speed:"FlatMovementSpeedMod",
    p1:"rFlatMovementSpeedModPerLevel",
    p1:"PercentMovementSpeedMod",
    p1:"rPercentMovementSpeedModPerLevel",
    p1:"FlatAttackSpeedMod",
    p1:"PercentAttackSpeedMod",
    p1:"rPercentAttackSpeedModPerLevel",
    p1:"rFlatDodgeMod",
    p1:"rFlatDodgeModPerLevel",
    p1:"PercentDodgeMod",
    p1:"FlatCritChanceMod",
    p1:"rFlatCritChanceModPerLevel",
    p1:"PercentCritChanceMod",
    p1:"FlatCritDamageMod",
    p1:"rFlatCritDamageModPerLevel",
    p1:"PercentCritDamageMod",
    p1:"FlatBlockMod",
    p1:"PercentBlockMod",
    p1:"FlatSpellBlockMod",
    p1:"rFlatSpellBlockModPerLevel",
    p1:"PercentSpellBlockMod",
    p1:"FlatEXPBonus",
    p1:"PercentEXPBonus",
    p1:"rPercentCooldownMod",
    p1:"rPercentCooldownModPerLevel",
    p1:"rFlatTimeDeadMod",
    p1:"rFlatTimeDeadModPerLevel",
    p1:"rPercentTimeDeadMod",
    p1:"rPercentTimeDeadModPerLevel",
    p1:"rFlatGoldPer10Mod",
    p1:"rFlatMagicPenetrationMod",
    p1:"rFlatMagicPenetrationModPerLevel",
    p1:"rPercentMagicPenetrationMod",
    p1:"rPercentMagicPenetrationModPerLevel",
    p1:"FlatEnergyRegenMod",
    p1:"rFlatEnergyRegenModPerLevel",
    p1:"FlatEnergyPoolMod",
    p1:"rFlatEnergyModPerLevel",
    p1:"PercentLifeStealMod",
    p1:"PercentSpellVampMod"
  }
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
 
console.log(stats)