const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
