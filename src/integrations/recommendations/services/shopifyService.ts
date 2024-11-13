import { ShopifyProduct } from '../types/recommendation.types'

export class ShopifyService {
  constructor(
    private readonly shopDomain: string,
    private readonly accessToken: string
  ) {}

  async fetchProducts(limit = 250): Promise<ShopifyProduct[]> {
    try {
      const response = await fetch(
        `https://${this.shopDomain}/admin/api/2024-01/products.json?limit=${limit}`,
        {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      return data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: product.variants[0]?.price || '0.00',
        featured_image: product.images[0]?.src || '',
        tags: Array.isArray(product.tags) ? product.tags : product.tags.split(','),
        product_type: product.product_type,
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async updateThemeFiles(snippetContent: string, scriptContent: string): Promise<boolean> {
    try {
      // Get main theme ID
      const themesResponse = await fetch(
        `https://${this.shopDomain}/admin/api/2024-01/themes.json`,
        {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!themesResponse.ok) {
        throw new Error('Failed to fetch themes')
      }

      const { themes } = await themesResponse.json()
      const mainTheme = themes.find((t: any) => t.role === 'main')

      if (!mainTheme) {
        throw new Error('No main theme found')
      }

      // Create/update snippet file
      const snippetResponse = await fetch(
        `https://${this.shopDomain}/admin/api/2024-01/themes/${mainTheme.id}/assets.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            asset: {
              key: 'snippets/ai-recommendations.liquid',
              value: snippetContent
            }
          })
        }
      )

      if (!snippetResponse.ok) {
        throw new Error('Failed to update snippet file')
      }

      // Create/update JavaScript file
      const scriptResponse = await fetch(
        `https://${this.shopDomain}/admin/api/2024-01/themes/${mainTheme.id}/assets.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            asset: {
              key: 'assets/recommendations.js',
              value: scriptContent
            }
          })
        }
      )

      if (!scriptResponse.ok) {
        throw new Error('Failed to update script file')
      }

      return true
    } catch (error) {
      console.error('Error updating theme files:', error)
      return false
    }
  }
}