export const PIGEON_SPECIES = [
    {
        name: 'Black Pigeon',
        tier: 'C',
        speed: 59,
    },
    {
        name: 'Common Pigeon',
        tier: 'C',
        speed: 30,
    },
    {
        name: 'Passenger Pigeon',
        tier: 'S',
        speed: 99,
    },
    {
        name: 'Pigeon Zow',
        tier: 'S',
        speed: 169,
    },
    {
        name: 'White-Naped Pigeon',
        tier: 'A',
        speed: 69,
    },
    {
        name: 'Imperial Pigeon',
        tier: 'A',
        speed: 64,
    },
    {
        name: 'African Olive Pigeon',
        tier: 'B',
        speed: 60,
    },
    {
        name: 'Crested Pigeon',
        tier: 'B',
        speed: 52,
    },
    {
        name: 'Diamond Dove',
        tier: 'A',
        speed: 71,
    },
    {
        name: 'Buru Mountain Pigeon',
        tier: 'C',
        speed: 24,
    }
];

export function getSpeed(species) {
    return PIGEON_SPECIES.find(s => s.name === species).speed || 20;
}

export function randomPigeons(n) {
    let pigeons = [];
    for (let i = 0; i < n; i++) {
        let index = Math.floor(Math.random() * PIGEON_SPECIES.length);
        pigeons.push({
            name: `Pigeon ${i}`,
            species: PIGEON_SPECIES[index].name,
        });
    }
    return pigeons;
}
