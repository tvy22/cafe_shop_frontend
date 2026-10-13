import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Menu as MenuIcon, Plus, Search, ShoppingCart, X } from 'lucide-react'
import { menuItems } from '../../data/menuItems'
import { useCart } from '../../context/useCart'
import CafeFooter from './CafeFooter'

function getTopOrderedDrink(orders) {
  const drinkIds = new Set(menuItems.filter((item) => item.type === 'drink').map((item) => item.id))
  const quantities = orders.reduce((totals, order) => {
    for (const item of order.items ?? []) {
      const itemId = item.menuItemId || item.id?.split(':', 1)[0]
      if (!drinkIds.has(itemId)) continue
      totals[itemId] = (totals[itemId] ?? 0) + (item.quantity ?? 1)
    }
    return totals
  }, {})

  const topSeller = menuItems
    .filter((item) => item.type === 'drink')
    .reduce((leader, item) => {
      const quantity = quantities[item.id] ?? 0
      return quantity > leader.quantity ? { item, quantity } : leader
    }, { item: null, quantity: 0 })

  return topSeller.quantity ? topSeller : null
}

export default function FirstPage() {
  const { addToCart, itemCount, orders } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [addedItemId, setAddedItemId] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [sweetness, setSweetness] = useState('100%')
  const [toppings, setToppings] = useState([])
  const [note, setNote] = useState('')

  const topOrderedDrink = getTopOrderedDrink(orders)
  const heroDrink = topOrderedDrink?.item ?? menuItems.find((item) => item.id === 'matcha-cloud-latte')
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))]
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = !normalizedQuery || [item.name, item.category, item.description]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesCategory && matchesSearch
  })

  function addItem(item) {
    const customization = {
      sweetness: item.type === 'drink' ? sweetness : '',
      toppings,
      note: note.trim(),
    }
    addToCart({
      ...item,
      id: `${item.id}:${JSON.stringify(customization)}`,
      menuItemId: item.id,
      customization,
    })
    setAddedItemId(item.id)
    setSelectedItem(null)
    setToppings([])
    setNote('')
    setSweetness('100%')
  }

  function openCustomization(item) {
    setSelectedItem(item)
    setSweetness('100%')
    setToppings([])
    setNote('')
  }

  function toggleTopping(topping) {
    setToppings((current) => current.includes(topping)
      ? current.filter((choice) => choice !== topping)
      : [...current, topping])
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header>
        <div className="container header-row">
          <Link className="brand" to="/">
            <span className="brand-mark">R</span>
            <span className="brand-name">RUPP Cafe</span>
            <span className="login-name">Welcome, Daring!</span>
          </Link>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
          <nav id="primary-navigation" className={`primary-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Primary">
            <Link to="/#home" onClick={closeMenu}>Home</Link>
            <Link to="/#menu" onClick={closeMenu}>Menu</Link>
            <Link to="/#story" onClick={closeMenu}>Our Story</Link>
            <Link className="nav-order" to="/cart" onClick={closeMenu}>Order</Link>
          </nav>
          <div className="header-actions">
            <Link className="btn btn-outline btn-small" to="/login">Log In</Link>
            <Link className="cart-btn" to="/cart" aria-label={`View cart, ${itemCount} items`} title="View cart">
              <ShoppingCart size={18} aria-hidden="true" />
              <span className="cart-label">Cart</span>
              <span className="cart-count">{itemCount}</span>
            </Link>
          </div>
        </div>
      </header>


      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-media">
              <img src={heroDrink.image} alt={`${heroDrink.name} from the RUPP Cafe menu`} />
              <div className="hero-drink-caption">
                <span>{topOrderedDrink ? 'Most ordered here' : 'Cafe favorite'}</span>
                <strong>{heroDrink.name}</strong>
              </div>
            </div>
            <div className="hero-copy">
              <span className="pill">{topOrderedDrink ? 'Your current top drink' : 'Freshly brewed daily'}</span>
              <h1>Your Daily Ritual, Perfected.</h1>
              <p>{topOrderedDrink ? `${heroDrink.description}. Ordered ${topOrderedDrink.quantity} ${topOrderedDrink.quantity === 1 ? 'time' : 'times'} so far.` : 'Step into a refreshing haven of premium matchas, hand-poured single origins, and silky caramels. Crafted by local baristas who care.'}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" type="button" onClick={() => openCustomization(heroDrink)}>Order this drink</button>
                <a className="btn btn-outline" href="#menu">Explore Menu</a>
              </div>
            </div>
          </div>
        </section>

        <section className="featured" id="menu">
          <div className="container">
            <div className="featured-head">
              <h2>Cafe Menu</h2>
              <Link className="link-accent order-link" to="/cart" aria-label={`View order, ${itemCount} items`}>
                <ShoppingCart size={16} aria-hidden="true" /> View order ({itemCount})
              </Link>
            </div>

            <div className="menu-search-row">
              <label className="menu-search">
                <Search size={19} aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search drinks and menu items"
                  aria-label="Search drinks and menu items"
                />
                {searchQuery && (
                  <button type="button" className="menu-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </label>
              <span className="menu-result-count" aria-live="polite">
                {visibleItems.length} {visibleItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="menu-categories" role="group" aria-label="Filter menu by category">
              {categories.map((category) => (
                <button
                  className={`menu-category${selectedCategory === category ? ' is-selected' : ''}`}
                  type="button"
                  key={category}
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {visibleItems.length ? <div className="cards">
              {visibleItems.map((item) => (
                <article className="card" key={item.id}>
                  <div className="card-media"><img src={item.image} alt={item.name} /></div>
                  <span className="card-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="card-description">{item.description}</p>
                  <div className="card-row">
                    <span className="card-price">${item.price.toFixed(2)}</span>
                    <button className="btn btn-small" type="button" onClick={() => openCustomization(item)} aria-label={`Customize ${item.name}`}>
                      <span className="add-button-content">
                        {addedItemId === item.id ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
                        {addedItemId === item.id ? 'Add again' : 'Customize'}
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div> : (
              <div className="menu-empty-state" role="status">
                <Search size={22} aria-hidden="true" />
                <p>No menu items match “{searchQuery.trim()}”.</p>
                <button type="button" onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}>Clear filters</button>
              </div>
            )}
          </div>
        </section>

        <section className="origins" id="story">
          <div className="container origins-grid">
            <div className="origins-copy">
              <span className="eyebrow">Our Origins</span>
              <h2>Crafting Peace and Flavor</h2>
              <p>RUPP Cafe started with a simple belief: your daily coffee should be a moment of absolute calm. We source directly from sustainable organic farms and hand-whisk ceremonial green teas to give you a pure, vibrant experience.</p>
              <a className="btn btn-outline" href="#story">Read Our Story</a>
            </div>
            <div className="origins-media">
              <img src="https://picsum.photos/seed/cafeinterior/700/500" alt="Bright cafe interior with plants and a counter" />
            </div>
          </div>
        </section>
      </main>

      {selectedItem && (
        <div className="customize-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedItem(null) }}>
          <section className="customize-dialog" role="dialog" aria-modal="true" aria-labelledby="customize-title">
            <div className="customize-heading">
              <div>
                <span className="eyebrow">Make it yours</span>
                <h2 id="customize-title">{selectedItem.name}</h2>
              </div>
              <button type="button" className="customize-close" aria-label="Close customization" onClick={() => setSelectedItem(null)}><X size={20} /></button>
            </div>

            {selectedItem.type === 'drink' && (
              <fieldset className="customize-section">
                <legend>Sweetness</legend>
                <div className="sweetness-options">
                  {['20%', '30%', '50%', '70%', '100%'].map((level) => (
                    <label className={`sweetness-option${sweetness === level ? ' is-selected' : ''}`} key={level}>
                      <input type="radio" name="sweetness" value={level} checked={sweetness === level} onChange={(event) => setSweetness(event.target.value)} />
                      {level}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="customize-section">
              <legend>Toppings <span>(optional)</span></legend>
              <div className="topping-options">
                {['Whipped cream', 'Caramel drizzle', 'Chocolate chips', 'Fresh berries', 'Granola'].map((topping) => (
                  <label className="topping-option" key={topping}>
                    <input type="checkbox" checked={toppings.includes(topping)} onChange={() => toggleTopping(topping)} />
                    {topping}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="customize-section note-field">Note for the barista
              <textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={180} rows={3} placeholder="Any special requests?" />
            </label>

            <button className="btn btn-primary customize-submit" type="button" onClick={() => addItem(selectedItem)}>
              Add to order · ${selectedItem.price.toFixed(2)}
            </button>
          </section>
        </div>
      )}

      <CafeFooter />
    </>
  );
}
