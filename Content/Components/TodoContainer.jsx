import TodoListItem from './TodoListItem';
import NewItemForm from './NewItemForm';
import { ItemsFilter, FILTER_TYPE } from './ItemsFilter';

const HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const fetchUrl = (url, method, body) => {

    const request  = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: method || HTTP.GET,
        body: JSON.stringify(body)
    };

    return fetch(url, request).then((response) => {
        if (response.status == '200') { 
            return response.json().then(json => ({ json })).catch({ json: {} });
        }
        return {json: {}}
      }
    )
}

class TodoContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterType: FILTER_TYPE.ALL
        }
    }

    componentWillMount() {
        this.loadItems();
    }


    loadItems = () => {
        fetchUrl('/api/todo').then(res => {
            this.setState({
                data: res.json
            })
        })
    }

    addItem = (name) => {
        const item = {
            name,
            isDone: false
        }
        fetchUrl('/api/todo', HTTP.POST, item).then(() => {
            this.loadItems();        
        })        
    }

    deleteItem = (item) => {
        fetchUrl(`/api/todo/${item.id}`, HTTP.DELETE).then(() => {
            this.loadItems();       
        })
    }

    updateItem = (item) => {
        fetchUrl(`/api/todo/${item.id}`, HTTP.PUT, item).then(() => {
            this.loadItems();        
        })        
    }

    deleteDoneItems = () => {
        fetchUrl(`/api/todo`, HTTP.DELETE).then(() => {
            this.loadItems();        
        }) 
    }

    changeFilter = (type) => {
        this.setState({
            filterType: type
        })
    }

    filterItems = () => {
        let { filterType, data } = this.state;
        switch(filterType) {
            case FILTER_TYPE.ACTIVE:
                return data.filter(item => !item.isDone);
            case FILTER_TYPE.COMPLETE:
                return data.filter(item => item.isDone);
            default: 
              return data;             
        }
    }

    render() {
        let { data } = this.state;
        data = this.filterItems();
        return (
            <div className="container todos-container">
                <h1 className="text-center">Todos</h1>
                <div className="col-md-12">
                    <NewItemForm onAddItem={this.addItem} />
                    <ul className="todo-list list-group">
                        {data.map((item, i) => <TodoListItem item={item} key={i} onUpdate={this.updateItem} onDelete={this.deleteItem} />)}
                    </ul>
                    <ItemsFilter onChangeType={this.changeFilter} onDelete={this.deleteDoneItems} items={this.state.data} />
                </div>
            </div>
        );
    }
}

export default TodoContainer;