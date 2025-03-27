// src/utils/validateDocs.ts
import { getCollection } from 'astro:content';

async function validateDocs() {
  // This array defines all our content collection names
  // These match the directory names under /src/content/
  const collections = [
    'refactoring',
    'vue-idioms',
    'tooling',
    'testing',
    'mindset',
    'guides',
    'design-systems',
    'composables',
    'architecture'
  ];

  // We iterate through each collection name in the array
  for (const collectionName of collections) {
    try {
      // getCollection fetches all documents from the named collection
      const docs = await getCollection(collectionName);

      // Check each document in the collection
      docs.forEach(doc => {
        // Validate that category exists
        if (!doc.data.category) {
          console.warn(`Warning: ${doc.id} is missing required 'category' field`);
        }

        // Validate that category matches the directory
        if (doc.data.category !== collectionName) {
          console.warn(
            `Warning: ${doc.id} has category '${doc.data.category}' ` +
            `but is in '${collectionName}' directory`
          );
        }
      });
    } catch (error) {
      console.error(`Error validating ${collectionName}:`, error);
    }
  }
}

// Export the function to use it elsewhere
export { validateDocs };
