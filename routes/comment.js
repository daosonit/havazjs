module.exports = (App) => {
  App.Router.get('/comment',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.CommentController.indexComment(req, res))

  App.Router.get('/comment/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.CommentController.showComment(req, res))

  App.Router.post('/comment',
    App.Middleware.AuthMiddleware.handle,
    App.Request.CommentCreateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.CommentController.storeComment(req, res))

  App.Router.put('/comment/:id',
    App.Middleware.AuthMiddleware.handle,
    App.Request.CommentUpdateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.CommentController.updateComment(req, res))

  App.Router.delete('/comment/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.CommentController.destroyComment(req, res))

  App.Router.put('/comment/:id/active',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.CommentController.activeComment(req, res))
}