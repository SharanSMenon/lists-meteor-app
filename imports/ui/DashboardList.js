import React, { Component } from 'react'
import { Lists } from '../api/lists'
import { Meteor } from 'meteor/meteor'
import Modal from "react-modal"
import DashboardListItem from './DashboardListItem'
export default class DashboardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      filters: "",
      sortBy: "mostrecent"
    }
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  componentDidMount() {
    this.listsTracker = Tracker.autorun(() => {
      Meteor.subscribe('lists');
      const lists = Lists.find().fetch();
      console.log(lists);
      this.setState({ lists });
    })
  }
  componentWillUnmount() {
    // console.log('Component did unmount lists List');
    this.listsTracker.stop();
  }
  renderItems() {
    if (this.state.lists.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Lists</p>
        </div>
      )
    }
    let lists = this.state.lists;
    let filters = this.state.filters;
    let sortBy = this.state.sortBy;
    lists = lists.sort((a, b) => {
      console.log(a)
      if (sortBy === "mostrecent") {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      } else if (sortBy === "mostitems"){
        return a.items.length < b.items.length ? 1 : -1;
      } else if (sortBy === "leastitems") {
        return a.items.length > b.items.length ? 1 : -1;
      }
     })
    if (filters.trim()) {
      lists = lists.filter((item) => item.title.toLowerCase().includes(filters.toLowerCase()))
    }
    return lists.map(list => {
      // const shortUrl = Meteor.absoluteUrl(list._id)

      // return <p></p>
      return <DashboardListItem key={list._id} list={list} />
    })
  }
  onFilterChange(e) {
    this.setState({
      filters: e.target.value
    })
  }
  render() {
    return (
      <div className="page-content">
        <div className="input-group">
          <input value={this.state.filters} onChange={this.onFilterChange} type="text" placeholder="Search..."></input>
          <select className="select" onChange={(e) => {
            this.setState({
              sortBy: e.target.value
            })
          }}>
            <option value="mostrecent">Sort by</option>
            <option value="mostrecent">Most Recent</option>
            <option value="mostitems">Most Items</option>
            <option value="leastitems">Least items</option>
          </select>
        </div>
        <div className="list-header">
          Lists
         </div>
        {this.renderItems()}
      </div>
    )
  }
}
