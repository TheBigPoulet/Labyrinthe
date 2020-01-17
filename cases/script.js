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
}