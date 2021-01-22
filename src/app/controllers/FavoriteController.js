const Yup = require('yup');
const Favorite = require('../models/Favorite');

class FavoriteController {

  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 5 } = req.query;
    var query = { favorite: true, user: req.body.user }
    var options = {
      select: "_id service user",
      populate: ["user", "service"],
      limit,
      page
    };
    await Favorite.paginate(query, options)
      .then((favorites) => {
        return res.json({
          error: false,
          favorites
        });
      }).catch((erro) => {
        return res.status(400).json({
          error: true,
          code: 106,
          message: "Erro: Não foi possível executar a solicitação!"
        });
      });
  };

  async store(req, res) {

    const schema = Yup.object().shape({
      user: Yup.string().required(),
      service: Yup.string().required(),
      favorite: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!"
      });
    };

    var dados = req.body;

    await Favorite.updateOne(
      { user: dados.user, service: dados.service },
      dados,
      { upsert: true },
      (err) => {
        if (err) return res.status(400).json({
          error: true,
          code: 101,
          message: "Error: Serviço não foi cadastrado com sucesso!"
        });
      }
    )

    return res.status(200).json({
      error: false,
      message: "Serviço cadastrado com sucesso!"
    })
  };

  async update(req, res) {

    const schema = Yup.object().shape({
      user: Yup.string().required(),
      service: Yup.string().required(),
      favorite: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Error: Dados inválidos!"
      });
    };

    var dados = req.body;

    await Favorite.updateOne({ service: dados.service, user: dados.user }, dados, (err) => {
      if (err) return res.status(400).json({
        error: true,
        code: 111,
        message: "Erro: Favorito nao foi alterado!"
      });

      return res.json({
        error: false,
        message: "Favorito alterado com sucesso!"
      });
    });
  };
}

module.exports = new FavoriteController();