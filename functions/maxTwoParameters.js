// max two patameters in input of function
//wrong ❌
function newUerRegister(name , password , otp , city , gender) {

}
// ok✅
function newUerRegister({name , password , otp , city , gender}) {

}
// ok✅
function newUerRegister({name , password , otp , city , gender},{isVerify}) {

}