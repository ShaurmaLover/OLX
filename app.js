const express = require('express')
const multer = require('multer')
const path = require('path')
const db = require('./db')

const app = express()
const port = 3000


let products = []

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
}})

const upload = multer({storage: storage})

app.use(express.static("static"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")

app.get('/', (req, res) => {
    db.query("SELECT * FROM products", (err, rows) => {
        let products = rows

        products.forEach((product) => {
            product.image = JSON.parse(product.image)
        })
        res.render("index", {products: products})
    })
})

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    db.query("SELECT * FROM products WHERE id = ?", postId, (err, rows) => {
        if (err || rows.length === 0) return res.status(404).render("notfound")
        let product = rows[0]
        product.image = JSON.parse(product.image)
        res.render("post", { product })
    })
})

app.post('/add', upload.fields([{name: "image"}]),(req, res) => {
    let data = req.body
    data.id = products.length
    data.image = req.files.image.map((file) => file.filename)
    data.image = JSON.stringify(data.image)
    products.push(data)
    db.query("INSERT INTO products SET ?", data, (err) => {
        res.status(201)
        res.end()
    })
});

// app.get("/ads", (req, res) => {
//     res.status(200)
//     res.setHeader("Content-Type", "application/json")
//     res.json(products).end()
// });

app.use((req, res, next)=>{
    res.status(404)
    res.render("notFound")
})

app.listen(port, () => {
    console.log(`http://localhost:3000`)
})