import { db } from '$lib/server/db';
import { guest, party, type Guest } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const party_id = params.id;

    const the_party = await db.query.party.findFirst({
        where: eq(party.id, party_id)
    });

    if (!the_party) {
        error(404, "party not found");
    }

    const guests: Guest[] = await db.query.guest.findMany({
        where: eq(guest.party_id, party_id)
    });

    return {
        party: the_party,
        guests: guests
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);
    }
}
