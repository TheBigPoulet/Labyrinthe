pas = 40;
decal_top = document.getElementById("map").offsetTop + 11;
decal_left = document.getElementById("map").offsetLeft + 11;
point_max = 20;
chat="J1S";
old = Date.now();
Ko = 1500;

var move = new Audio('../son/move.mp3')
move.volume=0.10;

var coins = new Audio('../son/coins.wav')
move.volume=0.10;

function partie_fini()
{
    document.location.href="fin.html?win="+this.nom; 
}

function actualisation_J()
{
    this.val_top=decal_top+this.Y*pas;
    this.val_left=decal_left+this.X*pas;
    document.getElementById(this.nom).style.top=this.val_top+'px';
    document.getElementById(this.nom).style.left=this.val_left+'px';
    document.getElementById('score_'+this.nom).innerHTML=this.chrono.toFixed(0);
    console.log(this.chrono)
    if(this.chrono>=point_max-5)
    {
        document.getElementById('score_'+this.nom).style.color="red";
    }
}

function Joueur(nom,X,Y,val_left,val_top,point)
{  
    this.nom=nom;
    this.X=X;
    this.Y=Y;
    this.val_left=val_left;
    this.val_top=val_top;
    this.actualisation_J=actualisation_J;
    this.partie_fini=partie_fini;
    this.pause;
    this.chrono=0;
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

    J1 = new Joueur('J1',Cases[0].length-1,0,0,0,0);
    J1.actualisation_J();
    J1.pause = Date.now();
    J1.pause += 1500;

    J2 = new Joueur('J2',0,0,0,0,0);
    J2.actualisation_J();

    document.getElementById('score').style.top=(Cases.length*40+5)+"px"
}

window.onkeydown = function(e) {
    var key = e.keyCode || e.which;
    switch (key) 
    {
        case 37: // <--
            if(verif_direction("left",J1.X,J1.Y,J1.nom,J1.pause))
            {
                J1.X--;
                verif_point("J1");
            }
            break;
        case 39: // -->
            if(verif_direction("right",J1.X,J1.Y,J1.nom,J1.pause))
            {
                J1.X++;
                verif_point("J1");
            }
            break;
        case 38: // /\
            if(verif_direction("up",J1.X,J1.Y,J1.nom,J1.pause))
            {
                J1.Y--;
                verif_point("J1");
            }
            break;
        case 40: // \/
            if(verif_direction("down",J1.X,J1.Y,J1.nom,J1.pause))
            {
                J1.Y++;
                verif_point("J1");
            }
            break;
        case 81: // Q
            if(verif_direction("left",J2.X,J2.Y,J2.nom,J2.pause))
            {
                J2.X--;
                verif_point("J2");
            }
            break;
        case 68: // D
            if(verif_direction("right",J2.X,J2.Y,J2.nom,J2.pause))
            {
                J2.X++;
                verif_point("J2");
            }
            break;
        case 90: // Z
            if(verif_direction("up",J2.X,J2.Y,J2.nom,J2.pause))
            {
                J2.Y--;
                verif_point("J2");
            }
            break;
        case 83: // S
            if(verif_direction("down",J2.X,J2.Y,J2.nom,J2.pause))
            {
                J2.Y++;
                verif_point("J2");
            }
            break;
        default:
            //console.log(key);
            break;
    }
    move.load();
    move.play();
    J1.actualisation_J();
    J2.actualisation_J();
};

function verif_point(J)
{
    if(J1.X==J2.X && J1.Y==J2.Y)
    {
        if(chat=="J1"||chat=="J1S")
        {   
            chat="J2";
            J2.pause = Date.now();
            J2.chrono=0;
        }
        else if(chat=="J2")
        {   
            chat="J1";
            J1.pause = Date.now();
            J1.chrono=0;
        }
    }
    coins.load();
    coins.play();
    J1.actualisation_J();
    J2.actualisation_J();

}

function verif_direction(direction,x,y,nom,pause)
{
    now = Date.now();
    console.log(now-pause);
    if((nom==chat)&&(now-pause<=Ko))
    {
        return 0;
    }
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

function temps()
{
    now = Date.now();
    dif = (now-old)/1000;
    if(chat=="J1"||chat=="J1S")
    {
        J2.chrono+=dif;
    }
    else if(chat=="J2")
    {
        J1.chrono+=dif;
    }
    J1.actualisation_J();
    J2.actualisation_J();
    old=Date.now();

    if(J1.chrono>=point_max)
    {
        J1.partie_fini();
    }
    else if(J2.chrono>=point_max)
    {
        J2.partie_fini();
    }
}

setInterval("temps()", 1);
init();