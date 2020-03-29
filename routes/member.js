module.exports = (App) => {
  App.Router.get('/member',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.MemberController.indexMember(req, res))

  App.Router.get('/member/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.MemberController.showMember(req, res))

  App.Router.post('/member',
    App.Middleware.AuthMiddleware.handle,
    App.Request.MemberCreateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.MemberController.storeMember(req, res))

  App.Router.put('/member/:id',
    App.Middleware.AuthMiddleware.handle,
    App.Request.MemberUpdateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.MemberController.updateMember(req, res))

  App.Router.delete('/member/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.MemberController.destroyMember(req, res))

  App.Router.put('/member/:id/active',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.MemberController.activeMember(req, res))
}