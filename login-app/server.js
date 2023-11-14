import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import * as url from 'url';
import bcrypt from 'bcryptjs';
import schema from './public/scripts/user.schema.js';
import validate from './public/scripts/validate.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()
app.use(express.json())

const adapter = new JSONFile(__dirname + '/auth.json');
const db = new Low(adapter);
await db.read();
db.data ||= { users: [] }

const rpID = "localhost";
const protocol = "http";
const port = 5000;
const expectedOrigin = `${protocol}://${rpID}:${port}`;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

function findUser(email) {
  const results = db.data.users.filter(user => user.email == email);
  if (results.length == 0) return undefined;
  return results[0];
}

app.post("/auth/login", (req, res) => {
  const user = findUser(req.body.email);
  if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({ok: true, email: user.email, name: user.name});
      } else {
          res.send({ok: false, message: 'Data is invalid'});            
      }
  } else {
      res.send({ok: false, message: 'Data is invalid'});
  }
});

app.post("/auth/register", validate(schema), (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash
  };
  const userFound = findUser(req.body.email);

  if (userFound) {
      res.send({ok: false, message: 'User already exists'});
  } else {
      db.data.users.push(user);
      db.write();
      res.send({ok: true});
  }
});



app.get("*", (req, res) => {
    res.sendFile(__dirname + "public/index.html"); 
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

