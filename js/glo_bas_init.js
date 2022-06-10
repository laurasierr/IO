// determina las variables globales , cabecera de la matriz ["x1", "x2", "e1", "e2", "b"]
function var_globale(variables,contraintes)
{
  var array=Array();
  var i = 0;
  var j = 0;
  while (i < variables) 
  {
    array[j] = 'x'.concat((i+1).toString());
    i++;
    j++;
  }
  i = 0;
  while(i < contraintes)
  {
    // toma la referencia del select (<= , =, >=)
    var c = document.getElementById('contraint'.concat((i+1).toString()));

     // evalua la condicianal de las respectivas restricciones, 
    // si es <= o => se le concatena al array una S (e = S)
    if(c.value != '=')
    {
      array[j] = 's'.concat((i+1).toString());
      j++;
    }
    i++;
  }
  i = 0;
  while(i < contraintes)
  {
    // toma la referencia del select (<= , =, >=)
    var c = document.getElementById('contraint'.concat((i+1).toString()));
    // toma la referencia de las disponibilidades en el modelo
    var d = document.getElementById('b'.concat((i+1).toString())); 

    // evalua la condicianal de las respectivas restricciones, 
    // si es = o => se le concatena al array una R (a = R)
    if(c.value != '<=')
    {
      array[j] = 'a'.concat((i+1).toString());
      j++;
    }
    i++;
  }

  // finalmente se añada a la posicion array[2] la disponibilidad,
  // para el ejemplo de 2 variables y 2 restricciones
  array[j] = 'bj';
  return (array);
}

// determina las variables que estan en la base 
// recibe como paramentro las variables y restricciones
function var_base(variables,contraintes)
{
    // se instancia un array
    var array = Array();
    var i = 0;
    var j = 0;
    while(i < contraintes)
    {
      // toma la referencia del select (<= , =, >=)
      var c = document.getElementById('contraint'.concat((i+1).toString()));
      // toma la referencia de las disponibilidades en el modelo
      var d = document.getElementById('b'.concat((i+1).toString()));

      // si el valor del select es = o >= se agrega la Ri respectivamente
      if(c.value != '<=') 
      {
        array[j] = 'a'.concat((i+1).toString());
        j++;
      }
      // si el valor del select es <= se agrega las Si respectivamente
      else
      {
        array[j] = 's'.concat((i+1).toString());
        j++;
      }
      i++;
    }
    // console.log(array);
    return (array);
}
// completa la tabla inicial
function table_initial(variables,contraintes)
{
  var i = 0;
  var t;
  var k;
  var j;

  // se instancia un array
  var array = Array();

  while (i < contraintes)
  {
    array[i]=Array();
    j = 0;
    while(j < variables)
    {
      // toma la referencia de las restricciones en el modelo 
      var a = document.getElementById('x'.concat((i+1).toString(),(j+1).toString()));
      // se añade el valor de la restricciones del modelo a la tabla
      // posicion (0,0) se añade el valor de X11, posicion (0,1) se añade el valor de X12
      array[i][j] = eval(a.value); 
      j++; // queda en 2 en el primer bucle
    }

    // Bucle para añadir las S's
    t = 1;
    while(t <= contraintes)
    { 
      // toma la referencia de la desigualdad en el modelo
      var a = document.getElementById('contraint'.concat(t.toString()));
      
      
      if(t == i + 1)
      {
        
        if(a.value == '<=')
        {
          // posicion (0,2)
          array[i][j] = 1;
          j++; // 3
        }
        else if(a.value == '>=')
        {
          array[i][j] = -1;
          j++;
        }
      }
      
      else
      {
        // si la desigualdad es <= o >=
        if(a.value != '=')
        {
          // posicion (0,3)
          array[i][j] = 0;
          j++; // valor 4
        }
      }
      t++; // 2
    }

    // bucle para añadir las Rs
    k = 1;
    while(k <= contraintes)
    {
      // toma la referencia de la desigualdad en el modelo
      var a = document.getElementById('contraint'.concat(k.toString()));
      if(k == i + 1)
      {
        // si la desigualdad es = o >=
        if(a.value != '<=')
        {
          array[i][j] = 1;
          j++;
        }
      }
      else
      {
        if(a.value != '<=')
        {
          array[i][j] = 0;
          j++;
        }
      }
      k++;
    }
    array[i][j] = eval(document.getElementById('b'.concat((i+1).toString())).value);
    i++;
  }
  // console.log(array);
  return array;
}
