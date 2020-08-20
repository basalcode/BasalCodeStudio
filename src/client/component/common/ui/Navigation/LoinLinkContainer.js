import { connect } from 'react-redux'
import LoginLink from './Navigation';

const mapDispatchToProps = (dispatch) => {
    return {
        onLink:function(path) {
            dispatch({type:'LINK', path: path});
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginLink);