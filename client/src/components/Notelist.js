import React from 'react';
import Noteview from './Noteview';
import PropTypes from 'prop-types';
import { List } from 'immutable';

const Notelist = ({ notes, deleteMemo, editMemo, memo_id }) => {
    const noteList = notes.map(
        (note, i) => (
            <Noteview
                key={i}
                index={i}
                id={notes.id}
                {...note.toJS()}
                deleteMemo={deleteMemo}
                editMemo={editMemo}
            />
        )
    )
    return (
        <div className="noteList">
            {noteList}
        </div>
    )
};

Notelist.propTypes = {
    notes: PropTypes.instanceOf(List),
    deleteMemo: PropTypes.func
};

Notelist.defaultProps = {
    notes: [],
    deleteMemo: () => console.warn('deleteMemo not defined')
};

export default Notelist;