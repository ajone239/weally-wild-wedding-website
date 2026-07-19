import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TestDb } from '../../test/helpers/db';
import { createTestDb } from '../../test/helpers/db';
import { guest, party } from '$lib/server/db/schema';

// testDb is assigned in beforeEach; the getter ensures the mock always
// reflects the current instance rather than a stale reference.
let testDb: TestDb;

vi.mock('$lib/server/db', () => ({
    get db() {
        return testDb;
    }
}));

// Imported after the mock is registered so they pick up testDb.
const { actions } = await import('./+page.server');

function makeFormRequest(first: string, last: string): Request {
    const formData = new FormData();

    formData.append('firstName', first);
    formData.append('lastName', last);

    return new Request('http://localhost/rsvp', { method: 'POST', body: formData });
}

async function seedParty(
    db: TestDb,
    overrides: Partial<{ finalized: number; notes: string }> = {}
) {
    const partyId = crypto.randomUUID();
    await db.insert(party).values({ id: partyId, name: `Test Party ${partyId}`, ...overrides });
    return partyId;
}

async function seedGuests(db: TestDb, partyId: string, names: string[]) {
    const guests = names.map((name) => ({ id: crypto.randomUUID(), name, party_id: partyId }));
    await db.insert(guest).values(guests);
    return guests;
}

beforeEach(async () => {
    testDb = await createTestDb();
});
describe('actions.default', () => {
    it('grabs party info', async () => {
        const partyId = await seedParty(testDb);
        const p1Names = ['Alice', 'Bob'];
        await seedGuests(testDb, partyId, p1Names);

        const request = makeFormRequest('Alice', 'Bob');
        const result = await actions.default({
            request
        } as any);

        expect(result.success).toBeTruthy();
        expect(result.parties.length).toEqual(1);

        const party = result.parties[0];

        expect(party).toBeTruthy();
        expect(party.id).toEqual(partyId);
        expect(party.name).toEqual(`Test Party ${partyId}`);
        expect(party.finalized).toBeFalsy();
    });
    it('grabs party info final', async () => {
        const partyId = await seedParty(testDb, { finalized: 1 });
        const p1Names = ['Alice', 'Bob'];
        await seedGuests(testDb, partyId, p1Names);

        const request = makeFormRequest('Alice', 'Bob');
        const result = await actions.default({
            request
        } as any);

        expect(result.success).toBeTruthy();
        expect(result.parties.length).toEqual(1);

        const party = result.parties[0];

        expect(party).toBeTruthy();
        expect(party.id).toEqual(partyId);
        expect(party.name).toEqual(`Test Party ${partyId}`);
        expect(party.finalized).toBeTruthy();
    });

    it('grabs the right party', async () => {
        const partyId = await seedParty(testDb);
        const partyId2 = await seedParty(testDb);
        const p1Names = ['Alice', 'Bob'];
        const p2Names = ['Alex', 'Roberta'];

        await seedGuests(testDb, partyId, p1Names);
        await seedGuests(testDb, partyId2, p2Names);

        const request = makeFormRequest('Alex', 'Alex');
        const result = await actions.default({
            request
        } as any);

        expect(result.success).toBeTruthy();
        expect(result.parties.length).toEqual(1);

        for (const name of p2Names) {
            expect(result.parties[0].guestNames.find((n) => n == name)).toBeTruthy();
        }
        for (const name of p1Names) {
            expect(result.parties[0].guestNames.find((n) => n == name)).toBeFalsy();
        }
    });

    it('Sorts parties', async () => {
        const partyId = await seedParty(testDb);
        const partyId2 = await seedParty(testDb);
        const p1Names = ['Alice', 'Bob'];
        const p2Names = ['Alex', 'Roberta'];

        await seedGuests(testDb, partyId, p1Names);
        await seedGuests(testDb, partyId2, p2Names);

        const request = makeFormRequest('Al', 'Bo');
        const result = await actions.default({
            request
        } as any);

        expect(result.success).toBeTruthy();
        expect(result.parties.length).toEqual(2);

        const party1 = result.parties[0];
        const party2 = result.parties[1];

        expect(party1.id).toEqual(partyId);
        expect(party2.id).toEqual(partyId2);

        expect(party1.score).toBeGreaterThan(party2.score);
    });

    it('grabs nothing', async () => {
        const request = makeFormRequest('Alex', 'Alex');

        expect(
            await actions.default({
                request
            } as any)
        ).toMatchObject({ status: 404 });
    });
    it('empty inputs', async () => {
        expect(
            await actions.default({
                request: makeFormRequest('', '')
            } as any)
        ).toMatchObject({ status: 400 });

        expect(
            await actions.default({
                request: makeFormRequest('Alex', '')
            } as any)
        ).toMatchObject({ status: 400 });

        expect(
            await actions.default({
                request: makeFormRequest('', 'Alex')
            } as any)
        ).toMatchObject({ status: 400 });
    });

    it('trims whitespace before searching', async () => {
        const partyId = await seedParty(testDb);
        await seedGuests(testDb, partyId, ['Alice', 'Bob']);

        const request = makeFormRequest('  Alice  ', '  Bob  ');
        const result = await actions.default({
            request
        } as any);

        expect(result.success).toBeTruthy();
        expect(result.parties.map((p) => p.id)).toEqual([partyId]);
    });
});
