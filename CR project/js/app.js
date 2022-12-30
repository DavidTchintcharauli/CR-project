//https://cms.crocobet.com/integrations/v2/slot/categories?include=games slot categories and slots
const onClick = async (textContent) =>{
    const {data} = await fetch('https://cms.crocobet.com/integrations/v2/slot/categories?include=games').then(_ => _.json());

    let newData = data.filter(function (i,n){
        return i.name===textContent.trim();
    });


    getProviders(newData)

  }


const categories = async () =>{
    const {data} = await fetch('https://cms.crocobet.com/integrations/v2/slot/categories?include=games').then(_ => _.json());

    

    const TPL_Results = item => `
    <div class="Results-item">
    <button id="CategoryButton" class="link up_link" onclick="onClick(this.textContent)">
${item.name}
    </button>

    
</div>`;

let newData = data.filter(function (i,n){
    return i.platform==='desktop';
});



document.querySelector("#results").innerHTML = newData.map(item => TPL_Results(item)).join('');

}

categories();

// https://cms.crocobet.com/integrations?type=slot&platform=desktop providers list



const getList = async () =>{
    const {data} = await fetch('https://cms.crocobet.com/integrations?type=slot&platform=desktop').then(_ => _.json());


    const TPL_Results = item => `<div class="filter_item">
    <button id="${item.provider}" class="link" onclick="getGamesByProvider(this.id)">
    ${item.name}
    </button>
</div>`;

document.querySelector("#filter_body-content").innerHTML = data.map(item => TPL_Results(item)).join('');

}

getList();


//https://cms.crocobet.com/integrations/v2/slot/providers/egt?platform=desktop slots by provider


const getProviders = async (newData) =>{

    if(newData === undefined){
        const {data} = await fetch('https://cms.crocobet.com/integrations/v2/slot/providers/egt?platform=desktop').then(_ => _.json());
        

        const TPL_Results = item => `<div class="games-list">
        <div class="item">
        <img class="item_provider" src="${item.image}">
        </div>
        <div class="item_title">${item.name}</div>
        </div>`;

        document.querySelector("#custom-col").innerHTML = data.games.map(item => TPL_Results(item)).join('');
    }
    else{
        const TPL_Results = item => `<div class="games-list">
        <div class="item">
        <img class="item_provider" src="${item.image}">
        </div>
        <div class="item_title">${item.name}</div>
        </div>`;

        document.querySelector("#custom-col").innerHTML = newData[0].games.map(item => TPL_Results(item)).join('');
    }

}

getProviders();

const getGamesByProvider = async (provider) =>{

const {data} = await fetch('https://cms.crocobet.com/integrations/v2/slot/providers/' + provider +'?platform=desktop').then(_ => _.json());

const TPL_Results = item => `<div class="games-list">
<div class="item">
<img class="item_provider" src="${item.image}">
</div>
<div class="item_title">${item.name}</div>
</div>`;

document.querySelector("#custom-col").innerHTML = data.games.map(item => TPL_Results(item)).join('');


}