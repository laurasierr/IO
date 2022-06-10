
function resolution_min(array,var_glo,var_b,indice_min,type)
{
  var i = array.length;
  var j = array[0].length;
  var pivot_ligne;
  var pivot_column;
  var degen_check;
  var pivot;
  var pivot2;
  var k = 0;
  var d = 0;
  while(negative_exist(array[i-1]) == 1)
  {
      pivot_column = indice_min(array[i - 1]);
      pivot_ligne = rationel(array,pivot_column);
      if(pivot_ligne == -1)
        return(-1);
      degen_check = degeneresence(array,pivot_column);
      if(degen_check != 1 && type == 0)
      {
        document.getElementById('racine').appendChild(document.createTextNode('probleme de degeneresence'));
        return(resolution_min(array,var_glo,var_b,indice_min1,1));
      }
      array_to_table(array,var_b,var_glo,pivot_ligne,pivot_column);
      var_b[pivot_ligne] = var_glo[pivot_column];
      pivot=array[pivot_ligne][pivot_column];
      k = 0;
      while(k < j)
      {
        array[pivot_ligne][k] = parseFloat(array[pivot_ligne][k])/parseFloat(pivot);
        k++;
      }
      k = 0;
      while(k < i)
      {
        pivot2 = array[k][pivot_column];
        d = 0;
        while(d < j)
        {
          if(k != pivot_ligne)
          {
            if(d!=j-1 || k!=i-1)
            {
              array[k][d] = parseFloat(array[k][d]) - parseFloat(pivot2) * parseFloat(array[pivot_ligne][d]);
            }
            else
            {
              array[k][d] = parseFloat(array[k][d]) + parseFloat(pivot2) * parseFloat(array[pivot_ligne][d]);
            }
          }
          d++;
        }
        k++;
      }
  }
  array_to_table(array,var_b,var_glo,-1,-1);
  return([array,var_b]);
}

function resolution_max(array,var_glo,var_b,indice_max,type){
  var i = array.length; // 3 
  var j = array[0].length; // 5
  var pivot_ligne;
  var pivot_column;
  var pivot; // elemento pivote, interseccion de la fila y columna pivote
  var pivot2; // pivote de cada
  var degen_check;
  var k = 0;
  var d = 0;

  // revisa la posicion 2 del array (fila Z)
  while(positive_exist(array[i-1]) == 1){
      pivot_column = indice_max(array[i - 1]); // columna pivote columna 0
      pivot_ligne = rationel(array,pivot_column); // fila pivote fila 0

      if(pivot_ligne == -1)
      {
        array_to_table(array,var_b,var_glo,pivot_ligne,pivot_column);
        return(-1);
      }
      // retorna 1 si no hay empates al momento de evaluar la variable que sale
      // si retorna diferente de 1 entonces la solucion es degenerada
      degen_check = degeneresence(array,pivot_column); // l=1

      if(degen_check != 1 && type == 0)
      {
        document.getElementById('racine').appendChild(document.createElement('br'))

        document.getElementById('racine').appendChild(document.createTextNode('El problema tiene solucion degenerada, es decir el modelo tiene al menos una restriccion redundante, una variable basica sera 0 en la siguiente iteracion, caso en el cual se dice que la nueva solución es degenerada '));
        return(resolution_max(array,var_glo,var_b,indice_max1,1));
      }

      // pinta las tablas
      array_to_table(array,var_b,var_glo,pivot_ligne,pivot_column);
      // se actualiza las v q estan en la base
      var_b[pivot_ligne] = var_glo[pivot_column];
      pivot = array[pivot_ligne][pivot_column];

      k = 0;
      while(k < j){
        // divide las disponibilidades entre los coeficientes que estan debajo de la 
        // variable que entra a la base
        array[pivot_ligne][k] = parseFloat(array[pivot_ligne][k])/parseFloat(pivot);
        
        k++;
      }
      k = 0;
      // hace las operaciones fila, hacen el vector unitario
      while(k < i)
      {
        // pivote de la fila
        pivot2 = array[k][pivot_column];
        d = 0;
        while(d < j)
        {
          if(k != pivot_ligne)
          {
            if(d!=j-1 || k!=i-1) // 0 =! 4 , 0 != 2
            {
              // Fila nueva =  Fila vieja - (pivote de la fila * Fila entrante)
              array[k][d] = parseFloat(array[k][d]) - parseFloat(pivot2) * parseFloat(array[pivot_ligne][d]);
            }
            else
            {
              // para la bj del Z
              // = 0 - 300x6
              array[k][d] = parseFloat(array[k][d]) + parseFloat(pivot2) * parseFloat(array[pivot_ligne][d]);
            }
          }
          d++;
        }
        k++;
      }
  }
  array_to_table(array,var_b,var_glo,-1,-1);
  // retorna un array [array, var_b]
  return([array,var_b]);
}
// Determina la fila pivote
// array de 3x5 , i = 0 -> columna pivote
function rationel(array,i)
{
  var j = 0;
  var k = 0;
  var longeur = array[0].length; // 5
  while(parseFloat(array[j][i]) <= 0 && j < array.length - 1) // (0 < 2)
  {
    j++;
  }

  // si todos los elementos debajo de la columna pivote son negativos
  if(j == array.length - 1) // (0 == 2)
    return (-1);

  k = j + 1; // 1
  while(k < array.length - 1) // 1 < 2
  {
    if(parseFloat(array[j][longeur - 1])/parseFloat(array[j][i]) > parseFloat(array[k][longeur - 1])/parseFloat(array[k][i]))
    {
      if(parseFloat(array[k][i]) > 0)
      {
        j = k;
      }
    }
    k++;
  }
  return (j); // 0
}
//degeneresence existe
// i = 0
function degeneresence(array,i)
{
  var j = 0;
  var k = 0;
  var longeur = array[0].length; // 5
  var l = 1;

  // verifica si hay negativos debajo de la columna pivote
  while(parseFloat(array[j][i]) <= 0 && j < array.length - 1)
  {
    j++;
  }
  k = j + 1; // 1 , si todos son posirtivos
  while(k < array.length - 1) // 2 <2 (ultimo bucle)
  {
    // division de las disponibilidades y los coeficientes debajo de la columna pivote
    if(parseFloat(array[j][longeur - 1])/parseFloat(array[j][i]) == parseFloat(array[k][longeur - 1])/parseFloat(array[k][i]))
    {
      if(parseFloat(array[k][i]) > 0)
      {
        l++; // 1
      }
    }
    if(parseFloat(array[j][longeur - 1])/parseFloat(array[j][i]) > parseFloat(array[k][longeur - 1])/parseFloat(array[k][i]))
    {
      if(parseFloat(array[k][i]) > 0)
      {
        j = k;
        l = 1;
      }
    }
    k++;
  }
  return (l);
}
