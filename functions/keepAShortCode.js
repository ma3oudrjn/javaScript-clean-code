// 1-Do one thing
const saveNewPassword = (newPassword, oldPassword) => {
    const user = userModel.findOneAndUpdate({password: oldPassword}, {password: newPassword});
    if (!user) {
        return res.status(200).json({message: "user not found"});
    }
    user.save()
    //save in local storage!!
    localStorage.setItem("user", JSON.stringify(user));
}

//2-extracting other function
const loginTime = () => {
    setTimeout(console.log("loading"), 200)
}
const login = (password, userName) => {
    try {
        //add other function in main function
        loginTime()
        const user = userModel.findOneAndUpdate(userName, password);
        return user;
    } catch (err) {
        return err;
    }
}