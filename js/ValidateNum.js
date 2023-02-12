export function ValidateNum(inputNum) {

    if(inputNum.value !== null && inputNum.value != "") {
        var counter = inputNum.value;
      
      if(counter.length !== 10) {
          //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
          Err(inputNum);
      } else {
      //KINUKUHA YUNG FIRST DIGIT NG INPUT
        var firstDigit = counter.slice(0,1);
        
        if(parseInt(firstDigit) !== 9) {
            Err(inputNum);
        } else {
          Success(inputNum);
        }
      }
    } else {
        Err(inputNum);
    }
}

function Success(input) {
    input.className = 'form-control success';
  }
  
  function Err(input) {
    input.className = 'form-control error';  
  }