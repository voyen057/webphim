var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var pug = require('pug');
var homerouter = express.Router();
var fileUpload = require('express-fileupload');
var db = require('../config/db');
homerouter.use(bodyParser.json());
homerouter.use(bodyParser.urlencoded({
    extended: true
}));

function getHas(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
function compareHash(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}
//search
// homerouter.get('/search1',(req,res)=>{
//   const {search} = req.query
//   db.query("SELECT * FROM phim WHERE lower(tenphim) like lower('%" + tphim + "%')", (err, results) => {
//     res.render('home', {
//         listtheloai: theloai,
//         lists: phim,
//         danhsach: results
//     });
//     // console.log(results)

// })
// })
homerouter.get('/theloai/edit/:id', (req, res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM theloai where id = '${id}'`;
    db.query(sql, function (err, data, fields) {
        res.render("edittheloai", {
            lists: data
        });
    });
})
homerouter.get('/admin', (req, res) => {
    res.render('admin')
})
homerouter.get('/themlistphim', (req, res) => {
    db.query('SELECT * FROM theloai', (err, theloai) => {
        res.render('themphim', {
            listtheloai: theloai
        });
    })
})
homerouter.get('/admin/listphim', (req, res) => {
    db.query('SELECT * FROM phim', (err, phim) => {
        res.render('listphim', {
            lists: phim
        });
    })

})
homerouter.get('/themtheloai', (req, res) => {
    res.render('themtheloai')
})
homerouter.get('/demo', (req, res) => {
    db.query('SELECT * FROM phim', (err, phim) => {
        res.render('demo', {
            lists: phim
        });
    })
})
homerouter.post('/demo', (req, res) => {
    db.query('SELECT * FROM phim', (err, phim) => {
        res.render('demo', {
            lists: phim
        });
    })
})
homerouter.get('/admin/theloai', (req, res) => {
    db.query('SELECT * FROM theloai', (err, theloai) => {
        res.render('admintheloai', {
            listtheloai: theloai
        });
    })
})
homerouter.get('/theloai/delete', function (req, res) {
    var id = parseInt(req.query.id);
    var sql = `Delete FROM theloai where id = ${id}`;
    db.query(sql, function (err, data, fields) {
    });
    res.redirect("/admin/theloai");
})
// homerouter.get('/', (req, res) => {
//     db.query('SELECT * FROM theloai', (err, theloai) => {
//         db.query('SELECT * FROM phim', (err, phim) => {
//             res.render('home', {
//                 listtheloai: theloai,
//                 lists: phim
//             });
//         })
//     })
// });
// homerouter.get('/', (req, res) => {
//     db.query('SELECT * FROM theloai', (err, theloai) => {
//         db.query('SELECT * FROM phim', (err, phim) => {
//             res.render('home', {
//                 listtheloai: theloai,
//                 lists: phim
//             });
//         })
//     })
// });


// homerouter.get('/theloai/them/:id', function (req, res) {
//     let tloai = req.body.theloai;
//     let tl_info = { theloai: tloai };
//     let sql = 'INSERT INTO theloai SET ?';
//     db.query(sql, tl_info);
//     res.redirect("/admin/theloai");
// })
homerouter.post('/theloai/them', function (req, res) {
    let tloai = req.body.theloai;
    let tl_info = { theloai: tloai };
    let sql = 'INSERT INTO theloai SET ?';
    db.query(sql, tl_info);
    res.redirect("/admin/theloai");
})
homerouter.get('/', (req, res) => {
    db.query('SELECT * FROM theloai', (err, theloai) => {
        db.query('SELECT * FROM phim', (err, phim) => {
            let tphim = req.body.data;
            db.query("SELECT * FROM phim WHERE lower(tenphim) like lower('%" + tphim + "%')", (err, results) => {
                res.render('home', {
                    listtheloai: theloai,
                    lists: phim,
                    danhsach: results
                });
                // console.log(results)

            })
        })
    })
})
homerouter.post('/', (req, res) => {
    let tphim = req.body.data;
    db.query("SELECT * FROM phim WHERE lower(tenphim) like lower('%" + tphim + "%')", (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            console.log(result);
            let open = ``;
            result.forEach((v) => {
                open += `<li class="d-flex">
                <img src="/img/${v.anhminhhoa}"   style="width:100px;"  class="img-fluid" alt="">
                <a href="/chitietphim/${v.id}"> ${v.tenphim}  </a> 
                
            </li>`});
            res.send({ html: open })

        }

    })
})
homerouter.post('/chitietphim/:id', (req, res) => {

    let phimid = req.params.id;
    if (!phimid) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('SELECT * FROM phim where id=?', phimid, function (error, results, fields) {
        if (error) throw error;
        // return res.send({ error: false, list: results[0], message: 'users list.' });
        console.log(results)
        // res.render('chitiet', {
        //     lists: results
        // });
    });
})
// if (err) throw err;
// let open = '<li class="d-flex">\
//                 <img src="/img/"' + result.anhminhhoa + 'style="width:100px" class="img-fluid" alt="">\
//                 <a href="">'+ result.tenphim + '</a>\
//             </li>'

// // console.log(json[0].tenphim);
// res.send({ html: open })

// homerouter.post('/', (req, res) => {
//     db.query('SELECT * FROM theloai', (err, theloai) => {
//         db.query('SELECT * FROM phim', (err, phim) => {
//             let tphim = req.body.data;
//             var danhsach = [];
//             db.query("SELECT * FROM phim WHERE lower(tenphim) like lower('%" + tphim + "%')", (err, results) => {
//                 // var string = JSON.stringify(results);
//                 // console.log('>> string: ', string);
//                 // var json = JSON.parse(string);
//                 // const result = Object.values(JSON.parse(JSON.stringify(results)));
//                 // console.log('>> json: ', json);
//                 // console.log('>> user.name: ', json[0].tenphim);
//                 // req.list = json;
//                 // var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
//                 // results = JSON.parse(JSON.stringify(results))
//                 // doStuffwithTheResult(results);

//                 res.render('home', {
//                     listtheloai: theloai,
//                     lists: phim,
//                     danhsach: JSON.stringify(results)
//                 });
//                 // console.log(JSON.stringify(results))
//                 // console.log('>> json: ', resultArray.tenphim);
//                 // result.forEach((v) => console.log(v.tenphim));

//             })

//         })
//     })
// })
// homerouter.post('/', (req, res) => {
//     let tphim = req.body.data;
//     db.query("SELECT * FROM phim WHERE lower(tenphim) like lower('%" + tphim + "%')", (err, result, fields) => {
//         // var string = JSON.stringify(result);
//         // var json = JSON.parse(string);
//         // to get one value here is the option
//         // var personList = [];
//         // for (var i = 0; i < result.length; i++) {
//         //     //             // Create an object to save current row's data    
//         //     var person = {
//         //         'anhminhhoa': result[i].anhminhhoa,
//         //         'tenphim': result[i].tenphim,
//         //         'id': result[i].id
//         //     }
//         //     // Add object into array
//         //     personList.push(person);
//         // }
//         if (err) {
//             console.log(err);
//         } else {
//             let open = `<li class="d-flex">
//                             <img src="/img/" ${result.anhminhhoa}  style="width:100px" class="img-fluid" alt="">
//                             <a href=""> ${result.tenphim}  </a>
//                         </li>`
//             // open += open;
//             res.send({ html: open })
//         }
//         // if (err) throw err;
//         // let open = '<li class="d-flex">\
//         //                 <img src="/img/"' + result.anhminhhoa + 'style="width:100px" class="img-fluid" alt="">\
//         //                 <a href="">'+ result.tenphim + '</a>\
//         //             </li>'

//         // // console.log(json[0].tenphim);
//         // res.send({ html: open })
//     })
// })

// homerouter.get('/', (req, res) => {
//     db.query('SELECT * FROM theloai', (err, theloai) => {
//         db.query('SELECT * FROM phim', (err, phim) => {
//             let tphim = req.body.search;
//             db.query(`SELECT * FROM phim WHERE lower('tenphim') like lower('%${tphim}%')`, (err, results) => {
//                 res.render('home', {
//                     listtheloai: theloai,
//                     lists: phim,
//                     searchs: results
//                 });
//             })
//         })
//     })
// });
homerouter.get('/', (req, res) => {
    db.query('SELECT * FROM theloai', (err, theloai) => {
        db.query('SELECT * FROM phim', (err, phim) => {

            res.render('home', {
                listtheloai: theloai,
                lists: phim

            });
        })
    })
})

homerouter.post('/theloai/edit/:id', (req, res) => {
    let tloai = req.body.theloai;
    let id = req.params.id;
    let sql = `UPDATE theloai SET theloai = '${tloai}' where id = ${id}`;
    db.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    res.redirect("/admin/theloai");

})

homerouter.get('/chitietphim/:id', (req, res) => {
    var page = 1;
    var num = 3
    var start = page * num;
    let phimid = req.params.id;
    if (!phimid) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('SELECT * FROM phim limit' + start + ',' + num, (err, phantrang) => {
        db.query('SELECT * FROM theloai', (err, theloai) => {
            db.query('SELECT * FROM phim where id=?', phimid, function (error, results, fields) {
                if (error) throw error;
                // return res.send({ error: false, list: results[0], message: 'users list.' });
                console.log(results)
                res.render('chitiet', {
                    phantrang: phantrang,
                    listtheloai: theloai,
                    lists: results
                });
            });
        })
    })
});


homerouter.get('/theloai/:id', (req, res) => {
    var page = 1;
    var num = 3
    var start = page * num;
    let theloaiid = req.params.id;
    if (!theloaiid) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    db.query('SELECT * FROM phim limit' + start + ',' + num, (err, phantrang) => {
        db.query('SELECT * FROM theloai', (err, theloai) => {
            db.query('SELECT * FROM phim where theloai=?', theloaiid, function (error, results, fields) {
                if (error) throw error;
                // return res.send({ error: false, list: results[0], message: 'users list.' });
                res.render('theloai', {
                    phantrang: phantrang,
                    listtheloai: theloai,
                    lists: results
                });
            });
        })
    })
});
homerouter.get('/login', (req, res) => {
    res.render('dangnhap')

});
homerouter.get('/register', (req, res) => {
    res.render('dangky')

});
homerouter.post('/luu', function (req, res) {
    const { username, password, email } = req.body;
    var p = getHas(password);
    let user_info = { username: username, password: p, email: email };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user_info);
    res.redirect("/login");

    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(password, salt, function (err, hash) {
    //         let user_info = { username: username, password: hash, email: email };
    //         let sql = 'INSERT INTO users SET ?';
    //         db.query(sql, user_info);
    //         res.redirect("/login");
    //     })
    // })
})
homerouter.post('/dangnhap', function (req, res) {
    let u = req.body.username;
    let p = req.body.password.toString();
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u], (err, rows) => {
        if (rows.length <= 0) { res.redirect("/login"); return; }
        var kq = compareHash(p, rows[0].password);
        if (kq) {
            console.log("OK");
            res.render("/home");
        }
        else {
            console.log("Not OK");
            res.redirect("/login");
        }
        console.log(kq)
    });
})
homerouter.get("/timkiem", (req, res) => {
    let id = req.query.id;
    db.query('SELECT * FROM theloai', (err, theloai) => {
        db.query(`SELECT * FROM phim where id = '${id}'`, (err, phimtimkiem) => {
            res.render('search', {
                listtheloai: theloai,
                lists: phimtimkiem,
            });
        })
    })
})
// homerouter.post("/timkiem", (req, res) => {
//     let search = req.body.search;
//     db.query('SELECT * FROM theloai', (err, theloai) => {
//         db.query("SELECT * FROM phim where tenphim like % ? %", search, (err, phimtimkiem) => {
//             db.query('SELECT * FROM phim limit 3', (err, phim) => {
//                 res.render('search', {
//                     listtheloai: theloai,
//                     list: phimtimkiem,
//                     lists: phim
//                 });
//             })
//         })
//     })
// })
//uploadfile
homerouter.get("/upload", (req, res) => {

})
homerouter.post("/upload", (req, res) => {
    let image;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files');
    }
    image = req.files.image;
    uploadPath = __dirname + '/upload/' + image.image;
    console.log(image);
    image.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('uploaded')

    })
})

module.exports = homerouter