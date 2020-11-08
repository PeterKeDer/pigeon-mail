import express from 'express';
import { firestore } from 'firebase-admin';
import { db } from '../services/firebase';
import { latLonFromGeoPoint } from '../helpers/location';
import { randomPigeons } from '../helpers/pigeons';

const router = express.Router();

router.post('/getInfo', async (req, res) => {
    const { userId } = req.body;

    try {
        let userRef = db.collection('users').doc(userId);
        let userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            res.status(200).send({
                exists: false,
            });
        } else {
            const pigeons = (await userRef.collection('pigeons').get()).docs
                .map(doc => ({
                    id: doc.id,
                    type: doc.get('type'),
                    location: latLonFromGeoPoint(doc.get('location')),
                    messageId: doc.get('messageId') || null,
                }));

            res.status(200).send({
                exists: true,
                stationId: userSnapshot.get('stationId'),
                pigeons,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/initialize', async (req, res) => {
    const { userId, stationId, location } = req.body;
    const { lat, lon } = location;

    if (!validateStationId(stationId)) {
        return res.send(400).send('ur stationid is wrong');
    }

    try {
        let userRef = db.collection('users').doc(userId);
        let userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
            return res.status(400).send('user already exists, bruh');
        }

        let stationRef = db.collection('stations').doc(stationId);
        let stationSnapshot = await stationRef.get();

        if (stationSnapshot.exists) {
            return res.status(400).send('stationid taken');
        }

        let pigeons = randomPigeons(5);

        const batch = db.batch();

        const geoPoint = new firestore.GeoPoint(lat, lon)

        batch.set(stationRef, {
            location: geoPoint,
            userId,
        });

        batch.set(userRef, {
            stationId,
        });

        const userPigeonsRef = userRef.collection('pigeons');
        pigeons.forEach(pigeon => {
            batch.set(userPigeonsRef.doc(), {
                ...pigeon,
                location: geoPoint,
            });
        })

        await batch.commit();

        res.status(200).send({

        });

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

function validateStationId(stationId) {
    return stationId.trim().length > 0;
}

export default router;
