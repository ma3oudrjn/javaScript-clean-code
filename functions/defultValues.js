function sleepServer(time = 200){
    return new Promise(resolve => setTimeout(resolve, time));
}

const defultConfig ={
    name:"defultConfig",
    data:undefined,
    time: Date.now(),
}

function createConfig (input){
    const config = Object.assign(defultConfig,input );
    return config
}

const newConfig ={
    name:"jhvh",
    data: 'kvjuyf',
    time: Date.now(),
}
console.log(createConfig(newConfig))

