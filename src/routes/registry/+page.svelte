<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import { onDestroy } from 'svelte';
    let embedContainer: HTMLDivElement;

    onDestroy(() => {
        if (embedContainer) {
            embedContainer.innerHTML = '';
        }
    });
</script>

<svelte:head>
    <script id="zola-wjs" async src="https://widget.zola.com/js/widget.js"></script>
</svelte:head>

<Seo title="Registry" description="Registry details for Austin and Mariah's wedding." />

<h1>Registry</h1>

<div bind:this={embedContainer}>
    <a
        class="zola-registry-embed"
        href="https://www.zola.com/registry/"
        data-registry-key="austinandmariahnovember14">Our Zola Wedding Registry</a
    >
</div>
