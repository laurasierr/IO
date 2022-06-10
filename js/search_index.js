
function indice_min(array)
{
  var j = 0;
  min = 0;
  while(j < array.length - 1)
  {
    if(parseFloat(array[min]) > parseFloat(array[j]))
    {
      min = j;
    }
    j++;
  }
  return (min);
}
//premier minimum
function indice_min1(array)
{
  var j = 0;
  while(j < array.length - 1)
  {
    if(parseFloat(array[j]) < 0)
    {
      return j;
    }
    j++;
  }
  return (j);
}

// recibe como parametro un array (fila Z)
// determina que variable que va a entrar a la base
// retorna el indice, osea la columna pivote
function indice_max(array)
{
  var j = 0;
  max = 0;
  while(j < array.length - 1) // 4 bucles 
  {
    if(parseFloat(array[max]) < parseFloat(array[j]))
    {
      max = j;
    }
    j++;
  }
  return (max); // retorna max = 0
}
//premier maximum
function indice_max1(array)
{
  var j = 0;
  while(j < array.length - 1)
  {
    if(parseFloat(array[j]) > 0)
    {
      return (j);
    }
    j++;
  }
  return (j);
}

function negative_exist(array)
{
  var j = 0;
  while(j < array.length - 1)
  {
    if(parseFloat(array[j]) < 0)
      return (1);
    j++;
  }
  return(0);
}

// recibe por parametro un array ( fila Z )
// si po lo menos 1 es positivo retorna 1 sino retorna 0
function positive_exist(array)
{
  var j = 0;
  while(j < array.length - 1)
  {
    if(parseFloat(array[j]) > 0)
      return (1);
    j++;
  }
  return(0);
}
