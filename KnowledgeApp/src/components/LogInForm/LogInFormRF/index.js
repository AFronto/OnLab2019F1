import { reduxForm } from 'redux-form';
import LogInFormView from './LogInFormView';

const FORM = 'hello';

const validate = ({ username, password }) => {
    const errors = {};
    
    return errors;
};

const LogInFormRF = reduxForm({
    form: FORM,
    validate,
})(LogInFormView);

export default LogInFormRF;