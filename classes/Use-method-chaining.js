//correct way
app.post('/',
    isAuth,
    roleValidation(["admin", "superAdmin"]),
    controller.post
)

    .delete('/:email',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.delete
    )

    .put('/',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.put
    )


    .get('/get',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.get)

    .get('/',
        webController.getInWeb)

// bad way
app.post('/',
    isAuth,
    roleValidation(["admin", "superAdmin"]),
    controller.post
)

    app.delete('/:email',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.delete
    )

    app.put('/',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.put
    )


    app.get('/get',
        isAuth,
        roleValidation(["admin", "superAdmin"]),
        controller.get)

    app.get('/',
        webController.getInWeb)
