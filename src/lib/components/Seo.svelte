<script lang="ts">
    import { page } from '$app/state';
    import { SiteTitle, SiteDescription } from '$lib/info';

    let {
        title,
        description = SiteDescription,
        image,
        noindex = false
    }: {
        title?: string;
        description?: string;
        image?: string;
        noindex?: boolean;
    } = $props();

    let fullTitle = $derived(title ? `${title} | ${SiteTitle}` : SiteTitle);
    let imageUrl = $derived(image ? new URL(image, page.url.origin).toString() : undefined);
    let canonicalUrl = $derived(page.url.origin + page.url.pathname);
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    {#if noindex}
        <meta name="robots" content="noindex, nofollow" />
    {/if}

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SiteTitle} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    {#if imageUrl}
        <meta property="og:image" content={imageUrl} />
    {/if}

    <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    {#if imageUrl}
        <meta name="twitter:image" content={imageUrl} />
    {/if}
</svelte:head>
