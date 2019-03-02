import Notelist from '../components/Notelist';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
    notes: state.memo.get('notes')
});

const mapDispatchToProps = (dispatch) => ({
    editMemo: (index, title, memo, id) => dispatch(actions.editRequest(index, title, memo, id)),
    deleteMemo: (index, id) => dispatch(actions.deleteRequest(index, id))
})

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notelist)

export default NoteContainer;