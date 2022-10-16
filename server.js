import express from 'express';
import path from "node:path";
const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname));
app.use('/img',express.static(__dirname +'/img'));
app.use('/css',express.static(__dirname +'/css'));
app.use('/audio',express.static(__dirname +'/audio'));
app.use('/resources',express.static(__dirname +'/resources'));
app.use('/bin',express.static(__dirname +'/bin'));


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/rules', (request, response) => {
    response.sendFile(path.join(__dirname + '/rules.html'));
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/find', (request, response) => {
    response.sendFile(path.join(__dirname + '/find.html'));
});

app.listen(3000);

