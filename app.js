class App extends React.Component {
   state = {
      currentPrice: 9.99,

   }

   ingredients = [
      {id: 1, name: 'Salad', price: 0.20, amount: 1, available: 4},
      {id: 2, name: 'Bacon', price: 2.00, amount: 1, available: 4},
      {id: 3, name: 'Cheese', price: 1.00, amount: 1, available: 4},
      {id: 4, name: 'Meat', price: 1.50, amount: 1, available: 4},
   ]



   render() {
      return (
         <div className='app'> 
            <Header />
            <Hamburger />
            <Menu 
               currentPrice={this.state.currentPrice}
               ingredients={this.ingredients}
            />
         </div>
      )
   }
}

const Header = () => (
   <header className='app__header'>
      <PriceListButton 
         src='./images/info.svg'
      />
      <Title />
   </header>
)

const PriceListButton = ({src}) => (
   <div className='header__price-list'>
      <img src={src} alt="price list"/>
      Price List
   </div>
)

const Title = () => (
   <h1 className='header__title'>Order Burger App</h1>
)

const Hamburger = () => (
   <div className='app__hamburger'>

   </div>
)

const Menu = ({currentPrice, ingredients}) => (
   <div className='app__menu'>
      <CurrentPrice 
         currentPrice={currentPrice}
      />
      <IngredientsList 
         ingredients={ingredients}
      />
      <SendOrder />
   </div>
)

const CurrentPrice = ({currentPrice}) => (
   <p className='menu__current-price'>Current Price: {currentPrice}</p>
)

const IngredientsList = ({ingredients}) => (
   ingredients.map(currentElement => <Ingredient key={currentElement.id} {...currentElement}/>)
)

// tutaj buttony jeszcze beda musieli przekazywac typy
const Ingredient = (props) => (
   <div className='menu__ingredient'>
      <p className='ingredient__info'>{props.name}: {props.amount}</p>
      <div className='ingredient__buttons'>
         <button>More</button>
         <button>Less</button>
      </div>
   </div>
)

const SendOrder = () => (
   <button className='menu__send'>Order Now !</button>
)

ReactDOM.render(<App/>, document.getElementById('root'));