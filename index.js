import express from 'express';
import bodyParser from "body-parser";
import {validAddressCheck} from "./service/validAddressCheck.service.js";
import {appRouter} from "./controller/routes.js";

const PORT = 3000;
const app = express();

// // parse application/json
app.use(bodyParser.json());
app.use('/api', appRouter);


app.get('/', (req, res) => {
    res.send('Welcome');
});

// app.post('/validAddress', (req, res) => {
//     // return req.body;
//     const [isValidAddress, address] = validAddressCheck(req);
//     return res.json({
//         address,
//         isValidAddress
//     });
// });

app.listen(3000, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})