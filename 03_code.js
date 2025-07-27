const HTML_MEIGEN = document.getElementById("MEIGEN");
const HTML_NAME = document.getElementById("NAME");
const HTML_TODAY_DATE = document.getElementById("TODAY_DATE");

let Date_mamory;
let Date_meigen;
let Date_name;

saveDataSet()
getMeigen();

async function getMeigen() {
    
    if(Datecheck()){
        try {
            const res = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://meigen.doodlenote.net/api/json.php?c=1"));
            const data = await res.json();
            console.log(data);

            let MeigenName = "";
            let MeigenMeigen = "";

            MeigenMeigen = data[0].meigen;
            HTML_MEIGEN.innerHTML = Set_Meigen(MeigenMeigen);
            data[0].meigen
            MeigenName = data[0].auther
            HTML_NAME.innerHTML = `～${MeigenName ?? "不明"}～`;

            Date_meigen = MeigenMeigen;
            Date_name = MeigenName;
            saveData();

        } catch (err) {
            document.getElementById("MEIGEN").innerText = "取得に失敗しました";
            console.error(err);
        }
    }
}

function saveDataSet(){
    const JSONtask = JSON.parse(localStorage.getItem("meigenDate"));
    if(JSONtask){
        Date_mamory = JSONtask.Date;

        HTML_MEIGEN.innerHTML = Set_Meigen(JSONtask.Meigen);
        HTML_NAME.innerHTML = `～${JSONtask.Name ?? "不明"}～`;
    }
}

function Set_Meigen(AStrmeigen){
    // return `<i><div style="transform: rotate(-5deg); display: inline-block;"> "${AStrmeigen}" </div></i>`;
    return `"${AStrmeigen}"`;
}

function Datecheck(){
    const today = new Date().toISOString().slice(0, 10); 
    HTML_TODAY_DATE.innerText = today;
    if(Date_mamory === today){
        return false;
    }
    else{
        return true;
    }
}

function saveData(){
    const data = getTableData();
    console.log(data);

    localStorage.setItem("meigenDate", JSON.stringify(data));
}

function getTableData() {
    const today = new Date().toISOString().slice(0, 10); 
    const X_Date_meigen = {
        Date: today
        ,Meigen: Date_meigen
        ,Name: Date_name
    }

  return X_Date_meigen;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleAnimation");

  btn.addEventListener("click", () => {
    const meigen = document.getElementById("MEIGEN");
    meigen.classList.toggle("rotate");

    if (meigen.classList.contains("rotate")) {
      btn.textContent = "アニメOFF";
    } else {
      btn.textContent = "アニメON";
    }
  });
});