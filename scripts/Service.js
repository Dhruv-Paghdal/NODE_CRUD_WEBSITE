var machinename=["Conveyor","Battery Machine","Liquid Filling Machines","Feeder","Labelling Machine","Shrink Machine","Other Machineries"];
function loaddata(){
    for(var i=1;i<=7;i++){
        document.getElementById("machinename"+i).innerHTML=machinename[i-1];
        document.getElementById("machinename"+i).style.fontSize="1.3pc";
    }
}