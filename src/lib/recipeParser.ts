import { CheerioAPI, load } from "cheerio";

interface JSONLDRecipe {
  /**
   * In JSON-LD, @type can be a string or an array of strings.
   */
  "@type"?: string | string[];

  /**
   * JSON-LD can nest graphs.
   * If there's a @graph, it's often an array of further JSON-LD objects.
   */
  "@graph"?: JSONLDRecipe[];

  /**
   * Any other fields (name, description, ingredient, etc.).
   * We don't strictly type them here, but you can refine later as needed.
   */
  [key: string]: unknown;
}

export async function extractRecipeFromURL(url: string) {
  const html = await fetchHTML(url);

  const $ = load(html);

  // 3. Attempt to find JSON-LD <script> for a recipe
  const recipeData = findRecipeJSONLD($);

  // If no recipe JSON-LD found, attempt to parse microdata (future release)
  if (!recipeData) {
    return null;
  }

  // 4. Extract relevant fields from the JSON-LD
  const extracted = extractRecipeFields(recipeData);

  // Create the recipe in supabase
  const supabaseData = buildSupabaseRecipeData(extracted, "1234");

  return extracted;
}

async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

/**
 * Scans all <script type="application/ld+json"> tags,
 * parses JSON, and returns the first object whose @type includes "Recipe".
 * If nothing is found, returns null.
 */
function findRecipeJSONLD($: CheerioAPI): JSONLDRecipe | null {
  let recipeData = null;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).contents().text());
      // console.log(json);

      if (Array.isArray(json)) {
        // If it's an array, find the first item whose @type is or includes "Recipe"
        const recipeObj = json.find((item) => {
          const typeVal = item["@type"];
          return Array.isArray(typeVal)
            ? typeVal.includes("Recipe")
            : typeVal === "Recipe";
        });

        if (recipeObj) {
          recipeData = recipeObj;
          return false; // stop .each() once found
        }
      } else if (json["@graph"] && Array.isArray(json["@graph"])) {
        // If there's a @graph array, search in there
        const recipeObj = json["@graph"].find((item) => {
          const typeVal = item["@type"];
          return Array.isArray(typeVal)
            ? typeVal.includes("Recipe")
            : typeVal === "Recipe";
        });
        if (recipeObj) {
          recipeData = recipeObj;
          return false;
        }
      } else {
        // If it's a single object
        const typeVal = json["@type"];
        if (
          (typeof typeVal === "string" && typeVal === "Recipe") ||
          (Array.isArray(typeVal) && typeVal.includes("Recipe"))
        ) {
          recipeData = json;
          return false; // stop .each()
        }
      }
    } catch (err) {
      // Malformed JSON or something unexpected
      // console.error("Error parsing JSON-LD:", err);
    }
  });

  return recipeData;
}

function extractRecipeFields(recipeData: any): ExtractedRecipeFields {
  // Safely destructure
  const {
    name, // title
    description, // description
  } = recipeData;

  return {
    name: typeof name === "string" ? name : "",
    description: typeof description === "string" ? description : "",
  };
}

interface ExtractedRecipeFields {
  name: string;
  description: string;
}

export function buildSupabaseRecipeData(
  recipe: ExtractedRecipeFields,
  userId: string,
) {
  const name = recipe.name;
  const description = recipe.description;

  return {
    userId,
    name,
    description,
  };
}
