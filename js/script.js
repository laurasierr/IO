function InitTable() {
    var t = new Array();
    var Count = parseInt(VN);
    //obtain total counts of table
    for (i = 0; i < CN; i++) {
        s = document.getElementById("equ" + i).options[document.getElementById("equ" + i).selectedIndex].text;
        if (s == "<=") {
            Count++;
        }
        if (s == ">=") {
            Count = Count + 2;
        }
        if (s == "=") {
            Count++;
        }
    }
    Count = Count + 1; //add z var
    //simplify function
    for (j = 1; j <= VN; j++) {

    }
    for (k = j; k < Count; k++) {
        t[0][k] = 0;
    }
    //handle table header
    for (k = 1; k <= VN; k++) {
    }
    //handle constraints
    var index;
    index = 1;
    for (i = 1; i <= CN; i++) {
        t[i] = new Array(Count);
        t[i][0] = 0;
        for (j = 1; j < Count; j++) {
            if (j <= VN) {
               
            }
            if (j > VN) {

            }
        }
        bb = document.getElementById("equ" + (i - 1)).options[document.getElementById("equ" + (i - 1)).selectedIndex].text;
        if (bb == "<=") {
         
        }
        if (bb == ">=") {
          
        }
        if (bb == "=") {
    
        }
    }
    ////////////////////////////////////////////////////////
    a = new Array(parseFloat(CN) + 1);
    for (i = 0; i < a.length; i++) {
        a[i] = new Array(Count - 1);
    }
    b = new Array(parseFloat(CN) + 1); 
    row = parseFloat(CN) + 1;
    col = Count - 1;
    M = new Array(col+1);
    //////////////////////////////////////////////
    for (i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {
            a[i][j] = t[i][j + 1];
        }
        b[i] = rhs[i];
    }
    //////////////////////////////////////////
    var te;
    for(i=0;i<col+1;i++)
    M[i]=0;
    for (j = 0; j < col; j++) {
        if (a[0][j] == "M"||a[0][j]=="-M") {
          
            }
        }
    }
    showtable();
