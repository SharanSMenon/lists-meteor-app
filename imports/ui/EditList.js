import React from 'react';
import PrivateHeader from './PrivateHeader'
import { Lists } from '../api/lists';
import { Meteor } from 'meteor/meteor'
import EditListForm from './EditListForm'
import EditListItem from './EditListItem'
// import FlipMove from 'react-flip-move'
// import FlipMove from "r"
export default class EditListPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: {},
            filters: "",
            title: "",
            compFilter: "all",
            sortBy: ""
        }
        this.renderList = this.renderList.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this)
    }
    componentDidMount() {
        this.listTracker = Tracker.autorun(() => {
            Meteor.subscribe('lists');
            let list = Lists.findOne({
                _id: this.props.params.id
            })
            console.log(list)
            this.setState({
                list,
                title: list !== undefined ? list.title : ""
            })
        })
    }
    renderList() {
        if (this.state.list === undefined) {
            return <div></div>
        }
        if (this.state.list.items !== undefined) {
            if (this.state.list.items.length === 0) {
                return (
                    <div className="item">
                        <p className="item__status-message">No Items</p>
                    </div>
                )
            }
            let items = this.state.list.items;
            let filters = this.state.filters;
            let compFilter = this.state.compFilter;
            if (compFilter !== "all") {
                let tof = compFilter === "comp" ? true : false;
                items = items.filter((item) => item.completed === tof)
            }
            if (filters.trim()) {
                items = items.filter((item) => item.name.toLowerCase().includes(filters.toLowerCase()))
            }
            if (items.length === 0) {
                return (<div className="item">
                    <p className="item__status-message">No Items</p>
                </div>)
            }
            return items.map((item) => {
                return <EditListItem key={item._id} listId={this.state.list._id} item={item} />
            })
        }
    }
    onFilterChange(e) {
        this.setState({
            filters: e.target.value
        })
    }
    onAddItem(name) {
        console.log(name);
        Meteor.call('lists.addListItem', this.props.params.id, {
            name,
            completed: false
        }, (err, res) => { })
    }
    componentWillUnmount() {
        this.listTracker.stop()
    }
    onTitleChange(e) {
        Meteor.call('lists.update', this.props.params.id, {
            title: e.target.value
        })
        this.setState({
            title: e.target.value
        })
    }
    render() {
        return (
            <div>
                <PrivateHeader title="Edit List" />
                {this.state.list !== undefined && this.state.list.items !== undefined ? (
                    <div>
                        <div className="page-header">
                            <div className="page-content">
                                <h1 className="page-header__title">You have <span>{this.state.list.items.length} </span> {this.state.list.items.length === 1 ? "item" : "items"} in <span>{this.state.list.title}</span></h1>
                            </div>
                        </div>
                        <div className="page-content">
                            {/* <h1>{this.state.list.title}</h1> */}
                            <br></br>
                            <input value={this.state.title} onChange={this.onTitleChange} className="title-input" />
                            <EditListForm onSubmit={this.onAddItem} />
                            <div className="input-group">
                                <input value={this.state.filters} onChange={this.onFilterChange} type="text" placeholder="Search..."></input>
                                <select className="select" onChange={(e) => {
                                    this.setState({
                                        compFilter: e.target.value
                                    })
                                }}>
                                    <option value="all">Filter by</option>
                                    <option value="all">All</option>
                                    <option value="comp">Complete</option>
                                    <option value="incomp">Incomplete</option>
                                </select>
                            </div>
                            <div className="list-header">
                                Items
                            </div>
                            {this.renderList()}
                        </div>
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        )
    }
}