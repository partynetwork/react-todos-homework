import memoize from 'lru-memoize';
import is from 'is_js';

const validate = (values) => {

    const errors = {};

    if (is.not.truthy(values.get('title'))) {
        errors.title = 'Please fill in title';
    }

    return errors
};
export default memoize(10)(validate);