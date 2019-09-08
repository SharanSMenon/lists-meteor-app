import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'
export default class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            error: '',
            title: ""
        }
        this.onTitleChange = this.onTitleChange.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        const title = this.state.title;
        Meteor.call('lists.addList', title, (err, res) => {
            console.log(err)
            if (!err) {
                this.handleModalClose()
            } else {
                this.setState({ error: 'Something Went wrong'})
            }
        })
    }
    onTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    handleModalClose() {
        this.setState({
            modalIsOpen:false
        })
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Add Link"
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.title.focus()}
                    onRequestClose={this.handleModalClose}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add List</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="title"
                            placeholder="Enter List Name"
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                        <button className="button button-hover">Add</button>
                        <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                    </form>
                </Modal>
                <div className="page-content">
                    <button className="button button-hover" onClick={() => {
                        this.setState({
                            modalIsOpen: true
                        })
                    }}>+ New List</button>
                </div>
            </div>
        )
    }
}
