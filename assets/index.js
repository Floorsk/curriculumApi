Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
    '6X0jAY2MdWPlLaePTJDvaWxfmtTPKEiwDgnxOQeq', // This is your Application ID
    'weMASdkteQPomqMmFcRpNWTX4AoDItcLhKSx4ONM' // This is your Javascript key
);

const Perks = Parse.Object.extend("Perks");

const inputP = document.getElementById('input-perk');
const buttonP = document.getElementById('button-perk');
const listP = document.getElementById('habilite-list');

const readPerks = async () => {

    const queryP = new Parse.Query(Perks);
    try {

        const results = await queryP.find();
        listP.innerHTML = "";

        for (const perks of results) {

            const perk = perks.get("perk")
            const aspas = "'"
            const name = perks.id
            listP.innerHTML += '<li>' + perk + '';

        }

    } catch (error) {
        console.error("Error while fetching Tarefa", error);
    }
}

const addPerk = async () => {

    const perk = inputP.value.trim();
    if (!perk) {
        alert('Digite uma habilidade.')
        return;
    }

    const inputPerk = new Parse.Object("Perks");
    inputPerk.set("perk", perk);

    try {
        const result = await inputPerk.save();
        console.log("Perk adicionado", result.id);
    } catch (error) {
        console.error("Error while creating new perk: ", error)
    }

    inputP.value = "";
    inputP.focus();
    readPerks();

}

readPerks();

buttonP.onclick = addPerk;
