<script lang="ts">
    import { goto } from '$app/navigation';

    function goToHomePage() {
        goto('/');
    }
</script>

<div class="flex flex-col justify-center items-center h-screen">
    <div class="text-center p-8 bg-white border-2 border-black rounded-lg shadow-[5px_5px_0px_0px_#000000]">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <h2 class="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p class="text-lg mb-6">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <button on:click={goToHomePage} class="bg-black text-white px-6 py-2 rounded-lg">
            <i class="ri-home-line mr-2"></i> Go to Homepage
        </button>
    </div>
    <div class="mt-8">
        <span class="text-sm text-gray-600"><i class="ri-error-warning-line mr-1"></i> If you believe this is a mistake, please <a href="https://t.me/Queaxtra" class="text-black underline">contact me.</a></span>
    </div>
</div>
