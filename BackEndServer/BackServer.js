require("dotenv").config();
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const dbUrl = 'http://localhost:3000';

const sequelize = new Sequelize ('database' ,'username' ,'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Catshop.sqlite'
});


const Cat = sequelize.define('cat', {
    cat_id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        primaryKey: true
    } ,
    name: {
        type: Sequelize.STRING ,
        allowNull: false
    } ,
    breed_id: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    availability: {
        type: Sequelize.STRING ,
        allowNull: false
    }
});

const Customers = sequelize.define('customer', {
    customer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.INTEGER ,
        allowNull: false
    }
});

// const order = sequelize.define('order', {
//     order_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     customer_id: {
//         type: Sequelize.INTEGER ,
//         allowNull: false
//     },
//     order_date: {
//         type: Sequelize.DATEONLY ,
//         allowNull: false
//     },
//     total_amount: {
//         type: Sequelize.INTEGER ,
//         allowNull: false
//     }
// });

const Petcustomer = sequelize.define('petcustomer', {
    petcustomer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cat_id: {
        type: Sequelize.JSON ,
        allowNull: false
    },
    customer_id: {
        type: Sequelize.STRING ,
        allowNull: false
    }
});

const Breed = sequelize.define('breed', {
    breed_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    breedName: {
        type: Sequelize.STRING ,
        allowNull: false
    }
});

sequelize.sync();

//Cats Table
app.get('/cats' ,(req ,res) => {
    Cat.findAll().then(cats => {
        res.json(cats);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/cats/:id' ,(req,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            res.json(cat);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/cats' ,(req ,res) => {
    Cat.create(req.body).then(cat => {
        res.send(cat);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/cats/:id' , (req ,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            cat.update(req.body).then(() => {
                res.send(cat);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/cats/:id' ,(req ,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            cat.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Customers Table
app.get('/customers' ,(req ,res) => {
    Customers.findAll().then(customers => {
        res.json(customers);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/customers/:id' ,(req,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Customer not found');
        }else {
            res.json(customer);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/customers' ,(req ,res) => {
    Customers.create(req.body).then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/customers/:id' , (req ,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Customer not found');
        }else {
            customer.update(req.body).then(() => {
                res.send(customer);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/customers/:id' ,(req ,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Customer not found');
        }else {
            customer.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// //Order Table
// app.get('/orders' ,(req ,res) => {
//     order.findAll().then(orders => {
//         res.json(orders);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.get('/orders/:id' ,(req,res) => {
//     order.findByPk(req.params.id).then(order => {
//         if(!order) {
//             res.status(404).send('Order not found');
//         }else {
//             res.json(order);
//         }
//     }).catch (err => {
//         res.status(500).send(err);
//     });
// });

// app.post('/orders' ,(req ,res) => {
//     order.create(req.body).then(order => {
//         res.send(order);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.put('/orders/:id' , (req ,res) => {
//     order.findByPk(req.params.id).then(order => {
//         if(!order) {
//             res.status(404).send('Order not found');
//         }else {
//             order.update(req.body).then(() => {
//                 res.send(order);
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.delete('/orders/:id' ,(req ,res) => {
//     order.findByPk(req.params.id).then(order => {
//         if(!order) {
//             res.status(404).send('Order not found');
//         }else {
//             order.destroy().then(() => {
//                 res.send({});
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

//Petcustomer Table
app.get('/petcustomers' ,(req ,res) => {
    Petcustomer.findAll().then(petcustomer => {
        res.json(petcustomer);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/petcustomers/:id' ,(req,res) => {
    Petcustomer.findByPk(req.params.id).then(petcustomer => {
        if(!petcustomer) {
            res.status(404).send('Petcustomers not found');
        }else {
            res.json(petcustomer);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/petcustomers' ,(req ,res) => {
    Petcustomer.create(req.body).then(petcustomer => {
        res.send(petcustomer);
    }).catch(err => {
        res.status(500).send(err);
        
    });
});

app.put('/petcustomers/:id' , (req ,res) => {
    Petcustomer.findByPk(req.params.id).then(petcustomer => {
        if(!petcustomer) {
            res.status(404).send('Petcustomers not found');
        }else {
            petcustomer.update(req.body).then(() => {
                res.send(petcustomer);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


app.delete('/petcustomers/:id' ,(req ,res) => {
    Petcustomer.findByPk(req.params.id).then(petcustomer => {
        if(!petcustomer) {
            res.status(404).send('Petcustomer not found');
        }else {
            petcustomer.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


//Breed Table
app.get('/breeds' ,(req ,res) => {
    Breed.findAll().then(breed => {
        res.json(breed);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/breeds/:id' ,(req,res) => {
    Breed.findByPk(req.params.id).then(breed => {
        if(!breed) {
            res.status(404).send('breeds not found');
        }else {
            res.json(breed);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/breeds' ,(req ,res) => {
    Breed.create(req.body).then(breed => {
        res.send(breed);
    }).catch(err => {
        res.status(500).send(err);
        
    });
});

app.put('/breeds/:id' , (req ,res) => {
    Breed.findByPk(req.params.id).then(breed => {
        if(!breed) {
            res.status(404).send('breeds not found');
        }else {
            breed.update(req.body).then(() => {
                res.send(breed);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


app.delete('/breeds/:id' ,(req ,res) => {
    Breed.findByPk(req.params.id).then(breed => {
        if(!breed) {
            res.status(404).send('breed not found');
        }else {
            breed.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port ,() => console.log(`Listening on port ${port}...`));