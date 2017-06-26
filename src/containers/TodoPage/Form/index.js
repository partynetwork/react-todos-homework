import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {reduxForm, Field, formValueSelector} from 'redux-form/immutable';
import validate from './validation';

import Button from "components/Button/index";
import FormGroup from 'components/Input/FormGroup';
import Label from 'components/Label/index';
import TextField from 'components/Input/TextField';
import HelpBlock from 'components/Input/HelpBlock';

//language=SCSS prefix=&{ suffix=}
const FormWrapper = styled.form`
    background-color: white;
    padding: 20px;
    width: 400px;
`;
const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => {
    return (
        <FormGroup display={touched && error ? 'error' : ''} className={ type === 'hidden' ? 'my-0' : ''}>
            {type !== 'hidden' ? (<Label>{label}</Label>) : ''}
            <TextField  {...input} type={type}
                        className='form-control'
                        placeholder={placeholder}/>
            {touched && error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    );
};

let Form = props => {

    const {handleSubmit, pristine, valid, submitting} = props;
    return (
        <FormWrapper action="" method="POST" onSubmit={handleSubmit}>
            <Field name='id'
                   type='hidden'
                   component={'input'}/>

            <Field name='title'
                   type='text'
                   component={renderField}
                   placeholder={'Enter todo title'}
                   label={'Title'}/>
            <Field name='description'
                   type='text'
                   component={renderField}
                   placeholder={''}
                   label={'Description'}/>
            <Field name='date'
                   type='date'
                   component={renderField}
                   placeholder={''}
                   label={'Date'}/>


            <div className="text-right">
                <Button type="button" onClick={props.handleClickCloseDialog}>
                    Close
                </Button>
                <Button type="submit"
                        disabled={pristine || submitting}
                        name="submit-payment" display={'primary'}>
                    Submit
                </Button>
            </div>
        </FormWrapper>
    )

};

function mapStateToProps(state, props) {
    return {
    }
}

Form = reduxForm({
    form: 'todoForm',
    enableReinitialize:true,
    validate
})(Form);

export default connect(mapStateToProps)(Form)