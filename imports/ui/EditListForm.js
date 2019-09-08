import React, { Component } from 'react'
import Modal from 'react-modal';
export default class EditListForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            error: '',
            name: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        const itemName = e.target.value
        this.setState({
            name: itemName
        })
    }
    onSubmit(e) {
        e.preventDefault()
        const itemName = this.state.name
        console.log(this.props)
        this.props.onSubmit(itemName)
        this.setState({
            name:""
        })
        this.handleModalClose();
    }
    handleModalClose() {
        this.setState({
            modalIsOpen: false
        })
    }
    render() {
        return (
            <div>
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
                    <h1>Add Item</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="itemName"
                            value={this.state.name}
                            onChange={this.onChange}
                            placeholder="Enter Item name"
                        />
                        <button className="button button-hover">Add</button>
                        <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                    </form>
                </Modal>
                <button className="button button-hover" onClick={() => {
                    this.setState({
                        modalIsOpen: true
                    })
                }}>+ New Item</button>
            </div>
        )
    }
}
