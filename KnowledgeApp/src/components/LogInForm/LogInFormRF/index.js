import { reduxForm } from 'redux-form';
import LogInFormView from './LogInFormView';

const FORM = 'hello';

const LogInFormRF = reduxForm({
    form: FORM,
})(LogInFormView);

export default LogInFormRF;