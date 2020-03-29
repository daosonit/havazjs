module.exports = (App) => {
  App.Router.get('/post',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.PostController.indexPost(req, res))

  App.Router.get('/post/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.PostController.showPost(req, res))

  App.Router.post('/post',
    App.Middleware.AuthMiddleware.handle,
    App.Request.PostCreateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.PostController.storePost(req, res))

  App.Router.put('/post/:id',
    App.Middleware.AuthMiddleware.handle,
    App.Request.PostUpdateRequest.rules,
    App.Request.validator,
    (req, res) => App.Controller.PostController.updatePost(req, res))

  App.Router.delete('/post/:id',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.PostController.destroyPost(req, res))

  App.Router.put('/post/:id/active',
    App.Middleware.AuthMiddleware.handle,
    (req, res) => App.Controller.PostController.activePost(req, res))
}