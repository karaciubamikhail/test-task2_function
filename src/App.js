import uuid from 'uuid'
import { Login } from './components/Login';
import TodoList from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { useState } from 'react';

function App() {
  const [state,setState] = useState({
      items: [],
			itemsToShow: "all",
			id: uuid(),
			item: '',
			editItem: false
  });
  const data = [
    {
      login:'admin',
      password:'admin'
    }
  ]
  const loginHandle = event =>{
		event.preventDefault();
		const {target} = event;
		let formData = new FormData(target.parentElement);
		let login = formData.get('login');
		let password = formData.get('password');
		if(login === data[0].login && password === data[0].password){
			localStorage.setItem('user',login);
			window.location.assign('http://localhost:3000/');
		}else{
			return(
				<p>Неверный логин или пароль</p>
			)
		}
	}
  function handleChange (event){
    setState({
      ...state,
			item: event.target.value
		})
  }
	const handleSubmit = event => {
		event.preventDefault()
		
		const newItem = {
			id: state.id,
			title: state.item,
			completed: false
		}
		const updatedItems = [...state.items, newItem]

		if (state.item.length > 0) {
			setState({
        ...state,
				items: updatedItems,
				id: uuid(),
				item: '',
				editItem: false
			})
		}
	}

	const updateTodosToShow = string => {
		setState({
      ...state,
			itemsToShow: string
		});
	};

	const handleDoneTask = (id, completed) => {
		const filteredItems = state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})

		setState({
      ...state,
			items: filteredItems,
		})
	}

	const handleDelete = id => {
		const filteredItems = state.items.filter(item => item.id !== id)

		setState({
      ...state,
			items: filteredItems
		})
	}

	const handleEdit = id => {
		const filteredItems = state.items.filter(item => item.id !== id)

		const selectedItem = state.items.find(item => item.id === id)

		setState({
      ...state,
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}

	const handleDeleteDoneTasks = () => {
		const filteredItems = state.items.filter(item => item.completed === false)

		setState({
      ...state,
			items: filteredItems
		})
	}

	const clearList = () => {
		setState({
      ...state,
			items: []
		})
	}

  if(localStorage.length === 1){
    let items = []

		if (state.itemsToShow === "all") {
			items = state.items;
		} else if (state.itemsToShow === "todo") {
			items = state.items.filter(item => !item.completed);
		} else if (state.itemsToShow === "done") {
			items = state.items.filter(item => item.completed);			
		}
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 mx-auto mt-4">
            <h3 className="text-capitalize text-center">TodoInput</h3>
            <TodoInput
              item={state.item}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <TodoList
              items={items}
              clearList={clearList}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDoneTask={handleDoneTask}
              handleDeleteDoneTasks={handleDeleteDoneTasks}
              updateTodosToShow={updateTodosToShow}
            />
          </div>
        </div>
      </div>
    );
  }
  return(
  <div className="container">
    <h3 className="text-capitalize text-center">Todo login</h3>
    <Login 
      loginHandle = {loginHandle}
    />
  </div>
  );
}

export default App;
