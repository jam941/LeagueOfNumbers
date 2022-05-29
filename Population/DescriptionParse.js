

const stats = 'stats'
const att = 'attention'
const PASSIVE = 'passive'
function createVal(v){
    
    if(v.includes('%')){
        return parseFloat(v)/100.0
    }
    return parseInt(v)

}

function generateStatsObj(statBlock){
    statBlock = statBlock.split('<mainText><stats>')[1]
    let statsSplitOnAtt = statBlock.split('</'+ att + '>').join('')
    let statsText = statsSplitOnAtt.split('<'+att+'>')
    if(statsText[0] == ''){
        statsText.splice(0,1)
    }
    statsObj = {}
    statsText.forEach(element => {
        //console.log(element)
        let splitLine = element.split(' ')
        if(splitLine[0] == ''){
            splitLine.splice(0,1)
        }
        let val = createVal(splitLine[0])
        let label = splitLine.slice(1).join(' ')
        statsObj[label] = val
    });
    return statsObj
}
function fixEffectDescription(desc){
    desc = desc.split('')
    let retrunedValue = ''
    let flag = true
    desc.forEach(e=>{
        
        if(e == '<' || e=='>'){
            flag=!flag
        }
        
        else if(flag){
            retrunedValue+=e
        }
    })
    return retrunedValue
}
function generateEffectBlock(description){
    let effectDict = {}
    console.log(description)
    description = description.split('</mainText>')
    description = description[0].split('<li>')
    description.forEach(effect =>{
        effect = effect.replace(/<passive>/g,'')
        effect = effect.split(':</passive>')
        const label = effect[0]
        effect[1] = effect[1].trim()
        const effectDesc = fixEffectDescription(effect[1])
        effectDict[label]= effectDesc
    })
    return effectDict
}

module.exports.parseDescription = function(initDesc){
    let description = initDesc.split('<br>').join('')

    //find markers for various landmarks in description
    const endOfStatsBlock =  description.indexOf('</'+stats+'>')
    let statBlock = description.substring(0,endOfStatsBlock)
    let startOfPassAct = endOfStatsBlock+stats.length+7
    
    //Genertate Stats obj associated with item
    let statsList = generateStatsObj(statBlock)
    let effectList = generateEffectBlock(description.substring(startOfPassAct))
    
    
}

