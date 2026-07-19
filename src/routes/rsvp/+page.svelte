<script lang="ts">
    import { enhance } from '$app/forms';
    import Seo from '$lib/components/Seo.svelte';
    let { form } = $props();
    let submitting = $state(false);
</script>

<Seo title="RSVP" description="RSVP for Austin and Mariah's wedding." />

<h2>Find your party:</h2>

<p>Please enter the first and last name of one of the members of your party.</p>

<form
    method="POST"
    use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
            await update({ reset: false });
            submitting = false;
        };
    }}
>
    <div>
        <label>
            <input placeholder="First Name" type="text" required name="firstName" />
        </label>
        <label>
            <input placeholder="Last Name" type="text" required name="lastName" />
        </label>
    </div>
    <button type="submit" disabled={submitting}>Submit</button>
</form>

{#if submitting}
    <p>Searching...</p>
{:else if form?.parties}
    <h2>Select your Party:</h2>

    {#each form?.parties as partay (partay.id)}
        <div class="party-card">
            <h4>
                <a href="/rsvp/{partay.id}">
                    Party: {partay.name}

                    {#if partay.finalized}
                        <span class="deco">[RSVP'd!]</span>
                    {/if}
                    <span class="click"></span>
                </a>
            </h4>

            <p>
                <b> Members: </b>
                {partay.guestNames.join(', ')}
            </p>
        </div>
    {/each}
{:else if form?.message}
    <h2>Error finding your Party:</h2>
    <p>{form.message}</p>
{/if}

<style>
    .party-card {
        position: relative;
        padding: 5px;
        margin: 5px;
        border: 2px solid var(--main-border-color);
        border-radius: 8px;

        &:hover {
            background: var(--hover-bg-color);
        }

        a {
            color: inherit;
        }

        span.deco {
            color: var(--menu-color);
        }

        span.click {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            z-index: 1;
        }
    }
</style>
