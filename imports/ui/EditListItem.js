import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from "react-modal"
import moment from "moment"
export default class EditListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            error: "",
            itemName: this.props.item.name,
            completed: this.props.item.completed
        }
        this.handleModalClose = this.handleModalClose.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this)
        this.onClickComplete = this.onClickComplete.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onClickDelete() {
        Meteor.call('lists.deleteListItem', this.props.listId, this.props.item._id, (err, res) => {
            console.log(err)
        })
    }
    onClickComplete() {
        this.setState((prevState) => ({
            completed: !prevState.completed
        }))
        Meteor.call('lists.updateListItem', this.props.listId, this.props.item._id, { completed: !this.state.completed }, (err, res) => { })
    }
    handleModalClose() {
        this.setState({
            modalIsOpen: false
        })
    }
    onChange(e) {
        this.setState({
            itemName: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        Meteor.call('lists.updateListItem', this.props.listId, this.props.item._id, { name: this.state.itemName }, (err, res) => { })
        this.handleModalClose();
    }
    render() {

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Update Item"
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.itemName.focus()}
                    onRequestClose={this.handleModalClose}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Update Item</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="itemName"
                            value={this.state.itemName}
                            onChange={this.onChange}
                            placeholder="Enter Item name"
                        />
                        <button className="button button-hover">Update</button>
                        <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                    </form>
                </Modal>
                <div className="item">
                    <h2>{this.props.item.name}</h2>
                    <div className="item__message">
                        <p>Updated At {moment(this.props.item.updatedAt).format('M/DD/YYYY')}</p>
                    </div>
                    <button className="button button--pill" onClick={() => {
                        this.setState({
                            modalIsOpen: true
                        })
                    }}>
                        Update
                </button>
                    <button className="button button--pill" onClick={this.onClickComplete}>
                        {!this.state.completed ? 'Complete': 'Completed'}
                </button>
                    <button className="button button--pill pill--danger" onClick={this.onClickDelete}>
                        Delete
                </button>
                </div>
            </div>
        )
    }
}
