const express = require('express');
const _ = require('underscore');
const Rental = require('../models/rentals');
const ListingAndReview = require('../models/listingAndReviews');
const app = express();

app.post('/guardar', (req, res) => {
    let body = req.body;
    let renta = new Rental({
        idCustomer: body.idCustomer,
        idListingAndReview: body.idListingAndReview,
        returnDate: body.returnDate
    });

    renta.save((err, renDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        idCasa = renDB.idListingAndReview;
        ListingAndReview.findByIdAndUpdate(idCasa, { rentada: true }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                resp
            });
        });
    });
});

app.delete('/deleteRenta/:idCasa/:idRental', (req, res) => {
    let idCasa = req.params.idCasa;
    let idRental = req.params.idRental;
    ListingAndReview.findByIdAndUpdate(idCasa, { rentada: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Rental.findByIdAndUpdate(idRental, { rented: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
            return res.status(200).json({
                ok: true,
                resp
            });
        })

    });

});

app.get('/get/rentadas', (req, res) => {
    ListingAndReview.find({ rentada: true })
        .then((resp) => {
            return res.status(200).json({
                ok: true,
                resp
            });
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
            });
        });
});

app.get('/get/:desde', (req, res) => {
    let desde = req.params.desde || 0;
    desde = Number(desde);

    ListingAndReview.find({ rentada: false }).skip(desde).limit(20)
        .then((resp) => {
            return res.status(200).json({
                ok: true,
                count: resp.length,
                resp
            });
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
            });
        });
});

app.get('/obtener/propiedad', (req, res) => {
    ListingAndReview.find({ "property_type": req.params.property_type })
        .exec((err, casas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                casas
            });
        });
});

app.get('/propiedades', (req, res) => {
    ListingAndReview.distinct("property_type").then((resp) => {
        return res.status(200).json({
            ok: true,
            resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            msg: 'Algo salio mal',
            err
        });
    });
});

app.get('/getproperty/:propiedad', (req, res) => {
    ListingAndReview.find({ "property_type": req.params.propiedad }).then((resp) => {
        return res.status(200).json({
            ok: true,
            resp
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

app.get('/mostrar', (req, res) => {
    Rental.find({ rented: true }).populate('idCustomer').populate('idListingAndReview').sort({ idCustomer: 1 }).skip(0)
        .limit(10).then((resp) => {
            return res.status(200).json({
                ok: true,
                msg: 'mostrando rentas',
                resp
            });
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        });

});

app.get('/getprice/:minimo/:maximo/:desde', (req, res) => {
    let minimo = req.params.minimo || 0;
    minimo = Number(minimo);
    minimo--;
    let maximo = req.params.maximo || 0;
    maximo = Number(maximo);
    maximo++;
    let desde = req.params.desde || 0;
    desde = Number(desde);

    ListingAndReview.find({ $and: [{ price: { $gt: minimo } }, { price: { $lt: maximo } }] })
        .sort({ price: 1 })
        .skip(desde)
        .limit(10)
        .then((resp) => {
            return res.status(200).json({
                ok: true,
                count: resp.length,
                resp
            });
        }).catch((err) => {
            return res.status(400).json({
                ok: false,
                err
            });
        });

});

module.exports = app;