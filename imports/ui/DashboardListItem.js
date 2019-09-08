import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Modal from 'react-modal'
export default class DashboardListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
        }
        this.onDelete = this.onDelete.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this)

    }
    onDelete(e) {
        // console.log(this.props._id)
        e.preventDefault()
        Meteor.call('lists.removeList', this.props.list._id, (err, res) => {
            // console.log(err)
        })
    }
    handleModalClose() {
        this.setState({
            modalIsOpen: false
        })
    }
    render() {
        return (
            <div>
                <div className="item">
                    <h2>{this.props.list.title}</h2>
                    <div className="item__message">
                        <p>{this.props.list.items.length} item(s)</p>
                    </div>
                    <Link to={`/edit/${this.props.list._id}`} ref="copy" className="button button--pill" >Open</Link>
                    <button className="button button--pill pill--danger" onClick={() => {
                        this.setState({
                            modalIsOpen: true
                        })
                    }}>
                        Delete
                </button>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Add Item"
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.itemName.focus()}
                    onRequestClose={this.handleModalClose}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Confirm?</h1>
                    <form onSubmit={this.onDelete} className="boxed-view__form">
                        <p>Are you sure you want to delete this?</p>
                        <button className="button button-hover button-danger">Delete</button>
                        <button className="button button-hover" onClick={this.handleModalClose} type="button ">Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
