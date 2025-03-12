## NextJS app router caching

Async server component

- fetch without any cache option

  ```typescript
  export default async function fetchAlbum() {
    const res = await fetch(`http://localhost:9999/albums`)
    return res.json()
  }
  ```

  - generate a cache file in `.next/cache/fetch-cache` at first fetch
  - if source changed, the data will not be updated
    - on change route
    - on refresh page

- fetch with revalidation set to n (n stands for duration in second for revalidation to happen)

  ```ts
  export default async function fetchAlbum() {
    const res = await fetch(`http://localhost:9999/albums`, {
      next: { revalidate: n }
    })
    return res.json()
  }
  ```

  - will not generate a cache file anyway

  - if source changed

    - the data will not be updated on change route if the component is already mounted on page

    - the data will be updated 
      - on refresh page
      - on component mount

  - if source not changed
    - the req will be sent on refresh page
    - the change route at the first time

- fetch with cache control set to `no-store`

  ```ts
  export default async function fetchAlbum() {
    const res = await fetch(`http://localhost:9999/albums`, { cache: 'no-store' })
    return res.json()
  }
  ```

  Basically the behaviours are the same as revalidate set to 0
