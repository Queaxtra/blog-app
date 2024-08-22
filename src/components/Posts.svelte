<script lang="ts">
    import { getPosts } from "$lib/posts";
    import { onMount } from "svelte";

    let posts: any[] = [];
    let searchQuery = "";
    let selectedTag = "All";
    let currentPage = 1;
    const postsPerPage = 8;

    onMount(async () => {
        posts = await getPosts();
    });

    $: tags = ["All", ...new Set(posts.map(post => post.tag))];

    $: filteredPosts = posts.filter(post => 
        (selectedTag === "All" || post.tag === selectedTag) &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    $: totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    $: paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }
</script>

{#if filteredPosts.length === 0}
<div class="flex justify-center items-center h-screen">
    <h1 class="text-2xl font-semibold">No posts found!</h1>
</div>
{:else}
<div class="flex mt-6 space-x-4">
    <input type="text" placeholder="Search posts by content, title or tag..." class="bg-white border-2 border-black bg-transparent p-2 rounded-lg shadow-[5px_5px_0px_0px_#000000] w-full max-w-md placeholder:text-black/40 focus:outline-none" bind:value={searchQuery}  />
    <select bind:value={selectedTag} class="bg-white border-2 border-black bg-transparent p-2 rounded-lg shadow-[5px_5px_0px_0px_#000000] focus:outline-none">
        {#each tags as tag}
            <option value={tag}>{tag}</option>
        {/each}
    </select>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
    {#each paginatedPosts as post}
        <a href="/posts/{post.id}" class="bg-white border-2 border-black p-4 rounded-lg shadow-[5px_5px_0px_0px_#000000] relative">
            <div class="absolute top-2 right-2 flex space-x-2">
                {#if post.tag.toLowerCase() === "technology"}
                    <span class="bg-green-200 text-green-700 px-4 py-1 rounded-full text-sm"><i class="ri-code-s-slash-line"></i> {post.tag}</span>
                {:else if post.tag.toLowerCase() === "hot news"}
                    <span class="bg-red-200 text-red-700 px-4 py-1 rounded-full text-sm"><i class="ri-fire-line"></i> {post.tag}</span>
                {:else if post.tag.toLowerCase() === "fun"}
                    <span class="bg-yellow-200 text-yellow-700 px-4 py-1 rounded-full text-sm"><i class="ri-star-line"></i> {post.tag}</span>
                {:else if post.tag.toLowerCase() === "travel"}
                    <span class="bg-blue-200 text-blue-700 px-4 py-1 rounded-full text-sm"><i class="ri-plane-line"></i> {post.tag}</span>
                {:else if post.tag.toLowerCase() === "open source"}
                    <span class="bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm"><i class="ri-git-branch-line"></i> {post.tag}</span>
                {:else}
                    <span class="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm"><i class="ri-code-s-slash-line"></i> {post.tag}</span>
                {/if}
            </div>
            <h1 class="text-xl font-bold mb-2">
                {post.title.length > 30 ? post.title.slice(0, 30) + '...' : post.title}
            </h1>
            <p class="text-md mb-4">
                {@html post.content.split(' ').slice(0, 30).join(' ') + (post.content.split(' ').length > 30 ? '...' : '')}
            </p>
            <div class="flex">
                <p class="text-sm"><i class="ri-user-line"></i> {post.author}</p>
                <p class="text-sm ml-2"><i class="ri-calendar-line"></i> {(new Date(post.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </a>
    {/each}
</div>

<div class="flex justify-center items-center mt-6 space-x-4">
    <button on:click={prevPage} disabled={currentPage === 1} class="bg-white border-2 border-black px-6 py-2 rounded-lg inline-block shadow-[5px_5px_0px_0px_#000000] disabled:opacity-20">
        <i class="ri-arrow-left-line"></i> Previous
    </button>
    <span class="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
    <button on:click={nextPage} disabled={currentPage === totalPages} class="bg-white border-2 border-black px-6 py-2 rounded-lg inline-block shadow-[5px_5px_0px_0px_#000000] disabled:opacity-20">
        Next <i class="ri-arrow-right-line"></i>
    </button>
</div>
{/if}
