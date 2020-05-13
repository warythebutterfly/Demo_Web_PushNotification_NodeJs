const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();

//set static path

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const publicVapidKey = process.env.PUBLIC_KEY;
const privateVapidKey = process.env.PRIVATE_KEY;

webPush.setVapidDetails('mailto:temitoyosi@gmail.com', publicVapidKey, privateVapidKey);


//subscribe route

app.post('/sendpush', (req, res) => {
    console.log(req.body);
    var titleInput = req.body.title
    var bodyInput = req.body.body

    //console.log(titleInput, bodyInput);
    //console.log(title,body)

    const payload = JSON.stringify({ title: titleInput, body: bodyInput });
    const subscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/c3aW7iUml3g:APA91bHUr8i9TmzGl4HUQo__aLH7v8RV--LCgxtbwrza5y0tVYFzSZDceIbRS7veM7FQxFQurWHoNzfUT4bBJaOgQH1Q6An75A6Uh4c5ZtsDRvzFnNhJ11iC9qJ6D7KCIlloIs4YkTfC',
        expirationTime: null,
        keys: {
            p256dh: 'BOf6selduCcZg8DnxJvF8FYQjbmYLC_S3A1lIZ5_8Cp1HnEE3ZB5ggT0vrejQ6i_zjLsWM2pvtp61Q2XPPj0wts',
            auth: 'JHmltC9OrJ7kbmQnazVvMw'
        },
        title: titleInput,
        body: bodyInput
    }

    res.status(201).json({});

    //create payload


    console.log(payload);

    console.log(subscription.endpoint);
    //pass object into send notificaion
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));


})

//if i want to use this post, remeber to change fetch to /subcribe
app.post('/subscribe', (req, res) => {


    // Get PushSubscription Object


    const subscription = req.body;
    //console.log(subscription);
    //send 201 - resource created
    res.status(201).json({});

    //create payload

    const payload = JSON.stringify({ title: 'Push Test' });

    //pass object into send notificaion
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
