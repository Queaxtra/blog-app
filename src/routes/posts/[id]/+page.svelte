<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { fetchPost } from "$lib/posts";

    let postId = $page.params.id;
    let post: any = null;

    onMount(async () => {
        post = await fetchPost(postId);
    });

    function processContent(content: string): string {
        content = content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, p1) => {
            return `<pre class="overflow-x-auto whitespace-pre-wrap break-words"><code>${p1}</code></pre>`;
        });

        content = content.replace(/<code>(.*?)<\/code>/g, (match, p1) => {
            return `<code class="break-words">${p1}</code>`;
        });

        return content;
    }
</script>

{#if post}
<div class="max-w-full sm:max-w-8xl mx-auto mt-4 sm:mt-10 px-4">
    <div class="bg-white border-2 border-black p-4 sm:p-6 rounded-lg shadow-[3px_3px_0px_0px_#000000] sm:shadow-[5px_5px_0px_0px_#000000]">
        <div class="flex flex-col items-start">
            <h1 class="text-2xl sm:text-3xl font-bold break-words">{post.title}</h1>
            {#if post.tag}
                <div class="mt-2 mb-4">
                    {#if post.tag.toLowerCase() === "technology"}
                    <span class="bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-code-s-slash-line"></i> {post.tag}</span>
                    {:else if post.tag.toLowerCase() === "hot news"}
                    <span class="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-fire-line"></i> {post.tag}</span>
                    {:else if post.tag.toLowerCase() === "fun"}
                    <span class="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-star-line"></i> {post.tag}</span>
                    {:else if post.tag.toLowerCase() === "travel"}
                    <span class="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-plane-line"></i> {post.tag}</span>
                    {:else if post.tag.toLowerCase() === "open source"}
                    <span class="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-git-branch-line"></i> {post.tag}</span>
                    {:else}
                    <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm"><i class="ri-code-s-slash-line"></i> {post.tag}</span>
                    {/if}
                </div>
            {/if}
        </div>
        <div class="prose max-w-none mb-4 overflow-wrap-anywhere break-words text-sm sm:text-base">
            {@html processContent(post.content)}
        </div>
        <div class="flex flex-col sm:flex-row mt-1 text-xs sm:text-sm text-gray-600">
            <p class="mb-1 sm:mb-0"><i class="ri-user-line"></i> {post.author}</p>
            <p class="sm:ml-4"><i class="ri-calendar-line"></i> {(new Date(post.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    </div>
    <div class="py-4">
        <a href="/" class="bg-white border-2 border-black px-4 sm:px-6 py-2 rounded-lg inline-block shadow-[3px_3px_0px_0px_#000000] sm:shadow-[5px_5px_0px_0px_#000000] text-sm sm:text-base">
            <i class="ri-arrow-left-line"></i> Back to Posts
        </a>
    </div>
</div>

{:else if post === null}
<div class="flex justify-center items-center h-screen">
    <h1 class="text-xl sm:text-2xl font-semibold">Post not found</h1>
</div>
{:else}
<div class="flex justify-center items-center h-screen">
    <h1 class="text-xl sm:text-2xl font-semibold">Loading post...</h1>
</div>
{/if}
