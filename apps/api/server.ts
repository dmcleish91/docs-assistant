import { serve } from '@hono/node-server';
import app from './index.js';

const port = app.port || 8787;

console.log(`🚀 Documentation Assistant API starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
