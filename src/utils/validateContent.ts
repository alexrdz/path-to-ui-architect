import { getCollection } from 'astro:content';

export async function validateBlogPosts() {
  try {
    const posts = await getCollection('blog');
    posts.forEach(post => {
      const { data } = post;
      const requiredFields = ['title', 'publishDate', 'description', 'author'];

      requiredFields.forEach(field => {
        if (!data[field]) {
          console.warn(`Warning: ${post.id} is missing required field: ${field}`);
        }
      });
    });
  } catch (error) {
    console.error('Content validation failed:', error);
  }
}
