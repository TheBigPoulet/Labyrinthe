function actualiser()
{
    pro_cases = document.getElementById('msg').value;
    Cases=pro_cases.split('\n');
    tbody = document.getElementById('map');
    tbody.innerHTML=""
    for(i=0;i<Cases.length;i++)
    {
        const ligne = tbody.insertRow();
        for(y=0;y<Cases[i].length;y++)
        {
            let cell = ligne.insertCell();   
            cell.innerHTML = '<img src="Case_'+Cases[i][y]+'.png"></img>';
        }
    }
    document.getElementById("valX").innerHTML=Cases[0].length*40+":"+(Cases[0].length*40)/2;
    document.getElementById("valY").innerHTML=Cases.length*40+":"+(Cases.length*40)/2;
}