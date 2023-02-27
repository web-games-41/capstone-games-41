import { sql } from "../database.utils"



export interface Category {
    categoryId: string | null
    categoryName: string
}

/**
 * Helper function that interacts with postgres to insert a category object in the database
 * @param category Category object that will be inserted into the database
 * @return success message if the sql statement was executed with no errors
 **/
export async function insertCategory (category: Category): Promise<string> {
    const { categoryName} = category

    await sql`insert into category(category_id, category_name) values (gen_random_uuid(), ${categoryName})`
    return 'Category successfully inserted'
}

/**
 *
 **/

export async function selectCategoryByCategoryId (categoryId: string): Promise<Category|null> {
    const result = await sql<Category[]>`select category_id, category_name from category where category_id = ${categoryId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectAllCategories (): Promise<Category[]> {
    return sql<Category[]>`select category_id, category_name from category`
}