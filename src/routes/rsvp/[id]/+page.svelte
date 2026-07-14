<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();

	let party = $state(structuredClone(data.party));
	let guests = $state(structuredClone(data.guests));
	let notes = $state('');

	let serdes = $derived(JSON.stringify({ p: party, g: guests, n: notes }));

	$effect(() => {
		party = structuredClone(data.party);
		guests = structuredClone(data.guests);
	});

	$inspect(party);
	$inspect(guests);
</script>

<p>{form}</p>

<h2>Party: {party.name} ({party.id})</h2>

<form method="POST" use:enhance>
	<div>
		<label>
			Finalize:
			<input type="checkbox" value={party.is_rsvp != 0} onchange={() => (party.is_rsvp ^= 1)} />
		</label>
	</div>

	<div>
		<h3>Guests</h3>
		{#each guests as guest}
			<ul>
				<li>
					<label>
						{guest.name}:
						<input
							type="checkbox"
							value={guest.is_rsvp != 0}
							onchange={() => (guest.is_rsvp ^= 1)}
						/>
					</label>
				</li>
			</ul>
		{:else}
			<p>No guests :(</p>
		{/each}
	</div>

	<div>
		<h3>Notes:</h3>

		<!-- TODO(ajone239): hook up -->
		<textarea bind:value={notes}></textarea>
	</div>

	<input type="hidden" value={serdes} name="data" />

	<div>
		<button type="submit"> Submit </button>
		<button onclick={() => invalidateAll()}> Clear </button>
	</div>
</form>
