module.exports = (App) => {
    App.Router.post('/register',
        App.Request.MemberRegisterRequest.rules,
        App.Request.validator,
        (req, res) => App.Controller.MemberAuthController.register(req, res))

    App.Router.post('/sign-in',
        App.Request.MemberSignInRequest.rules,
        App.Request.validator,
        (req, res) => App.Controller.MemberAuthController.signIn(req, res))

    App.Router.post('/sign-out',
        App.Middleware.AuthMiddleware.handle,
        (req, res) => App.Controller.MemberAuthController.signOut(req, res))

    App.Router.get('/profile',
        App.Middleware.AuthMiddleware.handle,
        (req, res) => App.Controller.MemberAuthController.profile(req, res))

    App.Router.put('/profile',
        App.Middleware.AuthMiddleware.handle,
        App.Request.MemberUpdateProfileRequest.rules,
        App.Request.validator,
        (req, res) => App.Controller.MemberAuthController.updateProfile(req, res))

    App.Router.put('/change-password',
        App.Middleware.AuthMiddleware.handle,
        (req, res) => App.Controller.MemberAuthController.changePassword(req, res))
}
