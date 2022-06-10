//var variables = prompt('Entrez le nombre de variables') ;
//var contraintes = prompt('Entrez le nombre de contraintes');

// inicio de todo
// se crean los inputs de entrada para variables y restricciones
var a = document.getElementById('racine');
var division = document.createElement('div');
division.appendChild(document.createTextNode('Variables de decision  '));
division.setAttribute('class','col-md-6');
division.setAttribute('id','destroyed');
a.appendChild(division);
division.appendChild(document.createElement('br'));
var var1 = document.createElement('input');
var1.setAttribute('id','variables');
var1.setAttribute('type','text');
division.appendChild(var1);
division.appendChild(document.createElement('br'));
division.appendChild(document.createTextNode('Restricciones  '));
division.appendChild(document.createElement('br'));
var con1 = document.createElement('input');
con1.setAttribute('id','contraints');
con1.setAttribute('type','text');
division.appendChild(con1);
division.appendChild(document.createElement('br'));
var butt = document.createElement('button');
butt.setAttribute('class', "btn btn-primary")
var t=0;

// Evento para validar los campos de variables y restricciones
butt.onclick = function() {
	t = 0;
	try {
		eval(var1.value);
	}catch(e){
		if (e instanceof ReferenceError)
		{
			var1.value="";
			var1.setAttribute('class','vide');
			var1.setAttribute('placeholder','no valido');
			t = 1;
		}
	}
	if(Number.isInteger(eval(var1.value)) == 0 || eval(var1.value) <= 0 )
	{

		var1.setAttribute('class','vide');
		var1.value="";
		var1.setAttribute('placeholder','no valido');
		t = 1;
	}
	try {
		eval(con1.value);
	}catch(e){
		if (e instanceof ReferenceError)
		{
			con1.value="";
			con1.setAttribute('class','vide');
			con1.setAttribute('placeholder','no valido');
			t = 1;
		}
	}
	if(Number.isInteger(eval(con1.value)) == 0 || eval(con1.value) <= 0 )
	{

		con1.setAttribute('class','vide');
		con1.value="";
		con1.setAttribute('placeholder','no valido');
		t = 1;
	}
	if(t==1)
		return (1);
	
	// se llama la funcion afficher2 y se envia dos parametros (# variables y # restricciones validadas)
	afficher2(var1.value,con1.value);
};
division.appendChild(butt);
butt.appendChild(document.createTextNode("Generar Modelo"));
division.appendChild(document.createElement('br'));
division.appendChild(document.createElement('br'));



// SI SE TIENE DISPONIBILIDADES NEGATIVAS SE LE MULTIPLCA POR -1 
// Y SE CAMBIA EL SENTIDO DE LA DESIGUALDAD
function convert(contraintes,variables,variables,contraintes)
{
  var i = 0;
  var k;
  while(i < contraintes)
  {
    var a =document.getElementById('b'.concat((i+1).toString()));
    if(eval(a.value) < 0)
    {
      a.value = eval(a.value)*(-1);
      k = 0;
      while (k < variables)
      {
        var a = document.getElementById('x'.concat((i+1).toString(),(k+1).toString()));
        a.value = eval(a.value)*(-1);
        k++;
      }
      var a=document.getElementById('contraint'.concat((i+1).toString()));
      if(a.value == '>=')
      {
        a.value='<=';
      }
      else if (a.value == '<=')
      {
        a.value='>=';
      }
    }
    i++;
  }
}
