import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Search, ShoppingBasket, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import goldenHero from '@/assets/golden-beer.png'
import stout from '@/assets/irish-stout.png'
import golden from '@/assets/golden-small.png'
import england from '@/assets/england-knights.png'
import hops from '@/assets/hops.png'
import lemon from '@/assets/lemon.png'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Surya Beer — A Place for Good Beer' },
    { name: 'description', content: 'Discover Irish Stout, Golden Beer, and England Knights. Find your favorite at Surya Beer.' },
    { property: 'og:title', content: 'Surya Beer — A Place for Good Beer' },
    { property: 'og:description', content: 'Discover the Surya Beer collection: Irish Stout, Golden Beer, and England Knights.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
})

const products = [
  { id: 'irish', name: 'IRISH STOUT', price: 512, image: stout, description: 'Rich roasted malt, a smooth finish, and a generous creamy head.' },
  { id: 'golden', name: 'GOLDEN BEER', price: 347, image: golden, description: 'Bright golden color, crisp hops, and a clean, refreshing finish.' },
  { id: 'england', name: 'ENGLAND KNIGHTS', price: 439, image: england, description: 'An amber English-style ale with a rounded malt character.' },
] as const
type Product = typeof products[number]
type Panel = 'search' | 'favorites' | 'basket' | 'about' | 'products' | 'shop' | 'blog' | 'detail' | null
const money = (amount: number) => `$${amount.toFixed(2)}`

function Index() {
  const [slide, setSlide] = useState(1)
  const [panel, setPanel] = useState<Panel>(null)
  const [selected, setSelected] = useState<Product>(products[1])
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [basket, setBasket] = useState<Record<string, number>>({})
  const featured = products[slide] ?? products[1]
  const basketCount = Object.values(basket).reduce((sum, n) => sum + n, 0)
  const add = (id: string) => setBasket(current => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  const remove = (id: string) => setBasket(current => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) - 1) }))
  const favorite = (id: string) => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const openProduct = (product: Product) => { setSelected(product); setPanel('detail') }
  const shown = products.filter(product => panel === 'favorites' ? favorites.includes(product.id) : panel === 'basket' ? (basket[product.id] ?? 0) > 0 : product.name.toLowerCase().includes(query.toLowerCase()))
  const titles: Record<Exclude<Panel, null>, string> = { search: 'Find your beer', favorites: 'Your favorites', basket: 'Your basket', about: 'About Surya', products: 'Our beers', shop: 'The beer shop', blog: 'Beer journal', detail: selected.name }

  return <main className="storefront-page">
    <section className="storefront" aria-label="Surya Beer storefront">
      <div className="green-panel" />
      <header className="store-header">
        <a className="brand" href="/" aria-label="Surya Beer home"><span className="brand-badge">SURYA</span><span className="brand-word">BEER</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <Button variant="navigation" className={panel === null ? 'active' : ''} onClick={() => { setPanel(null); setSlide(1) }}>Home</Button>
          <Button variant="navigation" className={panel === 'about' ? 'active' : ''} onClick={() => setPanel('about')}>About Us</Button>
          <Button variant="navigation" className={panel === 'products' ? 'active' : ''} onClick={() => { setQuery(''); setPanel('products') }}>Products</Button>
          <Button variant="navigation" className={panel === 'shop' ? 'active' : ''} onClick={() => { setQuery(''); setPanel('shop') }}>Shop</Button>
          <Button variant="navigation" className={panel === 'blog' ? 'active' : ''} onClick={() => setPanel('blog')}>Blog</Button>
        </nav>
        <div className="header-tools">
          <Button variant="storefront" size="icon" aria-label="Search beers" title="Search beers" onClick={() => { setQuery(''); setPanel('search') }}><Search /></Button>
          <Button variant="storefront" size="icon" aria-label="View favorites" title="Favorites" onClick={() => setPanel('favorites')}><Heart /></Button>
          <Button variant="storefront" size="icon" className="basket-button" aria-label="View basket" title="Basket" onClick={() => setPanel('basket')}><ShoppingBasket />{basketCount > 0 && <span className="basket-count">{basketCount}</span>}</Button>
        </div>
      </header>
      <div className="hero-copy">
        <p className="eyebrow">PERFORMANCE</p>
        <h1>A PLACE FOR<br />GOOD BEER</h1>
        <p>Let your emotions come out with a beer in your hand.<br />The taste that makes you feel awesome</p>
      </div>
      <img key={featured.id} className="hero-product" src={slide === 1 ? goldenHero : featured.image} alt={featured.name + ' beer bottle'} width={1024} height={1536} />
      <div className="product-selection" aria-label="Beer collection">
        {products.map(product => <Button key={product.id} variant="product" onClick={() => openProduct(product)} aria-label={'View ' + product.name}>
          <span className={'product-art product-' + product.id}><img src={product.image} alt={product.name + ' bottle and glass'} width={768} height={1024} loading="lazy" /></span>
          <span className="product-name">{product.name}</span>
          <span className="product-specs">ABV 6,5% | IBU 60 | OG 1.104</span>
          <span className="product-price">{money(product.price)}</span>
        </Button>)}
      </div>
      <div className="slide-controls">
        <Button variant="storefront" size="icon" aria-label="Previous beer" title="Previous beer" onClick={() => setSlide(current => (current + 2) % 3)}><ArrowLeft /></Button>
        <Button variant="storefront" size="icon" aria-label="Next beer" title="Next beer" onClick={() => setSlide(current => (current + 1) % 3)}><ArrowRight /></Button>
      </div>
      <p className="health-note">*Drinking Alcohol Is Injurious To Health</p>
      <img src={hops} className="floating-hop hop-one" alt="" width={317} height={415} />
      <img src={hops} className="floating-hop hop-two" alt="" width={317} height={415} />
      <img src={hops} className="floating-hop hop-three" alt="" width={317} height={415} />
      <img src={lemon} className="floating-lemon" alt="" width={338} height={323} />
    </section>
    <Dialog open={panel !== null} onOpenChange={open => { if (!open) setPanel(null) }}>
      <DialogContent>
        <DialogTitle className="dialog-heading">{panel ? titles[panel] : ''}</DialogTitle>
        <DialogDescription className="sr-only">{panel === 'detail' ? selected.description : 'Explore the Surya Beer collection.'}</DialogDescription>
        {panel === 'about' && <p className="dialog-description">A place for good beer. Surya brings together rich stouts, refreshing golden lagers, and characterful English ales.</p>}
        {panel === 'blog' && <div><h3 className="dialog-heading">A beer for every taste</h3><p className="dialog-description">From the roasted character of Irish Stout to the crisp finish of Golden Beer and the rounded malt of England Knights, explore three distinct styles in our collection.</p></div>}
        {panel === 'detail' && <div className="product-detail"><img src={selected.image} alt={selected.name} width={768} height={1024} /><div><p className="dialog-description">{selected.description}</p><p className="product-specs">ABV 6,5% | IBU 60 | OG 1.104</p><strong className="product-price">{money(selected.price)}</strong><div className="detail-actions"><Button onClick={() => add(selected.id)}><Plus />{basket[selected.id] ? `Add another (${basket[selected.id]})` : 'Add to basket'}</Button><Button variant="outline" size="icon" aria-label="Save to favorites" aria-pressed={favorites.includes(selected.id)} onClick={() => favorite(selected.id)}><Heart fill={favorites.includes(selected.id) ? 'currentColor' : 'none'} /></Button></div></div></div>}
        {['search', 'products', 'shop', 'favorites', 'basket'].includes(panel ?? '') && <>
          {panel === 'search' && <input autoFocus className="search-input" placeholder="Search for a beer…" aria-label="Search beer collection" value={query} onChange={event => setQuery(event.target.value)} />}
          <div className="catalog-list">{shown.length === 0 && <p className="empty-state">{panel === 'favorites' ? 'No favorites yet.' : panel === 'basket' ? 'Your basket is empty.' : 'No beers found.'}</p>}{shown.map(product => <div className="catalog-row" key={product.id}><img src={product.image} alt={product.name} width={768} height={1024} /><div className="catalog-row-info"><h3>{product.name}</h3><p>{panel === 'basket' ? `Quantity: ${basket[product.id]}` : 'ABV 6,5% · 330 ml'}</p><strong>{money(product.price)}</strong></div>{panel === 'basket' ? <><Button variant="outline" size="icon" aria-label={'Remove one ' + product.name} onClick={() => remove(product.id)}><Minus /></Button><Button variant="outline" size="icon" aria-label={'Add one ' + product.name} onClick={() => add(product.id)}><Plus /></Button></> : panel === 'favorites' ? <Button variant="outline" size="icon" aria-label={'Remove favorite ' + product.name} onClick={() => favorite(product.id)}><Trash2 /></Button> : <Button variant="outline" onClick={() => openProduct(product)}>View <ArrowRight /></Button>}</div>)}</div>
          {panel === 'basket' && basketCount > 0 && <div className="basket-total"><span>Total</span><span>{money(products.reduce((total, product) => total + product.price * (basket[product.id] ?? 0), 0))}</span></div>}
        </>}
      </DialogContent>
    </Dialog>
  </main>
}
