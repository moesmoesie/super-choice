// client.js
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client =  sanityClient({
  projectId: 'bonj5if3', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true // `false` if you want to ensure fresh data
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
export function urlFor(source) {
  return builder.image(source)
}