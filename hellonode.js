const mongoose = require("mongoose");
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

mongoose.connect('mongodb+srv://kza-user-01:cn41DTerbPv2SIaQ@kza-cluster-01-vkvl2.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var kittySchema = new mongoose.Schema({
        name: String
    });
    kittySchema.methods.speak = function () {
        var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
        console.log(greeting);
    };

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    var Kitten = mongoose.model('Kitten', kittySchema);

    var silence = new Kitten({name: 'Silence'});
    var fluffy = new Kitten({name: 'fluffy'});
    silence.speak();

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

