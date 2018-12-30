// co klik ma pokazywac dla kazdego skladniku ilosc dodatkowych skladnikow oraz po strzalce laczna cene za dodatkowe ilosci danego produktu, oraz akrualizowac cene totalna 

class App extends React.Component {
   state = {
      currentPrice: 9.99,
      infoModal: false,
      totalPrice: 9.99,
      ingredients: [
         {id: 1, name: 'Salad', price: 0.20, amount: 0, available: 3},
         {id: 2, name: 'Bacon', price: 2.00, amount: 0, available: 3},
         {id: 3, name: 'Cheese', price: 1.00, amount: 0, available: 3},
         {id: 4, name: 'Meat', price: 1.50, amount: 0, available: 3},
      ]
   }     

   

   handleShowInfoModalClick = () => {
      this.setState({
         infoModal: true
      })
   }

   handleIncreaseIngredientClick = (id) => {
      let ingredients = [...this.state.ingredients];

      ingredients.map(currentElement => {
         if(currentElement.id === id) {
            currentElement.amount+=1
         }
      })

      this.setState({
         ingredients,
      })

      this.calculateTotalPrice();
   }

   calculateTotalPrice = () => {
      let ingredients = [...this.state.ingredients];
      let sum = 9.99;

      ingredients.forEach(currentElement => {
         sum = sum + (currentElement.price*currentElement.amount);
      })

      this.setState( prevState => ({
         totalPrice: sum.toFixed(2)
      }))
   }

   handleDecreaseIngredientClick = (id) => {
      let ingredients = [...this.state.ingredients];

      ingredients.map(currentElement => {
         if(currentElement.id === id) {
            currentElement.amount-=1
         }
      })

      this.setState({
         ingredients
      })

      this.calculateTotalPrice();
   }

   render() {
      return (
         <div className='app'> 
            <Menu 
               currentPrice={this.state.currentPrice}
               totalPrice={this.state.totalPrice}
               ingredients={this.state.ingredients}
               increaseIngredientClick={this.handleIncreaseIngredientClick}
               decreaseIngredientClick={this.handleDecreaseIngredientClick}
            />
            <TotalPrice 
               totalPrice={this.state.totalPrice}
            />
         </div>
      )
   }
}



const Menu = ({currentPrice, totalPrice, ingredients, increaseIngredientClick, decreaseIngredientClick}) => (
   <div className='app__menu'>
      <CurrentPrice 
         currentPrice={currentPrice}
      />
      <IngredientsList 
         ingredients={ingredients}
         increaseIngredientClick={increaseIngredientClick}
         decreaseIngredientClick={decreaseIngredientClick}
      />
      <SendOrder 
         totalPrice={totalPrice}
      />
   </div>
)

const CurrentPrice = ({currentPrice}) => (
   <p className='menu__current-price'>Current Price: {currentPrice}</p>
)

const IngredientsList = ({ingredients, increaseIngredientClick, decreaseIngredientClick}) => (
   ingredients.map(currentElement => <Ingredient 
      key={currentElement.id} 
      {...currentElement}
      increaseIngredientClick={increaseIngredientClick}
      decreaseIngredientClick={decreaseIngredientClick}
   />)
)

// tutaj buttony jeszcze beda musieli przekazywac typy
const Ingredient = (props) => (
   <div className='menu__ingredient'>
      <p className='ingredient__info'>
         {props.name}: 1 +  extra {props.amount} from {props.available} ==> ${props.price*props.amount}
      </p>
      <div className='ingredient__buttons'>
         <button 
            disabled={props.amount === props.available ? true : false} 
            onClick={() => props.increaseIngredientClick(props.id)}
         >
            More
         </button>
         <button 
            disabled={props.amount === 0 ? true : false} 
            onClick={() => props.decreaseIngredientClick(props.id)}
         >
            Less
         </button>
      </div>
   </div>
)

const SendOrder = ({totalPrice}) => (
   <button className='menu__send' onClick={() => alert(totalPrice)}>Order Now !</button>
)

const TotalPrice = ({totalPrice}) => (
   <p>To Pay Total Sum: {totalPrice}</p>
)

ReactDOM.render(<App/>, document.getElementById('root'));