import React from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import connectWithStore from "react/react-transition/connectWithStore";
import * as UshLogoActions from "./ush-logo.actions";
import { getFormsFromState } from "./ush-logo.reducer";

const MyComponent = props => {
    const handleClick = e => {
        e.preventDefault();
        props.UshLogoActions.receiveForms([{ id: "junk" }]);
    };
    return (
        <div>
            {props.forms && props.forms[0].id}
            <p className="foo">Foo: {props.foo}</p>
            <p className="baz">Baz: {props.baz}</p>
            <button onClick={handleClick} onKeyUp={handleClick}>
                halp
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    forms: getFormsFromState(state)
});

function mapDispatchToProps(dispatch) {
    return {
        UshLogoActions: bindActionCreators(UshLogoActions, dispatch)
    };
}

MyComponent.propTypes = {
    foo: PropTypes.number.isRequired,
    baz: PropTypes.number.isRequired,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired,
    UshLogoActions: PropTypes.shape({
        receiveForms: PropTypes.func.isRequired
    }).isRequired
};

export { MyComponent as PlainUshLogo };

export default connectWithStore(
    MyComponent,
    mapStateToProps,
    mapDispatchToProps
);