const express = require('express');
const app = express();
const PORT = 5001;

let movies = [
    {
        id: 1,
        tittle: 'Imperfect',
        premiereTime: '18:15',
        price: 30000
    },
    {
        id: 2,
        tittle: 'Nanti Kita Cerita Tentang Hari Ini',
        premiereTime: '19:15',
        price: 35000
    },
    {
        id: 3,
        tittle: 'Milea: Suara Dilan',
        premiereTime: '20:15',
        price: 40000
    }
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.status(200).send('Hello!');
});

app.get('/api/movie', (req, res, next) => {
    res.status(200).json(movies);
});

app.get('/app/movie/idMovie', (req, res, next) => {
    var data = movies.find(data => data.id == req.params.idMovie);
    if (!data) {
        return res.status(404).json({message: `ID ${req.params.id} tidak ditemukan`});
    }

    res.status(200).json(data);
});

app.post('/api/movie', (req, res, next) => {
    const {tittle, premiereTime, price} = req.body;
    var data = {
        id: movies.length + 1,
        tittle,
        premiereTime,
        price
    };

    movies.push(data);
    req.status(200).json(movies);
});

app.put('/api/movie/', (req, res, next) => {
    var data = movies.findIndex(data => data.id == req.body.idMovie);
    if (!data) {
        return res.status(404).json({message: `ID ${req.params.id} tidak ditemukan`});
    }
    if (!req.body.tittle || !req.body.premiereTime || !req.body.price) {
        return res.status(404).json({message: `tittle, premiereTime, dan price tidak boleh kosong`});
    }

    movies[data].tittle = req.body.tittle
    movies[data].premiereTime = req.body.premiereTime
    movies[data].price = req.body.price

    var dataFix = movies[data];

    req.status(200).json(dataFix);
});

app.delete('/api/course/', (req, res, next) => {
    var data = movies.findIndex(data => data.id == req.body.idMovie);
    var dataFix = movies[data];
    if (!data) {
        return res.status(404).json({message: `ID ${req.params.id} tidak ditemukan`});
    }

    movies.splice(data, 1);
    res.status(200).json(dataFix);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});