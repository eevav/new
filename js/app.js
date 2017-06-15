	
 		function looPallid(kogus){
              var p=[];
              var toonid=["red", "green", "blue", "gray", "black", "white", "brown"];
              for(var i=0; i<kogus; i++){
                 var pall={};
                 pall.x=100*Math.random();
                 pall.y=100*Math.random();
                 pall.r=10*Math.random();
                 pall.dx=-1+2*Math.random();
                 pall.dy=-1+2*Math.random();
                 pall.toon=toonid[parseInt(Math.random()*toonid.length)];
                 p.push(pall);
              }
            return p;
           }
         var pallid=looPallid(20);

		 var t, g; 
		 var ykiirendus=0.2;
		 var algusaeg=new Date().getTime();
		 var pihtasloendur=0, m2ngK2ib=false;
		 var m2nguKestus=10000; 
		 var algraadius=20;
		 var tulemused=[];

		function algus(){
			t=document.getElementById("tahvel");
			g=t.getContext("2d");
			setInterval('liigu()', 50);
			}

		function m2nguAlgus(){
			pihtasloendur=0;
			algusaeg=new Date().getTime();
			document.getElementById("nupp1").style.visibility="hidden";
				for(var i=0; i<pallid.length; i++){
					pallid[i].r=algraadius;
				}
				m2ngK2ib=true;
			 }

		function joonista(){
			g.clearRect(0, 0, t.width, t.height);
				for(var i=0; i<pallid.length; i++){
				 	g.beginPath();
				 	g.fillStyle=pallid[i].toon;
				 	g.arc(pallid[i].x, pallid[i].y, pallid[i].r,
				 	0, 2*Math.PI, true);
				 	g.fill();
			 	}
			}

		 function hiirAlla(e){
			 if(!m2ngK2ib){return;}
			 var tahvlikoht=t.getBoundingClientRect();
			 var hx=e.clientX-tahvlikoht.left;
			 var hy=e.clientY-tahvlikoht.top;
			 for(var i=0; i<pallid.length; i++){
			 	var kaugusx=hx-pallid[i].x;
			 	var kaugusy=hy-pallid[i].y;
			 	var kaugus=Math.sqrt(kaugusx*kaugusx+kaugusy*kaugusy);
			 	if(kaugus<pallid[i].r){
			 		pallid[i].r=pallid[i].r*0.8;
			 		pihtasloendur++;
			 		var lopusona="pall";
			 		if(pihtasloendur>1){
			 			lopusona="korda";
		 		}
			document.getElementById("vastus2").innerHTML=
		 	"Tabatud "+pihtasloendur+" "+lopusona;
			}
		}
		joonista();
		}

		function liigu(){
			if(!m2ngK2ib){return;}
			for(var i=0; i<pallid.length; i++){
				if(!kasSees(pallid[i])){
					p6rka(pallid[i]);
				}
			pallid[i].dy+=ykiirendus;
			pallid[i].x+=pallid[i].dx;
			pallid[i].y+=pallid[i].dy;
			}
			document.getElementById("vastus1").innerHTML=
			"Kulunud "+parseInt((new Date().getTime()-algusaeg)/1000)+" sek ";
			joonista();
			if(new Date().getTime()-algusaeg>m2nguKestus){
				m2ngK2ib=false;
				lisaTulemus(prompt("Palun eesnimi", "Winner"));
				document.getElementById("nupp1").style.visibility="visible";
				}
			}
 	function kasSees(pall){
		if(pall.x-pall.r<0){return false;}
		if(pall.x+pall.r>t.width){return false;}
		if(pall.y-pall.r<0){return false;}
		if(pall.y+pall.r>t.height){return false;}
		return true;
	}

	function p6rka(pall){ 
		if(pall.x-pall.r<0){pall.dx=Math.abs(pall.dx);}
		if(pall.x+pall.r>t.width){pall.dx=-Math.abs(pall.dx);}
		if(pall.y-pall.r<0){pall.dy=Math.abs(pall.dy);}
		if(pall.y+pall.r>t.height){
			pall.dy=-Math.abs(pall.dy);
			pall.y=t.height-pall.r;
		}
	}
 
 
	function kuvaTulemused(){
 		document.getElementById("vastus3").innerHTML = tulemused;
	}
	function lisaTulemus(enimi){
 		tulemused.push(enimi, pihtasloendur);

		kuvaTulemused();
		}

		var xhr=new XMLHttpRequest();
		function loeVeebist(){
		 	xhr.open("GET", "kell.php", false);
		 	xhr.send();
			document.getElementById("kiht1").innerHTML=xhr.responseText;
		}