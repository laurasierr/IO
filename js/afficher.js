

// recibe como parametros la cantidad de varibales y restricciones
// valida los inputs del modelo matematico
function afficher(variables,contraintes)
{
  var i = 0;
  var j = 0;
  var t=0;
  var non_bor = 0;
  // SE VALIDA LAS RESTRICCIONES - MODELO
  while(i < contraintes){
    j = 0;
    while(j < variables){
      var t = document.getElementById('x'.concat((i+1).toString(),(j+1).toString()));
      try {
        eval(t.value);
      }catch(e){
        if (e instanceof ReferenceError){
          t.value="";
          t.setAttribute('class','vide');
          t.setAttribute('placeholder','No valido');
          t = 1;
        }
      }
      if(t.value == ""){
        t.setAttribute('class','vide');
        t.setAttribute('placeholder','No valido');
        t = 1;
      }
      j++;
    }
    var t = document.getElementById('b'.concat((i+1).toString()));
    try {
      eval(t.value);
    }catch(e){
      if (e instanceof ReferenceError)
      {
        t.value="";
         t.setAttribute('class','vide');
          t.setAttribute('placeholder','No valido');
          t = 1;
      }
    }
    if(t.value == ""){
      t.setAttribute('class','vide');
      t.setAttribute('placeholder','No valido');
      t = 1;
    }
    i++;
  }

  // SE VALIDA LA FUNCION OBJETIVO - MODELO
  i = 0;
  while(i < variables)
  {
    var t1 = document.getElementById('Cj'.concat((i+1).toString()));
    try {
      eval(t1.value);
    }catch(e){
      if (e instanceof ReferenceError)
      {
        t1.value="";
        t1.setAttribute('class','vide');
        t1.setAttribute('placeholder','No valido');
        t = 1;
      }
    }
    if(t1.value == "")
    {
      t1.setAttribute('class','vide');
      t1.setAttribute('placeholder','No valido');
      t = 1;
    }
    i++;
  }
  if (t==1)
    return (1);
  
  
  convert(contraintes,variables); // SI SE TIENE DISPONIBILIDADES NEGATIVAS SE LE MULTIPLCA POR -1 

  var a = document.getElementById('radio1'); // dertermina si es MAX O MIN 

  if(a.checked)
  { 
    // RECIBE LAS VARIANLES GLOBALES ["x1", "x2", "e1", "e2", "b"]
    var a = var_globale(variables,contraintes);
    var b = a.toString();

    // verifica si hay R's(a=R) en las variables globales
    if(b.includes('a') == 1)
    {
        var a = cout_phase2(variables,'max',variables,contraintes);
        if(a == 0 || a == -1)
        {
            if(a == 0)
              document.getElementById('racine').appendChild(document.createTextNode('Ensemble vide'));
            if(a == -1)
            {
                document.getElementById('racine').appendChild(document.createTextNode('Probleme non borne'));
                non_bor = 1;
            }
        }
        else
        {
        var var_b = a[1];
        var array = a[0];
        var i = 0;
        var index;
        var length = array[0].length;
        while(i < variables)
        {
          if(var_b.indexOf('x'.concat((i+1).toString())) != -1)
          {
            index = var_b.indexOf('x'.concat((i+1).toString()));
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = ',array[index][length - 1].toString())));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          else {
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = 0 ')));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          i++;
        }
        document.getElementById('racine').appendChild(document.createTextNode('Z = '.concat(array[array.length - 1][length - 1])));
      }
    }

    // si no hay R's 
    else
    {
        var a = resolution_max(cout_direct(variables,contraintes),var_globale(variables,contraintes),var_base(variables,contraintes),indice_max,0);
        // si a vale -1 el problema es ilimitado porque no se satisdface la condicion de 
        // factibilidad ya que ninguna vcariable puede entrar a la base
        if(a == -1)
        {
          document.getElementById('racine').appendChild(document.createTextNode("El problema tiene solucion ilimitada (no acotada), no se satisface la condicion de factibilidad, ya que ninguna variable puede salir de la base. Por lo tanto la solucion es ilimitada. "));
          return (1);
        }
        var i = 0;
        var var_b = a[1];
        var array = a[0];
        var index;
        var length = array[0].length; // 5

        document.getElementById('racine').appendChild(document.createTextNode('El valor optimo es '))
        document.getElementById('racine').appendChild(document.createElement('br'))
        document.getElementById('racine').appendChild(document.createTextNode('Z = '.concat(array[array.length - 1][length - 1])));
        document.getElementById('racine').appendChild(document.createElement('br'))
        document.getElementById('racine').appendChild(document.createTextNode('con los valores de '))
        document.getElementById('racine').appendChild(document.createElement('br'))

        while(i < variables)
        {
          // ver si la variable esta en la base (tablero optimo)
          if(var_b.indexOf('x'.concat((i+1).toString())) != -1)
          // si esta en la base, asigna el valor de las disponibildades a la variable que esta en la base
          {
            index = var_b.indexOf('x'.concat((i+1).toString()));
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = ',array[index][length - 1].toString())));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          // sino esta en la base
          else {
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = 0 ')));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          i++;
        }
       
    }
  }
  else
  {
    var a = var_globale(variables,contraintes);
    var b = a.toString();
    if(b.includes('a') == 1)
    {
        var a = cout_phase2(variables,'min',variables,contraintes);
        if(a == 0 || a == -1)
        {
            if(a == 0)
              document.getElementById('racine').appendChild(document.createTextNode('Ensemble vide'));
            if(a == -1)
            {
                document.getElementById('racine').appendChild(document.createTextNode('Probleme non borne'));
                non_bor = 1;
            }
        }
        else
        {
        var var_b = a[1];
        var array = a[0];
        var i = 0;
        var index;
        var length = array[0].length;
        while(i < variables)
        {
          if(var_b.indexOf('x'.concat((i+1).toString())) != -1)
          {
            index = var_b.indexOf('x'.concat((i+1).toString()));
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = ',array[index][length - 1].toString())));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          else {
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = 0 ')));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          i++;
        }
        document.getElementById('racine').appendChild(document.createTextNode('Z = '.concat(array[array.length - 1][length - 1])));
      }
    }
    else
    {
        var a = resolution_min(cout_direct(variables,contraintes),var_globale(variables,contraintes),var_base(variables,contraintes),indice_min,0);
        if(a == -1)
        {
          document.getElementById('racine').appendChild(document.createTextNode('Probleme non borne'));
          return (1);
        }
        var i = 0;
        var var_b = a[1];
        var array = a[0];
        var index;
        var length = array[0].length;
        while(i < variables)
        {
          // ver si la variable esta en la base
          if(var_b.indexOf('x'.concat((i+1).toString())) != -1)
          {
            index = var_b.indexOf('x'.concat((i+1).toString()));
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = ',array[index][length - 1].toString())));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          // evalua si la variable esta en la base o no 
          else {

            // 
            document.getElementById('racine').appendChild(document.createTextNode('x'.concat((i+1).toString(),' = 0 ')));
            document.getElementById('racine').appendChild(document.createElement('br'));
          }
          i++;
        }
        document.getElementById('racine').appendChild(document.createTextNode('Z = '.concat(array[array.length - 1][length - 1])));
    }
  }
	if(variables == 2)
  {
    var a = document.getElementById('racine');
    a.appendChild(document.createElement('br'));
    var final;
    final = document.createElement('button');
    final.setAttribute('class', "btn btn-primary")
    final.onclick = function()
    {
    	draw(variables,contraintes,non_bor);
    };
    
  }
}
