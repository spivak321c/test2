// Component loader for AdminJS custom components

import { ComponentLoader } from "adminjs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const componentLoader = new ComponentLoader()

// Override the default component loader to use our custom components directory
const componentsDir = path.join(__dirname, "components")

export default componentLoader
