// src/setupTests.js
import { worker } from "./mocks/browser";

// Start the mock service worker
beforeAll(() => worker.start());
