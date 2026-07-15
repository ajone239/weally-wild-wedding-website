<h2>Controls</h2>

<section>
    <h3>Buttons</h3>
    <button type="button">Default</button>
    <button type="button" disabled>Disabled</button>
    <button type="submit">Submit</button>
</section>

<section>
    <h3>Text Inputs</h3>
    <form novalidate>
        <label>
            Normal
            <input type="text" placeholder="placeholder text" />
        </label>
        <label>
            With value
            <input type="text" value="some value" />
        </label>
        <label>
            Required (submit empty to trigger invalid)
            <input type="text" required placeholder="required field" />
        </label>
        <label>
            Email
            <input type="email" placeholder="you@example.com" />
        </label>
        <label>
            Password
            <input type="password" placeholder="••••••••" />
        </label>
        <button type="submit">Trigger validation</button>
    </form>
</section>

<section>
    <h3>Textarea</h3>
    <label>
        Notes
        <textarea placeholder="say something..."></textarea>
    </label>
    <label>
        Required textarea
        <textarea required placeholder="this one's required"></textarea>
    </label>
</section>

<section>
    <h3>Checkboxes</h3>
    <label>
        <input type="checkbox" /> Unchecked
    </label>
    <label>
        <input type="checkbox" checked /> Checked
    </label>
    <label>
        <input type="checkbox" disabled /> Disabled
    </label>
</section>

<style>
    section {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    label:has(input[type='checkbox']) {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
</style>
