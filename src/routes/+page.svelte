<script>
    import stare from '$lib/assets/cute_stare.jpg';
    import unionPickup from '$lib/assets/union_pickup.jpg';

    import jump from '$lib/assets/jump.jpg';
    import silly from '$lib/assets/silly.jpg';
    import laugh from '$lib/assets/laugh.jpg';
    import walk from '$lib/assets/walk.jpg';
    import piggy_back from '$lib/assets/piggy_back.jpg';
    import bw_kissy from '$lib/assets/bw_kissy.jpg';

    import Seo from '$lib/components/Seo.svelte';
    let { data } = $props();
</script>

<Seo image={unionPickup} />

<div class="hero">
    <img src={stare} alt="The groom and bride sharing a loving look." />
    <h1>Austin & Mariah</h1>
</div>

<div class="info-card">
    <h2>General Info:</h2>
    <div><b>When:</b> {data.date}</div>
    <div><b>Where:</b> {data.place}</div>
</div>

<div class="photos-section">
    <h2>The Bride and Groom:</h2>

    <div class="photos">
        <div class="walk-silly">
            <img src={walk} alt="The bride and groom cross the street symbollically." />

            <div class="silly-laugh">
                <img src={silly} alt="The groom is silly." />
                <img src={laugh} alt="The bride laughs." />
            </div>
        </div>

        <div class="bw-kissy">
            <img src={bw_kissy} alt="The bride and groom kiss in black and white." />
        </div>

        <div class="pig-jump">
            <img src={piggy_back} alt="The groom piggy backs the bride." />
            <img src={jump} alt="The bride and groom leap in excitement." />
        </div>
    </div>
</div>

<style>
    .hero {
        position: relative;
        aspect-ratio: 4/3;
        display: flex;
        align-items: flex-end;
        justify-content: left;

        & img {
            position: absolute;
            inset: 0;
            object-position: center 30%;
            object-fit: cover;
            z-index: 0;
        }

        & h1 {
            border-radius: 10px;
            position: relative;
            margin: 10px;
            padding: 0.5rem 1.5rem;
            background: color-mix(in srgb, var(--bg-color) 70%, transparent);
            font-size: clamp(1.5rem, 5vw, 3rem);
            z-index: 1;
        }
    }
    .info-card div {
        margin: 5px;
        margin-top: 15px;
    }

    .photos {
        display: flex;
        flex-direction: column;
        align-items: center;

        & img {
            max-width: 100%;
            margin: 35px;
            width: 350px;
            height: auto;
            display: block;
        }

        & .walk-silly,
        & .bw-kissy,
        & .pig-jump {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        & .walk-silly {
            gap: 10px;

            & .silly-laugh {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                gap: 10px;
            }
        }

        & .pig-jump img {
            width: 300px;
        }

        @media (min-width: 700px) {
            & .bw-kissy img {
                width: 500px;
            }
            & .pig-jump,
            & .walk-silly {
                flex-direction: row;
                align-items: stretch;
            }
        }
    }
</style>
