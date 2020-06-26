
window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
    var obFilme;

	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
				
					var obJson = JSON.parse(this.responseText);
					obFilme = obJson.filme;
					
					if(!localStorage.getItem("actual"))
					{
						localStorage.setItem("actual", JSON.stringify(obFilme));
						localStorage.setItem("original", JSON.stringify(obFilme));
						
					}
					obFilme=JSON.parse(localStorage.getItem("actual"));
						
					
					
					afiseajaJsonTemplate(obFilme);
					
					
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/film.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obFilme) { 
			
			let container=document.getElementById("afisTemplate");
		    localStorage.setItem("actual",JSON.stringify(obFilme));
			
			let textTemplate ="";
			
			for(let i=0;i<obFilme.length;i++){
				
				textTemplate+=ejs.render("<div class='templ_film'>\
				<p>Id: <%= film.id %></p>\
                <p>Nume: <%= film.nume %></p>\
                <p>Genul: <%= film.gen %> </p>\
                <p>Durata: <%= film.durata %>  </p>\
                <p>Acord Parental: <%= film.acord_parental %> </p>\
                <p>Data lansarii: <%= film.data %> </p>\
                <p>Actori: <%= film.actori %> </p>\
				</div>", 
				{film: obFilme[i]});
			} 
			
			container.innerHTML=textTemplate;
	}
	
	// SORTARE --- merge
	/*La click pe butonul "Sorteaza filme dupa durata" se vor sorta elevii dupa medie. (Indicatii: Array.sort(), Array.reduce(), appendChild)*/
		document.getElementById("sorteaza_durata").onclick=function(){
			obFilme.sort(function(a,b)
			{
				return a.durata-b.durata;
			});
		
		afiseajaJsonTemplate(obFilme);
    }
	
	
	// STERGERE --- merge
	document.getElementById("sterge_gen").onclick=function(){
	var rasp_prompt=prompt("Sterge filmele de genul ...", "comedie");
	var rasp_confirm=confirm("Stergi?")
	if(rasp_confirm)
	{
		//var c=document.getElementsByClassName("templ_film");
		
		
		for(let i=0;i<obFilme.length;i++)
		{
			var co=obFilme[i].gen;
			console.log(co);
			if(co==rasp_prompt)
			{obFilme.splice(i,1);
			i-=1;
			}
		}
		
	}
	afiseajaJsonTemplate(obFilme);
	}
	// FILTRARE --- merge
	
    document.getElementById("filtru_multiplu").onclick=function(){
        var optiuni = document.getElementById("select_multiplu").options;
        var vectorFiltrare = [];
        for(let opt of optiuni){
                if(opt.selected)
                       for(let film of obFilme)
                        if(opt.value == film.acord_parental)
                                vectorFiltrare.push(film);
        }
        afiseajaJsonTemplate(vectorFiltrare);
    }
	
	// RESET -- merge
	/*document.getElementById("reset").onclick=function(){
        //obFilme=JSON.parse(localStorage.getItem("original"));
		var obJson = JSON.parse(this.responseText);
	    obFilme = obJson.filme;
		localStorage.clear();
        afiseajaJsonTemplate(obFilme);
		
    }*/
	document.getElementById("reset").onclick=function(){
     obFilme = JSON.parse(localStorage.getItem("original"));
         afiseajaJsonTemplate(obFilme);
    }
	
	// CALCULARE -- merge
	document.getElementById("calculeaza_suma").onclick=function(){

		var c=document.getElementsByClassName("templ_film");
		var suma=0;
		
		for(let i=0;i<c.length;i++)
		{
			var co=c[i].children[3].innerHTML.split(" ")[1];
			console.log(co);
			suma+=Number(co);
		}
		alert(suma);
	}
	
	// CREARE DE ELEMENT 
	document.getElementById("citate").onclick=function() {
    var para = document.createElement("P");
    para.innerText = "This is a paragraph.";
     document.getElementById("separator1").appendChild(para);
	}
	
	
	
}