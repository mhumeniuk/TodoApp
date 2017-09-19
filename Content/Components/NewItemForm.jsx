class NewItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newItemName:  ''
        }
    }

    changeName = (event) => {
        this.setState({
            newItemName: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter')  {
            this.props.onAddItem(event.target.value);
            this.setState({
                newItemName: ''    
            })
        }    
    }

    addItem = () => {
        this.props.onAddItem(this.state.newItemName)        
    }

    render() {
        return (
            <div className="new-item-form">
                <button onClick={this.addItem} className="add-item-btn">Add</button>
                <input 
                  type="text" 
                  value={this.state.newItemName}
                  onChange={this.changeName} 
                  onKeyPress={this.handleKeyPress}
                  className="add-item-input" 
                  placeholder="What needs to be done?" />
            </div>
        )
    }
}

export default NewItemForm;