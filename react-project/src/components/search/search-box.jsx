import { Component } from "react";
import "./search-box.styles.scss"

import { Form } from 'react-bootstrap'

//search box componenet that will monitor change in user's search string
const SearchBox = props => {

    return (
            <Form>
                <Form.Control className="search-search-bar" type="search" placeholder="Search Company" onChange={props.onChangeHandler} />
            </Form>
    )
}

export default SearchBox;