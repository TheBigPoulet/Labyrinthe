pas = 40;
score_max = 1;

function partie_fini()
{
    document.getElementById(this.nom+"_win").style.visibility="visible";
    document.getElementById("map").style.visibility="hidden";
    document.getElementById("J1").style.visibility="hidden";
    document.getElementById("J2").style.visibility="hidden";
    document.getElementById("cle").style.visibility="hidden";
    document.getElementById("score").style.visibility="hidden";
}

function actualisation_J()
{
    this.val_top=11+this.Y*pas;
    this.val_left=11+this.X*pas;
    document.getElementById(this.nom).style.top=this.val_top+'px';
    document.getElementById(this.nom).style.left=this.val_left+'px';
    document.getElementById('score_'+this.nom).innerHTML=this.nom+": "+this.point;
}

function actualisation_C()
{
    this.val_top=11+this.Y*pas;
    this.val_left=11+this.X*pas;
    document.getElementById(this.nom).style.top=this.val_top+'px';
    document.getElementById(this.nom).style.left=this.val_left+'px';
}

function Joueur(nom,X,Y,val_left,val_top,point)
{  
    this.nom=nom;
    this.X=X;
    this.Y=Y;
    this.val_left=val_left;
    this.val_top=val_top;
    this.point=point;
    this.actualisation_J=actualisation_J;
    this.partie_fini=partie_fini;
}

function Points(nom,X,Y,val_left,val_top)
{
    this.nom=nom;
    this.X=X;
    this.Y=Y;
    this.val_left=val_left;
    this.val_top=val_top;
    this.actualisation_C=actualisation_C;
}
function init()
{
    pro_cases = document.getElementById('Cases').innerHTML;
    Cases=pro_cases.split('\n');
    Cases.splice(0,1);
    Cases.splice(Cases.length-1,1);
    for(i=0;i<Cases.length;i++)
    {
        Cases[i]=Cases[i].trim();
    }

    tbody = document.getElementById('map');
    for(i=0;i<Cases.length;i++)
    {
        const ligne = tbody.insertRow();
        for(y=0;y<Cases[i].length;y++)
        {
            let cell = ligne.insertCell();   
            cell.innerHTML = '<img src="../Cases/Case_'+Cases[i][y]+'.png"></img>';
        }
    }

    J1 = new Joueur('J1',0,0,0,0,0);
    J1.actualisation_J();

    J2 = new Joueur('J2',Cases[0].length-1,0,0,0,0);
    J2.actualisation_J();

    cle = new Points('cle',Math.floor(Math.random()*Cases[0].length),Math.floor(Math.random()*Cases.length),11,11);
    cle.actualisation_C();

    document.getElementById('score').style.top=(Cases.length*40+5)+"px"
}

window.onkeydown = function(e) {
    var key = e.keyCode || e.which;
    switch (key) 
    {
        case 37: // <--
            if(verif_direction("left",J1.X,J1.Y))
            {
                J1.X--;
                verif_point("J1");
            }
            break;
        case 39: // -->
            if(verif_direction("right",J1.X,J1.Y))
            {
                J1.X++;
                verif_point("J1");
            }
            break;
        case 38: // /\
            if(verif_direction("up",J1.X,J1.Y))
            {
                J1.Y--;
                verif_point("J1");
            }
            break;
        case 40: // \/
            if(verif_direction("down",J1.X,J1.Y))
            {
                J1.Y++;
                verif_point("J1");
            }
            break;
        case 81: // Q
            if(verif_direction("left",J2.X,J2.Y))
            {
                J2.X--;
                verif_point("J2");
            }
            break;
        case 68: // D
            if(verif_direction("right",J2.X,J2.Y))
            {
                J2.X++;
                verif_point("J2");
            }
            break;
        case 90: // Z
            if(verif_direction("up",J2.X,J2.Y))
            {
                J2.Y--;
                verif_point("J2");
            }
            break;
        case 83: // S
            if(verif_direction("down",J2.X,J2.Y))
            {
                J2.Y++;
                verif_point("J2");
            }
            break;
        default:
            //console.log(key);
            break;
    }
    J1.actualisation_J();
    J2.actualisation_J();
};

function verif_point(J)
{
    if((J1.X==cle.X && J1.Y==cle.Y)||(J2.X==cle.X && J2.Y==cle.Y))
    {
        cle.X=Math.floor(Math.random()*Cases[0].length);
        cle.Y=Math.floor(Math.random()*Cases.length);
        cle.actualisation_C();
        if(J=="J1")
        {   
            J1.point++;
            if(J1.point==score_max)
            {
                //J1.partie_fini();
            }
        }
        else if(J=="J2")
        {   
            J2.point++;
            if(J2.point==score_max)
            {
                //J2.partie_fini();
            }
        }
    }
    J1.actualisation_J();
    J2.actualisation_J();
}

function verif_direction(direction,x,y)
{
    Case=Cases[y][x];
    if(direction=="left")
    {
        if(Case=='B' || Case=='D' || Case=='E' || Case=='G' || Case=='H' || Case=='I' || Case=='K' || Case=='O')
        {
            return 1;
        }
    }
    else if(direction=="right")
    {
        if(Case=='B' || Case=='C' || Case=='F' || Case=='G' || Case=='J' || Case=='I' || Case=='K' || Case=='M')
        {
            return 1;
        }
    }
    else if(direction=="up")
    {
        if(Case=='A' || Case=='C' || Case=='D' || Case=='G' || Case=='H' || Case=='J' || Case=='K' || Case=='N')
        {
            return 1;
        }
    }
    else if(direction=="down")
    {
        if(Case=='A' || Case=='E' || Case=='F' || Case=='H' || Case=='J' || Case=='I' || Case=='K' || Case=='L')
        {
            return 1;
        }
    }
    return 0;
}

init();