/***
 * Developed by :: Amanuel Garomsa Oluma :
 * Studying Computer Science at University Of Addis Ababa.
 * Status :: Still ONGOING
 * [2023 GC]
 */

class Matrix{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        let data = this.data ;
        
        this.data =[]; //this is what i used to store the matrix data in .
        for(let i=0;i<this.rows ; i++){
            this.data[i] =[];//make t 2D
            for(let j=0;j<this.cols;j++){
                this.data[i][j] = Math.floor(Math.random() *10 -1) ;//assign a random number to every position of the matrix
            }
        }
    }
/* TODO:: i need a shortcut to console log both the 2d array as a table and values using the static and dynamic functions 
print() and printf() respectively
*/
//******************************************/
  
print(){ //this prints the matrix in the form of a table.
  console.table(this.data);
}
  /**
 * @param {Matrix|number[][]} input
 * @return {}
 */
static print(input){
    let data = (input instanceof Matrix) ? input.data : input ;
    console.table(input);
  }
  /**
 * @param {any} input
 * @return {}
 */
static printf(input){ // this rints the given value to the console.
   console.log(input);
}
//******************************************/

/*TODO :: now i need to make some functions that operate o  the matrices. 
not go to make a function that generates a zero matrix*/
//******************************************/
  /**
 * @param {number} row
 * @param {number} col
 * @return {Matrix}
 */
static zero(row,col){

 let result = new Matrix(row,col) ;
 for(let i=0;i<row ; i++){
    for(let j=0;j<col;j++){
      result.data[i][j] = 0;
    }
}
 return result;

}
//******************************************/
//now an identity(unit) matrix.
/**
 * @param {number} size
 * @return {Matrix}
 */
static unit(size){ //accepts only one argument because unit matrices are square matrices.
    let result = new Matrix(size);
    for(let i=0;i<size ; i++){
        for(let j=0;j<size;j++){
          result.data[i][j] = (i ==j ) ? 1 :0;
        }
    }
     return result;
}
//******************************************/
//now an upper triangular matrix
/**
 * @param {number} size
 * @return {Matrix}
 */
static upperTriangle(size){ //accepts only one argument because upperTriangulat matrices are also diagonal matrices.
    // this generates an upper trangular matrix with random entries.
    let result = new Matrix(size);
    for(let i=0;i<size ; i++){
        for(let j=0;j<size;j++){
          result.data[i][j] = (i<j) ? Math.floor(Math.random()*10 -1) :0;
        }
    }
     return result;
}
//******************************************/
//and for the lower triangular matrix
/**
 * @param {number} size
 * @return {Matrix}
 */
static lowerTriangle(size){ //accepts only one argument because lowerTriangulat matrices are also diagonal matrices.
    // this generates an upper trangular matrix with random entries.
    let result = new Matrix(size,size);
    for(let i=0;i<size ; i++){
        for(let j=0;j<size;j++){
          result.data[i][j] = (i>j) ? Math.floor(Math.random()*10 -1) :0;
        }
    }
     return result;
}
//******************************************/
/* TODO :: op/erations on matrices : */
  /**
 * @param {number} n
 * @return {Matrix}
 */
translate(n){
  let result = new Matrix(this.rows,this.cols); //to return an instance of the Matrix class as the last output
  for(let i=0;i<this.rows ; i++){
      for(let j=0;j<this.cols;j++){
        result.data[i][j] = this.data[i][j] + n;
      }
  }

  return result;
}
//******************************************/
// the static one....
  /**
 * @param {Matrix} m
 * @param {number} scale
 * @return {Matrix}
 */
static translate(m,scale){
//  if(typeof n !== 'number'){ Matrix.printf('the second argument should always be a number to translate the matrix with.'); return ;}
 /* if(m instanceof Matrix){ //if the argument m is the instance of the Matrix class
    //then use the constructor variables
      for(let i=0;i<this.rows ; i++){
      for(let j=0;j<this.cols;j++){
        result.data[i][j] = this.data[i][j] + m;
      }
  }
  }*/
  // else assume it as just a simple 2d array

  let matrix = (m instanceof Matrix) ? m.data : m ;
  let r = (m instanceof Matrix) ? m.rows : m.length ;
  let c = (m instanceof Matrix) ? m.cols : m[0].length ;
  let r1 = (scale instanceof Matrix) ? scale.rows : scale.length ;
  let c1 = (scale instanceof Matrix) ? scale.cols : scale[0].length ;
  let n = (scale instanceof Matrix) ? scale.data : scale;
/* if n is an instance of the Matrix class the the variable becomes n.data ,else if it is not a number then it is  n[i][j] else it is just n. */
if(((m instanceof Matrix && n instanceof Matrix )&& (r!=r1 || c!=c1))  || ((typeof m !=='number' && typeof n !=='number' )&& (r!=r1 || c!=c1))){
  Matrix.printf('if you want to translate a matrix by another matrix ,then they should have the same size .')
}
  let result = new Matrix(r,c);
  for(let i=0;i<r ; i++){
      for(let j=0;j<c;j++){

          let ad = (typeof n =='number') ? n : n[i][j];
        result.data[i][j] = matrix[i][j] + ad;
      }
  }

  return result;

}
//******************************************/
/*TODO :: multiply a amatrix */
/**********************multiply-dynamic****************** */
    /**
 * @param {Matrix|number[][]} m
 * @return {Matrix}
 */
multiply(m){
  if(typeof m =='number'){
    let result  = new Matrix(this.rows,this.cols) //assign the result  to a result variable
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
  
        result.data[i][j] = this.data[i][j] * m;
      }
    }
  }
  /* assign the neccessary variables to the code if the argument is not a number */
  let matrix = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix[0].length : m[0].length ;
  let result  = new Matrix(this.rows,col1)
/* ***************************** */
if(this.cols !== row1){console.log(`the number of rows of m must equal ${row1} `) ; return ;}
for(let i=0;i<result.rows;i++){
  for(let j=0;j<result.cols;j++){
    let sum = 0 ;
        for(let k=0;k<col1;k++){
         sum += this.data[i][k] * matrix[k][j];
         result.data[i][j] = sum ;
        }
  }
}




return result;
  
}
/*********transpoce of a matrix ****************************/
    /**
 * @param {Matrix|number} m 
 * @return {Matrix}
 */
static transpose(m){
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  let result = new Matrix(col1,row1);
  for(let i=0;i<result.rows;i++){
    for(let j=0;j<result.cols;j++){
      result.data[i][j] = matrix1[j][i];
    }
  }
return result;
}
/***********************multiply-static************************ */
/**
 * @param {Matrix|number[][]} row
 * @param {Matrix|number[][]} col
 * @return {Matrix}
 */
static multiply(m,n){
  /* assign the neccessary variables to the code for the first argument if the argument is not a number */
  /* if i assigned  the variable for the second argument n , i would struggle to handle the ocde when n is a number not a matrix */
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  //********************************** */
  if(typeof n =='number'){
    let result  = new Matrix(row1,col1) //assign the result  to a result variable
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
  
        result.data[i][j] = matrix1[i][j] * n;
      }
    }
  }
  let matrix2 = (n instanceof Matrix) ? n.data : n ;
  let row2 =  (n instanceof Matrix) ? matrix2.length : n.length ;
  let col2 =  (n instanceof Matrix) ? matrix2[0].length : n[0].length ;
  let result  = new Matrix(row1,col2)
/* ***************************** */
if(col1 !== row2){console.log(`the number of rows of m must equal ${row2} . unfortunately ${col1} is not equal to ${row2}`) ; return ;}
for(let i=0;i<result.rows;i++){
  for(let j=0;j<result.cols;j++){
    let sum = 0 ;
        for(let k=0;k<col1;k++){
         sum += matrix1[i][k] * matrix2[k][j];
         result.data[i][j] = sum ;
        }
  }
}


return result;
  
}

/***************************************** */
//row multiply
    /**
 * @param {Matrix} m
 * @param {number} row
 * @param {number} scale
 * @return {Matrix}
 */
static rowScale(m,row,scale){ //is used to make a scalar multiplication with a specified row.
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  let result = new Matrix(row1,col1);
  for(let i=0;i<result.rows;i++){
    for(let j=0;j<result.cols;j++){
     result.data[i][j] = (i==(row-1))? (matrix1[i][j]*scale):(matrix1[i][j]);
    }
  }
  
  

return result;
}
/**
 * @param {Matrix} m
 * @param {number} col
 * @param {number} scale
 * @return {Matrix}
 */
//column multiply
static columnScale(m,col,scale){ //is used to make a scalar multiplication with a specified row.
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  let result = new Matrix(row1,col1);
  for(let i=0;i<result.rows;i++){
    for(let j=0;j<result.cols;j++){
     result.data[i][j] = (j==(col-1))? (matrix1[i][j]*scale):(matrix1[i][j]);
    }
  }
  
  

return result;
}
/** TODO :: but before this i have to make a minor function  to get the minor of the matrix during iteration
 * a code to find the minor of a matrix at a given position .
 */
    /**
 * @param {Matrix} m
 * @param {number} i
 * @param {number} j
 * @return {Matrix}
 */
 static getminor(m,i,j){
  const getcut =(arr,index) => [...arr.slice(0,index),...arr.slice(index+1)]
  let newrow = getcut(m,i)//.map(row=>{
  //    getcut(row,j)
 // })
 let newnewrow = newrow.map(row => getcut(row,j))
  return newnewrow;
}
/******************Matrix determinant******************** */
    /**
 * @param {Matrix} m
 * @return {Matrix}
 */
static determinant(m){

  const sign =  (index) => index % 2 === 0 ? 1:-1 ; //a function that returns the sign according to the position of the element in matrix
    if(m instanceof Matrix){
      let mtrx = m.data ;
      if(m.rows ==1){
        return mtrx[0][0]
    }

   
    
    return mtrx[0].reduce((sum,curr,j) => sum +sign(j)*curr* (this.determinant(this.getminor(m.data,0,j)) ),0);

    }
    if(m.length ==1){
        return m[0][0]
    }

  
   
    return m[0].reduce((sum,curr,j) => sum +sign(j)*curr* (this.determinant(this.getminor(m,0,j)) ),0);


}
/**
 * @param {Matrix} m
 * @return {Matrix}
 */
/*************************the Minor of a Matrix**************************** */
static minor(m){ //this is the code used to get the minor of the matrix in general and then return the result as an instance of the Matrix class
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  let result = new Matrix(row1,col1);

          for(let i=0;i<row1;i++){
             for(let j=0;j<col1;j++){
              
                     result.data[i][j] = this.determinant(this.getminor(matrix1,i,j));
             }
           }


return result;

}
/******************** Cofactor of a Matrix************************** */
/**
 * @param {Matrix} m
 * @return {Matrix}
 */
static cofactor(m){//this code calculates the cofactor of each element in the given matrix and spill it to a new instance of the Matrix class and then 
  //returns it .
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1[0].length : m[0].length ;
  let result = new Matrix(row1,col1);

          for(let i=0;i<row1;i++){
             for(let j=0;j<col1;j++){
               let sign = ((i+j)%2 ==0)? 1:-1;
                      
                     result.data[i][j] = sign * this.determinant(this.getminor(matrix1,i,j));
                     
             }
           }


return result;
}
/****************** Adjoint of a Matrix************************ */
   /**
 * @param {Matrix} m
 * @return {Matrix}
 */
static adjoint(m){
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let result = new Matrix(row1,col1);
   
          for(let i=0;i<row1;i++){
             for(let j=0;j<col1;j++){
               
               let cofact =matrix1[i][j] * this.determinant(this.getminor(matrix1,i,j));
               this.printf(cofact);
                     result.data[i][j] =(this.cofactor(m)).data[i][j];
                     
             }
           }
 

return this.transpose(result);
}
    /**
 * @param {Matrix} m
 * @return {Matrix}
 */
/*********inverse of a matrix ***********************  */
static inverse(m){//it returns the inverse of a matrix m.
  let matrix1 = (m instanceof Matrix) ? m.data : m ;
  let row1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let col1 =  (m instanceof Matrix) ? matrix1.length : m.length ;
  let result = new Matrix(row1,col1);
  let adjoint = this.adjoint(matrix1).data;
  let det_inv = 1/(this.determinant(matrix1));

  for(let i=0;i<row1;i++){
    for(let j=0;j<col1;j++){
      let sign = ((i+j)%2 ==0)? 1:-1;
            result.data[i][j] =det_inv * adjoint[i][j] ;
            
    }
  }

  return result ;
}

}


module.exports  ={Matrix};

