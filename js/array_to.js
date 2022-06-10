//dibuja la tabla con variables globales , etc
function array_to_table(array,var_b,var_glo,pivot_ligne,pivot_column)
{
  var l = array.length; // 3
  var k = array[0].length;// 5
  console.log(k);
  var i = 0;
  var j = 0;
  var racine = document.getElementById('racine');
  var table = document.createElement('table');
  racine.appendChild(table);
  var tr = document.createElement('tr');
  table.appendChild(tr);
  var th = document.createElement('th');
  
  tr.appendChild(th);
  th.appendChild(document.createTextNode('V.B'))
  var th1 = document.createElement('th');
  tr.appendChild(th1);
  th1.appendChild(document.createTextNode('Z'))

  // inserta variables globales vb, z, x1,x2,s1,s2,bj
  while(j < var_glo.length)
  {
  
    var th = document.createElement('th');
    tr.appendChild(th);
    
    th.appendChild(document.createTextNode(var_glo[j].toString()));
    j++;
  }


  while(i < l)
  {

    var tr = document.createElement('tr');

    var th = document.createElement('th');
    tr.appendChild(th);

    // if(i != l-1)
    //   th.appendChild(document.createTextNode(var_b[i].toString()));
    // else
    //   th.appendChild(document.createTextNode('Z'));

    if(i==0){
      th.appendChild(document.createTextNode('Z'));
    }else{
      th.appendChild(document.createTextNode(var_b[i-1].toString()));
    }

    if(i == 0){
      var z1 = document.createElement('th');
      tr.appendChild(z1)
      z1.appendChild(document.createTextNode('1'))
    }else{
      var z1 = document.createElement('th');
      tr.appendChild(z1)
      z1.appendChild(document.createTextNode('0'))
    }

    table.appendChild(tr);

    // 
    j = 0;
    while(j < k)
    {
      
      var td = document.createElement('td');
      // fila pivote = 1 , columna pivote = 0
      // if(i==pivot_ligne && j==pivot_column) 
      // {
      //   td.setAttribute('class','pivot');
      // }
      // else if(i==pivot_ligne || j==pivot_column)
      // {
      //   td.setAttribute('class','td1');
      // }
      // tr.appendChild(td);

      if(i==pivot_ligne + 1 && j==pivot_column) 
      {
        td.setAttribute('class','pivot');
      }
      else if(i==pivot_ligne + 1 || j==pivot_column)
      {
        td.setAttribute('class','td1');
      }
      tr.appendChild(td);
      
      if(i == 0 ){
        td.appendChild(document.createTextNode(((array[array.length - 1][j])*-1).toFixed(2).toString()));
      }
      
      else{
        td.appendChild(document.createTextNode(array[i-1][j].toFixed(2).toString()));
      }

      if(i == 0 && j == 0){
        array[2][k-1] = array[2][k-1] * -1;
      }
        
      j++;
    }
  
    i++;
  }
  array[2][k-1] = array[2][k-1] * -1


}

// se crea una fila mas (fila Z) y se añade a la tabla inicial
// retorna un array de 3 x 5
function cout_direct(variables,contraintes)
{
  // una tabla de 2 x 5 
  var array = table_initial(variables,contraintes);
  console.log(array);
  var length = array.length; // 2
  var length1 = array[0].length; // 5
  var var_glo = var_globale(variables,contraintes); 
 
  array[length] = Array(); // se crea una fila en la posicion 2 

  // bucle para insertar los coeficientes de X1 y X2(del modelo) en la fila Z
  var k = 0;
  while(k < length1)
  {
    if (var_glo[k].includes('x') == 1)
    {
      //  YARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      var a=document.getElementById('Cj'.concat((k+1).toString()));
      array[length][k]=eval(a.value); //posicion  (2,0) y (2,1)
    }
    else {
      array[length][k]=0;
    }
    k++;
  }
  // console.log(array);
  return(array)
};