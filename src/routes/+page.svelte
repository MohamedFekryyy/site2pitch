<script>
    import { writable } from 'svelte/store';

    

    const responseText = writable('');

    async function handleSubmit(event) {
        console.log("handleSubmit function called");
        event.preventDefault();
        console.log("Default form submission prevented");
        const formData = new FormData(event.target);
        const url = formData.get('url');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            console.log(response);


            if (response.ok) {
                const result = await response.json();
                responseText.set(result.pitchDeckText);
            } else {
                // Handle non-OK responses
                console.error('Response error:', response.status);
                responseText.set(`Error: ${response.status}`);
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Fetch error:', error);
            responseText.set(`Error: ${error.message}`);
        }
    }

    function handleFocus() {
    document.getElementById('globeIcon').classList.add('opacity-90');
}

function handleBlur() {
    document.getElementById('globeIcon').classList.remove('opacity-90');
}


</script>

<main class="h-screen flex flex-col items-center justify-center w-screen bg-rose-100/50">
    <h1 class="text-3xl font-medium mb-4">Site2Pitch</h1>
    <p class="text-rose-950/70 mb-8">Get a professional pitch deck for your business in minutes.</p>
<form on:submit={handleSubmit} class=" bg-white flex rounded-lg bg-transparent min-w-[500px]  relative  ">
    
    <img id="globeIcon"  src="icons/globe.svg" alt="" class="transition-all duration-150 absolute h-6 opacity-60 w-6 my-auto flex top-0 bottom-0 left-4 "/>
    <input id="urlInput" on:focus={handleFocus} on:blur={handleBlur}   type="text" name="url" placeholder="Paste your business URL" class="px-5 !pl-12 py-4 w-full text-lg outline-none hover:shadow-md shadow-rose-950/10 shadow-lg focus:border-rose-800/10 focus:shadow-md hover:bg-white/80 focus:shadow-rose-800/10 border transition-all duration-200 ease-in-out border-transparent  rounded-lg" >
    <button type="submit" class="absolute  w-44 bg-white hover:bg-rose-900/10  right-1 rounded transition-all duration-150 ease-in-out border-white font-medium text-rose-950 text-lg top-1 bottom-1">Get a Pitch Deck</button>

</form>
<p>{$responseText}</p>

</main>