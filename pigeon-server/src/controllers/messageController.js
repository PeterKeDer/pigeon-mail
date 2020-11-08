import express from 'express';
import { firestore } from 'firebase-admin';
import { db } from '../services/firebase';
import { getDistanceFromLatLonInKm } from '../helpers/distance';

// Pigeon speed, in km/hr
const PIGEON_SPEED = 99;

const router = express.Router();

// TODO: move this inside firebase.js?
const messagesRef = db.collection('messages');
const usersRef = db.collection('users');
const getUserRef = userId => usersRef.doc(userId);
const stationsRef = db.collection('stations');
const getStationRef = stationId => stationsRef.doc(stationId);

router.post('/list', (req, res) => {
    const { userId } = req.body;
    console.log('POST /messages/list: ', userId);

    Promise.all([messagesRef.get(), getUserRef(userId).get()])
        .then(([messagesSnapshot, userSnapshot]) => {
            const stationId = userSnapshot.get('stationId');

            // Filter to all messages that are either sent or received by user, and map to json
            const messages = messagesSnapshot.docs
                .filter(doc => doc.get('sender') === stationId || doc.get('receiver') === stationId)
                .map(doc => ({
                    id: doc.id,
                    sender: doc.get('sender'),
                    receiver: doc.get('receiver'),
                    content: doc.get('content'),
                    time: doc.get('time').valueOf(),
                    isSent: doc.get('isSent'), // TODO: filter by this too?
                }));

            res.status(200).json({
                messages,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
});

router.post('/prepareSend', (req, res) => {
    const { userId, receiver, pigeonId } = req.body;
    console.log('POST prepareSend:', userId, receiver, pigeonId);

    getUserRef(userId).get()
        .then(userSnapshot => {
            const sender = userSnapshot.get('stationId');
            return Promise.all([getStationRef(sender).get(), getStationRef(receiver).get()])
        })
        .then(([senderSnapshot, receiverSnapshot]) => {
            if (!senderSnapshot.exists) {
                return res.status(400).send('sender station does not exist');
            } else if (!receiverSnapshot.exists) {
                return res.status(400).send('receiver station does not exist');
            }
            const senderLocation = senderSnapshot.get('location');
            const receiverLocation = receiverSnapshot.get('location');

            const senderLatLon = {
                lat: senderLocation.latitude,
                lon: senderLocation.longitude,
            };
            const receiverLatLon = {
                lat: receiverLocation.latitude,
                lon: receiverLocation.longitude,
            }

            const distance = getDistanceFromLatLonInKm(
                senderLatLon.lat, senderLatLon.lon,
                receiverLatLon.lat, receiverLatLon.lon,
            );

            // TODO: get the pigeon speed and subsitute in here

            const time = distance / PIGEON_SPEED; // hours

            res.status(200).send({
                distance,
                time,
                senderLocation: senderLatLon,
                receiverLocation: receiverLatLon,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
});

router.post('/send', (req, res) => {
    const { userId, receiver, content, pigeonId } = req.body;
    console.log('POST send:', userId, receiver, content, pigeonId);

    let sender;

    getUserRef(userId).get()
        .then(userSnapshot => {
            sender = userSnapshot.get('stationId');
            // TODO: add this after adding async to fix returns
            // if (sender === receiver) {
            //     return res.status(400).send('cannot send message to self');
            // }
            return Promise.all([getStationRef(sender).get(), getStationRef(receiver).get()])
        })
        .then(([senderSnapshot, receiverSnapshot]) => {
            if (!senderSnapshot.exists) {
                return res.status(400).send('sender station does not exist');
            } else if (!receiverSnapshot.exists) {
                return res.status(400).send('receiver station does not exist');
            }
            const senderLocation = senderSnapshot.get('location');
            const receiverLocation = receiverSnapshot.get('location');

            const senderLatLon = {
                lat: senderLocation.latitude,
                lon: senderLocation.longitude,
            };
            const receiverLatLon = {
                lat: receiverLocation.latitude,
                lon: receiverLocation.longitude,
            }

            const distance = getDistanceFromLatLonInKm(
                senderLatLon.lat, senderLatLon.lon,
                receiverLatLon.lat, receiverLatLon.lon,
            );

            const timestamp = new firestore.Timestamp(Math.floor(Date.now() / 1000), 0);
            const messageData = {
                sender,
                receiver,
                content,
                timestamp,
                isSent: false,
            };

            const duration = distance / PIGEON_SPEED * 60 * 60; // seconds

            const newMessageRef = messagesRef.doc();
            setTimeout(() => {
                newMessageRef.update({
                    isSent: true,
                });
            }, duration * 1000);

            newMessageRef.set(messageData);

            return newMessageRef;
        })
        .then(message => {
            res.status(200).send(message.id);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
});

export default router;
