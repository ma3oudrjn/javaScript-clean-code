let isDone = false

//wrong ❌
try{
    isDone = true

}catch(e){
    console.error(e)
    report(e)
    isDone = true
}

// ok✅
try{
}catch(e){
    console.error(e)
    report(e)
}finally {
    isDone = true
}

//note: use finally if in try and catch use one thing dont write more code