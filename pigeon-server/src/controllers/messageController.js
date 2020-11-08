import express from 'express';
import { db } from '../services/firebase';

const router = express.Router();

router.post('/list', (req, res) => {
    const { userId } = req.body;
    console.log('POST /messages/list: ', userId);

    const messagesPromise = db.collection('messages').get();
    const userPromise = db.collection('users').doc(userId).get();

    Promise.all([messagesPromise, userPromise])
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
                }));

            res.status(200).json({
                messages,
            });
        })
        .catch(error => {
            console.log('error',error);
            res.status(500).send('error getting from firebase');
        });
});

export default router;
