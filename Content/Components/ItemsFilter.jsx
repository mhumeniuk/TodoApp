export const FILTER_TYPE = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETE: 'COMPLETE'
}
export class ItemsFilter extends React.Component {
    static PropTypes = {
        items: React.PropTypes.array,
        onChangeType: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            filterType: FILTER_TYPE.ALL
        }
    }

    changeFilterType = (filterType) => {
        this.setState({
            filterType
        });
        this.props.onChangeType(filterType);
    }

    render() {
        const { filterType } = this.state;
        const { ALL, ACTIVE, COMPLETE } = FILTER_TYPE;

        const itemsInProgress =  this.props.items.filter(i => i.isDone === false).length;
        const itemsReady = this.props.items.filter(i => i.isDone).length;

        return (
            <div className='items-filter'>
                <span className="items-remaining">{`${itemsInProgress} items left`}</span>
                <div className={`filter-text ${filterType == ALL ? 'selected' : ''}`}>
                    <span onClick={this.changeFilterType.bind(this, ALL)}>All</span>
                </div> 
                <div className={`filter-text ${filterType == ACTIVE ? 'selected' : ''}`}>
                    <span onClick={this.changeFilterType.bind(this, ACTIVE)}>Active</span>
                </div> 
                <div className={`filter-text ${filterType == COMPLETE ? 'selected' : ''}`}>
                    <span onClick={this.changeFilterType.bind(this, COMPLETE)}>Completed</span>
                </div>
                <button className="btn btn-xs btn-default clear-btn pull-right" onClick={this.props.onDelete}> 
                    Clear completed ({itemsReady})
                </button>
            </div>
        )
    }
}
