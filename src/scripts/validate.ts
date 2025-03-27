import { validateDocs } from '../utils/validateDocs';

// Run the validation
validateDocs().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});
