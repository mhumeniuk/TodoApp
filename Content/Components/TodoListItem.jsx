class TodoListItem extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            itemName: ''
        }
    }

    componentWillMount() {
       this.setState({
            itemName: this.props.item.name
       }) 
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            itemName: newProps.item.name
        })        
    }

    itemClick = () => {
       if (!this.state.isEditMode) { 
        this.setState({
            isEditMode: true
        })
       }    
    }

    changeName = (event) => {
        this.setState({
            itemName: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            let item = {...this.props.item, name: event.target.value };
            this.setState({
                itemName: event.target.value,
                isEditMode: false
            })
            this.props.onUpdate(item); 
        }    
    }


    updateItem = () => {
        this.setState({
            isEditMode: false
        })
       this.props.onUpdate(item);  
    }

    changeStatus = () => {
        this.props.onUpdate({ ...this.props.item, isDone: !this.props.item.isDone });
    }

    deleteItem = () => {
        this.props.onDelete(this.props.item)
    }

    render() {
        const { isEditMode, itemName } = this.state;
        const { item } = this.props;
        let todoItem = <span className={item.isDone ? 'done' : ''}>{item.name}</span>;

        if (isEditMode) {
            todoItem = (<input type="text" 
                               value={itemName} 
                               onKeyPress={this.handleKeyPress}
                               onChange={this.changeName} />);
        }
  

        const actionButtons = (<span className="action-buttons">
                                    <button onClick={this.updateItem}>Save</button> <button onClick={this.deleteItem}>Delete</button>
                               </span>);

        return (
            <li className="list-group-item">
               <button className="btn btn-default" onClick={this.changeStatus}>
                    <span className={`glyphicon glyphicon-${item.isDone ? 'check' : 'unchecked'}`} aria-hidden="true"></span>
               </button>
               <span> </span>
               <div className={`todo-item-name pointer`} onClick={this.itemClick}>
                   {todoItem}{isEditMode ? actionButtons  : ''} 
               </div>
            </li>
        )
    }
}

export default TodoListItem;