const express = require('express');
const _ = require('underscore');
const Customer = require('../models/customers');
const app = express();

app.post('/guardar', (req, res) => {
    let body = req.body;
    let customer = new Customer({
        _id: body._id,
        Address: body.Address,
        City: body.City,
        Country: body.Country,
        District: body.District,
        First_Name: body.First_Name,
        Last_Name: body.Last_Name
    });
    customer.save((err, Customers) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                cont: err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            Customers
        });
    });
});
app.get('/obtenertodos', (req, res) => {
    Customer.find({ Status: true, })
        .exec((err, customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    cont: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                count: customers.length,
                customers
            });
        });
});
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Customer.find({ Status: true, _id: id })
        .exec((err, Customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    cont: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                count: Customers.length,
                Customers
            });
        });
});
app.get('/obtenername/:name', (req, res) => {
    let name = req.params.name;
    Customer.find({ Status: true, $or: [{ First_Name: name }, { Last_Name: name }] })
        .exec((err, Customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    cont: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                count: Customers.length,
                Customers
            });
        });
});
app.get('/obtenercountry/:pais', (req, res) => {
    let pais = req.params.pais;
    Customer.find({ Status: true, Country: pais })
        .exec((err, Customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    cont: err
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                count: Customers.length,
                Customers
            });
        });
});
app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['Address', 'City', 'Country', 'District', 'First_Name', 'Last_Name']);
    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, Customers) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            Customers
        });

    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Customer.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                cont: err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            resp
        });
    });
});
app.delete('/eliminarname/:First_Name', (req, res) => {
    let First_Name = req.params.First_Name;
    Customer.findOneAndUpdate(First_Name, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                cont: err
            });
        }

        if (!resp) {
            return res.status(404).json({
                ok: false,
                status: 404,
                resp
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            resp
        });
    });
});
module.exports = app;