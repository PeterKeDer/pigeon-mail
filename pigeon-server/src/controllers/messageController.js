import express from 'express';
import { firestore } from 'firebase-admin';
import { db } from '../services/firebase';
import { getDistanceFromLatLonInKm, latLonFromGeoPoint } from '../helpers/location';
import { getSpeed } from '../helpers/pigeons';

const router = express.Router();

// TODO: move this inside firebase.js?
const messagesRef = db.collection('messages');
const usersRef = db.collection('users');
const pigeonsRef = db.collection('pigeons');
const getUserRef = userId => usersRef.doc(userId);
const stationsRef = db.collection('stations');
const getStationRef = stationId => stationsRef.doc(stationId);

router.post('/list', async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('POST /messages/list: ', userId);

        const [messagesSnapshot, userSnapshot] = await Promise.all([messagesRef.get(), getUserRef(userId).get()]);

        const stationId = userSnapshot.get('stationId');

        // Filter to all messages that are either sent or received by user, and map to json
        const messages = messagesSnapshot.docs
            .filter(doc => doc.get('sender') === stationId || doc.get('receiver') === stationId)
            .map(doc => ({
                id: doc.id,
                sender: doc.get('sender'),
                receiver: doc.get('receiver'),
                content: doc.get('content'),
                timestamp: doc.get('timestamp').valueOf(),
                arrived: doc.get('arrived'), // TODO: filter by this too?
            }));

        res.status(200).json({
            messages,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

/// Prepare sending a message by checking stations, checking distances, etc.
async function prepareSend(userId, receiver, pigeonId) {
    const userSnapshot = await getUserRef(userId).get();
    const sender = userSnapshot.get('stationId');
    const pigeonIds = userSnapshot.get('pigeonIds');

    if (sender === receiver) {
        throw 'cannot send message to self';
    }

    if (!pigeonIds.includes(pigeonId)) {
        throw 'does not own the pigeon';
    }

    const pigeonRef = pigeonsRef.doc(pigeonId);
    const pigeonSnapshot = await pigeonRef.get();

    if (!pigeonSnapshot.exists) {
        throw 'your stupid pigeon does not exist';
    } else if (pigeonSnapshot.get('messageId') !== null) {
        throw 'pigeon already in use';
    }

    const [senderSnapshot, receiverSnapshot] = await Promise.all([
        getStationRef(sender).get(),
        getStationRef(receiver).get(),
    ]);

    if (!senderSnapshot.exists) {
        throw 'sender station does not exist';
    } else if (!receiverSnapshot.exists) {
        throw 'receiver station does not exist';
    }

    const senderLocation = latLonFromGeoPoint(senderSnapshot.get('location'));
    const receiverLocation = latLonFromGeoPoint(receiverSnapshot.get('location'))

    const distance = getDistanceFromLatLonInKm(
        senderLocation.lat, senderLocation.lon,
        receiverLocation.lat, receiverLocation.lon,
    );

    const duration = distance / getSpeed(pigeonSnapshot.get('species')) * 60 * 60; // seconds

    return {
        sender,
        distance,
        duration,
        receiverLocation,
        senderLocation,
    };
}

router.post('/prepareSend', async (req, res) => {
    const { userId, receiver, pigeonId } = req.body;
    console.log('POST prepareSend:', userId, receiver, pigeonId);

    try {
        const {
            distance,
            duration,
            senderLocation,
            receiverLocation,
        } = await prepareSend(userId, receiver, pigeonId);

        res.status(200).send({
            distance,
            duration,
            senderLocation,
            receiverLocation,
        });

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/send', async (req, res) => {
    const { userId, receiver, content, pigeonId } = req.body;
    console.log('POST send:', userId, receiver, content, pigeonId);

    try {
        const { sender, duration } = await prepareSend(userId, receiver, pigeonId);

        const timestamp = new firestore.Timestamp(Math.floor(Date.now() / 1000), 0);
        const messageData = {
            sender,
            receiver,
            content,
            timestamp,
            arrived: false,
        };

        const newMessageRef = messagesRef.doc();

        const pigeonRef = pigeonsRef.doc(pigeonId);
        await pigeonRef.update({
            messageId: newMessageRef.id,
        });

        setTimeout(() => {
            Promise.all([
                newMessageRef.update({
                    arrived: true,
                }),
                pigeonRef.update({
                    messageId: null,
                }),
            ]).then(() => {});
        }, duration * 1000);

        await newMessageRef.set(messageData);

        res.status(200).send(newMessageRef.id);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

export default router;
