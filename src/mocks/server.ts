import { setupServer } from "msw/node"
import { handlers } from "./handlers"

// Initialize the server
export const server = setupServer(...handlers)
