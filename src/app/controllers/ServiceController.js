const Yup = require('yup');
const Service = require('../models/Service');

class ServiceController {

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 5 } = req.query;
        var query = { active: true }
        var options = {
            select: '_id title description images hashtags user',
            populate: 'user',
            limit,
            page
        };
        await Service.paginate(query, options)
        .then((services) => {
            return res.json({
                error: false,
                services
            }); 
        }).catch((erro) => {

            console.log(erro);
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        Service.findOne({ _id: req.params.id }, '_id title description images hashtags user').then((service) => {
            return res.json({
                error: false,
                service
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            hashtags: Yup.array(),
            active: Yup.boolean().default(true),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const service = await Service.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Serviço não foi cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Serviço cadastrado com sucesso!",
                dados: service
            })
        });
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            hashtags: Yup.array(),
            active: Yup.boolean().default(true)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        var dados = req.body;

        await Service.updateOne({ _id: dados._id}, dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Serviço não foi editado!"
            });

            return res.json({
                error: false,
                message: "Serviço editado com sucesso!"
            });
        });        
    };

    async delete(req, res) {
        const service = await Service.findOne({ _id: req.params.id });

        if (!service) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Service não encontrado"
            });
        };

        await Service.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Service não foi apagado!"
            });
        });

        return res.json({
            error: false,
            message: "Service apagado com sucesso!"
        });
    };   
}

module.exports = new ServiceController();